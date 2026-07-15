'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const VERSION = '0.18.61-sync-incremental-reparacion-definitiva-baseline-local-first';
const CACHE_VERSION = 'v0_18_61_sync_incremental_reparacion_definitiva_baseline_local_first';
const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
const browserSmoke = JSON.parse(fs.readFileSync(path.join(ROOT, 'PRUEBAS_REPARACION_DEFINITIVA_ETAPA1_LOCAL_FIRST.json'), 'utf8'));

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
check('02 versión interna', app.includes(`const APP_VERSION = '${VERSION}'`));
check('03 etapa interna', app.includes("Sincronización incremental - Reparación definitiva Etapa 1/2"));
check('04 render local antes de Firebase', app.indexOf('window.KSA_LOCAL_FIRST_RENDER_AT = performance.now();') < app.lastIndexOf('scheduleFirebaseInitializationAfterLocalRender();'));
check('05 Firebase diferido', app.includes('requestAnimationFrame(() => window.setTimeout(initialize, 0))'));
check('06 carga local no espera Firestore', !app.includes('cloudOperationState.runtimeReady = true;\n  KSAFirebaseAdapter.initFirebase();'));
check('07 conflictos clasificados', ['active', 'resolved', 'orphaned', 'historical'].every((status) => app.includes(`'${status}'`)));
check('08 conflictos activos por registro', app.includes('getActiveSyncConflicts().length') && !app.includes('blockedRevision = true;'));
check('09 conflicto de configuración no bloquea módulo', !app.includes("blockedModules.add('configuracion')"));
check('10 baseline parcial preservado', app.includes('const partiallyValid = !ok && coreConfirmed && invalidModules.length > 0;'));
check('11 causas exactas conservadas', app.includes('El baseline existe, pero falta el cursor del módulo ${moduleKey}.'));
check('12 mensaje exacto sin cambios', app.includes("'Los datos ya están actualizados.'"));
check('13 acciones offline protegidas', (app.match(/code: 'cloud\/offline'/g) || []).length >= 3);
check('14 no hay limpieza destructiva', !app.includes('localStorage.clear(') && !app.includes('indexedDB.deleteDatabase('));
check('15 tombstones conservados', app.includes('isCloudDeletedRecord') && app.includes('lastIncrementalTombstones'));
check('16 Seguimiento local intacto', app.includes("seguimiento: Array.isArray(appData?.seguimientoLlamadas)"));
check('17 styles.css intacto', hash('styles.css') === 'eee1a3d711d7b19d2277ee6a4af97be63dbf84f658db38bd010dc9064ca9732e');
check('18 firebase-config intacto', hash('firebase-config.js') === 'b695ca847b041ff39422c591a64931c201f93a07d8af2d006be0671ccf2ff2c9');
check('19 referencias index alineadas', (index.match(new RegExp(VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 7);
check('20 Service Worker alineado', sw.includes(`const ASSET_VERSION = '${VERSION}'`) && sw.includes(`const CACHE_VERSION = '${CACHE_VERSION}'`));
check('21 manifest válido', manifest.name === 'KSA PRÁCTIKA' && manifest.start_url === './index.html#home');
check('22 sin dependencias nuevas', !fs.existsSync(path.join(ROOT, 'package.json')) && !fs.existsSync(path.join(ROOT, 'node_modules')));
check('23 smoke real de navegador', browserSmoke.ok === true, JSON.stringify(browserSmoke.checks));
check('24 consola limpia en navegador', browserSmoke.results?.console?.runtimeExceptions === 0 && browserSmoke.results?.console?.consoleErrors === 0);
check('25 carga local antes de Firebase', ['reload_local_first', 'offline_local_first', 'slow_network_local_first'].every((key) => {
  const row = browserSmoke.results?.[key] || {};
  return row.localAt > 0 && row.firebaseAt > 0 && row.localAt <= row.firebaseAt && row.snapshot?.ventas >= 1 && row.snapshot?.seguimiento >= 1;
}));

console.log(JSON.stringify({ ok: true, passed: checks.length, checks }, null, 2));
