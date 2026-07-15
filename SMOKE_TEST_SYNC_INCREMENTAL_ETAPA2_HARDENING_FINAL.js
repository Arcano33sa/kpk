'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const VERSION = '0.18.62-sync-incremental-reparacion-definitiva-hardening-final';
const CACHE_VERSION = 'v0_18_62_sync_incremental_reparacion_definitiva_hardening_final';
const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
const browserSmoke = JSON.parse(fs.readFileSync(path.join(ROOT, 'PRUEBAS_REPARACION_DEFINITIVA_ETAPA2_HARDENING_FINAL.json'), 'utf8'));
const previousBrowserSmoke = JSON.parse(fs.readFileSync(path.join(ROOT, 'PRUEBAS_REPARACION_DEFINITIVA_ETAPA1_LOCAL_FIRST.json'), 'utf8'));

const checks = [];
function check(name, condition, detail = '') {
  if (!condition) throw new Error(`${name}${detail ? ` — ${detail}` : ''}`);
  checks.push(name);
}
function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex');
}

execFileSync(process.execPath, ['--check', path.join(ROOT, 'app.js')], { stdio: 'pipe' });
check('01 sintaxis app.js', true);
execFileSync(process.execPath, ['--check', path.join(ROOT, 'service-worker.js')], { stdio: 'pipe' });
check('02 sintaxis service-worker.js', true);
check('03 versión interna', app.includes(`const APP_VERSION = '${VERSION}'`));
check('04 etapa interna', app.includes("Sincronización incremental - Reparación definitiva Etapa 2/2"));
check('05 render local antes de Firebase', app.indexOf('window.KSA_LOCAL_FIRST_RENDER_AT = performance.now();') < app.lastIndexOf('scheduleFirebaseInitializationAfterLocalRender();'));
check('06 Firebase diferido', app.includes('requestAnimationFrame(() => window.setTimeout(initialize, 0))'));
check('07 baseline parcial utilizable', app.includes('incrementalValidation.ok || incrementalValidation.partiallyValid'));
check('08 espejo local confirmado', app.includes("const SYNC_BASELINE_MIRROR_STORAGE_KEY = 'KSA_PRACTIKA_SYNC_BASELINE_MIRROR_v1'") && app.includes('persistConfirmedBaselineMirror(data.metadata)'));
check('09 recuperación en lectura local real', app.includes('const baselineRecovery = restoreConfirmedBaselineFromMirror(normalized);') && app.includes('normalized = baselineRecovery.data;'));
check('10 invalidación JSON limpia espejo', app.includes("clearConfirmedBaselineMirror('json_operation')"));
check('11 snapshot completo conserva baseline sano', app.includes('const preservePreviousBaseline = previousBaselineValidation.ok || previousBaselineValidation.partiallyValid;') && app.includes("lastFullBaselineAttemptStatus: 'pending_confirmation'"));
check('12 fallo de confirmación conserva baseline anterior', app.includes('const preserveConfirmedBaseline = previousBaselineValidation.ok || previousBaselineValidation.partiallyValid;') && app.includes('result.previousBaselinePreserved = preserveConfirmedBaseline'));
check('13 mensaje exacto sin cambios', app.includes("'Los datos ya están actualizados.'"));
check('14 no hay fallback completo automático', app.includes("automaticFullFallbackEnabled: false") && app.includes("automaticFullFallback: false"));
check('15 conflictos clasificados', ['active', 'resolved', 'orphaned', 'historical'].every((status) => app.includes(`'${status}'`)));
check('16 conflicto aislado no bloquea revisión global', !app.includes('blockedRevision = true;') && !app.includes("blockedModules.add('configuracion')"));
check('17 tombstones conservados', app.includes('isCloudDeletedRecord') && app.includes('lastIncrementalTombstones'));
check('18 Seguimiento incluido en sincronización', app.includes("mergeModule('seguimientoLlamadas'") && app.includes("seguimiento: Array.isArray(appData?.seguimientoLlamadas)"));
check('19 JSON compatible intacto', app.includes('buildJsonBackupPayload') && app.includes('invalidateIncrementalMetadataAfterJsonOperation'));
check('20 acciones offline protegidas', (app.match(/code: 'cloud\/offline'/g) || []).length >= 3);
check('21 sin limpieza destructiva', !app.includes('localStorage.clear(') && !app.includes('indexedDB.deleteDatabase('));
check('22 styles.css intacto', hash('styles.css') === 'eee1a3d711d7b19d2277ee6a4af97be63dbf84f658db38bd010dc9064ca9732e');
check('23 firebase-config intacto', hash('firebase-config.js') === 'b695ca847b041ff39422c591a64931c201f93a07d8af2d006be0671ccf2ff2c9');
check('24 referencias index alineadas', (index.match(new RegExp(VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 7);
check('25 Service Worker alineado', sw.includes(`const ASSET_VERSION = '${VERSION}'`) && sw.includes(`const CACHE_VERSION = '${CACHE_VERSION}'`));
check('26 navegación PWA cache-first', sw.indexOf("caches.match('./index.html')") < sw.indexOf('const networkRefresh = fetch(request)') && sw.includes('return cachedShell;'));
check('27 manifest válido', manifest.name === 'KSA PRÁCTIKA' && manifest.start_url === './index.html#home' && manifest.description.includes('PWA local-first'));
check('28 sin dependencias nuevas', !fs.existsSync(path.join(ROOT, 'package.json')) && !fs.existsSync(path.join(ROOT, 'node_modules')));
check('29 smoke real navegador', browserSmoke.ok === true && Object.keys(browserSmoke.checks || {}).length === 26);
check('30 consola navegador limpia', browserSmoke.console?.runtimeExceptions === 0 && browserSmoke.console?.consoleErrors === 0);
check('31 reapertura, baseline y offline reales', browserSmoke.checks?.['09_baseline_sobrevive_reapertura']?.ok === true
  && browserSmoke.checks?.['21_recuperacion_baseline_espejo_real']?.ok === true
  && browserSmoke.checks?.['23_pwa_service_worker_offline']?.ok === true);
check('32 conflictos y tombstones reales', browserSmoke.checks?.['18_tombstone_idempotente']?.ok === true
  && browserSmoke.checks?.['19_conflicto_activo_protegido_por_registro']?.ok === true
  && browserSmoke.checks?.['20_conflicto_huerfano_no_activo']?.ok === true);
check('33 incremental real en dos módulos', browserSmoke.checks?.['13_incremental_dos_modulos_real']?.ok === true
  && browserSmoke.checks?.['14_incremental_sin_duplicados']?.ok === true
  && browserSmoke.checks?.['15_incremental_mantiene_baseline']?.ok === true);
check('34 regresión internet lento Etapa 1', previousBrowserSmoke.ok === true
  && previousBrowserSmoke.results?.slow_network_local_first?.snapshot?.ventas >= 1
  && previousBrowserSmoke.results?.slow_network_local_first?.snapshot?.seguimiento >= 1);

console.log(JSON.stringify({ ok: true, passed: checks.length, checks }, null, 2));
