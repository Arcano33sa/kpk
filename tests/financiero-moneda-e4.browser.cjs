/* Prueba integral local: usa perfil temporal y datos ficticios; bloquea red externa. No instala dependencias. */
const fs=require('fs'),pathLib=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.KPK_PLAYWRIGHT_PATH || '/Users/juanguadamuz/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=pathLib.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const ctx=await browser.newContext({serviceWorkers:'block'});const errors=[],external=[];
 const handleRoute=async route=>{
  const u=new URL(route.request().url());if(u.origin!=='http://kpk.test'){external.push(u.origin);return route.abort();}
  const path=u.pathname==='/'?'/index.html':decodeURIComponent(u.pathname),file=root+path;
  if(path.includes('..'))return route.abort();
  if(path==='/firebase-config.js')return route.fulfill({body:'',contentType:'text/javascript'});
  if(!file.startsWith(root+'/')||!fs.existsSync(file))return route.abort();
  let body=fs.readFileSync(file);
  if(path==='/app.js'){
   body=body.toString().replace('  KSAFirebaseAdapter.initFirebase();','').replace('  initPreparedAccessScreen();','').replace('  setupPwaUpdateListeners();','');
   body=body.replace('    async function commitFinanciamientoEntries(entries, context) {','    window.__cloudFunds=commitFinanciamientoEntries;\n    window.__buildWrite=buildSessionChangeWrite;\n    async function commitFinanciamientoEntries(entries, context) {');
   body=body.replace('  bindRouteScrollShield();',`window.__t={fxSave:saveTipoCambioFinanciero,workbook:buildExcelWorkbookForPeriod,zip:buildXlsxZip,bank:bancoResumen,fxTab:()=>{financieroState.tab='monedas';renderRoute();},data:()=>JSON.parse(JSON.stringify(appData)),set:d=>{appData=normalizeData(d);saveData(appData);},initial:createInitialData,funds:getPrestamoFondos,normalize:normalizeData,validate:validateJsonBackupPayload,backup:buildJsonBackupPayload,apply:applyJsonBackupPayload,localApply:applyLocalJsonBackupToDevice,snapshotErrors:validateFinanciamientoSnapshot,validateFunding:validateFinanciamientoPago,summary:buildResumenTableroSummary,pending:getPendingSessionChanges,
    purchaseForm:(record=null,draft=null)=>{viewRoot.innerHTML=renderCompraProveedorForm(record,getActiveCatalogRecords('proveedores'),false,draft);bindViewActions();},
    paymentForm:(id,editing='')=>{const compra=appData.comprasProveedores.find(c=>c.id===id);viewRoot.innerHTML=editing?renderPagoProveedorEditForm(appData.pagosProveedores.find(p=>p.id===editing),getActiveCatalogRecords('metodosPago'),getActiveCatalogRecords('cuentasBancos')):renderPagoProveedorForm(compra,[compra],getActiveCatalogRecords('metodosPago'),getActiveCatalogRecords('cuentasBancos'),false);bindViewActions();},
    savePurchase:saveCompraProveedorRecord,savePayment:savePagoProveedorRecord,togglePurchase:toggleCompraProveedorRecord,annulPayment:annulPagoProveedorRecord,auto:buildAutoPagoCompraContado,annulLoan:annulPrestamoFinanciero,saveLoan:savePrestamoFinanciero,refresh:renderRoute,prepared:buildPreparedCloudImport,cloudImport:buildCloudImportSnapshot,clearPending:()=>{sessionChangeQueue=[];}};\n  bindRouteScrollShield();`);
  }
  return route.fulfill({body,contentType:(path.endsWith('.js')||path.endsWith('.mjs'))?'text/javascript':path.endsWith('.css')?'text/css':path.endsWith('.html')?'text/html':'application/octet-stream'});
 };
 await ctx.route('**/*',handleRoute);
 const page=await ctx.newPage(),startupWarnings=[];page.on('console',message=>{if(message.text().includes('se reinició la estructura'))startupWarnings.push(message.text());});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://kpk.test/#financiero');await page.waitForSelector('[data-financiero-form]');
 await page.evaluate(()=>{
  const d=__t.initial();d.proveedores=[{id:'provider',nombre:'Proveedor ficticio',activo:true,condicionPago:'Crédito',diasCredito:30}];
  d.metodosPago=[{id:'cash',nombre:'Efectivo',activo:true},{id:'transfer',nombre:'Transferencia',activo:true}];
  d.cuentasBancos=[{id:'bank',nombre:'Banco prueba',tipo:'Banco',activo:true}];
  d.clientes=[{id:'client',nombre:'Cliente prueba',activo:true}];d.sucursales=[{id:'branch',nombre:'Sucursal prueba',clienteId:'client',activo:true}];
  d.ventas=[{id:'sale',numeroDocumento:'OC-250894-PRUEBA',clienteId:'client',sucursalId:'branch',fechaOc:'2026-11-23',subtotal:2000,activo:true}];
  d.prestamosFinancieros=[{id:'loan',acreedor:'Banco ficticio',referencia:'PRESTAMO-PRUEBA',moneda:'NIO',fechaDesembolso:'2026-11-01',capitalDesembolsado:1000,netoRecibido:1000,cargosRetenidos:0,cuentaBancoId:'bank',cuentaBancoNombre:'Banco prueba',ventaIds:['sale'],activo:true}, {id:'usd',acreedor:'Banco ficticio',referencia:'USD-PRUEBA',moneda:'USD',fechaDesembolso:'2026-11-01',capitalDesembolsado:1000,netoRecibido:1000,cargosRetenidos:0,cuentaBancoId:'bank',ventaIds:[],activo:true}];
  d.tiposCambioFinancieros=[{id:'r1',bancoId:'bank',bancoNombre:'Banco prueba',fecha:'2026-11-23',compra:36.5,venta:37,version:1,observacion:'QA original',createdAt:'2026-11-23T12:00:00Z'}];
  __t.set(d);
 });
 async function purchase(amount,origin='prestamo',mixed='',existingId=''){
  await page.evaluate(({amount,existingId})=>{
   const record=existingId?__t.data().comprasProveedores.find(c=>c.id===existingId):null;
   __t.purchaseForm(record,{proveedorId:'provider',fechaCompra:'2026-11-23',condicionPagoSnapshot:'Contado',facturasRelacionadas:[{id:'fact-'+amount,numero:'FACT-'+amount,monto:amount,pendienteMonto:false}],ventaIds:['sale']});
  },{amount,existingId});
  if(existingId){await page.locator('[data-factura-proveedor-monto]').first().fill(String(amount));await page.locator('[data-factura-proveedor-monto]').first().dispatchEvent('input');}
  await page.locator('[name="condicionCompra"]').selectOption('Contado');
  await page.locator('[name="metodoPagoContadoId"]').selectOption('cash');
  await page.locator('[name="fondosOrigen"]').selectOption(origin);
  if(['prestamo','mixto'].includes(origin))await page.locator('[name="fondosPrestamoId"]').selectOption('usd');
  if(origin==='mixto')await page.locator('[name="fondosMontoPrestamo"]').fill(String(mixed));
  await page.locator('[data-compra-form]').evaluate(form=>__t.savePurchase(form));
 }
 try {
 await purchase(3650);let d=await page.evaluate(()=>__t.data());assert.equal(d.comprasProveedores.length,1);let auto=d.pagosProveedores[0],cashId=d.comprasProveedores[0].id;assert.equal(auto.financiamiento.conversion.montoOrigen,100);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),900);assert.equal(await page.evaluate(()=>__t.bank(__t.data().prestamosFinancieros.find(p=>p.id==='usd')).capitalPendiente),1000);
 // Cambio nuevo: el registro anterior debe seguir en 36.5.
 await page.evaluate(()=>__t.fxTab());await page.locator('[name="bancoId"]').selectOption('bank');await page.locator('[name="compra"]').fill('36.6');await page.locator('[name="venta"]').fill('37.1');await page.locator('[data-tipo-cambio-form] button[type="submit"]').click();assert.equal((await page.evaluate(()=>__t.data())).tiposCambioFinancieros.length,2);
 await purchase(3650,'prestamo','',cashId);d=await page.evaluate(()=>__t.data());auto=d.pagosProveedores.find(p=>p.autoGenerado);assert.equal(auto.financiamiento.conversion.tasa,36.5);assert.equal(auto.financiamiento.conversion.montoOrigen,100);
 await purchase(7320,'mixto',3660);d=await page.evaluate(()=>__t.data());assert.equal(d.pagosProveedores.find(p=>p.montoPagado===7320).financiamiento.conversion.montoOrigen,100);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),800);
 const snapshot=JSON.stringify(d);await purchase(40000);assert.equal(JSON.stringify(await page.evaluate(()=>__t.data())),snapshot);
 // Pago posterior con formulario real.
 await page.evaluate(()=>{const d=__t.data();d.comprasProveedores.push({id:'credit',proveedorId:'provider',proveedorNombre:'Proveedor ficticio',facturaReferencia:'CREDITO-QA',facturasRelacionadas:[{id:'fc',numero:'CREDITO-QA',monto:10000}],ventaIds:['sale'],fechaCompra:'2026-11-23',fechaVencimiento:'2026-12-23',diasCredito:30,totalCompra:10000,condicionPagoSnapshot:'Crédito',activo:true});__t.set(d);__t.paymentForm('credit');});
 await page.locator('[name="montoPagado"]').focus();await page.locator('[name="montoPagado"]').fill('3660');await page.locator('[name="metodoPagoId"]').selectOption('cash');await page.locator('[name="fondosOrigen"]').selectOption('prestamo');await page.locator('[name="fondosPrestamoId"]').selectOption('usd');assert((await page.locator('[data-funding-conversion]').innerText()).includes('100.00'),await page.locator('[data-funding-conversion]').innerText());await page.locator('[data-pago-form]').evaluate(form=>__t.savePayment(form));d=await page.evaluate(()=>__t.data());const manual=d.pagosProveedores.find(p=>!p.autoGenerado);assert.equal(manual.financiamiento.conversion.tasa,36.6);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),700);
 await page.evaluate(id=>__t.annulPayment(id),manual.id);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),800);await page.evaluate(id=>__t.togglePurchase(id),cashId);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),900);await page.evaluate(id=>__t.togglePurchase(id),cashId);assert.equal(await page.evaluate(()=>__t.funds('usd').disponibles),800);
 // Fallo de almacenamiento: conservar el estado anterior íntegro.
 const rollback=await page.evaluate(()=>{const d=__t.data();__t.paymentForm('credit');const form=document.querySelector('[data-pago-form]');form.elements.montoPagado.value='366';form.elements.metodoPagoId.value='cash';form.elements.fondosOrigen.value='prestamo';form.elements.fondosOrigen.dispatchEvent(new Event('change',{bubbles:true}));form.elements.fondosPrestamoId.value='usd';form.elements.fondosPrestamoId.dispatchEvent(new Event('change',{bubbles:true}));const original=Storage.prototype.setItem;let attempts=0;Storage.prototype.setItem=function(){attempts++;throw Error('quota QA')};try{__t.savePayment(form)}finally{Storage.prototype.setItem=original}return {same:JSON.stringify(__t.data())===JSON.stringify(d),attempts};});assert(rollback.same);assert(rollback.attempts>0);
 // Generar archivo real con el exportador de la aplicación.
 const exported=await page.evaluate(async()=>{const workbook=__t.workbook('11','2026',{mode:'consulta',fileName:'QA Moneda E4.xlsx'});const bytes=await __t.zip(workbook).generateAsync({type:'uint8array'});return {bytes:Array.from(bytes),workbook};});
 fs.mkdirSync('/tmp/kpk-moneda-e4-qa',{recursive:true});fs.writeFileSync('/tmp/kpk-moneda-e4-qa/QA Moneda E4.xlsx',Buffer.from(exported.bytes));fs.writeFileSync('/tmp/kpk-moneda-e4-qa/workbook.json',JSON.stringify(exported.workbook));
 const payload=await page.evaluate(()=>__t.backup());const valid=await page.evaluate(payload=>__t.validate(payload).preview,payload);assert(valid.isValid,JSON.stringify(valid.errors));
 // Importación en un segundo perfil vacío: JSON de ida y vuelta.
 const importContext=await browser.newContext({serviceWorkers:'block'});await importContext.route('**/*',handleRoute);const second=await importContext.newPage();second.on('pageerror',error=>errors.push(error.message));await second.goto('http://kpk.test/#financiero');await second.waitForSelector('[data-financiero-form]');const restored=await second.evaluate(payload=>{const parsed=__t.validate(payload);if(!parsed.preview.isValid)throw Error(parsed.preview.errors.join('; '));__t.clearPending();__t.localApply(parsed.data,{fileName:'QA JSON',consecutivos:payload.consecutivos,activityLog:parsed.activityLog});return {counts:__t.data().pagosProveedores.length,available:__t.funds('usd').disponibles,errors:__t.snapshotErrors(__t.data())}},payload);assert.equal(restored.counts,3);assert.equal(restored.available,800);assert.deepEqual(restored.errors,[]);await importContext.close();
 // Verificar la persistencia real incluyendo Casa e historial de exportaciones.
 await page.evaluate(workbook=>{const d=__t.data();d.casaGastos=[{id:'casa-qa',fecha:'2026-11-23',categoriaCasaId:'home',descripcion:'QA persistencia',monto:20,metodoPagoId:'cash',activo:true}];d.exportacionesExcel=[{id:'export-qa',tipo:'consulta',nombreArchivo:'QA Moneda E4.xlsx',periodo:'2026-11',month:'11',year:'2026',exportadoAt:'2026-11-23T18:00:00Z',snapshotConsulta:workbook.snapshotConsulta}];__t.set(d);},exported.workbook);
 const beforeReload=await page.evaluate(()=>({payments:__t.data().pagosProveedores.length,rates:__t.data().tiposCambioFinancieros.length,available:__t.funds('usd').disponibles}));await page.reload();await page.waitForSelector('[data-financiero-form]');const afterReload=await page.evaluate(()=>({payments:__t.data().pagosProveedores.length,rates:__t.data().tiposCambioFinancieros.length,available:__t.funds('usd').disponibles}));assert.deepEqual(afterReload,beforeReload,JSON.stringify(startupWarnings));assert.equal(startupWarnings.length,0);
 // Capturas de las vistas nuevas para revisión visual.
 await page.evaluate(()=>__t.fxTab());await page.locator('[name="compra"]').fill('36.7');await page.screenshot({path:'/tmp/kpk-moneda-e4-qa/desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/kpk-moneda-e4-qa/mobile.png',fullPage:true});
 assert.equal(external.length,0);assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',cashPurchase:true,mixed:true,latePayment:true,rateFrozen:true,annulAndReactivate:true,quotaRollback:true,jsonValid:true,reload:true,xlsxGenerated:true,externalRequests:external.length,pageErrors:errors}));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
