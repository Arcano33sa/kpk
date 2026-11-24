'use strict';
// Pruebas aisladas: no arrancan la aplicación, navegador, SDK ni servicios remotos.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const clone = (value) => JSON.parse(JSON.stringify(value));
function extract(name) {
  const match = new RegExp(`^  (?:async )?function ${name}\\(`, 'm').exec(source);
  assert(match, `No se encontró ${name}`);
  const end = source.indexOf('\n  }', match.index);
  assert(end > match.index);
  return source.slice(match.index, end + 4);
}
const names = [
  'finalizeBankMergeMaps', 'buildCatalogMergeMaps', 'catalogRecordsMatchForMerge', 'bankCatalogRecordsHaveSameMethods', 'getCanonicalBankId', 'mapBankReferences', 'applyBankAliasesToData', 'bankConsolidationSignature',
  'bankConsolidationNormalizer', 'buildBankConsolidationPlan', 'readBankConsolidationNotes',
  'readBankConsolidationJournal', 'renderBankConsolidationTool', 'prepareBankConsolidationBackup',
  'commitBankConsolidationTransaction', 'applyBankConsolidation', 'cancelBlockedBankConsolidation',
  'normalizeKeyForCompare', 'normalizeBankType', 'getBankEnabledMethods', 'getBankTypeDisplay',
  'getBankTypeForPaymentMethod', 'findPaymentMethodByValue', 'bankMatchesType', 'parseFinanciamientoPool',
  'normalizeCatalogRecord', 'validateTiposCambioFinancieros', 'bancoFechaValida', 'simpleHashText'
];
const storage = new Map();
let failKey = '', failed = false, downloads = 0, transactionCalls = 0, writes = 0;
const localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem(key, value) {
    if (key === failKey && !failed) { failed = true; throw new Error('Almacenamiento simulado lleno'); }
    storage.set(key, String(value));
  }
};
const context = vm.createContext({
  cleanText: (value) => String(value ?? '').replace(/\s+/g, ' ').trim(),
  normalizeNameForCompare: (value) => String(value ?? '').trim().toLowerCase(),
  isPlainObject: (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value),
  nowIso: () => '2026-11-23T12:00:00.000Z', todayInputValue: () => '2026-11-23',
  generateId: () => 'plan-test',
  isPaymentTermsCatalog: () => false,
  normalizeVentaRecord: (record) => clone(record), normalizeCobroRecord: (record) => clone(record),
  normalizeCompraProveedorRecord: (record) => clone(record), normalizePagoProveedorRecord: (record) => clone(record),
  normalizeGastoRecord: (record) => clone(record), normalizeCasaGastoRecord: (record) => clone(record),
  normalizePrestamoFinancieroRecord: (record) => clone(record), normalizeTipoCambioFinanciero: (record) => clone(record),
  normalizePendienteRecord: (record) => clone(record),
  // El plan no recalcula importes. Los validadores financieros se prueban en sus etapas propias.
  validatePrestamosFinancieros: () => [], validateFinanciamientoSnapshot: () => [],
  getCatalogRecords: (id) => context.appData[id] || [],
  getSortedCatalogRecords: (id) => context.appData[id] || [],
  getBankAccountDisplayName: (id) => context.appData.cuentasBancos.find((bank) => bank.id === id)?.nombre || id,
  canCurrentRole: () => true, getPendingSessionChanges: () => [],
  cloudOperationState: { isReading: false, isWriting: false, isHydrating: false },
  isCloudDataSourceActive: () => false,
  localStorage, viewRoot: { inert: false, querySelector: () => ({ checked: true }) },
  downloadTextFile: () => { downloads += 1; },
  renderRoute: () => {}, registerActivity: () => {},
  escapeHtml: (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;'),
  sanitizeFirestoreDocId: (value) => value,
});
const bankStart = source.indexOf("      id: 'cuentasBancos',");
const bankEnd = source.indexOf('\n    },', bankStart);
vm.runInContext(`
const FIRESTORE_IMPORT_BATCH_LIMIT=420;
${source.match(/^  const BANK_CONSOLIDATION_MAX_DOCS = .*$/m)[0]}
const BANK_TYPE_OPTIONS=['Transferencia','Depósito','Tarjeta'];
const CATALOGS=[{${source.slice(bankStart, bankEnd)}}];
const APP_NAME='KSA PRÁCTIKA';const APP_VERSION='test';const SCHEMA_VERSION='1.0.0';
const STORAGE_KEY='main';const NOTES_STORAGE_KEY='notes';const ADMIN_RESTRICTED_MESSAGE='Solo administrador';
const FIRESTORE_WORKSPACE_ID_PLACEHOLDER='test';const FIRESTORE_METADATA_SYSTEM_ID='system';
${source.match(/^  const BANK_CONSOLIDATION_JOURNAL_KEY = .*$/m)[0]}
${source.match(/^  const BANK_CONSOLIDATION_BACKUP_PREFIX = .*$/m)[0]}
${source.match(/^  const BANK_CONSOLIDATION_KEYS = .*$/m)[0]}
let bankConsolidationState={plan:null,backupKey:'',busy:false,message:'',error:false};
${names.map(extract).join('\n')}
`, context);
const run = (code) => vm.runInContext(code, context);
const json = (code) => clone(run(code));
function fixture() {
  const bank = (id, tipo, methods) => ({ id, nombre: id, tipo, ...(methods ? { metodosHabilitados: methods } : {}), activo: true, createdAt: '2026-01-01', updatedAt: '2026-01-01' });
  const movement = (id, cuentaBancoId, metodoPagoId = 'card') => ({ id, cuentaBancoId, cuentaBancoNombre: 'Nombre histórico', metodoPagoId, monto: 17, fecha: '2026-10-10' });
  return {
    cuentasBancos: [bank('new', 'Transferencia', ['Transferencia', 'Tarjeta', 'Depósito']), bank('old-transfer', 'Transferencia'), bank('old-card', 'Tarjeta')],
    metodosPago: [{ id: 'transfer', nombre: 'Transferencia' }, { id: 'card', nombre: 'Tarjeta' }, { id: 'deposit', nombre: 'Depósito' }],
    ventas: [{ id: 'sale', logistica: { gasto: movement('nested', 'old-card') } }],
    cobros: [movement('receipt', 'old-transfer', 'transfer')],
    comprasProveedores: [{ id: 'purchase', condicionPagoSnapshot: 'Contado', bancoPagoContadoId: 'old-transfer', bancoPagoContadoNombre: 'Anterior', metodoPagoContadoId: 'transfer' }],
    pagosProveedores: [{ ...movement('payment', 'old-card'), revisionFinanciamiento: 2, financiamiento: { prestamoId: 'pool:' + encodeURIComponent(JSON.stringify(['old-transfer', 'NIO'])), conversion: { bancoId: 'old-transfer', bancoNombre: 'Original', tasa: 36.5, montoOrigen: 10 }, aplicaciones: [{ prestamoId: 'loan', monto: 10 }] } }],
    gastos: [movement('expense', 'old-card')], casaGastos: [movement('home', 'old-card')],
    prestamosFinancieros: [{ id: 'loan', cuentaBancoId: 'old-transfer', capitalDesembolsado: 100, netoRecibido: 100, abonos: [movement('repayment', 'old-card')], calendarios: [{ id: 'calendar', bancoId: 'old-transfer', cuotas: [{ id: 'quota', capital: 100 }] }] }],
    tiposCambioFinancieros: [],
    cierresMensuales: [{ id: 'closure', snapshot: { cuentaBancoId: 'old-card', monto: 999 } }],
    exportacionesExcel: [{ id: 'export', snapshot: { bancoId: 'old-transfer' } }],
    metadata: { marker: 'preserved' }, configuracion: { monedaPrincipal: 'NIO' }
  };
}
const notesFixture = () => ({ version: 1, pendientes: [{ id: 'note', cuentaBancoId: 'old-card', monto: 9 }], notas: [{ id: 'text', texto: 'Conservar' }] });
context.appData = fixture(); context.notes = notesFixture();
const original = clone(context.appData);
run("var plan=buildBankConsolidationPlan(appData,notes,'new',['old-transfer','old-card'])");
assert.deepEqual(json('plan.errors'), []);
assert.deepEqual(context.appData, original, 'La vista previa es pura');
assert.equal(run('plan.afterData.ventas[0].logistica.gasto.cuentaBancoId'), 'new');
assert.equal(run('plan.afterData.comprasProveedores[0].bancoPagoContadoId'), 'new');
assert.equal(run('plan.afterData.pagosProveedores[0].financiamiento.conversion.bancoId'), 'new');
assert.equal(run('parseFinanciamientoPool(plan.afterData.pagosProveedores[0].financiamiento.prestamoId).cuentaBancoId'), 'new');
assert.equal(run('plan.afterData.pagosProveedores[0].financiamiento.aplicaciones[0].prestamoId'), 'loan');
assert.equal(run('plan.afterData.prestamosFinancieros[0].abonos[0].cuentaBancoId'), 'new');
assert.equal(run('plan.afterNotes.pendientes[0].cuentaBancoId'), 'new');
assert.deepEqual(json('plan.afterData.cierresMensuales'), original.cierresMensuales);
assert.deepEqual(json('plan.afterData.exportacionesExcel'), original.exportacionesExcel);
assert.deepEqual(json('plan.afterData.prestamosFinancieros[0].calendarios'), original.prestamosFinancieros[0].calendarios);
assert.equal(run('plan.afterData.gastos[0].cuentaBancoNombre'), 'Nombre histórico');
const withoutBankLinks = (value) => {
  if (Array.isArray(value)) return value.map(withoutBankLinks);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).filter(([key,item]) => !['cuentaBancoId','bancoPagoContadoId','bancoId','revisionFinanciamiento'].includes(key) && !(key==='prestamoId' && typeof item==='string' && item.startsWith('pool:'))).map(([key,item])=>[key,withoutBankLinks(item)]));
};
for (const key of ['ventas','cobros','comprasProveedores','pagosProveedores','gastos','casaGastos','prestamosFinancieros','tiposCambioFinancieros']) {
  assert.deepEqual(withoutBankLinks(json(`plan.afterData.${key}`)),withoutBankLinks(original[key]),`Importes, fechas, nombres e IDs de movimientos se conservan en ${key}`);
}

assert.equal(run('plan.afterData.pagosProveedores[0].revisionFinanciamiento'), 3);
assert.equal(run("plan.afterData.cuentasBancos.find(b=>b.id==='old-card').activo"), false);
assert.equal(run("plan.afterData.cuentasBancos.find(b=>b.id==='old-card').consolidadoEnId"), 'new');
assert.equal(run("getCanonicalBankId('old-card',plan.afterData.cuentasBancos)"), 'new');
assert.equal(run("getCanonicalBankId('a',[{id:'a',consolidadoEnId:'b'},{id:'b',consolidadoEnId:'a'}])"), 'a');
assert.notEqual(run("buildBankConsolidationPlan(appData,notes,'new',['new']).errors.length"), 0);
run("bankConsolidationState.plan=buildBankConsolidationPlan(appData,notes,'',[])");
assert.doesNotThrow(() => run('renderBankConsolidationTool()'), 'Selección inválida no rompe el catálogo');
run('bankConsolidationState.plan=plan');
context.appData.cuentasBancos[0].metodosHabilitados = ['Transferencia'];
assert.notEqual(run("buildBankConsolidationPlan(appData,notes,'new',['old-card']).errors.length"), 0);
context.appData = fixture();
const rate = (id, bancoId) => ({ id, bancoId, bancoNombre: 'Histórico', fecha: '2026-10-01', compra: 36.5, venta: 36.6, version: 1, createdAt: '2026-10-01T12:00:00Z' });
context.appData.tiposCambioFinancieros = [rate('r1', 'old-transfer'), rate('r2', 'new')];
assert(run("buildBankConsolidationPlan(appData,notes,'new',['old-transfer']).errors").some((error) => /versión/.test(error)), 'Se bloquea conflicto de versiones de tipo de cambio');
context.appData = fixture();
// Los respaldos antiguos conservan los retirados y se resuelven al definitivo.
context.aliasData = clone(original); context.aliasData.cuentasBancos = json('plan.afterData.cuentasBancos');
assert.equal(run("applyBankAliasesToData(aliasData).gastos[0].cuentaBancoId"), 'new');
assert.equal(run("applyBankAliasesToData(aliasData).cierresMensuales[0].snapshot.cuentaBancoId"), 'old-card');
assert.equal(run("normalizeCatalogRecord({...plan.afterData.cuentasBancos[1],activo:true},CATALOGS[0]).activo"), false);
assert.equal(run("normalizeCatalogRecord(plan.afterData.cuentasBancos[1],CATALOGS[0]).consolidadoEnId"), 'new');
// Reimportar catálogos anteriores remapea al definitivo y no reactiva el retirado.
context.mergeTarget = clone(run('plan.afterData'));
context.mergeIncoming = { cuentasBancos: clone(original.cuentasBancos) };
run("var importedMaps=buildCatalogMergeMaps(mergeTarget,mergeIncoming,'2026-11-23')");
assert.equal(run("importedMaps.cuentasBancos.get('old-card')"),'new');
assert.equal(run("mergeTarget.cuentasBancos.find(b=>b.id==='old-card').activo"),false);
context.mergeIncoming = {cuentasBancos:[{id:'imported-old',nombre:'Alias importado',tipo:'Tarjeta',consolidadoEnId:'imported-new',activo:false},{...clone(original.cuentasBancos[0]),id:'imported-new'}]};
run("var insertedMaps=buildCatalogMergeMaps(mergeTarget,mergeIncoming,'2026-11-23')");
assert.equal(run("mergeTarget.cuentasBancos.find(b=>b.id==='imported-old').consolidadoEnId"),'new');
assert.equal(run("insertedMaps.cuentasBancos.get('imported-old')"),'new');
assert.equal(run("insertedMaps.cuentasBancos.get('imported-new')"),'new');
// Simulador transaccional: las escrituras solo se publican si termina toda la función.
function fakeFirestore(plan, conflict = false) {
  const docs = new Map();
  const entryPath = (entry) => entry.key === 'cuentasBancos' ? `workspaces/test/catalogos/cuentasBancos/items/${entry.id}` : `workspaces/test/${entry.key === 'pendientes' ? 'notasModulo' : entry.key}/${entry.key === 'pendientes' ? 'pendiente_' : ''}${entry.id}`;
  for (const entry of plan.entries.filter((item) => item.key !== 'tiposCambioFinancieros')) docs.set(entryPath(entry), clone(entry.before));
  if (conflict) docs.get('workspaces/test/gastos/expense').monto = 999;
  const api = {
    doc: (_db, ...parts) => ({ path: parts.join('/') }),
    async runTransaction(_db, callback) {
      transactionCalls += 1;
      const pending = [];
      let writing = false;
      const result = await callback({
        async get(ref) { assert(!writing, 'Todas las lecturas preceden a las escrituras'); const data = docs.get(ref.path); return { exists: () => Boolean(data), data: () => clone(data) }; },
        set(ref, data, options) { writing = true; pending.push({ ref, data: clone(data), options }); }
      });
      for (const { ref, data, options } of pending) { docs.set(ref.path, options?.merge ? { ...(docs.get(ref.path) || {}), ...data } : data); writes += 1; }
      return result;
    }
  };
  return { api, docs };
}
(async () => {
  const cleanPlan = json('plan');
  const remote = fakeFirestore(cleanPlan);
  context.txContext = { db: {}, fs: remote.api, user: { email: 'test@example.invalid' } };
  await run('commitBankConsolidationTransaction(plan,txContext)');
  assert.equal(remote.docs.get('workspaces/test/gastos/expense').cuentaBancoId, 'new');
  const committedWrites = writes;
  await run('commitBankConsolidationTransaction(plan,txContext)');
  assert.equal(writes, committedWrites, 'Reintento no vuelve a escribir');
  const conflict = fakeFirestore(cleanPlan, true);
  context.txContext = { db: {}, fs: conflict.api, user: { email: '' } };
  const beforeConflict = writes;
  await assert.rejects(run('commitBankConsolidationTransaction(plan,txContext)'), /otro dispositivo/);
  assert.equal(writes, beforeConflict, 'Conflicto no publica ningún cambio');
  assert.equal(conflict.docs.get('workspaces/test/catalogos/cuentasBancos/items/old-card').activo, true);
  const deleted = fakeFirestore(cleanPlan);
  deleted.docs.get('workspaces/test/gastos/expense')._deleted = true;
  context.txContext={db:{},fs:deleted.api,user:{email:''}};
  const beforeDeleted=writes;
  await assert.rejects(run('commitBankConsolidationTransaction(plan,txContext)'),/retirado/);
  assert.equal(writes,beforeDeleted,'No se reviven registros retirados por otro dispositivo');

  // Copia previa inmutable y descarga; no se toca el consecutivo JSON.
  storage.set('main', JSON.stringify(context.appData)); storage.set('notes', JSON.stringify(context.notes));
  storage.set('KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1', '42');
  run('bankConsolidationState.plan=plan;prepareBankConsolidationBackup()');
  const backupKey = run('bankConsolidationState.backupKey');
  assert(backupKey); const backup = storage.get(backupKey);
  assert.equal(JSON.parse(backup).registros.gastos[0].cuentaBancoId,'old-card');
  assert.equal(JSON.parse(backup).almacenamiento.KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1,'42');
  run('prepareBankConsolidationBackup()');
  assert.equal(storage.get(backupKey), backup); assert.equal(downloads, 2);
  assert.equal(storage.get('KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1'), '42');
  // Fallo local después de escribir Notas: diario permite finalizar sin volver a crear registros.
  failKey = 'main'; failed = false;
  await run('applyBankConsolidation()');
  assert.equal(run('readBankConsolidationJournal().phase'), 'remote_confirmed');
  assert.equal(context.appData.gastos[0].cuentaBancoId, 'old-card');
  assert.equal(JSON.parse(storage.get('notes')).pendientes[0].cuentaBancoId, 'new');
  failKey = '';
  await run('applyBankConsolidation(true)');
  assert.equal(run('readBankConsolidationJournal().phase'), 'complete');
  assert.equal(context.appData.gastos[0].cuentaBancoId, 'new');
  assert.equal(context.appData.gastos.length, 1);
  assert.equal(storage.get(backupKey), backup);
  assert.equal(storage.get('KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1'), '42');
  assert.deepEqual(context.appData.cierresMensuales, original.cierresMensuales);
  assert.deepEqual(context.appData.exportacionesExcel, original.exportacionesExcel);
  assert.equal(run('bankConsolidationState.error'), false);
  // Ruta de nube completa simulada: commit confirmado + fallo local + reintento.
  storage.clear(); context.appData = fixture(); context.notes = notesFixture();
  context.isCloudDataSourceActive = () => true;
  storage.set('main', JSON.stringify(context.appData)); storage.set('notes', JSON.stringify(context.notes));
  run("bankConsolidationState={plan:buildBankConsolidationPlan(appData,notes,'new',['old-card','old-transfer']),backupKey:'',busy:false};prepareBankConsolidationBackup()");
  const cloudPlan = json('bankConsolidationState.plan');
  const cloud = fakeFirestore(cloudPlan);
  cloud.docs.get('workspaces/test/gastos/expense').opaqueServerField = { conservar: 'sin cambios' };
  context.parseMoney = value => Number(value || 0);
  context.toDateInputValue = value => String(value || '');
  vm.runInContext(extract('normalizeGastoRecord'),context);

  context.txContext = {db:{},fs:cloud.api,user:{email:'test@example.invalid'}};
  context.KSAFirebaseAdapter = {consolidateBankAccounts: async (plan) => {context.cloudInput=plan;await run('commitBankConsolidationTransaction(cloudInput,txContext)');}};
  failKey='main';failed=false;
  await run('applyBankConsolidation()');
  assert.equal(run('readBankConsolidationJournal().phase'),'remote_confirmed');
  const cloudWrites=writes;failKey='';
  await run('applyBankConsolidation(true)');
  assert.equal(writes,cloudWrites,'Finalizar localmente no repite las escrituras remotas');
  assert.equal(context.appData.gastos[0].cuentaBancoId,'new');
  assert.deepEqual(cloud.docs.get('workspaces/test/gastos/expense').opaqueServerField,{conservar:'sin cambios'});
  assert.equal(context.cloudOperationState.isWriting,false);
  // Un bloqueo ajeno no se libera al rechazar la operación.
  context.cloudOperationState.isWriting=true;
  await run('applyBankConsolidation()');
  assert.equal(context.cloudOperationState.isWriting,true);
  context.cloudOperationState.isWriting=false;
  // La herramienta rechaza una vista previa que dejó de representar los datos.
  storage.clear();context.appData=fixture();context.notes=notesFixture();
  storage.set('main',JSON.stringify(context.appData));storage.set('notes',JSON.stringify(context.notes));
  run("bankConsolidationState={plan:buildBankConsolidationPlan(appData,notes,'new',['old-card']),backupKey:'',busy:false};prepareBankConsolidationBackup()");
  context.appData.gastos[0].monto=123;
  const attempts=transactionCalls;
  await run('applyBankConsolidation()');
  assert.equal(transactionCalls,attempts);
  assert.equal(run('readBankConsolidationJournal()'),null);
  assert.equal(context.appData.gastos[0].monto,123);
  context.appData=fixture();context.appData.gastos=Array.from({length:405},(_,index)=>({id:'expense-'+index,cuentaBancoId:'old-card',monto:1,metodoPagoId:'card'}));
  assert(run("buildBankConsolidationPlan(appData,notes,'new',['old-card']).errors").some(error=>error.includes('400')));
  // Volumen real observado: 270 documentos de datos y un recibo de control.
  context.appData=fixture();
  context.appData.gastos=Array.from({length:260},(_,index)=>({id:'volume-'+index,cuentaBancoId:'old-card',monto:1,metodoPagoId:'card'}));
  run("var volumePlan=buildBankConsolidationPlan(appData,notes,'new',['old-card','old-transfer'])");
  assert.deepEqual(json('volumePlan.errors'),[]);
  assert.equal(run('volumePlan.entries.length+1'),271);
  const volume=fakeFirestore(json('volumePlan'));
  context.txContext={db:{},fs:volume.api,user:{email:''}};
  const volumeBefore=writes;
  await run('commitBankConsolidationTransaction(volumePlan,txContext)');
  assert.equal(writes-volumeBefore,271);
  assert.equal(volume.docs.get('workspaces/test/gastos/volume-259').cuentaBancoId,'new');
  const volumeWrites=writes;
  await run('commitBankConsolidationTransaction(volumePlan,txContext)');
  assert.equal(writes,volumeWrites,'Reintentar el grupo de 271 no duplica escrituras');
  const volumeConflict=fakeFirestore(json('volumePlan'));
  volumeConflict.docs.get('workspaces/test/gastos/volume-259').monto=99;
  context.txContext={db:{},fs:volumeConflict.api,user:{email:''}};
  await assert.rejects(run('commitBankConsolidationTransaction(volumePlan,txContext)'),/otro dispositivo/);
  assert.equal(writes,volumeWrites,'Un conflicto al final del grupo de 271 tampoco publica cambios');
  console.log('OK E4: vista previa pura, referencias anidadas, conflictos, retiro y aliases, transacción atómica simulada, reintentos idempotentes, respaldo inmutable, fallo local y recuperación, históricos y consecutivos intactos.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
