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
  d.prestamosFinancieros.find(v=>v.id==='usd').capitalDesembolsado=300;d.prestamosFinancieros.find(v=>v.id==='usd').netoRecibido=300;d.prestamosFinancieros.push({...d.prestamosFinancieros.find(v=>v.id==='usd'),id:'usd2',referencia:'USD-SEGUNDO',capitalDesembolsado:400,netoRecibido:400,fechaDesembolso:'2026-11-10'});
  __t.set(d);__t.refresh();
 });
 async function purchase(amount,origin='prestamo',mixed='',existingId='',selectedLoan='pool:'+encodeURIComponent(JSON.stringify(['bank','USD'])),checkPreview=true){
  await page.evaluate(({amount,existingId})=>{
   const record=existingId?__t.data().comprasProveedores.find(c=>c.id===existingId):null;
   __t.purchaseForm(record,{proveedorId:'provider',fechaCompra:'2026-11-23',condicionPagoSnapshot:'Contado',facturasRelacionadas:[{id:'fact-'+amount,numero:'FACT-'+amount,monto:amount,pendienteMonto:false}],ventaIds:['sale']});
  },{amount,existingId});
  if(existingId){await page.locator('[data-factura-proveedor-monto]').first().fill(String(amount));await page.locator('[data-factura-proveedor-monto]').first().dispatchEvent('input');}
  await page.locator('[name="condicionCompra"]').selectOption('Contado');
  await page.locator('[name="metodoPagoContadoId"]').selectOption('cash');
  await page.locator('[name="fondosOrigen"]').selectOption(origin);
  if(['prestamo','mixto'].includes(origin))await page.locator('[name="fondosPrestamoId"]').selectOption(selectedLoan);
  if(origin==='mixto')await page.locator('[name="fondosMontoPrestamo"]').fill(String(mixed));
  if(checkPreview && selectedLoan.startsWith('pool:')){const text=await page.locator('[data-funding-pool-preview]').innerText();assert(text.includes('500.00'),text);assert(text.includes('300.00'),text);assert(text.includes('200.00'),text);assert(text.includes('Al guardar'),text);}
  await page.locator('[data-compra-form]').evaluate(form=>__t.savePurchase(form));
 }
 try {
 const centered=await page.locator('.financial-bank-table th, .financial-bank-table td').evaluateAll(nodes=>nodes.every(node=>getComputedStyle(node).textAlign==='center'));assert(centered);
 const initial=await page.evaluate(()=>__t.data());
 await purchase(18250);let data=await page.evaluate(()=>__t.data());assert.equal(data.comprasProveedores.length,1);assert.equal(data.pagosProveedores.length,1);assert.equal(data.pagosProveedores[0].financiamiento.aplicaciones.length,2);
 const beforeInsufficient=await page.evaluate(()=>JSON.stringify(__t.data()));await purchase(18250,'prestamo','','','pool:'+encodeURIComponent(JSON.stringify(['bank','USD'])),false);assert.equal(await page.evaluate(()=>JSON.stringify(__t.data())),beforeInsufficient);
 assert.deepEqual(await page.evaluate(()=>[__t.funds('usd').disponibles,__t.funds('usd2').disponibles]),[0,200]);
 await page.reload();await page.waitForFunction(()=>window.__t);assert.deepEqual(await page.evaluate(()=>[__t.funds('usd').disponibles,__t.funds('usd2').disponibles]),[0,200]);
 await page.evaluate(()=>{const d=__t.data();d.tiposCambioFinancieros[0].compra=40;__t.set(d);__t.annulPayment(d.pagosProveedores[0].id);});
 // Cash payments are cancelled with their purchase.
 await page.evaluate(()=>__t.togglePurchase(__t.data().comprasProveedores[0].id));
 assert.deepEqual(await page.evaluate(()=>[__t.funds('usd').disponibles,__t.funds('usd2').disponibles]),[300,400]);
 await page.evaluate(d=>__t.set(d),initial);
 const beforeStorage=await page.evaluate(()=>JSON.stringify(__t.data()));
 await page.evaluate(()=>{window.__originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('QA sin espacio');};});
 await purchase(18250);assert.equal(await page.evaluate(()=>JSON.stringify(__t.data())),beforeStorage);
 await page.evaluate(()=>{Storage.prototype.setItem=window.__originalSetItem;});
 await purchase(21900,'mixto',18250);data=await page.evaluate(()=>__t.data());assert.equal(data.pagosProveedores[0].financiamiento.montoPrestamo,18250);assert.equal(data.pagosProveedores[0].montoPagado,21900);
 await page.evaluate(d=>__t.set(d),initial);
 await purchase(3650,'prestamo','','','usd');data=await page.evaluate(()=>__t.data());assert.equal(data.pagosProveedores.length,1);assert.equal(data.pagosProveedores[0].financiamiento.conversion.montoOrigen,100);
 assert.equal(external.length,0);assert.deepEqual(errors,[]);console.log('PASS: alineación centrada real, cuenta combinada visible, reparto USD 300+200 para contado/mixto, guardado combinado, persistencia y devolución exacta al anular y préstamo individual operativo. Chrome temporal, sin red externa.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
