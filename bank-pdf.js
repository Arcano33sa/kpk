/* Lector local de calendarios BAC. PDF.js 5.6.205: vendor/pdfjs/LICENSE. */
(() => {
  'use strict';
  const fail = (message) => { throw new Error(message); };
  const cents = (text) => {
    if (!/^(?:\d{1,3}(?:,\d{3})+|\d+|)\.\d{2}$/.test(text)) fail('Importe no reconocido en el PDF.');
    const value = Math.round(Number(text.replaceAll(',', '')) * 100);
    if (!Number.isSafeInteger(value) || value < 0) fail('Importe fuera de rango.');
    return value;
  };
  const dateValid = (date) => {
    const parsed = new Date(`${date}T12:00:00Z`);
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
  };
  function parse(text) {
    const header = text.replace(/([A-Za-zÁÉÍÓÚáéíóúÑñ])\1/g, '$1').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/(\S+)(?:\s+\1(?=\s|$))+/g, '$1');
    if (!/BANCO\s+AMERICA\s+CENTRAL/.test(header) || !/CALENDARIO\s+DE\s+PAGOS/.test(header) || !/NUM\.?\s+FECHA\s+PRINCIPAL\s+INTERES\s+SEGURO\s+MONTO\s+SALDO/.test(header)) fail('Formato no reconocido. Usa un calendario BAC con texto seleccionable como el documento de referencia; no se admiten escaneos.');
    const unique = (regex, name) => {
      const values = [...header.matchAll(regex)].map((match) => match[1]);
      if (!values.length || new Set(values).size !== 1) fail(`No se pudo identificar ${name} de forma única.`);
      return values[0];
    };
    const moneda = unique(/PRESTAMO\s*:\s*(USD|NIO)\s+\d+/g, 'la moneda');
    const referencia = unique(/PRESTAMO\s*:\s*(?:USD|NIO)\s+(\d+)/g, 'el número de préstamo');
    const capitalBase = cents(unique(/MONTO\.*\s*:\s*([\d,.]+)/g, 'el monto del préstamo'));
    const plazo = Number(unique(/PLAZO\.*\s*:\s*(\d+)\s+MESES/g, 'el plazo'));
    if (!capitalBase || plazo < 1 || plazo > 1000) fail('Monto o plazo no válido.');
    const cuotas = [];
    for (const line of text.split(/\r?\n/)) {
      if (!/^\s*\d+\s+\d{4}-/.test(line)) continue;
      const match = line.trim().match(/^(\d+)\s+(\d{4}-\d{2}-\d{2})\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+)$/);
      if (!match) fail('Hay una fila de cuotas incompleta o no reconocida.');
      const [, numero, fechaVencimiento, capital, intereses, cargos, total, saldo] = match;
      cuotas.push({ numero: Number(numero), fechaVencimiento, capital: cents(capital), intereses: cents(intereses), cargos: cents(cargos), total: cents(total), saldo: cents(saldo) });
    }
    if (cuotas.length !== plazo) fail(`Se esperaban ${plazo} cuotas y se leyeron ${cuotas.length}. No se acepta una extracción parcial.`);
    let saldo = capitalBase, anterior = '', totals = { capital: 0, intereses: 0, cargos: 0, total: 0 };
    cuotas.forEach((cuota, index) => {
      if (cuota.numero !== index + 1 || !dateValid(cuota.fechaVencimiento) || cuota.fechaVencimiento <= anterior) fail('Hay números de cuota o fechas inválidas, repetidas o fuera de orden.');
      if (cuota.capital + cuota.intereses + cuota.cargos !== cuota.total) fail(`La cuota ${cuota.numero} no coincide con capital + intereses + seguro.`);
      saldo -= cuota.capital;
      if (saldo !== cuota.saldo || saldo < 0) fail(`El saldo de capital no coincide en la cuota ${cuota.numero}.`);
      for (const key of Object.keys(totals)) { totals[key] += cuota[key]; if (!Number.isSafeInteger(totals[key])) fail('Totales fuera de rango.'); }
      anterior = cuota.fechaVencimiento;
    });
    if (saldo !== 0 || totals.capital !== capitalBase) fail('El calendario no cancela el capital completo.');
    return { referencia, moneda, capitalBase: capitalBase / 100, totales: Object.fromEntries(Object.entries(totals).map(([key, value]) => [key, value / 100])), cuotas: cuotas.map((cuota) => ({ ...cuota, ...Object.fromEntries(['capital','intereses','cargos','total','saldo'].map((key) => [key, cuota[key] / 100])) })) };
  }
  function textLines(items) {
    const lines = [];
    for (const item of items) {
      if (typeof item.str !== 'string' || !item.str.trim()) continue;
      const y = item.transform[5], x = item.transform[4];
      let line = lines.find((entry) => Math.abs(entry.y - y) < 2);
      if (!line) { line = { y, items: [] }; lines.push(line); }
      // Algunos encabezados del banco se dibujan dos veces para simular negrita.
      if (!line.items.some((entry) => entry.str === item.str && Math.abs(entry.x - x) < 1)) line.items.push({ x, str: item.str });
    }
    return lines.sort((a, b) => b.y - a.y).map((line) => line.items.sort((a, b) => a.x - b.x).map((item) => item.str).join(' ')).join('\n');
  }
  async function read(file) {
    if (!file || !file.size || file.size > 10 * 1024 * 1024) fail('Selecciona un PDF de hasta 10 MB.');
    const data = new Uint8Array(await file.arrayBuffer());
    if (!new TextDecoder().decode(data.subarray(0, 1024)).includes('%PDF-')) fail('El archivo no contiene un PDF válido.');
    const pdfjs = await import('./vendor/pdfjs/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', document.baseURI).href;
    const task = pdfjs.getDocument({ data, isEvalSupported: false, useWasm: false, useSystemFonts: true, disableFontFace: true, stopAtErrors: true });
    task.onPassword = () => task.destroy();
    try {
      const pdf = await task.promise;
      if (pdf.numPages > 50) fail('El PDF supera el límite de 50 páginas.');
      const pages = [];
      for (let n = 1; n <= pdf.numPages; n++) {
        const page = await pdf.getPage(n);
        pages.push(textLines((await page.getTextContent()).items));
        page.cleanup();
      }
      return parse(pages.join('\n'));
    } finally { await task.destroy(); }
  }
  window.KSABankPdf = Object.freeze({ read, parse, textLines });
})();
