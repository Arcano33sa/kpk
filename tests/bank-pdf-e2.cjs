/* Ejecutar: node tests/bank-pdf-e2.cjs. Validación de integración sin red ni datos reales. */
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
function extract(name) {
  const start = source.indexOf(`  function ${name}(`);
  assert(start >= 0, name);
  return source.slice(start, source.indexOf('\n  }', start) + 4);
}
const context = { bancoBookToken: (loan) => loan.token, bancoResumen: (loan) => ({ capitalPendiente: loan.pendiente, cancelado: loan.cancelado }), bancoCentavos: (amount) => Math.round(Number(amount) * 100), financieroMoney: (amount, currency) => `${currency} ${amount}`, escapeHtml: (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;') };
vm.createContext(context);
vm.runInContext(['validateBancoPdfForLoan', 'renderBancoCuotaRow'].map(extract).join('\n'), context);
const loan = { activo: true, moneda: 'USD', pendiente: 4998, token: 'current' }, pdf = { moneda: 'USD', capitalBase: 4998 };
assert.equal(context.validateBancoPdfForLoan(loan, pdf, 'current'), '');
for (const invalid of [null, {...loan, activo: false}, {...loan, cancelado: true}, {...loan, pendiente: 0}, {...loan, pendiente: 4997.99}, {...loan, moneda: 'NIO'}, {...loan, token: 'new'}]) assert(context.validateBancoPdfForLoan(invalid, pdf, 'current'));
const row = context.renderBancoCuotaRow(1, {fechaVencimiento: '2026-12-16', capital: 385.76, intereses: 70.47, cargos: 7.5});
for (const value of ['2026-12-16', '385.76', '70.47', '7.5']) assert(row.includes(`value="${value}"`));
assert(context.renderBancoCuotaRow().includes('name="cuotaCapital" min="0" step="0.01" value=""'));
assert(!context.renderBancoCuotaRow('"<x>').includes('value=""<x>'));
console.log('PASS: compatibilidad moneda/capital, préstamo no disponible/cancelado, formulario desactualizado y filas editables.');
