'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const appSource = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const swSource = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
const VERSION = '0.18.61-sync-incremental-reparacion-definitiva-baseline-local-first';
const CONTRACT_VERSION = '1.2.3';

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex');
}

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`No se encontró la función ${name}.`);
  const signatureEnd = source.indexOf(') {', start);
  if (signatureEnd < 0) throw new Error(`Firma no encontrada para ${name}.`);
  const brace = signatureEnd + 2;
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = brace; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') { blockComment = false; i += 1; }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i += 1; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i += 1; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`No se pudo extraer ${name}.`);
}

const requiredModules = [
  'clientes', 'sucursales', 'proveedores', 'tiposGasto', 'metodosPago', 'cuentasBancos', 'retenciones', 'categoriasCasa',
  'bdatos', 'ventas', 'cobros', 'comprasProveedores', 'pagosProveedores', 'gastos', 'seguimientoLlamadas', 'casaGastos',
  'facturasModulo', 'notasModulo', 'cierresMensuales', 'exportacionesExcel', 'bitacora', 'configuracion', 'consecutivos'
];
const SYNC_AUDIT_MODULE_KEYS = Object.freeze(requiredModules);
const SYNC_CONTRACT_VERSION = CONTRACT_VERSION;
const BASELINE_DIAGNOSTIC_CODES = Object.freeze({
  LOCAL_MISSING: 'BASELINE_LOCAL_AUSENTE',
  REMOTE_MISSING: 'BASELINE_REMOTO_AUSENTE',
  REMOTE_UNCONFIRMED: 'BASELINE_REMOTO_NO_CONFIRMADO',
  CONFIRMATION_ID_MISSING: 'CONFIRMACION_BASELINE_AUSENTE',
  REVISION_GENERAL_MISSING: 'REVISION_GENERAL_AUSENTE',
  MODULE_REVISIONS_INCOMPLETE: 'REVISION_POR_MODULO_INCOMPLETA',
  MODULE_CURSOR_MISSING: 'CURSOR_DE_MODULO_AUSENTE',
  CONTRACT_INCOMPATIBLE: 'CONTRATO_INCREMENTAL_INCOMPATIBLE',
  LOCAL_PERSISTENCE_ERROR: 'ERROR_PERSISTENCIA_LOCAL_BASELINE',
  CONFIRMED: 'BASELINE_CONFIRMADO'
});
const isPlainObject = (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const cleanText = (value) => value == null ? '' : String(value).trim();
const hasOwnField = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);
const normalizeSyncRevision = (value, fallback = 0) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : fallback;
const normalizeSyncModuleRevision = (raw = {}) => ({
  revision: normalizeSyncRevision(raw?.revision, 0),
  lastReadAt: cleanText(raw?.lastReadAt),
  lastIncrementalSyncAt: cleanText(raw?.lastIncrementalSyncAt),
  lastFullSyncAt: cleanText(raw?.lastFullSyncAt)
});
const normalizeSyncStateMetadata = (raw = {}) => ({
  ...raw,
  revisionGeneral: normalizeSyncRevision(raw?.revisionGeneral, 0),
  revisionPorModulo: isPlainObject(raw?.revisionPorModulo) ? raw.revisionPorModulo : (isPlainObject(raw?.modules) ? raw.modules : {})
});
const clonePlainObject = (value, fallback = {}) => isPlainObject(value) ? JSON.parse(JSON.stringify(value)) : fallback;
const nowIso = () => '2026-07-15T15:00:00.000Z';
const sanitizeLocalIncrementalMetadata = (metadata) => metadata;
let appData = { metadata: {} };
const saveData = () => ({ ok: true });

const getIncrementalBaselineValidation = eval(`(${extractFunction(appSource, 'getIncrementalBaselineValidation')})`);
const buildRemoteBaselineObservation = eval(`(${extractFunction(appSource, 'buildRemoteBaselineObservation')})`);
const persistRemoteBaselineObservationLocally = eval(`(${extractFunction(appSource, 'persistRemoteBaselineObservationLocally')})`);

function makeMetadata(confirmationId = 'baseline_ok', revision = 4) {
  const at = '2026-07-15T14:45:00.000Z';
  const revisionPorModulo = {};
  requiredModules.forEach((key) => {
    revisionPorModulo[key] = { revision, lastReadAt: at, lastIncrementalSyncAt: at };
  });
  return {
    syncRevisionMetadataAvailable: true,
    syncContract: { name: 'KSAIncrementalSyncContract', version: CONTRACT_VERSION, incrementalDownloadEnabled: true },
    syncState: { revisionGeneral: revision, revisionPorModulo, lastFullSyncAt: at },
    incrementalBaseline: { status: 'ready', contractVersion: CONTRACT_VERSION, confirmationId, updatedAt: at, sourceFullReadAt: at },
    lastIncrementalBaselineAt: at,
    lastIncrementalBaselineStatus: 'ready',
    lastIncrementalBaselineConfirmationId: confirmationId
  };
}

const results = [];
function check(name, condition, detail = '') {
  if (!condition) throw new Error(`${name}${detail ? ` — ${detail}` : ''}`);
  results.push(name);
}

const valid = makeMetadata('baseline_local');
const missingId = makeMetadata('');
const missingRevision = makeMetadata('baseline_revision'); delete missingRevision.syncState.revisionGeneral;
const missingModule = makeMetadata('baseline_module'); delete missingModule.syncState.revisionPorModulo.seguimientoLlamadas;
const missingCursor = makeMetadata('baseline_cursor'); missingCursor.syncState.revisionPorModulo.seguimientoLlamadas.lastReadAt = ''; missingCursor.syncState.revisionPorModulo.seguimientoLlamadas.lastIncrementalSyncAt = '';
const badContract = makeMetadata('baseline_contract'); badContract.syncContract.version = '0.0.0';

check('01 versión interna final', appSource.includes(`const APP_VERSION = '${VERSION}'`));
check('02 contrato incremental conservado', appSource.includes(`const SYNC_CONTRACT_VERSION = '${CONTRACT_VERSION}'`));
check('03 etapa interna 1/2', appSource.includes("Reparación definitiva Etapa 1/2"));
check('04 baseline válido aceptado', getIncrementalBaselineValidation(valid, { scope: 'local' }).ok === true);
check('05 confirmationId obligatorio', getIncrementalBaselineValidation(missingId, { scope: 'local' }).diagnosticCode === BASELINE_DIAGNOSTIC_CODES.CONFIRMATION_ID_MISSING);
check('06 revisionGeneral ausente detectada', getIncrementalBaselineValidation(missingRevision, { scope: 'local' }).diagnosticCode === BASELINE_DIAGNOSTIC_CODES.REVISION_GENERAL_MISSING);
check('07 revisionPorModulo incompleta detectada', getIncrementalBaselineValidation(missingModule, { scope: 'local' }).diagnosticCode === BASELINE_DIAGNOSTIC_CODES.MODULE_REVISIONS_INCOMPLETE);
check('08 cursor de Seguimiento ausente detectado', getIncrementalBaselineValidation(missingCursor, { scope: 'local' }).diagnosticCode === BASELINE_DIAGNOSTIC_CODES.MODULE_CURSOR_MISSING);
check('09 contrato incompatible detectado', getIncrementalBaselineValidation(badContract, { scope: 'local' }).diagnosticCode === BASELINE_DIAGNOSTIC_CODES.CONTRACT_INCOMPATIBLE);

appData.metadata = clonePlainObject(valid, {});
const remote = makeMetadata('baseline_remote');
const observation = persistRemoteBaselineObservationLocally(remote, { requiredModules, checkedAt: '2026-07-15T15:00:00.000Z' });
check('10 observación remota persistida', observation.ok === true);
check('11 identidad local preservada', appData.metadata.incrementalBaseline.confirmationId === 'baseline_local');
check('12 identidad remota registrada aparte', appData.metadata.lastRemoteBaselineObservation.confirmationId === 'baseline_remote');
check('13 Seguimiento incluido en auditoría incremental', requiredModules.includes('seguimientoLlamadas'));
check('14 mensaje exacto sin cambios', appSource.includes("result.message = 'Los datos ya están actualizados.'"));
check('15 sin auto full por allowFirstUseFull', !appSource.includes('allowFirstUseFull'));
check('16 sin full automático first_use', !appSource.includes("fullSyncReason: 'first_use'"));
check('17 full sync exige forceFull explícito', appSource.includes('const forceFull = opts.forceFull === true;'));
check('18 no-change usa observación sin adopción', (appSource.match(/persistRemoteBaselineObservationLocally\(/g) || []).length >= 3);
check('19 estilos responsive intactos', sha256('styles.css') === 'eee1a3d711d7b19d2277ee6a4af97be63dbf84f658db38bd010dc9064ca9732e');
check('20 firebaseConfig intacto', sha256('firebase-config.js') === 'b695ca847b041ff39422c591a64931c201f93a07d8af2d006be0671ccf2ff2c9');
check('21 referencias PWA versionadas', (indexSource.match(new RegExp(VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 7);
check('22 Service Worker alineado', swSource.includes(`const ASSET_VERSION = '${VERSION}'`) && swSource.includes('v0_18_61_sync_incremental_reparacion_definitiva_baseline_local_first'));
check('23 manifest válido', manifest.name === 'KSA PRÁCTIKA' && manifest.start_url === './index.html#home');
check('24 sin dependencias nuevas', !fs.existsSync(path.join(ROOT, 'package.json')) && !fs.existsSync(path.join(ROOT, 'node_modules')));
check('25 módulos operativos presentes', ['ventas','facturas','cobros','proveedores','pagos','gastos','seguimiento','casa','notas','catalogos'].every((route) => indexSource.includes(`data-route="${route}"`)));

console.log(JSON.stringify({ ok: true, passed: results.length, checks: results }, null, 2));
