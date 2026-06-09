(() => {
  'use strict';

  const APP_NAME = 'KSA PRÁCTIKA';
  const APP_VERSION = '0.12.1-etapa12-logo';
  const SCHEMA_VERSION = '1.0.0';
  const STORAGE_KEY = 'KSA_PRACTIKA_DATA_v1';

  const MODULES = [
    {
      id: 'resumen',
      icon: '▦',
      title: 'Resumen / Tablero',
      short: 'Resumen',
      description: 'Tablero operativo con indicadores, filtros, cartera, mora, alertas y listados útiles para controlar el período.',
      placeholder: 'Resumen / Tablero ya está activo con filtros, venta neta, cobros, proveedores, gastos, mora y alertas.'
    },
    {
      id: 'mora',
      icon: '⚠',
      title: 'Mora y Alertas',
      short: 'Mora',
      description: 'Vista de cartera con clientes y proveedores en mora, rangos, alertas útiles e historial por documento.',
      placeholder: 'Mora avanzada activa con detalle por OC, factura o referencia.'
    },
    {
      id: 'ventas',
      icon: 'OC',
      title: 'Ventas / OC',
      short: 'Ventas',
      description: 'Registro de órdenes de compra con venta neta, vencimiento, saldo por cobrar y estado automático consistente.',
      placeholder: 'Ventas / OC permite crear, editar, anular, calcular venta neta y mantener saldo/estado conectado con Cobros y Mora.'
    },
    {
      id: 'cobros',
      icon: '↧',
      title: 'Cobros de clientes',
      short: 'Cobros',
      description: 'Control de pagos completos o abonos parciales ligados a una OC/documento específico.',
      placeholder: 'Cobros ya permite registrar abonos o pagos completos, actualizar la OC y anular con reversión.'
    },
    {
      id: 'proveedores',
      icon: '◫',
      title: 'Proveedores / Compras',
      short: 'Proveedores',
      description: 'Registro de compras, facturas, referencias, vencimientos, saldos por pagar y estado automático consistente.',
      placeholder: 'Proveedores / Compras registra deudas con saldo por pagar, vencimiento, pagos ligados y mora por factura/referencia.'
    },
    {
      id: 'pagos',
      icon: '↥',
      title: 'Pagos a proveedores',
      short: 'Pagos',
      description: 'Control de pagos completos o abonos parciales ligados a facturas/referencias de proveedor.',
      placeholder: 'Pagos ya permite registrar abonos, cancelar facturas y anular pagos con reversión.'
    },
    {
      id: 'gastos',
      icon: '–',
      title: 'Gastos',
      short: 'Gastos',
      description: 'Control práctico de gastos por fecha, tipo, método, cuenta/banco, estado y observación.',
      placeholder: 'Gastos ya permite crear, editar y anular registros usando tipos, métodos y cuentas/bancos desde Catálogos.'
    },
    {
      id: 'catalogos',
      icon: '☷',
      title: 'Catálogos',
      short: 'Catálogos',
      description: 'Listas maestras para clientes, sucursales, proveedores, tipos de gasto, métodos y cuentas/bancos.',
      placeholder: 'Administra las listas maestras que alimentarán ventas, cobros, compras, pagos y gastos.'
    },
    {
      id: 'excel',
      icon: 'XL',
      title: 'Excel / Cierre',
      short: 'Excel',
      description: 'Importación inicial, exportación Excel fiel por período y cierre mensual con obligación de exportar antes de cerrar.',
      placeholder: 'Excel ya permite importar datos iniciales, exportar el período como .xlsx y cerrar mes con respaldo previo obligatorio.'
    },
    {
      id: 'respaldo',
      icon: 'JS',
      title: 'Respaldo JSON',
      short: 'JSON',
      description: 'Respaldo, validación e importación JSON para traslado manual de datos entre dispositivos.',
      placeholder: 'Respaldo JSON activo dentro de Configuración con exportación, vista previa, reemplazo y fusión controlada.'
    },
    {
      id: 'configuracion',
      icon: '⚙',
      title: 'Configuración',
      short: 'Config.',
      description: 'Parámetros generales, roles básicos locales, respaldo JSON validado e información del sistema.',
      placeholder: 'Configuración activa con roles locales, parámetros generales, respaldo JSON validado e historial de cierres/exportaciones.'
    }
  ];

  const DATA_KEYS = [
    'clientes',
    'sucursales',
    'proveedores',
    'tiposGasto',
    'metodosPago',
    'cuentasBancos',
    'ventas',
    'cobros',
    'comprasProveedores',
    'pagosProveedores',
    'gastos',
    'cierresMensuales',
    'exportacionesExcel'
  ];

  const CATALOGS = [
    {
      id: 'clientes',
      label: 'Clientes',
      singular: 'cliente',
      icon: 'CL',
      description: 'Clientes principales para futuras OC, cobros y cartera.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Tiendas Azul' },
        { name: 'codigo', label: 'Código opcional', type: 'text', placeholder: 'Ej. CLI-001' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del cliente' }
      ]
    },
    {
      id: 'sucursales',
      label: 'Sucursales',
      singular: 'sucursal',
      icon: 'SC',
      description: 'Sucursales o puntos relacionados a un cliente, si aplica.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Managua Centro' },
        { name: 'clienteId', label: 'Cliente asociado opcional', type: 'select-client' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas de la sucursal' }
      ]
    },
    {
      id: 'proveedores',
      label: 'Proveedores',
      singular: 'proveedor',
      icon: 'PR',
      description: 'Proveedores para futuras compras, pagos y saldos por pagar.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Proveedor principal' },
        { name: 'contacto', label: 'Contacto opcional', type: 'text', placeholder: 'Teléfono, correo o contacto' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del proveedor' }
      ]
    },
    {
      id: 'tiposGasto',
      label: 'Tipos de gasto',
      singular: 'tipo de gasto',
      icon: 'TG',
      description: 'Clasificaciones para registrar gastos de forma ordenada.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Transporte' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del tipo de gasto' }
      ]
    },
    {
      id: 'metodosPago',
      label: 'Métodos de pago/cobro',
      singular: 'método',
      icon: 'MP',
      description: 'Métodos disponibles para cobros, pagos y gastos.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Transferencia' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del método' }
      ]
    },
    {
      id: 'cuentasBancos',
      label: 'Cuentas / bancos',
      singular: 'cuenta/banco',
      icon: 'CB',
      description: 'Cajas, bancos u otros bolsillos simples para movimientos de dinero.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Caja' },
        { name: 'tipo', label: 'Tipo', type: 'select', options: ['Caja', 'Banco', 'Otro'], required: true },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas de la cuenta o banco' }
      ]
    }
  ];

  const DEFAULT_SEEDS = {
    tiposGasto: ['Estacionamiento', 'Cargadores', 'Transporte', 'Combustible', 'Empaque', 'Otros'],
    metodosPago: ['Efectivo', 'Transferencia', 'Depósito', 'Cheque', 'Tarjeta', 'Otro'],
    cuentasBancos: [
      { nombre: 'Caja', tipo: 'Caja' },
      { nombre: 'Banco', tipo: 'Banco' },
      { nombre: 'Otro', tipo: 'Otro' }
    ]
  };


  const ROLE_DEFINITIONS = {
    administrador: {
      id: 'administrador',
      label: 'Administrador',
      description: 'Puede editar catálogos, anular movimientos, importar Excel/JSON, exportar JSON y cambiar configuración.',
      permissions: new Set(['editCatalogs', 'annulMovements', 'importExcel', 'exportExcel', 'exportJson', 'importJson', 'changeConfig', 'closeMonth'])
    },
    usuario: {
      id: 'usuario',
      label: 'Usuario normal',
      description: 'Puede registrar ventas, cobros, proveedores/compras, pagos, gastos y consultar tablero.',
      permissions: new Set(['registerOperations', 'viewDashboard'])
    }
  };

  const ROLE_ORDER = ['administrador', 'usuario'];

  const routeAliases = new Map([
    ['home', 'home'],
    ['menu', 'home'],
    ['resumen', 'resumen'],
    ['mora', 'mora'],
    ['alertas', 'mora'],
    ['historial', 'mora'],
    ['ventas', 'ventas'],
    ['cobros', 'cobros'],
    ['proveedores', 'proveedores'],
    ['pagos', 'pagos'],
    ['gastos', 'gastos'],
    ['catalogos', 'catalogos'],
    ['excel', 'excel'],
    ['respaldo', 'respaldo'],
    ['configuracion', 'configuracion']
  ]);

  const viewRoot = document.querySelector('#viewRoot');
  const navButtons = Array.from(document.querySelectorAll('[data-route]'));

  let catalogState = {
    activeCatalogId: 'clientes',
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let ventasState = {
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let cobrosState = {
    selectedVentaId: '',
    focusVentaId: '',
    message: null,
    messageType: 'success'
  };

  let proveedoresState = {
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let pagosState = {
    selectedCompraId: '',
    focusCompraId: '',
    message: null,
    messageType: 'success'
  };

  let gastosState = {
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let moraState = {
    selectedKind: '',
    selectedId: ''
  };

  let resumenState = {
    month: String(new Date().getMonth() + 1).padStart(2, '0'),
    year: String(new Date().getFullYear()),
    dateFrom: '',
    dateTo: '',
    clienteId: '',
    proveedorId: '',
    sucursalId: '',
    estado: '',
    mora: '',
    metodoPagoId: ''
  };

  let excelImportState = {
    fileName: '',
    isProcessing: false,
    preview: null,
    payload: null,
    message: null,
    messageType: 'success'
  };

  let excelExportState = {
    month: String(new Date().getMonth() + 1).padStart(2, '0'),
    year: String(new Date().getFullYear()),
    message: null,
    messageType: 'success'
  };

  let cierreMensualState = {
    month: String(new Date().getMonth() + 1).padStart(2, '0'),
    year: String(new Date().getFullYear()),
    message: null,
    messageType: 'success'
  };


  let jsonBackupState = {
    fileName: '',
    isProcessing: false,
    preview: null,
    payload: null,
    message: null,
    messageType: 'success'
  };

  let configState = {
    message: null,
    messageType: 'success'
  };

  function nowIso() {
    return new Date().toISOString();
  }

  function generateId(prefix = 'id') {
    const random = Math.random().toString(36).slice(2, 9);
    return `${prefix}_${Date.now().toString(36)}_${random}`;
  }

  function createInitialData() {
    const timestamp = nowIso();
    const initial = {
      clientes: [],
      sucursales: [],
      proveedores: [],
      tiposGasto: [],
      metodosPago: [],
      cuentasBancos: [],
      ventas: [],
      cobros: [],
      comprasProveedores: [],
      pagosProveedores: [],
      gastos: [],
      cierresMensuales: [],
      configuracion: createDefaultConfiguracion(timestamp),
      metadata: {
        appName: APP_NAME,
        appVersion: APP_VERSION,
        schemaVersion: SCHEMA_VERSION,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    seedBaseCatalogs(initial, false);
    return initial;
  }


  function createDefaultConfiguracion(timestamp = nowIso()) {
    return {
      appName: APP_NAME,
      appDisplayName: APP_NAME,
      appVersion: APP_VERSION,
      schemaVersion: SCHEMA_VERSION,
      currentRole: 'administrador',
      monedaPrincipal: 'NIO',
      idioma: 'es-NI',
      tema: 'claro',
      excelReferencia: '0000- CONTROL.xlsx',
      diasAlertaVencimiento: 7,
      backupModeNote: 'JSON es respaldo y traslado manual, no sincronización automática.',
      lastBackupAt: '',
      lastImportAt: '',
      updatedAt: timestamp
    };
  }

  function normalizeConfiguracion(config) {
    const base = createDefaultConfiguracion();
    const source = isPlainObject(config) ? config : {};
    const currentRole = ROLE_DEFINITIONS[source.currentRole] ? source.currentRole : base.currentRole;
    const alertDays = parsePositiveInteger(source.diasAlertaVencimiento);
    return {
      ...base,
      ...source,
      appName: APP_NAME,
      appDisplayName: cleanText(source.appDisplayName || source.appName || base.appDisplayName) || APP_NAME,
      appVersion: APP_VERSION,
      schemaVersion: SCHEMA_VERSION,
      currentRole,
      monedaPrincipal: cleanText(source.monedaPrincipal || base.monedaPrincipal) || 'NIO',
      idioma: cleanText(source.idioma || base.idioma) || 'es-NI',
      tema: cleanText(source.tema || base.tema) || 'claro',
      excelReferencia: cleanText(source.excelReferencia || base.excelReferencia) || '0000- CONTROL.xlsx',
      diasAlertaVencimiento: Number.isNaN(alertDays) ? base.diasAlertaVencimiento : alertDays,
      lastBackupAt: cleanText(source.lastBackupAt),
      lastImportAt: cleanText(source.lastImportAt),
      updatedAt: source.updatedAt || nowIso()
    };
  }

  function normalizeData(candidate) {
    const base = createInitialData();
    const source = isPlainObject(candidate) ? candidate : {};
    const normalized = { ...base, ...source };

    DATA_KEYS.forEach((key) => {
      normalized[key] = Array.isArray(source[key]) ? source[key] : [];
    });

    CATALOGS.forEach((catalog) => {
      normalized[catalog.id] = normalized[catalog.id].map((record) => normalizeCatalogRecord(record, catalog));
    });

    normalized.cobros = normalized.cobros.map((record) => normalizeCobroRecord(record));
    normalized.pagosProveedores = normalized.pagosProveedores.map((record) => normalizePagoProveedorRecord(record));
    normalized.gastos = normalized.gastos.map((record) => normalizeGastoRecord(record));
    normalized.cierresMensuales = normalized.cierresMensuales.map((record) => normalizeCierreMensualRecord(record));
    normalized.exportacionesExcel = normalized.exportacionesExcel.map((record) => normalizeExcelExportRecord(record));
    normalized.comprasProveedores = normalized.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record));
    normalized.comprasProveedores = recalculateComprasProveedoresWithPagos(normalized.comprasProveedores, normalized.pagosProveedores);
    normalized.ventas = normalized.ventas.map((record) => normalizeVentaRecord(record));
    normalized.ventas = recalculateVentasWithCobros(normalized.ventas, normalized.cobros);

    seedBaseCatalogs(normalized, true);

    normalized.configuracion = normalizeConfiguracion(source.configuracion || normalized.configuracion);

    normalized.metadata = {
      ...base.metadata,
      ...(isPlainObject(source.metadata) ? source.metadata : {}),
      appName: APP_NAME,
      appVersion: APP_VERSION,
      schemaVersion: SCHEMA_VERSION,
      updatedAt: nowIso()
    };

    return normalized;
  }

  function normalizeCatalogRecord(record, catalog) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const normalized = {
      id: raw.id || generateId(catalog.id),
      nombre: cleanText(raw.nombre),
      activo: typeof raw.activo === 'boolean' ? raw.activo : true,
      observacion: cleanText(raw.observacion),
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };

    catalog.fields.forEach((field) => {
      if (['nombre', 'observacion'].includes(field.name)) return;
      if (field.name === 'tipo') {
        normalized.tipo = field.options.includes(raw.tipo) ? raw.tipo : field.options[0];
        return;
      }
      normalized[field.name] = cleanText(raw[field.name]);
    });

    return normalized;
  }

  function seedBaseCatalogs(data, onlyWhenEmpty) {
    Object.entries(DEFAULT_SEEDS).forEach(([key, values]) => {
      if (onlyWhenEmpty && Array.isArray(data[key]) && data[key].length > 0) return;
      if (!Array.isArray(data[key])) data[key] = [];
      if (data[key].length > 0) return;

      data[key] = values.map((value) => {
        const payload = typeof value === 'string' ? { nombre: value } : value;
        const timestamp = nowIso();
        return {
          id: generateId(key),
          nombre: payload.nombre,
          tipo: payload.tipo || undefined,
          activo: true,
          observacion: '',
          createdAt: timestamp,
          updatedAt: timestamp
        };
      });
    });
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function cleanText(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim();
  }

  function roundMoney(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.round((numeric + Number.EPSILON) * 100) / 100;
  }

  function parseMoney(value) {
    if (value === null || value === undefined || value === '') return 0;
    const normalized = String(value).replace(/,/g, '').trim();
    const numeric = Number(normalized);
    return Number.isFinite(numeric) ? roundMoney(numeric) : Number.NaN;
  }

  function parsePositiveInteger(value) {
    if (value === null || value === undefined || value === '') return 0;
    const numeric = Number.parseInt(String(value), 10);
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : Number.NaN;
  }

  function toDateInputValue(value) {
    const raw = cleanText(value);
    if (!raw) return '';
    const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return '';
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    if (Number.isNaN(date.getTime())) return '';
    return formatDateInput(date);
  }

  function formatDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function todayInputValue() {
    return formatDateInput(new Date());
  }

  function addDaysToDate(dateInput, days) {
    const safeDate = toDateInputValue(dateInput);
    const safeDays = Number(days);
    if (!safeDate || !Number.isFinite(safeDays)) return '';
    const [year, month, day] = safeDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + safeDays);
    return formatDateInput(date);
  }

  function isPastDate(dateInput) {
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return false;
    return safeDate < todayInputValue();
  }

  function getVentaCalculations(record) {
    const montoOc = parseMoney(record.montoOc);
    const noVa = parseMoney(record.noVa);
    const descuento = parseMoney(record.descuento);
    const descuentoNoVa = parseMoney(record.descuentoNoVa);
    const totalCobrado = parseMoney(record.totalCobrado);
    const ventaNeta = roundMoney((Number.isNaN(montoOc) ? 0 : montoOc) - (Number.isNaN(noVa) ? 0 : noVa) - (Number.isNaN(descuento) ? 0 : descuento) - (Number.isNaN(descuentoNoVa) ? 0 : descuentoNoVa));
    const saldoPorCobrar = roundMoney(ventaNeta - (Number.isNaN(totalCobrado) ? 0 : totalCobrado));

    return {
      montoOc: Number.isNaN(montoOc) ? 0 : montoOc,
      noVa: Number.isNaN(noVa) ? 0 : noVa,
      descuento: Number.isNaN(descuento) ? 0 : descuento,
      descuentoNoVa: Number.isNaN(descuentoNoVa) ? 0 : descuentoNoVa,
      totalCobrado: Number.isNaN(totalCobrado) ? 0 : totalCobrado,
      ventaNeta,
      saldoPorCobrar
    };
  }

  function determineVentaEstado(record) {
    if (!record.activo) return 'Anulado';
    const { ventaNeta, totalCobrado, saldoPorCobrar } = getVentaCalculations(record);
    if (ventaNeta > 0 && saldoPorCobrar <= 0) return 'Pagado';
    if (saldoPorCobrar > 0 && isPastDate(record.fechaVencimiento)) return 'Vencido';
    if (saldoPorCobrar > 0 && totalCobrado > 0) return 'Abonado';
    return 'Pendiente';
  }

  function normalizeVentaRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const diasCredito = parsePositiveInteger(raw.diasCredito);
    const fechaOc = toDateInputValue(raw.fechaOc || raw.fechaOC || raw.fecha || '');
    const fechaVencimiento = toDateInputValue(raw.fechaVencimiento || raw.vencimiento || '') || (fechaOc ? addDaysToDate(fechaOc, Number.isNaN(diasCredito) ? 0 : diasCredito) : '');
    const base = {
      id: raw.id || generateId('venta'),
      numeroDocumento: cleanText(raw.numeroDocumento || raw.numeroOC || raw.numeroOc || raw.documento || raw.oc),
      clienteId: cleanText(raw.clienteId),
      sucursalId: cleanText(raw.sucursalId),
      fechaOc,
      diasCredito: Number.isNaN(diasCredito) ? 0 : diasCredito,
      fechaVencimiento,
      montoOc: parseMoney(raw.montoOc),
      noVa: parseMoney(raw.noVa),
      descuento: parseMoney(raw.descuento),
      descuentoNoVa: parseMoney(raw.descuentoNoVa),
      totalCobrado: parseMoney(raw.totalCobrado),
      observacion: cleanText(raw.observacion),
      activo: typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
    const calculations = getVentaCalculations(base);
    return {
      ...base,
      montoOc: Number.isNaN(base.montoOc) ? 0 : base.montoOc,
      noVa: Number.isNaN(base.noVa) ? 0 : base.noVa,
      descuento: Number.isNaN(base.descuento) ? 0 : base.descuento,
      descuentoNoVa: Number.isNaN(base.descuentoNoVa) ? 0 : base.descuentoNoVa,
      totalCobrado: Number.isNaN(base.totalCobrado) ? 0 : base.totalCobrado,
      ventaNeta: calculations.ventaNeta,
      saldoPorCobrar: calculations.saldoPorCobrar,
      estado: determineVentaEstado(base)
    };
  }


  function normalizeCobroRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const activo = typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado';
    const montoCobrado = parseMoney(raw.montoCobrado || raw.monto || raw.importe);
    return {
      id: raw.id || generateId('cobro'),
      ventaId: cleanText(raw.ventaId || raw.ocId || raw.documentoId),
      fechaCobro: toDateInputValue(raw.fechaCobro || raw.fecha || '') || todayInputValue(),
      clienteId: cleanText(raw.clienteId),
      clienteNombre: cleanText(raw.clienteNombre || raw.cliente),
      sucursalId: cleanText(raw.sucursalId),
      sucursalNombre: cleanText(raw.sucursalNombre || raw.sucursal),
      numeroDocumento: cleanText(raw.numeroDocumento || raw.numeroOC || raw.oc || raw.documento),
      montoCobrado: Number.isNaN(montoCobrado) ? 0 : montoCobrado,
      metodoPagoId: cleanText(raw.metodoPagoId),
      metodoPagoNombre: cleanText(raw.metodoPagoNombre || raw.metodoPago || raw.metodo),
      cuentaBancoId: cleanText(raw.cuentaBancoId),
      cuentaBancoNombre: cleanText(raw.cuentaBancoNombre || raw.cuentaBanco || raw.banco || raw.cuenta),
      observacion: cleanText(raw.observacion),
      activo,
      estado: activo ? 'Registrado' : 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }


  function getCompraProveedorCalculations(record) {
    const totalCompra = parseMoney(record.totalCompra ?? record.totalDeuda ?? record.monto ?? record.total);
    const totalPagado = parseMoney(record.totalPagado);
    const safeTotalCompra = Number.isNaN(totalCompra) ? 0 : totalCompra;
    const safeTotalPagado = Number.isNaN(totalPagado) ? 0 : totalPagado;
    const saldoPorPagar = roundMoney(Math.max(safeTotalCompra - safeTotalPagado, 0));

    return {
      totalCompra: safeTotalCompra,
      totalPagado: safeTotalPagado,
      saldoPorPagar
    };
  }

  function determineCompraProveedorEstado(record) {
    if (!record.activo) return 'Anulado';
    const { totalCompra, totalPagado, saldoPorPagar } = getCompraProveedorCalculations(record);
    if (totalCompra > 0 && saldoPorPagar <= 0) return 'Pagado';
    if (saldoPorPagar > 0 && isPastDate(record.fechaVencimiento)) return 'Vencido';
    if (saldoPorPagar > 0 && totalPagado > 0) return 'Abonado';
    return 'Pendiente';
  }

  function normalizeCompraProveedorRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const activo = typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado';
    const fechaCompra = toDateInputValue(raw.fechaCompra || raw.fecha || raw.fechaOrigen || '') || todayInputValue();
    const diasCredito = parsePositiveInteger(raw.diasCredito);
    const safeDiasCredito = Number.isNaN(diasCredito) ? 0 : diasCredito;
    const fechaVencimiento = toDateInputValue(raw.fechaVencimiento || raw.vencimiento || '') || addDaysToDate(fechaCompra, safeDiasCredito) || fechaCompra;
    const base = {
      id: raw.id || generateId('compraProveedor'),
      proveedorId: cleanText(raw.proveedorId),
      proveedorNombre: cleanText(raw.proveedorNombre || raw.proveedor),
      facturaReferencia: cleanText(raw.facturaReferencia || raw.factura || raw.referencia || raw.documento),
      fechaCompra,
      diasCredito: safeDiasCredito,
      fechaVencimiento,
      totalCompra: parseMoney(raw.totalCompra ?? raw.totalDeuda ?? raw.monto ?? raw.total),
      totalPagado: parseMoney(raw.totalPagado),
      observacion: cleanText(raw.observacion),
      activo,
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
    const calculations = getCompraProveedorCalculations(base);
    return {
      ...base,
      totalCompra: calculations.totalCompra,
      totalPagado: calculations.totalPagado,
      saldoPorPagar: calculations.saldoPorPagar,
      estado: determineCompraProveedorEstado(base)
    };
  }

  function normalizePagoProveedorRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const activo = typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado';
    const montoPagado = parseMoney(raw.montoPagado || raw.monto || raw.importe);
    return {
      id: raw.id || generateId('pagoProveedor'),
      compraProveedorId: cleanText(raw.compraProveedorId || raw.compraId || raw.facturaId || raw.documentoId),
      proveedorId: cleanText(raw.proveedorId),
      proveedorNombre: cleanText(raw.proveedorNombre || raw.proveedor),
      facturaReferencia: cleanText(raw.facturaReferencia || raw.factura || raw.referencia || raw.documento),
      fechaPago: toDateInputValue(raw.fechaPago || raw.fechaRealPago || raw.fecha || '') || todayInputValue(),
      montoPagado: Number.isNaN(montoPagado) ? 0 : montoPagado,
      metodoPagoId: cleanText(raw.metodoPagoId),
      metodoPagoNombre: cleanText(raw.metodoPagoNombre || raw.metodoPago || raw.metodo),
      cuentaBancoId: cleanText(raw.cuentaBancoId),
      cuentaBancoNombre: cleanText(raw.cuentaBancoNombre || raw.cuentaBanco || raw.banco || raw.cuenta),
      observacion: cleanText(raw.observacion),
      activo,
      estado: activo ? 'Registrado' : 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }


  function normalizeGastoRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const rawEstado = cleanText(raw.estado);
    const anulado = typeof raw.anulado === 'boolean' ? raw.anulado : rawEstado === 'Anulado' || raw.activo === false;
    const activo = typeof raw.activo === 'boolean' ? raw.activo && !anulado : !anulado;
    const monto = parseMoney(raw.monto || raw.importe || raw.valor);

    return {
      id: raw.id || generateId('gasto'),
      fecha: toDateInputValue(raw.fecha || raw.fechaGasto || '') || todayInputValue(),
      tipoGastoId: cleanText(raw.tipoGastoId || raw.tipoId || raw.categoriaId),
      tipoGastoNombre: cleanText(raw.tipoGastoNombre || raw.tipoGasto || raw.tipo || raw.categoria),
      monto: Number.isNaN(monto) ? 0 : monto,
      metodoPagoId: cleanText(raw.metodoPagoId),
      metodoPagoNombre: cleanText(raw.metodoPagoNombre || raw.metodoPago || raw.metodo),
      cuentaBancoId: cleanText(raw.cuentaBancoId),
      cuentaBancoNombre: cleanText(raw.cuentaBancoNombre || raw.cuentaBanco || raw.banco || raw.cuenta),
      observacion: cleanText(raw.observacion),
      estado: activo ? 'Registrado' : 'Anulado',
      anulado: !activo,
      activo,
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }


  function normalizeCierreMensualRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const month = /^\d{2}$/.test(String(raw.month || raw.mes || '')) ? String(raw.month || raw.mes) : String(new Date().getMonth() + 1).padStart(2, '0');
    const year = /^\d{4}$/.test(String(raw.year || raw.anio || raw.año || '')) ? String(raw.year || raw.anio || raw.año) : String(new Date().getFullYear());
    const periodo = `${year}-${month}`;
    return {
      id: cleanText(raw.id) || `cierre_${periodo}`,
      periodo,
      month,
      year,
      fechaHoraCierre: cleanText(raw.fechaHoraCierre || raw.closedAt || raw.fechaCierre) || timestamp,
      usuarioRol: cleanText(raw.usuarioRol || raw.rol || 'Administrador'),
      nombreArchivoExcel: cleanText(raw.nombreArchivoExcel || raw.archivoExcel || raw.fileName),
      exportacionExcelId: cleanText(raw.exportacionExcelId),
      modoEdicion: cleanText(raw.modoEdicion || 'advertencia'),
      totales: isPlainObject(raw.totales) ? raw.totales : {},
      observacion: cleanText(raw.observacion || 'Período cerrado con advertencia para edición posterior.'),
      createdAt: raw.createdAt || raw.fechaHoraCierre || timestamp,
      updatedAt: raw.updatedAt || timestamp
    };
  }

  function normalizeExcelExportRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const month = /^\d{2}$/.test(String(raw.month || raw.mes || '')) ? String(raw.month || raw.mes) : String(new Date().getMonth() + 1).padStart(2, '0');
    const year = /^\d{4}$/.test(String(raw.year || raw.anio || raw.año || '')) ? String(raw.year || raw.anio || raw.año) : String(new Date().getFullYear());
    const periodo = `${year}-${month}`;
    return {
      id: cleanText(raw.id) || generateId('exportExcel'),
      periodo,
      month,
      year,
      nombreArchivo: cleanText(raw.nombreArchivo || raw.fileName || raw.archivo),
      exportadoAt: cleanText(raw.exportadoAt || raw.fechaExportacion || raw.createdAt) || timestamp,
      totales: isPlainObject(raw.totales) ? raw.totales : {},
      hojas: Array.isArray(raw.hojas) ? raw.hojas : ['Resumen', 'Ventas', 'Proveedores', 'Gastos', 'Catálogos'],
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || timestamp
    };
  }

  function getActiveCobrosForVenta(ventaId, cobrosSource) {
    const source = Array.isArray(cobrosSource) ? cobrosSource : [];
    return source
      .map((record) => normalizeCobroRecord(record))
      .filter((record) => record.activo && record.ventaId === ventaId);
  }

  function calculateTotalCobradoForVenta(ventaId, cobrosSource) {
    return getActiveCobrosForVenta(ventaId, cobrosSource)
      .reduce((sum, cobro) => roundMoney(sum + cobro.montoCobrado), 0);
  }

  function recalculateVentaWithCobros(venta, cobrosSource) {
    const normalized = normalizeVentaRecord(venta);
    const totalCobrado = calculateTotalCobradoForVenta(normalized.id, cobrosSource);
    return normalizeVentaRecord({ ...normalized, totalCobrado, updatedAt: normalized.updatedAt });
  }

  function recalculateVentasWithCobros(ventasSource, cobrosSource) {
    const ventas = Array.isArray(ventasSource) ? ventasSource : [];
    return ventas.map((venta) => recalculateVentaWithCobros(venta, cobrosSource));
  }

  function getActivePagosForCompra(compraProveedorId, pagosSource) {
    const source = Array.isArray(pagosSource) ? pagosSource : [];
    return source
      .map((record) => normalizePagoProveedorRecord(record))
      .filter((record) => record.activo && record.compraProveedorId === compraProveedorId);
  }

  function calculateTotalPagadoForCompra(compraProveedorId, pagosSource) {
    return getActivePagosForCompra(compraProveedorId, pagosSource)
      .reduce((sum, pago) => roundMoney(sum + pago.montoPagado), 0);
  }

  function recalculateCompraProveedorWithPagos(compra, pagosSource) {
    const normalized = normalizeCompraProveedorRecord(compra);
    const totalPagado = calculateTotalPagadoForCompra(normalized.id, pagosSource);
    return normalizeCompraProveedorRecord({ ...normalized, totalPagado, updatedAt: normalized.updatedAt });
  }

  function recalculateComprasProveedoresWithPagos(comprasSource, pagosSource) {
    const compras = Array.isArray(comprasSource) ? comprasSource : [];
    return compras.map((compra) => recalculateCompraProveedorWithPagos(compra, pagosSource));
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = createInitialData();
        saveData(initial);
        return initial;
      }
      const parsed = JSON.parse(raw);
      const normalized = normalizeData(parsed);
      saveData(normalized);
      return normalized;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: se reinició la estructura local por datos inválidos.', error);
      const initial = createInitialData();
      saveData(initial);
      return initial;
    }
  }

  function saveData(data) {
    try {
      data.configuracion = normalizeConfiguracion(data.configuracion);
      data.metadata = {
        ...(isPlainObject(data.metadata) ? data.metadata : {}),
        appName: APP_NAME,
        appVersion: APP_VERSION,
        schemaVersion: SCHEMA_VERSION,
        createdAt: data.metadata?.createdAt || nowIso(),
        updatedAt: nowIso()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('KSA PRÁCTIKA: no se pudo guardar en localStorage.', error);
    }
  }

  let appData = loadData();

  function getCurrentRole() {
    const role = appData?.configuracion?.currentRole;
    return ROLE_DEFINITIONS[role] ? role : 'administrador';
  }

  function getCurrentRoleDefinition() {
    return ROLE_DEFINITIONS[getCurrentRole()] || ROLE_DEFINITIONS.administrador;
  }

  function canCurrentRole(permission) {
    const role = getCurrentRoleDefinition();
    return Boolean(role?.permissions?.has(permission));
  }

  function renderRolePermissionNotice(permission, detail) {
    if (canCurrentRole(permission)) return '';
    const role = getCurrentRoleDefinition();
    return `
      <article class="catalog-warning permission-warning" role="status">
        <strong>Permiso limitado: ${escapeHtml(role.label)}.</strong>
        <p>${escapeHtml(detail || 'Esta acción queda reservada para Administrador en esta protección local.')}</p>
        <button type="button" class="secondary-action compact" data-go="configuracion">Ir a Configuración</button>
      </article>
    `;
  }

  function setRoleMessage(state, message) {
    if (!state) return;
    state.message = message;
    state.messageType = 'error';
    renderRoute();
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeNameForCompare(value) {
    return cleanText(value).toLocaleLowerCase('es-NI');
  }

  function getRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    return routeAliases.get(hash) || 'home';
  }

  function setRoute(route) {
    const safeRoute = routeAliases.get(String(route).toLowerCase()) || 'home';
    if (getRoute() === safeRoute) {
      renderRoute();
      return;
    }
    window.location.hash = safeRoute;
  }

  function setActiveNav(route) {
    navButtons.forEach((button) => {
      const target = button.dataset.route;
      const isActive = target === route || (route === 'excel' && target === 'excel') || ((route === 'respaldo' || route === 'configuracion') && target === 'configuracion');
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  function renderRoute() {
    const route = getRoute();
    setActiveNav(route);

    if (route === 'home') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderHome();
    } else if (route === 'resumen') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderResumenTablero();
    } else if (route === 'catalogos') {
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderCatalogos();
    } else if (route === 'mora') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderMoraAlertas();
    } else if (route === 'ventas') {
      catalogState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderVentas();
    } else if (route === 'cobros') {
      catalogState.message = null;
      ventasState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderCobros();
    } else if (route === 'proveedores') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderProveedoresCompras();
    } else if (route === 'pagos') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderPagosProveedores();
    } else if (route === 'gastos') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      viewRoot.innerHTML = renderGastos();
    } else if (route === 'excel') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderImportarExcel();
    } else if (route === 'configuracion' || route === 'respaldo') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderConfiguracion();
    } else {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      const module = MODULES.find((item) => item.id === route) || MODULES[0];
      viewRoot.innerHTML = renderPlaceholder(module);
    }

    bindViewActions();
    document.querySelector('#mainContent')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function renderHome() {
    const totalBuckets = DATA_KEYS.length;
    const totalRecords = DATA_KEYS.reduce((sum, key) => sum + appData[key].length, 0);
    const catalogRecords = CATALOGS.reduce((sum, catalog) => sum + appData[catalog.id].length, 0);
    const cards = MODULES.map((module) => `
      <article class="module-card">
        <div class="module-icon" aria-hidden="true">${escapeHtml(module.icon)}</div>
        <h3>${escapeHtml(module.title)}</h3>
        <p>${escapeHtml(module.description)}</p>
        <button type="button" class="card-action" data-go="${escapeHtml(module.id)}">Entrar</button>
      </article>
    `).join('');

    return `
      <section class="hero">
        <div>
          <span class="eyebrow">Etapa 12 / Excel, cierre y hardening final</span>
          <h1>KSA PRÁCTIKA</h1>
          <p class="lead">Webapp estática para convertir el control de OC, cobros, proveedores, pagos y gastos en un sistema operativo continuo. Ya tiene menú, navegación fija, Catálogos editables, Ventas / OC, Cobros de clientes, Proveedores / Compras, Pagos a proveedores, Gastos, mora avanzada, alertas, historial por documento, Resumen / Tablero operativo, importación inicial desde Excel, Configuración, roles básicos locales y respaldo JSON validado, exportación Excel y cierre mensual.</p>
        </div>
        <aside class="hero-status" aria-label="Estado inicial de la app">
          <h3>Estado de la app</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Versión</strong><span>${escapeHtml(APP_VERSION)}</span></div>
            <div class="status-item"><strong>Rol</strong><span>${escapeHtml(getCurrentRoleDefinition().label)}</span></div>
            <div class="status-item"><strong>Esquema</strong><span>${escapeHtml(SCHEMA_VERSION)}</span></div>
            <div class="status-item"><strong>Bloques</strong><span>${totalBuckets}</span></div>
            <div class="status-item"><strong>Catálogos</strong><span>${catalogRecords}</span></div>
          </div>
        </aside>
      </section>

      <section class="card-grid" aria-label="Módulos principales">
        ${cards}
      </section>

      <section class="panel-grid">
        <article class="panel-card">
          <h2>Estructura preparada</h2>
          <p class="notice">Catálogos administra las listas maestras, Ventas / OC registra documentos con saldo por cobrar, Cobros aplica abonos a OC, Proveedores / Compras registra deudas con saldo por pagar, Pagos aplica abonos a facturas/referencias y Gastos registra egresos operativos por tipo, método y cuenta/banco.</p>
          <div class="data-list">
            ${DATA_KEYS.map((key) => `<div class="data-pill"><span>${escapeHtml(key)}</span><strong>${appData[key].length}</strong></div>`).join('')}
          </div>
        </article>
        <article class="panel-card">
          <h2>Metadata</h2>
          <dl class="definition-list">
            <dt>App</dt><dd>${escapeHtml(appData.metadata.appName)}</dd>
            <dt>Versión</dt><dd>${escapeHtml(appData.metadata.appVersion)}</dd>
            <dt>Schema</dt><dd>${escapeHtml(appData.metadata.schemaVersion)}</dd>
            <dt>Creado</dt><dd>${escapeHtml(formatDateTime(appData.metadata.createdAt))}</dd>
            <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(appData.metadata.updatedAt))}</dd>
          </dl>
          <div class="badge-row">
            <span class="badge">HTML</span>
            <span class="badge">CSS</span>
            <span class="badge">JS</span>
            <span class="badge">localStorage</span>
            <span class="badge">Catálogos</span>
            <span class="badge">Ventas / OC</span>
            <span class="badge">Cobros</span>
            <span class="badge">Proveedores / Compras</span>
            <span class="badge">Pagos a proveedores</span>
            <span class="badge">Gastos</span>
            <span class="badge">Mora y Alertas</span>
            <span class="badge">Resumen / Tablero</span>
            <span class="badge">Excel / Cierre</span>
            <span class="badge">Configuración</span>
            <span class="badge">Roles locales</span>
            <span class="badge">Respaldo JSON</span>
          </div>
        </article>
      </section>
    `;
  }

  function renderPlaceholder(module) {
    const relatedKeys = getRelatedDataKeys(module.id);
    const pills = relatedKeys.map((key) => `
      <div class="data-pill"><span>${escapeHtml(key)}</span><strong>${appData[key]?.length ?? 0}</strong></div>
    `).join('');

    return `
      <section class="hero">
        <div>
          <span class="eyebrow">Módulo preparado</span>
          <h1>${escapeHtml(module.title)}</h1>
          <p class="lead">${escapeHtml(module.description)}</p>
        </div>
      </section>

      <article class="placeholder-card">
        <h2>${escapeHtml(module.short)} queda listo para una siguiente etapa</h2>
        <p>${escapeHtml(module.placeholder)}</p>
        <p class="notice">Pantalla placeholder navegable. No hay cálculos reales ni formularios definitivos todavía; el objetivo aquí es que cada pieza entre cuando le toque, sin invocar demonios de Excel.</p>
        <div class="data-list">${pills}</div>
        <div class="placeholder-tools">
          <button type="button" class="card-action" data-go="home">Volver al Menú</button>
          <button type="button" class="secondary-action" data-go="catalogos">Ir a Catálogos</button>
        </div>
      </article>
    `;
  }


  function renderResumenTablero() {
    const summary = buildResumenTableroSummary();
    const filters = summary.filters;
    const clientesActivos = getActiveCatalogRecords('clientes');
    const sucursalesActivas = getActiveCatalogRecords('sucursales');
    const proveedoresActivos = getActiveCatalogRecords('proveedores');
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const yearOptions = getResumenYearOptions();

    return `
      <section class="hero resumen-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Resumen / Tablero</h1>
          <p class="lead">Vista operativa para leer ventas netas, cobros reales, saldos, gastos, mora y alertas sin convertir el control diario en una novela rusa con fórmulas escondidas.</p>
        </div>
        <aside class="hero-status" aria-label="Estado del tablero">
          <h3>Lectura actual</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Período</strong><span>${escapeHtml(summary.periodLabel)}</span></div>
            <div class="status-item"><strong>Documentos venta</strong><span>${summary.ventasPeriodo.length}</span></div>
            <div class="status-item"><strong>Documentos proveedor</strong><span>${summary.comprasPeriodo.length}</span></div>
            <div class="status-item"><strong>Alertas</strong><span>${summary.alertas.length}</span></div>
          </div>
        </aside>
      </section>

      <section class="resumen-shell">
        <form class="panel-card resumen-filter-panel" data-resumen-filters>
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">Filtros</span>
              <h2>Filtros operativos</h2>
            </div>
            <button type="button" class="secondary-action compact" data-resumen-clear>Limpiar filtros</button>
          </div>
          <div class="resumen-filter-grid">
            <label class="form-field">
              <span>Mes</span>
              <select name="month">
                <option value="">Todos</option>
                ${getMonthOptions().map((month) => `<option value="${month.value}" ${filters.month === month.value ? 'selected' : ''}>${escapeHtml(month.label)}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Año</span>
              <select name="year">
                <option value="">Todos</option>
                ${yearOptions.map((year) => `<option value="${escapeHtml(year)}" ${filters.year === year ? 'selected' : ''}>${escapeHtml(year)}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Desde</span>
              <input type="date" name="dateFrom" value="${escapeHtml(filters.dateFrom)}" />
            </label>
            <label class="form-field">
              <span>Hasta</span>
              <input type="date" name="dateTo" value="${escapeHtml(filters.dateTo)}" />
            </label>
            <label class="form-field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Todos</option>
                ${clientesActivos.map((cliente) => `<option value="${escapeHtml(cliente.id)}" ${filters.clienteId === cliente.id ? 'selected' : ''}>${escapeHtml(cliente.nombre || 'Cliente sin nombre')}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Proveedor</span>
              <select name="proveedorId">
                <option value="">Todos</option>
                ${proveedoresActivos.map((proveedor) => `<option value="${escapeHtml(proveedor.id)}" ${filters.proveedorId === proveedor.id ? 'selected' : ''}>${escapeHtml(proveedor.nombre || 'Proveedor sin nombre')}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Sucursal</span>
              <select name="sucursalId">
                <option value="">Todas</option>
                ${sucursalesActivas.map((sucursal) => `<option value="${escapeHtml(sucursal.id)}" ${filters.sucursalId === sucursal.id ? 'selected' : ''}>${escapeHtml(sucursal.nombre || 'Sucursal sin nombre')}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Estado</span>
              <select name="estado">
                <option value="">Todos</option>
                ${getResumenEstadoOptions().map((estado) => `<option value="${escapeHtml(estado)}" ${filters.estado === estado ? 'selected' : ''}>${escapeHtml(estado)}</option>`).join('')}
              </select>
            </label>
            <label class="form-field">
              <span>Mora</span>
              <select name="mora">
                <option value="">Todos</option>
                <option value="conMora" ${filters.mora === 'conMora' ? 'selected' : ''}>Con mora</option>
                <option value="sinMora" ${filters.mora === 'sinMora' ? 'selected' : ''}>Sin mora</option>
                <option value="proximo" ${filters.mora === 'proximo' ? 'selected' : ''}>Próximos a vencer</option>
              </select>
            </label>
            <label class="form-field">
              <span>Método de pago</span>
              <select name="metodoPagoId">
                <option value="">Todos</option>
                ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${filters.metodoPagoId === metodo.id ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
              </select>
            </label>
          </div>
          <div class="filter-help">
            <span>Rango de fechas manda sobre Mes/Año.</span>
            <span>Método aplica a cobros, pagos y gastos.</span>
            <span>Saldos y mora se muestran como cartera general filtrada.</span>
          </div>
        </form>

        <section class="metric-grid resumen-metrics" aria-label="Indicadores principales">
          <article class="metric-card"><span>Total vendido</span><strong>${escapeHtml(formatMoney(summary.totalVendido))}</strong><small>Venta neta del período</small></article>
          <article class="metric-card"><span>Total cobrado clientes</span><strong>${escapeHtml(formatMoney(summary.totalCobradoClientes))}</strong><small>Fecha real de cobro</small></article>
          <article class="metric-card"><span>Saldo por cobrar</span><strong>${escapeHtml(formatMoney(summary.saldoPorCobrar))}</strong><small>Cartera general</small></article>
          <article class="metric-card"><span>Total compras/proveedores</span><strong>${escapeHtml(formatMoney(summary.totalComprasProveedores))}</strong><small>Documentos originados</small></article>
          <article class="metric-card"><span>Total pagado proveedores</span><strong>${escapeHtml(formatMoney(summary.totalPagadoProveedores))}</strong><small>Fecha real de pago</small></article>
          <article class="metric-card"><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(summary.saldoPorPagar))}</strong><small>Cartera general</small></article>
          <article class="metric-card"><span>Total gastos</span><strong>${escapeHtml(formatMoney(summary.totalGastos))}</strong><small>Gastos no anulados</small></article>
          <article class="metric-card"><span>Clientes en mora</span><strong>${summary.clientesMoraCount}</strong><small>${summary.clientesMora.length} documentos</small></article>
          <article class="metric-card"><span>Proveedores en mora</span><strong>${summary.proveedoresMoraCount}</strong><small>${summary.proveedoresMora.length} documentos</small></article>
          <article class="metric-card"><span>Flujo del período</span><strong>${escapeHtml(formatMoney(summary.flujoPeriodo))}</strong><small>Cobros - pagos - gastos</small></article>
        </section>

        <section class="panel-grid resumen-two-columns">
          <article class="panel-card resumen-panel">
            <div class="section-title-row">
              <div><span class="eyebrow mini">Gastos</span><h2>Gastos por tipo</h2></div>
              <div class="count-pill">${summary.gastosPorTipo.length} tipos</div>
            </div>
            ${renderResumenGastosPorTipo(summary.gastosPorTipo)}
          </article>

          <article class="panel-card resumen-panel">
            <div class="section-title-row">
              <div><span class="eyebrow mini">Ventas</span><h2>Venta por sucursal</h2></div>
              <div class="count-pill">${summary.ventaPorSucursal.length} sucursales</div>
            </div>
            ${renderResumenVentaPorSucursal(summary.ventaPorSucursal)}
          </article>
        </section>

        <section class="panel-card resumen-panel">
          <div class="section-title-row">
            <div><span class="eyebrow mini">Proveedores</span><h2>Saldos por proveedor</h2></div>
            <div class="count-pill">Cartera general</div>
          </div>
          ${renderResumenSaldosProveedor(summary.saldosPorProveedor)}
        </section>

        <section class="panel-grid resumen-two-columns">
          <article class="panel-card resumen-panel">
            <div class="section-title-row">
              <div><span class="eyebrow mini">Clientes</span><h2>Clientes en mora</h2></div>
              <div class="count-pill">${summary.clientesMora.length} documentos</div>
            </div>
            ${renderResumenClientesMora(summary.clientesMora)}
          </article>

          <article class="panel-card resumen-panel">
            <div class="section-title-row">
              <div><span class="eyebrow mini">Proveedores</span><h2>Proveedores en mora</h2></div>
              <div class="count-pill">${summary.proveedoresMora.length} documentos</div>
            </div>
            ${renderResumenProveedoresMora(summary.proveedoresMora)}
          </article>
        </section>

        <section class="panel-card resumen-panel">
          <div class="section-title-row">
            <div><span class="eyebrow mini">Alertas</span><h2>Alertas principales</h2></div>
            <div class="count-pill">7 días próximos a vencer</div>
          </div>
          ${renderAlertasPrincipales(summary)}
        </section>
      </section>
    `;
  }

  function buildResumenTableroSummary() {
    return buildResumenSummaryForFilters(resumenState);
  }

  function buildResumenSummaryForFilters(inputFilters = resumenState) {
    const filters = normalizeResumenFilters(inputFilters);
    const range = getResumenDateRange(filters);
    const ventas = recalculateVentasWithCobros(appData.ventas, appData.cobros).map((record) => normalizeVentaRecord(record));
    const compras = recalculateComprasProveedoresWithPagos(appData.comprasProveedores, appData.pagosProveedores).map((record) => normalizeCompraProveedorRecord(record));
    const cobros = (Array.isArray(appData.cobros) ? appData.cobros : []).map((record) => normalizeCobroRecord(record));
    const pagos = (Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : []).map((record) => normalizePagoProveedorRecord(record));
    const gastos = (Array.isArray(appData.gastos) ? appData.gastos : []).map((record) => normalizeGastoRecord(record));
    const ventasById = new Map(ventas.map((venta) => [venta.id, venta]));
    const comprasById = new Map(compras.map((compra) => [compra.id, compra]));

    const ventasPeriodo = ventas.filter((venta) => venta.activo && matchesResumenVenta(venta, filters, range, true));
    const ventasCartera = ventas.filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && matchesResumenVenta(venta, filters, null, false));
    const comprasPeriodo = compras.filter((compra) => compra.activo && matchesResumenCompra(compra, filters, range, true));
    const comprasCartera = compras.filter((compra) => compra.activo && compra.saldoPorPagar > 0 && matchesResumenCompra(compra, filters, null, false));
    const comprasGeneral = compras.filter((compra) => compra.activo && matchesResumenCompra(compra, filters, null, false));
    const cobrosPeriodo = cobros.filter((cobro) => cobro.activo && matchesResumenCobro(cobro, filters, range, ventasById));
    const pagosPeriodo = pagos.filter((pago) => pago.activo && matchesResumenPago(pago, filters, range, comprasById));
    const gastosPeriodo = gastos.filter((gasto) => gasto.activo && matchesResumenGasto(gasto, filters, range));

    const clientesMora = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isPastDate(venta.fechaVencimiento) && matchesResumenVenta(venta, filters, null, false))
      .map((venta) => buildClienteMoraItem(venta))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const proveedoresMora = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isPastDate(compra.fechaVencimiento) && matchesResumenCompra(compra, filters, null, false))
      .map((compra) => buildProveedorMoraItem(compra))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const ventasProximas = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isWithinNextDays(venta.fechaVencimiento, 7) && matchesResumenVenta(venta, filters, null, false))
      .sort((a, b) => String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento)));
    const comprasProximas = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isWithinNextDays(compra.fechaVencimiento, 7) && matchesResumenCompra(compra, filters, null, false))
      .sort((a, b) => String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento)));
    const saldosAltosClientes = ventasCartera.slice().sort((a, b) => b.saldoPorCobrar - a.saldoPorCobrar).slice(0, 3);
    const saldosAltosProveedores = comprasCartera.slice().sort((a, b) => b.saldoPorPagar - a.saldoPorPagar).slice(0, 3);
    const parciales = [
      ...ventas.filter((venta) => venta.activo && venta.estado === 'Abonado' && matchesResumenVenta(venta, filters, null, false)).map((venta) => ({ tipo: 'Cliente', titulo: venta.numeroDocumento || 'OC sin número', saldo: venta.saldoPorCobrar })),
      ...compras.filter((compra) => compra.activo && compra.estado === 'Abonado' && matchesResumenCompra(compra, filters, null, false)).map((compra) => ({ tipo: 'Proveedor', titulo: compra.facturaReferencia || 'Factura sin referencia', saldo: compra.saldoPorPagar }))
    ];
    const alertas = buildAlertasList({ clientesMora, proveedoresMora, ventasProximas, comprasProximas, saldosAltosClientes, saldosAltosProveedores, parciales });

    const totalVendido = sumMoney(ventasPeriodo, (venta) => venta.ventaNeta);
    const totalCobradoClientes = sumMoney(cobrosPeriodo, (cobro) => cobro.montoCobrado);
    const saldoPorCobrar = sumMoney(ventasCartera, (venta) => venta.saldoPorCobrar);
    const totalComprasProveedores = sumMoney(comprasPeriodo, (compra) => compra.totalCompra);
    const totalPagadoProveedores = sumMoney(pagosPeriodo, (pago) => pago.montoPagado);
    const saldoPorPagar = sumMoney(comprasCartera, (compra) => compra.saldoPorPagar);
    const totalGastos = sumMoney(gastosPeriodo, (gasto) => gasto.monto);
    const flujoPeriodo = roundMoney(totalCobradoClientes - totalPagadoProveedores - totalGastos);

    return {
      filters,
      range,
      periodLabel: getResumenPeriodLabel(filters, range),
      ventas,
      compras,
      cobros,
      pagos,
      gastos,
      ventasPeriodo,
      comprasPeriodo,
      cobrosPeriodo,
      pagosPeriodo,
      gastosPeriodo,
      totalVendido,
      totalCobradoClientes,
      saldoPorCobrar,
      totalComprasProveedores,
      totalPagadoProveedores,
      saldoPorPagar,
      totalGastos,
      flujoPeriodo,
      clientesMora,
      proveedoresMora,
      clientesMoraCount: countUnique(clientesMora, (item) => item.cliente),
      proveedoresMoraCount: countUnique(proveedoresMora, (item) => item.proveedor),
      ventasProximas,
      comprasProximas,
      saldosAltosClientes,
      saldosAltosProveedores,
      parciales,
      alertas,
      gastosPorTipo: buildGastosPorTipo(gastosPeriodo),
      ventaPorSucursal: buildVentaPorSucursal(ventasPeriodo, cobrosPeriodo, ventasCartera, ventasById),
      saldosPorProveedor: buildSaldosPorProveedor(comprasGeneral)
    };
  }

  function normalizeResumenFilters(filters) {
    const safe = isPlainObject(filters) ? filters : {};
    return {
      month: /^\d{2}$/.test(String(safe.month || '')) ? String(safe.month) : '',
      year: /^\d{4}$/.test(String(safe.year || '')) ? String(safe.year) : '',
      dateFrom: toDateInputValue(safe.dateFrom),
      dateTo: toDateInputValue(safe.dateTo),
      clienteId: cleanText(safe.clienteId),
      proveedorId: cleanText(safe.proveedorId),
      sucursalId: cleanText(safe.sucursalId),
      estado: cleanText(safe.estado),
      mora: cleanText(safe.mora),
      metodoPagoId: cleanText(safe.metodoPagoId)
    };
  }

  function getResumenDateRange(filters) {
    const dateFrom = toDateInputValue(filters.dateFrom);
    const dateTo = toDateInputValue(filters.dateTo);
    if (dateFrom || dateTo) {
      return {
        from: dateFrom || '0001-01-01',
        to: dateTo || '9999-12-31',
        mode: 'range'
      };
    }
    if (filters.month && filters.year) {
      const year = Number(filters.year);
      const month = Number(filters.month);
      const first = new Date(year, month - 1, 1);
      const last = new Date(year, month, 0);
      return { from: formatDateInput(first), to: formatDateInput(last), mode: 'month' };
    }
    if (filters.year) {
      return { from: `${filters.year}-01-01`, to: `${filters.year}-12-31`, mode: 'year' };
    }
    return null;
  }

  function getResumenPeriodLabel(filters, range) {
    if (!range) return 'Todo el histórico';
    if (range.mode === 'month') {
      const month = getMonthOptions().find((item) => item.value === filters.month);
      return `${month?.label || filters.month} ${filters.year}`;
    }
    if (range.mode === 'year') return `Año ${filters.year}`;
    return `${formatDate(range.from)} → ${formatDate(range.to)}`;
  }

  function isDateInResumenRange(dateInput, range) {
    if (!range) return true;
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return false;
    return safeDate >= range.from && safeDate <= range.to;
  }

  function matchesResumenVenta(venta, filters, range, useDate) {
    if (filters.clienteId && venta.clienteId !== filters.clienteId) return false;
    if (filters.sucursalId && venta.sucursalId !== filters.sucursalId) return false;
    if (filters.estado && venta.estado !== filters.estado) return false;
    if (!matchesResumenMoraFilter(venta.fechaVencimiento, venta.saldoPorCobrar, filters.mora)) return false;
    if (useDate && !isDateInResumenRange(venta.fechaOc, range)) return false;
    return true;
  }

  function matchesResumenCompra(compra, filters, range, useDate) {
    if (filters.proveedorId && compra.proveedorId !== filters.proveedorId) return false;
    if (filters.estado && compra.estado !== filters.estado) return false;
    if (!matchesResumenMoraFilter(compra.fechaVencimiento, compra.saldoPorPagar, filters.mora)) return false;
    if (useDate && !isDateInResumenRange(compra.fechaCompra, range)) return false;
    return true;
  }

  function matchesResumenCobro(cobro, filters, range, ventasById) {
    const venta = ventasById.get(cobro.ventaId);
    const clienteId = venta?.clienteId || cobro.clienteId;
    const sucursalId = venta?.sucursalId || cobro.sucursalId;
    if (!isDateInResumenRange(cobro.fechaCobro, range)) return false;
    if (filters.clienteId && clienteId !== filters.clienteId) return false;
    if (filters.sucursalId && sucursalId !== filters.sucursalId) return false;
    if (filters.metodoPagoId && cobro.metodoPagoId !== filters.metodoPagoId) return false;
    if (filters.estado && cobro.estado !== filters.estado && venta?.estado !== filters.estado) return false;
    if (venta && !matchesResumenMoraFilter(venta.fechaVencimiento, venta.saldoPorCobrar, filters.mora)) return false;
    return true;
  }

  function matchesResumenPago(pago, filters, range, comprasById) {
    const compra = comprasById.get(pago.compraProveedorId);
    const proveedorId = compra?.proveedorId || pago.proveedorId;
    if (!isDateInResumenRange(pago.fechaPago, range)) return false;
    if (filters.proveedorId && proveedorId !== filters.proveedorId) return false;
    if (filters.metodoPagoId && pago.metodoPagoId !== filters.metodoPagoId) return false;
    if (filters.estado && pago.estado !== filters.estado && compra?.estado !== filters.estado) return false;
    if (compra && !matchesResumenMoraFilter(compra.fechaVencimiento, compra.saldoPorPagar, filters.mora)) return false;
    return true;
  }

  function matchesResumenGasto(gasto, filters, range) {
    if (!isDateInResumenRange(gasto.fecha, range)) return false;
    if (filters.metodoPagoId && gasto.metodoPagoId !== filters.metodoPagoId) return false;
    if (filters.estado && gasto.estado !== filters.estado) return false;
    return true;
  }

  function matchesResumenMoraFilter(fechaVencimiento, saldoPendiente, moraFilter) {
    if (!moraFilter) return true;
    const hasDebt = roundMoney(saldoPendiente) > 0;
    const overdue = hasDebt && isPastDate(fechaVencimiento);
    if (moraFilter === 'conMora') return overdue;
    if (moraFilter === 'sinMora') return !overdue;
    if (moraFilter === 'proximo') return hasDebt && isWithinNextDays(fechaVencimiento, 7);
    return true;
  }

  function getMonthOptions() {
    return [
      { value: '01', label: 'Enero' },
      { value: '02', label: 'Febrero' },
      { value: '03', label: 'Marzo' },
      { value: '04', label: 'Abril' },
      { value: '05', label: 'Mayo' },
      { value: '06', label: 'Junio' },
      { value: '07', label: 'Julio' },
      { value: '08', label: 'Agosto' },
      { value: '09', label: 'Septiembre' },
      { value: '10', label: 'Octubre' },
      { value: '11', label: 'Noviembre' },
      { value: '12', label: 'Diciembre' }
    ];
  }

  function getResumenEstadoOptions() {
    return ['Pendiente', 'Abonado', 'Pagado', 'Vencido', 'Registrado', 'Anulado'];
  }

  function getResumenYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = new Set([currentYear - 1, currentYear, currentYear + 1].map(String));
    const addYear = (dateInput) => {
      const safeDate = toDateInputValue(dateInput);
      if (safeDate) years.add(safeDate.slice(0, 4));
    };
    (Array.isArray(appData.ventas) ? appData.ventas : []).forEach((record) => addYear(record.fechaOc || record.fecha));
    (Array.isArray(appData.cobros) ? appData.cobros : []).forEach((record) => addYear(record.fechaCobro || record.fecha));
    (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : []).forEach((record) => addYear(record.fechaCompra || record.fecha));
    (Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : []).forEach((record) => addYear(record.fechaPago || record.fecha));
    (Array.isArray(appData.gastos) ? appData.gastos : []).forEach((record) => addYear(record.fecha));
    if (resumenState.year) years.add(String(resumenState.year));
    return Array.from(years).filter((year) => /^\d{4}$/.test(year)).sort((a, b) => Number(b) - Number(a));
  }

  function sumMoney(records, getter) {
    return records.reduce((sum, record) => roundMoney(sum + roundMoney(getter(record))), 0);
  }

  function countUnique(records, getter) {
    return new Set(records.map((record) => cleanText(getter(record))).filter(Boolean)).size;
  }

  function buildGastosPorTipo(gastos) {
    const groups = new Map();
    gastos.forEach((gasto) => {
      const tipo = getCatalogRecordById('tiposGasto', gasto.tipoGastoId);
      const key = gasto.tipoGastoId || gasto.tipoGastoNombre || 'sin_tipo';
      const label = tipo?.nombre || gasto.tipoGastoNombre || 'Sin tipo';
      const current = groups.get(key) || { key, tipo: label, total: 0, cantidad: 0 };
      current.total = roundMoney(current.total + gasto.monto);
      current.cantidad += 1;
      groups.set(key, current);
    });
    return Array.from(groups.values()).sort((a, b) => b.total - a.total || a.tipo.localeCompare(b.tipo, 'es-NI'));
  }

  function buildVentaPorSucursal(ventasPeriodo, cobrosPeriodo, ventasCartera, ventasById) {
    const groups = new Map();
    const ensureGroup = (sucursalId, fallbackName) => {
      const sucursal = getCatalogRecordById('sucursales', sucursalId);
      const key = sucursalId || fallbackName || 'sin_sucursal';
      const current = groups.get(key) || {
        key,
        sucursal: sucursal?.nombre || fallbackName || 'Sin sucursal',
        totalVendido: 0,
        totalCobrado: 0,
        saldoPorCobrar: 0,
        documentos: 0
      };
      groups.set(key, current);
      return current;
    };

    ventasPeriodo.forEach((venta) => {
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      const group = ensureGroup(venta.sucursalId, sucursal?.nombre || 'Sin sucursal');
      group.totalVendido = roundMoney(group.totalVendido + venta.ventaNeta);
      group.documentos += 1;
    });

    cobrosPeriodo.forEach((cobro) => {
      const venta = ventasById.get(cobro.ventaId);
      const sucursal = getCatalogRecordById('sucursales', venta?.sucursalId || cobro.sucursalId);
      const group = ensureGroup(venta?.sucursalId || cobro.sucursalId, sucursal?.nombre || cobro.sucursalNombre || 'Sin sucursal');
      group.totalCobrado = roundMoney(group.totalCobrado + cobro.montoCobrado);
    });

    ventasCartera.forEach((venta) => {
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      const group = ensureGroup(venta.sucursalId, sucursal?.nombre || 'Sin sucursal');
      group.saldoPorCobrar = roundMoney(group.saldoPorCobrar + venta.saldoPorCobrar);
    });

    return Array.from(groups.values())
      .filter((item) => item.totalVendido || item.totalCobrado || item.saldoPorCobrar)
      .sort((a, b) => b.totalVendido - a.totalVendido || b.saldoPorCobrar - a.saldoPorCobrar || a.sucursal.localeCompare(b.sucursal, 'es-NI'));
  }

  function buildSaldosPorProveedor(compras) {
    const groups = new Map();
    compras.forEach((compra) => {
      const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
      const key = compra.proveedorId || compra.proveedorNombre || 'sin_proveedor';
      const current = groups.get(key) || {
        key,
        proveedor: proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado',
        totalCompra: 0,
        totalPagado: 0,
        saldoPorPagar: 0,
        documentos: 0
      };
      current.totalCompra = roundMoney(current.totalCompra + compra.totalCompra);
      current.totalPagado = roundMoney(current.totalPagado + compra.totalPagado);
      current.saldoPorPagar = roundMoney(current.saldoPorPagar + compra.saldoPorPagar);
      current.documentos += 1;
      groups.set(key, current);
    });
    return Array.from(groups.values())
      .filter((item) => item.totalCompra || item.totalPagado || item.saldoPorPagar)
      .sort((a, b) => b.saldoPorPagar - a.saldoPorPagar || b.totalCompra - a.totalCompra || a.proveedor.localeCompare(b.proveedor, 'es-NI'));
  }

  function renderResumenGastosPorTipo(items) {
    if (!items.length) return renderMoraEmptyState('Sin gastos en el período.', 'Los gastos no anulados aparecerán agrupados por tipo.');
    return `
      <div class="resumen-list">
        ${items.map((item) => `
          <article class="resumen-row-card">
            <div><strong>${escapeHtml(item.tipo)}</strong><span>${item.cantidad} registro${item.cantidad === 1 ? '' : 's'}</span></div>
            <b>${escapeHtml(formatMoney(item.total))}</b>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderResumenVentaPorSucursal(items) {
    if (!items.length) return renderMoraEmptyState('Sin venta por sucursal.', 'Cuando existan OC, cobros o cartera filtrada, aparecerán aquí por sucursal.');
    return `
      <div class="resumen-list">
        ${items.map((item) => `
          <article class="resumen-row-card stacked">
            <div class="resumen-row-head"><strong>${escapeHtml(item.sucursal)}</strong><span>${item.documentos} OC originada${item.documentos === 1 ? '' : 's'}</span></div>
            <div class="resumen-mini-grid">
              <div><span>Vendido</span><strong>${escapeHtml(formatMoney(item.totalVendido))}</strong></div>
              <div><span>Cobrado</span><strong>${escapeHtml(formatMoney(item.totalCobrado))}</strong></div>
              <div><span>Saldo</span><strong>${escapeHtml(formatMoney(item.saldoPorCobrar))}</strong></div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderResumenSaldosProveedor(items) {
    if (!items.length) return renderMoraEmptyState('Sin saldos por proveedor.', 'Las compras/deudas no anuladas aparecerán agrupadas por proveedor.');
    return `
      <div class="resumen-list provider-list">
        ${items.map((item) => `
          <article class="resumen-row-card stacked">
            <div class="resumen-row-head"><strong>${escapeHtml(item.proveedor)}</strong><span>${item.documentos} documento${item.documentos === 1 ? '' : 's'}</span></div>
            <div class="resumen-mini-grid provider-grid">
              <div><span>Total compra/deuda</span><strong>${escapeHtml(formatMoney(item.totalCompra))}</strong></div>
              <div><span>Total pagado</span><strong>${escapeHtml(formatMoney(item.totalPagado))}</strong></div>
              <div><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(item.saldoPorPagar))}</strong></div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderResumenClientesMora(items) {
    if (!items.length) return renderMoraEmptyState('No hay clientes en mora.', 'La cartera vencida con saldo pendiente aparecerá aquí.');
    return `
      <div class="resumen-list mora-resumen-list">
        ${items.map((item) => `
          <article class="resumen-row-card stacked">
            <div class="resumen-row-head"><strong>${escapeHtml(item.cliente)}</strong><span>${escapeHtml(item.rango)} · ${item.diasMora} días</span></div>
            <div class="resumen-mini-grid">
              <div><span>Sucursal</span><strong>${escapeHtml(item.sucursal)}</strong></div>
              <div><span>OC</span><strong>${escapeHtml(item.documento)}</strong></div>
              <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(item.fechaVencimiento))}</strong></div>
              <div><span>Saldo</span><strong>${escapeHtml(formatMoney(item.saldoPendiente))}</strong></div>
            </div>
            <div class="record-actions"><button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(item.id)}">Ver historial</button></div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderResumenProveedoresMora(items) {
    if (!items.length) return renderMoraEmptyState('No hay proveedores en mora.', 'Las facturas vencidas con saldo pendiente aparecerán aquí.');
    return `
      <div class="resumen-list mora-resumen-list">
        ${items.map((item) => `
          <article class="resumen-row-card stacked">
            <div class="resumen-row-head"><strong>${escapeHtml(item.proveedor)}</strong><span>${escapeHtml(item.rango)} · ${item.diasMora} días</span></div>
            <div class="resumen-mini-grid">
              <div><span>Factura/ref.</span><strong>${escapeHtml(item.documento)}</strong></div>
              <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(item.fechaVencimiento))}</strong></div>
              <div><span>Total compra</span><strong>${escapeHtml(formatMoney(item.totalCompra))}</strong></div>
              <div><span>Saldo</span><strong>${escapeHtml(formatMoney(item.saldoPendiente))}</strong></div>
            </div>
            <div class="record-actions"><button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(item.id)}">Ver historial</button></div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function updateResumenFiltersFromForm(form) {
    const formData = new FormData(form);
    resumenState = normalizeResumenFilters({
      month: formData.get('month'),
      year: formData.get('year'),
      dateFrom: formData.get('dateFrom'),
      dateTo: formData.get('dateTo'),
      clienteId: formData.get('clienteId'),
      proveedorId: formData.get('proveedorId'),
      sucursalId: formData.get('sucursalId'),
      estado: formData.get('estado'),
      mora: formData.get('mora'),
      metodoPagoId: formData.get('metodoPagoId')
    });
    renderRoute();
  }

  function clearResumenFilters() {
    resumenState = {
      month: '',
      year: '',
      dateFrom: '',
      dateTo: '',
      clienteId: '',
      proveedorId: '',
      sucursalId: '',
      estado: '',
      mora: '',
      metodoPagoId: ''
    };
    renderRoute();
  }

  function renderMoraAlertas() {
    const summary = buildMoraAlertasSummary();
    const selectedHistory = getSelectedDocumentHistory();
    const moraClientesCards = summary.clientesMora.length
      ? summary.clientesMora.map((item) => renderClienteMoraCard(item)).join('')
      : renderMoraEmptyState('No hay clientes en mora.', 'Las OC vencidas con saldo aparecerán aquí automáticamente.');
    const moraProveedoresCards = summary.proveedoresMora.length
      ? summary.proveedoresMora.map((item) => renderProveedorMoraCard(item)).join('')
      : renderMoraEmptyState('No hay proveedores en mora.', 'Las facturas vencidas con saldo aparecerán aquí automáticamente.');

    return `
      <section class="hero mora-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Mora y Alertas</h1>
          <p class="lead">Cartera viva por documento: quién debe, cuánto debe, desde cuándo debe y qué movimientos explican el saldo. Aquí el Excel deja de susurrar y empieza a declarar.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de mora y alertas">
          <h3>Cartera crítica</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Clientes en mora</strong><span>${summary.clientesMora.length}</span></div>
            <div class="status-item"><strong>Saldo clientes</strong><span>${escapeHtml(formatMoney(summary.totalMoraClientes))}</span></div>
            <div class="status-item"><strong>Proveedores en mora</strong><span>${summary.proveedoresMora.length}</span></div>
            <div class="status-item"><strong>Saldo proveedores</strong><span>${escapeHtml(formatMoney(summary.totalMoraProveedores))}</span></div>
          </div>
        </aside>
      </section>

      <section class="mora-shell">
        <section class="metric-grid" aria-label="Indicadores de mora">
          <article class="metric-card"><span>OC pendientes</span><strong>${summary.ventasPendientes}</strong></article>
          <article class="metric-card"><span>OC próximas a vencer</span><strong>${summary.ventasProximas.length}</strong></article>
          <article class="metric-card"><span>Facturas pendientes</span><strong>${summary.comprasPendientes}</strong></article>
          <article class="metric-card"><span>Facturas próximas</span><strong>${summary.comprasProximas.length}</strong></article>
          <article class="metric-card"><span>Pagos parciales</span><strong>${summary.parciales.length}</strong></article>
          <article class="metric-card"><span>Alertas activas</span><strong>${summary.alertas.length}</strong></article>
        </section>

        ${selectedHistory ? renderSelectedHistoryPanel(selectedHistory) : ''}

        <section class="panel-grid mora-two-columns">
          <article class="panel-card mora-panel">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Clientes</span>
                <h2>Clientes en mora</h2>
              </div>
              <div class="count-pill">${summary.clientesMora.length} documentos</div>
            </div>
            <div class="range-summary" aria-label="Rangos de mora de clientes">
              ${renderRangeSummary(summary.clientesRangeCounts)}
            </div>
            <div class="mora-list">${moraClientesCards}</div>
          </article>

          <article class="panel-card mora-panel">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Proveedores</span>
                <h2>Proveedores en mora</h2>
              </div>
              <div class="count-pill">${summary.proveedoresMora.length} documentos</div>
            </div>
            <div class="range-summary" aria-label="Rangos de mora de proveedores">
              ${renderRangeSummary(summary.proveedoresRangeCounts)}
            </div>
            <div class="mora-list">${moraProveedoresCards}</div>
          </article>
        </section>

        <section class="panel-card alertas-panel">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">Alertas</span>
              <h2>Alertas principales</h2>
            </div>
            <div class="count-pill">7 días próximos a vencer</div>
          </div>
          ${renderAlertasPrincipales(summary)}
        </section>

        <section class="panel-card historial-panel">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">Trazabilidad</span>
              <h2>Historial por documento</h2>
            </div>
            <label class="compact-search">
              <span>Buscar</span>
              <input type="search" placeholder="OC, factura, cliente o proveedor" data-mora-search autocomplete="off" />
            </label>
          </div>
          <div class="historial-grid">
            ${summary.ventas.map((venta) => renderVentaHistoryCard(venta)).join('') || renderMoraEmptyState('No hay OC para historial.', 'Cuando registres ventas, cada documento tendrá su trazabilidad.')}
            ${summary.compras.map((compra) => renderCompraHistoryCard(compra)).join('') || renderMoraEmptyState('No hay facturas para historial.', 'Cuando registres proveedores/compras, cada factura tendrá su trazabilidad.')}
          </div>
        </section>
      </section>
    `;
  }

  function buildMoraAlertasSummary() {
    const ventas = recalculateVentasWithCobros(appData.ventas, appData.cobros).map((record) => normalizeVentaRecord(record));
    const compras = recalculateComprasProveedoresWithPagos(appData.comprasProveedores, appData.pagosProveedores).map((record) => normalizeCompraProveedorRecord(record));
    const clientesMora = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isPastDate(venta.fechaVencimiento))
      .map((venta) => buildClienteMoraItem(venta))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const proveedoresMora = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isPastDate(compra.fechaVencimiento))
      .map((compra) => buildProveedorMoraItem(compra))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const ventasProximas = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isWithinNextDays(venta.fechaVencimiento, 7))
      .sort((a, b) => String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento)));
    const comprasProximas = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isWithinNextDays(compra.fechaVencimiento, 7))
      .sort((a, b) => String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento)));
    const saldosAltosClientes = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0)
      .sort((a, b) => b.saldoPorCobrar - a.saldoPorCobrar)
      .slice(0, 3);
    const saldosAltosProveedores = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0)
      .sort((a, b) => b.saldoPorPagar - a.saldoPorPagar)
      .slice(0, 3);
    const parciales = [
      ...ventas.filter((venta) => venta.activo && venta.estado === 'Abonado').map((venta) => ({ tipo: 'Cliente', titulo: venta.numeroDocumento || 'OC sin número', saldo: venta.saldoPorCobrar })),
      ...compras.filter((compra) => compra.activo && compra.estado === 'Abonado').map((compra) => ({ tipo: 'Proveedor', titulo: compra.facturaReferencia || 'Factura sin referencia', saldo: compra.saldoPorPagar }))
    ];
    const alertas = buildAlertasList({ clientesMora, proveedoresMora, ventasProximas, comprasProximas, saldosAltosClientes, saldosAltosProveedores, parciales });

    return {
      ventas,
      compras,
      clientesMora,
      proveedoresMora,
      ventasProximas,
      comprasProximas,
      saldosAltosClientes,
      saldosAltosProveedores,
      parciales,
      alertas,
      ventasPendientes: ventas.filter((venta) => venta.activo && venta.saldoPorCobrar > 0).length,
      comprasPendientes: compras.filter((compra) => compra.activo && compra.saldoPorPagar > 0).length,
      totalMoraClientes: clientesMora.reduce((sum, item) => roundMoney(sum + item.saldoPendiente), 0),
      totalMoraProveedores: proveedoresMora.reduce((sum, item) => roundMoney(sum + item.saldoPendiente), 0),
      clientesRangeCounts: countMoraRanges(clientesMora),
      proveedoresRangeCounts: countMoraRanges(proveedoresMora)
    };
  }

  function buildClienteMoraItem(venta) {
    const cliente = getCatalogRecordById('clientes', venta.clienteId);
    const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
    const diasMora = getDaysOverdue(venta.fechaVencimiento);
    return {
      id: venta.id,
      cliente: cliente?.nombre || 'Cliente no encontrado',
      sucursal: sucursal?.nombre || 'Sucursal no encontrada',
      documento: venta.numeroDocumento || 'Sin número',
      fechaOrigen: venta.fechaOc,
      fechaVencimiento: venta.fechaVencimiento,
      diasMora,
      rango: getMoraRangeLabel(diasMora),
      ventaNeta: venta.ventaNeta,
      totalCobrado: venta.totalCobrado,
      saldoPendiente: venta.saldoPorCobrar,
      estado: venta.estado
    };
  }

  function buildProveedorMoraItem(compra) {
    const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
    const diasMora = getDaysOverdue(compra.fechaVencimiento);
    return {
      id: compra.id,
      proveedor: proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado',
      documento: compra.facturaReferencia || 'Sin referencia',
      fechaOrigen: compra.fechaCompra,
      fechaVencimiento: compra.fechaVencimiento,
      diasMora,
      rango: getMoraRangeLabel(diasMora),
      totalCompra: compra.totalCompra,
      totalPagado: compra.totalPagado,
      saldoPendiente: compra.saldoPorPagar,
      estado: compra.estado
    };
  }

  function buildAlertasList(parts) {
    const alertas = [];
    if (parts.clientesMora.length) alertas.push({ tipo: 'danger', titulo: 'Clientes vencidos', detalle: `${parts.clientesMora.length} OC vencidas con saldo por cobrar.` });
    if (parts.proveedoresMora.length) alertas.push({ tipo: 'danger', titulo: 'Proveedores vencidos', detalle: `${parts.proveedoresMora.length} facturas/referencias vencidas con saldo por pagar.` });
    if (parts.ventasProximas.length) alertas.push({ tipo: 'warning', titulo: 'OC próximas a vencer', detalle: `${parts.ventasProximas.length} OC vencen dentro de los próximos 7 días.` });
    if (parts.comprasProximas.length) alertas.push({ tipo: 'warning', titulo: 'Facturas próximas a vencer', detalle: `${parts.comprasProximas.length} facturas/referencias vencen dentro de los próximos 7 días.` });
    if (parts.saldosAltosClientes.length || parts.saldosAltosProveedores.length) alertas.push({ tipo: 'info', titulo: 'Saldos pendientes altos', detalle: 'Se muestran los saldos pendientes más altos para priorizar seguimiento.' });
    if (parts.parciales.length) alertas.push({ tipo: 'info', titulo: 'Pagos parciales sin cancelar', detalle: `${parts.parciales.length} documentos están abonados y siguen con saldo.` });
    if (!alertas.length) alertas.push({ tipo: 'success', titulo: 'Sin alertas críticas', detalle: 'No hay mora ni vencimientos próximos con saldo pendiente.' });
    return alertas;
  }

  function renderRangeSummary(counts) {
    const ranges = [
      ['1 a 15 días', counts.r1],
      ['16 a 30 días', counts.r2],
      ['31 a 60 días', counts.r3],
      ['Más de 60 días', counts.r4]
    ];
    return ranges.map(([label, count]) => `<span class="range-pill"><strong>${count}</strong>${escapeHtml(label)}</span>`).join('');
  }

  function renderClienteMoraCard(item) {
    const searchable = normalizeNameForCompare(`${item.cliente} ${item.sucursal} ${item.documento} ${item.estado} ${item.rango}`);
    return `
      <article class="mora-card" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">${escapeHtml(item.rango)}</span>
            <h3>${escapeHtml(item.cliente)}</h3>
          </div>
          <span class="state-pill is-overdue">${item.diasMora} días</span>
        </div>
        <div class="mora-detail-grid">
          <div><span>Sucursal</span><strong>${escapeHtml(item.sucursal)}</strong></div>
          <div><span>OC/documento</span><strong>${escapeHtml(item.documento)}</strong></div>
          <div><span>Fecha origen</span><strong>${escapeHtml(formatDate(item.fechaOrigen))}</strong></div>
          <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(item.fechaVencimiento))}</strong></div>
          <div><span>Venta neta</span><strong>${escapeHtml(formatMoney(item.ventaNeta))}</strong></div>
          <div><span>Total cobrado</span><strong>${escapeHtml(formatMoney(item.totalCobrado))}</strong></div>
          <div><span>Saldo pendiente</span><strong>${escapeHtml(formatMoney(item.saldoPendiente))}</strong></div>
          <div><span>Estado</span><strong>${escapeHtml(item.estado)}</strong></div>
        </div>
        <div class="record-actions">
          <button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(item.id)}">Ver historial</button>
        </div>
      </article>
    `;
  }

  function renderProveedorMoraCard(item) {
    const searchable = normalizeNameForCompare(`${item.proveedor} ${item.documento} ${item.estado} ${item.rango}`);
    return `
      <article class="mora-card" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">${escapeHtml(item.rango)}</span>
            <h3>${escapeHtml(item.proveedor)}</h3>
          </div>
          <span class="state-pill is-overdue">${item.diasMora} días</span>
        </div>
        <div class="mora-detail-grid">
          <div><span>Factura/referencia</span><strong>${escapeHtml(item.documento)}</strong></div>
          <div><span>Fecha origen</span><strong>${escapeHtml(formatDate(item.fechaOrigen))}</strong></div>
          <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(item.fechaVencimiento))}</strong></div>
          <div><span>Total compra/deuda</span><strong>${escapeHtml(formatMoney(item.totalCompra))}</strong></div>
          <div><span>Total pagado</span><strong>${escapeHtml(formatMoney(item.totalPagado))}</strong></div>
          <div><span>Saldo pendiente</span><strong>${escapeHtml(formatMoney(item.saldoPendiente))}</strong></div>
          <div><span>Estado</span><strong>${escapeHtml(item.estado)}</strong></div>
        </div>
        <div class="record-actions">
          <button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(item.id)}">Ver historial</button>
        </div>
      </article>
    `;
  }

  function renderAlertasPrincipales(summary) {
    const alertCards = summary.alertas.map((alerta) => `
      <article class="alert-card is-${escapeHtml(alerta.tipo)}">
        <strong>${escapeHtml(alerta.titulo)}</strong>
        <p>${escapeHtml(alerta.detalle)}</p>
      </article>
    `).join('');
    const upcomingVentas = summary.ventasProximas.slice(0, 5).map((venta) => `
      <li><strong>${escapeHtml(venta.numeroDocumento || 'Sin número')}</strong><span>${escapeHtml(formatDate(venta.fechaVencimiento))} · ${escapeHtml(formatMoney(venta.saldoPorCobrar))}</span></li>
    `).join('');
    const upcomingCompras = summary.comprasProximas.slice(0, 5).map((compra) => `
      <li><strong>${escapeHtml(compra.facturaReferencia || 'Sin referencia')}</strong><span>${escapeHtml(formatDate(compra.fechaVencimiento))} · ${escapeHtml(formatMoney(compra.saldoPorPagar))}</span></li>
    `).join('');
    const highBalances = [
      ...summary.saldosAltosClientes.map((venta) => ({ label: `OC ${venta.numeroDocumento || 'Sin número'}`, amount: venta.saldoPorCobrar })),
      ...summary.saldosAltosProveedores.map((compra) => ({ label: `Factura ${compra.facturaReferencia || 'Sin referencia'}`, amount: compra.saldoPorPagar }))
    ].sort((a, b) => b.amount - a.amount).slice(0, 5).map((item) => `
      <li><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(formatMoney(item.amount))}</span></li>
    `).join('');
    const partials = summary.parciales.slice(0, 5).map((item) => `
      <li><strong>${escapeHtml(item.tipo)} · ${escapeHtml(item.titulo)}</strong><span>Saldo ${escapeHtml(formatMoney(item.saldo))}</span></li>
    `).join('');

    return `
      <div class="alert-grid">${alertCards}</div>
      <div class="alert-detail-grid">
        ${renderAlertDetailList('OC próximas a vencer', upcomingVentas)}
        ${renderAlertDetailList('Facturas próximas a vencer', upcomingCompras)}
        ${renderAlertDetailList('Saldos pendientes altos', highBalances)}
        ${renderAlertDetailList('Pagos parciales sin cancelar', partials)}
      </div>
    `;
  }

  function renderAlertDetailList(title, itemsMarkup) {
    return `
      <article class="mini-list-card">
        <h3>${escapeHtml(title)}</h3>
        ${itemsMarkup ? `<ul>${itemsMarkup}</ul>` : '<p class="muted-text">Sin registros por ahora.</p>'}
      </article>
    `;
  }

  function renderVentaHistoryCard(venta) {
    const cliente = getCatalogRecordById('clientes', venta.clienteId);
    const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
    const searchable = normalizeNameForCompare(`${venta.numeroDocumento} ${cliente?.nombre || ''} ${sucursal?.nombre || ''} ${venta.estado}`);
    const entries = getVentaHistoryEntries(venta);
    return `
      <article class="history-card" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">OC / Cliente</span>
            <h3>${escapeHtml(venta.numeroDocumento || 'Sin número')}</h3>
          </div>
          <span class="state-pill ${getEstadoClass(venta.estado)}">${escapeHtml(venta.estado)}</span>
        </div>
        <div class="mora-detail-grid compact-grid">
          <div><span>Cliente</span><strong>${escapeHtml(cliente?.nombre || 'Cliente no encontrado')}</strong></div>
          <div><span>Sucursal</span><strong>${escapeHtml(sucursal?.nombre || 'Sucursal no encontrada')}</strong></div>
          <div><span>Saldo actual</span><strong>${escapeHtml(formatMoney(venta.saldoPorCobrar))}</strong></div>
        </div>
        <div class="timeline">${entries.map((entry) => renderTimelineEntry(entry)).join('')}</div>
        <div class="record-actions"><button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(venta.id)}">Ampliar historial</button></div>
      </article>
    `;
  }

  function renderCompraHistoryCard(compra) {
    const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
    const searchable = normalizeNameForCompare(`${compra.facturaReferencia} ${proveedor?.nombre || compra.proveedorNombre || ''} ${compra.estado}`);
    const entries = getCompraHistoryEntries(compra);
    return `
      <article class="history-card" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">Factura / proveedor</span>
            <h3>${escapeHtml(compra.facturaReferencia || 'Sin referencia')}</h3>
          </div>
          <span class="state-pill ${getEstadoClass(compra.estado)}">${escapeHtml(compra.estado)}</span>
        </div>
        <div class="mora-detail-grid compact-grid">
          <div><span>Proveedor</span><strong>${escapeHtml(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado')}</strong></div>
          <div><span>Saldo actual</span><strong>${escapeHtml(formatMoney(compra.saldoPorPagar))}</strong></div>
          <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(compra.fechaVencimiento))}</strong></div>
        </div>
        <div class="timeline">${entries.map((entry) => renderTimelineEntry(entry)).join('')}</div>
        <div class="record-actions"><button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(compra.id)}">Ampliar historial</button></div>
      </article>
    `;
  }

  function renderSelectedHistoryPanel(history) {
    return `
      <section class="panel-card selected-history" tabindex="-1">
        <div class="section-title-row">
          <div>
            <span class="eyebrow mini">Historial seleccionado</span>
            <h2>${escapeHtml(history.title)}</h2>
          </div>
          <button type="button" class="secondary-action compact" data-history-clear>Ver todos</button>
        </div>
        <div class="mora-detail-grid">
          ${history.details.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join('')}
        </div>
        ${history.observacion ? `<p class="record-note">${escapeHtml(history.observacion)}</p>` : ''}
        <div class="timeline selected-timeline">${history.entries.map((entry) => renderTimelineEntry(entry)).join('')}</div>
      </section>
    `;
  }

  function renderTimelineEntry(entry) {
    return `
      <div class="timeline-entry ${entry.statusClass || ''}">
        <span>${escapeHtml(entry.date)}</span>
        <strong>${escapeHtml(entry.title)}</strong>
        <p>${escapeHtml(entry.detail)}</p>
      </div>
    `;
  }

  function getSelectedDocumentHistory() {
    if (!moraState.selectedKind || !moraState.selectedId) return null;
    if (moraState.selectedKind === 'venta') {
      const venta = buildMoraAlertasSummary().ventas.find((record) => record.id === moraState.selectedId);
      if (!venta) return null;
      const cliente = getCatalogRecordById('clientes', venta.clienteId);
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      return {
        title: `OC ${venta.numeroDocumento || 'Sin número'}`,
        observacion: venta.observacion,
        details: [
          { label: 'Cliente', value: cliente?.nombre || 'Cliente no encontrado' },
          { label: 'Sucursal', value: sucursal?.nombre || 'Sucursal no encontrada' },
          { label: 'Estado actual', value: venta.estado },
          { label: 'Venta neta', value: formatMoney(venta.ventaNeta) },
          { label: 'Total cobrado', value: formatMoney(venta.totalCobrado) },
          { label: 'Saldo actual', value: formatMoney(venta.saldoPorCobrar) }
        ],
        entries: getVentaHistoryEntries(venta)
      };
    }
    const compra = buildMoraAlertasSummary().compras.find((record) => record.id === moraState.selectedId);
    if (!compra) return null;
    const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
    return {
      title: `Factura ${compra.facturaReferencia || 'Sin referencia'}`,
      observacion: compra.observacion,
      details: [
        { label: 'Proveedor', value: proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado' },
        { label: 'Estado actual', value: compra.estado },
        { label: 'Total compra/deuda', value: formatMoney(compra.totalCompra) },
        { label: 'Total pagado', value: formatMoney(compra.totalPagado) },
        { label: 'Saldo actual', value: formatMoney(compra.saldoPorPagar) },
        { label: 'Vencimiento', value: formatDate(compra.fechaVencimiento) }
      ],
      entries: getCompraHistoryEntries(compra)
    };
  }

  function getVentaHistoryEntries(venta) {
    const entries = [
      {
        date: formatDateTime(venta.createdAt),
        title: 'OC creada',
        detail: `Venta neta inicial ${formatMoney(venta.ventaNeta)}. Vence el ${formatDate(venta.fechaVencimiento)}.`,
        statusClass: 'is-info'
      }
    ];
    if (venta.updatedAt && venta.updatedAt !== venta.createdAt) {
      entries.push({
        date: formatDateTime(venta.updatedAt),
        title: 'OC editada / recalculada',
        detail: `Estado actual ${venta.estado}. Saldo por cobrar ${formatMoney(venta.saldoPorCobrar)}.`,
        statusClass: 'is-info'
      });
    }
    getCobrosByVentaId(venta.id)
      .sort((a, b) => String(a.fechaCobro).localeCompare(String(b.fechaCobro)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((cobro) => {
        entries.push({
          date: formatDate(cobro.fechaCobro),
          title: cobro.activo ? 'Cobro aplicado' : 'Cobro anulado',
          detail: `${formatMoney(cobro.montoCobrado)} · ${cobro.metodoPagoNombre || 'Sin método'} · ${cobro.cuentaBancoNombre || 'Sin cuenta'}${cobro.observacion ? ` · ${cobro.observacion}` : ''}`,
          statusClass: cobro.activo ? 'is-success' : 'is-danger'
        });
      });
    entries.push({
      date: formatDateTime(nowIso()),
      title: 'Saldo actual',
      detail: `${formatMoney(venta.saldoPorCobrar)} · Estado ${venta.estado}.`,
      statusClass: getEstadoClass(venta.estado)
    });
    return entries;
  }

  function getCompraHistoryEntries(compra) {
    const entries = [
      {
        date: formatDateTime(compra.createdAt),
        title: 'Factura/referencia creada',
        detail: `Total compra/deuda ${formatMoney(compra.totalCompra)}. Vence el ${formatDate(compra.fechaVencimiento)}.`,
        statusClass: 'is-info'
      }
    ];
    if (compra.updatedAt && compra.updatedAt !== compra.createdAt) {
      entries.push({
        date: formatDateTime(compra.updatedAt),
        title: 'Factura editada / recalculada',
        detail: `Estado actual ${compra.estado}. Saldo por pagar ${formatMoney(compra.saldoPorPagar)}.`,
        statusClass: 'is-info'
      });
    }
    getPagosByCompraId(compra.id)
      .sort((a, b) => String(a.fechaPago).localeCompare(String(b.fechaPago)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((pago) => {
        entries.push({
          date: formatDate(pago.fechaPago),
          title: pago.activo ? 'Pago aplicado' : 'Pago anulado',
          detail: `${formatMoney(pago.montoPagado)} · ${pago.metodoPagoNombre || 'Sin método'} · ${pago.cuentaBancoNombre || 'Sin cuenta'}${pago.observacion ? ` · ${pago.observacion}` : ''}`,
          statusClass: pago.activo ? 'is-success' : 'is-danger'
        });
      });
    entries.push({
      date: formatDateTime(nowIso()),
      title: 'Saldo actual',
      detail: `${formatMoney(compra.saldoPorPagar)} · Estado ${compra.estado}.`,
      statusClass: getEstadoClass(compra.estado)
    });
    return entries;
  }

  function getPagosByCompraId(compraProveedorId) {
    return (Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : [])
      .map((record) => normalizePagoProveedorRecord(record))
      .filter((record) => record.compraProveedorId === compraProveedorId);
  }

  function showDocumentHistory(kind, id) {
    moraState.selectedKind = kind;
    moraState.selectedId = id || '';
    setRoute('mora');
  }

  function setupMoraSearch() {
    const search = viewRoot.querySelector('[data-mora-search]');
    if (!search) return;
    search.addEventListener('input', () => {
      const query = normalizeNameForCompare(search.value);
      viewRoot.querySelectorAll('[data-mora-search-card]').forEach((card) => {
        const text = card.getAttribute('data-search-text') || '';
        card.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }

  function renderMoraEmptyState(title, detail) {
    return `
      <div class="empty-state mora-empty">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(detail)}</p>
      </div>
    `;
  }

  function getDaysOverdue(dateInput) {
    const due = dateInputToLocalDate(dateInput);
    const today = dateInputToLocalDate(todayInputValue());
    if (!due || !today || due >= today) return 0;
    return Math.floor((today - due) / 86400000);
  }

  function isWithinNextDays(dateInput, days) {
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return false;
    const today = todayInputValue();
    const limit = addDaysToDate(today, days);
    return safeDate >= today && safeDate <= limit;
  }

  function dateInputToLocalDate(value) {
    const safeDate = toDateInputValue(value);
    if (!safeDate) return null;
    const [year, month, day] = safeDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function getMoraRangeLabel(days) {
    if (days <= 15) return '1 a 15 días';
    if (days <= 30) return '16 a 30 días';
    if (days <= 60) return '31 a 60 días';
    return 'Más de 60 días';
  }

  function countMoraRanges(items) {
    return items.reduce((counts, item) => {
      if (item.diasMora <= 15) counts.r1 += 1;
      else if (item.diasMora <= 30) counts.r2 += 1;
      else if (item.diasMora <= 60) counts.r3 += 1;
      else counts.r4 += 1;
      return counts;
    }, { r1: 0, r2: 0, r3: 0, r4: 0 });
  }

  function renderCatalogos() {
    const activeCatalog = getActiveCatalog();
    const records = getCatalogRecords(activeCatalog.id);
    const activeCount = records.filter((record) => record.activo).length;
    const inactiveCount = records.length - activeCount;
    const editingRecord = catalogState.editingId ? records.find((record) => record.id === catalogState.editingId) : null;
    const canEditCatalogs = canCurrentRole('editCatalogs');

    return `
      <section class="hero catalog-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Catálogos</h1>
          <p class="lead">Administra las listas maestras de KSA PRÁCTIKA. Aquí se ordena la bodega mental: clientes, sucursales, proveedores, gastos, métodos y cuentas.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de catálogos">
          <h3>Resumen</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Catálogos</strong><span>${CATALOGS.length}</span></div>
            <div class="status-item"><strong>Registros</strong><span>${CATALOGS.reduce((sum, catalog) => sum + appData[catalog.id].length, 0)}</span></div>
            <div class="status-item"><strong>Activos aquí</strong><span>${activeCount}</span></div>
            <div class="status-item"><strong>Inactivos aquí</strong><span>${inactiveCount}</span></div>
          </div>
        </aside>
      </section>

      <section class="catalog-shell">
        <div class="catalog-tabs" role="tablist" aria-label="Catálogos disponibles">
          ${CATALOGS.map((catalog) => renderCatalogTab(catalog)).join('')}
        </div>

        ${catalogState.message ? `<div class="form-message ${catalogState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(catalogState.message)}</div>` : ''}
        ${renderRolePermissionNotice('editCatalogs', 'Usuario normal puede consultar Catálogos, pero editar, activar o desactivar queda reservado para Administrador.')}

        <div class="catalog-layout">
          <article class="panel-card catalog-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">${editingRecord ? 'Editando' : 'Nuevo registro'}</span>
                <h2>${editingRecord ? `Editar ${activeCatalog.singular}` : `Agregar ${activeCatalog.singular}`}</h2>
              </div>
              ${editingRecord ? '<button type="button" class="secondary-action compact" data-catalog-cancel>Cancelar</button>' : ''}
            </div>
            <p class="muted-text">${escapeHtml(activeCatalog.description)}</p>
            ${renderCatalogForm(activeCatalog, editingRecord, !canEditCatalogs)}
          </article>

          <article class="panel-card catalog-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Listado</span>
                <h2>${escapeHtml(activeCatalog.label)}</h2>
              </div>
              <div class="count-pill">${records.length} registros</div>
            </div>
            ${renderCatalogList(activeCatalog, records)}
          </article>
        </div>
      </section>
    `;
  }

  function renderCatalogTab(catalog) {
    const isActive = catalog.id === catalogState.activeCatalogId;
    const records = getCatalogRecords(catalog.id);
    const activeCount = records.filter((record) => record.activo).length;
    return `
      <button type="button" class="catalog-tab ${isActive ? 'is-active' : ''}" data-catalog-tab="${escapeHtml(catalog.id)}" role="tab" aria-selected="${isActive ? 'true' : 'false'}">
        <span aria-hidden="true">${escapeHtml(catalog.icon)}</span>
        <strong>${escapeHtml(catalog.label)}</strong>
        <small>${activeCount}/${records.length}</small>
      </button>
    `;
  }

  function renderCatalogForm(catalog, record, disabled = false) {
    const fields = catalog.fields.map((field) => renderCatalogField(field, record, disabled)).join('');
    return `
      <form class="catalog-form" data-catalog-form="${escapeHtml(catalog.id)}" novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        ${fields}
        <div class="form-actions">
          <button type="submit" class="card-action" ${disabled ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Agregar registro'}</button>
          <button type="button" class="secondary-action" data-catalog-clear>Limpiar</button>
        </div>
      </form>
    `;
  }

  function renderCatalogField(field, record, disabled = false) {
    const value = record?.[field.name] ?? '';
    const requiredLabel = field.required ? '<span class="required-dot" aria-label="obligatorio">*</span>' : '';

    if (field.type === 'textarea') {
      return `
        <label class="form-field">
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          <textarea name="${escapeHtml(field.name)}" rows="3" placeholder="${escapeHtml(field.placeholder || '')}" ${disabled ? 'disabled' : ''}>${escapeHtml(value)}</textarea>
        </label>
      `;
    }

    if (field.type === 'select-client') {
      const clientes = getCatalogRecords('clientes');
      return `
        <label class="form-field">
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          <select name="${escapeHtml(field.name)}" ${disabled ? 'disabled' : ''}>
            <option value="">Sin cliente asociado</option>
            ${clientes.map((cliente) => `<option value="${escapeHtml(cliente.id)}" ${cliente.id === value ? 'selected' : ''}>${escapeHtml(cliente.nombre || 'Cliente sin nombre')}${cliente.activo ? '' : ' · inactivo'}</option>`).join('')}
          </select>
        </label>
      `;
    }

    if (field.type === 'select') {
      return `
        <label class="form-field">
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          <select name="${escapeHtml(field.name)}" ${field.required ? 'required' : ''} ${disabled ? 'disabled' : ''}>
            ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
          </select>
        </label>
      `;
    }

    return `
      <label class="form-field">
        <span>${escapeHtml(field.label)} ${requiredLabel}</span>
        <input type="text" name="${escapeHtml(field.name)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder || '')}" ${field.required ? 'required' : ''} autocomplete="off" ${disabled ? 'disabled' : ''} />
      </label>
    `;
  }

  function renderCatalogList(catalog, records) {
    if (!records.length) {
      return `
        <div class="empty-state">
          <strong>No hay registros todavía.</strong>
          <p>Agrega el primer ${escapeHtml(catalog.singular)} para comenzar.</p>
        </div>
      `;
    }

    return `
      <div class="catalog-record-list">
        ${records.map((record) => renderCatalogRecord(catalog, record)).join('')}
      </div>
    `;
  }

  function renderCatalogRecord(catalog, record) {
    const secondary = getRecordSecondaryText(catalog, record);
    const canEdit = canCurrentRole('editCatalogs');
    return `
      <div class="catalog-record ${record.activo ? 'is-active' : 'is-inactive'}">
        <div class="record-main">
          <div class="record-title-row">
            <strong>${escapeHtml(record.nombre || 'Sin nombre')}</strong>
            <span class="state-pill ${record.activo ? 'is-active' : 'is-inactive'}">${record.activo ? 'Activo' : 'Inactivo'}</span>
          </div>
          ${secondary ? `<p>${escapeHtml(secondary)}</p>` : ''}
          ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
          <dl class="record-meta">
            <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
            <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
            <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
          </dl>
        </div>
        <div class="record-actions">
          ${canEdit ? `<button type="button" class="secondary-action compact" data-catalog-edit="${escapeHtml(record.id)}">Editar</button>` : '<span class="muted-text compact-note">Solo lectura</span>'}
          ${canEdit ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-catalog-toggle="${escapeHtml(record.id)}">${record.activo ? 'Desactivar' : 'Activar'}</button>` : ''}
        </div>
      </div>
    `;
  }


  function renderVentas() {
    const ventas = getVentasOrdenadas();
    const clientesActivos = getActiveCatalogRecords('clientes');
    const sucursalesActivas = getActiveCatalogRecords('sucursales');
    const editingRecord = ventasState.editingId ? appData.ventas.find((record) => record.id === ventasState.editingId) : null;
    const totals = getVentasTotals();
    const missingCatalogs = !clientesActivos.length || !sucursalesActivas.length;

    return `
      <section class="hero ventas-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Ventas / OC</h1>
          <p class="lead">Registra órdenes de compra con venta neta real: Monto OC menos NO VA, descuento y descuento NO VA. Aquí empieza la cartera y Cobros actualiza total cobrado, saldo y estado sin necesidad de malabares contables.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de ventas y OC">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>OC activas</strong><span>${totals.activas}</span></div>
            <div class="status-item"><strong>Venta neta</strong><span>${escapeHtml(formatMoney(totals.ventaNeta))}</span></div>
            <div class="status-item"><strong>Saldo cobrar</strong><span>${escapeHtml(formatMoney(totals.saldoPorCobrar))}</span></div>
            <div class="status-item"><strong>Vencidas</strong><span>${totals.vencidas}</span></div>
          </div>
        </aside>
      </section>

      <section class="ventas-shell">
        ${ventasState.message ? `<div class="form-message ${ventasState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(ventasState.message)}</div>` : ''}

        ${missingCatalogs ? renderVentasCatalogWarning(clientesActivos, sucursalesActivas) : ''}

        <section class="metric-grid" aria-label="Resumen operativo de ventas">
          <article class="metric-card"><span>Venta neta activa</span><strong>${escapeHtml(formatMoney(totals.ventaNeta))}</strong></article>
          <article class="metric-card"><span>Total cobrado</span><strong>${escapeHtml(formatMoney(totals.totalCobrado))}</strong></article>
          <article class="metric-card"><span>Saldo por cobrar</span><strong>${escapeHtml(formatMoney(totals.saldoPorCobrar))}</strong></article>
          <article class="metric-card"><span>Pendientes</span><strong>${totals.pendientes}</strong></article>
          <article class="metric-card"><span>Vencidas</span><strong>${totals.vencidas}</strong></article>
          <article class="metric-card"><span>Anuladas</span><strong>${totals.anuladas}</strong></article>
        </section>

        <div class="ventas-layout">
          <article class="panel-card venta-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">${editingRecord ? 'Editando OC' : 'Nueva OC'}</span>
                <h2>${editingRecord ? 'Editar venta / OC' : 'Crear venta / OC'}</h2>
              </div>
              ${editingRecord ? '<button type="button" class="secondary-action compact" data-venta-cancel>Cancelar</button>' : ''}
            </div>
            <p class="muted-text">La venta real para reportes será la venta neta, no el monto bruto de la OC.</p>
            ${renderVentaForm(editingRecord, clientesActivos, sucursalesActivas, missingCatalogs)}
          </article>

          <article class="panel-card venta-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Listado</span>
                <h2>OC registradas</h2>
              </div>
              <div class="count-pill">${ventas.length} registros</div>
            </div>
            ${renderVentasList(ventas)}
          </article>
        </div>
      </section>
    `;
  }

  function renderVentasCatalogWarning(clientesActivos, sucursalesActivas) {
    const missing = [];
    if (!clientesActivos.length) missing.push('clientes activos');
    if (!sucursalesActivas.length) missing.push('sucursales activas');

    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(' y '))}.</strong>
        <p>Para guardar una OC, primero crea o activa esos registros en Catálogos. La app no inventa clientes; bastante tenemos con los duendes de Excel.</p>
        <button type="button" class="secondary-action compact" data-go="catalogos">Ir a Catálogos</button>
      </article>
    `;
  }

  function renderVentaForm(record, clientesActivos, sucursalesActivas, missingCatalogs) {
    const fechaOc = record?.fechaOc || todayInputValue();
    const diasCredito = record?.diasCredito ?? '';
    const fechaVencimiento = record?.fechaVencimiento || addDaysToDate(fechaOc, Number(diasCredito) || 0);
    const calculations = getVentaCalculations(record || {});

    return `
      <form class="venta-form" data-venta-form data-current-cobrado="${escapeHtml(record?.totalCobrado || 0)}" novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <div class="form-grid">
          <label class="form-field">
            <span>Número OC / documento <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="text" name="numeroDocumento" value="${escapeHtml(record?.numeroDocumento || '')}" placeholder="Ej. OC-001" required autocomplete="off" />
          </label>
          <label class="form-field">
            <span>Cliente <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="clienteId" required ${missingCatalogs ? 'disabled' : ''}>
              <option value="">Seleccionar cliente</option>
              ${clientesActivos.map((cliente) => `<option value="${escapeHtml(cliente.id)}" ${cliente.id === record?.clienteId ? 'selected' : ''}>${escapeHtml(cliente.nombre || 'Cliente sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Sucursal <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="sucursalId" required ${missingCatalogs ? 'disabled' : ''}>
              <option value="">Seleccionar sucursal</option>
              ${sucursalesActivas.map((sucursal) => `<option value="${escapeHtml(sucursal.id)}" ${sucursal.id === record?.sucursalId ? 'selected' : ''}>${escapeHtml(sucursal.nombre || 'Sucursal sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha OC <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaOc" value="${escapeHtml(fechaOc)}" required data-venta-date />
          </label>
          <label class="form-field">
            <span>Días de crédito</span>
            <input type="number" name="diasCredito" value="${escapeHtml(diasCredito)}" min="0" step="1" inputmode="numeric" data-venta-days />
          </label>
          <label class="form-field">
            <span>Fecha vencimiento</span>
            <input type="date" name="fechaVencimiento" value="${escapeHtml(fechaVencimiento)}" data-venta-due />
          </label>
          <label class="form-field">
            <span>Monto OC C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="montoOc" value="${escapeHtml(formatNumberInput(record?.montoOc))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-venta-calc />
          </label>
          <label class="form-field">
            <span>NO VA C$</span>
            <input type="number" name="noVa" value="${escapeHtml(formatNumberInput(record?.noVa))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" data-venta-calc />
          </label>
          <label class="form-field">
            <span>Descuento C$</span>
            <input type="number" name="descuento" value="${escapeHtml(formatNumberInput(record?.descuento))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" data-venta-calc />
          </label>
          <label class="form-field">
            <span>Descuento NO VA C$</span>
            <input type="number" name="descuentoNoVa" value="${escapeHtml(formatNumberInput(record?.descuentoNoVa))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" data-venta-calc />
          </label>
        </div>

        <div class="formula-card" aria-live="polite">
          <strong>Venta neta = Monto OC - NO VA - Descuento - Descuento NO VA</strong>
          <div class="formula-grid">
            <span>Venta neta</span><b data-venta-preview-neto>${escapeHtml(formatMoney(record ? calculations.ventaNeta : 0))}</b>
            <span>Total cobrado</span><b data-venta-preview-cobrado>${escapeHtml(formatMoney(record?.totalCobrado || 0))}</b>
            <span>Saldo por cobrar</span><b data-venta-preview-saldo>${escapeHtml(formatMoney(record ? calculations.saldoPorCobrar : 0))}</b>
          </div>
        </div>

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas de la OC">${escapeHtml(record?.observacion || '')}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${missingCatalogs ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar OC'}</button>
          <button type="button" class="secondary-action" data-venta-clear>Limpiar</button>
        </div>
      </form>
    `;
  }

  function renderVentasList(ventas) {
    if (!ventas.length) {
      return `
        <div class="empty-state">
          <strong>No hay OC registradas todavía.</strong>
          <p>Guarda la primera OC para comenzar a formar cartera.</p>
        </div>
      `;
    }

    return `
      <div class="ventas-list">
        ${ventas.map((venta) => renderVentaCard(venta)).join('')}
      </div>
    `;
  }

  function renderVentaCard(venta) {
    const record = normalizeVentaRecord(venta);
    const cliente = getCatalogRecordById('clientes', record.clienteId);
    const sucursal = getCatalogRecordById('sucursales', record.sucursalId);
    const estadoClass = getEstadoClass(record.estado);

    return `
      <div class="venta-card ${record.activo ? 'is-active' : 'is-inactive'}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">OC / Documento</span>
            <h3>${escapeHtml(record.numeroDocumento || 'Sin número')}</h3>
          </div>
          <span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span>
        </div>
        <div class="venta-detail-grid">
          <div><span>Cliente</span><strong>${escapeHtml(cliente?.nombre || 'Cliente no encontrado')}</strong></div>
          <div><span>Sucursal</span><strong>${escapeHtml(sucursal?.nombre || 'Sucursal no encontrada')}</strong></div>
          <div><span>Fecha OC</span><strong>${escapeHtml(formatDate(record.fechaOc))}</strong></div>
          <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(record.fechaVencimiento))}</strong></div>
          <div><span>Venta neta</span><strong>${escapeHtml(formatMoney(record.ventaNeta))}</strong></div>
          <div><span>Total cobrado</span><strong>${escapeHtml(formatMoney(record.totalCobrado))}</strong></div>
          <div><span>Saldo por cobrar</span><strong>${escapeHtml(formatMoney(record.saldoPorCobrar))}</strong></div>
          <div><span>Días crédito</span><strong>${Number(record.diasCredito) || 0}</strong></div>
          <div><span>Cobros ligados</span><strong>${getCobrosByVentaId(record.id).length}</strong></div>
        </div>
        ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
        <dl class="record-meta">
          <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
          <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
          <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
        </dl>
        <div class="record-actions">
          <button type="button" class="secondary-action compact" data-venta-edit="${escapeHtml(record.id)}">Editar</button>
          <button type="button" class="secondary-action compact" data-cobros-for="${escapeHtml(record.id)}">Ver cobros</button>
          <button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(record.id)}">Historial</button>
          ${canCurrentRole('annulMovements') ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-venta-toggle="${escapeHtml(record.id)}">${record.activo ? 'Anular' : 'Reactivar'}</button>` : ''}
        </div>
      </div>
    `;
  }

  function getVentasOrdenadas() {
    return [...(Array.isArray(appData.ventas) ? appData.ventas : [])]
      .map((record) => normalizeVentaRecord(record))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getVentasTotals() {
    const ventas = Array.isArray(appData.ventas) ? appData.ventas.map((record) => normalizeVentaRecord(record)) : [];
    return ventas.reduce((totals, venta) => {
      if (!venta.activo) {
        totals.anuladas += 1;
        return totals;
      }
      totals.activas += 1;
      totals.ventaNeta = roundMoney(totals.ventaNeta + venta.ventaNeta);
      totals.totalCobrado = roundMoney(totals.totalCobrado + venta.totalCobrado);
      totals.saldoPorCobrar = roundMoney(totals.saldoPorCobrar + venta.saldoPorCobrar);
      if (venta.estado === 'Pendiente') totals.pendientes += 1;
      if (venta.estado === 'Vencido') totals.vencidas += 1;
      if (venta.estado === 'Pagado') totals.pagadas += 1;
      return totals;
    }, { activas: 0, anuladas: 0, pendientes: 0, vencidas: 0, pagadas: 0, ventaNeta: 0, totalCobrado: 0, saldoPorCobrar: 0 });
  }

  function buildVentaFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const fechaOc = toDateInputValue(formData.get('fechaOc'));
    const diasCredito = parsePositiveInteger(formData.get('diasCredito'));
    const fechaVencimiento = toDateInputValue(formData.get('fechaVencimiento')) || addDaysToDate(fechaOc, Number.isNaN(diasCredito) ? 0 : diasCredito);
    const base = {
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('venta'),
      numeroDocumento: cleanText(formData.get('numeroDocumento')),
      clienteId: cleanText(formData.get('clienteId')),
      sucursalId: cleanText(formData.get('sucursalId')),
      fechaOc,
      diasCredito,
      fechaVencimiento,
      montoOc: parseMoney(formData.get('montoOc')),
      noVa: parseMoney(formData.get('noVa')),
      descuento: parseMoney(formData.get('descuento')),
      descuentoNoVa: parseMoney(formData.get('descuentoNoVa')),
      totalCobrado: existingRecord?.totalCobrado || 0,
      observacion: cleanText(formData.get('observacion')),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    };
    const calculations = getVentaCalculations(base);
    return {
      ...base,
      diasCredito: Number.isNaN(base.diasCredito) ? 0 : base.diasCredito,
      montoOc: Number.isNaN(base.montoOc) ? 0 : base.montoOc,
      noVa: Number.isNaN(base.noVa) ? 0 : base.noVa,
      descuento: Number.isNaN(base.descuento) ? 0 : base.descuento,
      descuentoNoVa: Number.isNaN(base.descuentoNoVa) ? 0 : base.descuentoNoVa,
      ventaNeta: calculations.ventaNeta,
      totalCobrado: calculations.totalCobrado,
      saldoPorCobrar: calculations.saldoPorCobrar,
      estado: determineVentaEstado(base)
    };
  }

  function validateVentaRecord(record) {
    if (!record.numeroDocumento) return 'El número OC / documento es obligatorio.';
    if (!record.clienteId || !getActiveCatalogRecords('clientes').some((cliente) => cliente.id === record.clienteId)) return 'Selecciona un cliente activo desde Catálogos.';
    if (!record.sucursalId || !getActiveCatalogRecords('sucursales').some((sucursal) => sucursal.id === record.sucursalId)) return 'Selecciona una sucursal activa desde Catálogos.';
    if (!record.fechaOc) return 'La fecha OC es obligatoria.';
    if (Number.isNaN(parseMoney(record.montoOc)) || record.montoOc <= 0) return 'Monto OC debe ser un número mayor que cero.';
    if (Number.isNaN(parsePositiveInteger(record.diasCredito))) return 'Días de crédito debe ser cero o un número entero positivo.';

    const numericFields = [
      ['NO VA', record.noVa],
      ['Descuento', record.descuento],
      ['Descuento NO VA', record.descuentoNoVa]
    ];

    const invalid = numericFields.find(([, value]) => Number.isNaN(parseMoney(value)) || Number(value) < 0);
    if (invalid) return `${invalid[0]} debe ser cero o un número positivo.`;

    if (record.ventaNeta < 0) return 'La venta neta no puede ser negativa. Revisa NO VA y descuentos.';
    if ((record.noVa + record.descuento + record.descuentoNoVa) > record.montoOc) return 'NO VA y descuentos no pueden superar el Monto OC.';
    if (record.totalCobrado > record.ventaNeta) return 'La venta neta no puede quedar menor que el total ya cobrado.';
    return '';
  }

  function saveVentaRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.ventas) ? appData.ventas : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;
    const newRecord = buildVentaFromForm(form, existingRecord);
    const validationError = validateVentaRecord(newRecord);

    if (validationError) {
      ventasState.message = validationError;
      ventasState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaOc, existingRecord ? 'Actualizar esta OC' : 'Crear esta OC')) return;

    if (existingRecord) {
      appData.ventas = records.map((record) => record.id === existingId ? newRecord : record);
      ventasState.message = `OC ${newRecord.numeroDocumento} actualizada.`;
    } else {
      appData.ventas = [newRecord, ...records];
      ventasState.message = `OC ${newRecord.numeroDocumento} guardada.`;
    }

    ventasState.editingId = null;
    ventasState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function editVentaRecord(recordId) {
    const record = appData.ventas.find((item) => item.id === recordId);
    if (!record) return;
    ventasState.editingId = recordId;
    ventasState.message = null;
    renderRoute();
  }

  function toggleVentaRecord(recordId) {
    if (!canCurrentRole('annulMovements')) {
      ventasState.message = 'Solo Administrador puede anular o reactivar OC.';
      ventasState.messageType = 'error';
      renderRoute();
      return;
    }
    const records = Array.isArray(appData.ventas) ? appData.ventas : [];
    const record = records.find((item) => item.id === recordId);
    if (!record) return;
    const shouldActivate = !record.activo;
    if (!warnIfClosedPeriod(record.fechaOc, shouldActivate ? 'Reactivar esta OC' : 'Anular esta OC')) return;

    appData.ventas = records.map((item) => {
      if (item.id !== recordId) return item;
      const updated = normalizeVentaRecord({ ...item, activo: shouldActivate, updatedAt: nowIso() });
      return updated;
    });

    ventasState.editingId = null;
    ventasState.message = `OC ${record.numeroDocumento || ''} quedó ${shouldActivate ? 'reactivada' : 'anulada'}.`;
    ventasState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearVentaForm() {
    ventasState.editingId = null;
    ventasState.message = null;
    renderRoute();
  }

  function setupVentaLiveCalculations(form) {
    updateVentaPreviewFromForm(form, false);

    form.querySelectorAll('[data-venta-calc]').forEach((input) => {
      input.addEventListener('input', () => updateVentaPreviewFromForm(form, false));
    });

    form.querySelector('[data-venta-date]')?.addEventListener('change', () => updateVentaPreviewFromForm(form, true));
    form.querySelector('[data-venta-days]')?.addEventListener('input', () => updateVentaPreviewFromForm(form, true));
  }

  function updateVentaPreviewFromForm(form, recalculateDue) {
    if (recalculateDue) {
      const dateInput = form.querySelector('[data-venta-date]');
      const daysInput = form.querySelector('[data-venta-days]');
      const dueInput = form.querySelector('[data-venta-due]');
      const due = addDaysToDate(dateInput?.value, Number.parseInt(daysInput?.value || '0', 10) || 0);
      if (dueInput && due) dueInput.value = due;
    }

    const formData = new FormData(form);
    const calculations = getVentaCalculations({
      montoOc: formData.get('montoOc'),
      noVa: formData.get('noVa'),
      descuento: formData.get('descuento'),
      descuentoNoVa: formData.get('descuentoNoVa'),
      totalCobrado: form.dataset.currentCobrado || 0
    });

    const netoNode = form.querySelector('[data-venta-preview-neto]');
    const cobradoNode = form.querySelector('[data-venta-preview-cobrado]');
    const saldoNode = form.querySelector('[data-venta-preview-saldo]');
    if (netoNode) netoNode.textContent = formatMoney(calculations.ventaNeta);
    if (cobradoNode) cobradoNode.textContent = formatMoney(calculations.totalCobrado);
    if (saldoNode) saldoNode.textContent = formatMoney(calculations.saldoPorCobrar);
  }

  function renderCobros() {
    const ventasDisponibles = getVentasConSaldoCobro();
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveCatalogRecords('cuentasBancos');
    const cobros = getCobrosOrdenados();
    const visibleCobros = cobrosState.focusVentaId ? cobros.filter((cobro) => cobro.ventaId === cobrosState.focusVentaId) : cobros;
    const focusVenta = cobrosState.focusVentaId ? normalizeVentaRecord(appData.ventas.find((venta) => venta.id === cobrosState.focusVentaId)) : null;
    const totals = getCobrosTotals();
    const selectedVenta = ventasDisponibles.find((venta) => venta.id === cobrosState.selectedVentaId) || ventasDisponibles[0] || null;
    if (selectedVenta && cobrosState.selectedVentaId !== selectedVenta.id) cobrosState.selectedVentaId = selectedVenta.id;
    const missingCatalogs = !metodosActivos.length || !cuentasActivas.length;
    const cannotCreate = !selectedVenta || missingCatalogs;

    return `
      <section class="hero cobros-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Cobros de clientes</h1>
          <p class="lead">Registra pagos completos o abonos parciales ligados a una OC específica. La fecha real del cobro puede ser distinta a la fecha de la OC; la trazabilidad queda amarrada y sin nudos marineros.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de cobros">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>OC cobrables</strong><span>${ventasDisponibles.length}</span></div>
            <div class="status-item"><strong>Cobros activos</strong><span>${totals.activos}</span></div>
            <div class="status-item"><strong>Total cobrado</strong><span>${escapeHtml(formatMoney(totals.totalCobrado))}</span></div>
            <div class="status-item"><strong>Anulados</strong><span>${totals.anulados}</span></div>
          </div>
        </aside>
      </section>

      <section class="cobros-shell">
        ${cobrosState.message ? `<div class="form-message ${cobrosState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(cobrosState.message)}</div>` : ''}

        ${renderCobrosWarning(ventasDisponibles, metodosActivos, cuentasActivas)}

        <section class="metric-grid" aria-label="Resumen operativo de cobros">
          <article class="metric-card"><span>Total cobrado activo</span><strong>${escapeHtml(formatMoney(totals.totalCobrado))}</strong></article>
          <article class="metric-card"><span>Cobros registrados</span><strong>${totals.activos}</strong></article>
          <article class="metric-card"><span>Cobros anulados</span><strong>${totals.anulados}</strong></article>
          <article class="metric-card"><span>OC pagadas</span><strong>${totals.ocPagadas}</strong></article>
          <article class="metric-card"><span>OC abonadas</span><strong>${totals.ocAbonadas}</strong></article>
          <article class="metric-card"><span>Saldo cobrable</span><strong>${escapeHtml(formatMoney(totals.saldoCobrable))}</strong></article>
        </section>

        <div class="cobros-layout">
          <article class="panel-card cobro-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Nuevo cobro</span>
                <h2>Registrar cobro</h2>
              </div>
            </div>
            <p class="muted-text">Solo aparecen OC activas con saldo por cobrar mayor que cero.</p>
            ${renderCobroForm(selectedVenta, ventasDisponibles, metodosActivos, cuentasActivas, cannotCreate)}
          </article>

          <article class="panel-card cobro-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Historial</span>
                <h2>Cobros registrados</h2>
              </div>
              <div class="count-pill">${visibleCobros.length} registros</div>
            </div>
            ${focusVenta ? `<div class="filter-chip"><span>Filtrando OC ${escapeHtml(focusVenta.numeroDocumento || 'Sin número')}</span><button type="button" class="secondary-action compact" data-cobro-clear-focus>Ver todos</button></div>` : ''}
            <label class="form-field search-field">
              <span>Buscar por cliente u OC</span>
              <input type="search" placeholder="Ej. Tiendas Azul u OC-001" data-cobro-search autocomplete="off" />
            </label>
            ${renderCobrosList(visibleCobros)}
          </article>
        </div>
      </section>
    `;
  }

  function renderCobrosWarning(ventasDisponibles, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!ventasDisponibles.length) missing.push('OC con saldo por cobrar');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!cuentasActivas.length) missing.push('cuentas/bancos activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un cobro necesitas una OC activa con saldo y catálogos activos de método y cuenta/banco.</p>
        <div class="placeholder-tools">
          <button type="button" class="secondary-action compact" data-go="ventas">Ir a Ventas / OC</button>
          <button type="button" class="secondary-action compact" data-go="catalogos">Ir a Catálogos</button>
        </div>
      </article>
    `;
  }

  function renderCobroForm(selectedVenta, ventasDisponibles, metodosActivos, cuentasActivas, cannotCreate) {
    const cliente = selectedVenta ? getCatalogRecordById('clientes', selectedVenta.clienteId) : null;
    const sucursal = selectedVenta ? getCatalogRecordById('sucursales', selectedVenta.sucursalId) : null;
    const saldo = selectedVenta ? selectedVenta.saldoPorCobrar : 0;

    return `
      <form class="cobro-form" data-cobro-form novalidate>
        <div class="form-grid">
          <label class="form-field full-span">
            <span>OC / documento <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="ventaId" required data-cobro-venta ${!ventasDisponibles.length ? 'disabled' : ''}>
              ${ventasDisponibles.length ? '' : '<option value="">No hay OC con saldo</option>'}
              ${ventasDisponibles.map((venta) => {
                const ventaCliente = getCatalogRecordById('clientes', venta.clienteId);
                return `<option value="${escapeHtml(venta.id)}" ${venta.id === selectedVenta?.id ? 'selected' : ''}>${escapeHtml(venta.numeroDocumento || 'Sin número')} · ${escapeHtml(ventaCliente?.nombre || 'Cliente')} · saldo ${escapeHtml(formatMoney(venta.saldoPorCobrar))}</option>`;
              }).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha real de cobro <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaCobro" value="${escapeHtml(todayInputValue())}" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Monto cobrado C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="montoCobrado" min="0.01" max="${escapeHtml(saldo)}" step="0.01" inputmode="decimal" placeholder="0.00" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoId" required ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}">${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Cuenta / banco <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="cuentaBancoId" required ${!cuentasActivas.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar cuenta/banco</option>
              ${cuentasActivas.map((cuenta) => `<option value="${escapeHtml(cuenta.id)}">${escapeHtml(cuenta.nombre || 'Cuenta sin nombre')}</option>`).join('')}
            </select>
          </label>
        </div>

        ${selectedVenta ? renderSelectedVentaCobroSummary(selectedVenta, cliente, sucursal) : ''}

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del cobro" ${cannotCreate ? 'disabled' : ''}></textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${cannotCreate ? 'disabled' : ''}>Guardar cobro</button>
          ${selectedVenta ? `<button type="button" class="secondary-action" data-cobro-fill-full="${escapeHtml(selectedVenta.id)}" ${cannotCreate ? 'disabled' : ''}>Cobrar saldo completo</button>` : ''}
        </div>
      </form>
    `;
  }

  function renderSelectedVentaCobroSummary(venta, cliente, sucursal) {
    return `
      <div class="formula-card cobro-summary" aria-live="polite">
        <strong>OC seleccionada</strong>
        <div class="formula-grid">
          <span>Cliente</span><b>${escapeHtml(cliente?.nombre || 'Cliente no encontrado')}</b>
          <span>Sucursal</span><b>${escapeHtml(sucursal?.nombre || 'Sucursal no encontrada')}</b>
          <span>Fecha OC</span><b>${escapeHtml(formatDate(venta.fechaOc))}</b>
          <span>Vencimiento</span><b>${escapeHtml(formatDate(venta.fechaVencimiento))}</b>
          <span>Venta neta</span><b>${escapeHtml(formatMoney(venta.ventaNeta))}</b>
          <span>Total cobrado actual</span><b>${escapeHtml(formatMoney(venta.totalCobrado))}</b>
          <span>Saldo por cobrar actual</span><b>${escapeHtml(formatMoney(venta.saldoPorCobrar))}</b>
        </div>
      </div>
    `;
  }

  function renderCobrosList(cobros) {
    if (!cobros.length) {
      return `
        <div class="empty-state">
          <strong>No hay cobros registrados todavía.</strong>
          <p>Registra el primer abono o pago completo para empezar a cerrar cartera.</p>
        </div>
      `;
    }

    return `
      <div class="cobros-list">
        ${cobros.map((cobro) => renderCobroCard(cobro)).join('')}
      </div>
    `;
  }

  function renderCobroCard(cobro) {
    const record = normalizeCobroRecord(cobro);
    const estadoClass = record.activo ? 'is-active' : 'is-inactive';
    const searchable = normalizeNameForCompare(`${record.clienteNombre} ${record.sucursalNombre} ${record.numeroDocumento} ${record.metodoPagoNombre} ${record.cuentaBancoNombre}`);
    return `
      <div class="cobro-card ${record.activo ? 'is-active' : 'is-inactive'}" data-cobro-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">Cobro / ${escapeHtml(formatDate(record.fechaCobro))}</span>
            <h3>${escapeHtml(record.numeroDocumento || 'Sin OC')}</h3>
          </div>
          <span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span>
        </div>
        <div class="cobro-detail-grid">
          <div><span>Cliente</span><strong>${escapeHtml(record.clienteNombre || 'Cliente no encontrado')}</strong></div>
          <div><span>Sucursal</span><strong>${escapeHtml(record.sucursalNombre || 'Sucursal no encontrada')}</strong></div>
          <div><span>Monto cobrado</span><strong>${escapeHtml(formatMoney(record.montoCobrado))}</strong></div>
          <div><span>Método</span><strong>${escapeHtml(record.metodoPagoNombre || '—')}</strong></div>
          <div><span>Cuenta / banco</span><strong>${escapeHtml(record.cuentaBancoNombre || '—')}</strong></div>
          <div><span>Fecha real</span><strong>${escapeHtml(formatDate(record.fechaCobro))}</strong></div>
        </div>
        ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
        <dl class="record-meta">
          <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
          <dt>OC ID</dt><dd>${escapeHtml(record.ventaId)}</dd>
          <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
          <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
        </dl>
        <div class="record-actions">
          <button type="button" class="secondary-action compact" data-go="ventas">Ir a Ventas</button>
          ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-cobro-annul="${escapeHtml(record.id)}">Anular cobro</button>` : ''}
        </div>
      </div>
    `;
  }

  function getCobrosOrdenados() {
    return [...(Array.isArray(appData.cobros) ? appData.cobros : [])]
      .map((record) => normalizeCobroRecord(record))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getCobrosByVentaId(ventaId) {
    return (Array.isArray(appData.cobros) ? appData.cobros : [])
      .map((record) => normalizeCobroRecord(record))
      .filter((record) => record.ventaId === ventaId);
  }

  function getVentasConSaldoCobro() {
    return (Array.isArray(appData.ventas) ? appData.ventas : [])
      .map((record) => normalizeVentaRecord(record))
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0)
      .sort((a, b) => String(a.fechaVencimiento || '').localeCompare(String(b.fechaVencimiento || '')) || String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getCobrosTotals() {
    const cobros = Array.isArray(appData.cobros) ? appData.cobros.map((record) => normalizeCobroRecord(record)) : [];
    const ventas = Array.isArray(appData.ventas) ? appData.ventas.map((record) => normalizeVentaRecord(record)) : [];
    const totals = cobros.reduce((summary, cobro) => {
      if (!cobro.activo) {
        summary.anulados += 1;
        return summary;
      }
      summary.activos += 1;
      summary.totalCobrado = roundMoney(summary.totalCobrado + cobro.montoCobrado);
      return summary;
    }, { activos: 0, anulados: 0, totalCobrado: 0, ocPagadas: 0, ocAbonadas: 0, saldoCobrable: 0 });

    ventas.forEach((venta) => {
      if (!venta.activo) return;
      if (venta.estado === 'Pagado') totals.ocPagadas += 1;
      if (venta.estado === 'Abonado') totals.ocAbonadas += 1;
      if (venta.saldoPorCobrar > 0) totals.saldoCobrable = roundMoney(totals.saldoCobrable + venta.saldoPorCobrar);
    });

    return totals;
  }

  function buildCobroFromForm(form) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const ventaId = cleanText(formData.get('ventaId'));
    const venta = appData.ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const cliente = venta ? getCatalogRecordById('clientes', venta.clienteId) : null;
    const sucursal = venta ? getCatalogRecordById('sucursales', venta.sucursalId) : null;
    const metodo = getCatalogRecordById('metodosPago', cleanText(formData.get('metodoPagoId')));
    const cuenta = getCatalogRecordById('cuentasBancos', cleanText(formData.get('cuentaBancoId')));

    return normalizeCobroRecord({
      id: generateId('cobro'),
      ventaId,
      fechaCobro: toDateInputValue(formData.get('fechaCobro')),
      clienteId: venta?.clienteId || '',
      clienteNombre: cliente?.nombre || '',
      sucursalId: venta?.sucursalId || '',
      sucursalNombre: sucursal?.nombre || '',
      numeroDocumento: venta?.numeroDocumento || '',
      montoCobrado: parseMoney(formData.get('montoCobrado')),
      metodoPagoId: metodo?.id || '',
      metodoPagoNombre: metodo?.nombre || '',
      cuentaBancoId: cuenta?.id || '',
      cuentaBancoNombre: cuenta?.nombre || '',
      observacion: cleanText(formData.get('observacion')),
      activo: true,
      estado: 'Registrado',
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }

  function validateCobroRecord(record) {
    const venta = (Array.isArray(appData.ventas) ? appData.ventas : []).map((item) => normalizeVentaRecord(item)).find((item) => item.id === record.ventaId);
    if (!venta || !venta.activo) return 'Selecciona una OC activa con saldo por cobrar.';
    if (venta.saldoPorCobrar <= 0) return 'La OC seleccionada no tiene saldo por cobrar.';
    if (!record.fechaCobro) return 'La fecha real de cobro es obligatoria.';
    if (Number.isNaN(parseMoney(record.montoCobrado)) || record.montoCobrado <= 0) return 'El monto cobrado debe ser mayor que cero.';
    if (record.montoCobrado > venta.saldoPorCobrar) return `El cobro no puede superar el saldo pendiente de ${formatMoney(venta.saldoPorCobrar)}.`;
    if (!record.metodoPagoId || !getActiveCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId)) return 'Selecciona un método de pago activo.';
    if (!record.cuentaBancoId || !getActiveCatalogRecords('cuentasBancos').some((item) => item.id === record.cuentaBancoId)) return 'Selecciona una cuenta/banco activo.';
    return '';
  }

  function saveCobroRecord(form) {
    const newRecord = buildCobroFromForm(form);
    const validationError = validateCobroRecord(newRecord);

    if (validationError) {
      cobrosState.message = validationError;
      cobrosState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaCobro, 'Registrar este cobro')) return;

    appData.cobros = [newRecord, ...(Array.isArray(appData.cobros) ? appData.cobros : [])];
    recalculateVentaById(newRecord.ventaId);
    const venta = appData.ventas.find((record) => record.id === newRecord.ventaId);
    cobrosState.selectedVentaId = venta?.saldoPorCobrar > 0 ? newRecord.ventaId : '';
    cobrosState.focusVentaId = newRecord.ventaId;
    cobrosState.message = `Cobro aplicado a OC ${newRecord.numeroDocumento}: ${formatMoney(newRecord.montoCobrado)}.`;
    cobrosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function annulCobroRecord(cobroId) {
    if (!canCurrentRole('annulMovements')) {
      cobrosState.message = 'Solo Administrador puede anular cobros.';
      cobrosState.messageType = 'error';
      renderRoute();
      return;
    }
    const cobros = Array.isArray(appData.cobros) ? appData.cobros : [];
    const cobro = cobros.find((record) => record.id === cobroId);
    if (!cobro || cobro.activo === false) return;
    if (!warnIfClosedPeriod(cobro.fechaCobro, 'Anular este cobro')) return;

    appData.cobros = cobros.map((record) => record.id === cobroId
      ? normalizeCobroRecord({ ...record, activo: false, estado: 'Anulado', updatedAt: nowIso() })
      : record);
    recalculateVentaById(cobro.ventaId);
    cobrosState.selectedVentaId = cobro.ventaId;
    cobrosState.focusVentaId = cobro.ventaId;
    cobrosState.message = `Cobro de ${formatMoney(cobro.montoCobrado)} anulado y OC recalculada.`;
    cobrosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function recalculateVentaById(ventaId) {
    if (!Array.isArray(appData.ventas)) appData.ventas = [];
    appData.ventas = appData.ventas.map((record) => {
      if (record.id !== ventaId) return normalizeVentaRecord(record);
      const totalCobrado = calculateTotalCobradoForVenta(record.id, appData.cobros);
      return normalizeVentaRecord({ ...record, totalCobrado, updatedAt: nowIso() });
    });
  }

  function selectCobroVenta(ventaId) {
    cobrosState.selectedVentaId = cleanText(ventaId);
    cobrosState.focusVentaId = cleanText(ventaId);
    cobrosState.message = null;
    renderRoute();
  }

  function fillCobroFullAmount(form, ventaId) {
    const venta = appData.ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const amountInput = form.querySelector('input[name="montoCobrado"]');
    if (venta && amountInput) amountInput.value = String(venta.saldoPorCobrar);
  }

  function setupCobrosSearch() {
    const search = viewRoot.querySelector('[data-cobro-search]');
    if (!search) return;
    search.addEventListener('input', () => {
      const query = normalizeNameForCompare(search.value);
      viewRoot.querySelectorAll('[data-cobro-card]').forEach((card) => {
        const text = card.getAttribute('data-search-text') || '';
        card.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }


  function renderProveedoresCompras() {
    const compras = getComprasProveedoresOrdenadas();
    const proveedoresActivos = getActiveCatalogRecords('proveedores');
    const editingRecord = proveedoresState.editingId ? appData.comprasProveedores.find((record) => record.id === proveedoresState.editingId) : null;
    const totals = getComprasProveedoresTotals();
    const missingProviders = !proveedoresActivos.length;

    return `
      <section class="hero proveedores-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Proveedores / Compras</h1>
          <p class="lead">Registra deudas, facturas o referencias de proveedor con fecha de compra, vencimiento, saldo por pagar y estado automático básico. Es cartera por pagar sin circo contable: orden, fecha, monto y listo.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de proveedores y compras">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Compras activas</strong><span>${totals.activas}</span></div>
            <div class="status-item"><strong>Saldo pagar</strong><span>${escapeHtml(formatMoney(totals.saldoPorPagar))}</span></div>
            <div class="status-item"><strong>Vencidas</strong><span>${totals.vencidas}</span></div>
            <div class="status-item"><strong>Anuladas</strong><span>${totals.anuladas}</span></div>
          </div>
        </aside>
      </section>

      <section class="proveedores-shell">
        ${proveedoresState.message ? `<div class="form-message ${proveedoresState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(proveedoresState.message)}</div>` : ''}

        ${missingProviders ? renderProveedoresCatalogWarning() : ''}

        <section class="metric-grid" aria-label="Resumen operativo de proveedores y compras">
          <article class="metric-card"><span>Deuda/compra activa</span><strong>${escapeHtml(formatMoney(totals.totalCompra))}</strong></article>
          <article class="metric-card"><span>Total pagado</span><strong>${escapeHtml(formatMoney(totals.totalPagado))}</strong></article>
          <article class="metric-card"><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(totals.saldoPorPagar))}</strong></article>
          <article class="metric-card"><span>Pendientes</span><strong>${totals.pendientes}</strong></article>
          <article class="metric-card"><span>Vencidas</span><strong>${totals.vencidas}</strong></article>
          <article class="metric-card"><span>Anuladas</span><strong>${totals.anuladas}</strong></article>
        </section>

        <div class="compras-layout">
          <article class="panel-card compra-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">${editingRecord ? 'Editando deuda' : 'Nueva deuda'}</span>
                <h2>${editingRecord ? 'Editar compra / deuda' : 'Crear compra / deuda'}</h2>
              </div>
              ${editingRecord ? '<button type="button" class="secondary-action compact" data-compra-cancel>Cancelar</button>' : ''}
            </div>
            <p class="muted-text">Los pagos a proveedor se registran en su propio módulo; aquí queda la deuda/factura base con su saldo actualizado.</p>
            ${renderCompraProveedorForm(editingRecord, proveedoresActivos, missingProviders)}
          </article>

          <article class="panel-card compra-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Listado</span>
                <h2>Compras / deudas registradas</h2>
              </div>
              <div class="count-pill">${compras.length} registros</div>
            </div>
            ${renderComprasProveedoresList(compras)}
          </article>
        </div>
      </section>
    `;
  }

  function renderProveedoresCatalogWarning() {
    return `
      <article class="catalog-warning" role="status">
        <strong>No hay proveedores activos.</strong>
        <p>Para guardar una compra o deuda, primero crea o activa al menos un proveedor en Catálogos. Sin proveedor no hay a quién deberle, y esa magia no la financia nadie.</p>
        <button type="button" class="secondary-action compact" data-go="catalogos">Ir a Catálogos</button>
      </article>
    `;
  }

  function renderCompraProveedorForm(record, proveedoresActivos, missingProviders) {
    const fechaCompra = record?.fechaCompra || todayInputValue();
    const diasCredito = record?.diasCredito ?? '';
    const fechaVencimiento = record?.fechaVencimiento || addDaysToDate(fechaCompra, Number(diasCredito) || 0) || fechaCompra;
    const calculations = getCompraProveedorCalculations(record || {});

    return `
      <form class="compra-form" data-compra-form data-current-pagado="${escapeHtml(record?.totalPagado || 0)}" novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <div class="form-grid">
          <label class="form-field">
            <span>Proveedor <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="proveedorId" required ${missingProviders ? 'disabled' : ''}>
              <option value="">Seleccionar proveedor</option>
              ${proveedoresActivos.map((proveedor) => `<option value="${escapeHtml(proveedor.id)}" ${proveedor.id === record?.proveedorId ? 'selected' : ''}>${escapeHtml(proveedor.nombre || 'Proveedor sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Factura / referencia <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="text" name="facturaReferencia" value="${escapeHtml(record?.facturaReferencia || '')}" placeholder="Ej. FAC-001 / REF-001" required autocomplete="off" />
          </label>
          <label class="form-field">
            <span>Fecha compra <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaCompra" value="${escapeHtml(fechaCompra)}" required data-compra-date />
          </label>
          <label class="form-field">
            <span>Días de crédito</span>
            <input type="number" name="diasCredito" value="${escapeHtml(diasCredito)}" min="0" step="1" inputmode="numeric" data-compra-days />
          </label>
          <label class="form-field">
            <span>Fecha vencimiento <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaVencimiento" value="${escapeHtml(fechaVencimiento)}" required data-compra-due />
          </label>
          <label class="form-field">
            <span>Total compra/deuda C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="totalCompra" value="${escapeHtml(formatNumberInput(record?.totalCompra))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-compra-calc />
          </label>
        </div>

        <div class="formula-card" aria-live="polite">
          <strong>Saldo por pagar = Total compra/deuda - Total pagado</strong>
          <div class="formula-grid">
            <span>Total compra/deuda</span><b data-compra-preview-total>${escapeHtml(formatMoney(record ? calculations.totalCompra : 0))}</b>
            <span>Total pagado</span><b data-compra-preview-pagado>${escapeHtml(formatMoney(record?.totalPagado || 0))}</b>
            <span>Saldo por pagar</span><b data-compra-preview-saldo>${escapeHtml(formatMoney(record ? calculations.saldoPorPagar : 0))}</b>
          </div>
        </div>

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas de la compra, factura o deuda">${escapeHtml(record?.observacion || '')}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${missingProviders ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar compra/deuda'}</button>
          <button type="button" class="secondary-action" data-compra-clear>Limpiar</button>
        </div>
      </form>
    `;
  }

  function renderComprasProveedoresList(compras) {
    if (!compras.length) {
      return `
        <div class="empty-state">
          <strong>No hay compras/deudas registradas todavía.</strong>
          <p>Guarda la primera factura o referencia de proveedor para comenzar a controlar cuentas por pagar.</p>
        </div>
      `;
    }

    return `
      <div class="compras-list">
        ${compras.map((compra) => renderCompraProveedorCard(compra)).join('')}
      </div>
    `;
  }

  function renderCompraProveedorCard(compra) {
    const record = normalizeCompraProveedorRecord(compra);
    const proveedor = getCatalogRecordById('proveedores', record.proveedorId);
    const estadoClass = getEstadoClass(record.estado);

    return `
      <div class="compra-card ${record.activo ? 'is-active' : 'is-inactive'}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">Factura / referencia</span>
            <h3>${escapeHtml(record.facturaReferencia || 'Sin referencia')}</h3>
          </div>
          <span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span>
        </div>
        <div class="compra-detail-grid">
          <div><span>Proveedor</span><strong>${escapeHtml(proveedor?.nombre || record.proveedorNombre || 'Proveedor no encontrado')}</strong></div>
          <div><span>Fecha compra</span><strong>${escapeHtml(formatDate(record.fechaCompra))}</strong></div>
          <div><span>Vencimiento</span><strong>${escapeHtml(formatDate(record.fechaVencimiento))}</strong></div>
          <div><span>Total compra/deuda</span><strong>${escapeHtml(formatMoney(record.totalCompra))}</strong></div>
          <div><span>Total pagado</span><strong>${escapeHtml(formatMoney(record.totalPagado))}</strong></div>
          <div><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(record.saldoPorPagar))}</strong></div>
          <div><span>Días crédito</span><strong>${Number(record.diasCredito) || 0}</strong></div>
          <div><span>Activo</span><strong>${record.activo ? 'Sí' : 'No / anulado'}</strong></div>
        </div>
        ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
        <dl class="record-meta">
          <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
          <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
          <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
        </dl>
        <div class="record-actions">
          ${record.activo && record.saldoPorPagar > 0 ? `<button type="button" class="card-action compact" data-pago-start="${escapeHtml(record.id)}">Pagar</button>` : ''}
          <button type="button" class="secondary-action compact" data-compra-edit="${escapeHtml(record.id)}">Editar</button>
          <button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(record.id)}">Historial</button>
          ${canCurrentRole('annulMovements') ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-compra-toggle="${escapeHtml(record.id)}">${record.activo ? 'Anular' : 'Reactivar'}</button>` : ''}
        </div>
      </div>
    `;
  }

  function getComprasProveedoresOrdenadas() {
    return [...(Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [])]
      .map((record) => normalizeCompraProveedorRecord(record))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getComprasProveedoresTotals() {
    const compras = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)) : [];
    return compras.reduce((totals, compra) => {
      if (!compra.activo) {
        totals.anuladas += 1;
        return totals;
      }
      totals.activas += 1;
      totals.totalCompra = roundMoney(totals.totalCompra + compra.totalCompra);
      totals.totalPagado = roundMoney(totals.totalPagado + compra.totalPagado);
      totals.saldoPorPagar = roundMoney(totals.saldoPorPagar + compra.saldoPorPagar);
      if (compra.estado === 'Pendiente') totals.pendientes += 1;
      if (compra.estado === 'Vencido') totals.vencidas += 1;
      if (compra.estado === 'Pagado') totals.pagadas += 1;
      return totals;
    }, { activas: 0, anuladas: 0, pendientes: 0, vencidas: 0, pagadas: 0, totalCompra: 0, totalPagado: 0, saldoPorPagar: 0 });
  }

  function buildCompraProveedorFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const proveedorId = cleanText(formData.get('proveedorId'));
    const proveedor = getCatalogRecordById('proveedores', proveedorId);
    const fechaCompra = toDateInputValue(formData.get('fechaCompra'));
    const diasCredito = parsePositiveInteger(formData.get('diasCredito'));
    const fechaVencimiento = toDateInputValue(formData.get('fechaVencimiento')) || addDaysToDate(fechaCompra, Number.isNaN(diasCredito) ? 0 : diasCredito);
    const base = {
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('compraProveedor'),
      proveedorId,
      proveedorNombre: proveedor?.nombre || existingRecord?.proveedorNombre || '',
      facturaReferencia: cleanText(formData.get('facturaReferencia')),
      fechaCompra,
      diasCredito,
      fechaVencimiento,
      totalCompra: parseMoney(formData.get('totalCompra')),
      totalPagado: existingRecord?.totalPagado || 0,
      observacion: cleanText(formData.get('observacion')),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    };
    const calculations = getCompraProveedorCalculations(base);
    return {
      ...base,
      diasCredito: Number.isNaN(base.diasCredito) ? 0 : base.diasCredito,
      totalCompra: Number.isNaN(base.totalCompra) ? 0 : base.totalCompra,
      totalPagado: calculations.totalPagado,
      saldoPorPagar: calculations.saldoPorPagar,
      estado: determineCompraProveedorEstado(base)
    };
  }

  function validateCompraProveedorRecord(record) {
    if (!record.proveedorId || !getActiveCatalogRecords('proveedores').some((proveedor) => proveedor.id === record.proveedorId)) return 'Selecciona un proveedor activo desde Catálogos.';
    if (!record.facturaReferencia) return 'La factura / referencia es obligatoria.';
    if (!record.fechaCompra) return 'La fecha de compra es obligatoria.';
    if (!record.fechaVencimiento) return 'La fecha de vencimiento es obligatoria.';
    if (Number.isNaN(parsePositiveInteger(record.diasCredito))) return 'Días de crédito debe ser cero o un número entero positivo.';
    if (Number.isNaN(parseMoney(record.totalCompra)) || record.totalCompra <= 0) return 'Total compra/deuda debe ser un número mayor que cero.';
    if (Number.isNaN(parseMoney(record.totalPagado)) || record.totalPagado < 0) return 'Total pagado no puede ser negativo.';
    if (record.totalPagado > record.totalCompra) return 'El total compra/deuda no puede quedar menor que el total ya pagado.';
    if (record.saldoPorPagar < 0) return 'El saldo por pagar no puede ser negativo.';
    return '';
  }

  function saveCompraProveedorRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;
    const newRecord = buildCompraProveedorFromForm(form, existingRecord);
    const validationError = validateCompraProveedorRecord(newRecord);

    if (validationError) {
      proveedoresState.message = validationError;
      proveedoresState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaCompra, existingRecord ? 'Actualizar esta compra/deuda' : 'Crear esta compra/deuda')) return;

    if (existingRecord) {
      appData.comprasProveedores = records.map((record) => record.id === existingId ? newRecord : record);
      proveedoresState.message = `Compra/deuda ${newRecord.facturaReferencia} actualizada.`;
    } else {
      appData.comprasProveedores = [newRecord, ...records];
      proveedoresState.message = `Compra/deuda ${newRecord.facturaReferencia} guardada.`;
    }

    proveedoresState.editingId = null;
    proveedoresState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function editCompraProveedorRecord(recordId) {
    const record = appData.comprasProveedores.find((item) => item.id === recordId);
    if (!record) return;
    proveedoresState.editingId = recordId;
    proveedoresState.message = null;
    renderRoute();
  }

  function toggleCompraProveedorRecord(recordId) {
    if (!canCurrentRole('annulMovements')) {
      proveedoresState.message = 'Solo Administrador puede anular o reactivar compras/deudas.';
      proveedoresState.messageType = 'error';
      renderRoute();
      return;
    }
    const records = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
    const record = records.find((item) => item.id === recordId);
    if (!record) return;
    const shouldActivate = !record.activo;
    if (!warnIfClosedPeriod(record.fechaCompra, shouldActivate ? 'Reactivar esta compra/deuda' : 'Anular esta compra/deuda')) return;

    appData.comprasProveedores = records.map((item) => {
      if (item.id !== recordId) return item;
      return normalizeCompraProveedorRecord({ ...item, activo: shouldActivate, updatedAt: nowIso() });
    });

    proveedoresState.editingId = null;
    proveedoresState.message = `Compra/deuda ${record.facturaReferencia || ''} quedó ${shouldActivate ? 'reactivada' : 'anulada'}.`;
    proveedoresState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearCompraProveedorForm() {
    proveedoresState.editingId = null;
    proveedoresState.message = null;
    renderRoute();
  }

  function setupCompraProveedorLiveCalculations(form) {
    updateCompraProveedorPreviewFromForm(form, false);

    form.querySelectorAll('[data-compra-calc]').forEach((input) => {
      input.addEventListener('input', () => updateCompraProveedorPreviewFromForm(form, false));
    });

    form.querySelector('[data-compra-date]')?.addEventListener('change', () => updateCompraProveedorPreviewFromForm(form, true));
    form.querySelector('[data-compra-days]')?.addEventListener('input', () => updateCompraProveedorPreviewFromForm(form, true));
  }

  function updateCompraProveedorPreviewFromForm(form, recalculateDue) {
    if (recalculateDue) {
      const dateInput = form.querySelector('[data-compra-date]');
      const daysInput = form.querySelector('[data-compra-days]');
      const dueInput = form.querySelector('[data-compra-due]');
      const due = addDaysToDate(dateInput?.value, Number.parseInt(daysInput?.value || '0', 10) || 0);
      if (dueInput && due) dueInput.value = due;
    }

    const formData = new FormData(form);
    const calculations = getCompraProveedorCalculations({
      totalCompra: formData.get('totalCompra'),
      totalPagado: form.dataset.currentPagado || 0
    });

    const totalNode = form.querySelector('[data-compra-preview-total]');
    const pagadoNode = form.querySelector('[data-compra-preview-pagado]');
    const saldoNode = form.querySelector('[data-compra-preview-saldo]');
    if (totalNode) totalNode.textContent = formatMoney(calculations.totalCompra);
    if (pagadoNode) pagadoNode.textContent = formatMoney(calculations.totalPagado);
    if (saldoNode) saldoNode.textContent = formatMoney(calculations.saldoPorPagar);
  }


  function renderPagosProveedores() {
    const comprasDisponibles = getComprasConSaldoPago();
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveCatalogRecords('cuentasBancos');
    const pagos = getPagosProveedoresOrdenados();
    const visiblePagos = pagosState.focusCompraId ? pagos.filter((pago) => pago.compraProveedorId === pagosState.focusCompraId) : pagos;
    const focusCompra = pagosState.focusCompraId ? normalizeCompraProveedorRecord(appData.comprasProveedores.find((compra) => compra.id === pagosState.focusCompraId)) : null;
    const totals = getPagosProveedoresTotals();
    const selectedCompra = comprasDisponibles.find((compra) => compra.id === pagosState.selectedCompraId) || comprasDisponibles[0] || null;
    if (selectedCompra && pagosState.selectedCompraId !== selectedCompra.id) pagosState.selectedCompraId = selectedCompra.id;
    const missingCatalogs = !metodosActivos.length || !cuentasActivas.length;
    const cannotCreate = !selectedCompra || missingCatalogs;

    return `
      <section class="hero pagos-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Pagos a proveedores</h1>
          <p class="lead">Registra pagos completos o abonos parciales ligados a una factura/referencia específica. Cada pago actualiza total pagado, saldo por pagar y estado de la compra/deuda.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de pagos a proveedores">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Facturas pagables</strong><span>${comprasDisponibles.length}</span></div>
            <div class="status-item"><strong>Pagos activos</strong><span>${totals.activos}</span></div>
            <div class="status-item"><strong>Total pagado</strong><span>${escapeHtml(formatMoney(totals.totalPagado))}</span></div>
            <div class="status-item"><strong>Anulados</strong><span>${totals.anulados}</span></div>
          </div>
        </aside>
      </section>

      <section class="pagos-shell">
        ${pagosState.message ? `<div class="form-message ${pagosState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(pagosState.message)}</div>` : ''}

        ${renderPagosWarning(comprasDisponibles, metodosActivos, cuentasActivas)}

        <section class="metric-grid" aria-label="Resumen operativo de pagos a proveedores">
          <article class="metric-card"><span>Total pagado activo</span><strong>${escapeHtml(formatMoney(totals.totalPagado))}</strong></article>
          <article class="metric-card"><span>Pagos registrados</span><strong>${totals.activos}</strong></article>
          <article class="metric-card"><span>Pagos anulados</span><strong>${totals.anulados}</strong></article>
          <article class="metric-card"><span>Facturas pagadas</span><strong>${totals.facturasPagadas}</strong></article>
          <article class="metric-card"><span>Facturas abonadas</span><strong>${totals.facturasAbonadas}</strong></article>
          <article class="metric-card"><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(totals.saldoPorPagar))}</strong></article>
        </section>

        <div class="pagos-layout">
          <article class="panel-card pago-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Nuevo pago</span>
                <h2>Registrar pago</h2>
              </div>
            </div>
            <p class="muted-text">Solo aparecen compras/deudas activas con saldo por pagar mayor que cero.</p>
            ${renderPagoProveedorForm(selectedCompra, comprasDisponibles, metodosActivos, cuentasActivas, cannotCreate)}
          </article>

          <article class="panel-card pago-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Historial</span>
                <h2>Pagos registrados</h2>
              </div>
              <div class="count-pill">${visiblePagos.length} registros</div>
            </div>
            ${focusCompra ? `<div class="filter-chip"><span>Filtrando ${escapeHtml(focusCompra.facturaReferencia || 'Sin referencia')}</span><button type="button" class="secondary-action compact" data-pago-clear-focus>Ver todos</button></div>` : ''}
            <label class="form-field search-field">
              <span>Buscar por proveedor o factura</span>
              <input type="search" placeholder="Ej. proveedor o FAC-001" data-pago-search autocomplete="off" />
            </label>
            ${renderPagosProveedoresList(visiblePagos)}
          </article>
        </div>
      </section>
    `;
  }

  function renderPagosWarning(comprasDisponibles, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!comprasDisponibles.length) missing.push('facturas/referencias con saldo por pagar');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!cuentasActivas.length) missing.push('cuentas/bancos activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un pago necesitas una compra/deuda activa con saldo y catálogos activos de método y cuenta/banco.</p>
        <div class="placeholder-tools">
          <button type="button" class="secondary-action compact" data-go="proveedores">Ir a Proveedores / Compras</button>
          <button type="button" class="secondary-action compact" data-go="catalogos">Ir a Catálogos</button>
        </div>
      </article>
    `;
  }

  function renderPagoProveedorForm(selectedCompra, comprasDisponibles, metodosActivos, cuentasActivas, cannotCreate) {
    const proveedor = selectedCompra ? getCatalogRecordById('proveedores', selectedCompra.proveedorId) : null;
    const saldo = selectedCompra ? selectedCompra.saldoPorPagar : 0;

    return `
      <form class="pago-form" data-pago-form novalidate>
        <div class="form-grid">
          <label class="form-field full-span">
            <span>Factura / referencia <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="compraProveedorId" required data-pago-compra ${!comprasDisponibles.length ? 'disabled' : ''}>
              ${comprasDisponibles.length ? '' : '<option value="">No hay facturas con saldo</option>'}
              ${comprasDisponibles.map((compra) => {
                const compraProveedor = getCatalogRecordById('proveedores', compra.proveedorId);
                return `<option value="${escapeHtml(compra.id)}" ${compra.id === selectedCompra?.id ? 'selected' : ''}>${escapeHtml(compra.facturaReferencia || 'Sin referencia')} · ${escapeHtml(compraProveedor?.nombre || compra.proveedorNombre || 'Proveedor')} · saldo ${escapeHtml(formatMoney(compra.saldoPorPagar))}</option>`;
              }).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha real de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaPago" value="${escapeHtml(todayInputValue())}" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Monto pagado C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="montoPagado" min="0.01" max="${escapeHtml(saldo)}" step="0.01" inputmode="decimal" placeholder="0.00" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoId" required ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}">${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Cuenta / banco <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="cuentaBancoId" required ${!cuentasActivas.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar cuenta/banco</option>
              ${cuentasActivas.map((cuenta) => `<option value="${escapeHtml(cuenta.id)}">${escapeHtml(cuenta.nombre || 'Cuenta sin nombre')}</option>`).join('')}
            </select>
          </label>
        </div>

        ${selectedCompra ? renderSelectedCompraPagoSummary(selectedCompra, proveedor) : ''}

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del pago" ${cannotCreate ? 'disabled' : ''}></textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${cannotCreate ? 'disabled' : ''}>Guardar pago</button>
          ${selectedCompra ? `<button type="button" class="secondary-action" data-pago-fill-full="${escapeHtml(selectedCompra.id)}" ${cannotCreate ? 'disabled' : ''}>Pagar saldo completo</button>` : ''}
        </div>
      </form>
    `;
  }

  function renderSelectedCompraPagoSummary(compra, proveedor) {
    return `
      <div class="formula-card pago-summary" aria-live="polite">
        <strong>Factura/referencia seleccionada</strong>
        <div class="formula-grid">
          <span>Proveedor</span><b>${escapeHtml(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado')}</b>
          <span>Factura/referencia</span><b>${escapeHtml(compra.facturaReferencia || 'Sin referencia')}</b>
          <span>Fecha compra</span><b>${escapeHtml(formatDate(compra.fechaCompra))}</b>
          <span>Vencimiento</span><b>${escapeHtml(formatDate(compra.fechaVencimiento))}</b>
          <span>Total compra/deuda</span><b>${escapeHtml(formatMoney(compra.totalCompra))}</b>
          <span>Total pagado actual</span><b>${escapeHtml(formatMoney(compra.totalPagado))}</b>
          <span>Saldo por pagar actual</span><b>${escapeHtml(formatMoney(compra.saldoPorPagar))}</b>
        </div>
      </div>
    `;
  }

  function renderPagosProveedoresList(pagos) {
    if (!pagos.length) {
      return `
        <div class="empty-state">
          <strong>No hay pagos registrados todavía.</strong>
          <p>Registra el primer abono o pago completo para empezar a cerrar cuentas por pagar.</p>
        </div>
      `;
    }

    return `
      <div class="pagos-list">
        ${pagos.map((pago) => renderPagoProveedorCard(pago)).join('')}
      </div>
    `;
  }

  function renderPagoProveedorCard(pago) {
    const record = normalizePagoProveedorRecord(pago);
    const estadoClass = record.activo ? 'is-active' : 'is-inactive';
    const searchable = normalizeNameForCompare(`${record.proveedorNombre} ${record.facturaReferencia} ${record.metodoPagoNombre} ${record.cuentaBancoNombre}`);
    return `
      <div class="pago-card ${record.activo ? 'is-active' : 'is-inactive'}" data-pago-card data-search-text="${escapeHtml(searchable)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">Pago / ${escapeHtml(formatDate(record.fechaPago))}</span>
            <h3>${escapeHtml(record.facturaReferencia || 'Sin referencia')}</h3>
          </div>
          <span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span>
        </div>
        <div class="pago-detail-grid">
          <div><span>Proveedor</span><strong>${escapeHtml(record.proveedorNombre || 'Proveedor no encontrado')}</strong></div>
          <div><span>Factura / referencia</span><strong>${escapeHtml(record.facturaReferencia || '—')}</strong></div>
          <div><span>Monto pagado</span><strong>${escapeHtml(formatMoney(record.montoPagado))}</strong></div>
          <div><span>Método</span><strong>${escapeHtml(record.metodoPagoNombre || '—')}</strong></div>
          <div><span>Cuenta / banco</span><strong>${escapeHtml(record.cuentaBancoNombre || '—')}</strong></div>
          <div><span>Fecha real</span><strong>${escapeHtml(formatDate(record.fechaPago))}</strong></div>
        </div>
        ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
        <dl class="record-meta">
          <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
          <dt>Compra ID</dt><dd>${escapeHtml(record.compraProveedorId)}</dd>
          <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
          <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
        </dl>
        <div class="record-actions">
          <button type="button" class="secondary-action compact" data-go="proveedores">Ir a Proveedores</button>
          ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-pago-annul="${escapeHtml(record.id)}">Anular pago</button>` : ''}
        </div>
      </div>
    `;
  }

  function getPagosProveedoresOrdenados() {
    return [...(Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : [])]
      .map((record) => normalizePagoProveedorRecord(record))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getComprasConSaldoPago() {
    return (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [])
      .map((record) => normalizeCompraProveedorRecord(record))
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0)
      .sort((a, b) => String(a.fechaVencimiento || '').localeCompare(String(b.fechaVencimiento || '')) || String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getPagosProveedoresTotals() {
    const pagos = Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores.map((record) => normalizePagoProveedorRecord(record)) : [];
    const compras = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)) : [];
    const totals = pagos.reduce((summary, pago) => {
      if (!pago.activo) {
        summary.anulados += 1;
        return summary;
      }
      summary.activos += 1;
      summary.totalPagado = roundMoney(summary.totalPagado + pago.montoPagado);
      return summary;
    }, { activos: 0, anulados: 0, totalPagado: 0, facturasPagadas: 0, facturasAbonadas: 0, saldoPorPagar: 0 });

    compras.forEach((compra) => {
      if (!compra.activo) return;
      if (compra.estado === 'Pagado') totals.facturasPagadas += 1;
      if (compra.estado === 'Abonado') totals.facturasAbonadas += 1;
      if (compra.saldoPorPagar > 0) totals.saldoPorPagar = roundMoney(totals.saldoPorPagar + compra.saldoPorPagar);
    });

    return totals;
  }

  function buildPagoProveedorFromForm(form) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const compraProveedorId = cleanText(formData.get('compraProveedorId'));
    const compra = appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const proveedor = compra ? getCatalogRecordById('proveedores', compra.proveedorId) : null;
    const metodo = getCatalogRecordById('metodosPago', cleanText(formData.get('metodoPagoId')));
    const cuenta = getCatalogRecordById('cuentasBancos', cleanText(formData.get('cuentaBancoId')));

    return normalizePagoProveedorRecord({
      id: generateId('pagoProveedor'),
      compraProveedorId,
      fechaPago: toDateInputValue(formData.get('fechaPago')),
      proveedorId: compra?.proveedorId || '',
      proveedorNombre: proveedor?.nombre || compra?.proveedorNombre || '',
      facturaReferencia: compra?.facturaReferencia || '',
      montoPagado: parseMoney(formData.get('montoPagado')),
      metodoPagoId: metodo?.id || '',
      metodoPagoNombre: metodo?.nombre || '',
      cuentaBancoId: cuenta?.id || '',
      cuentaBancoNombre: cuenta?.nombre || '',
      observacion: cleanText(formData.get('observacion')),
      activo: true,
      estado: 'Registrado',
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }

  function validatePagoProveedorRecord(record) {
    const compra = (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : []).map((item) => normalizeCompraProveedorRecord(item)).find((item) => item.id === record.compraProveedorId);
    if (!compra || !compra.activo) return 'Selecciona una factura/referencia activa con saldo por pagar.';
    if (compra.saldoPorPagar <= 0) return 'La factura/referencia seleccionada no tiene saldo por pagar.';
    if (!record.fechaPago) return 'La fecha real de pago es obligatoria.';
    if (Number.isNaN(parseMoney(record.montoPagado)) || record.montoPagado <= 0) return 'El monto pagado debe ser mayor que cero.';
    if (record.montoPagado > compra.saldoPorPagar) return `El pago no puede superar el saldo pendiente de ${formatMoney(compra.saldoPorPagar)}.`;
    if (!record.metodoPagoId || !getActiveCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId)) return 'Selecciona un método de pago activo.';
    if (!record.cuentaBancoId || !getActiveCatalogRecords('cuentasBancos').some((item) => item.id === record.cuentaBancoId)) return 'Selecciona una cuenta/banco activo.';
    return '';
  }

  function savePagoProveedorRecord(form) {
    const newRecord = buildPagoProveedorFromForm(form);
    const validationError = validatePagoProveedorRecord(newRecord);

    if (validationError) {
      pagosState.message = validationError;
      pagosState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaPago, 'Registrar este pago a proveedor')) return;

    appData.pagosProveedores = [newRecord, ...(Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : [])];
    recalculateCompraProveedorById(newRecord.compraProveedorId);
    const compra = appData.comprasProveedores.find((record) => record.id === newRecord.compraProveedorId);
    pagosState.selectedCompraId = compra?.saldoPorPagar > 0 ? newRecord.compraProveedorId : '';
    pagosState.focusCompraId = newRecord.compraProveedorId;
    pagosState.message = `Pago aplicado a ${newRecord.facturaReferencia}: ${formatMoney(newRecord.montoPagado)}.`;
    pagosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function annulPagoProveedorRecord(pagoId) {
    if (!canCurrentRole('annulMovements')) {
      pagosState.message = 'Solo Administrador puede anular pagos.';
      pagosState.messageType = 'error';
      renderRoute();
      return;
    }
    const pagos = Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : [];
    const pago = pagos.find((record) => record.id === pagoId);
    if (!pago || pago.activo === false) return;
    if (!warnIfClosedPeriod(pago.fechaPago, 'Anular este pago a proveedor')) return;

    appData.pagosProveedores = pagos.map((record) => record.id === pagoId
      ? normalizePagoProveedorRecord({ ...record, activo: false, estado: 'Anulado', updatedAt: nowIso() })
      : record);
    recalculateCompraProveedorById(pago.compraProveedorId);
    pagosState.selectedCompraId = pago.compraProveedorId;
    pagosState.focusCompraId = pago.compraProveedorId;
    pagosState.message = `Pago de ${formatMoney(pago.montoPagado)} anulado y factura/referencia recalculada.`;
    pagosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function recalculateCompraProveedorById(compraProveedorId) {
    if (!Array.isArray(appData.comprasProveedores)) appData.comprasProveedores = [];
    appData.comprasProveedores = appData.comprasProveedores.map((record) => {
      if (record.id !== compraProveedorId) return normalizeCompraProveedorRecord(record);
      const totalPagado = calculateTotalPagadoForCompra(record.id, appData.pagosProveedores);
      return normalizeCompraProveedorRecord({ ...record, totalPagado, updatedAt: nowIso() });
    });
  }

  function selectPagoCompra(compraProveedorId) {
    pagosState.selectedCompraId = cleanText(compraProveedorId);
    pagosState.focusCompraId = cleanText(compraProveedorId);
    pagosState.message = null;
    renderRoute();
  }

  function startPagoForCompra(compraProveedorId) {
    pagosState.selectedCompraId = cleanText(compraProveedorId);
    pagosState.focusCompraId = cleanText(compraProveedorId);
    pagosState.message = null;
    setRoute('pagos');
  }

  function fillPagoFullAmount(form, compraProveedorId) {
    const compra = appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const amountInput = form.querySelector('input[name="montoPagado"]');
    if (compra && amountInput) amountInput.value = String(compra.saldoPorPagar);
  }

  function setupPagosSearch() {
    const search = viewRoot.querySelector('[data-pago-search]');
    if (!search) return;
    search.addEventListener('input', () => {
      const query = normalizeNameForCompare(search.value);
      viewRoot.querySelectorAll('[data-pago-card]').forEach((card) => {
        const text = card.getAttribute('data-search-text') || '';
        card.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }


  function renderGastos() {
    const tiposActivos = getActiveCatalogRecords('tiposGasto');
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveCatalogRecords('cuentasBancos');
    const gastos = getGastosOrdenados();
    const editingRecord = gastosState.editingId ? gastos.find((record) => record.id === gastosState.editingId) : null;
    const totals = getGastosTotals();
    const missingCatalogs = !tiposActivos.length || !metodosActivos.length || !cuentasActivas.length;

    return `
      <section class="hero gastos-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Gastos</h1>
          <p class="lead">Registra gastos operativos por tipo, método de pago y cuenta/banco. Los anulados quedan visibles para trazabilidad, pero no suman en reportes futuros: orden sin maquillaje contable.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de gastos">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Gastos activos</strong><span>${totals.activos}</span></div>
            <div class="status-item"><strong>Total activo</strong><span>${escapeHtml(formatMoney(totals.totalActivo))}</span></div>
            <div class="status-item"><strong>Anulados</strong><span>${totals.anulados}</span></div>
            <div class="status-item"><strong>Tipos usados</strong><span>${totals.tiposUsados}</span></div>
          </div>
        </aside>
      </section>

      <section class="gastos-shell">
        ${gastosState.message ? `<div class="form-message ${gastosState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(gastosState.message)}</div>` : ''}

        ${renderGastosWarning(tiposActivos, metodosActivos, cuentasActivas)}

        <section class="metric-grid" aria-label="Resumen operativo de gastos">
          <article class="metric-card"><span>Total gastos activos</span><strong>${escapeHtml(formatMoney(totals.totalActivo))}</strong></article>
          <article class="metric-card"><span>Registrados activos</span><strong>${totals.activos}</strong></article>
          <article class="metric-card"><span>Anulados</span><strong>${totals.anulados}</strong></article>
          <article class="metric-card"><span>Total histórico</span><strong>${gastos.length}</strong></article>
          <article class="metric-card"><span>Tipos usados</span><strong>${totals.tiposUsados}</strong></article>
          <article class="metric-card"><span>No suman</span><strong>${escapeHtml(formatMoney(totals.totalAnulado))}</strong></article>
        </section>

        <div class="gastos-layout">
          <article class="panel-card gasto-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">${editingRecord ? 'Editando gasto' : 'Nuevo gasto'}</span>
                <h2>${editingRecord ? 'Editar gasto' : 'Registrar gasto'}</h2>
              </div>
              ${editingRecord ? '<button type="button" class="secondary-action compact" data-gasto-cancel>Cancelar</button>' : ''}
            </div>
            <p class="muted-text">Los tipos, métodos y cuentas/bancos vienen de Catálogos activos.</p>
            ${renderGastoForm(editingRecord, tiposActivos, metodosActivos, cuentasActivas, missingCatalogs)}
          </article>

          <article class="panel-card gasto-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Listado</span>
                <h2>Gastos registrados</h2>
              </div>
              <div class="count-pill">${gastos.length} registros</div>
            </div>
            <label class="form-field search-field">
              <span>Buscar por tipo, método, cuenta u observación</span>
              <input type="search" placeholder="Ej. transporte, efectivo o banco" data-gasto-search autocomplete="off" />
            </label>
            ${renderGastosList(gastos)}
          </article>
        </div>
      </section>
    `;
  }

  function renderGastosWarning(tiposActivos, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!tiposActivos.length) missing.push('tipos de gasto activos');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!cuentasActivas.length) missing.push('cuentas/bancos activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un gasto necesitas catálogos activos de tipo de gasto, método y cuenta/banco.</p>
        <button type="button" class="secondary-action compact" data-go="catalogos">Ir a Catálogos</button>
      </article>
    `;
  }

  function renderGastoForm(record, tiposActivos, metodosActivos, cuentasActivas, missingCatalogs) {
    const cannotCreate = Boolean(missingCatalogs);
    const fecha = record?.fecha || todayInputValue();
    return `
      <form class="gasto-form" data-gasto-form novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <div class="form-grid">
          <label class="form-field">
            <span>Fecha <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fecha" value="${escapeHtml(fecha)}" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Tipo de gasto <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="tipoGastoId" required ${!tiposActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar tipo</option>
              ${tiposActivos.map((tipo) => `<option value="${escapeHtml(tipo.id)}" ${tipo.id === record?.tipoGastoId ? 'selected' : ''}>${escapeHtml(tipo.nombre || 'Tipo sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Monto C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="monto" value="${escapeHtml(formatNumberInput(record?.monto))}" min="0.01" step="0.01" inputmode="decimal" placeholder="0.00" required ${cannotCreate ? 'disabled' : ''} />
          </label>
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoId" required ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${metodo.id === record?.metodoPagoId ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field full-span">
            <span>Cuenta / banco <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="cuentaBancoId" required ${!cuentasActivas.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar cuenta/banco</option>
              ${cuentasActivas.map((cuenta) => `<option value="${escapeHtml(cuenta.id)}" ${cuenta.id === record?.cuentaBancoId ? 'selected' : ''}>${escapeHtml(cuenta.nombre || 'Cuenta sin nombre')}</option>`).join('')}
            </select>
          </label>
        </div>

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del gasto" ${cannotCreate ? 'disabled' : ''}>${escapeHtml(record?.observacion || '')}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${cannotCreate ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar gasto'}</button>
          <button type="button" class="secondary-action" data-gasto-clear>Limpiar</button>
        </div>
      </form>
    `;
  }

  function renderGastosList(gastos) {
    if (!gastos.length) {
      return `
        <div class="empty-state">
          <strong>No hay gastos registrados todavía.</strong>
          <p>Guarda el primer gasto para iniciar el control operativo.</p>
        </div>
      `;
    }

    return `
      <div class="gastos-list">
        ${gastos.map((gasto) => renderGastoCard(gasto)).join('')}
      </div>
    `;
  }

  function renderGastoCard(gasto) {
    const record = normalizeGastoRecord(gasto);
    const tipo = getCatalogRecordById('tiposGasto', record.tipoGastoId);
    const metodo = getCatalogRecordById('metodosPago', record.metodoPagoId);
    const cuenta = getCatalogRecordById('cuentasBancos', record.cuentaBancoId);
    const estadoClass = getEstadoClass(record.estado);
    const searchText = normalizeNameForCompare([record.tipoGastoNombre, tipo?.nombre, record.metodoPagoNombre, metodo?.nombre, record.cuentaBancoNombre, cuenta?.nombre, record.observacion].join(' '));

    return `
      <div class="gasto-card ${record.activo ? 'is-active' : 'is-inactive'}" data-gasto-card data-search-text="${escapeHtml(searchText)}">
        <div class="venta-card-head">
          <div>
            <span class="eyebrow mini">Gasto</span>
            <h3>${escapeHtml(tipo?.nombre || record.tipoGastoNombre || 'Tipo no encontrado')}</h3>
          </div>
          <span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span>
        </div>
        <div class="gasto-detail-grid">
          <div><span>Fecha</span><strong>${escapeHtml(formatDate(record.fecha))}</strong></div>
          <div><span>Monto</span><strong>${escapeHtml(formatMoney(record.monto))}</strong></div>
          <div><span>Método</span><strong>${escapeHtml(metodo?.nombre || record.metodoPagoNombre || 'Método no encontrado')}</strong></div>
          <div><span>Cuenta / banco</span><strong>${escapeHtml(cuenta?.nombre || record.cuentaBancoNombre || 'Cuenta no encontrada')}</strong></div>
          <div><span>Estado</span><strong>${escapeHtml(record.estado)}</strong></div>
          <div><span>Suma futura</span><strong>${record.activo ? 'Sí' : 'No'}</strong></div>
        </div>
        ${record.observacion ? `<p class="record-note">${escapeHtml(record.observacion)}</p>` : ''}
        <dl class="record-meta">
          <dt>ID</dt><dd>${escapeHtml(record.id)}</dd>
          <dt>Anulado</dt><dd>${record.anulado ? 'Sí' : 'No'}</dd>
          <dt>Creado</dt><dd>${escapeHtml(formatDateTime(record.createdAt))}</dd>
          <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(record.updatedAt))}</dd>
        </dl>
        <div class="record-actions">
          ${record.activo ? `<button type="button" class="secondary-action compact" data-gasto-edit="${escapeHtml(record.id)}">Editar</button>` : ''}
          ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-gasto-annul="${escapeHtml(record.id)}">Anular gasto</button>` : ''}
        </div>
      </div>
    `;
  }

  function getGastosOrdenados() {
    return [...(Array.isArray(appData.gastos) ? appData.gastos : [])]
      .map((record) => normalizeGastoRecord(record))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getGastosTotals() {
    const gastos = Array.isArray(appData.gastos) ? appData.gastos.map((record) => normalizeGastoRecord(record)) : [];
    return gastos.reduce((totals, gasto) => {
      if (!gasto.activo) {
        totals.anulados += 1;
        totals.totalAnulado = roundMoney(totals.totalAnulado + gasto.monto);
        return totals;
      }
      totals.activos += 1;
      totals.totalActivo = roundMoney(totals.totalActivo + gasto.monto);
      if (gasto.tipoGastoId) totals.tiposSet.add(gasto.tipoGastoId);
      totals.tiposUsados = totals.tiposSet.size;
      return totals;
    }, { activos: 0, anulados: 0, totalActivo: 0, totalAnulado: 0, tiposUsados: 0, tiposSet: new Set() });
  }

  function buildGastoFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const tipo = getCatalogRecordById('tiposGasto', cleanText(formData.get('tipoGastoId')));
    const metodo = getCatalogRecordById('metodosPago', cleanText(formData.get('metodoPagoId')));
    const cuenta = getCatalogRecordById('cuentasBancos', cleanText(formData.get('cuentaBancoId')));

    return normalizeGastoRecord({
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('gasto'),
      fecha: toDateInputValue(formData.get('fecha')),
      tipoGastoId: tipo?.id || '',
      tipoGastoNombre: tipo?.nombre || '',
      monto: parseMoney(formData.get('monto')),
      metodoPagoId: metodo?.id || '',
      metodoPagoNombre: metodo?.nombre || '',
      cuentaBancoId: cuenta?.id || '',
      cuentaBancoNombre: cuenta?.nombre || '',
      observacion: cleanText(formData.get('observacion')),
      estado: 'Registrado',
      anulado: false,
      activo: true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    });
  }

  function validateGastoRecord(record) {
    if (!record.fecha) return 'La fecha del gasto es obligatoria.';
    if (!record.tipoGastoId || !getActiveCatalogRecords('tiposGasto').some((item) => item.id === record.tipoGastoId)) return 'Selecciona un tipo de gasto activo.';
    if (Number.isNaN(parseMoney(record.monto)) || record.monto <= 0) return 'El monto debe ser mayor que cero.';
    if (!record.metodoPagoId || !getActiveCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId)) return 'Selecciona un método de pago activo.';
    if (!record.cuentaBancoId || !getActiveCatalogRecords('cuentasBancos').some((item) => item.id === record.cuentaBancoId)) return 'Selecciona una cuenta/banco activo.';
    return '';
  }

  function saveGastoRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.gastos) ? appData.gastos : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;

    if (existingRecord && normalizeGastoRecord(existingRecord).anulado) {
      gastosState.message = 'No se puede editar un gasto anulado.';
      gastosState.messageType = 'error';
      renderRoute();
      return;
    }

    const newRecord = buildGastoFromForm(form, existingRecord);
    const validationError = validateGastoRecord(newRecord);

    if (validationError) {
      gastosState.message = validationError;
      gastosState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fecha, existingRecord ? 'Actualizar este gasto' : 'Registrar este gasto')) return;

    if (existingRecord) {
      appData.gastos = records.map((record) => record.id === existingId ? newRecord : record);
      gastosState.message = `Gasto actualizado: ${formatMoney(newRecord.monto)}.`;
    } else {
      appData.gastos = [newRecord, ...records];
      gastosState.message = `Gasto registrado: ${formatMoney(newRecord.monto)}.`;
    }

    gastosState.editingId = null;
    gastosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function editGastoRecord(recordId) {
    const record = (Array.isArray(appData.gastos) ? appData.gastos : []).find((item) => item.id === recordId);
    if (!record) return;
    const normalized = normalizeGastoRecord(record);
    if (normalized.anulado) {
      gastosState.message = 'Los gastos anulados quedan visibles, pero no se editan.';
      gastosState.messageType = 'error';
      renderRoute();
      return;
    }
    gastosState.editingId = recordId;
    gastosState.message = null;
    renderRoute();
  }

  function annulGastoRecord(recordId) {
    if (!canCurrentRole('annulMovements')) {
      gastosState.message = 'Solo Administrador puede anular gastos.';
      gastosState.messageType = 'error';
      renderRoute();
      return;
    }
    const records = Array.isArray(appData.gastos) ? appData.gastos : [];
    const record = records.find((item) => item.id === recordId);
    if (!record || normalizeGastoRecord(record).anulado) return;
    if (!warnIfClosedPeriod(record.fecha, 'Anular este gasto')) return;

    appData.gastos = records.map((item) => item.id === recordId
      ? normalizeGastoRecord({ ...item, activo: false, anulado: true, estado: 'Anulado', updatedAt: nowIso() })
      : item);

    gastosState.editingId = null;
    gastosState.message = `Gasto de ${formatMoney(record.monto)} anulado. Queda visible y no sumará en reportes futuros.`;
    gastosState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearGastoForm() {
    gastosState.editingId = null;
    gastosState.message = null;
    renderRoute();
  }

  function setupGastosSearch() {
    const search = viewRoot.querySelector('[data-gasto-search]');
    if (!search) return;
    search.addEventListener('input', () => {
      const query = normalizeNameForCompare(search.value);
      viewRoot.querySelectorAll('[data-gasto-card]').forEach((card) => {
        const text = card.getAttribute('data-search-text') || '';
        card.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }


  function renderConfiguracion() {
    const config = normalizeConfiguracion(appData.configuracion);
    const currentRole = getCurrentRoleDefinition();
    const counts = getJsonRecordCounts(appData);
    const preview = jsonBackupState.preview;
    const hasPreview = Boolean(preview && jsonBackupState.payload);
    const canExport = canCurrentRole('exportJson');
    const canImport = canCurrentRole('importJson');
    const canConfig = canCurrentRole('changeConfig');
    const modeOptions = getOperationalRecordCount() > 0
      ? `
        <label class="form-field">
          <span>Modo de importación JSON</span>
          <select data-json-import-mode>
            <option value="merge">Fusionar con datos actuales evitando duplicados por ID y claves naturales</option>
            <option value="replace">Reemplazar datos actuales por el respaldo validado</option>
          </select>
        </label>
        <p class="notice">Reemplazar borra la base local actual y carga la del JSON. Fusionar agrega lo faltante sin duplicar lo evidente. No es magia, pero se le acerca con casco.</p>
      `
      : `
        <input type="hidden" data-json-import-mode value="replace" />
        <p class="notice">La base operativa está vacía. El JSON validado puede cargarse como base inicial.</p>
      `;

    return `
      <section class="hero config-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Configuración</h1>
          <p class="lead">Centraliza parámetros generales, roles básicos locales, respaldo JSON validado e información del sistema. Es protección local, no login real: una cerradura de oficina, no bóveda suiza.</p>
        </div>
        <aside class="hero-status" aria-label="Estado de configuración">
          <h3>Sistema</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Versión</strong><span>${escapeHtml(APP_VERSION)}</span></div>
            <div class="status-item"><strong>Schema</strong><span>${escapeHtml(SCHEMA_VERSION)}</span></div>
            <div class="status-item"><strong>Rol actual</strong><span>${escapeHtml(currentRole.label)}</span></div>
            <div class="status-item"><strong>Registros</strong><span>${counts.total}</span></div>
          </div>
        </aside>
      </section>

      <section class="config-shell">
        ${configState.message ? `<div class="form-message ${configState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(configState.message)}</div>` : ''}
        ${jsonBackupState.message ? `<div class="form-message ${jsonBackupState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(jsonBackupState.message)}</div>` : ''}

        <div class="config-grid">
          <article class="panel-card config-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">General</span>
                <h2>Parámetros generales</h2>
              </div>
            </div>
            ${renderRolePermissionNotice('changeConfig', 'Solo Administrador puede cambiar parámetros generales. El rol puede cambiarse abajo porque esta etapa aún no tiene login real.')}
            <form class="config-form" data-config-form novalidate>
              <div class="form-grid">
                <label class="form-field">
                  <span>Nombre de la app</span>
                  <input type="text" name="appDisplayName" value="${escapeHtml(config.appDisplayName)}" ${canConfig ? '' : 'disabled'} autocomplete="off" />
                </label>
                <label class="form-field">
                  <span>Moneda principal</span>
                  <input type="text" name="monedaPrincipal" value="${escapeHtml(config.monedaPrincipal)}" ${canConfig ? '' : 'disabled'} autocomplete="off" />
                </label>
                <label class="form-field">
                  <span>Días para alerta próxima a vencer</span>
                  <input type="number" name="diasAlertaVencimiento" value="${escapeHtml(config.diasAlertaVencimiento)}" min="1" step="1" inputmode="numeric" ${canConfig ? '' : 'disabled'} />
                </label>
                <label class="form-field">
                  <span>Archivo Excel de referencia</span>
                  <input type="text" name="excelReferencia" value="${escapeHtml(config.excelReferencia)}" ${canConfig ? '' : 'disabled'} autocomplete="off" />
                </label>
              </div>
              <div class="form-actions">
                <button type="submit" class="card-action" ${canConfig ? '' : 'disabled'}>Guardar configuración</button>
              </div>
            </form>
          </article>

          <article class="panel-card config-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Roles</span>
                <h2>Protección básica local</h2>
              </div>
            </div>
            <p class="notice">Roles locales sin backend ni login real. Sirven para ordenar permisos en este dispositivo; el login formal queda listo para una etapa futura si se decide.</p>
            <label class="form-field">
              <span>Rol activo en este dispositivo</span>
              <select data-config-role>
                ${ROLE_ORDER.map((roleId) => {
                  const role = ROLE_DEFINITIONS[roleId];
                  return `<option value="${escapeHtml(role.id)}" ${role.id === currentRole.id ? 'selected' : ''}>${escapeHtml(role.label)}</option>`;
                }).join('')}
              </select>
            </label>
            <div class="role-list">
              ${ROLE_ORDER.map((roleId) => {
                const role = ROLE_DEFINITIONS[roleId];
                return `
                  <div class="role-card ${role.id === currentRole.id ? 'is-active' : ''}">
                    <strong>${escapeHtml(role.label)}</strong>
                    <p>${escapeHtml(role.description)}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </article>

          <article class="panel-card config-card full-span">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Respaldo JSON</span>
                <h2>Exportar respaldo</h2>
              </div>
            </div>
            ${renderRolePermissionNotice('exportJson', 'Exportar JSON queda reservado para Administrador.')}
            <p class="notice">JSON es respaldo y traslado manual entre dispositivos. No sincroniza automáticamente: si en dos iPads se trabaja a la vez, el JSON no hace telepatía.</p>
            <div class="config-actions-row">
              <button type="button" class="card-action" data-json-export ${canExport ? '' : 'disabled'}>Exportar JSON</button>
              <div class="data-pill"><span>Último respaldo</span><strong>${escapeHtml(formatDateTime(config.lastBackupAt))}</strong></div>
              <div class="data-pill"><span>Última importación</span><strong>${escapeHtml(formatDateTime(config.lastImportAt))}</strong></div>
            </div>
            <div class="import-summary-grid compact-summary">
              <div class="status-item"><strong>Ventas</strong><span>${counts.ventas}</span></div>
              <div class="status-item"><strong>Cobros</strong><span>${counts.cobros}</span></div>
              <div class="status-item"><strong>Compras/prov.</strong><span>${counts.comprasProveedores}</span></div>
              <div class="status-item"><strong>Pagos</strong><span>${counts.pagosProveedores}</span></div>
              <div class="status-item"><strong>Gastos</strong><span>${counts.gastos}</span></div>
              <div class="status-item"><strong>Catálogos</strong><span>${counts.catalogos}</span></div>
            </div>
          </article>

          <article class="panel-card config-card full-span">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Importación / Validación</span>
                <h2>Importar JSON validado</h2>
              </div>
              ${hasPreview ? '<button type="button" class="secondary-action compact" data-json-import-cancel>Cancelar vista previa</button>' : ''}
            </div>
            ${renderRolePermissionNotice('importJson', 'Importar JSON queda reservado para Administrador.')}
            <label class="form-field">
              <span>Seleccionar respaldo .json</span>
              <input type="file" accept=".json,application/json" data-json-file ${canImport ? '' : 'disabled'} />
            </label>
            ${hasPreview ? renderJsonPreview(preview, modeOptions, canImport) : `
              <div class="empty-state">
                <strong>Selecciona un JSON para validar.</strong>
                <p>Primero se revisa estructura, metadata, versión y conteos; después se permite reemplazar o fusionar. Sin validación no hay importación, porque la cartera no es piñata.</p>
              </div>
            `}
          </article>

          <article class="panel-card config-card full-span">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Información del sistema</span>
                <h2>Estado técnico</h2>
              </div>
            </div>
            <dl class="definition-list system-definition-list">
              <dt>App esperada</dt><dd>${escapeHtml(APP_NAME)}</dd>
              <dt>Versión</dt><dd>${escapeHtml(APP_VERSION)}</dd>
              <dt>SchemaVersion</dt><dd>${escapeHtml(SCHEMA_VERSION)}</dd>
              <dt>localStorage</dt><dd>${escapeHtml(STORAGE_KEY)}</dd>
              <dt>Creado</dt><dd>${escapeHtml(formatDateTime(appData.metadata?.createdAt))}</dd>
              <dt>Actualizado</dt><dd>${escapeHtml(formatDateTime(appData.metadata?.updatedAt))}</dd>
              <dt>Nota</dt><dd>Sin backend, sin Firebase, sin sincronización automática.</dd>
            </dl>
          </article>
        </div>
      </section>
    `;
  }

  function renderJsonPreview(preview, modeOptions, canImport) {
    const errorBlock = preview.errors?.length
      ? `<ul class="import-warning-list is-error-list">${preview.errors.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : '<p class="muted-text">Sin errores críticos de estructura.</p>';
    const warningBlock = preview.warnings?.length
      ? `<ul class="import-warning-list">${preview.warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : '<p class="muted-text">Sin advertencias fuertes.</p>';

    return `
      <div class="json-preview-card">
        <div class="import-summary-grid">
          <div class="status-item"><strong>Estado</strong><span>${preview.isValid ? 'Válido' : 'Bloqueado'}</span></div>
          <div class="status-item"><strong>App</strong><span>${escapeHtml(preview.appName || '—')}</span></div>
          <div class="status-item"><strong>Versión</strong><span>${escapeHtml(preview.schemaVersion || '—')}</span></div>
          <div class="status-item"><strong>Fecha respaldo</strong><span>${escapeHtml(formatDateTime(preview.backupDate))}</span></div>
          <div class="status-item"><strong>Archivo</strong><span>${escapeHtml(jsonBackupState.fileName || '—')}</span></div>
          <div class="status-item"><strong>Total</strong><span>${preview.counts.total}</span></div>
        </div>

        <h3>Conteo detectado</h3>
        <div class="import-summary-grid compact-summary">
          <div class="status-item"><strong>Ventas</strong><span>${preview.counts.ventas}</span></div>
          <div class="status-item"><strong>Cobros</strong><span>${preview.counts.cobros}</span></div>
          <div class="status-item"><strong>Compras/prov.</strong><span>${preview.counts.comprasProveedores}</span></div>
          <div class="status-item"><strong>Pagos</strong><span>${preview.counts.pagosProveedores}</span></div>
          <div class="status-item"><strong>Gastos</strong><span>${preview.counts.gastos}</span></div>
          <div class="status-item"><strong>Catálogos</strong><span>${preview.counts.catalogos}</span></div>
          <div class="status-item"><strong>Cierres</strong><span>${preview.counts.cierresMensuales}</span></div>
        </div>

        <h3>Validación</h3>
        ${errorBlock}
        <h3>Advertencias</h3>
        ${warningBlock}

        <div class="import-confirm-box">
          ${preview.isValid ? modeOptions : '<p class="notice danger-note">El JSON está bloqueado: corrige el archivo o selecciona un respaldo válido.</p>'}
          <div class="form-actions">
            <button type="button" class="card-action" data-json-import-confirm ${preview.isValid && canImport ? '' : 'disabled'}>Confirmar importación JSON</button>
            <button type="button" class="secondary-action" data-json-import-cancel>Cancelar</button>
          </div>
        </div>
      </div>
    `;
  }

  function getJsonRecordCounts(dataSource) {
    const data = isPlainObject(dataSource) ? dataSource : {};
    const catalogos = CATALOGS.reduce((sum, catalog) => sum + (Array.isArray(data[catalog.id]) ? data[catalog.id].length : 0), 0);
    const counts = {
      catalogos,
      ventas: Array.isArray(data.ventas) ? data.ventas.length : 0,
      cobros: Array.isArray(data.cobros) ? data.cobros.length : 0,
      comprasProveedores: Array.isArray(data.comprasProveedores) ? data.comprasProveedores.length : 0,
      pagosProveedores: Array.isArray(data.pagosProveedores) ? data.pagosProveedores.length : 0,
      gastos: Array.isArray(data.gastos) ? data.gastos.length : 0,
      cierresMensuales: Array.isArray(data.cierresMensuales) ? data.cierresMensuales.length : 0,
      exportacionesExcel: Array.isArray(data.exportacionesExcel) ? data.exportacionesExcel.length : 0
    };
    counts.total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    return counts;
  }

  function buildJsonBackupPayload() {
    const snapshot = normalizeData(appData);
    const exportedAt = nowIso();
    const counts = getJsonRecordCounts(snapshot);
    const catalogos = CATALOGS.reduce((acc, catalog) => {
      acc[catalog.id] = snapshot[catalog.id] || [];
      return acc;
    }, {});

    return {
      metadata: {
        appName: APP_NAME,
        appVersion: APP_VERSION,
        schemaVersion: SCHEMA_VERSION,
        exportedAt,
        fechaExportacion: exportedAt,
        recordCounts: counts,
        source: 'KSA PRÁCTIKA respaldo JSON manual'
      },
      appName: APP_NAME,
      schemaVersion: SCHEMA_VERSION,
      fechaExportacion: exportedAt,
      registros: {
        catalogos,
        ventas: snapshot.ventas || [],
        cobros: snapshot.cobros || [],
        comprasProveedores: snapshot.comprasProveedores || [],
        pagosProveedores: snapshot.pagosProveedores || [],
        gastos: snapshot.gastos || [],
        cierres: snapshot.cierresMensuales || [],
        cierresMensuales: snapshot.cierresMensuales || [],
        exportacionesExcel: snapshot.exportacionesExcel || [],
        configuracion: normalizeConfiguracion(snapshot.configuracion)
      }
    };
  }

  function exportJsonBackup() {
    if (!canCurrentRole('exportJson')) {
      configState.message = 'Solo Administrador puede exportar respaldos JSON.';
      configState.messageType = 'error';
      renderRoute();
      return;
    }

    const payload = buildJsonBackupPayload();
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
    anchor.href = url;
    anchor.download = `KSA_PRACTIKA_respaldo_${dateStamp}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    appData.configuracion = {
      ...normalizeConfiguracion(appData.configuracion),
      lastBackupAt: payload.fechaExportacion,
      updatedAt: nowIso()
    };
    configState.message = 'Respaldo JSON exportado y fecha de último respaldo actualizada.';
    configState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  async function handleJsonFileSelected(file) {
    if (!file) return;
    if (!canCurrentRole('importJson')) {
      jsonBackupState.message = 'Solo Administrador puede importar respaldos JSON.';
      jsonBackupState.messageType = 'error';
      renderRoute();
      return;
    }

    jsonBackupState = {
      fileName: file.name || '',
      isProcessing: true,
      preview: null,
      payload: null,
      message: 'Leyendo respaldo JSON...',
      messageType: 'success'
    };
    renderRoute();

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const result = validateJsonBackupPayload(parsed);
      jsonBackupState = {
        fileName: file.name || '',
        isProcessing: false,
        preview: result.preview,
        payload: result.data,
        message: result.preview.isValid
          ? 'JSON validado. Revisa la vista previa antes de importar.'
          : 'JSON bloqueado por errores de validación.',
        messageType: result.preview.isValid ? 'success' : 'error'
      };
    } catch (error) {
      jsonBackupState = {
        fileName: file.name || '',
        isProcessing: false,
        preview: null,
        payload: null,
        message: error instanceof SyntaxError ? 'El archivo no contiene JSON válido.' : (error.message || 'No se pudo leer el JSON seleccionado.'),
        messageType: 'error'
      };
    }

    renderRoute();
  }

  function validateJsonBackupPayload(raw) {
    const errors = [];
    const warnings = [];
    if (!isPlainObject(raw)) errors.push('La raíz del archivo debe ser un objeto JSON.');

    const metadata = isPlainObject(raw?.metadata) ? raw.metadata : null;
    if (!metadata) errors.push('Falta metadata del respaldo.');

    const appName = cleanText(raw?.appName || metadata?.appName || raw?.registros?.configuracion?.appName || raw?.configuracion?.appName);
    const schemaVersion = cleanText(raw?.schemaVersion || metadata?.schemaVersion || raw?.registros?.configuracion?.schemaVersion || raw?.configuracion?.schemaVersion);
    const backupDate = cleanText(raw?.fechaExportacion || raw?.exportedAt || metadata?.exportedAt || metadata?.fechaExportacion || metadata?.updatedAt || raw?.metadata?.createdAt);

    const extracted = extractDataFromJsonBackup(raw);
    if (!extracted.data) errors.push('No se encontró estructura compatible de registros.');
    if (appName && appName !== APP_NAME) warnings.push(`El appName del archivo es “${appName}”; se acepta solo si la estructura es compatible con KSA PRÁCTIKA.`);
    if (!appName && extracted.data) warnings.push('El respaldo no trae appName explícito; se validó por estructura compatible.');
    if (!schemaVersion) errors.push('Falta schemaVersion del respaldo.');
    if (!backupDate) errors.push('Falta fecha de respaldo/exportación.');

    const data = extracted.data || {};
    [...CATALOGS.map((catalog) => catalog.id), 'ventas', 'cobros', 'comprasProveedores', 'pagosProveedores', 'gastos', 'cierresMensuales'].forEach((key) => {
      if (!Array.isArray(data[key])) errors.push(`Falta array requerido: ${key}.`);
    });

    const normalized = errors.length ? null : normalizeData({
      ...data,
      configuracion: data.configuracion || {},
      metadata: {
        ...(metadata || {}),
        appName: APP_NAME,
        schemaVersion: schemaVersion || SCHEMA_VERSION,
        importedFromBackupAt: backupDate
      }
    });
    const counts = getJsonRecordCounts(data);
    if (counts.total <= 0) warnings.push('El respaldo no contiene registros operativos; puede ser una base vacía.');
    if (schemaVersion && schemaVersion !== SCHEMA_VERSION) warnings.push(`Schema del archivo: ${schemaVersion}. Schema actual: ${SCHEMA_VERSION}. Se intentará normalizar.`);

    const preview = {
      isValid: errors.length === 0,
      appName: appName || APP_NAME,
      schemaVersion,
      backupDate,
      counts,
      errors,
      warnings
    };
    return { preview, data: normalized };
  }

  function extractDataFromJsonBackup(raw) {
    if (!isPlainObject(raw)) return { data: null };
    if (isPlainObject(raw.registros)) {
      const registros = raw.registros;
      const catalogos = isPlainObject(registros.catalogos) ? registros.catalogos : {};
      return {
        data: {
          clientes: Array.isArray(catalogos.clientes) ? catalogos.clientes : registros.clientes,
          sucursales: Array.isArray(catalogos.sucursales) ? catalogos.sucursales : registros.sucursales,
          proveedores: Array.isArray(catalogos.proveedores) ? catalogos.proveedores : registros.proveedoresCatalogo || registros.proveedoresLista || registros.proveedores,
          tiposGasto: Array.isArray(catalogos.tiposGasto) ? catalogos.tiposGasto : registros.tiposGasto,
          metodosPago: Array.isArray(catalogos.metodosPago) ? catalogos.metodosPago : registros.metodosPago,
          cuentasBancos: Array.isArray(catalogos.cuentasBancos) ? catalogos.cuentasBancos : registros.cuentasBancos,
          ventas: registros.ventas,
          cobros: registros.cobros,
          comprasProveedores: registros.comprasProveedores || registros.proveedoresCompras || registros.compras || [],
          pagosProveedores: registros.pagosProveedores || registros.pagos || [],
          gastos: registros.gastos,
          cierresMensuales: registros.cierresMensuales || registros.cierres || [],
          exportacionesExcel: registros.exportacionesExcel || [],
          configuracion: registros.configuracion || raw.configuracion || {}
        }
      };
    }

    const hasFlatArrays = CATALOGS.some((catalog) => Array.isArray(raw[catalog.id])) || DATA_KEYS.some((key) => Array.isArray(raw[key]));
    if (!hasFlatArrays) return { data: null };
    return {
      data: {
        clientes: raw.clientes,
        sucursales: raw.sucursales,
        proveedores: raw.proveedores,
        tiposGasto: raw.tiposGasto,
        metodosPago: raw.metodosPago,
        cuentasBancos: raw.cuentasBancos,
        ventas: raw.ventas,
        cobros: raw.cobros,
        comprasProveedores: raw.comprasProveedores,
        pagosProveedores: raw.pagosProveedores,
        gastos: raw.gastos,
        cierresMensuales: raw.cierresMensuales || [],
        exportacionesExcel: raw.exportacionesExcel || [],
        configuracion: raw.configuracion || {}
      }
    };
  }

  function confirmJsonImport(mode) {
    if (!canCurrentRole('importJson')) {
      jsonBackupState.message = 'Solo Administrador puede importar respaldos JSON.';
      jsonBackupState.messageType = 'error';
      renderRoute();
      return;
    }
    if (!jsonBackupState.payload || !jsonBackupState.preview?.isValid) {
      jsonBackupState.message = 'Primero selecciona y valida un JSON correcto.';
      jsonBackupState.messageType = 'error';
      renderRoute();
      return;
    }

    const selectedMode = mode === 'replace' ? 'replace' : 'merge';
    if (selectedMode === 'replace') {
      const ok = window.confirm('Vas a reemplazar los datos actuales por el respaldo JSON validado. Esta acción no sincroniza ni conserva la base local anterior salvo que ya la hayas exportado. ¿Continuar?');
      if (!ok) return;
    } else {
      const ok = window.confirm('Vas a fusionar el respaldo JSON con los datos actuales evitando duplicados por ID y claves naturales. ¿Continuar?');
      if (!ok) return;
    }

    const result = applyJsonBackupPayload(jsonBackupState.payload, selectedMode);
    saveData(appData);
    jsonBackupState.preview = null;
    jsonBackupState.payload = null;
    jsonBackupState.message = selectedMode === 'replace'
      ? `Importación JSON completada por reemplazo. Registros cargados: ${result.loaded.total}.`
      : `Importación JSON completada por fusión. Agregados: ${result.added.total}. Duplicados omitidos: ${result.skipped}.`;
    jsonBackupState.messageType = 'success';
    renderRoute();
  }

  function applyJsonBackupPayload(importData, mode) {
    const timestamp = nowIso();
    const incoming = normalizeData(importData);
    const loaded = getJsonRecordCounts(incoming);
    if (mode === 'replace') {
      const activeRole = getCurrentRole();
      appData = normalizeData({
        ...incoming,
        configuracion: {
          ...incoming.configuracion,
          currentRole: activeRole,
          lastImportAt: timestamp,
          updatedAt: timestamp
        },
        metadata: {
          ...incoming.metadata,
          importedAt: timestamp,
          updatedAt: timestamp
        }
      });
      return { loaded, added: loaded, skipped: 0 };
    }

    const target = normalizeData(appData);
    const idMaps = buildCatalogMergeMaps(target, incoming, timestamp);
    const ventaIdMap = new Map();
    const compraIdMap = new Map();
    const added = { catalogos: 0, ventas: 0, cobros: 0, comprasProveedores: 0, pagosProveedores: 0, gastos: 0, cierresMensuales: 0, exportacionesExcel: 0, total: 0 };
    let skipped = 0;

    CATALOGS.forEach((catalog) => {
      added.catalogos += idMaps.__added?.[catalog.id] || 0;
    });

    incoming.ventas.forEach((venta) => {
      const remapped = normalizeVentaRecord({
        ...venta,
        clienteId: idMaps.clientes.get(venta.clienteId) || venta.clienteId,
        sucursalId: idMaps.sucursales.get(venta.sucursalId) || venta.sucursalId,
        updatedAt: venta.updatedAt || timestamp
      });
      const existing = target.ventas.find((item) => item.id === remapped.id || getVentaDuplicateKey(item) === getVentaDuplicateKey(remapped));
      if (existing) {
        ventaIdMap.set(venta.id, existing.id);
        skipped += 1;
        return;
      }
      target.ventas = [remapped, ...target.ventas];
      ventaIdMap.set(venta.id, remapped.id);
      added.ventas += 1;
    });

    incoming.comprasProveedores.forEach((compra) => {
      const remapped = normalizeCompraProveedorRecord({
        ...compra,
        proveedorId: idMaps.proveedores.get(compra.proveedorId) || compra.proveedorId,
        updatedAt: compra.updatedAt || timestamp
      });
      const existing = target.comprasProveedores.find((item) => item.id === remapped.id || getCompraDuplicateKey(item) === getCompraDuplicateKey(remapped));
      if (existing) {
        compraIdMap.set(compra.id, existing.id);
        skipped += 1;
        return;
      }
      target.comprasProveedores = [remapped, ...target.comprasProveedores];
      compraIdMap.set(compra.id, remapped.id);
      added.comprasProveedores += 1;
    });

    incoming.cobros.forEach((cobro) => {
      const ventaId = ventaIdMap.get(cobro.ventaId) || cobro.ventaId;
      const remapped = normalizeCobroRecord({
        ...cobro,
        ventaId,
        clienteId: idMaps.clientes.get(cobro.clienteId) || cobro.clienteId,
        sucursalId: idMaps.sucursales.get(cobro.sucursalId) || cobro.sucursalId,
        updatedAt: cobro.updatedAt || timestamp
      });
      const existing = target.cobros.find((item) => item.id === remapped.id || getCobroDuplicateKey(item) === getCobroDuplicateKey(remapped));
      if (existing) {
        skipped += 1;
        return;
      }
      target.cobros = [remapped, ...target.cobros];
      added.cobros += 1;
    });

    incoming.pagosProveedores.forEach((pago) => {
      const compraProveedorId = compraIdMap.get(pago.compraProveedorId) || pago.compraProveedorId;
      const remapped = normalizePagoProveedorRecord({
        ...pago,
        compraProveedorId,
        proveedorId: idMaps.proveedores.get(pago.proveedorId) || pago.proveedorId,
        updatedAt: pago.updatedAt || timestamp
      });
      const existing = target.pagosProveedores.find((item) => item.id === remapped.id || getPagoDuplicateKey(item) === getPagoDuplicateKey(remapped));
      if (existing) {
        skipped += 1;
        return;
      }
      target.pagosProveedores = [remapped, ...target.pagosProveedores];
      added.pagosProveedores += 1;
    });

    incoming.gastos.forEach((gasto) => {
      const remapped = normalizeGastoRecord({
        ...gasto,
        tipoGastoId: idMaps.tiposGasto.get(gasto.tipoGastoId) || gasto.tipoGastoId,
        metodoPagoId: idMaps.metodosPago.get(gasto.metodoPagoId) || gasto.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(gasto.cuentaBancoId) || gasto.cuentaBancoId,
        updatedAt: gasto.updatedAt || timestamp
      });
      const existing = target.gastos.find((item) => item.id === remapped.id || getGastoDuplicateKey(item) === getGastoDuplicateKey(remapped));
      if (existing) {
        skipped += 1;
        return;
      }
      target.gastos = [remapped, ...target.gastos];
      added.gastos += 1;
    });

    incoming.cierresMensuales.forEach((cierre) => {
      const normalized = normalizeCierreMensualRecord(cierre);
      const id = cleanText(normalized.id || normalized.periodo || '');
      const existing = target.cierresMensuales.find((item) => cleanText(item.id || item.periodo) === id && id);
      if (existing) {
        skipped += 1;
        return;
      }
      target.cierresMensuales = [normalized, ...target.cierresMensuales];
      added.cierresMensuales += 1;
    });

    incoming.exportacionesExcel.forEach((exportacion) => {
      const normalized = normalizeExcelExportRecord(exportacion);
      const id = cleanText(normalized.id || normalized.nombreArchivo || normalized.periodo || '');
      const existing = target.exportacionesExcel.find((item) => cleanText(item.id || item.nombreArchivo || item.periodo) === id && id);
      if (existing) {
        skipped += 1;
        return;
      }
      target.exportacionesExcel = [normalized, ...target.exportacionesExcel];
      added.exportacionesExcel += 1;
    });

    target.ventas = recalculateVentasWithCobros(target.ventas, target.cobros);
    target.comprasProveedores = recalculateComprasProveedoresWithPagos(target.comprasProveedores, target.pagosProveedores);
    added.total = added.catalogos + added.ventas + added.cobros + added.comprasProveedores + added.pagosProveedores + added.gastos + added.cierresMensuales + added.exportacionesExcel;
    appData = normalizeData({
      ...target,
      configuracion: {
        ...target.configuracion,
        lastImportAt: timestamp,
        updatedAt: timestamp
      },
      metadata: {
        ...target.metadata,
        importedAt: timestamp,
        updatedAt: timestamp
      }
    });
    return { loaded, added, skipped };
  }

  function buildCatalogMergeMaps(target, incoming, timestamp) {
    const idMaps = { __added: {} };
    CATALOGS.forEach((catalog) => {
      idMaps[catalog.id] = new Map();
      idMaps.__added[catalog.id] = 0;
      incoming[catalog.id].forEach((record) => {
        const normalized = normalizeCatalogRecord(record, catalog);
        const existing = target[catalog.id].find((item) => item.id === normalized.id || normalizeNameForCompare(item.nombre) === normalizeNameForCompare(normalized.nombre));
        if (existing) {
          idMaps[catalog.id].set(normalized.id, existing.id);
          return;
        }
        const toInsert = normalizeCatalogRecord({ ...normalized, updatedAt: normalized.updatedAt || timestamp }, catalog);
        target[catalog.id] = [toInsert, ...target[catalog.id]];
        idMaps[catalog.id].set(normalized.id, toInsert.id);
        idMaps.__added[catalog.id] += 1;
      });
    });
    return idMaps;
  }

  function getCobroDuplicateKey(record) {
    const cobro = normalizeCobroRecord(record);
    return [cobro.ventaId, cobro.fechaCobro, roundMoney(cobro.montoCobrado), cobro.metodoPagoId || normalizeNameForCompare(cobro.metodoPagoNombre)].join('|');
  }

  function getPagoDuplicateKey(record) {
    const pago = normalizePagoProveedorRecord(record);
    return [pago.compraProveedorId, pago.fechaPago, roundMoney(pago.montoPagado), pago.metodoPagoId || normalizeNameForCompare(pago.metodoPagoNombre)].join('|');
  }

  function clearJsonImportState() {
    jsonBackupState = {
      fileName: '',
      isProcessing: false,
      preview: null,
      payload: null,
      message: null,
      messageType: 'success'
    };
    renderRoute();
  }

  function updateConfigFromForm(form) {
    if (!canCurrentRole('changeConfig')) {
      configState.message = 'Solo Administrador puede cambiar la configuración general.';
      configState.messageType = 'error';
      renderRoute();
      return;
    }
    const formData = new FormData(form);
    const alertDays = parsePositiveInteger(formData.get('diasAlertaVencimiento'));
    if (Number.isNaN(alertDays) || alertDays <= 0) {
      configState.message = 'Los días de alerta deben ser un entero mayor que cero.';
      configState.messageType = 'error';
      renderRoute();
      return;
    }
    appData.configuracion = normalizeConfiguracion({
      ...appData.configuracion,
      appDisplayName: cleanText(formData.get('appDisplayName')) || APP_NAME,
      monedaPrincipal: cleanText(formData.get('monedaPrincipal')) || 'NIO',
      diasAlertaVencimiento: alertDays,
      excelReferencia: cleanText(formData.get('excelReferencia')) || '0000- CONTROL.xlsx',
      updatedAt: nowIso()
    });
    configState.message = 'Configuración general actualizada.';
    configState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function setCurrentRole(roleId) {
    const safeRole = ROLE_DEFINITIONS[roleId] ? roleId : 'usuario';
    appData.configuracion = normalizeConfiguracion({
      ...appData.configuracion,
      currentRole: safeRole,
      updatedAt: nowIso()
    });
    configState.message = `Rol activo cambiado a ${ROLE_DEFINITIONS[safeRole].label}.`;
    configState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }


  function renderImportarExcel() {
    const module = MODULES.find((item) => item.id === 'excel');
    const totalRecords = getOperationalRecordCount();
    const preview = excelImportState.preview;
    const hasPreview = Boolean(preview && excelImportState.payload);
    const canImportExcel = canCurrentRole('importExcel');
    const warningItems = preview?.warnings?.length
      ? `<ul class="import-warning-list">${preview.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join('')}</ul>`
      : '<p class="muted-text">Sin advertencias fuertes. Excel se portó serio, algo raro pero bienvenido.</p>';
    const sheetItems = preview?.sheets?.length
      ? preview.sheets.map((sheet) => `
        <div class="data-pill"><span>${escapeHtml(sheet.name)}</span><strong>${sheet.rows}</strong></div>
      `).join('')
      : '<div class="data-pill"><span>Hojas detectadas</span><strong>0</strong></div>';
    const headerItems = preview?.headers?.length
      ? preview.headers.map((item) => `
        <details class="import-detail">
          <summary>${escapeHtml(item.sheet)} <span>${item.headers.length} encabezados</span></summary>
          <p>${escapeHtml(item.headers.join(' · ') || 'Sin encabezados legibles')}</p>
        </details>
      `).join('')
      : '<p class="muted-text">Selecciona un archivo para revisar encabezados.</p>';
    const modeBlock = totalRecords > 0
      ? `
        <label class="form-field">
          <span>Modo de importación</span>
          <select data-import-mode>
            <option value="merge">Fusionar con datos actuales evitando duplicados obvios</option>
            <option value="replace">Reemplazar datos operativos actuales por lo importado</option>
          </select>
        </label>
        <p class="notice">Ya existen ${totalRecords} registros operativos. Confirma si deseas fusionar o reemplazar. Aquí no se juega ruleta rusa con la cartera.</p>
      `
      : `
        <input type="hidden" data-import-mode value="merge" />
        <p class="notice">La base operativa está vacía. La importación agregará los datos iniciales detectados.</p>
      `;

    return `
      <section class="hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>${escapeHtml(module.title)}</h1>
          <p class="lead">Carga inicial manual desde 0000- CONTROL.xlsx o una versión compatible. El Excel se lee una vez, se valida y luego la app sigue siendo la base principal.</p>
        </div>
        <aside class="hero-status" aria-label="Estado de importación Excel">
          <h3>Importador</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Librería</strong><span>JSZip local</span></div>
            <div class="status-item"><strong>Estado</strong><span>${hasPreview ? 'Validado' : 'Pendiente'}</span></div>
            <div class="status-item"><strong>Archivo</strong><span>${escapeHtml(excelImportState.fileName || 'Sin seleccionar')}</span></div>
            <div class="status-item"><strong>Base actual</strong><span>${totalRecords}</span></div>
          </div>
        </aside>
      </section>

      <section class="import-shell">
        <article class="panel-card import-card">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">1. Seleccionar y validar</span>
              <h2>Archivo Excel de origen</h2>
            </div>
          </div>
          <p class="notice">Se aceptan archivos .xlsx. El importador intenta leer hojas Ventas, Proveedores, Gastos y Catálogos, detecta encabezados mínimos y muestra resumen antes de tocar localStorage.</p>
          ${renderRolePermissionNotice('importExcel', 'Importar Excel queda reservado para Administrador.')}
          ${excelImportState.message ? `<div class="form-message is-${escapeHtml(excelImportState.messageType)}">${escapeHtml(excelImportState.message)}</div>` : ''}
          <label class="form-field">
            <span>Seleccionar archivo .xlsx</span>
            <input type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" data-excel-file ${canImportExcel ? '' : 'disabled'} />
          </label>
          <div class="badge-row">
            <span class="badge">Ventas</span>
            <span class="badge">Proveedores</span>
            <span class="badge">Gastos</span>
            <span class="badge">Catálogos</span>
            <span class="badge">Sin backend</span>
            <span class="badge">Offline básico</span>
          </div>
        </article>

        <article class="panel-card import-card">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">2. Resumen previo</span>
              <h2>Datos detectados</h2>
            </div>
          </div>
          ${hasPreview ? `
            <div class="import-summary-grid">
              <div class="status-item"><strong>Ventas</strong><span>${preview.counts.ventas}</span></div>
              <div class="status-item"><strong>Proveedores</strong><span>${preview.counts.proveedores}</span></div>
              <div class="status-item"><strong>Gastos</strong><span>${preview.counts.gastos}</span></div>
              <div class="status-item"><strong>Catálogos</strong><span>${preview.counts.catalogos}</span></div>
              <div class="status-item"><strong>Cobros generados</strong><span>${preview.counts.cobros}</span></div>
              <div class="status-item"><strong>Pagos generados</strong><span>${preview.counts.pagos}</span></div>
            </div>
            <h3>Hojas leídas</h3>
            <div class="data-list">${sheetItems}</div>
            <h3>Advertencias</h3>
            ${warningItems}
            <h3>Encabezados detectados</h3>
            <div class="import-detail-list">${headerItems}</div>
            <div class="import-confirm-box">
              ${modeBlock}
              <div class="form-actions">
                <button type="button" class="card-action" data-import-confirm ${canImportExcel ? '' : 'disabled'}>Confirmar importación</button>
                <button type="button" class="secondary-action" data-import-cancel>Cancelar</button>
              </div>
            </div>
          ` : `
            <div class="empty-state">
              <strong>Selecciona un Excel para ver el resumen.</strong>
              <p>Primero validamos, después importamos. Ese orden evita tragedias administrativas con apellido en mayúscula.</p>
            </div>
          `}
        </article>
      </section>

      ${renderExcelExportCierrePanel()}
    `;
  }

  function renderExcelExportCierrePanel() {
    const monthOptions = getMonthOptions();
    const yearOptions = getResumenYearOptions();
    const exportMonth = /^\d{2}$/.test(excelExportState.month) ? excelExportState.month : String(new Date().getMonth() + 1).padStart(2, '0');
    const exportYear = /^\d{4}$/.test(excelExportState.year) ? excelExportState.year : String(new Date().getFullYear());
    const closeMonth = /^\d{2}$/.test(cierreMensualState.month) ? cierreMensualState.month : exportMonth;
    const closeYear = /^\d{4}$/.test(cierreMensualState.year) ? cierreMensualState.year : exportYear;
    const lastExport = getLastExcelExportForPeriod(closeMonth, closeYear);
    const cierre = getCierreMensualForPeriod(closeMonth, closeYear);
    const canExportExcel = canCurrentRole('exportExcel');
    const canClose = canCurrentRole('closeMonth');
    const cierres = getCierresMensuales().slice(0, 8);

    return `
      <section class="excel-stage-shell">
        <article class="panel-card import-card full-span">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">3. Exportación final</span>
              <h2>Exportar Excel del período</h2>
            </div>
          </div>
          ${excelExportState.message ? `<div class="form-message ${excelExportState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(excelExportState.message)}</div>` : ''}
          ${renderRolePermissionNotice('exportExcel', 'Exportar Excel queda reservado para Administrador en esta protección local.')}
          <p class="notice">Genera un .xlsx como fotografía del período. La base viva sigue siendo la webapp; el Excel es reporte, no el trono.</p>
          <form class="period-form" data-excel-export-form novalidate>
            <div class="form-grid compact-period-grid">
              <label class="form-field">
                <span>Mes</span>
                <select name="month">
                  ${monthOptions.map((item) => `<option value="${escapeHtml(item.value)}" ${item.value === exportMonth ? 'selected' : ''}>${escapeHtml(item.label)}</option>`).join('')}
                </select>
              </label>
              <label class="form-field">
                <span>Año</span>
                <select name="year">
                  ${yearOptions.map((year) => `<option value="${escapeHtml(year)}" ${year === exportYear ? 'selected' : ''}>${escapeHtml(year)}</option>`).join('')}
                </select>
              </label>
            </div>
            <div class="form-actions">
              <button type="submit" class="card-action" ${canExportExcel ? '' : 'disabled'}>Exportar Excel .xlsx</button>
            </div>
          </form>
          <div class="badge-row">
            <span class="badge">Resumen</span>
            <span class="badge">Ventas</span>
            <span class="badge">Proveedores</span>
            <span class="badge">Gastos</span>
            <span class="badge">Catálogos</span>
            <span class="badge">JSZip local</span>
          </div>
        </article>

        <article class="panel-card import-card full-span">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">4. Cierre mensual</span>
              <h2>Cerrar período</h2>
            </div>
          </div>
          ${cierreMensualState.message ? `<div class="form-message ${cierreMensualState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(cierreMensualState.message)}</div>` : ''}
          ${renderRolePermissionNotice('closeMonth', 'Cerrar mes queda reservado para Administrador.')}
          <p class="notice ${cierre ? 'success-note' : ''}">${cierre ? `Período cerrado el ${escapeHtml(formatDateTime(cierre.fechaHoraCierre))}. Las ediciones posteriores quedan con advertencia clara.` : 'Para cerrar, primero debe existir una exportación Excel guardada para el mismo mes/año. Sin Excel previo, no hay cierre: aquí la caja no firma recibos invisibles.'}</p>
          <form class="period-form" data-cierre-form novalidate>
            <div class="form-grid compact-period-grid">
              <label class="form-field">
                <span>Mes</span>
                <select name="month">
                  ${monthOptions.map((item) => `<option value="${escapeHtml(item.value)}" ${item.value === closeMonth ? 'selected' : ''}>${escapeHtml(item.label)}</option>`).join('')}
                </select>
              </label>
              <label class="form-field">
                <span>Año</span>
                <select name="year">
                  ${yearOptions.map((year) => `<option value="${escapeHtml(year)}" ${year === closeYear ? 'selected' : ''}>${escapeHtml(year)}</option>`).join('')}
                </select>
              </label>
            </div>
            <div class="import-summary-grid compact-summary">
              <div class="status-item"><strong>Excel previo</strong><span>${lastExport ? 'Sí' : 'No'}</span></div>
              <div class="status-item"><strong>Archivo</strong><span>${escapeHtml(lastExport?.nombreArchivo || '—')}</span></div>
              <div class="status-item"><strong>Exportado</strong><span>${escapeHtml(formatDateTime(lastExport?.exportadoAt))}</span></div>
              <div class="status-item"><strong>Estado cierre</strong><span>${cierre ? 'Cerrado' : 'Abierto'}</span></div>
            </div>
            <div class="form-actions">
              <button type="submit" class="card-action" ${canClose && !cierre ? '' : 'disabled'}>Cerrar mes</button>
            </div>
          </form>
        </article>

        <article class="panel-card import-card full-span">
          <div class="section-title-row">
            <div>
              <span class="eyebrow mini">Historial</span>
              <h2>Cierres recientes</h2>
            </div>
          </div>
          ${cierres.length ? `
            <div class="closing-list">
              ${cierres.map((item) => `
                <div class="closing-card">
                  <strong>${escapeHtml(getMonthLabel(item.month))} ${escapeHtml(item.year)}</strong>
                  <span>${escapeHtml(formatDateTime(item.fechaHoraCierre))}</span>
                  <p>${escapeHtml(item.nombreArchivoExcel || 'Sin nombre de archivo registrado')}</p>
                </div>
              `).join('')}
            </div>
          ` : `<div class="empty-state"><strong>Sin cierres registrados.</strong><p>Cuando cierres un mes, aparecerá aquí con fecha, rol y archivo Excel usado.</p></div>`}
        </article>
      </section>
    `;
  }

  function getMonthLabel(month) {
    const item = getMonthOptions().find((option) => option.value === String(month).padStart(2, '0'));
    return item?.label || month || 'Mes';
  }

  function getPeriodKey(month, year) {
    const safeMonth = /^\d{2}$/.test(String(month || '')) ? String(month) : String(new Date().getMonth() + 1).padStart(2, '0');
    const safeYear = /^\d{4}$/.test(String(year || '')) ? String(year) : String(new Date().getFullYear());
    return `${safeYear}-${safeMonth}`;
  }

  function getExcelExports() {
    return (Array.isArray(appData.exportacionesExcel) ? appData.exportacionesExcel : [])
      .map((record) => normalizeExcelExportRecord(record))
      .sort((a, b) => String(b.exportadoAt).localeCompare(String(a.exportadoAt)));
  }

  function getCierresMensuales() {
    return (Array.isArray(appData.cierresMensuales) ? appData.cierresMensuales : [])
      .map((record) => normalizeCierreMensualRecord(record))
      .sort((a, b) => String(b.fechaHoraCierre).localeCompare(String(a.fechaHoraCierre)));
  }

  function getLastExcelExportForPeriod(month, year) {
    const key = getPeriodKey(month, year);
    return getExcelExports().find((record) => record.periodo === key) || null;
  }

  function getCierreMensualForPeriod(month, year) {
    const key = getPeriodKey(month, year);
    return getCierresMensuales().find((record) => record.periodo === key) || null;
  }

  function getPeriodFromForm(form) {
    const formData = new FormData(form);
    const month = /^\d{2}$/.test(String(formData.get('month') || '')) ? String(formData.get('month')) : String(new Date().getMonth() + 1).padStart(2, '0');
    const year = /^\d{4}$/.test(String(formData.get('year') || '')) ? String(formData.get('year')) : String(new Date().getFullYear());
    return { month, year, periodo: getPeriodKey(month, year) };
  }

  async function handleExcelExportSubmit(form) {
    if (!canCurrentRole('exportExcel')) {
      excelExportState.message = 'Solo Administrador puede exportar Excel.';
      excelExportState.messageType = 'error';
      renderRoute();
      return;
    }

    const { month, year, periodo } = getPeriodFromForm(form);
    excelExportState.month = month;
    excelExportState.year = year;
    excelExportState.message = 'Generando Excel del período...';
    excelExportState.messageType = 'success';
    renderRoute();

    try {
      const result = await exportExcelForPeriod(month, year);
      const record = normalizeExcelExportRecord({
        id: generateId('exportExcel'),
        periodo,
        month,
        year,
        nombreArchivo: result.fileName,
        exportadoAt: result.exportedAt,
        totales: result.totales,
        hojas: result.hojas
      });
      appData.exportacionesExcel = [record, ...getExcelExports()];
      saveData(appData);
      excelExportState.message = `Excel exportado: ${result.fileName}. Hojas: ${result.hojas.join(', ')}.`;
      excelExportState.messageType = 'success';
      cierreMensualState.month = month;
      cierreMensualState.year = year;
      cierreMensualState.message = null;
    } catch (error) {
      console.error('KSA PRÁCTIKA: error al exportar Excel.', error);
      excelExportState.message = error.message || 'No se pudo generar el Excel.';
      excelExportState.messageType = 'error';
    }

    renderRoute();
  }

  function handleCierreMensualSubmit(form) {
    if (!canCurrentRole('closeMonth')) {
      cierreMensualState.message = 'Solo Administrador puede cerrar meses.';
      cierreMensualState.messageType = 'error';
      renderRoute();
      return;
    }

    const { month, year, periodo } = getPeriodFromForm(form);
    cierreMensualState.month = month;
    cierreMensualState.year = year;
    const existing = getCierreMensualForPeriod(month, year);
    if (existing) {
      cierreMensualState.message = `El período ${getMonthLabel(month)} ${year} ya está cerrado.`;
      cierreMensualState.messageType = 'error';
      renderRoute();
      return;
    }

    const lastExport = getLastExcelExportForPeriod(month, year);
    if (!lastExport) {
      cierreMensualState.message = `No se puede cerrar ${getMonthLabel(month)} ${year}: primero exporta Excel para ese mismo mes/año.`;
      cierreMensualState.messageType = 'error';
      renderRoute();
      return;
    }

    const ok = window.confirm(`Vas a cerrar ${getMonthLabel(month)} ${year}. Se usará el Excel ${lastExport.nombreArchivo}. Las ediciones futuras del período mostrarán advertencia. ¿Continuar?`);
    if (!ok) return;

    const summary = buildResumenSummaryForFilters({ month, year });
    const cierre = normalizeCierreMensualRecord({
      id: `cierre_${periodo}`,
      periodo,
      month,
      year,
      fechaHoraCierre: nowIso(),
      usuarioRol: getCurrentRoleDefinition().label,
      nombreArchivoExcel: lastExport.nombreArchivo,
      exportacionExcelId: lastExport.id,
      modoEdicion: 'advertencia',
      totales: buildClosingTotals(summary),
      observacion: 'Cierre mensual con exportación Excel previa obligatoria. Edición posterior bajo advertencia.'
    });

    appData.cierresMensuales = [cierre, ...getCierresMensuales()];
    saveData(appData);
    cierreMensualState.message = `Cierre mensual registrado para ${getMonthLabel(month)} ${year}.`;
    cierreMensualState.messageType = 'success';
    renderRoute();
  }

  function buildClosingTotals(summary) {
    return {
      totalVendido: roundMoney(summary.totalVendido),
      totalCobradoClientes: roundMoney(summary.totalCobradoClientes),
      saldoPorCobrar: roundMoney(summary.saldoPorCobrar),
      totalComprasProveedores: roundMoney(summary.totalComprasProveedores),
      totalPagadoProveedores: roundMoney(summary.totalPagadoProveedores),
      saldoPorPagar: roundMoney(summary.saldoPorPagar),
      totalGastos: roundMoney(summary.totalGastos),
      flujoPeriodo: roundMoney(summary.flujoPeriodo),
      clientesMora: summary.clientesMora.length,
      proveedoresMora: summary.proveedoresMora.length
    };
  }

  function warnIfClosedPeriod(dateInput, actionLabel) {
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return true;
    const month = safeDate.slice(5, 7);
    const year = safeDate.slice(0, 4);
    const cierre = getCierreMensualForPeriod(month, year);
    if (!cierre) return true;
    return window.confirm(`Advertencia: ${getMonthLabel(month)} ${year} está cerrado desde ${formatDateTime(cierre.fechaHoraCierre)}. ${actionLabel || 'Editar este movimiento'} dejará trazabilidad, pero modifica un período cerrado. ¿Continuar?`);
  }

  async function exportExcelForPeriod(month, year) {
    if (typeof window.JSZip === 'undefined') {
      throw new Error('No se encontró JSZip local. La exportación Excel necesita la librería incluida en vendor/jszip.min.js.');
    }
    const workbook = buildExcelWorkbookForPeriod(month, year);
    const zip = buildXlsxZip(workbook);
    const blob = await zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      compression: 'DEFLATE'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = workbook.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    return {
      fileName: workbook.fileName,
      exportedAt: workbook.exportedAt,
      hojas: workbook.sheets.map((sheet) => sheet.name),
      totales: workbook.totales
    };
  }

  function buildExcelWorkbookForPeriod(month, year) {
    const summary = buildResumenSummaryForFilters({ month, year });
    const exportedAt = nowIso();
    const label = summary.periodLabel;
    const fileName = `KSA_PRACTIKA_${year}_${month}_CONTROL.xlsx`;
    return {
      fileName,
      exportedAt,
      totales: buildClosingTotals(summary),
      sheets: [
        buildResumenSheet(summary, label, exportedAt),
        buildVentasSheet(summary),
        buildProveedoresSheet(summary),
        buildGastosSheet(summary),
        buildCatalogosSheet()
      ]
    };
  }

  function buildResumenSheet(summary, label, exportedAt) {
    const rows = [
      [xlsxTitle('KSA PRÁCTIKA — Resumen')],
      [xlsxLabel('Corte o período exportado'), xlsxText(label)],
      [xlsxLabel('Fecha/hora de exportación'), xlsxText(formatDateTime(exportedAt))],
      [],
      xlsxHeaderRow(['Indicador', 'Valor']),
      [xlsxText('Total vendido'), xlsxMoney(summary.totalVendido)],
      [xlsxText('Total cobrado clientes'), xlsxMoney(summary.totalCobradoClientes)],
      [xlsxText('Saldo por cobrar'), xlsxMoney(summary.saldoPorCobrar)],
      [xlsxText('Total compras/proveedores'), xlsxMoney(summary.totalComprasProveedores)],
      [xlsxText('Total pagado proveedores'), xlsxMoney(summary.totalPagadoProveedores)],
      [xlsxText('Saldo por pagar'), xlsxMoney(summary.saldoPorPagar)],
      [xlsxText('Total gastos'), xlsxMoney(summary.totalGastos)],
      [xlsxText('Flujo del período'), xlsxMoney(summary.flujoPeriodo)],
      [xlsxText('Clientes en mora'), xlsxNumber(summary.clientesMora.length)],
      [xlsxText('Proveedores en mora'), xlsxNumber(summary.proveedoresMora.length)],
      [],
      xlsxHeaderRow(['Gastos por tipo', 'Total', 'Cantidad'])
    ];
    summary.gastosPorTipo.forEach((item) => rows.push([xlsxText(item.tipo), xlsxMoney(item.total), xlsxNumber(item.cantidad)]));
    rows.push([], xlsxHeaderRow(['Total vendido por sucursal', 'Total vendido', 'Total cobrado', 'Saldo por cobrar', 'Documentos']));
    summary.ventaPorSucursal.forEach((item) => rows.push([xlsxText(item.sucursal), xlsxMoney(item.totalVendido), xlsxMoney(item.totalCobrado), xlsxMoney(item.saldoPorCobrar), xlsxNumber(item.documentos)]));
    rows.push([], xlsxHeaderRow(['Saldos por proveedor', 'Total compra/deuda', 'Total pagado', 'Saldo por pagar', 'Documentos']));
    summary.saldosPorProveedor.forEach((item) => rows.push([xlsxText(item.proveedor), xlsxMoney(item.totalCompra), xlsxMoney(item.totalPagado), xlsxMoney(item.saldoPorPagar), xlsxNumber(item.documentos)]));
    rows.push([], xlsxHeaderRow(['Clientes en mora', 'Sucursal', 'OC/documento', 'Fecha vencimiento', 'Días mora', 'Saldo pendiente', 'Estado']));
    summary.clientesMora.forEach((item) => rows.push([xlsxText(item.cliente), xlsxText(item.sucursal), xlsxText(item.documento), xlsxDate(item.fechaVencimiento), xlsxNumber(item.diasMora), xlsxMoney(item.saldoPendiente), xlsxText(item.estado)]));
    rows.push([], xlsxHeaderRow(['Proveedores en mora', 'Factura/referencia', 'Fecha vencimiento', 'Días mora', 'Saldo pendiente', 'Estado']));
    summary.proveedoresMora.forEach((item) => rows.push([xlsxText(item.proveedor), xlsxText(item.referencia), xlsxDate(item.fechaVencimiento), xlsxNumber(item.diasMora), xlsxMoney(item.saldoPendiente), xlsxText(item.estado)]));

    return { name: 'Resumen', rows, cols: [28, 18, 18, 18, 14, 18, 18] };
  }

  function buildVentasSheet(summary) {
    const rows = [
      [xlsxTitle('Ventas / OC')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha OC', 'Cliente', 'Sucursal', 'OC/documento', 'Monto OC', 'NO VA', 'Descuento', 'Descuento NO VA', 'Venta neta', 'Total cobrado', 'Saldo por cobrar', 'Fecha vencimiento', 'Días mora', 'Estado', 'Observación'])
    ];
    getVentasForExport(summary.range, summary.filters).forEach((venta) => {
      const cliente = getCatalogRecordById('clientes', venta.clienteId);
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      rows.push([
        xlsxDate(venta.fechaOc),
        xlsxText(cliente?.nombre || venta.clienteNombre || 'Cliente no encontrado'),
        xlsxText(sucursal?.nombre || venta.sucursalNombre || 'Sucursal no encontrada'),
        xlsxText(venta.numeroDocumento),
        xlsxMoney(venta.montoOc),
        xlsxMoney(venta.noVa),
        xlsxMoney(venta.descuento),
        xlsxMoney(venta.descuentoNoVa),
        xlsxMoney(venta.ventaNeta),
        xlsxMoney(venta.totalCobrado),
        xlsxMoney(venta.saldoPorCobrar),
        xlsxDate(venta.fechaVencimiento),
        xlsxNumber(getDaysOverdue(venta.fechaVencimiento)),
        xlsxText(venta.estado),
        xlsxText(venta.observacion)
      ]);
    });
    return { name: 'Ventas', rows, cols: [14, 24, 24, 18, 14, 14, 14, 16, 14, 16, 16, 16, 12, 14, 32] };
  }

  function buildProveedoresSheet(summary) {
    const rows = [
      [xlsxTitle('Proveedores / Compras')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha compra', 'Proveedor', 'Factura/referencia', 'Fecha vencimiento', 'Total compra/deuda', 'Total pagado', 'Saldo por pagar', 'Días mora', 'Estado', 'Observación'])
    ];
    getComprasForExport(summary.range, summary.filters).forEach((compra) => {
      const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
      rows.push([
        xlsxDate(compra.fechaCompra),
        xlsxText(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado'),
        xlsxText(compra.facturaReferencia),
        xlsxDate(compra.fechaVencimiento),
        xlsxMoney(compra.totalCompra),
        xlsxMoney(compra.totalPagado),
        xlsxMoney(compra.saldoPorPagar),
        xlsxNumber(getDaysOverdue(compra.fechaVencimiento)),
        xlsxText(compra.estado),
        xlsxText(compra.observacion)
      ]);
    });
    return { name: 'Proveedores', rows, cols: [16, 28, 22, 16, 18, 16, 16, 12, 14, 34] };
  }

  function buildGastosSheet(summary) {
    const rows = [
      [xlsxTitle('Gastos')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha', 'Tipo de gasto', 'Monto', 'Método', 'Cuenta/banco', 'Estado', 'Observación'])
    ];
    getGastosForExport(summary.range, summary.filters).forEach((gasto) => {
      const tipo = getCatalogRecordById('tiposGasto', gasto.tipoGastoId);
      const metodo = getCatalogRecordById('metodosPago', gasto.metodoPagoId);
      const cuenta = getCatalogRecordById('cuentasBancos', gasto.cuentaBancoId);
      rows.push([
        xlsxDate(gasto.fecha),
        xlsxText(tipo?.nombre || gasto.tipoGastoNombre || 'Sin tipo'),
        xlsxMoney(gasto.monto),
        xlsxText(metodo?.nombre || gasto.metodoPagoNombre || 'Sin método'),
        xlsxText(cuenta?.nombre || gasto.cuentaBancoNombre || 'Sin cuenta'),
        xlsxText(gasto.estado),
        xlsxText(gasto.observacion)
      ]);
    });
    return { name: 'Gastos', rows, cols: [14, 24, 16, 18, 22, 14, 34] };
  }

  function buildCatalogosSheet() {
    const rows = [[xlsxTitle('Catálogos')], [xlsxLabel('Exportado'), xlsxText(formatDateTime(nowIso()))], []];
    CATALOGS.forEach((catalog) => {
      rows.push([xlsxSubtitle(catalog.label)]);
      const headers = ['Nombre', 'Estado'];
      if (catalog.id === 'clientes') headers.splice(1, 0, 'Código');
      if (catalog.id === 'sucursales') headers.splice(1, 0, 'Cliente asociado');
      if (catalog.id === 'proveedores') headers.splice(1, 0, 'Contacto');
      if (catalog.id === 'cuentasBancos') headers.splice(1, 0, 'Tipo');
      headers.push('Observación');
      rows.push(xlsxHeaderRow(headers));
      getCatalogRecords(catalog.id).forEach((record) => {
        const base = [xlsxText(record.nombre)];
        if (catalog.id === 'clientes') base.push(xlsxText(record.codigo));
        if (catalog.id === 'sucursales') base.push(xlsxText(getCatalogRecordById('clientes', record.clienteId)?.nombre || ''));
        if (catalog.id === 'proveedores') base.push(xlsxText(record.contacto));
        if (catalog.id === 'cuentasBancos') base.push(xlsxText(record.tipo));
        base.push(xlsxText(record.activo ? 'Activo' : 'Inactivo'), xlsxText(record.observacion));
        rows.push(base);
      });
      rows.push([]);
    });
    return { name: 'Catálogos', rows, cols: [28, 24, 14, 36, 20, 20] };
  }

  function getVentasForExport(range, filters) {
    return (Array.isArray(appData.ventas) ? appData.ventas : [])
      .map((record) => normalizeVentaRecord(record))
      .filter((venta) => isDateInResumenRange(venta.fechaOc, range) && matchesResumenVenta(venta, { ...filters, estado: '' }, null, false))
      .sort((a, b) => String(a.fechaOc).localeCompare(String(b.fechaOc)) || String(a.numeroDocumento).localeCompare(String(b.numeroDocumento)));
  }

  function getComprasForExport(range, filters) {
    return (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [])
      .map((record) => normalizeCompraProveedorRecord(record))
      .filter((compra) => isDateInResumenRange(compra.fechaCompra, range) && matchesResumenCompra(compra, { ...filters, estado: '' }, null, false))
      .sort((a, b) => String(a.fechaCompra).localeCompare(String(b.fechaCompra)) || String(a.facturaReferencia).localeCompare(String(b.facturaReferencia)));
  }

  function getGastosForExport(range, filters) {
    return (Array.isArray(appData.gastos) ? appData.gastos : [])
      .map((record) => normalizeGastoRecord(record))
      .filter((gasto) => isDateInResumenRange(gasto.fecha, range) && matchesResumenGasto(gasto, { ...filters, estado: '' }, range))
      .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)) || String(a.tipoGastoNombre).localeCompare(String(b.tipoGastoNombre)));
  }

  function xlsxTitle(value) { return { value, style: 'title', type: 'string' }; }
  function xlsxSubtitle(value) { return { value, style: 'subtitle', type: 'string' }; }
  function xlsxLabel(value) { return { value, style: 'label', type: 'string' }; }
  function xlsxText(value) { return { value: cleanText(value), style: 'text', type: 'string' }; }
  function xlsxMoney(value) { return { value: roundMoney(value), style: 'money', type: 'number' }; }
  function xlsxNumber(value) { return { value: Number(value) || 0, style: 'integer', type: 'number' }; }
  function xlsxDate(value) { return { value: toDateInputValue(value), style: 'date', type: 'date' }; }
  function xlsxHeaderRow(values) { return values.map((value) => ({ value, style: 'header', type: 'string' })); }

  function buildXlsxZip(workbook) {
    const zip = new window.JSZip();
    zip.file('[Content_Types].xml', buildContentTypesXml(workbook.sheets));
    zip.folder('_rels').file('.rels', buildRootRelsXml());
    zip.folder('docProps').file('core.xml', buildCorePropsXml(workbook.exportedAt));
    zip.folder('docProps').file('app.xml', buildAppPropsXml(workbook.sheets));
    const xl = zip.folder('xl');
    xl.file('workbook.xml', buildWorkbookXml(workbook.sheets));
    xl.file('styles.xml', buildStylesXml());
    xl.folder('_rels').file('workbook.xml.rels', buildWorkbookRelsXml(workbook.sheets));
    const worksheets = xl.folder('worksheets');
    workbook.sheets.forEach((sheet, index) => worksheets.file(`sheet${index + 1}.xml`, buildWorksheetXml(sheet)));
    return zip;
  }

  function buildContentTypesXml(sheets) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheets.map((sheet, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('\n  ')}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
  }

  function buildRootRelsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  }

  function buildWorkbookRelsXml(sheets) {
    const sheetRels = sheets.map((sheet, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('\n  ');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheetRels}
  <Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  function buildWorkbookXml(sheets) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr date1904="false"/>
  <sheets>
    ${sheets.map((sheet, index) => `<sheet name="${escapeXmlAttribute(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('\n    ')}
  </sheets>
</workbook>`;
  }

  function buildCorePropsXml(exportedAt) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>KSA PRÁCTIKA</dc:creator>
  <cp:lastModifiedBy>KSA PRÁCTIKA</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${escapeXmlText(exportedAt)}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${escapeXmlText(exportedAt)}</dcterms:modified>
</cp:coreProperties>`;
  }

  function buildAppPropsXml(sheets) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>KSA PRÁCTIKA</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>${sheets.length}</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="${sheets.length}" baseType="lpstr">${sheets.map((sheet) => `<vt:lpstr>${escapeXmlText(sheet.name)}</vt:lpstr>`).join('')}</vt:vector></TitlesOfParts>
  <Company>KSA PRÁCTIKA</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0300</AppVersion>
</Properties>`;
  }

  function buildStylesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="2">
    <numFmt numFmtId="164" formatCode="&quot;C$&quot;#,##0.00"/>
    <numFmt numFmtId="165" formatCode="dd/mm/yyyy"/>
  </numFmts>
  <fonts count="5">
    <font><sz val="11"/><color rgb="FF111827"/><name val="Calibri"/></font>
    <font><b/><sz val="18"/><color rgb="FF111827"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FF5F4520"/><name val="Calibri"/></font>
    <font><sz val="10"/><color rgb="FF64748B"/><name val="Calibri"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF111827"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF4E5BE"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF8EA"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFD5CFC2"/></left><right style="thin"><color rgb="FFD5CFC2"/></right><top style="thin"><color rgb="FFD5CFC2"/></top><bottom style="thin"><color rgb="FFD5CFC2"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="8">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }

  function buildWorksheetXml(sheet) {
    const rows = Array.isArray(sheet.rows) ? sheet.rows : [];
    const maxCols = Math.max(1, ...rows.map((row) => Array.isArray(row) ? row.length : 0));
    const lastRef = `${columnIndexToLetters(maxCols - 1)}${Math.max(rows.length, 1)}`;
    const cols = buildColsXml(sheet.cols || [], maxCols);
    const rowsXml = rows.map((row, rowIndex) => buildRowXml(row, rowIndex + 1)).join('\n');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="A1:${lastRef}"/>
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  ${cols}
  <sheetData>
${rowsXml}
  </sheetData>
</worksheet>`;
  }

  function buildColsXml(widths, maxCols) {
    const parts = [];
    for (let index = 0; index < maxCols; index += 1) {
      const width = Number(widths[index] || 16);
      parts.push(`<col min="${index + 1}" max="${index + 1}" width="${Math.max(10, Math.min(width, 42))}" customWidth="1"/>`);
    }
    return `<cols>${parts.join('')}</cols>`;
  }

  function buildRowXml(row, rowNumber) {
    const cells = (Array.isArray(row) ? row : []).map((cell, colIndex) => buildCellXml(cell, rowNumber, colIndex)).join('');
    const height = rowNumber === 1 ? ' ht="26" customHeight="1"' : '';
    return `    <row r="${rowNumber}"${height}>${cells}</row>`;
  }

  function buildCellXml(cellInput, rowNumber, colIndex) {
    const cell = isPlainObject(cellInput) && Object.prototype.hasOwnProperty.call(cellInput, 'value') ? cellInput : xlsxText(cellInput);
    const value = cell.value;
    if (value === null || value === undefined || value === '') return '';
    const ref = `${columnIndexToLetters(colIndex)}${rowNumber}`;
    const style = xlsxStyleId(cell.style);
    if (cell.type === 'number') return `<c r="${ref}" s="${style}"><v>${Number(value) || 0}</v></c>`;
    if (cell.type === 'date') {
      const serial = dateInputToExcelSerial(value);
      if (!serial) return `<c r="${ref}" s="${style}"/>`;
      return `<c r="${ref}" s="${style}"><v>${serial}</v></c>`;
    }
    return `<c r="${ref}" t="inlineStr" s="${style}"><is><t>${escapeXmlText(value)}</t></is></c>`;
  }

  function xlsxStyleId(style) {
    const map = { title: 1, subtitle: 2, header: 3, label: 4, text: 5, money: 6, date: 7, integer: 5 };
    return map[style] || 0;
  }

  function columnIndexToLetters(index) {
    let current = index + 1;
    let letters = '';
    while (current > 0) {
      const mod = (current - 1) % 26;
      letters = String.fromCharCode(65 + mod) + letters;
      current = Math.floor((current - mod) / 26);
    }
    return letters;
  }

  function dateInputToExcelSerial(value) {
    const safeDate = toDateInputValue(value);
    if (!safeDate) return 0;
    const [year, month, day] = safeDate.split('-').map(Number);
    const utc = Date.UTC(year, month - 1, day);
    return Math.floor(utc / 86400000) + 25569;
  }

  function escapeXmlText(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeXmlAttribute(value) {
    return escapeXmlText(value).replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  function getOperationalRecordCount() {
    return ['ventas', 'cobros', 'comprasProveedores', 'pagosProveedores', 'gastos']
      .reduce((sum, key) => sum + (Array.isArray(appData[key]) ? appData[key].length : 0), 0);
  }

  async function handleExcelFileSelected(file) {
    if (!file) return;
    if (!canCurrentRole('importExcel')) {
      excelImportState.message = 'Solo Administrador puede importar Excel.';
      excelImportState.messageType = 'error';
      renderRoute();
      return;
    }
    excelImportState = {
      fileName: file.name || '',
      isProcessing: true,
      preview: null,
      payload: null,
      message: 'Leyendo archivo Excel...',
      messageType: 'success'
    };
    renderRoute();

    try {
      const result = await analyzeExcelImportFile(file);
      excelImportState = {
        fileName: file.name || '',
        isProcessing: false,
        preview: result.preview,
        payload: result.payload,
        message: result.preview.isImportable
          ? 'Archivo validado. Revisa el resumen previo antes de confirmar.'
          : 'Archivo leído con advertencias críticas. Revisa antes de confirmar.',
        messageType: result.preview.isImportable ? 'success' : 'error'
      };
    } catch (error) {
      console.error('KSA PRÁCTIKA: error al analizar Excel.', error);
      excelImportState = {
        fileName: file.name || '',
        isProcessing: false,
        preview: null,
        payload: null,
        message: error.message || 'No se pudo leer el Excel seleccionado.',
        messageType: 'error'
      };
    }

    renderRoute();
  }

  async function analyzeExcelImportFile(file) {
    if (!file || !cleanText(file.name).toLowerCase().endsWith('.xlsx')) {
      throw new Error('Selecciona un archivo con extensión .xlsx.');
    }
    if (typeof window.JSZip === 'undefined') {
      throw new Error('No se encontró JSZip local. La librería debe estar incluida dentro del proyecto.');
    }

    const buffer = await file.arrayBuffer();
    const workbook = await readXlsxWorkbook(buffer);
    const payload = buildExcelImportPayload(workbook);
    const preview = buildExcelImportPreview(workbook, payload);
    return { workbook, payload, preview };
  }

  async function readXlsxWorkbook(arrayBuffer) {
    const zip = await window.JSZip.loadAsync(arrayBuffer);
    const workbookXml = await readZipText(zip, 'xl/workbook.xml');
    if (!workbookXml) throw new Error('El archivo no contiene xl/workbook.xml. Verifica que sea un .xlsx válido.');

    const workbookDoc = parseXml(workbookXml);
    const relsDoc = parseXml(await readZipText(zip, 'xl/_rels/workbook.xml.rels') || '<Relationships></Relationships>');
    const sharedStrings = parseSharedStrings(parseXml(await readZipText(zip, 'xl/sharedStrings.xml') || '<sst></sst>'));
    const styleMap = parseWorkbookStyles(parseXml(await readZipText(zip, 'xl/styles.xml') || '<styleSheet></styleSheet>'));
    const relMap = new Map(Array.from(relsDoc.getElementsByTagName('Relationship')).map((rel) => [
      rel.getAttribute('Id'),
      normalizeWorkbookTarget(rel.getAttribute('Target'))
    ]));

    const sheets = Array.from(workbookDoc.getElementsByTagName('sheet')).map((sheet) => {
      const name = cleanText(sheet.getAttribute('name'));
      const rid = sheet.getAttribute('r:id') || sheet.getAttribute('id');
      const path = relMap.get(rid);
      return { name, path };
    }).filter((sheet) => sheet.name && sheet.path);

    const result = { sheets: {}, meta: [] };
    for (const sheet of sheets) {
      const xml = await readZipText(zip, sheet.path);
      if (!xml) continue;
      const rows = parseWorksheetRows(parseXml(xml), sharedStrings, styleMap);
      const normalizedName = normalizeExcelKey(sheet.name);
      result.sheets[normalizedName] = { name: sheet.name, rows };
      result.meta.push({ name: sheet.name, normalizedName, rows: Math.max(rows.length - 1, 0) });
    }

    return result;
  }

  async function readZipText(zip, path) {
    const file = zip.file(path);
    return file ? file.async('text') : '';
  }

  function parseXml(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) throw new Error('No se pudo leer la estructura XML interna del Excel.');
    return doc;
  }

  function normalizeWorkbookTarget(target) {
    const raw = cleanText(target).replace(/^\//, '');
    if (!raw) return '';
    return raw.startsWith('xl/') ? raw : `xl/${raw}`;
  }

  function parseSharedStrings(doc) {
    return Array.from(doc.getElementsByTagName('si')).map((si) => {
      const textNodes = Array.from(si.getElementsByTagName('t'));
      return textNodes.map((node) => node.textContent || '').join('');
    });
  }

  function parseWorkbookStyles(doc) {
    const customFormats = new Map();
    Array.from(doc.getElementsByTagName('numFmt')).forEach((numFmt) => {
      customFormats.set(numFmt.getAttribute('numFmtId'), numFmt.getAttribute('formatCode') || '');
    });
    const xfsNode = doc.getElementsByTagName('cellXfs')[0];
    const xfs = xfsNode ? Array.from(xfsNode.getElementsByTagName('xf')) : [];
    return xfs.map((xf) => {
      const id = xf.getAttribute('numFmtId') || '';
      const code = customFormats.get(id) || '';
      return isExcelDateFormat(id, code);
    });
  }

  function isExcelDateFormat(numFmtId, formatCode) {
    const builtInDateIds = new Set(['14', '15', '16', '17', '18', '19', '20', '21', '22', '27', '30', '36', '45', '46', '47', '50', '57']);
    if (builtInDateIds.has(String(numFmtId))) return true;
    const code = cleanText(formatCode).toLowerCase().replace(/\[[^\]]+\]/g, '').replace(/"[^"]+"/g, '');
    return /[dmy]/.test(code) && !/[0#]/.test(code.replace(/[dmyhs\/\-:\s]/g, ''));
  }

  function parseWorksheetRows(doc, sharedStrings, styleMap) {
    const rows = [];
    Array.from(doc.getElementsByTagName('row')).forEach((rowNode) => {
      const row = [];
      Array.from(rowNode.getElementsByTagName('c')).forEach((cell) => {
        const ref = cell.getAttribute('r') || '';
        const columnIndex = columnLettersToIndex(ref.replace(/\d+/g, ''));
        row[columnIndex] = parseCellValue(cell, sharedStrings, styleMap);
      });
      if (row.some((value) => cleanText(value) !== '')) rows.push(row.map((value) => value ?? ''));
    });
    return rows;
  }

  function columnLettersToIndex(letters) {
    const clean = cleanText(letters).toUpperCase();
    let result = 0;
    for (const char of clean) result = result * 26 + (char.charCodeAt(0) - 64);
    return Math.max(result - 1, 0);
  }

  function parseCellValue(cell, sharedStrings, styleMap) {
    const type = cell.getAttribute('t');
    const styleIndex = Number(cell.getAttribute('s') || -1);
    const inlineText = cell.getElementsByTagName('is')[0];
    if (inlineText) {
      return Array.from(inlineText.getElementsByTagName('t')).map((node) => node.textContent || '').join('');
    }
    const valueNode = cell.getElementsByTagName('v')[0];
    const rawValue = valueNode ? valueNode.textContent || '' : '';
    if (type === 's') return sharedStrings[Number(rawValue)] || '';
    if (type === 'b') return rawValue === '1' ? 'SI' : 'NO';
    if (type === 'str') return rawValue;
    if (styleMap[styleIndex] && rawValue !== '') return excelSerialToDateInput(rawValue) || rawValue;
    return rawValue;
  }

  function excelSerialToDateInput(value) {
    const serial = Number(value);
    if (!Number.isFinite(serial) || serial <= 0) return '';
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const date = new Date(utcValue * 1000);
    if (Number.isNaN(date.getTime())) return '';
    return formatDateInput(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  function buildExcelImportPayload(workbook) {
    const warnings = [];
    const payload = createEmptyImportPayload();
    const ventasSheet = findWorkbookSheet(workbook, 'ventas');
    const proveedoresSheet = findWorkbookSheet(workbook, 'proveedores');
    const gastosSheet = findWorkbookSheet(workbook, 'gastos');
    const catalogosSheet = findWorkbookSheet(workbook, 'catalogos');

    if (!ventasSheet) warnings.push('No se encontró hoja Ventas.');
    if (!proveedoresSheet) warnings.push('No se encontró hoja Proveedores.');
    if (!gastosSheet) warnings.push('No se encontró hoja Gastos.');
    if (!catalogosSheet) warnings.push('No se encontró hoja Catálogos.');

    if (catalogosSheet) importCatalogosRows(catalogosSheet, payload, warnings);
    if (ventasSheet) importVentasRows(ventasSheet, payload, warnings);
    if (proveedoresSheet) importProveedoresRows(proveedoresSheet, payload, warnings);
    if (gastosSheet) importGastosRows(gastosSheet, payload, warnings);

    payload.warnings = warnings;
    return payload;
  }

  function createEmptyImportPayload() {
    return {
      clientes: [],
      sucursales: [],
      proveedores: [],
      tiposGasto: [],
      metodosPago: [],
      cuentasBancos: [],
      ventas: [],
      cobros: [],
      comprasProveedores: [],
      pagosProveedores: [],
      gastos: [],
      warnings: []
    };
  }

  function findWorkbookSheet(workbook, wanted) {
    const wantedKey = normalizeExcelKey(wanted);
    return Object.values(workbook.sheets).find((sheet) => normalizeExcelKey(sheet.name).includes(wantedKey));
  }

  function rowsToObjects(sheet, warnings, sheetLabel, requiredAliasesGroups) {
    const rows = Array.isArray(sheet?.rows) ? sheet.rows : [];
    const nonEmptyIndex = rows.findIndex((row) => row.filter((cell) => cleanText(cell)).length > 0);
    let headerIndex = nonEmptyIndex;
    if (requiredAliasesGroups.length) {
      let bestScore = -1;
      rows.forEach((row, index) => {
        const keys = row.map(normalizeExcelKey).filter(Boolean);
        const score = requiredAliasesGroups.reduce((sum, group) => (
          sum + (group.some((alias) => keys.includes(normalizeExcelKey(alias))) ? 1 : 0)
        ), 0);
        if (score > bestScore) {
          bestScore = score;
          headerIndex = index;
        }
      });
      if (bestScore <= 0) headerIndex = nonEmptyIndex;
    }
    if (headerIndex < 0) {
      warnings.push(`La hoja ${sheetLabel} no tiene encabezados legibles.`);
      return { headers: [], objects: [] };
    }
    const headers = rows[headerIndex].map((header) => cleanText(header));
    const normalizedHeaders = headers.map(normalizeExcelKey);
    requiredAliasesGroups.forEach((group) => {
      const exists = group.some((alias) => normalizedHeaders.includes(normalizeExcelKey(alias)));
      if (!exists) warnings.push(`La hoja ${sheetLabel} no tiene encabezado mínimo esperado: ${group[0]}.`);
    });
    const objects = rows.slice(headerIndex + 1).map((row) => {
      const obj = { __raw: row };
      headers.forEach((header, index) => {
        if (header) obj[header] = row[index] ?? '';
      });
      return obj;
    }).filter((obj) => Object.entries(obj).some(([key, value]) => key !== '__raw' && cleanText(value)));
    return { headers, objects };
  }

  function normalizeExcelKey(value) {
    return cleanText(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  function pickCell(row, aliases) {
    const entries = Object.entries(row || {}).filter(([key]) => key !== '__raw');
    for (const alias of aliases) {
      const aliasKey = normalizeExcelKey(alias);
      const found = entries.find(([key]) => normalizeExcelKey(key) === aliasKey);
      if (found) return found[1];
    }
    for (const alias of aliases) {
      const aliasKey = normalizeExcelKey(alias);
      const found = entries.find(([key]) => normalizeExcelKey(key).includes(aliasKey) || aliasKey.includes(normalizeExcelKey(key)));
      if (found) return found[1];
    }
    return '';
  }

  function parseExcelMoney(value) {
    if (typeof value === 'number') return roundMoney(value);
    const text = cleanText(value).replace(/C\$|US\$|NIO|USD/gi, '').replace(/\s/g, '');
    return parseMoney(text);
  }

  function parseExcelDateValue(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return formatDateInput(value);
    const raw = cleanText(value);
    if (!raw) return '';
    const iso = toDateInputValue(raw);
    if (iso) return iso;
    const slash = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (slash) {
      const day = Number(slash[1]);
      const month = Number(slash[2]);
      const year = Number(slash[3].length === 2 ? `20${slash[3]}` : slash[3]);
      const date = new Date(year, month - 1, day);
      if (!Number.isNaN(date.getTime()) && date.getDate() === day && date.getMonth() === month - 1) return formatDateInput(date);
    }
    const serialDate = excelSerialToDateInput(raw);
    if (serialDate) return serialDate;
    return '';
  }

  function importCatalogosRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Catálogos', []);
    payload.__headersCatalogos = parsed.headers;
    const directColumns = {
      clientes: ['cliente', 'clientes', 'nombrecliente'],
      sucursales: ['sucursal', 'sucursales', 'nombresucursal'],
      proveedores: ['proveedor', 'proveedores', 'nombreproveedor'],
      tiposGasto: ['tipogasto', 'tiposgasto', 'gasto', 'categoria'],
      metodosPago: ['metodo', 'metodopago', 'metodocobro', 'formapago'],
      cuentasBancos: ['cuenta', 'banco', 'cuentabanco', 'cuentasbancos']
    };

    parsed.objects.forEach((row) => {
      const tipo = normalizeExcelKey(pickCell(row, ['Tipo', 'Catálogo', 'Catalogo', 'Lista', 'Grupo', 'Categoría', 'Categoria']));
      const nombre = cleanText(pickCell(row, ['Nombre', 'Valor', 'Descripción', 'Descripcion', 'Detalle', 'Item']));
      if (tipo && nombre) {
        addCatalogValueByType(payload, tipo, nombre, row);
        return;
      }

      Object.entries(directColumns).forEach(([catalogId, aliases]) => {
        const value = cleanText(pickCell(row, aliases));
        if (value) addImportCatalog(payload, catalogId, value, row);
      });
    });
  }

  function addCatalogValueByType(payload, tipoKey, nombre, row) {
    if (tipoKey.includes('cliente')) addImportCatalog(payload, 'clientes', nombre, row);
    else if (tipoKey.includes('sucursal')) addImportCatalog(payload, 'sucursales', nombre, row);
    else if (tipoKey.includes('proveedor')) addImportCatalog(payload, 'proveedores', nombre, row);
    else if (tipoKey.includes('gasto') || tipoKey.includes('categoria')) addImportCatalog(payload, 'tiposGasto', nombre, row);
    else if (tipoKey.includes('metodo') || tipoKey.includes('formapago') || tipoKey.includes('cobro')) addImportCatalog(payload, 'metodosPago', nombre, row);
    else if (tipoKey.includes('cuenta') || tipoKey.includes('banco')) addImportCatalog(payload, 'cuentasBancos', nombre, row);
  }

  function addImportCatalog(payload, catalogId, nombre, row = {}) {
    const safeName = cleanText(nombre);
    if (!safeName || !payload[catalogId]) return '';
    const existing = payload[catalogId].find((item) => normalizeNameForCompare(item.nombre) === normalizeNameForCompare(safeName));
    if (existing) return existing.id;
    const record = normalizeCatalogRecord({
      id: generateId(catalogId),
      nombre: safeName,
      codigo: cleanText(pickCell(row, ['Código', 'Codigo'])),
      contacto: cleanText(pickCell(row, ['Contacto', 'Teléfono', 'Telefono', 'Correo'])),
      tipo: cleanText(pickCell(row, ['Tipo cuenta', 'Tipo'])) || (catalogId === 'cuentasBancos' ? 'Otro' : undefined),
      observacion: cleanText(pickCell(row, ['Observación', 'Observacion', 'Notas']))
    }, CATALOGS.find((catalog) => catalog.id === catalogId));
    payload[catalogId].push(record);
    return record.id;
  }

  function importVentasRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Ventas', [['OC/documento', 'OC', 'Documento'], ['Cliente'], ['Monto OC', 'Monto', 'Total OC']]);
    payload.__headersVentas = parsed.headers;
    parsed.objects.forEach((row, index) => {
      const clienteNombre = cleanText(pickCell(row, ['Cliente', 'Nombre cliente']));
      const sucursalNombre = cleanText(pickCell(row, ['Sucursal', 'Tienda', 'Ubicación', 'Ubicacion']));
      const clienteId = clienteNombre ? addImportCatalog(payload, 'clientes', clienteNombre) : '';
      const sucursalId = sucursalNombre ? addImportCatalog(payload, 'sucursales', sucursalNombre, { Cliente: clienteNombre }) : '';
      const totalCobrado = parseExcelMoney(pickCell(row, ['Total cobrado', 'Cobrado', 'Pagado', 'Abonado']));
      const montoOcRaw = pickCell(row, ['Monto OC', 'Monto de OC', 'Total OC', 'Total de la OC', 'Monto', 'Total']);
      const ventaNetaRaw = pickCell(row, ['Venta neta', 'Neto']);
      const montoOc = parseExcelMoney(montoOcRaw || ventaNetaRaw);
      const record = normalizeVentaRecord({
        id: generateId('venta'),
        numeroDocumento: cleanText(pickCell(row, ['OC/documento', 'OC', 'Documento', 'No OC', 'N° OC', 'Número OC', 'Numero OC', 'Orden de compra'])),
        clienteId,
        sucursalId,
        fechaOc: parseExcelDateValue(pickCell(row, ['Fecha OC', 'Fecha', 'Fecha origen', 'Fecha venta'])),
        diasCredito: parsePositiveInteger(pickCell(row, ['Días crédito', 'Dias credito', 'Crédito', 'Credito'])),
        fechaVencimiento: parseExcelDateValue(pickCell(row, ['Fecha vencimiento', 'Vencimiento', 'Fecha de vencimiento'])),
        montoOc,
        noVa: parseExcelMoney(pickCell(row, ['NO VA', 'No VA', 'NOVA', 'No va'])),
        descuento: parseExcelMoney(pickCell(row, ['Descuento', 'Desc'])),
        descuentoNoVa: parseExcelMoney(pickCell(row, ['Descuento NO VA', 'Desc NO VA', 'Descuento NOVA'])),
        totalCobrado: Number.isNaN(totalCobrado) ? 0 : totalCobrado,
        estado: cleanText(pickCell(row, ['Estado', 'Estatus'])),
        observacion: cleanText(pickCell(row, ['Observación', 'Observacion', 'Notas', 'Comentario']))
      });
      if (!record.numeroDocumento && !clienteNombre && record.montoOc <= 0) return;
      payload.ventas.push({ ...record, clienteNombre, sucursalNombre });
      if (record.totalCobrado > 0) {
        payload.cobros.push(normalizeCobroRecord({
          id: generateId('cobro'),
          ventaId: record.id,
          fechaCobro: record.fechaOc || todayInputValue(),
          clienteId: record.clienteId,
          clienteNombre,
          sucursalId: record.sucursalId,
          sucursalNombre,
          numeroDocumento: record.numeroDocumento,
          montoCobrado: record.totalCobrado,
          metodoPagoId: '',
          metodoPagoNombre: 'Importado desde Excel',
          cuentaBancoId: '',
          cuentaBancoNombre: '',
          observacion: 'Cobro histórico generado por total cobrado importado desde Ventas.'
        }));
      }
      if (!record.numeroDocumento) warnings.push(`Ventas fila ${index + 2}: sin OC/documento; se importará como “Sin número”.`);
    });
  }

  function importProveedoresRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Proveedores', [['Proveedor'], ['Factura', 'Referencia', 'Documento'], ['Total compra', 'Total deuda', 'Monto']]);
    payload.__headersProveedores = parsed.headers;
    parsed.objects.forEach((row) => {
      const proveedorNombre = cleanText(pickCell(row, ['Proveedor', 'Nombre proveedor']));
      const proveedorId = proveedorNombre ? addImportCatalog(payload, 'proveedores', proveedorNombre) : '';
      const totalPagado = parseExcelMoney(pickCell(row, ['Total pagado', 'Pagado', 'Abonado']));
      const totalCompra = parseExcelMoney(pickCell(row, ['Total compra', 'Total deuda', 'Monto', 'Total', 'Importe']));
      const record = normalizeCompraProveedorRecord({
        id: generateId('compraProveedor'),
        proveedorId,
        proveedorNombre,
        facturaReferencia: cleanText(pickCell(row, ['Factura/referencia', 'Factura', 'Referencia', 'Documento', 'No factura', 'Número factura', 'Numero factura'])),
        fechaCompra: parseExcelDateValue(pickCell(row, ['Fecha compra', 'Fecha', 'Fecha origen'])),
        diasCredito: parsePositiveInteger(pickCell(row, ['Días crédito', 'Dias credito', 'Crédito', 'Credito'])),
        fechaVencimiento: parseExcelDateValue(pickCell(row, ['Fecha vencimiento', 'Vencimiento', 'Fecha de vencimiento'])),
        totalCompra,
        totalPagado: Number.isNaN(totalPagado) ? 0 : totalPagado,
        estado: cleanText(pickCell(row, ['Estado', 'Estatus'])),
        observacion: cleanText(pickCell(row, ['Observación', 'Observacion', 'Notas', 'Comentario']))
      });
      if (!record.facturaReferencia && !proveedorNombre && record.totalCompra <= 0) return;
      payload.comprasProveedores.push(record);
      if (record.totalPagado > 0) {
        payload.pagosProveedores.push(normalizePagoProveedorRecord({
          id: generateId('pagoProveedor'),
          compraProveedorId: record.id,
          proveedorId: record.proveedorId,
          proveedorNombre,
          facturaReferencia: record.facturaReferencia,
          fechaPago: record.fechaCompra || todayInputValue(),
          montoPagado: record.totalPagado,
          metodoPagoNombre: 'Importado desde Excel',
          observacion: 'Pago histórico generado por total pagado importado desde Proveedores.'
        }));
      }
    });
  }

  function importGastosRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Gastos', [['Fecha'], ['Tipo de gasto', 'Tipo', 'Categoría'], ['Monto', 'Importe']]);
    payload.__headersGastos = parsed.headers;
    parsed.objects.forEach((row) => {
      const tipoGastoNombre = cleanText(pickCell(row, ['Tipo de gasto', 'Tipo gasto', 'Tipo', 'Categoría', 'Categoria']));
      const metodoPagoNombre = cleanText(pickCell(row, ['Método', 'Metodo', 'Método de pago', 'Metodo de pago', 'Forma de pago']));
      const cuentaBancoNombre = cleanText(pickCell(row, ['Cuenta/banco', 'Cuenta', 'Banco', 'Cuenta banco']));
      const tipoGastoId = tipoGastoNombre ? addImportCatalog(payload, 'tiposGasto', tipoGastoNombre) : '';
      const metodoPagoId = metodoPagoNombre ? addImportCatalog(payload, 'metodosPago', metodoPagoNombre) : '';
      const cuentaBancoId = cuentaBancoNombre ? addImportCatalog(payload, 'cuentasBancos', cuentaBancoNombre) : '';
      const record = normalizeGastoRecord({
        id: generateId('gasto'),
        fecha: parseExcelDateValue(pickCell(row, ['Fecha', 'Fecha gasto'])),
        tipoGastoId,
        tipoGastoNombre,
        monto: parseExcelMoney(pickCell(row, ['Monto', 'Importe', 'Valor', 'Total'])),
        metodoPagoId,
        metodoPagoNombre,
        cuentaBancoId,
        cuentaBancoNombre,
        estado: cleanText(pickCell(row, ['Estado', 'Estatus'])),
        observacion: cleanText(pickCell(row, ['Observación', 'Observacion', 'Notas', 'Comentario']))
      });
      if (!tipoGastoNombre && record.monto <= 0) return;
      payload.gastos.push(record);
    });
  }

  function buildExcelImportPreview(workbook, payload) {
    const headers = [];
    ['Ventas', 'Proveedores', 'Gastos', 'Catálogos'].forEach((label) => {
      const sheet = findWorkbookSheet(workbook, label);
      if (!sheet) return;
      const row = (sheet.rows || []).find((item) => item.some((value) => cleanText(value))) || [];
      headers.push({ sheet: sheet.name, headers: row.map((value) => cleanText(value)).filter(Boolean) });
    });
    const catalogCount = CATALOGS.reduce((sum, catalog) => sum + payload[catalog.id].length, 0);
    const sheets = workbook.meta.map((item) => ({ name: item.name, rows: item.rows }));
    const counts = {
      ventas: payload.ventas.length,
      proveedores: payload.comprasProveedores.length,
      gastos: payload.gastos.length,
      catalogos: catalogCount,
      cobros: payload.cobros.length,
      pagos: payload.pagosProveedores.length
    };
    const warnings = [...payload.warnings];
    if (!Object.values(counts).some((count) => count > 0)) warnings.push('No se detectaron registros importables. Revisa hojas y encabezados.');
    return {
      sheets,
      headers,
      counts,
      warnings,
      isImportable: Object.values(counts).some((count) => count > 0)
    };
  }

  function confirmExcelImport(mode) {
    if (!canCurrentRole('importExcel')) {
      excelImportState.message = 'Solo Administrador puede confirmar importación Excel.';
      excelImportState.messageType = 'error';
      renderRoute();
      return;
    }
    if (!excelImportState.payload || !excelImportState.preview) {
      excelImportState.message = 'Primero selecciona y valida un archivo Excel.';
      excelImportState.messageType = 'error';
      renderRoute();
      return;
    }
    if (!excelImportState.preview.isImportable) {
      excelImportState.message = 'No hay registros importables suficientes para confirmar.';
      excelImportState.messageType = 'error';
      renderRoute();
      return;
    }

    const selectedMode = mode === 'replace' ? 'replace' : 'merge';
    if (selectedMode === 'replace') {
      const ok = window.confirm('Vas a reemplazar los datos actuales por la importación Excel validada. ¿Continuar?');
      if (!ok) return;
    }
    const result = applyExcelImportPayload(excelImportState.payload, selectedMode);
    saveData(appData);
    excelImportState.preview = null;
    excelImportState.payload = null;
    excelImportState.message = `Importación completada: ${result.added.ventas} ventas, ${result.added.proveedores} compras/proveedores, ${result.added.gastos} gastos y ${result.added.catalogos} catálogos agregados. Duplicados omitidos: ${result.skipped}.`;
    excelImportState.messageType = 'success';
    renderRoute();
  }

  function applyExcelImportPayload(payload, mode) {
    const target = mode === 'replace' ? createInitialData() : normalizeData(appData);
    const timestamp = nowIso();
    const idMaps = {};
    const added = { ventas: 0, proveedores: 0, gastos: 0, catalogos: 0 };
    CATALOGS.forEach((catalog) => {
      idMaps[catalog.id] = new Map();
      payload[catalog.id].forEach((record) => {
        const existing = (target[catalog.id] || []).find((item) => normalizeNameForCompare(item.nombre) === normalizeNameForCompare(record.nombre));
        if (existing) {
          idMaps[catalog.id].set(record.id, existing.id);
          return;
        }
        const normalized = normalizeCatalogRecord({ ...record, id: generateId(catalog.id), createdAt: timestamp, updatedAt: timestamp }, catalog);
        target[catalog.id] = [normalized, ...(target[catalog.id] || [])];
        idMaps[catalog.id].set(record.id, normalized.id);
        added.catalogos += 1;
      });
    });

    let skipped = 0;
    const ventaIdMap = new Map();
    const compraIdMap = new Map();

    payload.ventas.forEach((venta) => {
      const remapped = normalizeVentaRecord({
        ...venta,
        id: generateId('venta'),
        clienteId: idMaps.clientes.get(venta.clienteId) || venta.clienteId,
        sucursalId: idMaps.sucursales.get(venta.sucursalId) || venta.sucursalId,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      const duplicate = (target.ventas || []).find((item) => getVentaDuplicateKey(item) === getVentaDuplicateKey(remapped));
      if (duplicate) {
        skipped += 1;
        return;
      }
      target.ventas = [remapped, ...(target.ventas || [])];
      ventaIdMap.set(venta.id, remapped.id);
      added.ventas += 1;
    });

    payload.comprasProveedores.forEach((compra) => {
      const remapped = normalizeCompraProveedorRecord({
        ...compra,
        id: generateId('compraProveedor'),
        proveedorId: idMaps.proveedores.get(compra.proveedorId) || compra.proveedorId,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      const duplicate = (target.comprasProveedores || []).find((item) => getCompraDuplicateKey(item) === getCompraDuplicateKey(remapped));
      if (duplicate) {
        skipped += 1;
        return;
      }
      target.comprasProveedores = [remapped, ...(target.comprasProveedores || [])];
      compraIdMap.set(compra.id, remapped.id);
      added.proveedores += 1;
    });

    payload.gastos.forEach((gasto) => {
      const remapped = normalizeGastoRecord({
        ...gasto,
        id: generateId('gasto'),
        tipoGastoId: idMaps.tiposGasto.get(gasto.tipoGastoId) || gasto.tipoGastoId,
        metodoPagoId: idMaps.metodosPago.get(gasto.metodoPagoId) || gasto.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(gasto.cuentaBancoId) || gasto.cuentaBancoId,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      const duplicate = (target.gastos || []).find((item) => getGastoDuplicateKey(item) === getGastoDuplicateKey(remapped));
      if (duplicate) {
        skipped += 1;
        return;
      }
      target.gastos = [remapped, ...(target.gastos || [])];
      added.gastos += 1;
    });

    payload.cobros.forEach((cobro) => {
      const ventaId = ventaIdMap.get(cobro.ventaId);
      if (!ventaId) return;
      target.cobros = [normalizeCobroRecord({
        ...cobro,
        id: generateId('cobro'),
        ventaId,
        clienteId: idMaps.clientes.get(cobro.clienteId) || cobro.clienteId,
        sucursalId: idMaps.sucursales.get(cobro.sucursalId) || cobro.sucursalId,
        createdAt: timestamp,
        updatedAt: timestamp
      }), ...(target.cobros || [])];
    });

    payload.pagosProveedores.forEach((pago) => {
      const compraProveedorId = compraIdMap.get(pago.compraProveedorId);
      if (!compraProveedorId) return;
      target.pagosProveedores = [normalizePagoProveedorRecord({
        ...pago,
        id: generateId('pagoProveedor'),
        compraProveedorId,
        proveedorId: idMaps.proveedores.get(pago.proveedorId) || pago.proveedorId,
        createdAt: timestamp,
        updatedAt: timestamp
      }), ...(target.pagosProveedores || [])];
    });

    target.ventas = recalculateVentasWithCobros(target.ventas, target.cobros);
    target.comprasProveedores = recalculateComprasProveedoresWithPagos(target.comprasProveedores, target.pagosProveedores);
    appData = normalizeData(target);
    return { added, skipped };
  }

  function getVentaDuplicateKey(record) {
    const venta = normalizeVentaRecord(record);
    return [normalizeNameForCompare(venta.numeroDocumento), venta.clienteId, venta.fechaOc].join('|');
  }

  function getCompraDuplicateKey(record) {
    const compra = normalizeCompraProveedorRecord(record);
    return [compra.proveedorId, normalizeNameForCompare(compra.facturaReferencia), compra.fechaCompra].join('|');
  }

  function getGastoDuplicateKey(record) {
    const gasto = normalizeGastoRecord(record);
    return [gasto.fecha, gasto.tipoGastoId || normalizeNameForCompare(gasto.tipoGastoNombre), roundMoney(gasto.monto)].join('|');
  }

  function clearExcelImportState() {
    excelImportState = {
      fileName: '',
      isProcessing: false,
      preview: null,
      payload: null,
      message: null,
      messageType: 'success'
    };
    renderRoute();
  }

  function getActiveCatalogRecords(catalogId) {
    return getCatalogRecords(catalogId).filter((record) => record.activo);
  }

  function getCatalogRecordById(catalogId, recordId) {
    return getCatalogRecords(catalogId).find((record) => record.id === recordId);
  }

  function formatMoney(value) {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: 'NIO',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(roundMoney(value)).replace('NIO', 'C$');
  }

  function formatNumberInput(value) {
    if (value === null || value === undefined || value === '') return '';
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric !== 0 ? String(roundMoney(numeric)) : '';
  }

  function formatDate(value) {
    const safeDate = toDateInputValue(value);
    if (!safeDate) return '—';
    const [year, month, day] = safeDate.split('-');
    return `${day}/${month}/${year}`;
  }

  function getEstadoClass(estado) {
    const normalized = cleanText(estado).toLocaleLowerCase('es-NI');
    if (normalized === 'pagado') return 'is-paid';
    if (normalized === 'abonado') return 'is-partial';
    if (normalized === 'vencido') return 'is-overdue';
    if (normalized === 'anulado') return 'is-inactive';
    return 'is-pending';
  }

  function getRecordSecondaryText(catalog, record) {
    if (catalog.id === 'clientes' && record.codigo) return `Código: ${record.codigo}`;
    if (catalog.id === 'sucursales') {
      const cliente = appData.clientes.find((item) => item.id === record.clienteId);
      return cliente ? `Cliente asociado: ${cliente.nombre}` : 'Sin cliente asociado';
    }
    if (catalog.id === 'proveedores' && record.contacto) return `Contacto: ${record.contacto}`;
    if (catalog.id === 'cuentasBancos') return `Tipo: ${record.tipo || 'Otro'}`;
    return '';
  }

  function getRelatedDataKeys(route) {
    const map = {
      resumen: DATA_KEYS,
      mora: ['ventas', 'cobros', 'comprasProveedores', 'pagosProveedores', 'clientes', 'sucursales', 'proveedores'],
      ventas: ['clientes', 'sucursales', 'ventas', 'cobros'],
      cobros: ['clientes', 'ventas', 'cobros', 'metodosPago', 'cuentasBancos'],
      proveedores: ['proveedores', 'comprasProveedores', 'pagosProveedores'],
      pagos: ['proveedores', 'comprasProveedores', 'pagosProveedores', 'metodosPago', 'cuentasBancos'],
      gastos: ['tiposGasto', 'metodosPago', 'cuentasBancos', 'gastos'],
      catalogos: ['clientes', 'sucursales', 'proveedores', 'tiposGasto', 'metodosPago', 'cuentasBancos'],
      excel: ['ventas', 'cobros', 'comprasProveedores', 'pagosProveedores', 'gastos'],
      respaldo: DATA_KEYS,
      configuracion: ['cierresMensuales']
    };
    return map[route] || DATA_KEYS;
  }

  function getActiveCatalog() {
    return CATALOGS.find((catalog) => catalog.id === catalogState.activeCatalogId) || CATALOGS[0];
  }

  function getCatalogRecords(catalogId) {
    return Array.isArray(appData[catalogId]) ? appData[catalogId] : [];
  }

  function formatDateTime(iso) {
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat('es-NI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }

  function buildRecordFromForm(form, catalog, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const record = {
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId(catalog.id),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    };

    catalog.fields.forEach((field) => {
      record[field.name] = cleanText(formData.get(field.name));
    });

    if (catalog.id === 'cuentasBancos' && !record.tipo) {
      record.tipo = 'Otro';
    }

    return record;
  }

  function validateCatalogRecord(catalog, record, existingId) {
    if (!record.nombre) {
      return `El nombre del ${catalog.singular} es obligatorio.`;
    }

    if (catalog.id === 'cuentasBancos' && !['Caja', 'Banco', 'Otro'].includes(record.tipo)) {
      return 'Selecciona un tipo válido: Caja, Banco u Otro.';
    }

    const duplicate = getCatalogRecords(catalog.id).find((item) => (
      item.id !== existingId &&
      item.activo &&
      normalizeNameForCompare(item.nombre) === normalizeNameForCompare(record.nombre)
    ));

    if (duplicate) {
      return `Ya existe un registro activo con el nombre “${record.nombre}”.`;
    }

    return '';
  }

  function saveCatalogRecord(form) {
    if (!canCurrentRole('editCatalogs')) {
      catalogState.message = 'Solo Administrador puede editar Catálogos.';
      catalogState.messageType = 'error';
      renderRoute();
      return;
    }
    const catalog = getActiveCatalog();
    const existingId = cleanText(new FormData(form).get('id'));
    const records = getCatalogRecords(catalog.id);
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;
    const newRecord = buildRecordFromForm(form, catalog, existingRecord);
    const validationError = validateCatalogRecord(catalog, newRecord, existingId);

    if (validationError) {
      catalogState.message = validationError;
      catalogState.messageType = 'error';
      renderRoute();
      return;
    }

    if (existingRecord) {
      appData[catalog.id] = records.map((record) => record.id === existingId ? newRecord : record);
      catalogState.message = `${catalog.label}: registro actualizado.`;
    } else {
      appData[catalog.id] = [newRecord, ...records];
      catalogState.message = `${catalog.label}: registro agregado.`;
    }

    catalogState.editingId = null;
    catalogState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function setCatalogTab(catalogId) {
    if (!CATALOGS.some((catalog) => catalog.id === catalogId)) return;
    catalogState = {
      activeCatalogId: catalogId,
      editingId: null,
      message: null,
      messageType: 'success'
    };
    renderRoute();
  }

  function editCatalogRecord(recordId) {
    if (!canCurrentRole('editCatalogs')) {
      catalogState.message = 'Solo Administrador puede editar Catálogos.';
      catalogState.messageType = 'error';
      renderRoute();
      return;
    }
    const catalog = getActiveCatalog();
    const record = getCatalogRecords(catalog.id).find((item) => item.id === recordId);
    if (!record) return;
    catalogState.editingId = recordId;
    catalogState.message = null;
    renderRoute();
  }

  function toggleCatalogRecord(recordId) {
    if (!canCurrentRole('editCatalogs')) {
      catalogState.message = 'Solo Administrador puede activar o desactivar Catálogos.';
      catalogState.messageType = 'error';
      renderRoute();
      return;
    }
    const catalog = getActiveCatalog();
    const records = getCatalogRecords(catalog.id);
    const record = records.find((item) => item.id === recordId);
    if (!record) return;

    const shouldActivate = !record.activo;
    if (shouldActivate) {
      const duplicate = records.find((item) => (
        item.id !== recordId &&
        item.activo &&
        normalizeNameForCompare(item.nombre) === normalizeNameForCompare(record.nombre)
      ));

      if (duplicate) {
        catalogState.message = `No se puede activar: ya existe un registro activo con el nombre “${record.nombre}”.`;
        catalogState.messageType = 'error';
        renderRoute();
        return;
      }
    }

    appData[catalog.id] = records.map((item) => item.id === recordId
      ? { ...item, activo: shouldActivate, updatedAt: nowIso() }
      : item);

    catalogState.editingId = null;
    catalogState.message = `${record.nombre} quedó ${shouldActivate ? 'activo' : 'inactivo'}.`;
    catalogState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearCatalogForm() {
    catalogState.editingId = null;
    catalogState.message = null;
    renderRoute();
  }

  function bindViewActions() {
    viewRoot.querySelectorAll('[data-go]').forEach((button) => {
      button.addEventListener('click', () => setRoute(button.dataset.go));
    });


    viewRoot.querySelectorAll('[data-resumen-filters]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateResumenFiltersFromForm(form);
      });
      form.addEventListener('change', () => updateResumenFiltersFromForm(form));
    });

    viewRoot.querySelectorAll('[data-resumen-clear]').forEach((button) => {
      button.addEventListener('click', clearResumenFilters);
    });

    viewRoot.querySelectorAll('[data-catalog-tab]').forEach((button) => {
      button.addEventListener('click', () => setCatalogTab(button.dataset.catalogTab));
    });

    viewRoot.querySelectorAll('[data-catalog-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveCatalogRecord(form);
      });
    });

    viewRoot.querySelectorAll('[data-catalog-clear], [data-catalog-cancel]').forEach((button) => {
      button.addEventListener('click', clearCatalogForm);
    });

    viewRoot.querySelectorAll('[data-catalog-edit]').forEach((button) => {
      button.addEventListener('click', () => editCatalogRecord(button.dataset.catalogEdit));
    });

    viewRoot.querySelectorAll('[data-catalog-toggle]').forEach((button) => {
      button.addEventListener('click', () => toggleCatalogRecord(button.dataset.catalogToggle));
    });

    viewRoot.querySelectorAll('[data-venta-form]').forEach((form) => {
      setupVentaLiveCalculations(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveVentaRecord(form);
      });
    });

    viewRoot.querySelectorAll('[data-venta-clear], [data-venta-cancel]').forEach((button) => {
      button.addEventListener('click', clearVentaForm);
    });

    viewRoot.querySelectorAll('[data-venta-edit]').forEach((button) => {
      button.addEventListener('click', () => editVentaRecord(button.dataset.ventaEdit));
    });

    viewRoot.querySelectorAll('[data-venta-toggle]').forEach((button) => {
      button.addEventListener('click', () => toggleVentaRecord(button.dataset.ventaToggle));
    });

    viewRoot.querySelectorAll('[data-cobros-for]').forEach((button) => {
      button.addEventListener('click', () => {
        cobrosState.selectedVentaId = button.dataset.cobrosFor || '';
        setRoute('cobros');
      });
    });

    viewRoot.querySelectorAll('[data-cobro-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveCobroRecord(form);
      });
      form.querySelector('[data-cobro-venta]')?.addEventListener('change', (event) => selectCobroVenta(event.target.value));
      form.querySelector('[data-cobro-fill-full]')?.addEventListener('click', (event) => fillCobroFullAmount(form, event.currentTarget.dataset.cobroFillFull));
    });

    viewRoot.querySelectorAll('[data-cobro-annul]').forEach((button) => {
      button.addEventListener('click', () => annulCobroRecord(button.dataset.cobroAnnul));
    });

    viewRoot.querySelectorAll('[data-cobro-clear-focus]').forEach((button) => {
      button.addEventListener('click', () => {
        cobrosState.focusVentaId = '';
        renderRoute();
      });
    });

    viewRoot.querySelectorAll('[data-compra-form]').forEach((form) => {
      setupCompraProveedorLiveCalculations(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveCompraProveedorRecord(form);
      });
    });

    viewRoot.querySelectorAll('[data-compra-clear], [data-compra-cancel]').forEach((button) => {
      button.addEventListener('click', clearCompraProveedorForm);
    });

    viewRoot.querySelectorAll('[data-compra-edit]').forEach((button) => {
      button.addEventListener('click', () => editCompraProveedorRecord(button.dataset.compraEdit));
    });

    viewRoot.querySelectorAll('[data-compra-toggle]').forEach((button) => {
      button.addEventListener('click', () => toggleCompraProveedorRecord(button.dataset.compraToggle));
    });

    viewRoot.querySelectorAll('[data-pago-start]').forEach((button) => {
      button.addEventListener('click', () => startPagoForCompra(button.dataset.pagoStart));
    });

    viewRoot.querySelectorAll('[data-pago-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        savePagoProveedorRecord(form);
      });
      form.querySelector('[data-pago-compra]')?.addEventListener('change', (event) => selectPagoCompra(event.target.value));
      form.querySelector('[data-pago-fill-full]')?.addEventListener('click', (event) => fillPagoFullAmount(form, event.currentTarget.dataset.pagoFillFull));
    });

    viewRoot.querySelectorAll('[data-pago-annul]').forEach((button) => {
      button.addEventListener('click', () => annulPagoProveedorRecord(button.dataset.pagoAnnul));
    });

    viewRoot.querySelectorAll('[data-pago-clear-focus]').forEach((button) => {
      button.addEventListener('click', () => {
        pagosState.focusCompraId = '';
        pagosState.message = null;
        renderRoute();
      });
    });

    viewRoot.querySelectorAll('[data-gasto-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveGastoRecord(form);
      });
    });

    viewRoot.querySelectorAll('[data-gasto-clear], [data-gasto-cancel]').forEach((button) => {
      button.addEventListener('click', clearGastoForm);
    });

    viewRoot.querySelectorAll('[data-gasto-edit]').forEach((button) => {
      button.addEventListener('click', () => editGastoRecord(button.dataset.gastoEdit));
    });

    viewRoot.querySelectorAll('[data-gasto-annul]').forEach((button) => {
      button.addEventListener('click', () => annulGastoRecord(button.dataset.gastoAnnul));
    });

    viewRoot.querySelectorAll('[data-history-venta]').forEach((button) => {
      button.addEventListener('click', () => showDocumentHistory('venta', button.dataset.historyVenta));
    });

    viewRoot.querySelectorAll('[data-history-compra]').forEach((button) => {
      button.addEventListener('click', () => showDocumentHistory('compra', button.dataset.historyCompra));
    });

    viewRoot.querySelectorAll('[data-history-clear]').forEach((button) => {
      button.addEventListener('click', () => {
        moraState.selectedKind = '';
        moraState.selectedId = '';
        renderRoute();
      });
    });

    viewRoot.querySelectorAll('[data-excel-file]').forEach((input) => {
      input.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        handleExcelFileSelected(file);
      });
    });

    viewRoot.querySelectorAll('[data-import-confirm]').forEach((button) => {
      button.addEventListener('click', () => {
        const modeElement = viewRoot.querySelector('[data-import-mode]');
        confirmExcelImport(modeElement?.value || 'merge');
      });
    });

    viewRoot.querySelectorAll('[data-import-cancel]').forEach((button) => {
      button.addEventListener('click', clearExcelImportState);
    });

    viewRoot.querySelectorAll('[data-excel-export-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleExcelExportSubmit(form);
      });
    });

    viewRoot.querySelectorAll('[data-cierre-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleCierreMensualSubmit(form);
      });
    });

    viewRoot.querySelectorAll('[data-config-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateConfigFromForm(form);
      });
    });

    viewRoot.querySelectorAll('[data-config-role]').forEach((select) => {
      select.addEventListener('change', (event) => setCurrentRole(event.target.value));
    });

    viewRoot.querySelectorAll('[data-json-export]').forEach((button) => {
      button.addEventListener('click', exportJsonBackup);
    });

    viewRoot.querySelectorAll('[data-json-file]').forEach((input) => {
      input.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        handleJsonFileSelected(file);
      });
    });

    viewRoot.querySelectorAll('[data-json-import-confirm]').forEach((button) => {
      button.addEventListener('click', () => {
        const modeElement = viewRoot.querySelector('[data-json-import-mode]');
        confirmJsonImport(modeElement?.value || 'merge');
      });
    });

    viewRoot.querySelectorAll('[data-json-import-cancel]').forEach((button) => {
      button.addEventListener('click', clearJsonImportState);
    });

    setupMoraSearch();
    setupCobrosSearch();
    setupPagosSearch();
    setupGastosSearch();

  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => setRoute(button.dataset.route));
  });

  window.addEventListener('hashchange', renderRoute);

  if (!window.location.hash) {
    window.history.replaceState(null, '', '#home');
  }
  renderRoute();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch((error) => {
        console.warn('KSA PRÁCTIKA: service worker no registrado.', error);
      });
    });
  }
})();
