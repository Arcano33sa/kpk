/* Ejecutar: node tests/bank-pdf-e1.cjs. Sin navegador, red ni datos reales. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../bank-pdf.js'), 'utf8'), sandbox);
const { parse, textLines } = sandbox.window.KSABankPdf;
const text = `BANCO AMERICA CENTRAL ( BAC )
Calendario Calendario de de pagos pagos
Préstamo: Préstamo: USD 001234
Monto...: 100.00
Plazo...: 2 Meses
Num. Fecha Principal Interés Seguro Monto Saldo
1 2026-12-16 40.00 2.00 1.00 43.00 60.00
2 2027-01-18 60.00 1.00 1.00 62.00 .00`;
const result = parse(text);
assert.equal(result.referencia, '001234');
assert.equal(result.cuotas.length, 2);
assert.equal(result.totales.capital, 100);
assert.equal(result.totales.total, 105);
assert.equal(result.cuotas[1].saldo, 0);
for (const bad of [
  '', text.replace('BANCO AMERICA CENTRAL', 'Otro banco'),
  text.replace('Interés Seguro', 'Seguro Interés'),
  text.replace(/^2 2027.*$/m, ''), text.replace('43.00', '43.01'),
  text.replace('60.00\n2', '59.00\n2'), text.replace('2027-01-18', '2027-02-30'),
  text.replace('2 2027-', '1 2027-'), text.replace('2027-01-18', '2026-12-16'),
  text.replace('40.00', '-40.00'), text.replace('100.00', '100.01'),
  text.replace('100.00', '900719925474099100.00'),
  text + '\n1 2026-12-16 40.00 2.00 1.00 43.00 60.00',
  text + '\nPréstamo: USD 009999'
]) assert.throws(() => parse(bad));
const item = (str, x, y) => ({ str, transform: [1,0,0,1,x,y] });
assert.equal(textLines([item('B', 20, 20), item('A', 10, 20), item('A', 10.5, 20), item('C', 10, 10)]), 'A B\nC');
console.log('PASS: calendario sintético, importes exactos, formato, fechas, duplicados, extracción parcial, saldos y líneas sobreimpresas.');
