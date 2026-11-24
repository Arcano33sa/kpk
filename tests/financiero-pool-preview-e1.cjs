/* node tests/financiero-pool-preview-e1.cjs — propuesta no persistente; sin red. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
function fn(name){const start=source.indexOf(`  function ${name}(`);assert(start>=0,name);const line=source.indexOf('\n',start);return source.slice(start,source.slice(start,line).trimEnd().endsWith('}')?line:source.indexOf('\n  }',start)+4);}
const round=v=>Math.round((Number(v)+Number.EPSILON)*100)/100;
const make=(id,neto,date='2026-11-01',moneda='USD',bank='b')=>({id,referencia:id,netoRecibido:neto,capitalDesembolsado:neto,fechaDesembolso:date,moneda,cuentaBancoId:bank,activo:true});
const c={Intl,appData:{prestamosFinancieros:[make('B',400,'2026-11-15'),make('A',300),make('future',1000,'2026-11-25'),make('other',1000,'2026-11-01','USD','other'),make('nio',900,'2026-11-01','NIO')],pagosProveedores:[],tiposCambioFinancieros:[{id:'rate',bancoId:'b',fecha:'2026-11-23',bancoNombre:'Banco prueba',version:1,compra:36.5,venta:37}]},roundMoney:round,sumMoney:(rows,read)=>round(rows.reduce((sum,row)=>sum+Number(read(row)||0),0)),bancoFechaValida:date=>/^\d{4}-\d{2}-\d{2}$/.test(date)&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date,cleanText:v=>String(v??'').trim(),isPlainObject:v=>!!v&&typeof v==='object'&&!Array.isArray(v),escapeHtml:v=>String(v??'').replaceAll('<','&lt;'),formatDate:v=>v};
vm.createContext(c);vm.runInContext(['parseFinanciamientoPool','normalizeFinanciamientoPago','getFinanciamientoMontoMoneda','getPrestamoFondos','getTipoCambioParaPago','buildFinanciamientoPago','buildFinanciamientoPoolPreview','renderFinanciamientoPoolPreview','financieroMoney','validateFinanciamientoPago'].map(fn).join('\n'),c);
const before=JSON.stringify(c.appData);const plan=c.buildFinanciamientoPoolPreview('b','USD',18250,'2026-11-23');assert.equal(plan.totalDisponible,700);assert.equal(plan.requerido,500);assert.equal(plan.tasa,36.5);assert.equal(plan.aplicaciones.length,2);assert.equal(plan.aplicaciones[0].prestamoId,'A');assert.equal(plan.aplicaciones[0].propuesto,300);assert.equal(plan.aplicaciones[1].prestamoId,'B');assert.equal(plan.aplicaciones[1].propuesto,200);assert.equal(plan.faltante,0);
const nio=c.buildFinanciamientoPoolPreview('b','NIO',500,'2026-11-23');assert.equal(nio.requerido,500);assert.equal(nio.totalDisponible,900);assert.equal(nio.tasa,null);
assert.equal(c.buildFinanciamientoPoolPreview('b','USD',36500,'2026-11-23').faltante,300);assert(c.buildFinanciamientoPoolPreview('b','USD',100,'2026-11-22').error);assert(c.buildFinanciamientoPoolPreview('b','USD',0,'2026-11-23').error);assert(c.buildFinanciamientoPoolPreview('b','USD',10,'2026-11-31').error);
assert(c.buildFinanciamientoPoolPreview('b','USD',10.001,'2026-11-23').error);
const id='pool:'+encodeURIComponent(JSON.stringify(['b','USD']));assert.equal(c.parseFinanciamientoPool(id).moneda,'USD');assert.equal(c.parseFinanciamientoPool('pool:broken'),null);assert.equal(c.parseFinanciamientoPool('A'),null);
const message=c.validateFinanciamientoPago({montoPagado:18250,financiamiento:{origen:'prestamo',prestamoId:id,montoPrestamo:18250,moneda:'NIO'}});assert(message);assert(c.renderFinanciamientoPoolPreview(plan).includes('Al guardar'));assert.equal(JSON.stringify(c.appData),before);
c.appData.pagosProveedores=[{id:'old',activo:true,financiamiento:{prestamoId:'A',montoPrestamo:3650,conversion:{monedaOrigen:'USD',montoOrigen:100}}}];assert.equal(c.buildFinanciamientoPoolPreview('b','USD',18250,'2026-11-23').aplicaciones[0].propuesto,200);assert.equal(c.buildFinanciamientoPoolPreview('b','USD',18250,'2026-11-23','old').aplicaciones[0].propuesto,300);
console.log('PASS: propuesta FIFO, suma combinada, cuentas/monedas/fechas separadas, compra USD, fondos insuficientes, edición sin doble consumo, propuesta sin mutaciones y propuesta sin escrituras.');

const funding=c.buildFinanciamientoPago('prestamo',id,18250,'2026-11-23');
const payment={id:'combined',activo:true,fechaPago:'2026-11-23',montoPagado:18250,financiamiento:funding};
assert.equal(c.validateFinanciamientoPago(payment),'');
c.appData.pagosProveedores.push(payment);
assert.equal(c.getPrestamoFondos('A').disponibles,0);assert.equal(c.getPrestamoFondos('B').disponibles,100);
assert.equal(c.validateFinanciamientoPago(payment,payment),'');
const saved=JSON.stringify(funding);c.appData.tiposCambioFinancieros[0].compra=40;
assert.equal(c.buildFinanciamientoPago('prestamo',id,18250,'2026-11-23','',{...funding,pagoId:'combined'}).conversion.tasa,36.5);
assert.equal(JSON.stringify(c.normalizeFinanciamientoPago(JSON.parse(saved))),saved);
payment.activo=false;assert.equal(c.getPrestamoFondos('A').disponibles,200);assert.equal(c.getPrestamoFondos('B').disponibles,400);
assert(c.validateFinanciamientoPago({...payment,activo:true,financiamiento:{...funding,aplicaciones:[...funding.aplicaciones,funding.aplicaciones[0]]}}));
assert(c.validateFinanciamientoPago({...payment,activo:true,financiamiento:{...funding,aplicaciones:[{prestamoId:'other',monto:500}]}}));
assert(c.validateFinanciamientoPago({...payment,activo:true,financiamiento:{...funding,aplicaciones:[{prestamoId:'A',monto:501}]}}));
console.log('PASS: reparto persistente, disponibles por préstamo, validación, cambio congelado, JSON, anulación exacta y rechazo de duplicados/cuenta ajena/exceso.');

c.appData.pagosProveedores=[];c.appData.prestamosFinancieros=[make('n1',300,'2026-11-01','NIO'),make('n2',400,'2026-11-02','NIO')];
const nioId='pool:'+encodeURIComponent(JSON.stringify(['b','NIO']));const nioFunding=c.buildFinanciamientoPago('prestamo',nioId,500,'2026-11-23');
const nioPayment={id:'nio-combined',activo:true,fechaPago:'2026-11-23',montoPagado:500,financiamiento:nioFunding};assert.equal(c.validateFinanciamientoPago(nioPayment),'');assert.equal(nioFunding.conversion,undefined);
c.appData.pagosProveedores=[nioPayment];assert.equal(c.getPrestamoFondos('n1').disponibles,0);assert.equal(c.getPrestamoFondos('n2').disponibles,200);nioPayment.activo=false;assert.equal(c.getPrestamoFondos('n1').disponibles,300);assert.equal(c.getPrestamoFondos('n2').disponibles,400);
assert(c.validateFinanciamientoPago({...nioPayment,financiamiento:{...nioFunding,aplicaciones:{}}}));assert(c.validateFinanciamientoPago({...nioPayment,financiamiento:{...nioFunding,aplicaciones:[null]}}));
console.log('PASS: reparto NIO sin conversión, disponibles/anulación exactos y rechazo de estructura inválida.');
