/* Perfil temporal, datos ficticios y red externa bloqueada. No instala dependencias. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.KPK_PLAYWRIGHT_PATH||'/Users/juanguadamuz/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const context=await browser.newContext({serviceWorkers:'block'}),external=[],errors=[];
  await context.route('**/*',route=>{
   const u=new URL(route.request().url());if(u.origin!=='http://kpk.test'){external.push(u.origin);return route.abort();}
   const name=decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname),file=path.resolve(root,'.'+name);
   if(!file.startsWith(root+'/')||!fs.existsSync(file)||!fs.statSync(file).isFile())return route.abort();
   let body=fs.readFileSync(file);if(name==='/firebase-config.js')body='';
   if(name==='/app.js')body=body.toString().replace('  KSAFirebaseAdapter.initFirebase();','').replace('  initPreparedAccessScreen();','').replace('  setupPwaUpdateListeners();','').replace('  bindRouteScrollShield();',`window.__qa={initial:createInitialData,set:d=>{appData=normalizeData(d);renderRoute();},data:()=>JSON.stringify(appData)};\n  bindRouteScrollShield();`);
   return route.fulfill({body,contentType:({'.js':'text/javascript','.mjs':'text/javascript','.html':'text/html','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'})[path.extname(file)]||'application/octet-stream'});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto('http://kpk.test/#financiero');await page.waitForSelector('[data-financiero-form]');
  await page.evaluate(()=>{
   const d=__qa.initial();d.cuentasBancos=[{id:'bank',nombre:'Cuenta de prueba',tipo:'Banco',activo:true}];
   const make=(id,moneda,capital,neto)=>({id,acreedor:'Banco de prueba',referencia:id,moneda,capitalDesembolsado:capital,netoRecibido:neto,cargosRetenidos:capital-neto,cuentaBancoId:'bank',cuentaBancoNombre:'Cuenta de prueba',fechaDesembolso:'2026-11-01',ventaIds:[],numeroOcManual:'250894',activo:true});
   const usd=make('USD-1','USD',1000,950);usd.abonos=[{id:'abono',secuencia:1,tipo:'anticipo_capital',fechaPago:'2026-11-23',moneda:'USD',capital:100,intereses:10,cargos:5,montoPagado:115,cuentaBancoId:'bank',referencia:'ABONO-QA',aplicaciones:[],activo:true}];
   d.prestamosFinancieros=[usd,make('NIO-2','NIO',2000,2000),{...make('ANULADO-3','USD',100,100),activo:false,estado:'Anulado',motivoAnulacion:'Prueba'}];__qa.set(d);
  });
  const snapshot=await page.evaluate(()=>({data:__qa.data(),storage:JSON.stringify({...localStorage})}));
  const table=page.locator('.financial-loans-table');assert.deepEqual(await table.locator(':scope > thead th').allTextContents(),['Banco','Préstamo','Recibido','Abonado','Pendiente','Acciones']);assert.equal(await page.locator('.financial-loan-row').count(),3);assert.equal(await page.locator('.financial-loan-detail-row:not([hidden])').count(),0);
  const first=page.locator('.financial-loan-row').first();assert((await first.locator('td').nth(2).innerText()).includes('950.00'));assert((await first.locator('td').nth(3).innerText()).includes('100.00'));assert((await first.locator('td').nth(4).innerText()).includes('900.00'));
  const toggle=page.locator('[data-financiero-toggle="USD-1"]');await toggle.focus();await toggle.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await page.locator('.financial-loan-detail-row:not([hidden])').count(),1);assert(await page.locator('[data-bank-calendar="USD-1"]').isVisible());
  await page.locator('[data-bank-calendar="USD-1"]').click();const calendar=page.locator('[data-bank-calendar-form]');assert(await calendar.isVisible());await calendar.locator('[name="referenciaCalendario"]').fill('Borrador intacto');await toggle.click();assert(!await calendar.isVisible());await toggle.click();assert.equal(await calendar.locator('[name="referenciaCalendario"]').inputValue(),'Borrador intacto');await calendar.locator('[data-bank-close]').click();
  await page.locator('[data-bank-payment="USD-1"]').click();assert(await page.locator('[data-bank-payment-form]').isVisible());await page.locator('[data-bank-payment-form] [data-bank-close]').click();
  await page.locator('[data-financiero-edit="NIO-2"]').click();assert.equal(await page.locator('[data-financiero-form] [name="id"]').inputValue(),'NIO-2');await page.locator('[data-financiero-cancel]').click();assert.equal(await page.locator('[data-financiero-annul="ANULADO-3"]').count(),0);
  const after=await page.evaluate(()=>({data:__qa.data(),storage:JSON.stringify({...localStorage})}));
  const beforeData=JSON.parse(snapshot.data),afterData=JSON.parse(after.data),changed=Object.keys(beforeData).filter(key=>JSON.stringify(beforeData[key])!==JSON.stringify(afterData[key]));assert.deepEqual(changed,[],'Claves de datos modificadas');
  for(const key of ['KSA_PRACTIKA_DATA_v1','KSA_PRACTIKA_ACTIVITY_LOG_v1','KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1','KSA_PRACTIKA_EXCEL_CONSULTA_SEQUENCE_v1','KSA_PRACTIKA_EXCEL_CIERRE_SEQUENCE_v1'])assert.equal(JSON.parse(after.storage)[key],JSON.parse(snapshot.storage)[key],key);
  // Capturas de la tabla usando los estilos reales, sin el encabezado fijo de la app.
  await page.evaluate(()=>{document.body.innerHTML=document.querySelector('.financial-loans-table').closest('.panel-card').outerHTML;document.querySelectorAll('.financial-loan-detail-row').forEach(row=>row.hidden=true);document.querySelectorAll('[data-financiero-toggle]').forEach(button=>{button.textContent='Ver detalle';button.setAttribute('aria-expanded','false')});});
  fs.mkdirSync('/tmp/kpk-filas-e1-qa',{recursive:true});await page.setViewportSize({width:1366,height:900});await page.screenshot({path:'/tmp/kpk-filas-e1-qa/desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=390));assert(await page.evaluate(()=>{const box=document.querySelector('.financial-loans-scroll');return box.scrollWidth>box.clientWidth}));await page.screenshot({path:'/tmp/kpk-filas-e1-qa/mobile.png',fullPage:true});
  assert.equal(external.length,0);assert.deepEqual(errors,[]);console.log('PASS: seis columnas, cerrado inicial, capital sin intereses, teclado, calendario/abonos/edición, borrador conservado, anulados, escritorio/móvil y datos intactos. Sin solicitudes externas.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});
