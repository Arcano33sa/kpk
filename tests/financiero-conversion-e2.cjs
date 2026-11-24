/* node tests/financiero-conversion-e2.cjs — pruebas locales con funciones reales y dependencias simuladas. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
function fn(name){const start=source.indexOf(`  function ${name}(`);assert(start>=0,name);const line=source.indexOf('\n',start);return source.slice(start,source.slice(start,line).trimEnd().endsWith('}')?line:source.indexOf('\n  }',start)+4);}
const clone=v=>JSON.parse(JSON.stringify(v));const round=v=>Math.round((Number(v)+Number.EPSILON)*100)/100;
const usd={id:'usd',moneda:'USD',cuentaBancoId:'b',netoRecibido:1000,capitalDesembolsado:1000,fechaDesembolso:'2026-11-01',activo:true},nio={...usd,id:'nio',moneda:'NIO'};
const rate={id:'r1',bancoId:'b',bancoNombre:'Banco',fecha:'2026-11-22',version:1,compra:36.5,venta:37};
const c={appData:{prestamosFinancieros:[usd,nio],tiposCambioFinancieros:[rate,{...rate,id:'old',fecha:'2026-11-20',compra:35},{...rate,id:'future',fecha:'2026-11-24',compra:38}],pagosProveedores:[],comprasProveedores:[]},cleanText:v=>String(v??'').trim(),isPlainObject:v=>!!v&&typeof v==='object'&&!Array.isArray(v),roundMoney:round,sumMoney:(list,read)=>round(list.reduce((a,v)=>a+Number(read(v)||0),0)),financieroMoney:(v,currency)=>`${currency} ${v}`,bancoFechaValida:v=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v,FormData:class{constructor(f){this.f=f}get(k){return this.f[k]??null}has(k){return k in this.f}},escapeHtml:v=>String(v??''),nowIso:()=> '2026-11-23T12:00:00Z',getCatalogRecordById:()=>({nombre:'Banco'}),findPaymentMethodByValue:()=>null,getBankTypeForPaymentMethod:()=>'',normalizeCompraProveedorRecord:v=>v,normalizePagoProveedorRecord:v=>v,calculateManualPagadoForCompra:()=>0,generateId:()=> 'auto',todayInputValue:()=> '2026-11-23'};
vm.createContext(c);vm.runInContext(['buildFinanciamientoPoolPreview','parseFinanciamientoPool','normalizeFinanciamientoPago','getFinanciamientoMontoMoneda','getTipoCambioParaPago','buildFinanciamientoPago','readFinanciamientoForm','getPrestamoFondos','validateFinanciamientoPago','validateFinanciamientoSnapshot','buildAutoPagoCompraContado'].map(fn).join('\n'),c);
const funding=c.buildFinanciamientoPago('prestamo','usd',3650,'2026-11-23');assert.equal(funding.conversion.tasa,36.5);assert.equal(funding.conversion.montoOrigen,100);assert.equal(funding.conversion.tipo,'compra');assert.equal(funding.montoPrestamo,3650);
const payment={id:'p',fechaPago:'2026-11-23',montoPagado:3650,activo:true,financiamiento:funding};assert.equal(c.validateFinanciamientoPago(payment), '');
const mixed=c.buildFinanciamientoPago('mixto','usd',3650,'2026-11-23');assert.equal(c.validateFinanciamientoPago({...payment,montoPagado:7300,financiamiento:mixed}),'');assert(c.validateFinanciamientoPago({...payment,financiamiento:mixed}));
c.appData.pagosProveedores=[payment];assert.equal(c.getPrestamoFondos('usd').disponibles,900);assert.equal(c.getPrestamoFondos('usd').utilizados,100);assert.equal(c.getPrestamoFondos('usd',c.appData.pagosProveedores,'p').disponibles,1000);
c.appData.tiposCambioFinancieros.push({...rate,id:'r2',version:2,compra:36.6});
assert.equal(c.buildFinanciamientoPago('prestamo','usd',3650,'2026-11-23','',funding).conversion.tasa,36.5);assert.equal(c.buildFinanciamientoPago('prestamo','usd',3650,'2026-11-23').conversion.tasa,36.6);
assert.equal(c.buildFinanciamientoPago('prestamo','usd',7300,'2026-11-23','',funding).conversion.montoOrigen,200);
assert.equal(c.buildFinanciamientoPago('prestamo','usd',3650,'2026-11-22').conversion.tipoCambioId,'r2');assert.equal(c.getTipoCambioParaPago(usd,'2026-11-21').id,'old');assert.equal(c.getTipoCambioParaPago(usd,'2026-11-19'),null);
for(const fx of [{...funding.conversion,tasa:37},{...funding.conversion,tipo:'venta'},{...funding.conversion,montoOrigen:99},{...funding.conversion,fechaOperacion:'2026-11-21'},{...funding.conversion,bancoId:'other'},{...funding.conversion,tasa:0},{...funding.conversion,tasa:36.5000001}])assert(c.validateFinanciamientoPago({...payment,financiamiento:{...funding,conversion:fx}}));
assert(c.validateFinanciamientoPago({...payment,financiamiento:{origen:'prestamo',prestamoId:'usd',montoPrestamo:3650,moneda:'NIO'}}).includes('Falta'));
assert(c.validateFinanciamientoPago({...payment,id:'large',montoPagado:36500,financiamiento:c.buildFinanciamientoPago('prestamo','usd',36500,'2026-11-23','r1')}));
const own=c.buildFinanciamientoPago('propios','usd',100,'2026-11-23');assert.equal(own.prestamoId,'');assert.equal(own.conversion,undefined);
const legacy=c.buildFinanciamientoPago('prestamo','nio',500,'2026-11-23');assert.equal(legacy.conversion,undefined);assert.equal(c.validateFinanciamientoPago({...payment,id:'n',montoPagado:500,financiamiento:legacy}),'');
assert(c.validateFinanciamientoPago({...payment,montoPagado:0.01,financiamiento:c.buildFinanciamientoPago('prestamo','usd',0.01,'2026-11-23')}));
assert.equal(c.validateFinanciamientoPago({...payment,fechaPago:'2026-10-31'}).length>0,true);
const form={fondosOrigen:'prestamo',fondosPrestamoId:'usd',fechaPago:'2026-11-23',fondosTipoCambioId:'r1',querySelector:()=>null};assert.equal(c.readFinanciamientoForm(form,3650).conversion.tasa,36.5);
const cash={id:'compra',fechaCompra:'2026-11-23',totalCompra:3650,condicionPagoSnapshot:'Contado',activo:true,financiamientoContado:funding};const auto=c.buildAutoPagoCompraContado(cash);assert.equal(auto.montoPagado,3650);assert.equal(auto.financiamiento.conversion.montoOrigen,100);assert.deepEqual(clone(auto.financiamiento),clone(funding));
c.appData.comprasProveedores=[cash];c.appData.pagosProveedores=[{...auto,compraProveedorId:'compra'}];assert.equal(c.validateFinanciamientoSnapshot(c.appData).length,0);
const restored=JSON.parse(JSON.stringify(cash));assert.deepEqual(clone(c.normalizeFinanciamientoPago(restored.financiamientoContado)),clone(funding));
console.log('PASS: USD/NIO, compra (no venta), completo/mixto, fechas, sin tasa, redondeo, fondos, tasa histórica congelada, pago automático y snapshot JSON.');
// Formulario simulado: se ejecutan el enlace de eventos y el cálculo de vista previa originales.
const events={},formUI={fechaPago:'2026-11-23',montoPagado:'3650',totalCompra:'3650',id:'',dataset:{},purchase:false,matches:()=>formUI.purchase,addEventListener:(name,handler)=>{events[name]=handler},dispatchEvent:event=>events[event.type]?.()};
const nodes={'[data-funding-origin]':{value:'prestamo'},'[data-funding-loan]':{value:'usd'},'[name="fondosMontoPrestamo"]':{value:''},'[name="fondosTipoCambioId"]':{value:''},'[data-funding-conversion]':{textContent:'',hidden:true},'[data-funding-loan-field]':{},'[data-funding-amount-field]':{}};
const block={dataset:{fundingOriginal:'null'},closest:()=>formUI,querySelector:name=>nodes[name]};
const totalNode={get value(){return formUI.totalCompra},set value(v){formUI.totalCompra=String(v)}};formUI.querySelector=name=>name==='[data-compra-total-input]'?totalNode:block;
Object.assign(c,{viewRoot:{querySelectorAll:()=>[block]},parseMoney:v=>Number(String(v??0).replaceAll(',','')),formatDate:v=>v,Event,getCompraProveedorCalculations:v=>({totalAjustado:Number(v.totalCompra)}),getCompraFacturasMontoStats:list=>({total:list.reduce((sum,v)=>sum+v.monto,0),pendientes:0,completas:list.length}),formatMoneyInputDisplay:v=>String(v)});
c.appData.prestamosFinancieros=[usd,nio];c.appData.tiposCambioFinancieros=[rate];c.appData.comprasProveedores=[];
vm.runInContext(fn('bindOrigenFondos')+'\n'+fn('updateCompraTotalInputFromFacturas'),c);c.bindOrigenFondos();assert(nodes['[data-funding-conversion]'].textContent.includes('USD 100'));assert.equal(nodes['[name="fondosTipoCambioId"]'].value,'r1');
formUI.montoPagado='7300';events.input();assert(nodes['[data-funding-conversion]'].textContent.includes('USD 200'));
nodes['[data-funding-origin]'].value='mixto';nodes['[name="fondosMontoPrestamo"]'].value='3650';events.change();assert(nodes['[data-funding-conversion]'].textContent.includes('USD 100'));assert(nodes['[data-funding-conversion]'].textContent.includes('Recursos propios: NIO 3650'));
nodes['[data-funding-loan]'].value='nio';events.change();assert(nodes['[data-funding-conversion]'].hidden);
nodes['[data-funding-loan]'].value='usd';formUI.fechaPago='2026-11-01';events.change();assert(nodes['[data-funding-conversion]'].textContent.includes('No hay cambio'));assert.equal(nodes['[name="fondosTipoCambioId"]'].value,'');
formUI.purchase=true;formUI.fechaPago='';formUI.fechaCompra='2026-11-23';nodes['[data-funding-origin]'].value='prestamo';c.updateCompraTotalInputFromFacturas(formUI,[{monto:7300}]);assert(nodes['[data-funding-conversion]'].textContent.includes('USD 200'));
block.dataset.fundingOriginal=JSON.stringify(funding);c.appData.tiposCambioFinancieros.push({...rate,id:'r-new',version:2,compra:37});c.bindOrigenFondos();assert(nodes['[data-funding-conversion]'].textContent.includes('cambio original'));assert.equal(nodes['[name="fondosTipoCambioId"]'].value,'r1');
console.log('PASS: vista previa y eventos de monto, mixto, moneda, fecha, total de facturas y cambio original, mediante DOM simulado.');

// Transacción atómica existente con una implementación enteramente en memoria, sin SDK/red.
const begin=source.indexOf('    async function commitFinanciamientoEntries('),end=source.indexOf('\n    async function processSessionChangeGroup(',begin);assert(begin>=0);
Object.assign(c,{FIRESTORE_IMPORT_BATCH_LIMIT:450,FIRESTORE_WORKSPACE_ID_PLACEHOLDER:'test',sanitizeFirestoreDocId:v=>v,validateBancoTransition:()=>'',validatePrestamosFinancieros:()=>[],stripUndefinedForFirestore:v=>v,saveData:()=>{}});
vm.runInContext(source.slice(begin,end),c);
const ref=(collection,id)=>({path:collection+'/'+id,parent:{id:collection}});let remote=new Map(),commits=0;
const fakeFs={doc:(_,...parts)=>ref(parts.at(-2),parts.at(-1)),runTransaction:async(_,work)=>{const writes=[];const results=await work({get:async r=>({exists:()=>remote.has(r.path),data:()=>clone(remote.get(r.path))}),set:(r,data)=>writes.push([r,data])});for(const [r,data]of writes)remote.set(r.path,{...(remote.get(r.path)||{}),...clone(data)});commits++;return results;}};
(async()=>{
 remote.set('prestamosFinancieros/usd',{...usd,fondosAplicaciones:[]});c.appData={...c.appData,prestamosFinancieros:[usd],pagosProveedores:[payment],comprasProveedores:[]};
 const entry=p=>({write:{ref:ref('pagosProveedores',p.id),payload:p}});
 await c.commitFinanciamientoEntries([entry(payment)],{fs:fakeFs,db:{}});assert.equal(remote.get('prestamosFinancieros/usd').fondosAplicaciones[0].monto,100);
 const stored=clone(remote.get('pagosProveedores/p'));await c.commitFinanciamientoEntries([entry({...stored,activo:false,estado:'Anulado'})],{fs:fakeFs,db:{}});assert.equal(remote.get('prestamosFinancieros/usd').fondosAplicaciones.length,0);
 const count=commits;await assert.rejects(()=>c.commitFinanciamientoEntries([entry({...payment,id:'excess',montoPagado:73000,financiamiento:c.buildFinanciamientoPago('prestamo','usd',73000,'2026-11-23','r1')})],{fs:fakeFs,db:{}}));assert.equal(commits,count);
 const second={...usd,id:'usd2',netoRecibido:400};const first={...usd,netoRecibido:300};
 c.appData.prestamosFinancieros=[first,second];c.appData.tiposCambioFinancieros=[rate];c.appData.pagosProveedores=[];remote.set('prestamosFinancieros/usd',{...first,fondosAplicaciones:[]});remote.set('prestamosFinancieros/usd2',{...second,fondosAplicaciones:[]});
 const poolId='pool:'+encodeURIComponent(JSON.stringify([usd.cuentaBancoId,'USD']));
 const combined={...payment,id:'combined',montoPagado:18250,financiamiento:c.buildFinanciamientoPago('prestamo',poolId,18250,'2026-11-23')};
 await c.commitFinanciamientoEntries([entry(combined)],{fs:fakeFs,db:{}});
 assert.equal(remote.get('prestamosFinancieros/usd').fondosAplicaciones[0].monto,300);assert.equal(remote.get('prestamosFinancieros/usd2').fondosAplicaciones[0].monto,200);
 const beforeFailure=JSON.stringify([...remote]);await assert.rejects(()=>c.commitFinanciamientoEntries([entry({...combined,id:'too-much'})],{fs:fakeFs,db:{}}));assert.equal(JSON.stringify([...remote]),beforeFailure);
 await c.commitFinanciamientoEntries([entry({...clone(remote.get('pagosProveedores/combined')),activo:false,estado:'Anulado'})],{fs:fakeFs,db:{}});
 assert.equal(remote.get('prestamosFinancieros/usd').fondosAplicaciones.length,0);assert.equal(remote.get('prestamosFinancieros/usd2').fondosAplicaciones.length,0);
 console.log('PASS: control atómico simulado reserva/libera USD exactos y rechaza exceso sin escrituras. No se contactó Firebase.');
})().catch(error=>{console.error(error);process.exitCode=1});
