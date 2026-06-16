(() => {
  'use strict';

  const APP_NAME = 'KSA PRÁCTIKA';
  const APP_VERSION = '0.17.41-post12-config-json-importados-tipo-operacion';
  const SCHEMA_VERSION = '1.0.0';
  const STORAGE_KEY = 'KSA_PRACTIKA_DATA_v1';
  const DEVICE_IDENTITY_STORAGE_KEY = 'KSA_PRACTIKA_DEVICE_IDENTITY_v1';
  const ACTIVITY_LOG_STORAGE_KEY = 'KSA_PRACTIKA_ACTIVITY_LOG_v1';
  const JSON_EXPORT_SEQUENCE_STORAGE_KEY = 'KSA_PRACTIKA_JSON_EXPORT_SEQUENCE_v1';
  const JSON_APPLIED_STORAGE_KEY = 'KSA_PRACTIKA_LAST_JSON_APPLIED_v1';
  const JSON_IMPORT_HISTORY_STORAGE_KEY = 'KSA_PRACTIKA_JSON_IMPORT_HISTORY_v1';
  const JSON_IMPORT_HISTORY_MAX_ENTRIES = 80;
  const ACTIVITY_LOG_MAX_ENTRIES = 300;
  const BANK_TYPE_OPTIONS = ['Transferencia', 'Depósito', 'Tarjeta'];
  const COMPRA_AJUSTE_TYPES = ['Faltante', 'Devolución', 'Rebaja', 'Nota de crédito', 'Corrección'];
  const VENTA_AJUSTE_TYPES = ['Quebrado', 'Faltante', 'Devolución', 'Rebaja', 'Nota de crédito', 'Corrección'];

  const MODULES = [
    {
      id: 'resumen',
      icon: '▦',
      title: 'Resumen / Tablero',
      short: 'Resumen',
      description: 'Tablero operativo con indicadores, filtros, cartera, mora, alertas y listados útiles para controlar el período.',
      placeholder: 'Resumen / Tablero ya está activo con filtros, total de ventas, cobros, proveedores, gastos, mora y alertas.'
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
      description: 'Registro de órdenes de compra con subtotal, descuento, total, vencimiento, saldo por cobrar y estado automático consistente.',
      placeholder: 'Ventas / OC permite crear, editar, anular, calcular total y mantener saldo/estado conectado con Cobros y Mora.'
    },
    {
      id: 'cobros',
      icon: '↧',
      title: 'Cobros de clientes',
      short: 'Cobros',
      description: 'Control de pagos completos o abonos parciales ligados a una OC específica.',
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
      description: 'Control práctico de gastos por fecha, tipo, método, banco, estado y observación.',
      placeholder: 'Gastos ya permite crear, editar y anular registros usando tipos, métodos y bancos desde Catálogos.'
    },
    {
      id: 'catalogos',
      icon: '☷',
      title: 'Catálogos',
      short: 'Catálogos',
      description: 'Listas maestras para clientes, sucursales, proveedores, condiciones de pago, métodos de pago y bancos.',
      placeholder: 'Administra las listas maestras que alimentarán ventas, cobros, compras, pagos y gastos.'
    },
    {
      id: 'bdatos',
      icon: 'BD',
      title: 'Bdatos',
      short: 'Bdatos',
      description: 'Base informativa de artículos con código, descripción y precio, sin conexión operativa con ventas ni cálculos.',
      placeholder: 'Administra artículos informativos sin alimentar OC, compras, cobros, pagos, gastos, tablero, Excel ni cálculos.'
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
    'bdatos',
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
        { name: 'condicionPago', label: 'Condición de pago', type: 'select', options: ['Contado', 'Crédito'], required: true },
        { name: 'diasCredito', label: 'Días de crédito', type: 'number', min: 0, step: 1, inputmode: 'numeric', placeholder: '0' },
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
        { name: 'condicionPago', label: 'Condición de pago', type: 'select', options: ['Contado', 'Crédito'], required: true },
        { name: 'diasCredito', label: 'Días de crédito', type: 'number', min: 0, step: 1, inputmode: 'numeric', placeholder: '0' },
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
      description: 'Métodos simples disponibles para cobros, pagos y gastos. La relación con bancos se define desde Bancos por Tipo.',
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Ej. Transferencia' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del método' }
      ]
    },
    {
      id: 'cuentasBancos',
      label: 'Bancos',
      singular: 'banco',
      icon: 'BK',
      description: 'Bancos por tipo para asociar cobros, pagos y gastos: Transferencia, Depósito o Tarjeta.',
      fields: [
        { name: 'nombre', label: 'Nombre del banco', type: 'text', required: true, placeholder: 'Ej. BAC, Lafise, Banpro' },
        { name: 'tipo', label: 'Tipo', type: 'select', options: BANK_TYPE_OPTIONS, required: true, placeholder: 'Seleccionar tipo' },
        { name: 'observacion', label: 'Observación', type: 'textarea', placeholder: 'Notas internas del banco' }
      ]
    }
  ];

  const DEFAULT_SEEDS = {
    tiposGasto: ['Estacionamiento', 'Cargadores', 'Transporte', 'Combustible', 'Empaque', 'Otros'],
    metodosPago: [
      { nombre: 'Efectivo' },
      { nombre: 'Transferencia' },
      { nombre: 'Depósito' },
      { nombre: 'Tarjeta' }
    ],
    cuentasBancos: [
      { nombre: 'Banco', tipo: 'Transferencia' }
    ]
  };

  const BDATOS_INITIAL_SEED_VERSION = 'jcg-2026-06-14';
  const BDATOS_INITIAL_UPDATED_AT = '2026-06-14T16:38:00-06:00';
  const BDATOS_INITIAL_ARTICLES = [
  {
    "codigo": "383409",
    "descripcion": "Balde plástico c/tapa 17 litros",
    "precio": 150.0
  },
  {
    "codigo": "18020",
    "descripcion": "Bolso Pañalero",
    "precio": 370.0
  },
  {
    "codigo": "785072080883",
    "descripcion": "Bolso Plastico Pokemon",
    "precio": 75.0
  },
  {
    "codigo": "370884",
    "descripcion": "Bolso Tela de Galleta 25X18CM Diseños Unisex",
    "precio": 13.0
  },
  {
    "codigo": "368274",
    "descripcion": "Botella Plastica 750 ML",
    "precio": 75.0
  },
  {
    "codigo": "7453086701805",
    "descripcion": "Buzo Escolar de Adulto S-M-L",
    "precio": 250.0
  },
  {
    "codigo": "745307300318",
    "descripcion": "Buzo Escolar Juvenil 8-16",
    "precio": 200.0
  },
  {
    "codigo": "745308654473",
    "descripcion": "Buzos Escolares Infrantil 2-7",
    "precio": 180.0
  },
  {
    "codigo": "7453086322222",
    "descripcion": "Calcetas Blancas Altas 3 Piezas Leomene",
    "precio": 90.0
  },
  {
    "codigo": "7453074843210",
    "descripcion": "Calcetas Blancas Altas 3 Piezas Shadia School",
    "precio": 75.0
  },
  {
    "codigo": "0000001082302",
    "descripcion": "Calcetas P/ Niñas Caladas Altas",
    "precio": 50.0
  },
  {
    "codigo": "350078",
    "descripcion": "Canasta Acero Porta Papas",
    "precio": 166.0
  },
  {
    "codigo": "000000147125",
    "descripcion": "Cenicero de Vidrio(MM)",
    "precio": 70.0
  },
  {
    "codigo": "0000000135856",
    "descripcion": "Chinela de Baño P/Hombre Nesser Sport (Mauro)",
    "precio": 140.0
  },
  {
    "codigo": "9312",
    "descripcion": "Chinela de Baño para Señora Tulip (Mauro)",
    "precio": 120.0
  },
  {
    "codigo": "0000001032024",
    "descripcion": "Chinela P/ Niña Gardenia 11579",
    "precio": 120.0
  },
  {
    "codigo": "0000000135986",
    "descripcion": "Chinela P/Señora Shiseldo 27838 (Mauro)",
    "precio": 150.0
  },
  {
    "codigo": "0000000267502",
    "descripcion": "Chinela para Hombre Boltio (Mauro)",
    "precio": 220.0
  },
  {
    "codigo": "0000000267557",
    "descripcion": "Chinela para Niño BKS (Mauro)",
    "precio": 150.0
  },
  {
    "codigo": "0000000135894",
    "descripcion": "Chinela para Señora Layla 3325 (Mauro)",
    "precio": 130.0
  },
  {
    "codigo": "000000267663",
    "descripcion": "Chinelas Gardenia para Niñas (1227)",
    "precio": 190.0
  },
  {
    "codigo": "7450030238042",
    "descripcion": "Chinelas P/Niña Disney Princesa",
    "precio": 140.0
  },
  {
    "codigo": "745003023922",
    "descripcion": "Chinelas P/Niño Disney Disney Pixar",
    "precio": 115.0
  },
  {
    "codigo": "7450030237854",
    "descripcion": "Chinelas P/Niño Disney Lasser Blast",
    "precio": 120.0
  },
  {
    "codigo": "0000001065978",
    "descripcion": "Cojin",
    "precio": 270.0
  },
  {
    "codigo": "0000001060331",
    "descripcion": "Colador Plastico",
    "precio": 35.0
  },
  {
    "codigo": "0000000166089",
    "descripcion": "Container Plastico P/Microwave",
    "precio": 110.0
  },
  {
    "codigo": "18026",
    "descripcion": "Contenedores Plasticos Multiusos 4PZS",
    "precio": 170.0
  },
  {
    "codigo": "0000001044003",
    "descripcion": "Copa Champagne",
    "precio": 75.0
  },
  {
    "codigo": "0000001032031",
    "descripcion": "Copa P/ Tequila",
    "precio": 42.0
  },
  {
    "codigo": "0000000147446",
    "descripcion": "Copa P/Trago Mauro Medina",
    "precio": 27.0
  },
  {
    "codigo": "0000000208192",
    "descripcion": "Cortina de Baño Doble",
    "precio": 200.0
  },
  {
    "codigo": "0000001032048",
    "descripcion": "Cortina de Baño Kennedy",
    "precio": 165.0
  },
  {
    "codigo": "320792",
    "descripcion": "Cuchara Melamina P Sopa",
    "precio": 15.0
  },
  {
    "codigo": "306764",
    "descripcion": "Cuchara Metalica P/ Comedor",
    "precio": 35.0
  },
  {
    "codigo": "000000390309",
    "descripcion": "Cuchillo de Metal P/Mesa (Mauro Medina)",
    "precio": 35.0
  },
  {
    "codigo": "0000000838801",
    "descripcion": "Cuchillo Metal Mundial American #10",
    "precio": 80.0
  },
  {
    "codigo": "0000000838818",
    "descripcion": "Cuchillo Metal Mundial American #12",
    "precio": 85.0
  },
  {
    "codigo": "0000000838795",
    "descripcion": "Cuchillo Metal Mundial American #7",
    "precio": 70.0
  },
  {
    "codigo": "0000000147484",
    "descripcion": "Ensaladera de Vidrio Peq",
    "precio": 50.0
  },
  {
    "codigo": "000000147477",
    "descripcion": "Ensaladera Vidrio Grande",
    "precio": 85.0
  },
  {
    "codigo": "0000000862509",
    "descripcion": "Envase Plastico C/Tapa Mega",
    "precio": 25.0
  },
  {
    "codigo": "0000000999205",
    "descripcion": "Estuche Plastico P/ Cubiertos",
    "precio": 140.0
  },
  {
    "codigo": "0000000435499",
    "descripcion": "Frasco Azucarero Vidrio Di-14421",
    "precio": 90.0
  },
  {
    "codigo": "18058",
    "descripcion": "Hacha C/ Mango para Picar",
    "precio": 155.0
  },
  {
    "codigo": "0000000039550",
    "descripcion": "Individual para Comedor",
    "precio": 220.0
  },
  {
    "codigo": "0000001063806",
    "descripcion": "Jabonera C/ Tapa",
    "precio": 30.0
  },
  {
    "codigo": "0000001032055",
    "descripcion": "Jarra Cervecera",
    "precio": 55.0
  },
  {
    "codigo": "00000026023",
    "descripcion": "Lazo Grande Prensapelo de Colores Surtidos",
    "precio": 55.0
  },
  {
    "codigo": "000000435260",
    "descripcion": "Mantel Damasco P/Comedor",
    "precio": 170.0
  },
  {
    "codigo": "0000001082326",
    "descripcion": "Media Calcetin P/ Niña ( Juvenil) Alpina ( 4-10)",
    "precio": 30.0
  },
  {
    "codigo": "0000000402309",
    "descripcion": "Pana Sopera Mediana Melamina",
    "precio": 50.0
  },
  {
    "codigo": "000000402279",
    "descripcion": "Panita Sopera Melamina P/Bebe Looney Tunes",
    "precio": 35.0
  },
  {
    "codigo": "0000001063875",
    "descripcion": "Pañuelos Colores Surtidos 3 PZS Picalini",
    "precio": 150.0
  },
  {
    "codigo": "0000001032017",
    "descripcion": "Perchas Plasticas Set 10 PZAS",
    "precio": 65.0
  },
  {
    "codigo": "370651",
    "descripcion": "Perol # 9. Capacidad entre 10 y 14 LIB",
    "precio": 610.0
  },
  {
    "codigo": "0000001032352",
    "descripcion": "Pichel de Plastico C/ Vasos",
    "precio": 115.0
  },
  {
    "codigo": "000000188418",
    "descripcion": "Pichel de Vidrio con Tapa",
    "precio": 140.0
  },
  {
    "codigo": "0000000147040",
    "descripcion": "Pichel Plastico C/Tapa(MM)",
    "precio": 60.0
  },
  {
    "codigo": "0000001030280",
    "descripcion": "Pinza Grande P/ Cocina",
    "precio": 50.0
  },
  {
    "codigo": "332469",
    "descripcion": "Pinza Grande P/ Cocina",
    "precio": 65.0
  },
  {
    "codigo": "0000001030297",
    "descripcion": "Pinza Mediana P/ Cocina",
    "precio": 45.0
  },
  {
    "codigo": "333206",
    "descripcion": "Plato de Melamina Delux",
    "precio": 130.0
  },
  {
    "codigo": "320409",
    "descripcion": "Plato de Melamina para Cafetin",
    "precio": 65.0
  },
  {
    "codigo": "000000050173",
    "descripcion": "Plato de Porcelana No. 10",
    "precio": 60.0
  },
  {
    "codigo": "320791",
    "descripcion": "Plato Melamina Jumbo",
    "precio": 85.0
  },
  {
    "codigo": "18072",
    "descripcion": "Plato Melamine # 9",
    "precio": 50.0
  },
  {
    "codigo": "0000000146999",
    "descripcion": "Plato Melamine #10 Mauro Medina",
    "precio": 55.0
  },
  {
    "codigo": "0000001044034",
    "descripcion": "Plato Melamine Niño",
    "precio": 45.0
  },
  {
    "codigo": "0000000188296",
    "descripcion": "Pocillo de Porcelana Grande",
    "precio": 55.0
  },
  {
    "codigo": "000000147057",
    "descripcion": "Pocillo Melamina Colores (MM)",
    "precio": 35.0
  },
  {
    "codigo": "000000147071",
    "descripcion": "Pocillo Melamina P/Niño (MM)",
    "precio": 35.0
  },
  {
    "codigo": "7450041463259",
    "descripcion": "Pocillo Porcelana Decorado Portobello",
    "precio": 70.0
  },
  {
    "codigo": "00000026017",
    "descripcion": "Prensapelo C/ Piedras Variados",
    "precio": 50.0
  },
  {
    "codigo": "00000026020",
    "descripcion": "Prensapelo de Colores Variados",
    "precio": 50.0
  },
  {
    "codigo": "00000026021",
    "descripcion": "Prensapelo de Colores Variados",
    "precio": 50.0
  },
  {
    "codigo": "00000026016",
    "descripcion": "Prensapelo de Metal Surtido",
    "precio": 27.0
  },
  {
    "codigo": "00000026019",
    "descripcion": "Prensapelo de Perlas y Piedras Variado",
    "precio": 52.0
  },
  {
    "codigo": "00000026022",
    "descripcion": "Prensapelo Metal/Perlas Variados",
    "precio": 50.0
  },
  {
    "codigo": "00000026018",
    "descripcion": "Prensapelo Perlas Variado",
    "precio": 50.0
  },
  {
    "codigo": "5019854506199",
    "descripcion": "Prensaropa Carvation ( Bolsa de 50 Unidades)",
    "precio": 65.0
  },
  {
    "codigo": "7453051912205",
    "descripcion": "Protector Plastico P/ Mesa",
    "precio": 135.0
  },
  {
    "codigo": "7453076208499",
    "descripcion": "Rayador Multiple Usos",
    "precio": 120.0
  },
  {
    "codigo": "0000001010015",
    "descripcion": "Rebanador de Vegetales",
    "precio": 110.0
  },
  {
    "codigo": "0000000999182",
    "descripcion": "Recipiente Plastico Pequeño",
    "precio": 35.0
  },
  {
    "codigo": "7453046529241",
    "descripcion": "Sanadalia P/ Hombre Playera",
    "precio": 240.0
  },
  {
    "codigo": "000000135795",
    "descripcion": "Sandalia Neser Club (Mauro) 9622",
    "precio": 140.0
  },
  {
    "codigo": "7453066830192",
    "descripcion": "Sandalia P/ Hombre 2SURF",
    "precio": 300.0
  },
  {
    "codigo": "0000001030310",
    "descripcion": "Sandalia P/ Señora Surf",
    "precio": 360.0
  },
  {
    "codigo": "7453037621350",
    "descripcion": "Sandalia P/Niños Boltio",
    "precio": 240.0
  },
  {
    "codigo": "0000000147330",
    "descripcion": "Sandalia P/Sra. Exessy No.808017",
    "precio": 120.0
  },
  {
    "codigo": "0000000135955",
    "descripcion": "Sandalia para Niña Gardenia 11758 (Mauro)",
    "precio": 240.0
  },
  {
    "codigo": "0000000135887",
    "descripcion": "Sandalia para Niño Tico Fun (Mauro)",
    "precio": 115.0
  },
  {
    "codigo": "000000135870",
    "descripcion": "Sandalia para Señora Gardenia 11573 (Mauro)",
    "precio": 250.0
  },
  {
    "codigo": "000000370448",
    "descripcion": "Sandalia Tiko Fun Talla 28-34 P/Niño REF 888",
    "precio": 150.0
  },
  {
    "codigo": "0000001043983",
    "descripcion": "Set de Taza C/ Plato de Vidrio Rose",
    "precio": 260.0
  },
  {
    "codigo": "0000001109481",
    "descripcion": "Set de Tazas de Cristal para Cafe 3S",
    "precio": 140.0
  },
  {
    "codigo": "0000000402217",
    "descripcion": "Set de Tazas P/Cafe C/Plato de Vidrio Tulip",
    "precio": 290.0
  },
  {
    "codigo": "0000001043976",
    "descripcion": "Set Tazas Mug",
    "precio": 170.0
  },
  {
    "codigo": "7453007046299",
    "descripcion": "Sukasa Deluxe For The Bath",
    "precio": 120.0
  },
  {
    "codigo": "000000188487",
    "descripcion": "Tabla para Picar Carne",
    "precio": 90.0
  },
  {
    "codigo": "18098",
    "descripcion": "Tabla para Picar Kitchen Pro 2404",
    "precio": 140.0
  },
  {
    "codigo": "751689080080",
    "descripcion": "Talquera Jannette 120 GR",
    "precio": 120.0
  },
  {
    "codigo": "0000001032086",
    "descripcion": "Taza C/ Escudilla Porcelana",
    "precio": 70.0
  },
  {
    "codigo": "0000001032079",
    "descripcion": "Taza C/ Plato Porcelana Grande",
    "precio": 75.0
  },
  {
    "codigo": "0000001032376",
    "descripcion": "Taza C/ Plato Porcelana Lisa",
    "precio": 75.0
  },
  {
    "codigo": "0000001109467",
    "descripcion": "Taza de Vidrio para Cafe",
    "precio": 40.0
  },
  {
    "codigo": "00000020722",
    "descripcion": "Taza Grande de Vidrio para Cafe",
    "precio": 50.0
  },
  {
    "codigo": "18104",
    "descripcion": "Taza para Cafe",
    "precio": 35.0
  },
  {
    "codigo": "0000000212830",
    "descripcion": "Taza para Ensalada (Fpm-258)",
    "precio": 60.0
  },
  {
    "codigo": "7453056340713",
    "descripcion": "Taza Porcelana Variada",
    "precio": 35.0
  },
  {
    "codigo": "0000000147088",
    "descripcion": "Taza Sopera Melamina(MM)",
    "precio": 65.0
  },
  {
    "codigo": "0000000392402",
    "descripcion": "Taza Sopera Melamine P/Niño (Mauro M)",
    "precio": 50.0
  },
  {
    "codigo": "0000000147521",
    "descripcion": "Taza Sopera Porcelana No.12",
    "precio": 75.0
  },
  {
    "codigo": "0000000907262",
    "descripcion": "Tazon P/Consume Porcelana MM",
    "precio": 70.0
  },
  {
    "codigo": "0000000390286",
    "descripcion": "Tenedor de Metal (Mauro Medina)",
    "precio": 35.0
  },
  {
    "codigo": "333200",
    "descripcion": "Termo Plastico Mediano",
    "precio": 35.0
  },
  {
    "codigo": "7629923247113",
    "descripcion": "Termo Plastico P/ Niños",
    "precio": 85.0
  },
  {
    "codigo": "7401093810737",
    "descripcion": "Toalla Palm Springs",
    "precio": 195.0
  },
  {
    "codigo": "0000000343497",
    "descripcion": "Toalla Princess Collection Algodon 30X60",
    "precio": 190.0
  },
  {
    "codigo": "0000000435369",
    "descripcion": "Toallas P/Lavamanos Colores Surtidos",
    "precio": 85.0
  },
  {
    "codigo": "0000000188364",
    "descripcion": "Vaso Acrilico 14 ONZ",
    "precio": 45.0
  },
  {
    "codigo": "8779393531812",
    "descripcion": "Vaso C/ Boquilla",
    "precio": 115.0
  },
  {
    "codigo": "0000000147408",
    "descripcion": "Vaso Canaleta 16 ONZ",
    "precio": 60.0
  },
  {
    "codigo": "18120",
    "descripcion": "Vaso de Vidrio 12 Onzas",
    "precio": 50.0
  },
  {
    "codigo": "18121",
    "descripcion": "Vaso de Vidrio 14 Onzas (Mauro M)",
    "precio": 55.0
  },
  {
    "codigo": "18125",
    "descripcion": "Vaso de Vidrio Karaman Pasabahce 16 ONZ.",
    "precio": 55.0
  },
  {
    "codigo": "0000000188142",
    "descripcion": "Vaso de Vidrio Sylvana 16 ONZ.",
    "precio": 52.0
  },
  {
    "codigo": "18124",
    "descripcion": "Vaso Rock Topaz 16 ONZ",
    "precio": 65.0
  }
];


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
    ['bdatos', 'bdatos'],
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

  let bdatosState = {
    search: '',
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let ventasState = {
    editingId: null,
    quickCapture: null,
    selectedAjusteVentaId: '',
    openGroupKey: '',
    message: null,
    messageType: 'success'
  };

  let cobrosState = {
    selectedVentaId: '',
    focusVentaId: '',
    openGroupKey: '',
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let proveedoresState = {
    editingId: null,
    quickCapture: null,
    selectedAjusteCompraId: '',
    openGroupKey: '',
    message: null,
    messageType: 'success'
  };

  let pagosState = {
    selectedCompraId: '',
    focusCompraId: '',
    openGroupKey: '',
    editingId: null,
    message: null,
    messageType: 'success'
  };

  let gastosState = {
    editingId: null,
    openGroupKey: '',
    message: null,
    messageType: 'success'
  };

  let moraState = {
    selectedKind: '',
    selectedId: ''
  };

  let resumenState = {
    month: '',
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

  let lastRenderedRoute = null;
  let operationalScrollbarResizeHandler = null;
  let operationalScrollbarCleanup = null;


  let jsonBackupState = {
    fileName: '',
    isProcessing: false,
    preview: null,
    payload: null,
    activityLog: [],
    message: null,
    messageType: 'success'
  };

  let configState = {
    message: null,
    messageType: 'success'
  };

  let pwaState = {
    status: 'Actualizada',
    statusType: 'success',
    updateAvailable: false,
    isChecking: false,
    isApplying: false,
    message: ''
  };

  let serviceWorkerRegistration = null;
  let pwaReloadScheduled = false;

  const PWA_RELOAD_LOCK_KEY = 'KSA_PRACTIKA_PWA_RELOAD_LOCK';
  const PWA_APPLY_PENDING_KEY = 'KSA_PRACTIKA_PWA_APPLY_PENDING';
  const CONFIG_SCROLL_RESTORE_KEY = 'KSA_PRACTIKA_CONFIG_SCROLL_RESTORE';

  function nowIso() {
    return new Date().toISOString();
  }

  function generateId(prefix = 'id') {
    const random = Math.random().toString(36).slice(2, 9);
    return `${prefix}_${Date.now().toString(36)}_${random}`;
  }

  function createDefaultDeviceIdentity(timestamp = nowIso()) {
    return {
      deviceId: generateId('dev'),
      deviceName: 'Este equipo',
      createdAt: timestamp,
      updatedAt: timestamp
    };
  }

  function normalizeDeviceIdentity(identity) {
    const timestamp = nowIso();
    const source = isPlainObject(identity) ? identity : {};
    const fallback = createDefaultDeviceIdentity(timestamp);
    return {
      deviceId: cleanText(source.deviceId) || fallback.deviceId,
      deviceName: cleanText(source.deviceName) || 'Este equipo',
      createdAt: cleanText(source.createdAt) || timestamp,
      updatedAt: cleanText(source.updatedAt) || cleanText(source.createdAt) || timestamp,
      lastActivity: normalizeActivitySummary(source.lastActivity)
    };
  }

  function loadDeviceIdentity() {
    try {
      const raw = localStorage.getItem(DEVICE_IDENTITY_STORAGE_KEY);
      const identity = raw ? normalizeDeviceIdentity(JSON.parse(raw)) : createDefaultDeviceIdentity();
      localStorage.setItem(DEVICE_IDENTITY_STORAGE_KEY, JSON.stringify(identity));
      return identity;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: se regeneró la identidad local del equipo.', error);
      const identity = createDefaultDeviceIdentity();
      try {
        localStorage.setItem(DEVICE_IDENTITY_STORAGE_KEY, JSON.stringify(identity));
      } catch (storageError) {
        console.warn('KSA PRÁCTIKA: no se pudo guardar la identidad local del equipo.', storageError);
      }
      return identity;
    }
  }

  function saveDeviceIdentity(identity) {
    appDeviceIdentity = normalizeDeviceIdentity(identity);
    try {
      localStorage.setItem(DEVICE_IDENTITY_STORAGE_KEY, JSON.stringify(appDeviceIdentity));
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo guardar la identidad local del equipo.', error);
    }
    return appDeviceIdentity;
  }

  function getShortDeviceId(deviceId) {
    const cleanId = cleanText(deviceId);
    if (!cleanId) return '—';
    const compact = cleanId.replace(/[^a-z0-9]/gi, '');
    const suffix = compact.slice(-8) || cleanId.slice(-8);
    return `...${suffix.toUpperCase()}`;
  }

  function formatDateTimeOrText(iso, fallbackText) {
    return cleanText(iso) ? formatDateTime(iso) : fallbackText;
  }

  function normalizeJsonAppliedMetadata(metadata) {
    const raw = isPlainObject(metadata) ? metadata : {};
    const appliedAt = cleanText(raw.appliedAt || raw.importedAt || raw.fechaAplicacion || raw.createdAt);
    const fileName = cleanText(raw.fileName || raw.nombreArchivo || raw.jsonFileName);
    const deviceName = cleanText(raw.deviceName || raw.targetDeviceName || raw.equipo);
    const deviceId = cleanText(raw.deviceId || raw.targetDeviceId || raw.equipoId);
    if (!fileName && !appliedAt) return null;
    return {
      fileName: fileName || 'Respaldo JSON aplicado',
      appliedAt,
      appliedAtDisplay: cleanText(raw.appliedAtDisplay || raw.fechaAplicacionVisible) || (appliedAt ? formatDateTime(appliedAt) : ''),
      deviceId,
      deviceName
    };
  }

  function loadJsonAppliedMetadata() {
    try {
      const raw = localStorage.getItem(JSON_APPLIED_STORAGE_KEY);
      return raw ? normalizeJsonAppliedMetadata(JSON.parse(raw)) : null;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo leer la metadata local de JSON aplicado.', error);
      return null;
    }
  }

  function saveJsonAppliedMetadata(fileName, appliedAt = nowIso()) {
    try {
      const identity = normalizeDeviceIdentity(appDeviceIdentity);
      const normalized = normalizeJsonAppliedMetadata({
        fileName,
        appliedAt,
        appliedAtDisplay: formatDateTime(appliedAt),
        deviceId: identity.deviceId,
        deviceName: identity.deviceName
      });
      if (!normalized) return null;
      localStorage.setItem(JSON_APPLIED_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: la importación terminó, pero no se pudo guardar la metadata local de JSON aplicado.', error);
      return null;
    }
  }


  function formatJsonImportHistoryDate(iso) {
    const cleanIso = cleanText(iso);
    if (!cleanIso) return '—';
    const date = new Date(cleanIso);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('es-NI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  function formatJsonImportHistoryTime(iso) {
    const cleanIso = cleanText(iso);
    if (!cleanIso) return '—';
    const date = new Date(cleanIso);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('es-NI', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }

  function normalizeJsonImportHistoryResult(result) {
    const value = cleanText(result).toLocaleLowerCase('es-NI');
    if (!value) return 'Importado correctamente';
    if (value.includes('advert')) return 'Importado con advertencias';
    if (value.includes('fall')) return 'Fallido';
    if (value.includes('correct') || value.includes('success') || value.includes('ok')) return 'Importado correctamente';
    return cleanText(result);
  }

  function buildJsonImportOperationTimestamp(raw = {}) {
    if (!isPlainObject(raw)) return '';
    const direct = cleanText(
      raw.ts
      || raw.at
      || raw.fechaHora
      || raw.fechaOperacion
      || raw.dateTime
      || raw.datetime
      || raw.createdAt
      || raw.updatedAt
    );
    if (direct) return direct;
    const datePart = cleanText(raw.fecha || raw.date || raw.dia);
    const timePart = cleanText(raw.hora || raw.time);
    if (!datePart) return '';
    const normalizedTime = timePart
      ? (timePart.length === 5 ? `${timePart}:00` : timePart)
      : '00:00:00';
    const isoDate = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoDate) return `${datePart}T${normalizedTime}`;
    const slashDate = datePart.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashDate) {
      const [, day, month, year] = slashDate;
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${normalizedTime}`;
    }
    return buildActivityDetail([datePart, timePart]);
  }

  function formatJsonImportOperationDateTime(value) {
    const text = cleanText(value);
    if (!text) return 'No disponible';
    const formatted = formatDateTime(text);
    return formatted && formatted !== '—' ? formatted : text;
  }

  function classifyJsonImportOperationType(activity = {}) {
    const raw = isPlainObject(activity) ? activity : {};
    const moduleName = cleanText(raw.module || raw.modulo);
    const action = cleanText(raw.action || raw.accion);
    const entityType = cleanText(raw.entityType || raw.tipoEntidad);
    const detail = cleanText(raw.detail || raw.detalle);
    const joinedKey = [moduleName, action, entityType, detail]
      .join(' ')
      .toLocaleLowerCase('es-NI')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (joinedKey.includes('ajuste') || joinedKey.includes('nota')) return 'Ajustes / notas';
    if (joinedKey.includes('cobro')) return 'Cobros';
    if (joinedKey.includes('pago')) return 'Pagos';
    if (joinedKey.includes('proveedor') || joinedKey.includes('compra')) return 'Proveedores / Compras';
    if (joinedKey.includes('venta') || joinedKey.includes('oc ' ) || joinedKey.includes(' oc') || joinedKey === 'oc') return 'Ventas / OC';
    if (joinedKey.includes('gasto')) return 'Gastos';
    if (joinedKey.includes('cierre')) return 'Cierres';
    if (joinedKey.includes('catalogo') || joinedKey.includes('categoria') || joinedKey.includes('cliente') || joinedKey.includes('sucursal')) return 'Catálogos';
    if (joinedKey.includes('configuracion') || joinedKey.includes('config')) return 'Configuración';
    if (joinedKey.includes('json') || joinedKey.includes('respaldo')) return 'JSON / Respaldo';
    if (joinedKey.includes('bdatos') || joinedKey.includes('articulo')) return 'Bdatos';
    if (joinedKey.includes('excel')) return 'Excel';
    return moduleName || entityType || action || 'No disponible';
  }

  function buildJsonImportOperationLabel(activity = {}) {
    return classifyJsonImportOperationType(activity);
  }

  function normalizeJsonImportLastOperation(operation) {
    const raw = isPlainObject(operation) ? operation : {};
    const timestamp = buildJsonImportOperationTimestamp(raw);
    const rawModuleName = cleanText(raw.module || raw.modulo);
    const action = cleanText(raw.action || raw.accion);
    const entityRef = cleanText(raw.entityRef || raw.referencia);
    const amountValue = Number(raw.amount ?? raw.monto);
    const amountText = Number.isFinite(amountValue) ? formatMoney(amountValue) : '';
    const deviceName = cleanText(raw.deviceName || raw.equipo);
    const rawDetail = cleanText(raw.detail || raw.detalle);
    const detail = rawDetail || buildActivityDetail([action, entityRef, amountText, deviceName]);
    if (!timestamp && !rawModuleName && !action && !entityRef && !amountText && !deviceName && !rawDetail) return null;
    const label = buildJsonImportOperationLabel({ ...raw, module: rawModuleName, action, detail: rawDetail });
    return {
      label: label || 'No disponible',
      at: timestamp,
      atDisplay: cleanText(raw.tsVisible || raw.fechaVisible || raw.atDisplay || raw.fechaHoraVisible) || formatJsonImportOperationDateTime(timestamp),
      module: rawModuleName || 'No disponible',
      action: action || '',
      detail: detail || 'No disponible',
      deviceName: deviceName || '',
      entityRef,
      comparableTs: parseComparableTimestamp(timestamp)
    };
  }

  function getJsonBackupBitacoraEntries(raw) {
    if (!isPlainObject(raw)) return [];
    const registros = isPlainObject(raw.registros) ? raw.registros : {};
    const direct = Array.isArray(raw.bitacora) ? raw.bitacora : [];
    const nested = Array.isArray(registros.bitacora) ? registros.bitacora : [];
    return [...nested, ...direct];
  }

  function pickLatestJsonImportOperation(entries = []) {
    const normalized = (Array.isArray(entries) ? entries : [])
      .map((entry, index) => {
        const operation = normalizeJsonImportLastOperation(entry);
        return operation ? { ...operation, __index: index } : null;
      })
      .filter(Boolean);
    if (!normalized.length) return null;
    normalized.sort((a, b) => {
      if (b.comparableTs !== a.comparableTs) return b.comparableTs - a.comparableTs;
      const textCompare = String(b.at || '').localeCompare(String(a.at || ''));
      if (textCompare !== 0) return textCompare;
      return a.__index - b.__index;
    });
    const { __index, comparableTs, ...cleanOperation } = normalized[0];
    return cleanOperation;
  }

  function detectLastOperationFromJsonBackup(raw) {
    if (!isPlainObject(raw)) return null;
    const latestFromLog = pickLatestJsonImportOperation(getJsonBackupBitacoraEntries(raw));
    if (latestFromLog) return { ...latestFromLog, source: 'bitacora' };
    const metadata = isPlainObject(raw.metadata) ? raw.metadata : {};
    const metadataActivity = metadata.lastActivity
      || metadata.ultimaActividad
      || metadata.jsonLastActivity
      || metadata.ultimaActividadJson
      || null;
    const latestFromMetadata = normalizeJsonImportLastOperation(metadataActivity);
    return latestFromMetadata ? { ...latestFromMetadata, source: 'metadata' } : null;
  }

  function normalizeJsonImportHistoryEntry(entry) {
    const raw = isPlainObject(entry) ? entry : {};
    const importedAt = cleanText(raw.importedAt || raw.fechaImportacion || raw.createdAt);
    const fileName = cleanText(raw.fileName || raw.nombreArchivo || raw.jsonFileName);
    const sourceDeviceName = cleanText(raw.sourceDeviceName || raw.equipoOrigen || raw.deviceName);
    const targetDeviceName = cleanText(raw.targetDeviceName || raw.equipoReceptor || raw.localDeviceName);
    const mode = cleanText(raw.mode || raw.modo);
    const modeLabel = cleanText(raw.modeLabel || raw.modoVisible) || (mode === 'replace' ? 'Reemplazar' : (mode === 'merge' ? 'Fusionar' : 'No disponible'));
    const rawResult = cleanText(raw.result || raw.resultado);
    const lastOperation = normalizeJsonImportLastOperation(
      raw.lastOperation
      || raw.ultimaOperacion
      || raw.jsonLastOperation
      || raw.ultimaOperacionJson
      || {
        ts: raw.lastOperationAt || raw.ultimaOperacionFechaHora || raw.fechaHoraOperacion,
        tsVisible: raw.lastOperationAtDisplay || raw.ultimaOperacionVisible,
        module: raw.lastOperationModule || raw.moduloOperacion,
        action: raw.lastOperationAction || raw.accionOperacion,
        detail: raw.lastOperationDetail || raw.detalleOperacion,
        deviceName: raw.lastOperationDeviceName || raw.equipoOperacion,
        entityRef: raw.lastOperationEntityRef || raw.referenciaOperacion,
        amount: raw.lastOperationAmount || raw.montoOperacion
      }
    );
    if (!fileName && !importedAt && !sourceDeviceName && !targetDeviceName && !mode && !rawResult && !lastOperation) return null;
    const result = rawResult ? normalizeJsonImportHistoryResult(rawResult) : 'Importado correctamente';
    return {
      id: cleanText(raw.id) || generateId('jsonimp'),
      fileName: fileName || 'No disponible',
      importedAt,
      importDate: cleanText(raw.importDate || raw.fecha) || formatJsonImportHistoryDate(importedAt),
      importTime: cleanText(raw.importTime || raw.hora) || formatJsonImportHistoryTime(importedAt),
      sourceDeviceId: cleanText(raw.sourceDeviceId || raw.equipoOrigenId),
      sourceDeviceName: sourceDeviceName || 'No disponible',
      targetDeviceId: cleanText(raw.targetDeviceId || raw.equipoReceptorId || raw.localDeviceId),
      targetDeviceName: targetDeviceName || 'No configurado',
      mode: mode || '',
      modeLabel,
      lastOperation: lastOperation || {
        label: 'No disponible',
        at: '',
        atDisplay: 'No disponible',
        module: 'No disponible',
        action: '',
        detail: 'No disponible',
        deviceName: '',
        entityRef: ''
      },
      result,
      createdAt: importedAt || cleanText(raw.createdAt) || nowIso()
    };
  }

  function loadJsonImportHistory() {
    try {
      const raw = localStorage.getItem(JSON_IMPORT_HISTORY_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return (Array.isArray(parsed) ? parsed : [])
        .map((entry) => normalizeJsonImportHistoryEntry(entry))
        .filter(Boolean)
        .sort((a, b) => String(b.importedAt || b.createdAt).localeCompare(String(a.importedAt || a.createdAt)))
        .slice(0, JSON_IMPORT_HISTORY_MAX_ENTRIES);
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo leer el historial local de JSON importados.', error);
      return [];
    }
  }

  function saveJsonImportHistory(entries) {
    try {
      const normalized = (Array.isArray(entries) ? entries : [])
        .map((entry) => normalizeJsonImportHistoryEntry(entry))
        .filter(Boolean)
        .sort((a, b) => String(b.importedAt || b.createdAt).localeCompare(String(a.importedAt || a.createdAt)))
        .slice(0, JSON_IMPORT_HISTORY_MAX_ENTRIES);
      localStorage.setItem(JSON_IMPORT_HISTORY_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo guardar el historial local de JSON importados.', error);
      return loadJsonImportHistory();
    }
  }

  function appendJsonImportHistoryEntry(entry) {
    const normalized = normalizeJsonImportHistoryEntry(entry);
    if (!normalized) return null;
    const current = loadJsonImportHistory();
    saveJsonImportHistory([normalized, ...current]);
    return normalized;
  }

  function buildJsonImportHistoryEntry(importSummary, preview, resultLabel) {
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const hasOriginMetadata = Boolean(preview?.hasMetadata);
    const sourceName = hasOriginMetadata
      ? cleanText(preview?.metadata?.sourceDeviceName || importSummary?.sourceDeviceName || 'Equipo no identificado')
      : '';
    const mode = cleanText(importSummary?.mode);
    return normalizeJsonImportHistoryEntry({
      id: generateId('jsonimp'),
      fileName: cleanText(importSummary?.fileName || jsonBackupState.fileName) || 'No disponible',
      importedAt: cleanText(importSummary?.importedAt) || nowIso(),
      sourceDeviceId: hasOriginMetadata ? cleanText(preview?.metadata?.sourceDeviceId || importSummary?.sourceDeviceId) : '',
      sourceDeviceName: sourceName,
      targetDeviceId: identity.deviceId,
      targetDeviceName: cleanText(identity.deviceName) || 'Este dispositivo',
      mode,
      modeLabel: cleanText(importSummary?.modeLabel) || (mode === 'replace' ? 'Reemplazar' : (mode === 'merge' ? 'Fusionar' : 'No disponible')),
      lastOperation: preview?.lastJsonOperation || importSummary?.lastActivity || null,
      result: resultLabel
    });
  }

  function renderJsonImportHistoryList() {
    const entries = loadJsonImportHistory();
    const headers = `
      <th>JSON importado</th>
      <th>Importado</th>
      <th>Origen</th>
      <th>Modo</th>
      <th>Última operación</th>
      <th>Fecha/Hora operación</th>
      <th>Resultado</th>
    `;
    const rows = entries.length
      ? entries.map((entry) => {
        const lastOperation = normalizeJsonImportLastOperation(entry.lastOperation) || entry.lastOperation;
        const operationLabel = cleanText(lastOperation?.label) || 'No disponible';
        const operationModule = cleanText(lastOperation?.module);
        const operationDetail = cleanText(lastOperation?.detail);
        const operationDevice = cleanText(lastOperation?.deviceName);
        const operationMeta = buildActivityDetail([
          operationDetail !== 'No disponible' ? operationDetail : '',
          operationModule && operationModule !== 'No disponible' && operationModule !== operationLabel ? `Módulo: ${operationModule}` : '',
          operationDevice ? `Equipo: ${operationDevice}` : ''
        ]);
        return `
        <tr class="compact-record-row json-import-history-row">
          <td class="json-import-file"><span title="${escapeHtml(entry.fileName)}">${escapeHtml(entry.fileName)}</span></td>
          <td><span>${escapeHtml(entry.importDate || formatJsonImportHistoryDate(entry.importedAt))}</span><small>${escapeHtml(entry.importTime || formatJsonImportHistoryTime(entry.importedAt))}</small></td>
          <td><span title="${escapeHtml(entry.sourceDeviceName)}">${escapeHtml(entry.sourceDeviceName || 'No disponible')}</span>${entry.sourceDeviceId ? `<small>${escapeHtml(getShortDeviceId(entry.sourceDeviceId))}</small>` : ''}</td>
          <td><span>${escapeHtml(entry.modeLabel || 'No disponible')}</span></td>
          <td class="json-import-operation"><span title="${escapeHtml(operationLabel)}">${escapeHtml(operationLabel)}</span>${operationMeta ? `<small title="${escapeHtml(operationMeta)}">${escapeHtml(operationMeta)}</small>` : ''}</td>
          <td><span>${escapeHtml(cleanText(lastOperation?.atDisplay) || formatJsonImportOperationDateTime(lastOperation?.at))}</span></td>
          <td><span>${escapeHtml(entry.result || 'Importado correctamente')}</span></td>
        </tr>
      `;
      }).join('')
      : `
        <tr class="compact-record-row">
          <td colspan="7"><span class="compact-primary">Todavía no hay JSON importados en este dispositivo.</span><small>El historial empezará a registrar importaciones confirmadas desde esta versión.</small></td>
        </tr>
      `;

    return `
      <article class="panel-card config-card full-span json-import-history-card">
        <div class="section-title-row compact-title-row">
          <div>
            <span class="eyebrow mini">JSON / Importaciones</span>
            <h2>JSON importados</h2>
          </div>
          <span class="compact-note">${entries.length || 0} registro${entries.length === 1 ? '' : 's'}</span>
        </div>
        <p class="notice compact-notice">Historial local informativo de respaldos JSON importados en este dispositivo. No modifica datos de negocio, cálculos, Excel ni Bdatos.</p>
        ${renderOperationalTableShell({
          shellClass: 'json-import-history-scroll-shell',
          wrapClass: 'json-import-history-table-wrap',
          ariaLabel: 'Historial local de JSON importados',
          tableClass: 'json-import-history-table',
          headers,
          rows
        })}
      </article>
    `;
  }

  function renderJsonAppliedMetadataRows() {
    const applied = loadJsonAppliedMetadata();
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const fileName = applied?.fileName || 'Sin JSON aplicado';
    const appliedAt = applied?.appliedAtDisplay || (applied?.appliedAt ? formatDateTime(applied.appliedAt) : '—');
    const deviceName = applied?.deviceName || identity.deviceName || 'Este equipo';
    return `
      <dt>JSON aplicado</dt><dd class="json-applied-file">${escapeHtml(fileName)}</dd>
      <dt>Aplicado el</dt><dd>${escapeHtml(appliedAt)}</dd>
      <dt>Equipo</dt><dd>${escapeHtml(deviceName)}</dd>
    `;
  }

  function normalizeActivitySummary(summary) {
    const raw = isPlainObject(summary) ? summary : {};
    const ts = cleanText(raw.ts || raw.createdAt || raw.updatedAt);
    const detail = cleanText(raw.detail || raw.detalle);
    const module = cleanText(raw.module || raw.modulo);
    const action = cleanText(raw.action || raw.accion);
    if (!ts && !detail && !module && !action) return null;
    return {
      ts,
      tsVisible: cleanText(raw.tsVisible || raw.fechaVisible) || (ts ? formatDateTime(ts) : ''),
      deviceId: cleanText(raw.deviceId),
      deviceName: cleanText(raw.deviceName || raw.equipo),
      module,
      action,
      entityType: cleanText(raw.entityType || raw.tipoEntidad),
      entityRef: cleanText(raw.entityRef || raw.referencia),
      amount: Number.isFinite(Number(raw.amount)) ? roundMoney(raw.amount) : '',
      detail,
      source: cleanText(raw.source || raw.origen || 'local') || 'local'
    };
  }

  function normalizeActivityEntry(record) {
    const raw = isPlainObject(record) ? record : {};
    const ts = cleanText(raw.ts || raw.createdAt || raw.updatedAt) || nowIso();
    const amountValue = Number(raw.amount);
    return {
      id: cleanText(raw.id) || generateId('log'),
      ts,
      tsVisible: cleanText(raw.tsVisible || raw.fechaVisible) || formatDateTime(ts),
      deviceId: cleanText(raw.deviceId),
      deviceName: cleanText(raw.deviceName || raw.equipo) || 'Este equipo',
      module: cleanText(raw.module || raw.modulo) || 'Sistema',
      action: cleanText(raw.action || raw.accion) || 'Registrado',
      entityType: cleanText(raw.entityType || raw.tipoEntidad),
      entityRef: cleanText(raw.entityRef || raw.referencia),
      amount: Number.isFinite(amountValue) ? roundMoney(amountValue) : '',
      detail: cleanText(raw.detail || raw.detalle) || 'Actividad registrada.',
      source: cleanText(raw.source || raw.origen || 'local') || 'local'
    };
  }

  function loadActivityLog() {
    try {
      const raw = localStorage.getItem(ACTIVITY_LOG_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.map((entry) => normalizeActivityEntry(entry)).sort((a, b) => String(b.ts).localeCompare(String(a.ts))).slice(0, ACTIVITY_LOG_MAX_ENTRIES)
        : [];
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo leer la bitácora local.', error);
      return [];
    }
  }

  function saveActivityLog(entries) {
    try {
      const normalized = (Array.isArray(entries) ? entries : [])
        .map((entry) => normalizeActivityEntry(entry))
        .sort((a, b) => String(b.ts).localeCompare(String(a.ts)))
        .slice(0, ACTIVITY_LOG_MAX_ENTRIES);
      localStorage.setItem(ACTIVITY_LOG_STORAGE_KEY, JSON.stringify(normalized));
      appActivityLog = normalized;
      return normalized;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo guardar la bitácora local.', error);
      return Array.isArray(appActivityLog) ? appActivityLog : [];
    }
  }

  function updateDeviceLastActivity(entry) {
    try {
      const normalizedEntry = normalizeActivityEntry(entry);
      const identity = normalizeDeviceIdentity(appDeviceIdentity);
      saveDeviceIdentity({
        ...identity,
        updatedAt: normalizedEntry.ts,
        lastActivity: normalizeActivitySummary(normalizedEntry)
      });
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo actualizar la última actividad del equipo.', error);
    }
  }

  function registerActivity(payload = {}) {
    try {
      const identity = normalizeDeviceIdentity(appDeviceIdentity);
      const ts = nowIso();
      const entry = normalizeActivityEntry({
        id: generateId('log'),
        ts,
        tsVisible: formatDateTime(ts),
        deviceId: identity.deviceId,
        deviceName: identity.deviceName,
        source: 'local',
        ...payload
      });
      const current = Array.isArray(appActivityLog) ? appActivityLog : loadActivityLog();
      saveActivityLog([entry, ...current]);
      updateDeviceLastActivity(entry);
      return entry;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: la operación principal se guardó, pero no se pudo registrar en bitácora.', error);
      return null;
    }
  }

  function getRecentActivityEntries(limit = 20) {
    const source = Array.isArray(appActivityLog) ? appActivityLog : loadActivityLog();
    return source
      .map((entry) => normalizeActivityEntry(entry))
      .sort((a, b) => String(b.ts).localeCompare(String(a.ts)))
      .slice(0, limit);
  }

  function buildActivityDetail(parts) {
    return (Array.isArray(parts) ? parts : [])
      .map((part) => cleanText(part))
      .filter(Boolean)
      .join(' · ');
  }

  function normalizeBackupCounts(rawCounts = {}) {
    const raw = isPlainObject(rawCounts) ? rawCounts : {};
    const compras = parsePositiveInteger(raw.comprasProveedores ?? raw.compras ?? raw.proveedores);
    const pagos = parsePositiveInteger(raw.pagosProveedores ?? raw.pagos);
    const cierres = parsePositiveInteger(raw.cierresMensuales ?? raw.cierres);
    const safeNumber = (value) => Number.isNaN(parsePositiveInteger(value)) ? 0 : parsePositiveInteger(value);
    return {
      ventas: safeNumber(raw.ventas),
      cobros: safeNumber(raw.cobros),
      comprasProveedores: Number.isNaN(compras) ? 0 : compras,
      proveedores: Number.isNaN(compras) ? 0 : compras,
      pagosProveedores: Number.isNaN(pagos) ? 0 : pagos,
      pagos: Number.isNaN(pagos) ? 0 : pagos,
      gastos: safeNumber(raw.gastos),
      catalogos: safeNumber(raw.catalogos),
      bdatos: safeNumber(raw.bdatos || raw.Bdatos),
      cierresMensuales: Number.isNaN(cierres) ? 0 : cierres,
      cierres: Number.isNaN(cierres) ? 0 : cierres,
      exportacionesExcel: safeNumber(raw.exportacionesExcel),
      ajustesClientes: safeNumber(raw.ajustesClientes),
      ajustesProveedores: safeNumber(raw.ajustesProveedores),
      bitacora: safeNumber(raw.bitacora)
    };
  }

  function getBackupCountsTotal(counts) {
    const normalized = normalizeBackupCounts(counts);
    return normalized.ventas
      + normalized.cobros
      + normalized.comprasProveedores
      + normalized.pagosProveedores
      + normalized.gastos
      + normalized.catalogos
      + normalized.bdatos
      + normalized.cierresMensuales
      + normalized.exportacionesExcel
      + normalized.ajustesClientes
      + normalized.ajustesProveedores
      + normalized.bitacora;
  }

  function formatBackupCountsSummary(counts) {
    const normalized = normalizeBackupCounts(counts);
    const parts = [
      `${normalized.ventas} OC`,
      `${normalized.cobros} cobros`,
      `${normalized.comprasProveedores} compras`,
      `${normalized.pagosProveedores} pagos`,
      `${normalized.gastos} gastos`,
      `${normalized.bdatos} Bdatos`,
      `${normalized.bitacora} bitácora`
    ];
    return parts.join(', ');
  }

  function normalizeJsonBackupExportSummary(summary) {
    const raw = isPlainObject(summary) ? summary : {};
    const exportedAt = cleanText(raw.exportedAt || raw.fechaExportacion || raw.createdAt);
    const counts = normalizeBackupCounts(raw.counts || raw.recordCounts || raw.conteos);
    const lastActivity = normalizeActivitySummary(raw.lastActivity || raw.ultimaActividad);
    if (!exportedAt && !raw.sourceDeviceName && getBackupCountsTotal(counts) <= 0 && !lastActivity) return null;
    return {
      exportedAt,
      exportedAtDisplay: cleanText(raw.exportedAtDisplay || raw.fechaExportacionVisible) || (exportedAt ? formatDateTime(exportedAt) : ''),
      sourceDeviceId: cleanText(raw.sourceDeviceId || raw.deviceId),
      sourceDeviceName: cleanText(raw.sourceDeviceName || raw.deviceName || raw.equipo) || 'Equipo no identificado',
      fileName: cleanText(raw.fileName || raw.nombreArchivo),
      counts,
      lastActivity
    };
  }

  function normalizeJsonBackupImportSummary(summary) {
    const raw = isPlainObject(summary) ? summary : {};
    const importedAt = cleanText(raw.importedAt || raw.fechaImportacion || raw.createdAt);
    const exportedAt = cleanText(raw.exportedAt || raw.fechaExportacion || raw.backupDate);
    const counts = normalizeBackupCounts(raw.counts || raw.recordCounts || raw.conteos);
    const lastActivity = normalizeActivitySummary(raw.lastActivity || raw.jsonLastActivity || raw.ultimaActividadJson || raw.ultimaActividad);
    if (!importedAt && !exportedAt && !raw.sourceDeviceName && !raw.mode && getBackupCountsTotal(counts) <= 0 && !lastActivity) return null;
    return {
      importedAt,
      importedAtDisplay: cleanText(raw.importedAtDisplay || raw.fechaImportacionVisible) || (importedAt ? formatDateTime(importedAt) : ''),
      targetDeviceId: cleanText(raw.targetDeviceId || raw.localDeviceId || raw.equipoDestinoId),
      targetDeviceName: cleanText(raw.targetDeviceName || raw.localDeviceName || raw.equipoDestino) || 'Este equipo',
      sourceDeviceId: cleanText(raw.sourceDeviceId || raw.deviceId || raw.equipoOrigenId),
      sourceDeviceName: cleanText(raw.sourceDeviceName || raw.deviceName || raw.equipoOrigen || raw.equipo) || 'Origen no identificado',
      mode: cleanText(raw.mode || raw.modo) || 'merge',
      modeLabel: cleanText(raw.modeLabel || raw.modoVisible) || ((raw.mode || raw.modo) === 'replace' ? 'Reemplazar' : 'Fusionar'),
      fileName: cleanText(raw.fileName || raw.nombreArchivo),
      exportedAt,
      exportedAtDisplay: cleanText(raw.exportedAtDisplay || raw.fechaExportacionVisible) || (exportedAt ? formatDateTime(exportedAt) : ''),
      counts,
      lastActivity
    };
  }

  function renderLastImportSummaryCard(summary, lastImportAt = '') {
    const normalized = normalizeJsonBackupImportSummary(summary);
    if (!normalized) {
      return `
        <div class="status-item device-import-summary">
          <strong>Última importación JSON</strong>
          <span>${escapeHtml(formatDateTimeOrText(lastImportAt, 'No se ha importado JSON en este equipo.'))}</span>
        </div>
      `;
    }
    const originLine = buildActivityDetail([
      normalized.modeLabel,
      normalized.sourceDeviceName,
      normalized.importedAtDisplay || formatDateTime(normalized.importedAt)
    ]);
    const backupLine = buildActivityDetail([
      normalized.exportedAtDisplay ? `Exportado ${normalized.exportedAtDisplay}` : '',
      normalized.fileName
    ]);
    const lastActivityText = normalized.lastActivity
      ? (normalized.lastActivity.detail || buildActivityDetail([normalized.lastActivity.module, normalized.lastActivity.action, normalized.lastActivity.entityRef]))
      : 'Sin última actividad incluida.';
    return `
      <div class="status-item device-import-summary">
        <strong>Última importación JSON</strong>
        <span>${escapeHtml(originLine || 'Importación registrada')}</span>
        ${backupLine ? `<small>${escapeHtml(backupLine)}</small>` : ''}
        <small>Incluyó: ${escapeHtml(formatBackupCountsSummary(normalized.counts))}</small>
        <small>Última actividad JSON: ${escapeHtml(lastActivityText)}</small>
      </div>
    `;
  }

  function parseComparableTimestamp(value) {
    const text = cleanText(value);
    if (!text) return 0;
    const parsed = Date.parse(text);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function getComparisonActivityText(activity, fallbackText = 'No registrada.') {
    const normalized = normalizeActivitySummary(activity);
    if (!normalized) return fallbackText;
    return buildActivityDetail([
      normalized.tsVisible || formatDateTime(normalized.ts),
      normalized.detail || buildActivityDetail([normalized.module, normalized.action, normalized.entityRef])
    ]) || fallbackText;
  }

  function getJsonComparisonModules() {
    return [
      { key: 'ventas', label: 'OC / Ventas' },
      { key: 'cobros', label: 'Cobros' },
      { key: 'comprasProveedores', label: 'Compras / Proveedores' },
      { key: 'pagosProveedores', label: 'Pagos' },
      { key: 'gastos', label: 'Gastos' },
      { key: 'cierresMensuales', label: 'Cierres' },
      { key: 'catalogos', label: 'Catálogos' },
      { key: 'bitacora', label: 'Bitácora' }
    ];
  }

  function formatCountDifference(localCount, jsonCount) {
    const localValue = Number(localCount) || 0;
    const jsonValue = Number(jsonCount) || 0;
    const diff = jsonValue - localValue;
    if (diff > 0) return `JSON trae ${diff} más`;
    if (diff < 0) return `Local trae ${Math.abs(diff)} más`;
    return 'Iguales';
  }

  function buildJsonRecencyIndicator(localTimestamp, jsonTimestamp) {
    if (!localTimestamp || !jsonTimestamp) {
      return {
        status: 'unknown',
        title: 'No se puede determinar',
        message: 'No hay suficiente metadata para determinar cuál base es más reciente.'
      };
    }
    if (Math.abs(jsonTimestamp - localTimestamp) < 1000) {
      return {
        status: 'unknown',
        title: 'Sin diferencia clara',
        message: 'No hay suficiente metadata para determinar cuál base es más reciente.'
      };
    }
    if (jsonTimestamp > localTimestamp) {
      return {
        status: 'json-newer',
        title: 'JSON parece más reciente',
        message: 'Este JSON parece más reciente que la base local.'
      };
    }
    return {
      status: 'local-newer',
      title: 'Base local parece más reciente',
      message: 'Esta base local parece tener actividad más reciente que el JSON.'
    };
  }

  function buildJsonImportComparison({ data, metadataPreview, counts, backupDate, hasMetadata }) {
    const config = normalizeConfiguracion(appData.configuracion);
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const localActivity = normalizeActivitySummary(getRecentActivityEntries(1)[0] || identity.lastActivity);
    const jsonActivity = normalizeActivitySummary(metadataPreview?.lastActivity);
    const localCounts = getJsonRecordCounts(appData, getRecentActivityEntries(ACTIVITY_LOG_MAX_ENTRIES));
    const jsonCounts = normalizeBackupCounts(counts || getJsonRecordCounts(data));
    jsonCounts.total = getBackupCountsTotal(jsonCounts);
    const localBackupSummary = normalizeJsonBackupExportSummary(config.lastJsonBackupSummary);
    const localImportSummary = normalizeJsonBackupImportSummary(config.lastJsonImportSummary);
    const localTimestamp = parseComparableTimestamp(localActivity?.ts || identity.updatedAt || appData.metadata?.updatedAt);
    const jsonTimestamp = parseComparableTimestamp(jsonActivity?.ts || backupDate || metadataPreview?.exportedAt);
    const modules = getJsonComparisonModules();
    const rows = modules.map((module) => ({
      ...module,
      local: Number(localCounts[module.key]) || 0,
      json: Number(jsonCounts[module.key]) || 0,
      difference: formatCountDifference(localCounts[module.key], jsonCounts[module.key])
    }));

    return {
      local: {
        deviceName: identity.deviceName,
        deviceId: identity.deviceId,
        lastActivity: localActivity,
        lastActivityText: getComparisonActivityText(localActivity, 'Sin actividad local registrada.'),
        lastBackupText: localBackupSummary
          ? buildActivityDetail([localBackupSummary.sourceDeviceName, localBackupSummary.exportedAtDisplay || formatDateTime(localBackupSummary.exportedAt)])
          : 'No se ha exportado JSON desde este equipo.',
        lastImportText: localImportSummary
          ? buildActivityDetail([localImportSummary.modeLabel, localImportSummary.sourceDeviceName, localImportSummary.importedAtDisplay || formatDateTime(localImportSummary.importedAt)])
          : formatDateTimeOrText(config.lastImportAt, 'No se ha importado JSON en este equipo.'),
        counts: localCounts,
        timestamp: localTimestamp
      },
      json: {
        deviceName: cleanText(metadataPreview?.sourceDeviceName) || (hasMetadata ? 'Equipo no identificado' : 'Respaldo sin metadata de origen'),
        deviceId: cleanText(metadataPreview?.sourceDeviceId),
        exportedAt: cleanText(metadataPreview?.exportedAt || backupDate),
        exportedAtDisplay: cleanText(metadataPreview?.exportedAtDisplay) || formatDateTime(backupDate),
        lastActivity: jsonActivity,
        lastActivityText: getComparisonActivityText(jsonActivity, hasMetadata ? 'No incluida.' : 'Respaldo sin metadata de origen.'),
        counts: jsonCounts,
        backupVersion: cleanText(metadataPreview?.backupVersion) || '',
        hasMetadata: Boolean(hasMetadata),
        timestamp: jsonTimestamp
      },
      rows,
      recency: buildJsonRecencyIndicator(localTimestamp, jsonTimestamp)
    };
  }

  function buildJsonImportSummary(preview, selectedMode, fileName) {
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const origin = preview?.metadata || {};
    const importedAt = nowIso();
    const exportedAt = cleanText(origin.exportedAt || preview?.backupDate);
    return normalizeJsonBackupImportSummary({
      importedAt,
      importedAtDisplay: formatDateTime(importedAt),
      targetDeviceId: identity.deviceId,
      targetDeviceName: identity.deviceName,
      sourceDeviceId: cleanText(origin.sourceDeviceId),
      sourceDeviceName: cleanText(origin.sourceDeviceName) || (preview?.hasMetadata ? 'Equipo no identificado' : 'Respaldo sin metadata de origen'),
      mode: selectedMode,
      modeLabel: selectedMode === 'replace' ? 'Reemplazar' : 'Fusionar',
      fileName,
      exportedAt,
      exportedAtDisplay: cleanText(origin.exportedAtDisplay) || formatDateTime(exportedAt),
      counts: preview?.counts,
      lastActivity: normalizeActivitySummary(origin.lastActivity)
    });
  }

  function renderLastBackupSummaryCard(summary) {
    const normalized = normalizeJsonBackupExportSummary(summary);
    if (!normalized) {
      return `
        <div class="status-item device-backup-summary">
          <strong>Último respaldo JSON exportado</strong>
          <span>No se ha exportado JSON desde este equipo.</span>
        </div>
      `;
    }
    const originLine = buildActivityDetail([
      normalized.sourceDeviceName,
      normalized.exportedAtDisplay || formatDateTime(normalized.exportedAt)
    ]);
    const lastActivity = normalized.lastActivity;
    const lastActivityText = lastActivity
      ? (lastActivity.detail || buildActivityDetail([lastActivity.module, lastActivity.action, lastActivity.entityRef]))
      : 'Sin última actividad incluida.';
    return `
      <div class="status-item device-backup-summary">
        <strong>Último respaldo JSON exportado</strong>
        <span>${escapeHtml(originLine || 'Origen no identificado')}</span>
        <small>Incluye: ${escapeHtml(formatBackupCountsSummary(normalized.counts))}</small>
        <small>Última actividad incluida: ${escapeHtml(lastActivityText)}</small>
      </div>
    `;
  }

  function extractActivityLogFromJsonBackup(raw) {
    if (!isPlainObject(raw)) return [];
    const registros = isPlainObject(raw.registros) ? raw.registros : {};
    const direct = Array.isArray(raw.bitacora) ? raw.bitacora : [];
    const nested = Array.isArray(registros.bitacora) ? registros.bitacora : [];
    const metadataActivity = normalizeActivitySummary(raw.metadata?.lastActivity || raw.metadata?.ultimaActividad);
    const combined = [...nested, ...direct];
    if (metadataActivity) combined.push(metadataActivity);
    const seen = new Set();
    return combined
      .map((entry) => normalizeActivityEntry({ ...entry, source: cleanText(entry?.source || entry?.origen || 'importado') || 'importado' }))
      .filter((entry) => {
        const key = cleanText(entry.id) || [entry.ts, entry.deviceId, entry.module, entry.action, entry.detail].join('|');
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, ACTIVITY_LOG_MAX_ENTRIES);
  }

  function mergeImportedActivityLog(entries = []) {
    const incoming = (Array.isArray(entries) ? entries : []).map((entry) => normalizeActivityEntry({ ...entry, source: cleanText(entry.source || 'importado') || 'importado' }));
    if (!incoming.length) return { added: 0, skipped: 0 };
    const current = getRecentActivityEntries(ACTIVITY_LOG_MAX_ENTRIES);
    const seen = new Set(current.map((entry) => cleanText(entry.id) || [entry.ts, entry.deviceId, entry.module, entry.action, entry.detail].join('|')));
    const toAdd = incoming.filter((entry) => {
      const key = cleanText(entry.id) || [entry.ts, entry.deviceId, entry.module, entry.action, entry.detail].join('|');
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (toAdd.length) saveActivityLog([...toAdd, ...current]);
    return { added: toAdd.length, skipped: incoming.length - toAdd.length };
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
      bdatos: buildInitialBdatosRecords(BDATOS_INITIAL_UPDATED_AT),
      bdatosUpdatedAt: BDATOS_INITIAL_UPDATED_AT,
      ventas: [],
      cobros: [],
      comprasProveedores: [],
      pagosProveedores: [],
      gastos: [],
      cierresMensuales: [],
      exportacionesExcel: [],
      configuracion: createDefaultConfiguracion(timestamp),
      metadata: {
        appName: APP_NAME,
        appVersion: APP_VERSION,
        schemaVersion: SCHEMA_VERSION,
        createdAt: timestamp,
        updatedAt: timestamp,
        bdatosSeedVersion: BDATOS_INITIAL_SEED_VERSION,
        bdatosSeededAt: BDATOS_INITIAL_UPDATED_AT
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
      lastJsonBackupSummary: null,
      lastImportAt: '',
      lastJsonImportSummary: null,
      pwaLastSearchAt: '',
      pwaLastUpdateAt: '',
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
      lastJsonBackupSummary: normalizeJsonBackupExportSummary(source.lastJsonBackupSummary),
      lastImportAt: cleanText(source.lastImportAt),
      lastJsonImportSummary: normalizeJsonBackupImportSummary(source.lastJsonImportSummary),
      pwaLastSearchAt: cleanText(source.pwaLastSearchAt),
      pwaLastUpdateAt: cleanText(source.pwaLastUpdateAt),
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

    normalized.bdatos = normalizeBdatosList(source.bdatos || source.Bdatos || normalized.bdatos);
    normalized.bdatosUpdatedAt = cleanText(source.bdatosUpdatedAt || source.bdatosLastUpdatedAt || source.bdatosMeta?.updatedAt || normalized.bdatosUpdatedAt);

    normalized.cobros = normalized.cobros.map((record) => normalizeCobroRecord(record));
    normalized.pagosProveedores = normalized.pagosProveedores.map((record) => normalizePagoProveedorRecord(record));
    normalized.gastos = normalized.gastos.map((record) => normalizeGastoRecord(record));
    enrichBankSnapshotsForData(normalized);
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

  function applyInitialBdatosSeedIfNeeded(normalized, source = {}) {
    const sourceMetadata = isPlainObject(source?.metadata) ? source.metadata : {};
    const alreadySeeded = cleanText(sourceMetadata.bdatosSeedVersion) === BDATOS_INITIAL_SEED_VERSION;
    if (alreadySeeded || (Array.isArray(normalized.bdatos) && normalized.bdatos.length > 0)) {
      normalized.metadata = {
        ...(isPlainObject(normalized.metadata) ? normalized.metadata : {}),
        bdatosSeedVersion: sourceMetadata.bdatosSeedVersion || normalized.metadata?.bdatosSeedVersion || '',
        bdatosSeededAt: sourceMetadata.bdatosSeededAt || normalized.metadata?.bdatosSeededAt || ''
      };
      return normalized;
    }

    normalized.bdatos = buildInitialBdatosRecords(BDATOS_INITIAL_UPDATED_AT);
    normalized.bdatosUpdatedAt = BDATOS_INITIAL_UPDATED_AT;
    normalized.metadata = {
      ...(isPlainObject(normalized.metadata) ? normalized.metadata : {}),
      bdatosSeedVersion: BDATOS_INITIAL_SEED_VERSION,
      bdatosSeededAt: BDATOS_INITIAL_UPDATED_AT
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
        if (catalog.id === 'cuentasBancos') {
          const normalizedType = normalizeBankType(raw.tipo);
          normalized.tipo = normalizedType;
          const legacyType = cleanText(raw.tipo || raw.tipoAnterior);
          if (!normalizedType && legacyType) {
            normalized.tipoAnterior = legacyType;
          }
        } else {
          normalized.tipo = field.options.includes(raw.tipo) ? raw.tipo : field.options[0];
        }
        return;
      }
      if (field.name === 'condicionPago') {
        normalized.condicionPago = normalizePaymentCondition(raw.condicionPago || raw.condicion || raw.condicionDePago || raw.formaPago || raw.tipoPago);
        return;
      }
      if (field.name === 'diasCredito') {
        normalized.diasCredito = parsePositiveInteger(raw.diasCredito ?? raw.diasDeCredito ?? raw.dias ?? raw.creditoDias ?? raw.credito);
        if (Number.isNaN(normalized.diasCredito)) normalized.diasCredito = 0;
        return;
      }
      if (field.type === 'checkbox') {
        const rawValue = raw[field.name] ?? raw.requiere_banco ?? raw.requiereBancoCuenta ?? raw.bancoRequerido ?? raw.requiereCuentaBanco;
        normalized[field.name] = rawValue === undefined || rawValue === null || rawValue === ''
          ? paymentMethodNameSuggestsBank(raw.nombre)
          : normalizeBooleanField(rawValue, false);
        return;
      }
      normalized[field.name] = cleanText(raw[field.name]);
    });

    if (isPaymentTermsCatalog(catalog.id)) {
      const terms = normalizePaymentTermsFields(normalized);
      normalized.condicionPago = terms.condicionPago;
      normalized.diasCredito = terms.diasCredito;
    }

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
        return normalizeCatalogRecord({
          id: generateId(key),
          ...payload,
          activo: true,
          observacion: payload.observacion || '',
          createdAt: timestamp,
          updatedAt: timestamp
        }, CATALOGS.find((catalog) => catalog.id === key));
      });
    });
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function cleanText(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim();
  }

  function sanitizeFileNameSegment(value, fallback = 'Equipo sin nombre') {
    const sanitized = cleanText(value)
      .replace(/[\/\\:*?"<>|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return sanitized || fallback;
  }

  function formatJsonExportDateStamp(value) {
    const date = value instanceof Date ? value : new Date(value || Date.now());
    const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
    const day = String(safeDate.getDate()).padStart(2, '0');
    const month = String(safeDate.getMonth() + 1).padStart(2, '0');
    const year = String(safeDate.getFullYear());
    return `${day}${month}${year}`;
  }

  function getJsonExportSequence() {
    try {
      const raw = localStorage.getItem(JSON_EXPORT_SEQUENCE_STORAGE_KEY);
      const parsed = Number.parseInt(raw, 10);
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo leer el consecutivo local de exportación JSON.', error);
      return 0;
    }
  }

  function saveJsonExportSequence(value) {
    try {
      const numeric = Number.parseInt(value, 10);
      const safeValue = Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
      localStorage.setItem(JSON_EXPORT_SEQUENCE_STORAGE_KEY, String(safeValue));
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo guardar el consecutivo local de exportación JSON.', error);
    }
  }

  function formatJsonExportSequence(value) {
    const numeric = Number.parseInt(value, 10);
    const safeValue = Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
    return String(safeValue).padStart(4, '0');
  }

  function buildJsonExportFileName(exportedAt) {
    const sequence = getJsonExportSequence();
    const rawDeviceName = cleanText(appDeviceIdentity?.deviceName);
    const deviceName = sanitizeFileNameSegment(rawDeviceName === 'Este equipo' ? '' : rawDeviceName, 'Equipo sin nombre');
    const dateStamp = formatJsonExportDateStamp(exportedAt);
    return {
      fileName: `${formatJsonExportSequence(sequence)}- ${deviceName} ${dateStamp}.json`,
      sequence
    };
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

  function normalizePaymentCondition(value) {
    const key = cleanText(value)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLocaleLowerCase('es-NI');
    return key.includes('credit') ? 'Crédito' : 'Contado';
  }

  function normalizePaymentTermsFields(source = {}) {
    const raw = isPlainObject(source) ? source : {};
    const condicionPago = normalizePaymentCondition(raw.condicionPago || raw.condicion || raw.condicionDePago || raw.formaPago || raw.tipoPago);
    const rawDays = raw.diasCredito ?? raw.diasDeCredito ?? raw.dias ?? raw.creditoDias ?? raw.credito;
    const parsedDays = parsePositiveInteger(rawDays);
    const diasCredito = condicionPago === 'Crédito' ? (Number.isNaN(parsedDays) ? 0 : parsedDays) : 0;
    return { condicionPago, diasCredito };
  }

  function isPaymentTermsCatalog(catalogId) {
    return catalogId === 'clientes' || catalogId === 'proveedores';
  }

  function getCatalogPaymentTerms(catalogId, recordId) {
    if (!isPaymentTermsCatalog(catalogId)) return { condicionPago: 'Contado', diasCredito: 0 };
    const record = getCatalogRecordById(catalogId, recordId);
    return normalizePaymentTermsFields(record || {});
  }

  function formatPaymentTermsLabel(record) {
    const terms = normalizePaymentTermsFields(record || {});
    return terms.condicionPago === 'Crédito'
      ? `Crédito · ${terms.diasCredito || 0} días`
      : 'Contado · 0 días';
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

  function getVentaCreditBaseDate(record) {
    const raw = isPlainObject(record) ? record : {};
    return toDateInputValue(raw.fechaEntrega || raw.fechaDeEntrega || raw.entrega || raw.fechaRecepcion || raw.fechaRecepción || '')
      || toDateInputValue(raw.fechaOc || raw.fechaOC || raw.fecha || '');
  }

  function calculateVentaFechaVencimiento(record, diasCredito) {
    const baseDate = getVentaCreditBaseDate(record);
    const safeDays = Number.isFinite(Number(diasCredito)) ? Number(diasCredito) : 0;
    return baseDate ? addDaysToDate(baseDate, safeDays) : '';
  }

  function isVentaCreditBaseEntrega(record) {
    const raw = isPlainObject(record) ? record : {};
    return Boolean(toDateInputValue(raw.fechaEntrega || raw.fechaDeEntrega || raw.entrega || raw.fechaRecepcion || raw.fechaRecepción || ''));
  }

  function isPastVentaDue(record) {
    const venta = isPlainObject(record) ? record : {};
    const derivedDue = calculateVentaFechaVencimiento(venta, venta.diasCredito);
    return isPastDate(derivedDue || venta.fechaVencimiento);
  }

  function isVentaDueWithinNextDays(record, days) {
    const venta = isPlainObject(record) ? record : {};
    const derivedDue = calculateVentaFechaVencimiento(venta, venta.diasCredito);
    return isWithinNextDays(derivedDue || venta.fechaVencimiento, days);
  }

  function getVentaDaysOverdue(record) {
    const venta = isPlainObject(record) ? record : {};
    const derivedDue = calculateVentaFechaVencimiento(venta, venta.diasCredito);
    return getDaysOverdue(derivedDue || venta.fechaVencimiento);
  }

  function isPastDate(dateInput) {
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return false;
    return safeDate < todayInputValue();
  }

  function getVentaSubtotalBase(record) {
    const raw = isPlainObject(record) ? record : {};
    const hasExplicitSubtotal = raw.subtotal !== undefined && raw.subtotal !== null && raw.subtotal !== '';
    const explicitSubtotal = parseMoney(raw.subtotal);
    if (hasExplicitSubtotal && !Number.isNaN(explicitSubtotal)) return explicitSubtotal;

    const montoOc = parseMoney(raw.montoOc);
    const noVaLegacy = parseMoney(raw.noVa);
    const descuentoNoVaLegacy = parseMoney(raw.descuentoNoVa);
    const safeMontoOc = Number.isNaN(montoOc) ? 0 : montoOc;
    const safeNoVaLegacy = Number.isNaN(noVaLegacy) ? 0 : noVaLegacy;
    const safeDescuentoNoVaLegacy = Number.isNaN(descuentoNoVaLegacy) ? 0 : descuentoNoVaLegacy;
    const hasLegacyReductions = safeNoVaLegacy > 0 || safeDescuentoNoVaLegacy > 0;
    return hasLegacyReductions ? roundMoney(Math.max(safeMontoOc - safeNoVaLegacy - safeDescuentoNoVaLegacy, 0)) : safeMontoOc;
  }

  function getVentaCalculations(record) {
    const subtotal = getVentaSubtotalBase(record);
    const descuento = parseMoney(record.descuento);
    const totalCobrado = parseMoney(record.totalCobrado);
    const safeSubtotal = Number.isNaN(subtotal) ? 0 : subtotal;
    const safeDescuento = Number.isNaN(descuento) ? 0 : descuento;
    const safeTotalCobrado = Number.isNaN(totalCobrado) ? 0 : totalCobrado;
    const ventaNetaOriginal = roundMoney(safeSubtotal - safeDescuento);
    const totalAjustes = Math.min(calculateTotalAjustesForVenta(record), Math.max(ventaNetaOriginal, 0));
    const ventaNetaAjustada = roundMoney(Math.max(ventaNetaOriginal - totalAjustes, 0));
    const saldoPorCobrar = roundMoney(Math.max(ventaNetaAjustada - safeTotalCobrado, 0));

    return {
      subtotal: safeSubtotal,
      montoOc: safeSubtotal,
      noVa: 0,
      descuento: safeDescuento,
      descuentoNoVa: 0,
      totalCobrado: safeTotalCobrado,
      ventaNetaOriginal,
      total: ventaNetaOriginal,
      totalAjustes,
      ventaNetaAjustada,
      totalTrasAjustes: ventaNetaAjustada,
      ventaNeta: ventaNetaAjustada,
      saldoPorCobrar
    };
  }

  function determineVentaEstado(record) {
    if (!record.activo) return 'Anulado';
    const { ventaNetaOriginal, totalCobrado, saldoPorCobrar } = getVentaCalculations(record);
    if (ventaNetaOriginal > 0 && saldoPorCobrar <= 0) return 'Pagado';
    if (saldoPorCobrar > 0 && isPastVentaDue(record)) return 'Vencido';
    if (saldoPorCobrar > 0 && totalCobrado > 0) return 'Abonado';
    return 'Pendiente';
  }

  function cleanFacturaVentaNumero(value) {
    return cleanText(value)
      .replace(/\s*\((?:\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4})\)\s*$/u, '')
      .trim();
  }

  function isSafeFacturaSpaceToken(token) {
    const value = cleanFacturaVentaNumero(token);
    if (!value) return false;
    if (!/\d/u.test(value)) return false;
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9._#\/-]+$/u.test(value);
  }

  function splitFacturasVentaText(value) {
    const text = String(value ?? '').trim();
    if (!text) return [];
    const splitSafeSpaces = (part) => {
      const normalizedPart = String(part ?? '').trim();
      if (!normalizedPart) return [];
      const compactTokens = normalizedPart.split(/\s+/u).map((token) => cleanFacturaVentaNumero(token)).filter(Boolean);
      if (compactTokens.length > 1 && compactTokens.every((token) => isSafeFacturaSpaceToken(token))) {
        return compactTokens;
      }
      return [cleanFacturaVentaNumero(normalizedPart)].filter(Boolean);
    };
    if (/[;,\n\r]/u.test(text)) {
      return text.split(/[;,\n\r]+/u).reduce((items, part) => items.concat(splitSafeSpaces(part)), []);
    }
    return splitSafeSpaces(text);
  }

  function normalizeFacturasVentaFromText(value) {
    return splitFacturasVentaText(value).map((numero) => ({ numero }));
  }

  function formatFacturasVentaInput(facturas) {
    return normalizeFacturasVentaList(facturas).map((factura) => factura.numero).join(', ');
  }

  function normalizeFacturaVentaRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const directValue = typeof record === 'string' || typeof record === 'number' ? record : '';
    const numero = cleanFacturaVentaNumero(directValue || raw.numero || raw.numeroFactura || raw.factura || raw.documento || raw.referencia || raw.value);
    if (!numero) return null;
    return {
      id: cleanText(raw.id) || generateId('factura'),
      numero
    };
  }

  function normalizeFacturasVentaList(value) {
    let source = value;
    if (typeof source === 'string') {
      const trimmed = source.trim();
      if (!trimmed) return [];
      const looksLikeJsonCollection = /^[\[{]/u.test(trimmed);
      if (looksLikeJsonCollection) {
        try {
          source = JSON.parse(trimmed);
        } catch (_) {
          source = normalizeFacturasVentaFromText(trimmed);
        }
      } else {
        source = normalizeFacturasVentaFromText(trimmed);
      }
    }
    if (typeof source === 'number') source = normalizeFacturasVentaFromText(String(source));
    if (typeof source === 'string') source = normalizeFacturasVentaFromText(source);
    if (isPlainObject(source)) source = [source];
    if (!Array.isArray(source)) return [];
    const seen = new Set();
    return source
      .map((item) => normalizeFacturaVentaRecord(item))
      .filter(Boolean)
      .filter((item) => {
        const key = normalizeNameForCompare(item.numero);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function normalizeVentaAjusteRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const monto = parseMoney(raw.monto || raw.importe || raw.valor);
    const tipo = VENTA_AJUSTE_TYPES.includes(raw.tipo) ? raw.tipo : (cleanText(raw.tipo) || 'Corrección');
    const activo = typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado';
    return {
      id: cleanText(raw.id) || generateId('ajusteCliente'),
      fecha: toDateInputValue(raw.fecha || raw.fechaAjuste || '') || todayInputValue(),
      tipo: VENTA_AJUSTE_TYPES.includes(tipo) ? tipo : 'Corrección',
      monto: Number.isNaN(monto) ? 0 : Math.abs(monto),
      observacion: cleanText(raw.observacion || raw.nota || raw.descripcion),
      activo,
      estado: activo ? 'Registrado' : 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }

  function normalizeVentaAjustesList(records) {
    const source = Array.isArray(records) ? records : [];
    return source
      .map((record) => normalizeVentaAjusteRecord(record))
      .filter((record) => record.monto > 0);
  }

  function getActiveAjustesForVenta(ventaRecord) {
    const venta = isPlainObject(ventaRecord) ? ventaRecord : {};
    return normalizeVentaAjustesList(venta.ajustes).filter((ajuste) => ajuste.activo);
  }

  function calculateTotalAjustesForVenta(ventaRecord) {
    return getActiveAjustesForVenta(ventaRecord)
      .reduce((sum, ajuste) => roundMoney(sum + ajuste.monto), 0);
  }

  function normalizeVentaFacturasFromRaw(raw) {
    const source = isPlainObject(raw) ? raw : {};
    const structured = normalizeFacturasVentaList(source.facturas || source.facturasEmitidas || source.facturasOc || source.facturaEmitida || source.facturaVenta || []);
    const legacy = normalizeFacturaVentaRecord(source.numeroFactura || source.numeroFacturaEmitida || source.facturaNumero || source.factura || source.facturaEmitidaNumero);
    return normalizeFacturasVentaList(legacy ? [...structured, legacy] : structured);
  }

  function formatFacturasVentaResumen(facturas) {
    const list = normalizeFacturasVentaList(facturas);
    if (!list.length) return 'Sin facturas registradas';
    return list.map((factura) => factura.numero).join(', ');
  }

  function normalizeBooleanField(value, fallback = false) {
    if (typeof value === 'boolean') return value;
    const normalized = cleanText(value)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLocaleLowerCase('es-NI');
    if (!normalized) return Boolean(fallback);
    if (['1', 'true', 'si', 'sí', 'yes', 'y', 'x', 'checked', 'marcado'].includes(normalized)) return true;
    if (['0', 'false', 'no', 'n', 'unchecked', 'desmarcado'].includes(normalized)) return false;
    return Boolean(fallback);
  }

  function normalizeLogisticaVentaRecord(value) {
    const raw = isPlainObject(value) ? value : {};
    return {
      transportista: cleanText(raw.transportista || raw.transportistaNombre || raw.envioTransportista),
      fechaEmbarque: toDateInputValue(raw.fechaEmbarque || raw.embarque || raw.fechaEnvio || raw.fechaDespacho || ''),
      fechaEstimada: toDateInputValue(raw.fechaEstimada || raw.fechaEstimadaLlegada || raw.fechaEntregaEstimada || ''),
      fechaReal: toDateInputValue(raw.fechaReal || raw.fechaLlegadaReal || raw.fechaEntregaReal || ''),
      guia: cleanText(raw.guia || raw.guía || raw.numeroGuia || raw.numeroGuía || raw.tracking)
    };
  }

  function hasLogisticaVentaData(logistica) {
    const normalized = normalizeLogisticaVentaRecord(logistica);
    return Boolean(normalized.transportista || normalized.fechaEmbarque || normalized.fechaEstimada || normalized.fechaReal || normalized.guia);
  }

  function formatLogisticaVentaResumen(record) {
    const venta = isPlainObject(record) ? record : {};
    if (!venta.requiereEnvio) return 'No requiere envío';
    const logistica = normalizeLogisticaVentaRecord(venta.logistica);
    const parts = [];
    if (logistica.transportista) parts.push(`Transportista: ${logistica.transportista}`);
    if (logistica.guia) parts.push(`Guía: ${logistica.guia}`);
    if (logistica.fechaEmbarque) parts.push(`Embarque: ${formatDate(logistica.fechaEmbarque)}`);
    if (logistica.fechaEstimada) parts.push(`Estimada: ${formatDate(logistica.fechaEstimada)}`);
    if (logistica.fechaReal) parts.push(`Real: ${formatDate(logistica.fechaReal)}`);
    return parts.join(' · ') || 'Requiere envío';
  }

  function normalizeVentaRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const diasCredito = parsePositiveInteger(raw.diasCredito);
    const safeDiasCredito = Number.isNaN(diasCredito) ? 0 : diasCredito;
    const fechaOc = toDateInputValue(raw.fechaOc || raw.fechaOC || raw.fecha || '');
    const fechaEntrega = toDateInputValue(raw.fechaEntrega || raw.fechaDeEntrega || raw.entrega || raw.fechaRecepcion || raw.fechaRecepción || '');
    const fechaBaseCredito = getVentaCreditBaseDate({ ...raw, fechaOc, fechaEntrega });
    const fechaVencimiento = calculateVentaFechaVencimiento({ ...raw, fechaOc, fechaEntrega }, safeDiasCredito);
    const base = {
      id: raw.id || generateId('venta'),
      numeroDocumento: cleanText(raw.numeroDocumento || raw.numeroOC || raw.numeroOc || raw.documento || raw.oc),
      clienteId: cleanText(raw.clienteId),
      sucursalId: cleanText(raw.sucursalId),
      fechaOc,
      fechaEntrega,
      fechaBaseCredito,
      fechaBaseCreditoTipo: fechaEntrega ? 'Entrega' : 'OC',
      diasCredito: safeDiasCredito,
      fechaVencimiento,
      subtotal: getVentaSubtotalBase(raw),
      montoOc: getVentaSubtotalBase(raw),
      montoOcLegacy: parseMoney(raw.montoOc),
      noVa: parseMoney(raw.noVa),
      noVaLegacy: parseMoney(raw.noVa),
      descuento: parseMoney(raw.descuento),
      descuentoNoVa: parseMoney(raw.descuentoNoVa),
      descuentoNoVaLegacy: parseMoney(raw.descuentoNoVa),
      totalCobrado: parseMoney(raw.totalCobrado),
      ajustes: normalizeVentaAjustesList(raw.ajustes || raw.ajustesCliente || raw.ajustesClientes || raw.notasCredito || raw.notas || []),
      facturas: normalizeVentaFacturasFromRaw(raw),
      requiereEnvio: normalizeBooleanField(raw.requiereEnvio ?? raw.requiereEnvío ?? raw.envioRequerido ?? raw.envíoRequerido, false),
      logistica: normalizeLogisticaVentaRecord(raw.logistica || raw.envio || raw.logisticaEnvio || {}),
      observacion: cleanText(raw.observacion),
      activo: typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
    const calculations = getVentaCalculations(base);
    return {
      ...base,
      subtotal: calculations.subtotal,
      montoOc: calculations.subtotal,
      montoOcLegacy: Number.isNaN(base.montoOcLegacy) ? calculations.subtotal : base.montoOcLegacy,
      noVa: Number.isNaN(base.noVa) ? 0 : base.noVa,
      noVaLegacy: Number.isNaN(base.noVaLegacy) ? 0 : base.noVaLegacy,
      descuento: calculations.descuento,
      descuentoNoVa: Number.isNaN(base.descuentoNoVa) ? 0 : base.descuentoNoVa,
      descuentoNoVaLegacy: Number.isNaN(base.descuentoNoVaLegacy) ? 0 : base.descuentoNoVaLegacy,
      totalCobrado: calculations.totalCobrado,
      ajustes: normalizeVentaAjustesList(base.ajustes),
      totalAjustes: calculations.totalAjustes,
      ventaNetaOriginal: calculations.ventaNetaOriginal,
      total: calculations.ventaNetaOriginal,
      ventaNetaAjustada: calculations.ventaNetaAjustada,
      totalTrasAjustes: calculations.ventaNetaAjustada,
      facturas: normalizeFacturasVentaList(base.facturas),
      requiereEnvio: Boolean(base.requiereEnvio),
      logistica: normalizeLogisticaVentaRecord(base.logistica),
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
      cuentaBancoTipo: normalizeBankType(raw.cuentaBancoTipo || raw.bancoTipo || raw.tipoBanco || raw.bankType || raw.tipoCuentaBanco),
      observacion: cleanText(raw.observacion),
      activo,
      estado: activo ? 'Registrado' : 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }


  function normalizeCompraProveedorAjusteRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const monto = parseMoney(raw.monto || raw.importe || raw.valor);
    const tipo = COMPRA_AJUSTE_TYPES.includes(raw.tipo) ? raw.tipo : (cleanText(raw.tipo) || 'Corrección');
    const activo = typeof raw.activo === 'boolean' ? raw.activo : raw.estado !== 'Anulado';
    return {
      id: cleanText(raw.id) || generateId('ajusteProveedor'),
      fecha: toDateInputValue(raw.fecha || raw.fechaAjuste || '') || todayInputValue(),
      tipo: COMPRA_AJUSTE_TYPES.includes(tipo) ? tipo : 'Corrección',
      monto: Number.isNaN(monto) ? 0 : Math.abs(monto),
      observacion: cleanText(raw.observacion || raw.nota || raw.descripcion),
      activo,
      estado: activo ? 'Registrado' : 'Anulado',
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
  }

  function normalizeCompraProveedorAjustesList(records) {
    const source = Array.isArray(records) ? records : [];
    return source
      .map((record) => normalizeCompraProveedorAjusteRecord(record))
      .filter((record) => record.monto > 0);
  }

  function getActiveAjustesForCompra(compraRecord) {
    const compra = isPlainObject(compraRecord) ? compraRecord : {};
    return normalizeCompraProveedorAjustesList(compra.ajustes).filter((ajuste) => ajuste.activo);
  }

  function calculateTotalAjustesForCompra(compraRecord) {
    return getActiveAjustesForCompra(compraRecord)
      .reduce((sum, ajuste) => roundMoney(sum + ajuste.monto), 0);
  }

  function getCompraProveedorCalculations(record) {
    const totalCompra = parseMoney(record.totalCompra ?? record.totalDeuda ?? record.monto ?? record.total);
    const totalPagado = parseMoney(record.totalPagado);
    const safeTotalCompra = Number.isNaN(totalCompra) ? 0 : totalCompra;
    const safeTotalPagado = Number.isNaN(totalPagado) ? 0 : totalPagado;
    const totalAjustes = Math.min(calculateTotalAjustesForCompra(record), safeTotalCompra);
    const totalAjustado = roundMoney(Math.max(safeTotalCompra - totalAjustes, 0));
    const saldoPorPagar = roundMoney(Math.max(totalAjustado - safeTotalPagado, 0));

    return {
      totalCompra: safeTotalCompra,
      totalAjustes,
      totalAjustado,
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
      ajustes: normalizeCompraProveedorAjustesList(raw.ajustes),
      condicionPagoSnapshot: cleanText(raw.condicionPagoSnapshot || raw.condicionPagoCompra || raw.condicionPago || raw.condicion) ? normalizePaymentCondition(raw.condicionPagoSnapshot || raw.condicionPagoCompra || raw.condicionPago || raw.condicion) : '',
      metodoPagoContadoId: cleanText(raw.metodoPagoContadoId || raw.metodoPagoContado || raw.metodoPagoContadoCodigo),
      metodoPagoContadoNombre: cleanText(raw.metodoPagoContadoNombre || raw.metodoPagoContadoTexto || raw.metodoPagoContadoName),
      bancoPagoContadoId: cleanText(raw.bancoPagoContadoId || raw.cuentaBancoPagoContadoId || raw.bancoPagoContado),
      bancoPagoContadoNombre: cleanText(raw.bancoPagoContadoNombre || raw.cuentaBancoPagoContadoNombre || raw.bancoPagoContadoTexto),
      bancoPagoContadoTipo: normalizeBankType(raw.bancoPagoContadoTipo || raw.cuentaBancoPagoContadoTipo || raw.tipoBancoPagoContado),
      observacionPagoContado: cleanText(raw.observacionPagoContado || raw.notaPagoContado),
      observacion: cleanText(raw.observacion),
      activo,
      createdAt: raw.createdAt || timestamp,
      updatedAt: raw.updatedAt || raw.createdAt || timestamp
    };
    const calculations = getCompraProveedorCalculations(base);
    return {
      ...base,
      totalCompra: calculations.totalCompra,
      ajustes: base.ajustes,
      totalAjustes: calculations.totalAjustes,
      totalAjustado: calculations.totalAjustado,
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
    const compraProveedorId = cleanText(raw.compraProveedorId || raw.compraId || raw.facturaId || raw.documentoId);
    const origen = cleanText(raw.origen || raw.source || raw.tipoOrigen);
    const autoGenerado = raw.autoGenerado === true || raw.esAutomatico === true || raw.automatico === true || origen === 'compra_contado';
    const compraIdOrigen = cleanText(raw.compraIdOrigen || raw.compraProveedorIdOrigen || raw.compraOrigenId) || (autoGenerado ? compraProveedorId : '');
    return {
      id: raw.id || generateId('pagoProveedor'),
      compraProveedorId,
      proveedorId: cleanText(raw.proveedorId),
      proveedorNombre: cleanText(raw.proveedorNombre || raw.proveedor),
      facturaReferencia: cleanText(raw.facturaReferencia || raw.factura || raw.referencia || raw.documento),
      fechaPago: toDateInputValue(raw.fechaPago || raw.fechaRealPago || raw.fecha || '') || todayInputValue(),
      montoPagado: Number.isNaN(montoPagado) ? 0 : montoPagado,
      metodoPagoId: cleanText(raw.metodoPagoId),
      metodoPagoNombre: cleanText(raw.metodoPagoNombre || raw.metodoPago || raw.metodo),
      cuentaBancoId: cleanText(raw.cuentaBancoId),
      cuentaBancoNombre: cleanText(raw.cuentaBancoNombre || raw.cuentaBanco || raw.banco || raw.cuenta),
      cuentaBancoTipo: normalizeBankType(raw.cuentaBancoTipo || raw.bancoTipo || raw.tipoBanco || raw.bankType || raw.tipoCuentaBanco),
      observacion: cleanText(raw.observacion),
      origen,
      compraIdOrigen,
      autoGenerado,
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
      cuentaBancoTipo: normalizeBankType(raw.cuentaBancoTipo || raw.bancoTipo || raw.tipoBanco || raw.bankType || raw.tipoCuentaBanco),
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

  function getAjusteClienteDuplicateKey(record) {
    const ajuste = normalizeVentaAjusteRecord(record);
    return [ajuste.fecha, ajuste.tipo, roundMoney(ajuste.monto), normalizeNameForCompare(ajuste.observacion)].join('|');
  }

  function mergeVentaAjustes(existingRecord, incomingRecord) {
    const existing = normalizeVentaRecord(existingRecord);
    const incoming = normalizeVentaRecord(incomingRecord);
    const merged = normalizeVentaAjustesList(existing.ajustes);
    const ids = new Set(merged.map((ajuste) => ajuste.id).filter(Boolean));
    const keys = new Set(merged.map((ajuste) => getAjusteClienteDuplicateKey(ajuste)));
    normalizeVentaAjustesList(incoming.ajustes).forEach((ajuste) => {
      const key = getAjusteClienteDuplicateKey(ajuste);
      if ((ajuste.id && ids.has(ajuste.id)) || keys.has(key)) return;
      merged.push(ajuste);
      if (ajuste.id) ids.add(ajuste.id);
      keys.add(key);
    });
    return normalizeVentaRecord({
      ...existing,
      ajustes: merged,
      updatedAt: nowIso()
    });
  }

  function getAjusteProveedorDuplicateKey(record) {
    const ajuste = normalizeCompraProveedorAjusteRecord(record);
    return [ajuste.fecha, ajuste.tipo, roundMoney(ajuste.monto), normalizeNameForCompare(ajuste.observacion)].join('|');
  }

  function mergeCompraProveedorAjustes(existingRecord, incomingRecord) {
    const existing = normalizeCompraProveedorRecord(existingRecord);
    const incoming = normalizeCompraProveedorRecord(incomingRecord);
    const merged = normalizeCompraProveedorAjustesList(existing.ajustes);
    const ids = new Set(merged.map((ajuste) => ajuste.id).filter(Boolean));
    const keys = new Set(merged.map((ajuste) => getAjusteProveedorDuplicateKey(ajuste)));
    normalizeCompraProveedorAjustesList(incoming.ajustes).forEach((ajuste) => {
      const key = getAjusteProveedorDuplicateKey(ajuste);
      if ((ajuste.id && ids.has(ajuste.id)) || keys.has(key)) return;
      merged.push(ajuste);
      if (ajuste.id) ids.add(ajuste.id);
      keys.add(key);
    });
    return normalizeCompraProveedorRecord({
      ...existing,
      ajustes: merged,
      updatedAt: nowIso()
    });
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

  function isAutoPagoCompraContadoRecord(record, compraProveedorId = '') {
    const pago = normalizePagoProveedorRecord(record);
    if (!pago.autoGenerado || pago.origen !== 'compra_contado') return false;
    const cleanCompraId = cleanText(compraProveedorId);
    if (!cleanCompraId) return true;
    return pago.compraProveedorId === cleanCompraId || pago.compraIdOrigen === cleanCompraId;
  }

  function findAutoPagoCompraContado(compraProveedorId, pagosSource = appData.pagosProveedores, includeInactive = false) {
    const cleanCompraId = cleanText(compraProveedorId);
    if (!cleanCompraId) return null;
    const source = Array.isArray(pagosSource) ? pagosSource : [];
    return source
      .map((record) => normalizePagoProveedorRecord(record))
      .find((pago) => (includeInactive || pago.activo) && isAutoPagoCompraContadoRecord(pago, cleanCompraId)) || null;
  }

  function getActiveManualPagosForCompra(compraProveedorId, pagosSource = appData.pagosProveedores) {
    const cleanCompraId = cleanText(compraProveedorId);
    const source = Array.isArray(pagosSource) ? pagosSource : [];
    return source
      .map((record) => normalizePagoProveedorRecord(record))
      .filter((pago) => pago.activo && pago.compraProveedorId === cleanCompraId && !isAutoPagoCompraContadoRecord(pago, cleanCompraId));
  }

  function calculateManualPagadoForCompra(compraProveedorId, pagosSource = appData.pagosProveedores) {
    return getActiveManualPagosForCompra(compraProveedorId, pagosSource)
      .reduce((sum, pago) => roundMoney(sum + pago.montoPagado), 0);
  }

  function buildAutoPagoCompraContado(compraRecord, existingPago = null) {
    const compra = normalizeCompraProveedorRecord(compraRecord);
    const timestamp = nowIso();
    const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
    const metodo = findPaymentMethodByValue(compra.metodoPagoContadoId || compra.metodoPagoContadoNombre);
    const methodValue = metodo?.id || compra.metodoPagoContadoId || compra.metodoPagoContadoNombre;
    const requiredBankType = getBankTypeForPaymentMethod(methodValue);
    const banco = requiredBankType ? getCatalogRecordById('cuentasBancos', compra.bancoPagoContadoId) : null;
    const manualPagado = calculateManualPagadoForCompra(compra.id, appData.pagosProveedores);
    const montoAuto = roundMoney(Math.max((compra.totalAjustado ?? compra.totalCompra) - manualPagado, 0));
    const activeAuto = Boolean(compra.activo && montoAuto > 0);

    return normalizePagoProveedorRecord({
      ...(existingPago || {}),
      id: existingPago?.id || generateId('pagoProveedor'),
      compraProveedorId: compra.id,
      compraIdOrigen: compra.id,
      origen: 'compra_contado',
      autoGenerado: true,
      proveedorId: compra.proveedorId,
      proveedorNombre: proveedor?.nombre || compra.proveedorNombre || existingPago?.proveedorNombre || '',
      facturaReferencia: compra.facturaReferencia,
      fechaPago: compra.fechaCompra || todayInputValue(),
      montoPagado: montoAuto,
      metodoPagoId: metodo?.id || compra.metodoPagoContadoId || existingPago?.metodoPagoId || '',
      metodoPagoNombre: metodo?.nombre || compra.metodoPagoContadoNombre || existingPago?.metodoPagoNombre || '',
      cuentaBancoId: requiredBankType ? (banco?.id || compra.bancoPagoContadoId || '') : '',
      cuentaBancoNombre: requiredBankType ? (banco?.nombre || compra.bancoPagoContadoNombre || '') : '',
      cuentaBancoTipo: requiredBankType ? normalizeBankType(banco?.tipo || compra.bancoPagoContadoTipo) : '',
      observacion: compra.observacionPagoContado || `Pago automático por compra de contado${compra.facturaReferencia ? ` · ${compra.facturaReferencia}` : ''}.`,
      activo: activeAuto,
      estado: activeAuto ? 'Registrado' : 'Anulado',
      createdAt: existingPago?.createdAt || timestamp,
      updatedAt: timestamp
    });
  }

  function annulAutoPagoCompraContado(compraProveedorId, motivo = 'Pago automático anulado por cambio en la compra de contado.') {
    const existingAuto = findAutoPagoCompraContado(compraProveedorId, appData.pagosProveedores, true);
    if (!existingAuto || !existingAuto.activo) return { action: 'none', pago: existingAuto };
    appData.pagosProveedores = (Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : []).map((record) => {
      if (record.id !== existingAuto.id) return record;
      return normalizePagoProveedorRecord({
        ...record,
        origen: 'compra_contado',
        compraIdOrigen: cleanText(record.compraIdOrigen) || compraProveedorId,
        autoGenerado: true,
        activo: false,
        estado: 'Anulado',
        observacion: cleanText(record.observacion) ? `${cleanText(record.observacion)} ${motivo}` : motivo,
        updatedAt: nowIso()
      });
    });
    return { action: 'annulled', pago: normalizePagoProveedorRecord({ ...existingAuto, activo: false, estado: 'Anulado' }) };
  }

  function syncAutoPagoCompraContado(compraRecord) {
    if (!Array.isArray(appData.pagosProveedores)) appData.pagosProveedores = [];
    const compra = normalizeCompraProveedorRecord(compraRecord);
    const existingAuto = findAutoPagoCompraContado(compra.id, appData.pagosProveedores, true);
    const shouldHaveAuto = compra.activo && compra.condicionPagoSnapshot === 'Contado';

    if (!shouldHaveAuto) {
      const result = annulAutoPagoCompraContado(compra.id);
      recalculateCompraProveedorById(compra.id);
      return result;
    }

    const autoPago = buildAutoPagoCompraContado(compra, existingAuto);
    if (existingAuto) {
      appData.pagosProveedores = appData.pagosProveedores.map((record) => record.id === existingAuto.id ? autoPago : record);
      recalculateCompraProveedorById(compra.id);
      return { action: autoPago.activo ? 'updated' : 'annulled', pago: autoPago };
    }

    if (autoPago.activo) {
      appData.pagosProveedores = [autoPago, ...appData.pagosProveedores];
      recalculateCompraProveedorById(compra.id);
      return { action: 'created', pago: autoPago };
    }

    recalculateCompraProveedorById(compra.id);
    return { action: 'none', pago: autoPago };
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
      const normalized = applyInitialBdatosSeedIfNeeded(normalizeData(parsed), parsed);
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
  let appDeviceIdentity = loadDeviceIdentity();
  let appActivityLog = loadActivityLog();

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

  function normalizeKeyForCompare(value) {
    return cleanText(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es-NI');
  }

  function normalizeBankType(value) {
    const raw = cleanText(value);
    if (!raw) return '';
    const key = normalizeKeyForCompare(raw);
    const match = BANK_TYPE_OPTIONS.find((option) => normalizeKeyForCompare(option) === key);
    return match || '';
  }

  function getBankTypeDisplay(record) {
    const type = normalizeBankType(record?.tipo);
    if (type) return type;
    const legacy = cleanText(record?.tipoAnterior || record?.tipo);
    return legacy ? `Sin tipo · anterior: ${legacy}` : 'Sin tipo';
  }

  function findBankInData(dataSource, bankId = '', bankName = '') {
    const records = Array.isArray(dataSource?.cuentasBancos) ? dataSource.cuentasBancos : [];
    const safeId = cleanText(bankId);
    const safeName = normalizeNameForCompare(bankName);
    return records.find((bank) => safeId && cleanText(bank.id) === safeId)
      || records.find((bank) => safeName && normalizeNameForCompare(bank.nombre) === safeName)
      || null;
  }

  function enrichMovementBankSnapshot(record, dataSource) {
    const movement = isPlainObject(record) ? record : {};
    const bank = findBankInData(dataSource, movement.cuentaBancoId, movement.cuentaBancoNombre);
    const bankType = normalizeBankType(movement.cuentaBancoTipo || movement.bancoTipo || movement.tipoBanco || movement.bankType || movement.tipoCuentaBanco)
      || normalizeBankType(bank?.tipo);
    const bankName = cleanText(movement.cuentaBancoNombre) || cleanText(bank?.nombre);
    return {
      ...movement,
      cuentaBancoNombre: bankName,
      cuentaBancoTipo: bankType
    };
  }

  function enrichBankSnapshotsForData(dataSource) {
    if (!isPlainObject(dataSource)) return dataSource;
    ['cobros', 'pagosProveedores', 'gastos'].forEach((key) => {
      dataSource[key] = Array.isArray(dataSource[key])
        ? dataSource[key].map((record) => enrichMovementBankSnapshot(record, dataSource))
        : [];
    });
    return dataSource;
  }

  function catalogRecordsMatchForMerge(catalogId, left, right) {
    if (cleanText(left?.id) && cleanText(left?.id) === cleanText(right?.id)) return true;
    const leftName = normalizeNameForCompare(left?.nombre);
    const rightName = normalizeNameForCompare(right?.nombre);
    if (!leftName || !rightName || leftName !== rightName) return false;
    if (catalogId === 'cuentasBancos') {
      return normalizeBankType(left?.tipo) === normalizeBankType(right?.tipo);
    }
    return true;
  }

  function isBankTypeMethodName(value) {
    const key = normalizeKeyForCompare(value);
    return key.includes('transferencia') || key.includes('deposito') || key.includes('tarjeta');
  }

  function findPaymentMethodByValue(value) {
    const raw = cleanText(value);
    if (!raw) return null;
    return getCatalogRecords('metodosPago').find((method) => (
      method.id === raw ||
      normalizeKeyForCompare(method.nombre) === normalizeKeyForCompare(raw)
    )) || null;
  }

  function paymentMethodNameSuggestsBank(value) {
    return isBankTypeMethodName(value);
  }

  function getBankTypeForPaymentMethod(value) {
    const method = findPaymentMethodByValue(value);
    const methodName = cleanText(method?.nombre || value);
    if (!methodName) return '';
    const methodKey = normalizeKeyForCompare(methodName);
    return BANK_TYPE_OPTIONS.find((option) => methodKey.includes(normalizeKeyForCompare(option))) || '';
  }

  function paymentMethodRequiresBank(value) {
    return Boolean(getBankTypeForPaymentMethod(value));
  }

  function getBankEmptyMessage(type) {
    const safeType = cleanText(type) || 'este método';
    return `No hay bancos configurados para ${safeType}. Agrega uno en Catálogos → Bancos.`;
  }

  function isBankCatalogRecord(record) {
    return Boolean(record && cleanText(record.nombre || record.id));
  }

  function bankMatchesType(record, type) {
    return normalizeBankType(record?.tipo) === cleanText(type);
  }

  function getActiveBankRecords() {
    return getCatalogRecords('cuentasBancos').filter((record) => record.activo && isBankCatalogRecord(record));
  }

  function getSelectableBankRecords(currentId = '') {
    const selected = cleanText(currentId);
    return getCatalogRecords('cuentasBancos').filter((record) => (
      isBankCatalogRecord(record) && (record.activo || record.id === selected)
    ));
  }

  function getSelectableBankRecordsByType(type, currentId = '') {
    const selected = cleanText(currentId);
    const requiredType = cleanText(type);
    if (!requiredType) return [];
    return getCatalogRecords('cuentasBancos').filter((record) => (
      isBankCatalogRecord(record) &&
      bankMatchesType(record, requiredType) &&
      (record.activo || record.id === selected)
    ));
  }

  function getValidBankForPaymentMethod(methodValue, bankId, existingRecord = null) {
    const requiredType = getBankTypeForPaymentMethod(methodValue);
    const selectedBankId = cleanText(bankId);
    if (!requiredType || !selectedBankId) return null;
    const bank = getCatalogRecordById('cuentasBancos', selectedBankId);
    if (!bank || !isBankCatalogRecord(bank)) return null;
    if (!bankMatchesType(bank, requiredType)) return null;
    if (!bank.activo && existingRecord?.cuentaBancoId !== bank.id) return null;
    return bank;
  }

  function isSafeDeleteCatalog(catalogId) {
    return catalogId === 'metodosPago' || catalogId === 'cuentasBancos';
  }

  function renderPaymentBankField(bancosActivos, record = {}, disabled = false) {
    const selectedMethodId = cleanText(record?.metodoPagoId);
    const selectedMethodName = cleanText(record?.metodoPagoNombre);
    const requiredBankType = getBankTypeForPaymentMethod(selectedMethodId || selectedMethodName);
    const requiresBank = Boolean(requiredBankType);
    const selectedBankId = cleanText(record?.cuentaBancoId);
    const banks = Array.isArray(bancosActivos) ? bancosActivos.filter(isBankCatalogRecord) : [];
    const hasMatchingBanks = requiresBank && banks.some((bank) => bankMatchesType(bank, requiredBankType));
    const isDisabled = Boolean(disabled || !requiresBank || !hasMatchingBanks);
    const requiredDotClass = requiresBank && hasMatchingBanks ? '' : ' is-hidden';
    return `
      <label class="form-field payment-bank-field${requiresBank ? '' : ' is-hidden'}" data-bank-field>
        <span>Banco <span class="required-dot${requiredDotClass}" data-bank-required-dot aria-label="obligatorio">*</span></span>
        <select name="cuentaBancoId" data-bank-select data-bank-base-disabled="${disabled ? 'true' : 'false'}" ${requiresBank && hasMatchingBanks ? 'required' : ''} ${isDisabled ? 'disabled' : ''}>
          <option value="">Seleccionar banco</option>
          ${banks.map((banco) => {
            const bankType = normalizeBankType(banco.tipo);
            const matchesType = requiresBank && bankType === requiredBankType;
            const optionHidden = requiresBank && !matchesType ? ' hidden disabled' : '';
            return `<option value="${escapeHtml(banco.id)}" data-bank-type="${escapeHtml(bankType)}"${optionHidden} ${banco.id === selectedBankId ? 'selected' : ''}>${escapeHtml(banco.nombre || 'Banco sin nombre')} · ${escapeHtml(getBankTypeDisplay(banco))}${banco.activo ? '' : ' · inactivo'}</option>`;
          }).join('')}
        </select>
        <small class="compact-note bank-empty-message${requiresBank && !hasMatchingBanks ? '' : ' is-hidden'}" data-bank-empty-message>${escapeHtml(getBankEmptyMessage(requiredBankType))}</small>
      </label>
    `;
  }

  function setupPaymentBankField(form) {
    const methodSelect = form.querySelector('[data-payment-method-select]');
    const bankField = form.querySelector('[data-bank-field]');
    const bankSelect = form.querySelector('[data-bank-select]');
    const bankRequiredDot = form.querySelector('[data-bank-required-dot]');
    const emptyMessage = form.querySelector('[data-bank-empty-message]');
    if (!methodSelect || !bankField || !bankSelect) return;

    const sync = () => {
      const requiredBankType = getBankTypeForPaymentMethod(methodSelect.value);
      const requiresBank = Boolean(requiredBankType);
      const baseDisabled = bankSelect.dataset.bankBaseDisabled === 'true';
      let matchingBanks = 0;

      Array.from(bankSelect.options).forEach((option) => {
        if (!option.value) return;
        const matchesType = requiresBank && option.dataset.bankType === requiredBankType;
        option.hidden = !matchesType;
        option.disabled = !matchesType;
        if (matchesType) matchingBanks += 1;
      });

      const selectedOption = bankSelect.selectedOptions && bankSelect.selectedOptions[0];
      if (!requiresBank || (selectedOption && selectedOption.value && (selectedOption.hidden || selectedOption.disabled))) {
        bankSelect.value = '';
      }

      bankField.classList.toggle('is-hidden', !requiresBank);
      bankSelect.required = requiresBank && matchingBanks > 0;
      bankSelect.disabled = baseDisabled || !requiresBank || matchingBanks === 0;
      bankRequiredDot?.classList.toggle('is-hidden', !(requiresBank && matchingBanks > 0));
      if (emptyMessage) {
        emptyMessage.textContent = getBankEmptyMessage(requiredBankType);
        emptyMessage.classList.toggle('is-hidden', !(requiresBank && matchingBanks === 0));
      }
    };

    methodSelect.addEventListener('change', sync);
    sync();
  }

  function validateBankForPaymentMethod(record, existingRecord = null) {
    const requiredBankType = getBankTypeForPaymentMethod(record.metodoPagoId || record.metodoPagoNombre);
    if (!requiredBankType) return '';
    const banks = getSelectableBankRecordsByType(requiredBankType, existingRecord?.cuentaBancoId);
    if (!banks.length) return getBankEmptyMessage(requiredBankType);
    const valid = banks.some((bank) => bank.id === record.cuentaBancoId);
    if (!valid) return `Selecciona un banco configurado para ${requiredBankType}.`;
    return '';
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

  function isConfigRoute(route) {
    return route === 'configuracion' || route === 'respaldo';
  }

  function getViewportScrollTop() {
    return window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
  }

  function restoreViewportScrollTop(scrollTop) {
    const rawTop = Number(scrollTop);
    if (!Number.isFinite(rawTop)) return;
    const maxTop = Math.max(0, (document.documentElement?.scrollHeight || document.body?.scrollHeight || 0) - window.innerHeight);
    const targetTop = Math.max(0, Math.min(rawTop, maxTop));
    window.scrollTo({ top: targetTop, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function readConfigScrollRestore() {
    try {
      const stored = sessionStorage.getItem(CONFIG_SCROLL_RESTORE_KEY);
      if (!stored) return null;
      sessionStorage.removeItem(CONFIG_SCROLL_RESTORE_KEY);
      const parsed = Number(stored);
      return Number.isFinite(parsed) ? parsed : null;
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo leer la posición de Configuración.', error);
      return null;
    }
  }

  function rememberConfigScrollForReload() {
    if (!isConfigRoute(getRoute())) return;
    try {
      sessionStorage.setItem(CONFIG_SCROLL_RESTORE_KEY, String(getViewportScrollTop()));
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo guardar la posición de Configuración.', error);
    }
  }

  function renderRoute(options = {}) {
    const route = getRoute();
    const isConfigScreen = isConfigRoute(route);
    const wasConfigScreen = isConfigRoute(lastRenderedRoute);
    const storedConfigScroll = isConfigScreen ? readConfigScrollRestore() : null;
    const preserveScroll = options?.preserveScroll === true || (isConfigScreen && (storedConfigScroll !== null || (wasConfigScreen && options?.preserveScroll !== false)));
    const scrollTopBeforeRender = storedConfigScroll !== null ? storedConfigScroll : getViewportScrollTop();

    if (lastRenderedRoute === 'proveedores' && route !== 'proveedores') {
      resetProveedoresTransientState();
    }
    if (lastRenderedRoute === 'ventas' && route !== 'ventas') {
      resetVentasTransientState();
    }
    lastRenderedRoute = route;
    setActiveNav(route);

    if (route === 'home') {
      catalogState.message = null;
      bdatosState.message = null;
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
      bdatosState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderCatalogos();
    } else if (route === 'bdatos') {
      catalogState.message = null;
      ventasState.message = null;
      cobrosState.message = null;
      proveedoresState.message = null;
      pagosState.message = null;
      gastosState.message = null;
      viewRoot.innerHTML = renderBdatos();
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
    setupOperationalTopScrollbars();
    document.querySelector('#mainContent')?.focus({ preventScroll: true });
    if (preserveScroll) {
      const scheduleScrollRestore = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 0));
      scheduleScrollRestore(() => restoreViewportScrollTop(scrollTopBeforeRender));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }


  function setupOperationalTopScrollbars() {
    const shells = Array.from(viewRoot.querySelectorAll('[data-operational-scroll-shell]'));

    if (operationalScrollbarResizeHandler) {
      window.removeEventListener('resize', operationalScrollbarResizeHandler);
      operationalScrollbarResizeHandler = null;
    }
    if (typeof operationalScrollbarCleanup === 'function') {
      operationalScrollbarCleanup();
      operationalScrollbarCleanup = null;
    }

    if (!shells.length) return;

    const schedule = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 0));
    const observers = [];
    const refreshers = shells.map((shell) => {
      const topScroll = shell.querySelector('[data-operational-top-scroll]');
      const spacer = shell.querySelector('[data-operational-top-spacer]');
      const tableScroll = shell.querySelector('[data-operational-table-scroll]');
      const table = tableScroll?.querySelector('table');

      if (!topScroll || !spacer || !tableScroll || !table) return null;

      let isSyncing = false;

      const refresh = () => {
        const width = Math.max(table.scrollWidth, table.offsetWidth, tableScroll.scrollWidth, tableScroll.clientWidth);
        spacer.style.width = `${width}px`;
        const canScroll = width > tableScroll.clientWidth + 2;
        shell.classList.toggle('is-not-scrollable', !canScroll);

        if (!canScroll) {
          topScroll.scrollLeft = 0;
          tableScroll.scrollLeft = 0;
          return;
        }

        topScroll.scrollLeft = tableScroll.scrollLeft;
      };

      const syncFromTop = () => {
        if (isSyncing) return;
        isSyncing = true;
        tableScroll.scrollLeft = topScroll.scrollLeft;
        schedule(() => { isSyncing = false; });
      };

      const syncFromTable = () => {
        if (isSyncing) return;
        isSyncing = true;
        topScroll.scrollLeft = tableScroll.scrollLeft;
        schedule(() => { isSyncing = false; });
      };

      topScroll.addEventListener('scroll', syncFromTop, { passive: true });
      tableScroll.addEventListener('scroll', syncFromTable, { passive: true });
      const scheduleRefresh = () => schedule(refresh);
      const detailAncestors = Array.from(shell.closest('section, article, .panel-card, #viewRoot')?.querySelectorAll('details') || [])
        .filter((detail) => detail.contains(shell));
      detailAncestors.forEach((detail) => detail.addEventListener('toggle', scheduleRefresh, { passive: true }));
      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(scheduleRefresh);
        observer.observe(shell);
        observer.observe(tableScroll);
        observer.observe(table);
        observers.push(observer);
      }
      refresh();
      schedule(refresh);
      window.setTimeout(refresh, 80);
      window.setTimeout(refresh, 240);
      return refresh;
    }).filter(Boolean);

    operationalScrollbarResizeHandler = () => refreshers.forEach((refresh) => refresh());
    window.addEventListener('resize', operationalScrollbarResizeHandler, { passive: true });
    operationalScrollbarCleanup = () => observers.forEach((observer) => observer.disconnect());
  }

  function renderHome() {
    const totalBuckets = DATA_KEYS.length;
    const totalRecords = DATA_KEYS.reduce((sum, key) => sum + appData[key].length, 0);
    const catalogRecords = CATALOGS.reduce((sum, catalog) => sum + appData[catalog.id].length, 0);
    const jsonAppliedRows = renderJsonAppliedMetadataRows();
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
          <p class="notice">Catálogos administra las listas maestras, Ventas / OC registra documentos con saldo por cobrar, Cobros aplica abonos a OC, Proveedores / Compras registra deudas con saldo por pagar, Pagos aplica abonos a facturas/referencias y Gastos registra egresos operativos por tipo, método y banco.</p>
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
            ${jsonAppliedRows}
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
            <div class="form-field resumen-filter-actions">
              <span>Acciones</span>
              <div class="resumen-filter-buttons">
                <button type="button" class="secondary-action compact" data-resumen-clear-dates>Quitar fechas</button>
                <button type="button" class="secondary-action compact" data-resumen-clear>Limpiar filtros</button>
              </div>
            </div>
          </div>
          <div class="filter-help">
            <span>Rango de fechas manda sobre Mes/Año.</span>
            <span>Método aplica a cobros, pagos y gastos.</span>
            <span>Saldos y mora se muestran como cartera general filtrada.</span>
          </div>
        </form>

        <section class="metric-grid resumen-metrics" aria-label="Indicadores principales">
          <article class="metric-card"><span>Subtotal ventas</span><strong>${escapeHtml(formatMoney(summary.totalSubtotalVentas || summary.totalVendidoOriginal || 0))}</strong><small>Antes de descuento</small></article>
          <article class="metric-card"><span>Descuentos</span><strong>${escapeHtml(formatMoney(summary.totalDescuentosVentas || 0))}</strong><small>Aplicados a OC</small></article>
          <article class="metric-card"><span>Total ventas</span><strong>${escapeHtml(formatMoney(summary.totalVendidoOriginal || 0))}</strong><small>Subtotal - descuento</small></article>
          <article class="metric-card resumen-utility-card ${summary.utilidadPeriodo < 0 ? 'is-negative' : ''}" aria-label="Utilidad del período"><span>Utilidad</span><strong>${escapeHtml(formatMoney(summary.utilidadPeriodo || 0))}</strong><small>Según fecha del documento</small></article>
          <article class="metric-card resumen-utility-card ${summary.utilidadAcumulada < 0 ? 'is-negative' : ''}" aria-label="Utilidad acumulada"><span>Acumulada</span><strong>${escapeHtml(formatMoney(summary.utilidadAcumulada || 0))}</strong><small>Hasta corte seleccionado</small></article>
          <article class="metric-card"><span>Ajustes clientes</span><strong>${summary.totalAjustesClientes > 0 ? '-' : ''}${escapeHtml(formatMoney(summary.totalAjustesClientes || 0))}</strong><small>No son cobros</small></article>
          <article class="metric-card"><span>Total tras ajustes</span><strong>${escapeHtml(formatMoney(summary.totalVendido))}</strong><small>Total - ajustes</small></article>
          <article class="metric-card"><span>Total cobrado clientes</span><strong>${escapeHtml(formatMoney(summary.totalCobradoClientes))}</strong><small>Fecha real de cobro</small></article>
          <article class="metric-card"><span>Saldo por cobrar</span><strong>${escapeHtml(formatMoney(summary.saldoPorCobrar))}</strong><small>Cartera general</small></article>
          <article class="metric-card"><span>Compras ajustadas</span><strong>${escapeHtml(formatMoney(summary.totalComprasProveedores))}</strong><small>Original ${escapeHtml(formatMoney(summary.totalComprasOriginal || 0))}</small></article>
          <article class="metric-card"><span>Ajustes proveedores</span><strong>${summary.totalAjustesProveedores > 0 ? '-' : ''}${escapeHtml(formatMoney(summary.totalAjustesProveedores || 0))}</strong><small>No son pagos</small></article>
          <article class="metric-card"><span>Pagado proveedores</span><strong>${escapeHtml(formatMoney(summary.totalPagadoProveedores))}</strong><small>Fecha real de pago</small></article>
          <article class="metric-card"><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(summary.saldoPorPagar))}</strong><small>Cartera general</small></article>
          <article class="metric-card"><span>Total gastos</span><strong>${escapeHtml(formatMoney(summary.totalGastos))}</strong><small>Gastos no anulados</small></article>
          <article class="metric-card"><span>Clientes en mora</span><strong>${summary.clientesMoraCount}</strong><small>${summary.clientesMora.length} documentos</small></article>
          <article class="metric-card"><span>Proveedores en mora</span><strong>${summary.proveedoresMoraCount}</strong><small>${summary.proveedoresMora.length} documentos</small></article>
          <article class="metric-card"><span>Flujo del período</span><strong>${escapeHtml(formatMoney(summary.flujoPeriodo))}</strong><small>Cobros - pagos - gastos</small></article>
        </section>
        <p class="resumen-utility-note">Utilidad por origen, flujo por movimiento.</p>

        ${renderPeriodosPendientesCierreCard(summary.periodosCierre)}

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
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isPastVentaDue(venta) && matchesResumenVenta(venta, filters, null, false))
      .map((venta) => buildClienteMoraItem(venta))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const proveedoresMora = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isPastDate(compra.fechaVencimiento) && matchesResumenCompra(compra, filters, null, false))
      .map((compra) => buildProveedorMoraItem(compra))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const ventasProximas = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isVentaDueWithinNextDays(venta, 7) && matchesResumenVenta(venta, filters, null, false))
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

    const totalSubtotalVentas = sumMoney(ventasPeriodo, (venta) => venta.subtotal);
    const totalDescuentosVentas = sumMoney(ventasPeriodo, (venta) => venta.descuento);
    const totalVendidoOriginal = sumMoney(ventasPeriodo, (venta) => venta.ventaNetaOriginal);
    const totalAjustesClientes = sumMoney(ventasPeriodo, (venta) => venta.totalAjustes);
    const totalVendido = sumMoney(ventasPeriodo, (venta) => venta.ventaNetaAjustada);
    const totalCobradoClientes = sumMoney(cobrosPeriodo, (cobro) => cobro.montoCobrado);
    const saldoPorCobrar = sumMoney(ventasCartera, (venta) => venta.saldoPorCobrar);
    const totalComprasOriginal = sumMoney(comprasPeriodo, (compra) => compra.totalCompra);
    const totalAjustesProveedores = sumMoney(comprasPeriodo, (compra) => compra.totalAjustes);
    const totalComprasProveedores = sumMoney(comprasPeriodo, (compra) => compra.totalAjustado ?? compra.totalCompra);
    const totalPagadoProveedores = sumMoney(pagosPeriodo, (pago) => pago.montoPagado);
    const saldoPorPagar = sumMoney(comprasCartera, (compra) => compra.saldoPorPagar);
    const totalGastos = sumMoney(gastosPeriodo, (gasto) => gasto.monto);
    const flujoPeriodo = roundMoney(totalCobradoClientes - totalPagadoProveedores - totalGastos);
    const utilidadMetrics = buildResumenUtilityMetrics({ ventas, compras, gastos, filters, range });

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
      totalSubtotalVentas,
      totalDescuentosVentas,
      totalVendidoOriginal,
      totalAjustesClientes,
      totalVendido,
      ventaNetaAjustada: totalVendido,
      totalCobradoClientes,
      saldoPorCobrar,
      totalComprasOriginal,
      totalAjustesProveedores,
      totalComprasProveedores,
      totalComprasAjustadas: totalComprasProveedores,
      totalPagadoProveedores,
      saldoPorPagar,
      totalGastos,
      flujoPeriodo,
      ...utilidadMetrics,
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
      periodosCierre: buildPeriodosCierreSummary(ventas, compras),
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

  function getResumenAccumulatedRange(filters, range) {
    if (!range) return null;
    const explicitDateTo = toDateInputValue(filters?.dateTo);
    const hasClearCutoff = range.mode === 'month' || range.mode === 'year' || Boolean(explicitDateTo);
    if (!hasClearCutoff) return null;
    return { from: '0001-01-01', to: explicitDateTo || range.to, mode: 'accumulated' };
  }

  function matchesResumenUtilityVenta(venta, range) {
    if (!venta?.activo) return false;
    return isDateInResumenRange(venta.fechaOc, range);
  }

  function matchesResumenUtilityCompra(compra, range) {
    if (!compra?.activo) return false;
    return isDateInResumenRange(compra.fechaCompra, range);
  }

  function matchesResumenUtilityGasto(gasto, range) {
    if (!gasto?.activo) return false;
    return isDateInResumenRange(gasto.fecha, range);
  }

  function buildResumenUtilitySlice(ventas, compras, gastos, range) {
    const ventasUtilidad = ventas.filter((venta) => matchesResumenUtilityVenta(venta, range));
    const comprasUtilidad = compras.filter((compra) => matchesResumenUtilityCompra(compra, range));
    const gastosUtilidad = gastos.filter((gasto) => matchesResumenUtilityGasto(gasto, range));
    const totalVentasAjustadas = sumMoney(ventasUtilidad, (venta) => venta.ventaNetaAjustada);
    const totalComprasAjustadas = sumMoney(comprasUtilidad, (compra) => compra.totalAjustado ?? compra.totalCompra);
    const totalGastos = sumMoney(gastosUtilidad, (gasto) => gasto.monto);
    const utilidad = roundMoney(totalVentasAjustadas - totalComprasAjustadas - totalGastos);

    return {
      range,
      ventasUtilidad,
      comprasUtilidad,
      gastosUtilidad,
      totalVentasAjustadas,
      totalComprasAjustadas,
      totalGastos,
      utilidad
    };
  }

  function buildResumenUtilityMetrics({ ventas, compras, gastos, filters, range }) {
    const periodo = buildResumenUtilitySlice(ventas, compras, gastos, range);
    const accumulatedRange = getResumenAccumulatedRange(filters, range);
    const acumulado = buildResumenUtilitySlice(ventas, compras, gastos, accumulatedRange);

    return {
      utilidadPeriodo: periodo.utilidad,
      utilidadDelPeriodo: periodo.utilidad,
      utilidadAcumulada: acumulado.utilidad,
      utilidadVentasPeriodo: periodo.totalVentasAjustadas,
      utilidadComprasPeriodo: periodo.totalComprasAjustadas,
      utilidadGastosPeriodo: periodo.totalGastos,
      utilidadVentasAcumulada: acumulado.totalVentasAjustadas,
      utilidadComprasAcumulada: acumulado.totalComprasAjustadas,
      utilidadGastosAcumulada: acumulado.totalGastos,
      utilidadPeriodoDetalle: periodo,
      utilidadAcumuladaDetalle: acumulado
    };
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

  function getPeriodFromOriginDate(dateInput) {
    const safeDate = toDateInputValue(dateInput);
    if (!safeDate) return null;
    const year = safeDate.slice(0, 4);
    const month = safeDate.slice(5, 7);
    return {
      periodo: `${year}-${month}`,
      month,
      year,
      label: `${getMonthLabel(month)} ${year}`
    };
  }

  function getCierreMensualForPeriodKey(periodo) {
    const safe = cleanText(periodo);
    const match = safe.match(/^(\d{4})-(\d{2})$/);
    if (!match) return null;
    return getCierreMensualForPeriod(match[2], match[1]);
  }

  function createPeriodoCierreBase(month, year) {
    const safeMonth = /^\d{2}$/.test(String(month || '')) ? String(month) : String(new Date().getMonth() + 1).padStart(2, '0');
    const safeYear = /^\d{4}$/.test(String(year || '')) ? String(year) : String(new Date().getFullYear());
    const periodo = getPeriodKey(safeMonth, safeYear);
    const cierre = getCierreMensualForPeriod(safeMonth, safeYear);
    return {
      periodo,
      month: safeMonth,
      year: safeYear,
      label: `${getMonthLabel(safeMonth)} ${safeYear}`,
      saldoClientes: 0,
      saldoProveedores: 0,
      documentosClientes: 0,
      documentosProveedores: 0,
      clientesDetalle: [],
      proveedoresDetalle: [],
      cierre,
      estado: cierre ? 'Cerrado' : 'Listo para cierre',
      bloqueo: 'Sin bloqueo'
    };
  }

  function buildPeriodClosingStatus(month, year) {
    const periodo = getPeriodKey(month, year);
    const ventas = recalculateVentasWithCobros(appData.ventas, appData.cobros).map((record) => normalizeVentaRecord(record));
    const compras = recalculateComprasProveedoresWithPagos(appData.comprasProveedores, appData.pagosProveedores).map((record) => normalizeCompraProveedorRecord(record));
    const summary = buildPeriodosCierreSummary(ventas, compras);
    return summary.items.find((item) => item.periodo === periodo) || createPeriodoCierreBase(month, year);
  }

  function hasPeriodClosingBlock(status) {
    if (!status) return false;
    return roundMoney(status.saldoClientes) > 0 || roundMoney(status.saldoProveedores) > 0;
  }

  function getPeriodBlockingOrigin(status) {
    const hasClientes = roundMoney(status?.saldoClientes) > 0;
    const hasProveedores = roundMoney(status?.saldoProveedores) > 0;
    if (hasClientes && hasProveedores) return 'Clientes y Proveedores';
    if (hasClientes) return 'Clientes';
    if (hasProveedores) return 'Proveedores';
    return 'Sin bloqueo';
  }

  function buildPeriodBlockingSummaryText(status) {
    const lines = [];
    const clientes = Array.isArray(status?.clientesDetalle) ? status.clientesDetalle : [];
    const proveedores = Array.isArray(status?.proveedoresDetalle) ? status.proveedoresDetalle : [];

    clientes.slice(0, 4).forEach((record) => {
      lines.push(`Cliente: ${record.cliente} · OC: ${record.documento} · saldo: ${formatMoney(record.saldoPendiente)}`);
    });
    if (clientes.length > 4) lines.push(`Clientes: ${clientes.length - 4} documento(s) adicional(es) con saldo pendiente.`);

    proveedores.slice(0, 4).forEach((record) => {
      lines.push(`Proveedor: ${record.proveedor} · Referencia: ${record.documento} · saldo: ${formatMoney(record.saldoPendiente)}`);
    });
    if (proveedores.length > 4) lines.push(`Proveedores: ${proveedores.length - 4} documento(s) adicional(es) con saldo pendiente.`);

    return lines.join('\n');
  }

  function renderCierrePeriodStatusBox(status, lastExport) {
    const safe = status || createPeriodoCierreBase(cierreMensualState.month, cierreMensualState.year);
    const blocked = hasPeriodClosingBlock(safe);
    const ready = !blocked && !safe.cierre;
    const note = safe.cierre
      ? `Período cerrado el ${formatDateTime(safe.cierre.fechaHoraCierre)}.`
      : blocked
        ? `No se puede cerrar ${safe.label} porque aún existen saldos pendientes vinculados a este período.`
        : lastExport
          ? `${safe.label} ya está listo para cierre. El Excel previo está registrado y puedes cerrar el período.`
          : `${safe.label} ya está listo para cierre. Exporta el Excel del período para poder cerrarlo.`;
    const statusClass = safe.cierre ? 'is-closed' : blocked ? 'is-pending' : 'is-ready';
    return `
      <article class="periodo-cierre-card cierre-status-card ${statusClass}">
        <div class="resumen-row-head periodo-cierre-head">
          <strong>${escapeHtml(safe.label)}</strong>
          <span class="periodo-cierre-status">${escapeHtml(safe.estado)}</span>
        </div>
        <p class="notice ${ready ? 'success-note' : ''}">${escapeHtml(note)}</p>
        <div class="resumen-mini-grid periodo-cierre-grid">
          <div><span>Clientes pendientes</span><strong>${escapeHtml(formatMoney(safe.saldoClientes))}</strong></div>
          <div><span>Proveedores pendientes</span><strong>${escapeHtml(formatMoney(safe.saldoProveedores))}</strong></div>
          <div><span>Bloqueo</span><strong>${escapeHtml(getPeriodBlockingOrigin(safe))}</strong></div>
          <div><span>Excel previo</span><strong>${lastExport ? 'Sí' : 'No'}</strong></div>
        </div>
        ${blocked ? `
          <details class="periodo-cierre-detail" open>
            <summary>Ver detalle del bloqueo</summary>
            ${renderPeriodoCierreDetail(safe)}
          </details>
        ` : ''}
      </article>
    `;
  }

  function buildPeriodoClienteDetalle(venta) {
    const cliente = getCatalogRecordById('clientes', venta.clienteId);
    const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
    const diasMora = getVentaDaysOverdue(venta);
    return {
      id: venta.id,
      cliente: cliente?.nombre || 'Cliente no encontrado',
      sucursal: sucursal?.nombre || 'Sucursal no encontrada',
      documento: venta.numeroDocumento || 'Sin número',
      fechaOrigen: venta.fechaOc,
      fechaEntrega: venta.fechaEntrega || '',
      fechaBaseCredito: venta.fechaBaseCredito || getVentaCreditBaseDate(venta),
      fechaBaseCreditoTipo: venta.fechaBaseCreditoTipo || (isVentaCreditBaseEntrega(venta) ? 'Entrega' : 'OC'),
      fechaVencimiento: venta.fechaVencimiento,
      diasMora,
      saldoPendiente: venta.saldoPorCobrar,
      estado: venta.estado
    };
  }

  function buildPeriodoProveedorDetalle(compra) {
    const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
    const diasMora = getDaysOverdue(compra.fechaVencimiento);
    return {
      id: compra.id,
      proveedor: proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado',
      documento: compra.facturaReferencia || 'Sin referencia',
      fechaOrigen: compra.fechaCompra,
      fechaVencimiento: compra.fechaVencimiento,
      diasMora,
      saldoPendiente: compra.saldoPorPagar,
      estado: compra.estado
    };
  }

  function buildPeriodosCierreSummary(ventas, compras) {
    const groups = new Map();
    const ensureGroup = (periodInfo) => {
      const current = groups.get(periodInfo.periodo) || {
        periodo: periodInfo.periodo,
        month: periodInfo.month,
        year: periodInfo.year,
        label: periodInfo.label,
        saldoClientes: 0,
        saldoProveedores: 0,
        documentosClientes: 0,
        documentosProveedores: 0,
        clientesDetalle: [],
        proveedoresDetalle: [],
        cierre: null,
        estado: 'Listo para cierre',
        bloqueo: 'Sin bloqueo'
      };
      groups.set(periodInfo.periodo, current);
      return current;
    };

    (Array.isArray(ventas) ? ventas : [])
      .filter((venta) => venta.activo)
      .forEach((venta) => {
        const periodInfo = getPeriodFromOriginDate(venta.fechaOc);
        if (!periodInfo) return;
        const group = ensureGroup(periodInfo);
        group.documentosClientes += 1;
        if (roundMoney(venta.saldoPorCobrar) > 0) {
          group.saldoClientes = roundMoney(group.saldoClientes + venta.saldoPorCobrar);
          group.clientesDetalle.push(buildPeriodoClienteDetalle(venta));
        }
      });

    (Array.isArray(compras) ? compras : [])
      .filter((compra) => compra.activo)
      .forEach((compra) => {
        const periodInfo = getPeriodFromOriginDate(compra.fechaCompra);
        if (!periodInfo) return;
        const group = ensureGroup(periodInfo);
        group.documentosProveedores += 1;
        if (roundMoney(compra.saldoPorPagar) > 0) {
          group.saldoProveedores = roundMoney(group.saldoProveedores + compra.saldoPorPagar);
          group.proveedoresDetalle.push(buildPeriodoProveedorDetalle(compra));
        }
      });

    const items = Array.from(groups.values()).map((item) => {
      const cierre = getCierreMensualForPeriodKey(item.periodo);
      const hasClientes = roundMoney(item.saldoClientes) > 0;
      const hasProveedores = roundMoney(item.saldoProveedores) > 0;
      let bloqueo = 'Sin bloqueo';
      if (hasClientes && hasProveedores) bloqueo = 'Ambos';
      else if (hasClientes) bloqueo = 'Clientes';
      else if (hasProveedores) bloqueo = 'Proveedores';
      const estado = cierre ? 'Cerrado' : (hasClientes || hasProveedores ? 'Pendiente de cierre' : 'Listo para cierre');
      return {
        ...item,
        cierre,
        bloqueo,
        estado,
        clientesDetalle: item.clientesDetalle.sort((a, b) => b.saldoPendiente - a.saldoPendiente || String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento))),
        proveedoresDetalle: item.proveedoresDetalle.sort((a, b) => b.saldoPendiente - a.saldoPendiente || String(a.fechaVencimiento).localeCompare(String(b.fechaVencimiento)))
      };
    }).sort((a, b) => {
      const order = { 'Pendiente de cierre': 0, 'Listo para cierre': 1, 'Cerrado': 2 };
      return (order[a.estado] ?? 9) - (order[b.estado] ?? 9) || String(b.periodo).localeCompare(String(a.periodo));
    });

    return {
      items,
      pendientes: items.filter((item) => item.estado === 'Pendiente de cierre'),
      listos: items.filter((item) => item.estado === 'Listo para cierre'),
      cerrados: items.filter((item) => item.estado === 'Cerrado')
    };
  }

  function renderPeriodosPendientesCierreCard(summary) {
    const data = summary || { items: [], pendientes: [], listos: [], cerrados: [] };
    const totalItems = Array.isArray(data.items) ? data.items.length : 0;
    const pendingCount = Array.isArray(data.pendientes) ? data.pendientes.length : 0;
    const readyCount = Array.isArray(data.listos) ? data.listos.length : 0;
    const closedCount = Array.isArray(data.cerrados) ? data.cerrados.length : 0;
    const message = !totalItems
      ? 'No hay períodos pendientes de cierre.'
      : pendingCount
        ? `${pendingCount} período${pendingCount === 1 ? '' : 's'} pendiente${pendingCount === 1 ? '' : 's'} de cierre por saldos de Clientes, Proveedores o ambos.`
        : readyCount
          ? `${readyCount} período${readyCount === 1 ? '' : 's'} listo${readyCount === 1 ? '' : 's'} para cierre.`
          : 'No hay períodos pendientes de cierre.';

    return `
      <section class="panel-card resumen-panel periodos-cierre-panel">
        <div class="section-title-row">
          <div><span class="eyebrow mini">Cierre mensual</span><h2>Períodos Pendientes de Cierre</h2></div>
          <div class="count-pill">${pendingCount} pendiente${pendingCount === 1 ? '' : 's'}</div>
        </div>
        <p class="notice periodos-cierre-notice">${escapeHtml(message)} El período se calcula por fecha de origen del documento; cobros o pagos posteriores no mueven ese bloqueo.</p>
        ${readyCount ? `
          <article class="period-ready-alert" role="status">
            <strong>${escapeHtml(data.listos[0].label)} ya está listo para cierre.</strong>
            <span>Exporta el Excel del período y luego ciérralo desde Excel / Cierre.</span>
            <button type="button" class="secondary-action compact" data-go="excel">Ir a Excel / Cierre</button>
          </article>
        ` : ''}
        ${totalItems ? `
          <div class="periodos-cierre-summary" aria-label="Resumen de períodos por estado">
            <div><span>Pendientes</span><strong>${pendingCount}</strong></div>
            <div><span>Listos</span><strong>${readyCount}</strong></div>
            <div><span>Cerrados</span><strong>${closedCount}</strong></div>
          </div>
          ${renderPeriodosCierreCompactTable(data.items)}
        ` : renderMoraEmptyState('No hay períodos pendientes de cierre.', 'Cuando existan OC o compras con saldo pendiente, aparecerán aquí por período de origen.')}
      </section>
    `;
  }

  function renderPeriodosCierreCompactTable(items) {
    const rows = items.map((item) => renderPeriodoCierreCompactRows(item)).join('');
    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-periodos-cierre-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Períodos pendientes de cierre en líneas compactas',
      tableClass: 'resumen-compact-table resumen-periodos-cierre-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-periodo">
          <col class="resumen-col-estado">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
          <col class="resumen-col-bloqueo">
          <col class="resumen-col-documentos">
          <col class="resumen-col-detalle">
        </colgroup>
      `,
      headers: `
        <th>Período</th>
        <th>Estado</th>
        <th class="amount-cell">Clientes</th>
        <th class="amount-cell">Proveedores</th>
        <th>Bloqueo</th>
        <th>Docs</th>
        <th>Detalle</th>
      `,
      rows
    });
  }

  function renderPeriodoCierreCompactRows(item) {
    const statusClass = item.estado === 'Pendiente de cierre' ? 'is-pending' : item.estado === 'Listo para cierre' ? 'is-ready' : 'is-closed';
    const detailCount = item.clientesDetalle.length + item.proveedoresDetalle.length;
    const detailLabel = detailCount ? `Ver detalle (${detailCount})` : 'Ver detalle';
    const documentCount = item.documentosClientes + item.documentosProveedores;
    return `
      <tr class="compact-record-row resumen-compact-row resumen-periodo-row ${statusClass}">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.label)}">${escapeHtml(item.label)}</span></td>
        <td class="resumen-compact-state"><span class="periodo-cierre-status ${statusClass}">${escapeHtml(item.estado)}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoClientes))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoProveedores))}</span></td>
        <td class="resumen-compact-text"><span title="${escapeHtml(item.bloqueo)}">${escapeHtml(item.bloqueo)}</span></td>
        <td class="resumen-compact-count"><span>${documentCount}</span></td>
        <td class="resumen-compact-detail-hint"><span>${detailCount ? `${detailCount} doc.` : 'Sin saldo'}</span></td>
      </tr>
      <tr class="resumen-periodo-detail-row ${statusClass}">
        <td colspan="7" class="resumen-periodo-detail-cell">
          <details class="periodo-cierre-detail resumen-periodo-compact-detail">
            <summary>${escapeHtml(detailLabel)}</summary>
            ${item.estado === 'Listo para cierre' ? `
              <div class="period-card-action resumen-periodo-compact-action">
                <span>${escapeHtml(item.label)} ya está listo para cierre. Exporta el Excel del período y ciérralo cuando corresponda.</span>
                <button type="button" class="secondary-action compact" data-go="excel">Ir a cierre</button>
              </div>
            ` : ''}
            ${renderPeriodoCierreDetail(item)}
          </details>
        </td>
      </tr>
    `;
  }

  function renderPeriodoCierreItem(item) {
    const statusClass = item.estado === 'Pendiente de cierre' ? 'is-pending' : item.estado === 'Listo para cierre' ? 'is-ready' : 'is-closed';
    const detailCount = item.clientesDetalle.length + item.proveedoresDetalle.length;
    const detailLabel = detailCount ? `Ver detalle (${detailCount})` : 'Ver detalle';
    return `
      <article class="resumen-row-card stacked periodo-cierre-card ${statusClass}">
        <div class="resumen-row-head periodo-cierre-head">
          <strong>${escapeHtml(item.label)}</strong>
          <span class="periodo-cierre-status">${escapeHtml(item.estado)}</span>
        </div>
        <div class="resumen-mini-grid periodo-cierre-grid">
          <div><span>Clientes</span><strong>${escapeHtml(formatMoney(item.saldoClientes))}</strong></div>
          <div><span>Proveedores</span><strong>${escapeHtml(formatMoney(item.saldoProveedores))}</strong></div>
          <div><span>Bloqueo</span><strong>${escapeHtml(item.bloqueo)}</strong></div>
          <div><span>Documentos</span><strong>${item.documentosClientes + item.documentosProveedores}</strong></div>
        </div>
        ${item.estado === 'Listo para cierre' ? `
          <div class="period-card-action">
            <span>${escapeHtml(item.label)} ya está listo para cierre. Exporta el Excel del período y ciérralo cuando corresponda.</span>
            <button type="button" class="secondary-action compact" data-go="excel">Ir a cierre</button>
          </div>
        ` : ''}
        <details class="periodo-cierre-detail">
          <summary>${escapeHtml(detailLabel)}</summary>
          ${renderPeriodoCierreDetail(item)}
        </details>
      </article>
    `;
  }

  function renderPeriodoCierreDetail(item) {
    if (!item.clientesDetalle.length && !item.proveedoresDetalle.length) {
      const cierreInfo = item.cierre ? ` Cerrado el ${formatDateTime(item.cierre.fechaHoraCierre)}.` : '';
      return `<div class="empty-state mora-empty"><strong>Sin documentos pendientes.</strong><p>Este período tiene movimientos/documentos, pero no tiene saldo pendiente por Clientes ni Proveedores.${escapeHtml(cierreInfo)}</p></div>`;
    }

    return `
      <div class="periodo-detail-wrap periodo-blocking-detail-wrap" aria-label="Detalle informativo del bloqueo de cierre">
        <section class="periodo-blocking-section">
          <h3>Clientes</h3>
          ${item.clientesDetalle.length ? renderPeriodoClientesBlockingTable(item.clientesDetalle) : '<p class="periodo-detail-empty">Sin saldos pendientes de clientes.</p>'}
        </section>
        <section class="periodo-blocking-section">
          <h3>Proveedores</h3>
          ${item.proveedoresDetalle.length ? renderPeriodoProveedoresBlockingTable(item.proveedoresDetalle) : '<p class="periodo-detail-empty">Sin saldos pendientes de proveedores.</p>'}
        </section>
      </div>
    `;
  }

  function formatPeriodoMoraLabel(diasMora) {
    const dias = Number(diasMora) || 0;
    return dias > 0 ? `${dias} día${dias === 1 ? '' : 's'}` : 'No aplica';
  }

  function renderPeriodoClientesBlockingTable(records) {
    const rows = records.map((record) => `
      <tr class="compact-record-row periodo-blocking-row">
        <td class="periodo-blocking-text"><span title="${escapeHtml(record.cliente)}">${escapeHtml(record.cliente)}</span></td>
        <td class="periodo-blocking-text"><span title="${escapeHtml(record.sucursal)}">${escapeHtml(record.sucursal)}</span></td>
        <td class="periodo-blocking-doc"><span title="${escapeHtml(record.documento)}">${escapeHtml(record.documento)}</span></td>
        <td class="periodo-blocking-date"><span>${escapeHtml(formatDate(record.fechaOrigen))}</span></td>
        <td class="periodo-blocking-date"><span>${escapeHtml(formatDate(record.fechaVencimiento))}</span></td>
        <td class="periodo-blocking-mora"><span>${escapeHtml(formatPeriodoMoraLabel(record.diasMora))}</span></td>
        <td class="amount-cell periodo-blocking-amount"><span>${escapeHtml(formatMoney(record.saldoPendiente))}</span></td>
      </tr>
    `).join('');
    return renderOperationalTableShell({
      shellClass: 'periodo-blocking-scroll-shell periodo-blocking-clientes-shell',
      wrapClass: 'periodo-blocking-table-wrap',
      ariaLabel: 'Clientes pendientes que bloquean el cierre del período',
      tableClass: 'periodo-blocking-table periodo-blocking-table-clientes',
      colgroup: `
        <colgroup>
          <col class="periodo-col-cliente">
          <col class="periodo-col-sucursal">
          <col class="periodo-col-documento">
          <col class="periodo-col-fecha">
          <col class="periodo-col-fecha">
          <col class="periodo-col-mora">
          <col class="periodo-col-saldo">
        </colgroup>
      `,
      headers: `
        <th>Cliente</th>
        <th>Sucursal</th>
        <th>Documento</th>
        <th>Origen</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
  }

  function renderPeriodoProveedoresBlockingTable(records) {
    const rows = records.map((record) => `
      <tr class="compact-record-row periodo-blocking-row">
        <td class="periodo-blocking-text"><span title="${escapeHtml(record.proveedor)}">${escapeHtml(record.proveedor)}</span></td>
        <td class="periodo-blocking-doc"><span title="${escapeHtml(record.documento)}">${escapeHtml(record.documento)}</span></td>
        <td class="periodo-blocking-date"><span>${escapeHtml(formatDate(record.fechaOrigen))}</span></td>
        <td class="periodo-blocking-date"><span>${escapeHtml(formatDate(record.fechaVencimiento))}</span></td>
        <td class="periodo-blocking-mora"><span>${escapeHtml(formatPeriodoMoraLabel(record.diasMora))}</span></td>
        <td class="amount-cell periodo-blocking-amount"><span>${escapeHtml(formatMoney(record.saldoPendiente))}</span></td>
      </tr>
    `).join('');
    return renderOperationalTableShell({
      shellClass: 'periodo-blocking-scroll-shell periodo-blocking-proveedores-shell',
      wrapClass: 'periodo-blocking-table-wrap',
      ariaLabel: 'Proveedores pendientes que bloquean el cierre del período',
      tableClass: 'periodo-blocking-table periodo-blocking-table-proveedores',
      colgroup: `
        <colgroup>
          <col class="periodo-col-proveedor">
          <col class="periodo-col-documento">
          <col class="periodo-col-fecha">
          <col class="periodo-col-fecha">
          <col class="periodo-col-mora">
          <col class="periodo-col-saldo">
        </colgroup>
      `,
      headers: `
        <th>Proveedor</th>
        <th>Referencia</th>
        <th>Origen</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
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
        totalAjustes: 0,
        totalAjustado: 0,
        totalPagado: 0,
        saldoPorPagar: 0,
        documentos: 0
      };
      current.totalCompra = roundMoney(current.totalCompra + compra.totalCompra);
      current.totalAjustes = roundMoney(current.totalAjustes + compra.totalAjustes);
      current.totalAjustado = roundMoney(current.totalAjustado + compra.totalAjustado);
      current.totalPagado = roundMoney(current.totalPagado + compra.totalPagado);
      current.saldoPorPagar = roundMoney(current.saldoPorPagar + compra.saldoPorPagar);
      current.documentos += 1;
      groups.set(key, current);
    });
    return Array.from(groups.values())
      .filter((item) => item.totalAjustado || item.totalPagado || item.saldoPorPagar)
      .sort((a, b) => b.saldoPorPagar - a.saldoPorPagar || b.totalAjustado - a.totalAjustado || a.proveedor.localeCompare(b.proveedor, 'es-NI'));
  }

  function renderResumenGastosPorTipo(items) {
    if (!items.length) return renderMoraEmptyState('Sin gastos en el período.', 'Los gastos no anulados aparecerán agrupados por tipo.');
    const rows = items.map((item) => `
      <tr class="compact-record-row resumen-compact-row">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.tipo)}">${escapeHtml(item.tipo)}</span></td>
        <td class="resumen-compact-count"><span>${escapeHtml(String(item.cantidad || 0))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.total))}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-gastos-tipo-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Gastos por tipo en líneas compactas',
      tableClass: 'resumen-compact-table resumen-gastos-tipo-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-tipo">
          <col class="resumen-col-documentos">
          <col class="resumen-col-money">
        </colgroup>
      `,
      headers: `
        <th>Tipo</th>
        <th>Registros</th>
        <th class="amount-cell">Total</th>
      `,
      rows
    });
  }

  function renderResumenVentaPorSucursal(items) {
    if (!items.length) return renderMoraEmptyState('Sin venta por sucursal.', 'Cuando existan OC, cobros o cartera filtrada, aparecerán aquí por sucursal.');
    const rows = items.map((item) => `
      <tr class="compact-record-row resumen-compact-row">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.sucursal)}">${escapeHtml(item.sucursal)}</span></td>
        <td class="resumen-compact-count"><span>${escapeHtml(String(item.documentos || 0))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.totalVendido))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.totalCobrado))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPorCobrar))}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-venta-sucursal-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Venta por sucursal en líneas compactas',
      tableClass: 'resumen-compact-table resumen-venta-sucursal-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-sucursal">
          <col class="resumen-col-documentos">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
        </colgroup>
      `,
      headers: `
        <th>Sucursal</th>
        <th>OC</th>
        <th class="amount-cell">Venta</th>
        <th class="amount-cell">Cobrado</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
  }

  function renderResumenSaldosProveedor(items) {
    if (!items.length) return renderMoraEmptyState('Sin saldos por proveedor.', 'Las compras/deudas no anuladas aparecerán agrupadas por proveedor.');
    const rows = items.map((item) => `
      <tr class="compact-record-row resumen-compact-row">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.proveedor)}">${escapeHtml(item.proveedor)}</span></td>
        <td class="resumen-compact-count"><span>${escapeHtml(String(item.documentos || 0))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.totalCompra))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${item.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(item.totalAjustes))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.totalAjustado))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.totalPagado))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPorPagar))}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-saldos-proveedor-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Saldos por proveedor en líneas compactas',
      tableClass: 'resumen-compact-table resumen-saldos-proveedor-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-proveedor">
          <col class="resumen-col-documentos">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
          <col class="resumen-col-money">
        </colgroup>
      `,
      headers: `
        <th>Proveedor</th>
        <th>Documentos</th>
        <th class="amount-cell">Original</th>
        <th class="amount-cell">Ajustes</th>
        <th class="amount-cell">Total</th>
        <th class="amount-cell">Pagado</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
  }

  function renderResumenClientesMora(items) {
    if (!items.length) return renderMoraEmptyState('No hay clientes en mora.', 'La cartera vencida con saldo pendiente aparecerá aquí.');
    const rows = items.map((item) => `
      <tr class="compact-record-row resumen-compact-row">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.cliente)}">${escapeHtml(item.cliente)}</span></td>
        <td class="resumen-compact-text"><span title="${escapeHtml(item.sucursal)}">${escapeHtml(item.sucursal)}</span></td>
        <td class="resumen-compact-doc"><span title="${escapeHtml(item.documento)}">${escapeHtml(item.documento)}</span></td>
        <td class="resumen-compact-date"><span>${escapeHtml(formatDate(item.fechaVencimiento))}</span></td>
        <td class="resumen-compact-mora"><span>${escapeHtml(formatPeriodoMoraLabel(item.diasMora))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPendiente))}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-clientes-mora-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Clientes en mora del tablero en líneas compactas',
      tableClass: 'resumen-compact-table resumen-clientes-mora-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-cliente">
          <col class="resumen-col-sucursal">
          <col class="resumen-col-documento">
          <col class="resumen-col-fecha">
          <col class="resumen-col-mora">
          <col class="resumen-col-saldo">
        </colgroup>
      `,
      headers: `
        <th>Cliente</th>
        <th>Sucursal</th>
        <th>Documento</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
  }

  function renderResumenProveedoresMora(items) {
    if (!items.length) return renderMoraEmptyState('No hay proveedores en mora.', 'Las facturas vencidas con saldo pendiente aparecerán aquí.');
    const rows = items.map((item) => `
      <tr class="compact-record-row resumen-compact-row">
        <td class="resumen-compact-text"><span title="${escapeHtml(item.proveedor)}">${escapeHtml(item.proveedor)}</span></td>
        <td class="resumen-compact-doc"><span title="${escapeHtml(item.documento)}">${escapeHtml(item.documento)}</span></td>
        <td class="resumen-compact-date"><span>${escapeHtml(formatDate(item.fechaVencimiento))}</span></td>
        <td class="resumen-compact-mora"><span>${escapeHtml(formatPeriodoMoraLabel(item.diasMora))}</span></td>
        <td class="amount-cell resumen-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPendiente))}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'resumen-compact-scroll-shell resumen-proveedores-mora-shell',
      wrapClass: 'resumen-compact-table-wrap',
      ariaLabel: 'Proveedores en mora del tablero en líneas compactas',
      tableClass: 'resumen-compact-table resumen-proveedores-mora-table',
      colgroup: `
        <colgroup>
          <col class="resumen-col-proveedor">
          <col class="resumen-col-referencia">
          <col class="resumen-col-fecha">
          <col class="resumen-col-mora">
          <col class="resumen-col-saldo">
        </colgroup>
      `,
      headers: `
        <th>Proveedor</th>
        <th>Referencia</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
      `,
      rows
    });
  }

  function updateResumenFiltersFromForm(form, options = {}) {
    const formData = new FormData(form);
    const clearDates = Boolean(options.clearDates);
    resumenState = normalizeResumenFilters({
      month: formData.get('month'),
      year: formData.get('year'),
      dateFrom: clearDates ? '' : formData.get('dateFrom'),
      dateTo: clearDates ? '' : formData.get('dateTo'),
      clienteId: formData.get('clienteId'),
      proveedorId: formData.get('proveedorId'),
      sucursalId: formData.get('sucursalId'),
      estado: formData.get('estado'),
      mora: formData.get('mora'),
      metodoPagoId: formData.get('metodoPagoId')
    });
    renderRoute();
  }

  function clearResumenDateFilters() {
    resumenState = normalizeResumenFilters({
      ...resumenState,
      dateFrom: '',
      dateTo: ''
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
    const moraClientesCompact = summary.clientesMora.length
      ? renderClientesMoraCompactTable(summary.clientesMora)
      : renderMoraEmptyState('No hay clientes en mora.', 'Las OC vencidas con saldo aparecerán aquí automáticamente.');
    const moraProveedoresCompact = summary.proveedoresMora.length
      ? renderProveedoresMoraCompactTable(summary.proveedoresMora)
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
            <div class="mora-list">${moraClientesCompact}</div>
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
            <div class="mora-list">${moraProveedoresCompact}</div>
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
          ${renderHistorialDocumentosCompact(summary, selectedHistory)}
        </section>
      </section>
    `;
  }

  function buildMoraAlertasSummary() {
    const ventas = recalculateVentasWithCobros(appData.ventas, appData.cobros).map((record) => normalizeVentaRecord(record));
    const compras = recalculateComprasProveedoresWithPagos(appData.comprasProveedores, appData.pagosProveedores).map((record) => normalizeCompraProveedorRecord(record));
    const clientesMora = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isPastVentaDue(venta))
      .map((venta) => buildClienteMoraItem(venta))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const proveedoresMora = compras
      .filter((compra) => compra.activo && compra.saldoPorPagar > 0 && isPastDate(compra.fechaVencimiento))
      .map((compra) => buildProveedorMoraItem(compra))
      .sort((a, b) => b.diasMora - a.diasMora || b.saldoPendiente - a.saldoPendiente);
    const ventasProximas = ventas
      .filter((venta) => venta.activo && venta.saldoPorCobrar > 0 && isVentaDueWithinNextDays(venta, 7))
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
    const diasMora = getVentaDaysOverdue(venta);
    return {
      id: venta.id,
      cliente: cliente?.nombre || 'Cliente no encontrado',
      sucursal: sucursal?.nombre || 'Sucursal no encontrada',
      documento: venta.numeroDocumento || 'Sin número',
      fechaOrigen: venta.fechaOc,
      fechaEntrega: venta.fechaEntrega || '',
      fechaBaseCredito: venta.fechaBaseCredito || getVentaCreditBaseDate(venta),
      fechaBaseCreditoTipo: venta.fechaBaseCreditoTipo || (isVentaCreditBaseEntrega(venta) ? 'Entrega' : 'OC'),
      fechaVencimiento: venta.fechaVencimiento,
      diasMora,
      rango: getMoraRangeLabel(diasMora),
      subtotal: venta.subtotal,
      descuento: venta.descuento,
      ventaNetaOriginal: venta.ventaNetaOriginal,
      totalAjustes: venta.totalAjustes,
      ventaNetaAjustada: venta.ventaNetaAjustada,
      ventaNeta: venta.ventaNetaAjustada,
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
      totalAjustes: compra.totalAjustes,
      totalAjustado: compra.totalAjustado,
      totalPagado: compra.totalPagado,
      saldoPendiente: compra.saldoPorPagar,
      estado: compra.estado
    };
  }

  function buildAlertasList(parts) {
    const alertas = [];
    if (parts.clientesMora.length) alertas.push({ tipo: 'danger', titulo: 'Clientes vencidos', detalle: `${parts.clientesMora.length} OC vencidas con saldo por cobrar.` });
    if (parts.proveedoresMora.length) alertas.push({ tipo: 'danger', titulo: 'Proveedores vencidos', detalle: `${parts.proveedoresMora.length} facturas o referencias vencidas con saldo por pagar.` });
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

  function renderClientesMoraCompactTable(items) {
    const rows = items.map((item) => {
      const searchable = normalizeNameForCompare(`${item.cliente} ${item.sucursal} ${item.documento} ${item.fechaOrigen} ${item.fechaVencimiento} ${item.estado} ${item.rango}`);
      return `
        <tr class="compact-record-row mora-compact-row" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
          <td class="mora-compact-text"><span title="${escapeHtml(item.cliente)}">${escapeHtml(item.cliente)}</span></td>
          <td class="mora-compact-text"><span title="${escapeHtml(item.sucursal)}">${escapeHtml(item.sucursal)}</span></td>
          <td class="mora-compact-doc"><span title="${escapeHtml(item.documento)}">${escapeHtml(item.documento)}</span></td>
          <td class="mora-compact-date"><span>${escapeHtml(formatDate(item.fechaOrigen))}</span></td>
          <td class="mora-compact-date"><span>${escapeHtml(formatDate(item.fechaVencimiento))}</span></td>
          <td class="mora-compact-mora"><span>${escapeHtml(formatPeriodoMoraLabel(item.diasMora))}</span></td>
          <td class="amount-cell mora-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPendiente))}</span></td>
          <td class="mora-compact-state"><span class="state-pill ${getEstadoClass(item.estado)}">${escapeHtml(item.estado)}</span></td>
          <td class="mora-compact-actions"><div class="compact-row-actions"><button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(item.id)}">Ver</button></div></td>
        </tr>
      `;
    }).join('');

    return renderOperationalTableShell({
      shellClass: 'mora-compact-scroll-shell mora-clientes-scroll-shell',
      wrapClass: 'mora-compact-table-wrap',
      ariaLabel: 'Clientes en mora con saldo pendiente',
      tableClass: 'mora-compact-table mora-compact-table-clientes',
      colgroup: `
        <colgroup>
          <col class="mora-col-cliente">
          <col class="mora-col-sucursal">
          <col class="mora-col-documento">
          <col class="mora-col-fecha">
          <col class="mora-col-fecha">
          <col class="mora-col-mora">
          <col class="mora-col-saldo">
          <col class="mora-col-estado">
          <col class="mora-col-historial">
        </colgroup>
      `,
      headers: `
        <th>Cliente</th>
        <th>Sucursal</th>
        <th>Documento</th>
        <th>Origen</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th>Ver</th>
      `,
      rows
    });
  }

  function renderProveedoresMoraCompactTable(items) {
    const rows = items.map((item) => {
      const searchable = normalizeNameForCompare(`${item.proveedor} ${item.documento} ${item.fechaOrigen} ${item.fechaVencimiento} ${item.estado} ${item.rango}`);
      return `
        <tr class="compact-record-row mora-compact-row" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
          <td class="mora-compact-text"><span title="${escapeHtml(item.proveedor)}">${escapeHtml(item.proveedor)}</span></td>
          <td class="mora-compact-doc"><span title="${escapeHtml(item.documento)}">${escapeHtml(item.documento)}</span></td>
          <td class="mora-compact-date"><span>${escapeHtml(formatDate(item.fechaOrigen))}</span></td>
          <td class="mora-compact-date"><span>${escapeHtml(formatDate(item.fechaVencimiento))}</span></td>
          <td class="mora-compact-mora"><span>${escapeHtml(formatPeriodoMoraLabel(item.diasMora))}</span></td>
          <td class="amount-cell mora-compact-amount"><span>${escapeHtml(formatMoney(item.saldoPendiente))}</span></td>
          <td class="mora-compact-state"><span class="state-pill ${getEstadoClass(item.estado)}">${escapeHtml(item.estado)}</span></td>
          <td class="mora-compact-actions"><div class="compact-row-actions"><button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(item.id)}">Ver</button></div></td>
        </tr>
      `;
    }).join('');

    return renderOperationalTableShell({
      shellClass: 'mora-compact-scroll-shell mora-proveedores-scroll-shell',
      wrapClass: 'mora-compact-table-wrap',
      ariaLabel: 'Proveedores en mora con saldo pendiente',
      tableClass: 'mora-compact-table mora-compact-table-proveedores',
      colgroup: `
        <colgroup>
          <col class="mora-col-proveedor">
          <col class="mora-col-referencia">
          <col class="mora-col-fecha">
          <col class="mora-col-fecha">
          <col class="mora-col-mora">
          <col class="mora-col-saldo">
          <col class="mora-col-estado">
          <col class="mora-col-historial">
        </colgroup>
      `,
      headers: `
        <th>Proveedor</th>
        <th>Referencia</th>
        <th>Origen</th>
        <th>Vence</th>
        <th>Mora</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th>Ver</th>
      `,
      rows
    });
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

  function renderHistorialDocumentosCompact(summary, selectedHistory) {
    const ventasMarkup = summary.ventas.length
      ? renderHistorialVentasCompactTable(summary.ventas, selectedHistory)
      : renderMoraEmptyState('No hay documentos de clientes.', 'Cuando registres ventas, cada documento tendrá su trazabilidad.');
    const comprasMarkup = summary.compras.length
      ? renderHistorialComprasCompactTable(summary.compras, selectedHistory)
      : renderMoraEmptyState('No hay documentos de proveedores.', 'Cuando registres proveedores/compras, cada referencia tendrá su trazabilidad.');

    return `
      <div class="historial-compact-grid">
        <article class="historial-compact-card">
          <div class="section-title-row compact-title-row">
            <div>
              <span class="eyebrow mini">Clientes</span>
              <h3>Documentos</h3>
            </div>
            <div class="count-pill">${summary.ventas.length} registros</div>
          </div>
          ${ventasMarkup}
        </article>
        <article class="historial-compact-card">
          <div class="section-title-row compact-title-row">
            <div>
              <span class="eyebrow mini">Proveedores</span>
              <h3>Referencias</h3>
            </div>
            <div class="count-pill">${summary.compras.length} registros</div>
          </div>
          ${comprasMarkup}
        </article>
      </div>
    `;
  }

  function renderHistorialVentasCompactTable(items, selectedHistory) {
    const rows = items.map((venta) => {
      const cliente = getCatalogRecordById('clientes', venta.clienteId);
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      const clienteNombre = cliente?.nombre || 'Cliente no encontrado';
      const documento = venta.numeroDocumento || 'Sin número';
      const searchable = normalizeNameForCompare(`${documento} ${clienteNombre} ${sucursal?.nombre || ''} ${venta.fechaOc} ${venta.fechaVencimiento} ${venta.saldoPorCobrar} ${venta.estado}`);
      return `
        <tr class="compact-record-row historial-compact-row" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
          <td class="historial-compact-text"><span title="${escapeHtml(clienteNombre)}">${escapeHtml(clienteNombre)}</span></td>
          <td class="historial-compact-doc"><span title="${escapeHtml(documento)}">${escapeHtml(documento)}</span></td>
          <td class="historial-compact-date"><span>${escapeHtml(formatDate(venta.fechaOc))}</span></td>
          <td class="historial-compact-date"><span>${escapeHtml(formatDate(venta.fechaVencimiento))}</span></td>
          <td class="amount-cell historial-compact-amount"><span>${escapeHtml(formatMoney(venta.saldoPorCobrar))}</span></td>
          <td class="historial-compact-state"><span class="state-pill ${getEstadoClass(venta.estado)}">${escapeHtml(venta.estado)}</span></td>
          <td class="historial-compact-actions"><div class="compact-row-actions"><button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(venta.id)}">Ver</button></div></td>
        </tr>
        ${moraState.selectedKind === 'venta' && moraState.selectedId === venta.id && selectedHistory ? renderHistorialInlineDetailRow(selectedHistory, searchable) : ''}
      `;
    }).join('');

    return renderOperationalTableShell({
      shellClass: 'historial-compact-scroll-shell historial-clientes-scroll-shell',
      wrapClass: 'historial-compact-table-wrap',
      ariaLabel: 'Historial compacto de documentos de clientes',
      tableClass: 'historial-compact-table historial-compact-table-clientes',
      colgroup: `
        <colgroup>
          <col class="historial-col-cliente">
          <col class="historial-col-documento">
          <col class="historial-col-fecha">
          <col class="historial-col-fecha">
          <col class="historial-col-saldo">
          <col class="historial-col-estado">
          <col class="historial-col-ver">
        </colgroup>
      `,
      headers: `
        <th>Cliente</th>
        <th>Documento</th>
        <th>Origen</th>
        <th>Vence</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th>Ver</th>
      `,
      rows
    });
  }

  function renderHistorialComprasCompactTable(items, selectedHistory) {
    const rows = items.map((compra) => {
      const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
      const proveedorNombre = proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado';
      const referencia = compra.facturaReferencia || 'Sin referencia';
      const searchable = normalizeNameForCompare(`${referencia} ${proveedorNombre} ${compra.fechaCompra} ${compra.fechaVencimiento} ${compra.saldoPorPagar} ${compra.estado}`);
      return `
        <tr class="compact-record-row historial-compact-row" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
          <td class="historial-compact-text"><span title="${escapeHtml(proveedorNombre)}">${escapeHtml(proveedorNombre)}</span></td>
          <td class="historial-compact-doc"><span title="${escapeHtml(referencia)}">${escapeHtml(referencia)}</span></td>
          <td class="historial-compact-date"><span>${escapeHtml(formatDate(compra.fechaCompra))}</span></td>
          <td class="historial-compact-date"><span>${escapeHtml(formatDate(compra.fechaVencimiento))}</span></td>
          <td class="amount-cell historial-compact-amount"><span>${escapeHtml(formatMoney(compra.saldoPorPagar))}</span></td>
          <td class="historial-compact-state"><span class="state-pill ${getEstadoClass(compra.estado)}">${escapeHtml(compra.estado)}</span></td>
          <td class="historial-compact-actions"><div class="compact-row-actions"><button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(compra.id)}">Ver</button></div></td>
        </tr>
        ${moraState.selectedKind === 'compra' && moraState.selectedId === compra.id && selectedHistory ? renderHistorialInlineDetailRow(selectedHistory, searchable) : ''}
      `;
    }).join('');

    return renderOperationalTableShell({
      shellClass: 'historial-compact-scroll-shell historial-proveedores-scroll-shell',
      wrapClass: 'historial-compact-table-wrap',
      ariaLabel: 'Historial compacto de referencias de proveedores',
      tableClass: 'historial-compact-table historial-compact-table-proveedores',
      colgroup: `
        <colgroup>
          <col class="historial-col-proveedor">
          <col class="historial-col-referencia">
          <col class="historial-col-fecha">
          <col class="historial-col-fecha">
          <col class="historial-col-saldo">
          <col class="historial-col-estado">
          <col class="historial-col-ver">
        </colgroup>
      `,
      headers: `
        <th>Proveedor</th>
        <th>Referencia</th>
        <th>Origen</th>
        <th>Vence</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th>Ver</th>
      `,
      rows
    });
  }

  function renderHistorialInlineDetailRow(history, searchable = '') {
    return `
      <tr class="historial-detail-row" data-mora-search-card data-search-text="${escapeHtml(searchable)}">
        <td colspan="7">${renderSelectedHistoryPanel(history)}</td>
      </tr>
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
            <span class="eyebrow mini">OC</span>
            <h3>${escapeHtml(venta.numeroDocumento || 'Sin número')}</h3>
          </div>
          <span class="state-pill ${getEstadoClass(venta.estado)}">${escapeHtml(venta.estado)}</span>
        </div>
        <div class="mora-detail-grid compact-grid">
          <div><span>Cliente</span><strong>${escapeHtml(cliente?.nombre || 'Cliente no encontrado')}</strong></div>
          <div><span>Sucursal</span><strong>${escapeHtml(sucursal?.nombre || 'Sucursal no encontrada')}</strong></div>
          <div><span>Subtotal</span><strong>${escapeHtml(formatMoney(venta.subtotal))}</strong></div>
          <div><span>Descuento</span><strong>${escapeHtml(formatMoney(venta.descuento))}</strong></div>
          <div><span>Total</span><strong>${escapeHtml(formatMoney(venta.ventaNetaOriginal))}</strong></div>
          <div><span>Ajustes</span><strong>${venta.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(venta.totalAjustes))}</strong></div>
          <div><span>Cobrado</span><strong>${escapeHtml(formatMoney(venta.totalCobrado))}</strong></div>
          <div><span>Saldo actual</span><strong>${escapeHtml(formatMoney(venta.saldoPorCobrar))}</strong></div>
          <div><span>Facturas</span><strong>${normalizeFacturasVentaList(venta.facturas).length}</strong></div>
        </div>
        ${renderFacturasVentaDisplay(venta.facturas)}
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
            <span class="eyebrow mini">Referencia</span>
            <h3>${escapeHtml(compra.facturaReferencia || 'Sin referencia')}</h3>
          </div>
          <span class="state-pill ${getEstadoClass(compra.estado)}">${escapeHtml(compra.estado)}</span>
        </div>
        <div class="mora-detail-grid compact-grid">
          <div><span>Proveedor</span><strong>${escapeHtml(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado')}</strong></div>
          <div><span>Original</span><strong>${escapeHtml(formatMoney(compra.totalCompra))}</strong></div>
          <div><span>Ajustes</span><strong>${compra.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(compra.totalAjustes))}</strong></div>
          <div><span>Ajustado</span><strong>${escapeHtml(formatMoney(compra.totalAjustado))}</strong></div>
          <div><span>Pagado</span><strong>${escapeHtml(formatMoney(compra.totalPagado))}</strong></div>
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
          <button type="button" class="secondary-action compact" data-history-clear>Cerrar</button>
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
          { label: 'Subtotal', value: formatMoney(venta.subtotal) },
          { label: 'Descuento', value: formatMoney(venta.descuento) },
          { label: 'Total', value: formatMoney(venta.ventaNetaOriginal) },
          { label: 'Ajustes / notas', value: `-${formatMoney(venta.totalAjustes)}` },
          { label: 'Total cobrado', value: formatMoney(venta.totalCobrado) },
          { label: 'Saldo actual', value: formatMoney(venta.saldoPorCobrar) },
          { label: 'Facturas', value: formatFacturasVentaResumen(venta.facturas) }
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
        { label: 'Original', value: formatMoney(compra.totalCompra) },
        { label: 'Ajustes / notas', value: `-${formatMoney(compra.totalAjustes)}` },
        { label: 'Ajustado', value: formatMoney(compra.totalAjustado) },
        { label: 'Pagado', value: formatMoney(compra.totalPagado) },
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
        detail: `Subtotal ${formatMoney(venta.subtotal)}. Descuento ${formatMoney(venta.descuento)}. Total ${formatMoney(venta.ventaNetaOriginal)}. Vence el ${formatDate(venta.fechaVencimiento)}.`,
        statusClass: 'is-info'
      }
    ];
    const facturasVenta = normalizeFacturasVentaList(venta.facturas);
    if (facturasVenta.length) {
      entries.push({
        date: formatDate(venta.fechaOc),
        title: 'Facturas registradas',
        detail: formatFacturasVentaResumen(facturasVenta),
        statusClass: 'is-info'
      });
    }
    if (venta.updatedAt && venta.updatedAt !== venta.createdAt) {
      entries.push({
        date: formatDateTime(venta.updatedAt),
        title: 'OC editada / recalculada',
        detail: `Estado actual ${venta.estado}. Saldo por cobrar ${formatMoney(venta.saldoPorCobrar)}.`,
        statusClass: 'is-info'
      });
    }
    normalizeVentaAjustesList(venta.ajustes)
      .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((ajuste) => {
        entries.push({
          date: formatDate(ajuste.fecha),
          title: ajuste.activo ? `Ajuste aplicado · ${ajuste.tipo}` : `Ajuste anulado · ${ajuste.tipo}`,
          detail: `${formatMoney(ajuste.monto)}${ajuste.observacion ? ` · ${ajuste.observacion}` : ''}`,
          statusClass: ajuste.activo ? 'is-partial' : 'is-danger'
        });
      });
    getCobrosByVentaId(venta.id)
      .sort((a, b) => String(a.fechaCobro).localeCompare(String(b.fechaCobro)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((cobro) => {
        entries.push({
          date: formatDate(cobro.fechaCobro),
          title: cobro.activo ? 'Cobro aplicado' : 'Cobro anulado',
          detail: `${formatMoney(cobro.montoCobrado)} · ${cobro.metodoPagoNombre || 'Sin método'} · ${cobro.cuentaBancoNombre || 'Sin banco'}${cobro.observacion ? ` · ${cobro.observacion}` : ''}`,
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
        title: 'Referencia creada',
        detail: `Original ${formatMoney(compra.totalCompra)}. Ajustado ${formatMoney(compra.totalAjustado)}. Vence el ${formatDate(compra.fechaVencimiento)}.`,
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
    normalizeCompraProveedorAjustesList(compra.ajustes)
      .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((ajuste) => {
        entries.push({
          date: formatDate(ajuste.fecha),
          title: ajuste.activo ? `Ajuste aplicado · ${ajuste.tipo}` : `Ajuste anulado · ${ajuste.tipo}`,
          detail: `${formatMoney(ajuste.monto)}${ajuste.observacion ? ` · ${ajuste.observacion}` : ''}`,
          statusClass: ajuste.activo ? 'is-partial' : 'is-danger'
        });
      });
    getPagosByCompraId(compra.id)
      .sort((a, b) => String(a.fechaPago).localeCompare(String(b.fechaPago)) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((pago) => {
        entries.push({
          date: formatDate(pago.fechaPago),
          title: pago.activo ? 'Pago aplicado' : 'Pago anulado',
          detail: `${formatMoney(pago.montoPagado)} · ${pago.metodoPagoNombre || 'Sin método'} · ${pago.cuentaBancoNombre || 'Sin banco'}${pago.observacion ? ` · ${pago.observacion}` : ''}`,
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
    if (getRoute() === 'mora') {
      renderRoute({ preserveScroll: true });
      return;
    }
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


  function normalizeBdatosRecord(record) {
    const raw = isPlainObject(record) ? record : {};
    const timestamp = nowIso();
    const parsedPrice = parseMoney(raw.precio);
    return {
      id: cleanText(raw.id) || generateId('bd'),
      codigo: cleanText(raw.codigo || raw.Codigo || raw.código || raw.Código),
      descripcion: cleanText(raw.descripcion || raw.Descripcion || raw.descripción || raw.Descripción),
      precio: Number.isFinite(parsedPrice) ? roundMoney(parsedPrice) : 0,
      createdAt: cleanText(raw.createdAt) || cleanText(raw.fechaCreacion) || timestamp,
      updatedAt: cleanText(raw.updatedAt) || cleanText(raw.fechaActualizacion) || cleanText(raw.createdAt) || timestamp
    };
  }

  function sortBdatosRecords(records) {
    return (Array.isArray(records) ? records : [])
      .map((record) => normalizeBdatosRecord(record))
      .sort((a, b) => a.descripcion.localeCompare(b.descripcion, 'es', { sensitivity: 'base' }) || a.codigo.localeCompare(b.codigo, 'es', { sensitivity: 'base' }));
  }

  function normalizeBdatosList(records) {
    return sortBdatosRecords(records).filter((record) => record.codigo || record.descripcion);
  }

  function getInitialBdatosSeedId(codigo, index = 0) {
    const safeCode = cleanText(codigo)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `bd-jcg-${safeCode || (index + 1)}`;
  }

  function buildInitialBdatosRecords(timestamp = BDATOS_INITIAL_UPDATED_AT) {
    return sortBdatosRecords(BDATOS_INITIAL_ARTICLES.map((record, index) => normalizeBdatosRecord({
      id: getInitialBdatosSeedId(record.codigo, index),
      codigo: record.codigo,
      descripcion: record.descripcion,
      precio: record.precio,
      createdAt: timestamp,
      updatedAt: timestamp
    })));
  }

  function getBdatosRecords() {
    appData.bdatos = normalizeBdatosList(appData.bdatos);
    return appData.bdatos;
  }

  function getBdatosSearchQuery() {
    return normalizeKeyForCompare(bdatosState.search || '');
  }

  function getFilteredBdatosRecords(records = getBdatosRecords()) {
    const query = getBdatosSearchQuery();
    if (!query) return sortBdatosRecords(records);
    return sortBdatosRecords(records).filter((record) => {
      const haystack = `${normalizeKeyForCompare(record.codigo)} ${normalizeKeyForCompare(record.descripcion)}`;
      return haystack.includes(query);
    });
  }

  function getBdatosLastUpdatedLabel() {
    return formatDateTimeOrText(appData.bdatosUpdatedAt, 'Sin actualizaciones');
  }

  function renderBdatos() {
    const allRecords = getBdatosRecords();
    const filteredRecords = getFilteredBdatosRecords(allRecords);
    const editingRecord = bdatosState.editingId ? allRecords.find((record) => record.id === bdatosState.editingId) : null;

    return `
      <section class="hero bdatos-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Bdatos</h1>
          <p class="lead">Base informativa de artículos. Código, descripción y precio: directo al grano, sin meter la cuchara en ventas, compras ni cálculos.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de Bdatos">
          <h3>Resumen</h3>
          <div class="status-grid">
            <div class="status-item"><strong>Artículos</strong><span>${allRecords.length}</span></div>
            <div class="status-item"><strong>Filtrados</strong><span data-bdatos-visible-count>${filteredRecords.length}</span></div>
            <div class="status-item wide"><strong>Última actualización</strong><span>${escapeHtml(getBdatosLastUpdatedLabel())}</span></div>
          </div>
        </aside>
      </section>

      <section class="bdatos-shell">
        ${bdatosState.message ? `<div class="form-message ${bdatosState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(bdatosState.message)}</div>` : ''}

        <div class="bdatos-layout">
          <article class="panel-card bdatos-form-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Nuevo artículo</span>
                <h2>Agregar artículo</h2>
              </div>
            </div>
            <p class="muted-text">Este formulario solo crea artículos nuevos. La edición se hace en ventana modal para evitar cruces raros.</p>
            ${renderBdatosForm(null, 'create')}
          </article>

          <article class="panel-card bdatos-search-card">
            <label class="form-field bdatos-search-field">
              <span>Buscar</span>
              <input type="search" value="${escapeHtml(bdatosState.search || '')}" placeholder="Buscar por código o descripción..." autocomplete="off" data-bdatos-search />
            </label>
          </article>

          <article class="panel-card bdatos-list-card">
            <div class="section-title-row">
              <div>
                <span class="eyebrow mini">Listado</span>
                <h2>Artículos</h2>
              </div>
              <div class="count-pill"><span data-bdatos-visible-count>${filteredRecords.length}</span> / ${allRecords.length} registros</div>
            </div>
            ${renderBdatosList(filteredRecords, allRecords.length)}
          </article>
        </div>
        ${editingRecord ? renderEditModal(getBdatosModalId(), 'Editar artículo', 'Modifica Código, Descripción y Precio sin usar el formulario de ingreso.', renderBdatosForm(editingRecord, 'edit')) : ''}
      </section>
    `;
  }

  function renderBdatosForm(record, mode = 'create') {
    const isEdit = mode === 'edit';
    return `
      <form class="catalog-form bdatos-form" ${isEdit ? 'data-bdatos-edit-form' : 'data-bdatos-create-form'} novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <label class="form-field">
          <span>Código <span class="required-dot" aria-label="obligatorio">*</span></span>
          <input type="text" name="codigo" value="${escapeHtml(record?.codigo || '')}" placeholder="Ej. ART-001" required autocomplete="off" />
        </label>
        <label class="form-field">
          <span>Descripción <span class="required-dot" aria-label="obligatorio">*</span></span>
          <input type="text" name="descripcion" value="${escapeHtml(record?.descripcion || '')}" placeholder="Descripción del artículo" required autocomplete="off" />
        </label>
        <label class="form-field">
          <span>Precio <span class="required-dot" aria-label="obligatorio">*</span></span>
          <input type="number" name="precio" value="${escapeHtml(record ? String(roundMoney(record.precio)) : '')}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required autocomplete="off" />
        </label>
        <div class="form-actions">
          <button type="submit" class="card-action">${isEdit ? 'Guardar cambios' : 'Agregar artículo'}</button>
          <button type="button" class="secondary-action" ${isEdit ? 'data-bdatos-edit-cancel' : 'data-bdatos-clear'}>${isEdit ? 'Cancelar' : 'Limpiar'}</button>
        </div>
      </form>
    `;
  }

  function renderBdatosList(records, totalCount) {
    if (!totalCount) {
      return `
        <div class="empty-state">
          <strong>No hay artículos todavía.</strong>
          <p>Agrega el primer artículo con Código, Descripción y Precio.</p>
        </div>
      `;
    }

    if (!records.length) {
      return `
        <div class="empty-state" data-bdatos-empty-filter>
          <strong>No hay coincidencias.</strong>
          <p>Prueba con otro código o descripción. La búsqueda filtra, no borra datos.</p>
        </div>
      `;
    }

    const rows = records.map((record) => renderBdatosRow(record)).join('');
    return renderOperationalTableShell({
      shellClass: 'bdatos-scroll-shell',
      wrapClass: 'bdatos-table-wrap',
      ariaLabel: 'Listado de artículos de Bdatos',
      tableClass: 'operational-table-bdatos',
      colgroup: `
        <colgroup>
          <col class="bdatos-col-codigo">
          <col class="bdatos-col-descripcion">
          <col class="bdatos-col-precio">
          <col class="bdatos-col-acciones">
        </colgroup>
      `,
      headers: `
        <th>Código</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Acciones</th>
      `,
      rows
    });
  }

  function renderBdatosRow(record) {
    const searchText = `${normalizeKeyForCompare(record.codigo)} ${normalizeKeyForCompare(record.descripcion)}`;
    return `
      <tr class="compact-record-row" data-bdatos-row data-bdatos-search-text="${escapeHtml(searchText)}">
        <td><span class="compact-primary">${escapeHtml(record.codigo || '—')}</span></td>
        <td><span>${escapeHtml(record.descripcion || '—')}</span></td>
        <td class="amount-cell"><span>${escapeHtml(formatMoney(record.precio))}</span></td>
        <td class="actions-cell">
          <div class="record-actions compact-row-actions">
            <button type="button" class="secondary-action compact bdatos-icon-action" data-bdatos-copy="${escapeHtml(record.id)}" aria-label="Copiar artículo" title="Copiar artículo"><span aria-hidden="true">📋</span></button>
            <button type="button" class="secondary-action compact bdatos-icon-action" data-bdatos-edit="${escapeHtml(record.id)}" aria-label="Editar artículo" title="Editar artículo"><span aria-hidden="true">✏️</span></button>
            <button type="button" class="danger-action compact bdatos-icon-action" data-bdatos-delete="${escapeHtml(record.id)}" aria-label="Borrar artículo" title="Borrar artículo"><span aria-hidden="true">🗑️</span></button>
          </div>
        </td>
      </tr>
    `;
  }

  function readBdatosForm(form) {
    const formData = new FormData(form);
    const precioRaw = cleanText(formData.get('precio'));
    return {
      id: cleanText(formData.get('id')),
      codigo: cleanText(formData.get('codigo')),
      descripcion: cleanText(formData.get('descripcion')),
      precioRaw,
      precio: parseMoney(precioRaw)
    };
  }

  function validateBdatosPayload(payload, currentId = '') {
    if (!payload.codigo) return 'Código es obligatorio.';
    if (!payload.descripcion) return 'Descripción es obligatoria.';
    if (!payload.precioRaw) return 'Precio es obligatorio.';
    if (!Number.isFinite(payload.precio) || payload.precio < 0) return 'Precio debe ser un número válido.';
    const duplicate = getBdatosRecords().find((record) => record.id !== currentId && cleanText(record.codigo) === payload.codigo);
    if (duplicate) return `Ya existe un artículo con el código “${payload.codigo}”.`;
    return '';
  }

  function saveBdatosCreate(form) {
    const payload = readBdatosForm(form);
    const validationError = validateBdatosPayload(payload);
    if (validationError) {
      bdatosState.message = validationError;
      bdatosState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    const timestamp = nowIso();
    const record = normalizeBdatosRecord({
      id: generateId('bd'),
      codigo: payload.codigo,
      descripcion: payload.descripcion,
      precio: payload.precio,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    appData.bdatos = sortBdatosRecords([record, ...getBdatosRecords()]);
    appData.bdatosUpdatedAt = timestamp;
    bdatosState.editingId = null;
    bdatosState.message = `Artículo “${record.descripcion}” agregado.`;
    bdatosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Bdatos',
      action: 'Agregado',
      entityType: 'Artículo',
      entityRef: record.codigo,
      amount: record.precio,
      detail: buildActivityDetail(['Artículo agregado', record.codigo, record.descripcion, formatMoney(record.precio)]),
      source: 'local'
    });
    renderRoute({ preserveScroll: true });
  }

  function saveBdatosEdit(form) {
    const payload = readBdatosForm(form);
    const currentId = payload.id || bdatosState.editingId;
    const existing = getBdatosRecords().find((record) => record.id === currentId);
    if (!existing) {
      bdatosState.message = 'No se encontró el artículo para editar.';
      bdatosState.messageType = 'error';
      bdatosState.editingId = null;
      renderRoute({ preserveScroll: true });
      return;
    }

    const validationError = validateBdatosPayload(payload, currentId);
    if (validationError) {
      bdatosState.message = validationError;
      bdatosState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    const timestamp = nowIso();
    const updated = normalizeBdatosRecord({
      ...existing,
      codigo: payload.codigo,
      descripcion: payload.descripcion,
      precio: payload.precio,
      updatedAt: timestamp
    });
    appData.bdatos = sortBdatosRecords(getBdatosRecords().map((record) => record.id === currentId ? updated : record));
    appData.bdatosUpdatedAt = timestamp;
    bdatosState.editingId = null;
    bdatosState.message = `Artículo “${updated.descripcion}” actualizado.`;
    bdatosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Bdatos',
      action: 'Actualizado',
      entityType: 'Artículo',
      entityRef: updated.codigo,
      amount: updated.precio,
      detail: buildActivityDetail(['Artículo actualizado', updated.codigo, updated.descripcion, formatMoney(updated.precio)]),
      source: 'local'
    });
    renderRoute({ preserveScroll: true });
  }

  function editBdatosRecord(recordId) {
    const record = getBdatosRecords().find((item) => item.id === recordId);
    if (!record) return;
    bdatosState.editingId = record.id;
    bdatosState.message = null;
    renderRoute({ preserveScroll: true });
  }

  function deleteBdatosRecord(recordId) {
    const record = getBdatosRecords().find((item) => item.id === recordId);
    if (!record) return;
    const ok = window.confirm(`Vas a borrar el artículo ${record.codigo} — ${record.descripcion}. Esta acción no toca ventas, compras ni cálculos. ¿Continuar?`);
    if (!ok) return;

    const timestamp = nowIso();
    appData.bdatos = sortBdatosRecords(getBdatosRecords().filter((item) => item.id !== recordId));
    appData.bdatosUpdatedAt = timestamp;
    bdatosState.editingId = null;
    bdatosState.message = `Artículo “${record.descripcion}” borrado.`;
    bdatosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Bdatos',
      action: 'Borrado',
      entityType: 'Artículo',
      entityRef: record.codigo,
      amount: record.precio,
      detail: buildActivityDetail(['Artículo borrado', record.codigo, record.descripcion]),
      source: 'local'
    });
    renderRoute({ preserveScroll: true });
  }

  function fallbackCopyTextToClipboard(text) {
    const activeElement = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    try {
      textarea.focus({ preventScroll: true });
    } catch (error) {
      textarea.focus();
    }
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    } finally {
      document.body.removeChild(textarea);
      if (activeElement && typeof activeElement.focus === 'function') {
        try {
          activeElement.focus({ preventScroll: true });
        } catch (error) {
          activeElement.focus();
        }
      }
    }
    return copied;
  }

  async function copyTextToClipboard(text) {
    if (!text) return false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Se intenta fallback abajo para Safari/iPad/PWA sin ensuciar consola.
      }
    }
    return fallbackCopyTextToClipboard(text);
  }

  async function copyBdatosRecord(recordId) {
    const record = getBdatosRecords().find((item) => item.id === recordId);
    if (!record) {
      bdatosState.message = 'No se pudo copiar';
      bdatosState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    const codigo = cleanText(record.codigo);
    const descripcion = cleanText(record.descripcion);
    const copyText = `${codigo} - ${descripcion}`;
    const copied = await copyTextToClipboard(copyText);
    bdatosState.message = copied ? 'Copiado' : 'No se pudo copiar';
    bdatosState.messageType = copied ? 'success' : 'error';
    renderRoute({ preserveScroll: true });
  }

  function clearBdatosCreateForm() {
    bdatosState.message = null;
    renderRoute({ preserveScroll: true });
  }

  function clearBdatosEdit() {
    bdatosState.editingId = null;
    bdatosState.message = null;
    renderRoute({ preserveScroll: true });
  }

  function setupBdatosSearch() {
    const search = viewRoot.querySelector('[data-bdatos-search]');
    if (!search) return;
    const applyFilter = () => {
      const query = normalizeKeyForCompare(search.value);
      bdatosState.search = search.value;
      let visible = 0;
      viewRoot.querySelectorAll('[data-bdatos-row]').forEach((row) => {
        const text = row.getAttribute('data-bdatos-search-text') || '';
        const shouldShow = !query || text.includes(query);
        row.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });
      viewRoot.querySelectorAll('[data-bdatos-visible-count]').forEach((item) => { item.textContent = String(visible); });
    };
    search.addEventListener('input', applyFilter);
    applyFilter();
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
          <p class="lead">Administra las listas maestras de KSA PRÁCTIKA. Aquí se ordena la bodega mental: clientes, sucursales, proveedores, gastos, métodos y bancos.</p>
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
                <span class="eyebrow mini">Nuevo registro</span>
                <h2>Agregar ${activeCatalog.singular}</h2>
              </div>
            </div>
            <p class="muted-text">${escapeHtml(activeCatalog.description)}</p>
            ${renderCatalogForm(activeCatalog, null, !canEditCatalogs)}
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
        ${editingRecord ? renderEditModal(getCatalogModalId(), `Editar ${activeCatalog.singular}`, 'Modifica el registro sin usar el formulario de alta.', renderCatalogForm(activeCatalog, editingRecord, !canEditCatalogs)) : ''}
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
          <button type="button" class="secondary-action" data-catalog-clear>${record ? 'Cancelar' : 'Limpiar'}</button>
        </div>
      </form>
    `;
  }

  function renderCatalogField(field, record, disabled = false) {
    const value = record?.[field.name] ?? '';
    const requiredLabel = field.required ? '<span class="required-dot" aria-label="obligatorio">*</span>' : '';

    if (field.type === 'checkbox') {
      const checked = normalizeBooleanField(value, false);
      return `
        <label class="checkbox-field catalog-checkbox">
          <input type="checkbox" name="${escapeHtml(field.name)}" value="1" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          ${field.help ? `<small>${escapeHtml(field.help)}</small>` : ''}
        </label>
      `;
    }

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
      const paymentConditionAttr = field.name === 'condicionPago' ? 'data-catalog-payment-condition' : '';
      const options = Array.isArray(field.options) ? field.options : [];
      const hasValidValue = options.includes(value);
      const placeholderOption = field.placeholder
        ? `<option value="" ${hasValidValue ? '' : 'selected'}>${escapeHtml(field.placeholder)}</option>`
        : '';
      return `
        <label class="form-field">
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          <select name="${escapeHtml(field.name)}" ${field.required ? 'required' : ''} ${disabled ? 'disabled' : ''} ${paymentConditionAttr}>
            ${placeholderOption}
            ${options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
          </select>
        </label>
      `;
    }

    if (field.type === 'number') {
      const safeValue = value === '' || value === null || value === undefined ? '' : value;
      const isCreditDaysField = field.name === 'diasCredito';
      const shouldDisableDays = isCreditDaysField && normalizePaymentCondition(record?.condicionPago) !== 'Crédito';
      return `
        <label class="form-field">
          <span>${escapeHtml(field.label)} ${requiredLabel}</span>
          <input type="number" name="${escapeHtml(field.name)}" value="${escapeHtml(safeValue)}" min="${escapeHtml(field.min ?? 0)}" step="${escapeHtml(field.step || 1)}" inputmode="${escapeHtml(field.inputmode || 'numeric')}" placeholder="${escapeHtml(field.placeholder || '')}" ${field.required ? 'required' : ''} autocomplete="off" ${(disabled || shouldDisableDays) ? 'disabled' : ''} ${isCreditDaysField ? 'data-catalog-credit-days' : ''} />
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

    const showType = shouldShowCatalogTypeColumn(catalog, records);
    const rows = records.map((record) => renderCatalogRecord(catalog, record, showType)).join('');

    return renderOperationalTableShell({
      shellClass: `catalog-compact-scroll-shell ${showType ? 'catalog-compact-with-type' : 'catalog-compact-basic'}`,
      wrapClass: 'catalog-compact-table-wrap',
      ariaLabel: `Listado compacto de ${catalog.label}`,
      tableClass: `catalog-compact-table ${showType ? 'catalog-compact-table-type' : 'catalog-compact-table-basic'}`,
      colgroup: `
        <colgroup>
          <col class="catalog-col-nombre">
          ${showType ? '<col class="catalog-col-tipo">' : ''}
          <col class="catalog-col-estado">
          <col class="catalog-col-editar">
        </colgroup>
      `,
      headers: `
        <th>Nombre</th>
        ${showType ? '<th>Tipo</th>' : ''}
        <th>Estado</th>
        <th>Editar</th>
      `,
      rows
    });
  }

  function shouldShowCatalogTypeColumn(catalog, records) {
    return catalog.fields.some((field) => field.name === 'tipo') || records.some((record) => cleanText(record.tipo));
  }

  function renderCatalogRecord(catalog, record, showType = false) {
    const secondary = getCatalogCompactSecondaryText(catalog, record);
    const canEdit = canCurrentRole('editCatalogs');
    const toggleLabel = record.activo
      ? (isSafeDeleteCatalog(catalog.id) ? 'Borrar seguro' : 'Desactivar')
      : (isSafeDeleteCatalog(catalog.id) ? 'Restaurar' : 'Activar');
    return `
      <tr class="compact-record-row catalog-compact-row ${record.activo ? 'is-active' : 'is-inactive'}">
        <td class="catalog-compact-name">
          <span title="${escapeHtml(record.nombre || 'Sin nombre')}">${escapeHtml(record.nombre || 'Sin nombre')}</span>
          ${secondary ? `<small title="${escapeHtml(secondary)}">${escapeHtml(secondary)}</small>` : ''}
          ${record.observacion ? `<small class="catalog-compact-note" title="${escapeHtml(record.observacion)}">${escapeHtml(record.observacion)}</small>` : ''}
        </td>
        ${showType ? `<td class="catalog-compact-type"><span title="${escapeHtml(getCatalogCompactTypeText(record))}">${escapeHtml(getCatalogCompactTypeText(record))}</span></td>` : ''}
        <td class="catalog-compact-state"><span class="state-pill ${record.activo ? 'is-active' : 'is-inactive'}">${record.activo ? 'Activo' : 'Inactivo'}</span></td>
        <td class="catalog-compact-actions">
          <div class="record-actions compact-row-actions">
            ${canEdit ? `<button type="button" class="secondary-action compact" data-catalog-edit="${escapeHtml(record.id)}">Editar</button>` : '<span class="muted-text compact-note">Lectura</span>'}
            ${canEdit ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-catalog-toggle="${escapeHtml(record.id)}">${escapeHtml(toggleLabel)}</button>` : ''}
          </div>
        </td>
      </tr>
    `;
  }

  function getCatalogCompactTypeText(record) {
    return cleanText(record.tipo) || '—';
  }

  function getCatalogCompactSecondaryText(catalog, record) {
    if (catalog.id === 'cuentasBancos') return '';
    return getRecordSecondaryText(catalog, record);
  }

  function renderEditModal(modalId, title, subtitle, bodyHtml) {
    if (!bodyHtml) return '';
    return `
      <div class="modal-backdrop" data-modal-backdrop="${escapeHtml(modalId)}" role="presentation">
        <section class="edit-modal" role="dialog" aria-modal="true" aria-labelledby="${escapeHtml(modalId)}-title">
          <header class="edit-modal-header">
            <div>
              <span class="eyebrow mini">Ventana de edición</span>
              <h2 id="${escapeHtml(modalId)}-title">${escapeHtml(title)}</h2>
              ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}
            </div>
            <button type="button" class="modal-close" data-modal-close="${escapeHtml(modalId)}" aria-label="Cerrar edición">×</button>
          </header>
          <div class="edit-modal-body">
            ${bodyHtml}
          </div>
        </section>
      </div>
    `;
  }

  function getCatalogModalId() { return 'catalog'; }
  function getBdatosModalId() { return 'bdatos'; }
  function getVentaModalId() { return 'venta'; }
  function getCompraModalId() { return 'compra'; }
  function getCobroModalId() { return 'cobro'; }
  function getPagoModalId() { return 'pago'; }
  function getGastoModalId() { return 'gasto'; }


  function renderVentas() {
    const ventas = getVentasOrdenadas();
    const clientesActivos = getActiveCatalogRecords('clientes');
    const sucursalesActivas = getActiveCatalogRecords('sucursales');
    const editingRecord = ventasState.editingId ? appData.ventas.find((record) => record.id === ventasState.editingId) : null;
    const totals = getVentasTotals();
    const missingCatalogs = !clientesActivos.length || !sucursalesActivas.length;
    const ventasAjustables = ventas.filter((venta) => venta.activo && venta.saldoPorCobrar > 0);

    return `
      <section class="hero ventas-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Ventas / OC</h1>
          <p class="lead">Registra órdenes de compra con Subtotal - Descuento = Total, ajustes posteriores, saldo real por cobrar y trazabilidad completa sin crear cobros falsos ni duplicar documentos.</p>
        </div>
        <aside class="hero-status" aria-label="Resumen de ventas y OC">
          <h3>Totales básicos</h3>
          <div class="status-grid">
            <div class="status-item"><strong>OC activas</strong><span>${totals.activas}</span></div>
            <div class="status-item"><strong>Tras ajustes</strong><span>${escapeHtml(formatMoney(totals.ventaNetaAjustada))}</span></div>
            <div class="status-item"><strong>Saldo cobrar</strong><span>${escapeHtml(formatMoney(totals.saldoPorCobrar))}</span></div>
            <div class="status-item"><strong>Vencidas</strong><span>${totals.vencidas}</span></div>
          </div>
        </aside>
      </section>

      <section class="ventas-shell">
        ${ventasState.message ? `<div class="form-message ${ventasState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(ventasState.message)}</div>` : ''}

        ${missingCatalogs ? renderVentasCatalogWarning(clientesActivos, sucursalesActivas) : ''}

        <section class="metric-grid" aria-label="Resumen operativo de ventas">
          <article class="metric-card"><span>Subtotal</span><strong>${escapeHtml(formatMoney(totals.subtotal))}</strong></article>
          <article class="metric-card"><span>Descuento</span><strong>${escapeHtml(formatMoney(totals.descuento))}</strong></article>
          <article class="metric-card"><span>Total</span><strong>${escapeHtml(formatMoney(totals.ventaNetaOriginal))}</strong></article>
          <article class="metric-card"><span>Ajustes aplicados</span><strong>${totals.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(totals.totalAjustes))}</strong></article>
          
          <article class="metric-card"><span>Total cobrado</span><strong>${escapeHtml(formatMoney(totals.totalCobrado))}</strong></article>
          <article class="metric-card"><span>Saldo por cobrar</span><strong>${escapeHtml(formatMoney(totals.saldoPorCobrar))}</strong></article>
          <article class="metric-card"><span>Pendientes</span><strong>${totals.pendientes}</strong></article>
          <article class="metric-card"><span>Vencidas</span><strong>${totals.vencidas}</strong></article>
          <article class="metric-card"><span>Anuladas</span><strong>${totals.anuladas}</strong></article>
        </section>

        <div class="ventas-layout">
          <div class="ventas-left-column">
            <article class="panel-card venta-form-card">
              <div class="section-title-row">
                <div>
                  <span class="eyebrow mini">Nueva OC</span>
                  <h2>Crear venta / OC</h2>
                </div>
              </div>
              <p class="muted-text">La venta se calcula como Subtotal - Descuento = Total. Los ajustes posteriores siguen ligados a la OC y no son cobros.</p>
              ${renderVentaForm(null, clientesActivos, sucursalesActivas, missingCatalogs, ventasState.quickCapture)}
            </article>
          </div>

          <div class="ventas-right-column">
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

            <article class="panel-card venta-ajuste-card">
              <div class="section-title-row">
                <div>
                  <span class="eyebrow mini">Ajustes / notas</span>
                  <h2>Registrar ajuste</h2>
                </div>
              </div>
              <p class="muted-text">Reduce el saldo de una OC existente por quebrado, faltante, devolución o nota, sin crear cobro, caja ni banco. Aquí se descuenta mercadería; no aparece dinero fantasma.</p>
              ${renderVentaAjusteForm(ventasAjustables)}
            </article>
          </div>
        </div>
        ${editingRecord ? renderEditModal(getVentaModalId(), 'Editar venta / OC', 'La edición se guarda sobre la OC actual, mantiene ajustes/notas y recalcula saldo real.', renderVentaForm(editingRecord, clientesActivos, sucursalesActivas, missingCatalogs)) : ''}
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

  function renderVentaAjusteForm(ventasAjustables) {
    const ventas = Array.isArray(ventasAjustables) ? ventasAjustables.map((record) => normalizeVentaRecord(record)).filter((record) => record.activo) : [];
    if (!ventas.length) {
      return `
        <div class="empty-state compact-empty">
          <strong>No hay OC activas para ajustar.</strong>
          <p>Primero registra una OC activa con saldo por cobrar. Ajuste sin OC es rebaja sin brújula.</p>
        </div>
      `;
    }

    const selectedVenta = ventas.find((venta) => venta.id === ventasState.selectedAjusteVentaId) || ventas[0];
    const selectedClienteId = selectedVenta?.clienteId || '';
    const clientes = Array.from(new Map(ventas.map((venta) => {
      const cliente = getCatalogRecordById('clientes', venta.clienteId);
      const label = cleanText(cliente?.nombre || venta.clienteNombre) || 'Cliente no encontrado';
      return [venta.clienteId || label, { id: venta.clienteId, nombre: label }];
    })).values()).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

    return `
      <form class="ajuste-form" data-ajuste-venta-form novalidate>
        <div class="form-grid ajuste-form-grid">
          <label class="form-field">
            <span>Cliente <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="clienteId" required data-ajuste-client>
              <option value="">Seleccionar cliente</option>
              ${clientes.map((cliente) => `<option value="${escapeHtml(cliente.id)}" ${cliente.id === selectedClienteId ? 'selected' : ''}>${escapeHtml(cliente.nombre)}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>OC <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="ventaId" required data-ajuste-venta>
              <option value="">Seleccionar OC</option>
              ${ventas.map((venta) => {
                const cliente = getCatalogRecordById('clientes', venta.clienteId);
                const label = `${cliente?.nombre || venta.clienteNombre || 'Cliente'} · ${venta.numeroDocumento || 'Sin número'} · Saldo ${formatMoney(venta.saldoPorCobrar)}`;
                return `<option value="${escapeHtml(venta.id)}" data-client-id="${escapeHtml(venta.clienteId)}" ${venta.id === selectedVenta.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
              }).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha ajuste <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fecha" value="${escapeHtml(todayInputValue())}" required />
          </label>
          <label class="form-field">
            <span>Tipo de ajuste <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="tipo" required>
              ${VENTA_AJUSTE_TYPES.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Monto ajuste C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="monto" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-ajuste-monto />
          </label>
        </div>
        <div class="formula-card ajuste-preview" aria-live="polite" data-ajuste-venta-preview>
          ${renderVentaAjustePreview(selectedVenta)}
        </div>
        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="2" placeholder="Ej. Producto llegó quebrado al cliente"></textarea>
        </label>
        <div class="form-actions">
          <button type="submit" class="card-action">Registrar ajuste</button>
        </div>
      </form>
    `;
  }

  function renderVentaAjustePreview(ventaRecord) {
    const venta = normalizeVentaRecord(ventaRecord || {});
    return `
      <strong>${escapeHtml(venta.numeroDocumento || 'OC sin número')}</strong>
      <div class="formula-grid">
        <span>Subtotal</span><b>${escapeHtml(formatMoney(venta.subtotal))}</b>
        <span>Descuento</span><b>${escapeHtml(formatMoney(venta.descuento))}</b>
        <span>Total</span><b>${escapeHtml(formatMoney(venta.ventaNetaOriginal))}</b>
        <span>Ajustes actuales</span><b>${venta.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(venta.totalAjustes))}</b>
        <span>Cobrado</span><b>${escapeHtml(formatMoney(venta.totalCobrado))}</b>
        <span>Saldo disponible</span><b>${escapeHtml(formatMoney(venta.saldoPorCobrar))}</b>
      </div>
    `;
  }

  function renderFacturasVentaBlock(record) {
    const facturas = normalizeFacturasVentaList(record?.facturas || []);
    const facturasText = formatFacturasVentaInput(facturas);
    return `
        <section class="facturas-block" data-facturas-block>
          <input type="hidden" name="facturasJson" data-facturas-json value="${escapeHtml(JSON.stringify(facturas))}" />
          <div class="facturas-head">
            <div>
              <span class="eyebrow mini">Documentos emitidos</span>
              <h3>Facturas</h3>
            </div>
            <span class="count-pill" data-facturas-count>${facturas.length} factura${facturas.length === 1 ? '' : 's'}</span>
          </div>
          <p class="muted-text compact-note">Captura varios números de factura para esta misma OC. Sin fecha, sin monto y sin artículos: la Fecha OC manda.</p>
          <label class="form-field facturas-mass-field">
            <span>Números de factura</span>
            <textarea name="facturasTexto" data-facturas-mass rows="3" placeholder="001245, 001246, 001247" autocomplete="off">${escapeHtml(facturasText)}</textarea>
          </label>
          <p class="compact-note">Separa varias facturas por coma, punto y coma o salto de línea. También acepta espacios cuando parezca una lista simple de códigos.</p>
          <div class="facturas-preview" data-facturas-preview>${facturas.length ? `Facturas detectadas: ${escapeHtml(formatFacturasVentaResumen(facturas))}` : 'Facturas detectadas: ninguna'}</div>
          <p class="compact-note facturas-message" data-factura-message aria-live="polite"></p>
        </section>
    `;
  }

  function renderFacturasVentaEditorList(facturas) {
    const source = Array.isArray(facturas) ? facturas : normalizeFacturasVentaList(facturas);
    const rows = source.map((item) => {
      const normalized = normalizeFacturaVentaRecord(item);
      if (normalized) return normalized;
      const raw = isPlainObject(item) ? item : {};
      return { id: cleanText(raw.id) || generateId('factura'), numero: '' };
    });
    const safeRows = rows.length ? rows : [{ id: generateId('factura'), numero: '' }];
    return `
      <div class="facturas-list facturas-editor-list" data-facturas-editor-list>
        ${safeRows.map((factura, index) => `
          <article class="factura-item factura-input-row" data-factura-row data-factura-id="${escapeHtml(factura.id)}">
            <label class="form-field factura-number-field">
              <span>Factura ${index + 1}</span>
              <input type="text" data-factura-numero value="${escapeHtml(factura.numero || '')}" placeholder="Número de factura" autocomplete="off" />
            </label>
            <div class="record-actions">
              <button type="button" class="danger-action compact" data-factura-remove>Quitar</button>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderFacturasVentaDisplay(facturas) {
    const list = normalizeFacturasVentaList(facturas);
    if (!list.length) {
      return '<div class="facturas-empty compact-view">Sin facturas registradas.</div>';
    }
    return `
      <div class="facturas-display-list">
        ${list.map((factura) => `
          <span class="factura-chip"><strong>${escapeHtml(factura.numero)}</strong></span>
        `).join('')}
      </div>
    `;
  }

  function renderLogisticaVentaBlock(record) {
    const requiereEnvio = Boolean(record?.requiereEnvio);
    const logistica = normalizeLogisticaVentaRecord(record?.logistica || {});
    return `
      <section class="logistica-block" data-logistica-block>
        <label class="checkbox-field logistica-toggle">
          <input type="checkbox" name="requiereEnvio" value="1" data-logistica-toggle ${requiereEnvio ? 'checked' : ''} />
          <span>Requiere envío</span>
        </label>
        <div class="logistica-panel ${requiereEnvio ? '' : 'is-hidden'}" data-logistica-panel>
          <div class="facturas-head">
            <div>
              <span class="eyebrow mini">Transporte de mercadería</span>
              <h3>Logística / Envío</h3>
            </div>
          </div>
          <p class="muted-text compact-note">Completa estos datos solo cuando la OC requiera envío por transportista.</p>
          <div class="form-grid logistica-grid">
            <label class="form-field">
              <span>Transportista</span>
              <input type="text" name="logisticaTransportista" value="${escapeHtml(logistica.transportista)}" placeholder="Ej. CARGOTRANS" autocomplete="off" />
            </label>
            <label class="form-field">
              <span>Fecha de embarque</span>
              <input type="date" name="logisticaFechaEmbarque" value="${escapeHtml(logistica.fechaEmbarque)}" />
            </label>
            <label class="form-field">
              <span>Fecha estimada</span>
              <input type="date" name="logisticaFechaEstimada" value="${escapeHtml(logistica.fechaEstimada)}" />
            </label>
            <label class="form-field">
              <span>Fecha real</span>
              <input type="date" name="logisticaFechaReal" value="${escapeHtml(logistica.fechaReal)}" />
            </label>
            <label class="form-field">
              <span>Guía</span>
              <input type="text" name="logisticaGuia" value="${escapeHtml(logistica.guia)}" placeholder="Número de guía" autocomplete="off" />
            </label>
          </div>
        </div>
      </section>
    `;
  }

  function renderLogisticaVentaDisplay(record) {
    const venta = normalizeVentaRecord(record);
    if (!venta.requiereEnvio) return '';
    const logistica = normalizeLogisticaVentaRecord(venta.logistica);
    const items = [
      ['Transportista', logistica.transportista || '—'],
      ['Fecha de embarque', formatDate(logistica.fechaEmbarque)],
      ['Fecha estimada', formatDate(logistica.fechaEstimada)],
      ['Fecha real', formatDate(logistica.fechaReal)],
      ['Guía', logistica.guia || '—']
    ];
    return `
      <div class="logistica-card-block">
        <strong>Logística / Envío</strong>
        <div class="logistica-display-grid">
          ${items.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join('')}
        </div>
      </div>
    `;
  }

  function renderVentaForm(record, clientesActivos, sucursalesActivas, missingCatalogs, quickCapture = null) {
    const draft = !record && isPlainObject(quickCapture) ? quickCapture : {};
    const selectedClienteId = record?.clienteId || cleanText(draft.clienteId);
    const selectedSucursalId = record?.sucursalId || cleanText(draft.sucursalId);
    const fechaOc = record?.fechaOc || toDateInputValue(draft.fechaOc) || todayInputValue();
    const fechaEntrega = record?.fechaEntrega || toDateInputValue(draft.fechaEntrega) || '';
    const selectedTerms = selectedClienteId ? getCatalogPaymentTerms('clientes', selectedClienteId) : { diasCredito: 0 };
    const draftDias = draft.diasCredito ?? '';
    const diasCredito = record ? (record.diasCredito ?? '') : (draftDias !== '' ? draftDias : (selectedClienteId ? selectedTerms.diasCredito : ''));
    const fechaBaseCredito = getVentaCreditBaseDate({ fechaOc, fechaEntrega });
    const fechaVencimiento = calculateVentaFechaVencimiento({ fechaOc, fechaEntrega }, Number(diasCredito) || 0) || addDaysToDate(fechaBaseCredito, Number(diasCredito) || 0);
    const previewSource = record || {
      subtotal: draft.subtotal || draft.montoOc || 0,
      montoOc: draft.subtotal || draft.montoOc || 0,
      descuento: draft.descuento || 0,
      totalCobrado: 0
    };
    const calculations = getVentaCalculations(previewSource);
    const facturasSource = record || draft;
    const logisticaSource = record || draft;

    return `
      <form class="venta-form" data-venta-form data-current-cobrado="${escapeHtml(record?.totalCobrado || 0)}" data-current-ajustes="${escapeHtml(JSON.stringify(record?.ajustes || []))}" novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <div class="form-grid">
          <label class="form-field">
            <span>Número OC <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="text" name="numeroDocumento" value="${escapeHtml(record?.numeroDocumento || cleanText(draft.numeroDocumento))}" placeholder="Ej. OC-001" required autocomplete="off" />
          </label>
          <label class="form-field">
            <span>Fecha OC <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaOc" value="${escapeHtml(fechaOc)}" required data-venta-date />
          </label>
          <label class="form-field">
            <span>Cliente <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="clienteId" required ${missingCatalogs ? 'disabled' : ''} data-venta-client>
              <option value="">Seleccionar cliente</option>
              ${clientesActivos.map((cliente) => `<option value="${escapeHtml(cliente.id)}" ${cliente.id === selectedClienteId ? 'selected' : ''}>${escapeHtml(cliente.nombre || 'Cliente sin nombre')} · ${escapeHtml(formatPaymentTermsLabel(cliente))}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Sucursal <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="sucursalId" required ${missingCatalogs ? 'disabled' : ''}>
              <option value="">Seleccionar sucursal</option>
              ${sucursalesActivas.map((sucursal) => `<option value="${escapeHtml(sucursal.id)}" ${sucursal.id === selectedSucursalId ? 'selected' : ''}>${escapeHtml(sucursal.nombre || 'Sucursal sin nombre')}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha de entrega</span>
            <input type="date" name="fechaEntrega" value="${escapeHtml(fechaEntrega)}" data-venta-delivery />
          </label>
          <label class="form-field">
            <span>Fecha vencimiento</span>
            <input type="date" name="fechaVencimiento" value="${escapeHtml(fechaVencimiento)}" data-venta-due readonly />
          </label>
          <label class="form-field">
            <span>Subtotal C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="subtotal" value="${escapeHtml(formatNumberInput(record ? record.subtotal : (draft.subtotal || draft.montoOc)))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-venta-calc />
          </label>
          <label class="form-field">
            <span>Descuento C$</span>
            <input type="number" name="descuento" value="${escapeHtml(formatNumberInput(record ? record.descuento : draft.descuento))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" data-venta-calc />
          </label>
          <label class="form-field venta-credit-days-field">
            <span>Días de crédito</span>
            <input type="number" name="diasCredito" value="${escapeHtml(diasCredito)}" min="0" step="1" inputmode="numeric" data-venta-days />
          </label>
        </div>

        <div class="formula-card" aria-live="polite">
          <strong>Subtotal - Descuento = Total</strong>
          <div class="formula-grid">
            <span>Total</span><b data-venta-preview-original>${escapeHtml(formatMoney(calculations.ventaNetaOriginal))}</b>
            <span>Ajustes / notas</span><b data-venta-preview-ajustes>${calculations.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(calculations.totalAjustes))}</b>
            <span>Total tras ajustes</span><b data-venta-preview-neto>${escapeHtml(formatMoney(calculations.ventaNetaAjustada))}</b>
            <span>Total cobrado</span><b data-venta-preview-cobrado>${escapeHtml(formatMoney(record?.totalCobrado || 0))}</b>
            <span>Saldo por cobrar</span><b data-venta-preview-saldo>${escapeHtml(formatMoney(calculations.saldoPorCobrar))}</b>
          </div>
        </div>

        ${renderFacturasVentaBlock(facturasSource)}

        ${renderLogisticaVentaBlock(logisticaSource)}

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas de la OC">${escapeHtml(record?.observacion || cleanText(draft.observacion))}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${missingCatalogs ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar OC'}</button>
          <button type="button" class="secondary-action" data-venta-clear>${record ? 'Cancelar' : 'Limpiar'}</button>
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

    const groups = buildAccordionGroups(ventas, getVentaAccordionInfo);
    ensureOpenAccordionGroup(ventasState, groups);

    return renderAccordionGroups({
      module: 'ventas',
      groups,
      openGroupKey: ventasState.openGroupKey,
      renderOpenGroup: (group) => renderVentasTable(group.records, group.label)
    });
  }

  function renderVentasTable(ventas, groupLabel = '') {
    return renderOperationalTableShell({
      shellClass: 'ventas-scroll-shell',
      wrapClass: 'ventas-list',
      ariaLabel: groupLabel ? `OC registradas de ${groupLabel}` : 'OC registradas',
      tableClass: 'operational-table-ventas',
      headers: `
        <th>OC</th>
        <th>Fecha</th>
        <th>Vence</th>
        <th class="amount-cell">Subtotal</th>
        <th class="amount-cell">Descuento</th>
        <th class="amount-cell">Total</th>
        <th class="amount-cell">Ajustes</th>
        <th class="amount-cell">Cobrado</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th class="actions-cell">Acciones</th>
      `,
      rows: ventas.map((venta) => renderVentaCard(venta)).join(''),
      colgroup: `
        <col style="width: 176px;">
        <col style="width: 92px;">
        <col style="width: 92px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 92px;">
        <col style="width: 320px;">
      `
    });
  }

  function renderVentaCard(venta) {
    const record = normalizeVentaRecord(venta);
    const cliente = getCatalogRecordById('clientes', record.clienteId);
    const sucursal = getCatalogRecordById('sucursales', record.sucursalId);
    const estadoClass = getEstadoClass(record.estado);
    const facturas = normalizeFacturasVentaList(record.facturas);
    const ajustesRow = renderVentaAjustesCompactRow(record, 11);
    return `
      <tr class="compact-record-row venta-row ${record.activo ? 'is-active' : 'is-inactive'}">
        <td data-label="OC"><span class="compact-primary">${escapeHtml(record.numeroDocumento || 'Sin número')}</span>${facturas.length ? `<small>Facturas: ${escapeHtml(formatFacturasVentaResumen(facturas))}</small>` : ''}${record.requiereEnvio ? `<small>${escapeHtml(formatLogisticaVentaResumen(record))}</small>` : ''}</td>
        <td data-label="Fecha"><span>${escapeHtml(formatDate(record.fechaOc))}</span></td>
        <td data-label="Vence"><span>${escapeHtml(formatDate(record.fechaVencimiento))}</span></td>
        <td data-label="Subtotal" class="amount-cell"><span>${escapeHtml(formatMoney(record.subtotal))}</span></td>
        <td data-label="Descuento" class="amount-cell"><span>${escapeHtml(formatMoney(record.descuento))}</span></td>
        <td data-label="Total" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.ventaNetaOriginal))}</span></td>
        <td data-label="Ajustes" class="amount-cell"><span>${record.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(record.totalAjustes))}</span></td>
        <td data-label="Cobrado" class="amount-cell"><span>${escapeHtml(formatMoney(record.totalCobrado))}</span></td>
        <td data-label="Saldo" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.saldoPorCobrar))}</span></td>
        <td data-label="Estado"><span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span></td>
        <td data-label="Acciones" class="actions-cell">
          <div class="record-actions compact-row-actions">
            ${record.activo && record.saldoPorCobrar > 0 ? `<button type="button" class="card-action compact" data-cobros-for="${escapeHtml(record.id)}">Cobrar</button>` : ''}
            ${record.activo && record.saldoPorCobrar > 0 ? `<button type="button" class="secondary-action compact" data-ajuste-venta-start="${escapeHtml(record.id)}">Ajustar</button>` : ''}
            <button type="button" class="secondary-action compact" data-venta-edit="${escapeHtml(record.id)}">Editar</button>
            <button type="button" class="secondary-action compact" data-cobros-for="${escapeHtml(record.id)}">Cobros</button>
            <button type="button" class="secondary-action compact" data-history-venta="${escapeHtml(record.id)}">Historial</button>
            ${canCurrentRole('annulMovements') ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-venta-toggle="${escapeHtml(record.id)}">${record.activo ? 'Anular' : 'Reactivar'}</button>` : ''}
          </div>
        </td>
      </tr>
      ${ajustesRow}
    `;
  }

  function renderVentaAjustesCompactRow(venta, colspan = 10) {
    const record = normalizeVentaRecord(venta);
    const ajustes = normalizeVentaAjustesList(record.ajustes);
    if (!ajustes.length) return '';
    return `
      <tr class="compact-adjustments-row">
        <td colspan="${colspan}">
          <div class="ajustes-inline-history">
            <strong>Ajustes:</strong>
            ${ajustes.map((ajuste) => `
              <span class="ajuste-chip ${ajuste.activo ? '' : 'is-inactive'}">
                ${escapeHtml(formatDate(ajuste.fecha))} — ${escapeHtml(ajuste.tipo)} — ${ajuste.activo ? '-' : ''}${escapeHtml(formatMoney(ajuste.monto))}${ajuste.observacion ? ` — ${escapeHtml(ajuste.observacion)}` : ''}
                ${ajuste.activo && canCurrentRole('annulMovements') ? `<button type="button" class="mini-inline-action" data-ajuste-venta-delete="${escapeHtml(record.id)}" data-ajuste-id="${escapeHtml(ajuste.id)}">Eliminar</button>` : ''}
              </span>
            `).join('')}
          </div>
        </td>
      </tr>
    `;
  }

  function formatVentaAjustesExport(ajustesSource) {
    const ajustes = normalizeVentaAjustesList(ajustesSource).filter((ajuste) => ajuste.activo);
    return ajustes.map((ajuste) => `${formatDate(ajuste.fecha)} · ${ajuste.tipo} · ${formatMoney(ajuste.monto)}${ajuste.observacion ? ` · ${ajuste.observacion}` : ''}`).join(' | ');
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
      totals.subtotal = roundMoney(totals.subtotal + venta.subtotal);
      totals.descuento = roundMoney(totals.descuento + venta.descuento);
      totals.ventaNetaOriginal = roundMoney(totals.ventaNetaOriginal + venta.ventaNetaOriginal);
      totals.totalAjustes = roundMoney(totals.totalAjustes + venta.totalAjustes);
      totals.ventaNetaAjustada = roundMoney(totals.ventaNetaAjustada + venta.ventaNetaAjustada);
      totals.ventaNeta = roundMoney(totals.ventaNeta + venta.ventaNeta);
      totals.totalCobrado = roundMoney(totals.totalCobrado + venta.totalCobrado);
      totals.saldoPorCobrar = roundMoney(totals.saldoPorCobrar + venta.saldoPorCobrar);
      if (venta.estado === 'Pendiente') totals.pendientes += 1;
      if (venta.estado === 'Vencido') totals.vencidas += 1;
      if (venta.estado === 'Pagado') totals.pagadas += 1;
      return totals;
    }, { activas: 0, anuladas: 0, pendientes: 0, vencidas: 0, pagadas: 0, subtotal: 0, descuento: 0, ventaNetaOriginal: 0, totalAjustes: 0, ventaNetaAjustada: 0, ventaNeta: 0, totalCobrado: 0, saldoPorCobrar: 0 });
  }

  function buildVentaFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const clienteId = cleanText(formData.get('clienteId'));
    const fechaOc = toDateInputValue(formData.get('fechaOc'));
    const diasCreditoRaw = cleanText(formData.get('diasCredito'));
    const terms = getCatalogPaymentTerms('clientes', clienteId);
    let diasCredito = parsePositiveInteger(diasCreditoRaw);
    if (!diasCreditoRaw && clienteId) diasCredito = terms.diasCredito;
    const fechaEntrega = toDateInputValue(formData.get('fechaEntrega'));
    const safeDiasCredito = Number.isNaN(diasCredito) ? 0 : diasCredito;
    const fechaVencimiento = calculateVentaFechaVencimiento({ fechaOc, fechaEntrega }, safeDiasCredito);
    const base = {
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('venta'),
      numeroDocumento: cleanText(formData.get('numeroDocumento')),
      clienteId,
      sucursalId: cleanText(formData.get('sucursalId')),
      fechaOc,
      fechaEntrega,
      fechaBaseCredito: getVentaCreditBaseDate({ fechaOc, fechaEntrega }),
      fechaBaseCreditoTipo: fechaEntrega ? 'Entrega' : 'OC',
      diasCredito,
      fechaVencimiento,
      subtotal: parseMoney(formData.get('subtotal') ?? formData.get('montoOc')),
      montoOc: parseMoney(formData.get('subtotal') ?? formData.get('montoOc')),
      noVa: existingRecord?.noVa || 0,
      descuento: parseMoney(formData.get('descuento')),
      descuentoNoVa: existingRecord?.descuentoNoVa || 0,
      totalCobrado: existingRecord?.totalCobrado || 0,
      ajustes: normalizeVentaAjustesList(existingRecord?.ajustes || []),
      facturas: syncFacturaRowsToHidden(form),
      requiereEnvio: formData.get('requiereEnvio') === '1',
      logistica: normalizeLogisticaVentaRecord({
        transportista: formData.get('logisticaTransportista') ?? existingRecord?.logistica?.transportista,
        fechaEmbarque: formData.get('logisticaFechaEmbarque') ?? existingRecord?.logistica?.fechaEmbarque,
        fechaEstimada: formData.get('logisticaFechaEstimada') ?? existingRecord?.logistica?.fechaEstimada,
        fechaReal: formData.get('logisticaFechaReal') ?? existingRecord?.logistica?.fechaReal,
        guia: formData.get('logisticaGuia') ?? existingRecord?.logistica?.guia
      }),
      observacion: cleanText(formData.get('observacion')),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    };
    const calculations = getVentaCalculations(base);
    return {
      ...base,
      diasCredito: Number.isNaN(base.diasCredito) ? 0 : base.diasCredito,
      subtotal: calculations.subtotal,
      montoOc: calculations.subtotal,
      montoOcLegacy: Number.isNaN(base.montoOcLegacy) ? calculations.subtotal : base.montoOcLegacy,
      noVa: Number.isNaN(base.noVa) ? 0 : base.noVa,
      noVaLegacy: Number.isNaN(base.noVaLegacy) ? 0 : base.noVaLegacy,
      descuento: calculations.descuento,
      descuentoNoVa: Number.isNaN(base.descuentoNoVa) ? 0 : base.descuentoNoVa,
      descuentoNoVaLegacy: Number.isNaN(base.descuentoNoVaLegacy) ? 0 : base.descuentoNoVaLegacy,
      ajustes: normalizeVentaAjustesList(base.ajustes),
      totalAjustes: calculations.totalAjustes,
      ventaNetaOriginal: calculations.ventaNetaOriginal,
      total: calculations.ventaNetaOriginal,
      ventaNetaAjustada: calculations.ventaNetaAjustada,
      totalTrasAjustes: calculations.ventaNetaAjustada,
      facturas: normalizeFacturasVentaList(base.facturas),
      requiereEnvio: Boolean(base.requiereEnvio),
      logistica: normalizeLogisticaVentaRecord(base.logistica),
      ventaNeta: calculations.ventaNeta,
      totalCobrado: calculations.totalCobrado,
      saldoPorCobrar: calculations.saldoPorCobrar,
      estado: determineVentaEstado(base)
    };
  }

  function validateVentaRecord(record) {
    if (!record.numeroDocumento) return 'El número OC es obligatorio.';
    if (!record.clienteId || !getActiveCatalogRecords('clientes').some((cliente) => cliente.id === record.clienteId)) return 'Selecciona un cliente activo desde Catálogos.';
    if (!record.sucursalId || !getActiveCatalogRecords('sucursales').some((sucursal) => sucursal.id === record.sucursalId)) return 'Selecciona una sucursal activa desde Catálogos.';
    if (!record.fechaOc) return 'La fecha OC es obligatoria.';
    if (Number.isNaN(parseMoney(record.subtotal)) || record.subtotal <= 0) return 'Subtotal debe ser un número mayor que cero.';
    if (Number.isNaN(parsePositiveInteger(record.diasCredito))) return 'Días de crédito debe ser cero o un número entero positivo.';

    const numericFields = [
      ['Descuento', record.descuento]
    ];

    const invalid = numericFields.find(([, value]) => Number.isNaN(parseMoney(value)) || Number(value) < 0);
    if (invalid) return `${invalid[0]} debe ser cero o un número positivo.`;

    if (record.ventaNetaOriginal < 0) return 'El Total no puede ser negativo. Revisa Subtotal y Descuento.';
    if (record.descuento > record.subtotal) return 'Descuento no puede superar el Subtotal.';
    if (record.totalCobrado > record.ventaNetaAjustada) return 'El total ajustado no puede quedar menor que el total ya cobrado.';
    return '';
  }

  function syncFacturaRowsToHidden(form) {
    const block = form?.querySelector?.('[data-facturas-block]');
    if (!block) return [];
    const hidden = block.querySelector('[data-facturas-json]');
    const massInput = block.querySelector('[data-facturas-mass]');
    const source = massInput ? massInput.value : (hidden?.value || '');
    const list = normalizeFacturasVentaList(source);
    if (hidden) hidden.value = JSON.stringify(list);
    return list;
  }

  function validatePendingFacturaInputs(form) {
    syncFacturaRowsToHidden(form);
    return '';
  }

  function buildVentaDraftFromForm(form) {
    const formData = new FormData(form);
    const fechaOc = toDateInputValue(formData.get('fechaOc')) || todayInputValue();
    const fechaEntrega = toDateInputValue(formData.get('fechaEntrega'));
    const diasCredito = parsePositiveInteger(formData.get('diasCredito'));
    const safeDiasCredito = Number.isNaN(diasCredito) ? 0 : diasCredito;
    return {
      numeroDocumento: cleanText(formData.get('numeroDocumento')),
      clienteId: cleanText(formData.get('clienteId')),
      sucursalId: cleanText(formData.get('sucursalId')),
      fechaOc,
      fechaEntrega,
      fechaBaseCredito: getVentaCreditBaseDate({ fechaOc, fechaEntrega }),
      fechaBaseCreditoTipo: fechaEntrega ? 'Entrega' : 'OC',
      diasCredito: safeDiasCredito,
      fechaVencimiento: calculateVentaFechaVencimiento({ fechaOc, fechaEntrega }, safeDiasCredito),
      subtotal: cleanText(formData.get('subtotal') ?? formData.get('montoOc')),
      montoOc: cleanText(formData.get('subtotal') ?? formData.get('montoOc')),
      descuento: cleanText(formData.get('descuento')),
      facturas: syncFacturaRowsToHidden(form),
      requiereEnvio: formData.get('requiereEnvio') === '1',
      logistica: normalizeLogisticaVentaRecord({
        transportista: formData.get('logisticaTransportista'),
        fechaEmbarque: formData.get('logisticaFechaEmbarque'),
        fechaEstimada: formData.get('logisticaFechaEstimada'),
        fechaReal: formData.get('logisticaFechaReal'),
        guia: formData.get('logisticaGuia')
      }),
      observacion: cleanText(formData.get('observacion'))
    };
  }

  function buildVentaQuickCaptureFromSavedRecord(record) {
    const saved = normalizeVentaRecord(record);
    return {
      clienteId: saved.clienteId,
      fechaOc: saved.fechaOc || todayInputValue()
    };
  }

  function resetVentasTransientState() {
    ventasState.editingId = null;
    ventasState.quickCapture = null;
    ventasState.selectedAjusteVentaId = '';
  }

  function buildVentaAjusteFromForm(form) {
    const formData = new FormData(form);
    return normalizeVentaAjusteRecord({
      id: generateId('ajusteCliente'),
      fecha: toDateInputValue(formData.get('fecha')),
      tipo: cleanText(formData.get('tipo')),
      monto: parseMoney(formData.get('monto')),
      observacion: cleanText(formData.get('observacion')),
      activo: true,
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
  }

  function validateVentaAjusteRecord(venta, ajuste, clienteId) {
    if (!venta || !venta.id || !venta.activo) return 'Selecciona una OC activa para aplicar el ajuste.';
    if (!clienteId || clienteId !== venta.clienteId) return 'Selecciona el cliente correspondiente a la OC.';
    if (!ajuste.fecha) return 'La fecha del ajuste es obligatoria.';
    if (!VENTA_AJUSTE_TYPES.includes(ajuste.tipo)) return 'Selecciona un tipo de ajuste válido.';
    if (Number.isNaN(parseMoney(ajuste.monto)) || ajuste.monto <= 0) return 'El monto del ajuste debe ser mayor que cero.';
    if (ajuste.monto > venta.saldoPorCobrar) return `El ajuste no puede superar el saldo lógico disponible de ${formatMoney(venta.saldoPorCobrar)}. Si ya se cobró de más, registra la corrección fuera de cobros para no crear banco falso.`;
    return '';
  }

  function saveVentaAjusteRecord(form) {
    const formData = new FormData(form);
    const ventaId = cleanText(formData.get('ventaId'));
    const clienteId = cleanText(formData.get('clienteId'));
    const ventas = Array.isArray(appData.ventas) ? appData.ventas : [];
    const venta = ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const ajuste = buildVentaAjusteFromForm(form);
    const validationError = validateVentaAjusteRecord(venta, ajuste, clienteId);

    if (validationError) {
      ventasState.selectedAjusteVentaId = ventaId;
      ventasState.message = validationError;
      ventasState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    if (!warnIfClosedPeriod(ajuste.fecha, 'Registrar este ajuste/nota de cliente')) return;

    appData.ventas = ventas.map((record) => {
      if (record.id !== ventaId) return normalizeVentaRecord(record);
      const normalized = normalizeVentaRecord(record);
      return normalizeVentaRecord({
        ...normalized,
        ajustes: [ajuste, ...normalizeVentaAjustesList(normalized.ajustes)],
        updatedAt: nowIso()
      });
    });

    const savedVenta = appData.ventas.find((record) => record.id === ventaId);
    ventasState.selectedAjusteVentaId = ventaId;
    openAccordionGroupForRecord('ventas', savedVenta || venta);
    ventasState.message = `Ajuste ${ajuste.tipo} por ${formatMoney(ajuste.monto)} aplicado a ${venta.numeroDocumento}. Saldo recalculado sin crear cobro.`;
    ventasState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Ventas / OC',
      action: 'Ajuste registrado',
      entityType: 'Ajuste cliente',
      entityRef: venta.numeroDocumento,
      amount: ajuste.monto,
      detail: buildActivityDetail(['Ajuste cliente registrado', venta.numeroDocumento, ajuste.tipo, formatMoney(ajuste.monto)]),
      source: 'local'
    });
    renderRoute();
  }

  function startAjusteForVenta(ventaId) {
    const cleanVentaId = cleanText(ventaId);
    ventasState.selectedAjusteVentaId = cleanVentaId;
    const venta = appData.ventas.find((record) => record.id === cleanVentaId);
    if (venta) openAccordionGroupForRecord('ventas', venta);
    ventasState.message = null;
    renderRoute({ preserveScroll: true });
  }

  function deleteVentaAjuste(ventaId, ajusteId) {
    if (!canCurrentRole('annulMovements')) {
      ventasState.message = 'Solo Administrador puede eliminar ajustes/notas.';
      ventasState.messageType = 'error';
      renderRoute();
      return;
    }
    const ventas = Array.isArray(appData.ventas) ? appData.ventas : [];
    const venta = ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const ajuste = venta ? normalizeVentaAjustesList(venta.ajustes).find((item) => item.id === ajusteId) : null;
    if (!venta || !ajuste) return;
    if (!warnIfClosedPeriod(ajuste.fecha, 'Eliminar este ajuste/nota de cliente')) return;
    const ok = window.confirm(`Vas a eliminar el ajuste ${ajuste.tipo} por ${formatMoney(ajuste.monto)} de ${venta.numeroDocumento}. No se tocarán cobros, caja ni bancos. ¿Continuar?`);
    if (!ok) return;

    appData.ventas = ventas.map((record) => {
      if (record.id !== ventaId) return normalizeVentaRecord(record);
      const normalized = normalizeVentaRecord(record);
      return normalizeVentaRecord({
        ...normalized,
        ajustes: normalizeVentaAjustesList(normalized.ajustes).filter((item) => item.id !== ajusteId),
        updatedAt: nowIso()
      });
    });

    const savedVenta = appData.ventas.find((record) => record.id === ventaId);
    ventasState.selectedAjusteVentaId = ventaId;
    openAccordionGroupForRecord('ventas', savedVenta || venta);
    ventasState.message = `Ajuste eliminado de ${venta.numeroDocumento}. Saldo recalculado.`;
    ventasState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function setupVentaAjusteForm(form) {
    const clientSelect = form.querySelector('[data-ajuste-client]');
    const ventaSelect = form.querySelector('[data-ajuste-venta]');
    const preview = form.querySelector('[data-ajuste-venta-preview]');
    if (!clientSelect || !ventaSelect) return;

    const updatePreview = () => {
      const ventaId = cleanText(ventaSelect.value);
      const ventas = Array.isArray(appData.ventas) ? appData.ventas : [];
      const venta = ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
      if (preview && venta) preview.innerHTML = renderVentaAjustePreview(venta);
      ventasState.selectedAjusteVentaId = ventaId;
    };

    const syncVentaOptions = () => {
      const clienteId = cleanText(clientSelect.value);
      let firstVisible = '';
      Array.from(ventaSelect.options).forEach((option) => {
        if (!option.value) return;
        const visible = !clienteId || option.dataset.clientId === clienteId;
        option.hidden = !visible;
        option.disabled = !visible;
        if (visible && !firstVisible) firstVisible = option.value;
      });
      const selectedOption = ventaSelect.selectedOptions && ventaSelect.selectedOptions[0];
      if (!selectedOption || selectedOption.disabled || selectedOption.hidden) ventaSelect.value = firstVisible;
      updatePreview();
    };

    clientSelect.addEventListener('change', syncVentaOptions);
    ventaSelect.addEventListener('change', () => {
      const selected = ventaSelect.selectedOptions && ventaSelect.selectedOptions[0];
      const clienteId = selected?.dataset?.clientId || '';
      if (clienteId) clientSelect.value = clienteId;
      syncVentaOptions();
    });
    syncVentaOptions();
  }

  function saveVentaRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.ventas) ? appData.ventas : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;
    const pendingFacturaError = validatePendingFacturaInputs(form);
    if (pendingFacturaError) {
      ventasState.quickCapture = existingRecord ? null : buildVentaDraftFromForm(form);
      ventasState.message = pendingFacturaError;
      ventasState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }
    const newRecord = buildVentaFromForm(form, existingRecord);
    const validationError = validateVentaRecord(newRecord);

    if (validationError) {
      ventasState.quickCapture = existingRecord ? null : buildVentaDraftFromForm(form);
      ventasState.message = validationError;
      ventasState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaOc, existingRecord ? 'Actualizar esta OC' : 'Crear esta OC')) return;

    if (existingRecord) {
      appData.ventas = records.map((record) => record.id === existingId ? newRecord : record);
      ventasState.quickCapture = null;
      ventasState.message = `OC ${newRecord.numeroDocumento} actualizada.`;
    } else {
      appData.ventas = [newRecord, ...records];
      ventasState.quickCapture = buildVentaQuickCaptureFromSavedRecord(newRecord);
      ventasState.message = `OC ${newRecord.numeroDocumento} guardada. Cliente y Fecha OC quedan listos; selecciona la nueva sucursal para continuar.`;
    }

    ventasState.editingId = null;
    const savedRecord = appData.ventas.find((record) => record.id === newRecord.id) || newRecord;
    openAccordionGroupForRecord('ventas', savedRecord);
    ventasState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Ventas / OC',
      action: existingRecord ? 'Editado' : 'Creado',
      entityType: 'OC',
      entityRef: newRecord.numeroDocumento,
      amount: newRecord.ventaNetaAjustada || newRecord.total || newRecord.ventaNetaOriginal,
      detail: buildActivityDetail([existingRecord ? 'OC editada' : 'OC creada', newRecord.numeroDocumento, formatMoney(newRecord.ventaNetaAjustada || newRecord.total || newRecord.ventaNetaOriginal)]),
      source: 'local'
    });
    renderRoute();
  }

  function editVentaRecord(recordId) {
    const record = appData.ventas.find((item) => item.id === recordId);
    if (!record) return;
    ventasState.editingId = recordId;
    ventasState.quickCapture = null;
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
    ventasState.quickCapture = null;
    ventasState.message = `OC ${record.numeroDocumento || ''} quedó ${shouldActivate ? 'reactivada' : 'anulada'}.`;
    ventasState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearVentaForm() {
    ventasState.editingId = null;
    ventasState.quickCapture = null;
    ventasState.message = null;
    renderRoute();
  }

  function setupVentaLiveCalculations(form) {
    updateVentaPreviewFromForm(form, false);

    form.querySelectorAll('[data-venta-calc]').forEach((input) => {
      input.addEventListener('input', () => updateVentaPreviewFromForm(form, false));
    });

    const dueInput = form.querySelector('[data-venta-due]');
    dueInput?.addEventListener('input', () => { form.dataset.manualDue = '1'; });
    dueInput?.addEventListener('change', () => { form.dataset.manualDue = '1'; });

    form.querySelector('[data-venta-client]')?.addEventListener('change', () => applyVentaPaymentTermsSuggestion(form));
    form.querySelector('[data-venta-date]')?.addEventListener('change', () => updateVentaPreviewFromForm(form, true));
    form.querySelector('[data-venta-delivery]')?.addEventListener('change', () => updateVentaPreviewFromForm(form, true));
    form.querySelector('[data-venta-days]')?.addEventListener('input', () => updateVentaPreviewFromForm(form, true));
  }

  function setupVentaFacturasForm(form) {
    const block = form.querySelector('[data-facturas-block]');
    if (!block) return;
    const hidden = block.querySelector('[data-facturas-json]');
    const massInput = block.querySelector('[data-facturas-mass]');
    const countNode = block.querySelector('[data-facturas-count]');
    const previewNode = block.querySelector('[data-facturas-preview]');
    const messageNode = block.querySelector('[data-factura-message]');
    if (!massInput) return;

    const showMessage = (message, isError = false) => {
      if (!messageNode) return;
      messageNode.textContent = message || '';
      messageNode.classList.toggle('is-error', Boolean(isError));
    };

    const sync = () => {
      const list = normalizeFacturasVentaList(massInput.value);
      if (hidden) hidden.value = JSON.stringify(list);
      if (countNode) countNode.textContent = `${list.length} factura${list.length === 1 ? '' : 's'}`;
      if (previewNode) previewNode.textContent = list.length ? `Facturas detectadas: ${formatFacturasVentaResumen(list)}` : 'Facturas detectadas: ninguna';
      return list;
    };

    const current = normalizeFacturasVentaList(hidden?.value || []);
    massInput.value = formatFacturasVentaInput(current);
    sync();

    massInput.addEventListener('input', () => {
      sync();
      showMessage('', false);
    });
    massInput.addEventListener('blur', () => {
      const list = sync();
      massInput.value = formatFacturasVentaInput(list);
      sync();
    });
  }

  function setupVentaLogisticaForm(form) {
    const block = form.querySelector('[data-logistica-block]');
    if (!block) return;
    const toggle = block.querySelector('[data-logistica-toggle]');
    const panel = block.querySelector('[data-logistica-panel]');
    const updateVisibility = () => {
      panel?.classList.toggle('is-hidden', !toggle?.checked);
    };
    toggle?.addEventListener('change', updateVisibility);
    updateVisibility();
  }

  function applyVentaPaymentTermsSuggestion(form) {
    const clienteId = cleanText(form.querySelector('[data-venta-client]')?.value || '');
    const terms = getCatalogPaymentTerms('clientes', clienteId);
    const daysInput = form.querySelector('[data-venta-days]');
    if (daysInput) daysInput.value = String(terms.diasCredito || 0);
    updateVentaPreviewFromForm(form, true);
  }

  function updateVentaPreviewFromForm(form, recalculateDue) {
    if (recalculateDue) {
      const dateInput = form.querySelector('[data-venta-date]');
      const deliveryInput = form.querySelector('[data-venta-delivery]');
      const daysInput = form.querySelector('[data-venta-days]');
      const dueInput = form.querySelector('[data-venta-due]');
      const due = calculateVentaFechaVencimiento({ fechaOc: dateInput?.value, fechaEntrega: deliveryInput?.value }, Number.parseInt(daysInput?.value || '0', 10) || 0);
      if (dueInput && due) dueInput.value = due;
    }

    let currentAjustes = [];
    try {
      currentAjustes = form.dataset.currentAjustes ? JSON.parse(form.dataset.currentAjustes) : [];
    } catch (_) {
      currentAjustes = [];
    }

    const formData = new FormData(form);
    const calculations = getVentaCalculations({
      subtotal: formData.get('subtotal') ?? formData.get('montoOc'),
      montoOc: formData.get('subtotal') ?? formData.get('montoOc'),
      descuento: formData.get('descuento'),
      totalCobrado: form.dataset.currentCobrado || 0,
      ajustes: currentAjustes
    });

    const originalNode = form.querySelector('[data-venta-preview-original]');
    const ajustesNode = form.querySelector('[data-venta-preview-ajustes]');
    const netoNode = form.querySelector('[data-venta-preview-neto]');
    const cobradoNode = form.querySelector('[data-venta-preview-cobrado]');
    const saldoNode = form.querySelector('[data-venta-preview-saldo]');
    if (originalNode) originalNode.textContent = formatMoney(calculations.ventaNetaOriginal);
    if (ajustesNode) ajustesNode.textContent = `${calculations.totalAjustes > 0 ? '-' : ''}${formatMoney(calculations.totalAjustes)}`;
    if (netoNode) netoNode.textContent = formatMoney(calculations.ventaNetaAjustada);
    if (cobradoNode) cobradoNode.textContent = formatMoney(calculations.totalCobrado);
    if (saldoNode) saldoNode.textContent = formatMoney(calculations.saldoPorCobrar);
  }

  function renderCobros() {
    const ventasDisponibles = getVentasConSaldoCobro();
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveBankRecords();
    const cobros = getCobrosOrdenados();
    const visibleCobros = cobrosState.focusVentaId ? cobros.filter((cobro) => cobro.ventaId === cobrosState.focusVentaId) : cobros;
    const focusVenta = cobrosState.focusVentaId ? normalizeVentaRecord(appData.ventas.find((venta) => venta.id === cobrosState.focusVentaId)) : null;
    const totals = getCobrosTotals();
    const selectedVenta = ventasDisponibles.find((venta) => venta.id === cobrosState.selectedVentaId) || ventasDisponibles[0] || null;
    if (selectedVenta && cobrosState.selectedVentaId !== selectedVenta.id) cobrosState.selectedVentaId = selectedVenta.id;
    const editingRecord = cobrosState.editingId ? getCobrosOrdenados().find((record) => record.id === cobrosState.editingId) : null;
    const modalMetodos = editingRecord ? getSelectableCatalogRecords('metodosPago', editingRecord.metodoPagoId) : metodosActivos;
    const modalCuentas = editingRecord ? getSelectableBankRecords(editingRecord.cuentaBancoId) : cuentasActivas;
    const missingCatalogs = !metodosActivos.length;
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
        ${editingRecord ? renderEditModal(getCobroModalId(), 'Editar cobro', 'Actualiza el abono sin duplicarlo y recalcula la OC ligada.', renderCobroEditForm(editingRecord, modalMetodos, modalCuentas)) : ''}
      </section>
    `;
  }

  function renderCobrosWarning(ventasDisponibles, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!ventasDisponibles.length) missing.push('OC con saldo por cobrar');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un cobro necesitas una OC activa con saldo y métodos de pago activos. Banco se solicita cuando el método es Transferencia, Depósito o Tarjeta.</p>
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
            <span>OC <span class="required-dot" aria-label="obligatorio">*</span></span>
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
            <select name="metodoPagoId" required data-payment-method-select ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}">${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          ${renderPaymentBankField(cuentasActivas, null, cannotCreate)}
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

  function renderCobroEditForm(record, metodosActivos, cuentasActivas) {
    const venta = (Array.isArray(appData.ventas) ? appData.ventas : []).map((item) => normalizeVentaRecord(item)).find((item) => item.id === record.ventaId);
    const cliente = venta ? getCatalogRecordById('clientes', venta.clienteId) : null;
    const sucursal = venta ? getCatalogRecordById('sucursales', venta.sucursalId) : null;
    const saldoDisponible = venta ? roundMoney(venta.saldoPorCobrar + (record.activo ? record.montoCobrado : 0)) : record.montoCobrado;
    return `
      <form class="cobro-form" data-cobro-form data-cobro-edit-form novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record.id)}" />
        <input type="hidden" name="ventaId" value="${escapeHtml(record.ventaId)}" />
        <div class="form-grid">
          <label class="form-field full-span">
            <span>OC ligado</span>
            <input type="text" value="${escapeHtml(record.numeroDocumento || venta?.numeroDocumento || 'Sin OC')}" disabled />
          </label>
          <label class="form-field">
            <span>Fecha real de cobro <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaCobro" value="${escapeHtml(record.fechaCobro || todayInputValue())}" required />
          </label>
          <label class="form-field">
            <span>Monto cobrado C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="montoCobrado" value="${escapeHtml(formatNumberInput(record.montoCobrado))}" min="0.01" max="${escapeHtml(saldoDisponible)}" step="0.01" inputmode="decimal" placeholder="0.00" required />
          </label>
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoId" required data-payment-method-select>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${metodo.id === record.metodoPagoId ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}${metodo.activo ? '' : ' · inactivo'}</option>`).join('')}
            </select>
          </label>
          ${renderPaymentBankField(cuentasActivas, record, false)}
        </div>
        ${venta ? renderSelectedVentaCobroSummary(venta, cliente, sucursal) : ''}
        <p class="compact-note">Máximo permitido para esta edición: ${escapeHtml(formatMoney(saldoDisponible))}. El vínculo con la OC no se cambia para proteger trazabilidad.</p>
        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del cobro">${escapeHtml(record.observacion || '')}</textarea>
        </label>
        <div class="form-actions">
          <button type="submit" class="card-action">Guardar cambios</button>
          <button type="button" class="secondary-action" data-cobro-cancel>Cancelar</button>
        </div>
      </form>
    `;
  }

  function renderSelectedVentaCobroSummary(venta, cliente, sucursal) {
    const record = normalizeVentaRecord(venta);
    return `
      <div class="formula-card cobro-summary" aria-live="polite">
        <strong>OC seleccionada</strong>
        <div class="formula-grid">
          <span>Cliente</span><b>${escapeHtml(cliente?.nombre || 'Cliente no encontrado')}</b>
          <span>Sucursal</span><b>${escapeHtml(sucursal?.nombre || 'Sucursal no encontrada')}</b>
          <span>Fecha OC</span><b>${escapeHtml(formatDate(record.fechaOc))}</b>
          <span>Vencimiento</span><b>${escapeHtml(formatDate(record.fechaVencimiento))}</b>
          <span>Subtotal</span><b>${escapeHtml(formatMoney(record.subtotal))}</b>
          <span>Descuento</span><b>${escapeHtml(formatMoney(record.descuento))}</b>
          <span>Total</span><b>${escapeHtml(formatMoney(record.ventaNetaOriginal))}</b>
          <span>Ajustes / notas</span><b>${record.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(record.totalAjustes))}</b>
          <span>Cobrado actual</span><b>${escapeHtml(formatMoney(record.totalCobrado))}</b>
          <span>Saldo actual</span><b>${escapeHtml(formatMoney(record.saldoPorCobrar))}</b>
        </div>
      </div>
    `;
  }

  function makeAccordionGroupKey(prefix, id, label) {
    const safePrefix = cleanText(prefix) || 'grupo';
    const safeId = cleanText(id);
    if (safeId) return `${safePrefix}:id:${safeId}`;
    const normalizedLabel = normalizeNameForCompare(label || '') || 'sin-nombre';
    return `${safePrefix}:name:${normalizedLabel}`;
  }

  function buildAccordionGroups(records, resolver) {
    const source = Array.isArray(records) ? records : [];
    const groupsMap = new Map();

    source.forEach((record) => {
      const resolved = resolver(record) || {};
      const label = cleanText(resolved.label) || cleanText(resolved.fallbackLabel) || 'Sin clasificar';
      const key = cleanText(resolved.key) || makeAccordionGroupKey('grupo', '', label);
      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          key,
          label,
          records: [],
          searchText: normalizeNameForCompare(label)
        });
      }
      const group = groupsMap.get(key);
      group.records.push(record);
      group.searchText = normalizeNameForCompare(`${group.searchText} ${resolved.searchText || ''}`);
    });

    return Array.from(groupsMap.values())
      .filter((group) => group.records.length > 0)
      .sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }));
  }

  function ensureOpenAccordionGroup(state, groups) {
    if (!state || !state.openGroupKey) return;
    const exists = groups.some((group) => group.key === state.openGroupKey);
    if (!exists) state.openGroupKey = '';
  }

  function renderComprasAccordionPending(records) {
    const source = Array.isArray(records) ? records : [];
    const pendingTotal = source.reduce((total, item) => {
      const recalculated = recalculateCompraProveedorWithPagos(item, appData.pagosProveedores);
      const record = normalizeCompraProveedorRecord(recalculated);
      if (!record.activo) return total;
      return roundMoney(total + Math.max(0, Number(record.saldoPorPagar) || 0));
    }, 0);
    const amount = formatMoney(pendingTotal);
    return `
      <span class="entity-accordion-pending" title="Pendiente: ${escapeHtml(amount)}">
        <span class="pending-full">Pendiente: ${escapeHtml(amount)}</span>
        <span class="pending-short">Pend.: ${escapeHtml(amount)}</span>
      </span>
    `;
  }

  function renderAccordionGroups({ module, groups, openGroupKey, renderOpenGroup }) {
    if (!groups.length) return '';
    return `
      <div class="entity-accordion-list" data-accordion-list="${escapeHtml(module)}">
        ${groups.map((group) => {
          const isOpen = group.key === openGroupKey;
          const pendingIndicator = module === 'compras' ? renderComprasAccordionPending(group.records) : '';
          return `
            <section class="entity-accordion-item ${isOpen ? 'is-open' : ''}" data-accordion-item="${escapeHtml(module)}" data-accordion-search="${escapeHtml(group.searchText)}">
              <button type="button" class="entity-accordion-toggle ${pendingIndicator ? 'has-pending-indicator' : ''}" data-accordion-toggle data-accordion-module="${escapeHtml(module)}" data-accordion-key="${escapeHtml(group.key)}" aria-expanded="${isOpen ? 'true' : 'false'}">
                <span class="entity-accordion-chevron" aria-hidden="true">${isOpen ? '▾' : '▸'}</span>
                <span class="entity-accordion-name">${escapeHtml(group.label)}</span>
                ${pendingIndicator}
                <span class="entity-accordion-count">${group.records.length} ${group.records.length === 1 ? 'registro' : 'registros'}</span>
              </button>
              ${isOpen ? `<div class="entity-accordion-panel">${renderOpenGroup(group)}</div>` : ''}
            </section>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderOperationalTableShell({ shellClass, wrapClass, ariaLabel, tableClass, headers, rows, colgroup = '' }) {
    return `
      <div class="operational-scroll-shell ${escapeHtml(shellClass)}" data-operational-scroll-shell>
        <div class="operational-top-scroll" data-operational-top-scroll aria-hidden="true"><div class="operational-top-scroll-spacer" data-operational-top-spacer></div></div>
        <div class="operational-table-wrap ${escapeHtml(wrapClass)}" role="region" aria-label="${escapeHtml(ariaLabel)}" tabindex="0" data-operational-table-scroll>
          <table class="operational-table ${escapeHtml(tableClass)}">
            ${colgroup || ''}
            <thead>
              <tr>${headers}</tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getVentaAccordionInfo(venta) {
    const record = normalizeVentaRecord(venta);
    const cliente = getCatalogRecordById('clientes', record.clienteId);
    const sucursal = getCatalogRecordById('sucursales', record.sucursalId);
    const label = cleanText(cliente?.nombre || record.clienteNombre) || 'Sin cliente';
    return {
      key: makeAccordionGroupKey('ventas-cliente', record.clienteId, label),
      label,
      searchText: `${label} ${sucursal?.nombre || record.sucursalNombre || ''} ${record.numeroDocumento} ${formatFacturasVentaResumen(record.facturas)} ${record.estado} ${record.observacion}`
    };
  }

  function getCompraProveedorAccordionInfo(compra) {
    const record = normalizeCompraProveedorRecord(compra);
    const proveedor = getCatalogRecordById('proveedores', record.proveedorId);
    const label = cleanText(proveedor?.nombre || record.proveedorNombre) || 'Sin proveedor';
    return {
      key: makeAccordionGroupKey('compras-proveedor', record.proveedorId, label),
      label,
      searchText: `${label} ${record.facturaReferencia} ${record.estado} ${record.observacion}`
    };
  }

  function getPagoProveedorAccordionInfo(pago) {
    const record = normalizePagoProveedorRecord(pago);
    const compra = (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [])
      .map((item) => normalizeCompraProveedorRecord(item))
      .find((item) => item.id === record.compraProveedorId);
    const proveedorId = record.proveedorId || compra?.proveedorId || '';
    const proveedor = getCatalogRecordById('proveedores', proveedorId);
    const label = cleanText(proveedor?.nombre || record.proveedorNombre || compra?.proveedorNombre) || 'Sin proveedor';
    return {
      key: makeAccordionGroupKey('pagos-proveedor', proveedorId, label),
      label,
      searchText: `${label} ${record.facturaReferencia || compra?.facturaReferencia || ''} ${record.metodoPagoNombre} ${record.cuentaBancoNombre} ${record.estado} ${record.observacion}`
    };
  }

  function getCobroAccordionInfo(cobro) {
    const record = normalizeCobroRecord(cobro);
    const venta = (Array.isArray(appData.ventas) ? appData.ventas : [])
      .map((item) => normalizeVentaRecord(item))
      .find((item) => item.id === record.ventaId);
    const clienteId = record.clienteId || venta?.clienteId || '';
    const cliente = getCatalogRecordById('clientes', clienteId);
    const label = cleanText(cliente?.nombre || record.clienteNombre || venta?.clienteNombre) || 'Sin cliente';
    return {
      key: makeAccordionGroupKey('cobros-cliente', clienteId, label),
      label,
      searchText: `${label} ${record.sucursalNombre || venta?.sucursalNombre || ''} ${record.numeroDocumento || venta?.numeroDocumento || ''} ${record.metodoPagoNombre} ${record.cuentaBancoNombre} ${record.estado} ${record.observacion}`
    };
  }

  function getGastoAccordionInfo(gasto) {
    const record = normalizeGastoRecord(gasto);
    const tipo = getCatalogRecordById('tiposGasto', record.tipoGastoId);
    const label = cleanText(tipo?.nombre || record.tipoGastoNombre) || 'Sin tipo de gasto';
    return {
      key: makeAccordionGroupKey('gastos-tipo', record.tipoGastoId, label),
      label,
      searchText: `${label} ${record.metodoPagoNombre} ${record.cuentaBancoNombre} ${record.estado} ${record.observacion}`
    };
  }

  function getAccordionStateByModule(module) {
    return {
      ventas: ventasState,
      compras: proveedoresState,
      pagos: pagosState,
      cobros: cobrosState,
      gastos: gastosState
    }[module] || null;
  }

  function getAccordionInfoByModule(module, record) {
    if (module === 'ventas') return getVentaAccordionInfo(record);
    if (module === 'compras') return getCompraProveedorAccordionInfo(record);
    if (module === 'pagos') return getPagoProveedorAccordionInfo(record);
    if (module === 'cobros') return getCobroAccordionInfo(record);
    if (module === 'gastos') return getGastoAccordionInfo(record);
    return null;
  }

  function openAccordionGroupForRecord(module, record) {
    const state = getAccordionStateByModule(module);
    const info = record ? getAccordionInfoByModule(module, record) : null;
    if (state && info?.key) state.openGroupKey = info.key;
  }

  function toggleAccordionGroup(module, key) {
    const state = getAccordionStateByModule(module);
    if (!state) return;
    const cleanKey = cleanText(key);
    state.openGroupKey = state.openGroupKey === cleanKey ? '' : cleanKey;
    renderRoute({ preserveScroll: true });
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

    const groups = buildAccordionGroups(cobros, getCobroAccordionInfo);
    ensureOpenAccordionGroup(cobrosState, groups);

    return renderAccordionGroups({
      module: 'cobros',
      groups,
      openGroupKey: cobrosState.openGroupKey,
      renderOpenGroup: (group) => renderCobrosTable(group.records, group.label)
    });
  }

  function renderCobrosTable(cobros, groupLabel = '') {
    return renderOperationalTableShell({
      shellClass: 'cobros-scroll-shell',
      wrapClass: 'cobros-list',
      ariaLabel: groupLabel ? `Cobros de ${groupLabel}` : 'Cobros de clientes registrados',
      tableClass: 'operational-table-cobros',
      headers: `
        <th>Fecha</th>
        <th>OC</th>
        <th class="amount-cell">Monto</th>
        <th>Método</th>
        <th>Banco</th>
        <th>Estado</th>
        <th class="actions-cell">Acciones</th>
      `,
      rows: cobros.map((cobro) => renderCobroCard(cobro)).join(''),
      colgroup: `
        <col style="width: 92px;">
        <col style="width: 168px;">
        <col style="width: 118px;">
        <col style="width: 116px;">
        <col style="width: 136px;">
        <col style="width: 92px;">
        <col style="width: 190px;">
      `
    });
  }

  function renderCobroCard(cobro) {
    const record = normalizeCobroRecord(cobro);
    const estadoClass = record.activo ? 'is-active' : 'is-inactive';
    const searchable = normalizeNameForCompare(`${record.clienteNombre} ${record.sucursalNombre} ${record.numeroDocumento} ${record.metodoPagoNombre} ${record.cuentaBancoNombre}`);
    return `
      <tr class="compact-record-row cobro-row ${record.activo ? 'is-active' : 'is-inactive'}" data-cobro-card data-search-text="${escapeHtml(searchable)}">
        <td data-label="Fecha"><span class="compact-primary">${escapeHtml(formatDate(record.fechaCobro))}</span></td>
        <td data-label="OC"><span class="compact-primary">${escapeHtml(record.numeroDocumento || 'Sin OC')}</span>${record.sucursalNombre ? `<small>${escapeHtml(record.sucursalNombre)}</small>` : ''}</td>
        <td data-label="Monto" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.montoCobrado))}</span></td>
        <td data-label="Método"><span>${escapeHtml(record.metodoPagoNombre || '—')}</span></td>
        <td data-label="Banco"><span>${escapeHtml(record.cuentaBancoNombre || '—')}</span></td>
        <td data-label="Estado"><span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span></td>
        <td data-label="Acciones" class="actions-cell">
          <div class="record-actions compact-row-actions">
            <button type="button" class="secondary-action compact" data-go="ventas">Ventas</button>
            ${record.activo ? `<button type="button" class="secondary-action compact" data-cobro-edit="${escapeHtml(record.id)}">Editar</button>` : ''}
            ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-cobro-annul="${escapeHtml(record.id)}">Anular</button>` : ''}
          </div>
        </td>
      </tr>
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

  function buildCobroFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const ventaId = cleanText(formData.get('ventaId')) || existingRecord?.ventaId || '';
    const venta = appData.ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const cliente = venta ? getCatalogRecordById('clientes', venta.clienteId) : null;
    const sucursal = venta ? getCatalogRecordById('sucursales', venta.sucursalId) : null;
    const metodo = getCatalogRecordById('metodosPago', cleanText(formData.get('metodoPagoId')));
    const methodValue = metodo?.id || metodo?.nombre || formData.get('metodoPagoId');
    const requiredBankType = getBankTypeForPaymentMethod(methodValue);
    const cuenta = requiredBankType ? getValidBankForPaymentMethod(methodValue, formData.get('cuentaBancoId'), existingRecord) : null;

    return normalizeCobroRecord({
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('cobro'),
      ventaId,
      fechaCobro: toDateInputValue(formData.get('fechaCobro')),
      clienteId: venta?.clienteId || existingRecord?.clienteId || '',
      clienteNombre: cliente?.nombre || existingRecord?.clienteNombre || '',
      sucursalId: venta?.sucursalId || existingRecord?.sucursalId || '',
      sucursalNombre: sucursal?.nombre || existingRecord?.sucursalNombre || '',
      numeroDocumento: venta?.numeroDocumento || existingRecord?.numeroDocumento || '',
      montoCobrado: parseMoney(formData.get('montoCobrado')),
      metodoPagoId: metodo?.id || existingRecord?.metodoPagoId || '',
      metodoPagoNombre: metodo?.nombre || existingRecord?.metodoPagoNombre || '',
      cuentaBancoId: requiredBankType ? (cuenta?.id || '') : '',
      cuentaBancoNombre: requiredBankType ? (cuenta?.nombre || '') : '',
      cuentaBancoTipo: requiredBankType ? normalizeBankType(cuenta?.tipo) : '',
      observacion: cleanText(formData.get('observacion')),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      estado: typeof existingRecord?.activo === 'boolean' && !existingRecord.activo ? 'Anulado' : 'Registrado',
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    });
  }

  function validateCobroRecord(record, existingRecord = null) {
    const venta = (Array.isArray(appData.ventas) ? appData.ventas : []).map((item) => normalizeVentaRecord(item)).find((item) => item.id === record.ventaId);
    if (!venta || !venta.activo) return 'Selecciona una OC activa con saldo por cobrar.';
    const currentAmount = existingRecord && existingRecord.ventaId === record.ventaId && existingRecord.activo !== false ? normalizeCobroRecord(existingRecord).montoCobrado : 0;
    const saldoPermitido = roundMoney(venta.saldoPorCobrar + currentAmount);
    if (saldoPermitido <= 0) return 'La OC seleccionada no tiene saldo disponible para este cobro.';
    if (!record.fechaCobro) return 'La fecha real de cobro es obligatoria.';
    if (Number.isNaN(parseMoney(record.montoCobrado)) || record.montoCobrado <= 0) return 'El monto cobrado debe ser mayor que cero.';
    if (record.montoCobrado > saldoPermitido) return `El cobro no puede superar el saldo permitido de ${formatMoney(saldoPermitido)}.`;
    if (!record.metodoPagoId || !getCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId && (item.activo || existingRecord?.metodoPagoId === item.id))) return 'Selecciona un método de pago válido.';
    const bankError = validateBankForPaymentMethod(record, existingRecord);
    if (bankError) return bankError;
    return '';
  }

  function saveCobroRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.cobros) ? appData.cobros : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;

    if (existingRecord && normalizeCobroRecord(existingRecord).activo === false) {
      cobrosState.message = 'No se puede editar un cobro anulado.';
      cobrosState.messageType = 'error';
      renderRoute();
      return;
    }

    const newRecord = buildCobroFromForm(form, existingRecord);
    const validationError = validateCobroRecord(newRecord, existingRecord);

    if (validationError) {
      cobrosState.message = validationError;
      cobrosState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaCobro, existingRecord ? 'Actualizar este cobro' : 'Registrar este cobro')) return;

    if (existingRecord) {
      appData.cobros = records.map((record) => record.id === existingId ? newRecord : record);
      recalculateVentaById(existingRecord.ventaId);
      recalculateVentaById(newRecord.ventaId);
      cobrosState.message = `Cobro actualizado en OC ${newRecord.numeroDocumento}: ${formatMoney(newRecord.montoCobrado)}.`;
    } else {
      appData.cobros = [newRecord, ...records];
      recalculateVentaById(newRecord.ventaId);
      cobrosState.message = `Cobro aplicado a OC ${newRecord.numeroDocumento}: ${formatMoney(newRecord.montoCobrado)}.`;
    }

    const venta = appData.ventas.find((record) => record.id === newRecord.ventaId);
    cobrosState.selectedVentaId = venta?.saldoPorCobrar > 0 ? newRecord.ventaId : '';
    cobrosState.focusVentaId = newRecord.ventaId;
    openAccordionGroupForRecord('cobros', newRecord);
    cobrosState.editingId = null;
    cobrosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Cobros',
      action: existingRecord ? 'Editado' : 'Creado',
      entityType: 'Cobro',
      entityRef: `OC ${newRecord.numeroDocumento}`,
      amount: newRecord.montoCobrado,
      detail: buildActivityDetail([existingRecord ? 'Cobro editado' : 'Cobro registrado', `OC ${newRecord.numeroDocumento}`, formatMoney(newRecord.montoCobrado)]),
      source: 'local'
    });
    renderRoute();
  }

  function editCobroRecord(cobroId) {
    const record = (Array.isArray(appData.cobros) ? appData.cobros : []).find((item) => item.id === cobroId);
    if (!record) return;
    const normalized = normalizeCobroRecord(record);
    if (!normalized.activo) {
      cobrosState.message = 'Los cobros anulados quedan visibles, pero no se editan.';
      cobrosState.messageType = 'error';
      renderRoute();
      return;
    }
    cobrosState.editingId = cobroId;
    cobrosState.focusVentaId = normalized.ventaId;
    openAccordionGroupForRecord('cobros', normalized);
    cobrosState.message = null;
    renderRoute();
  }

  function clearCobroForm() {
    cobrosState.editingId = null;
    cobrosState.message = null;
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
    const cleanVentaId = cleanText(ventaId);
    cobrosState.selectedVentaId = cleanVentaId;
    cobrosState.focusVentaId = cleanVentaId;
    const existingCobro = getCobrosOrdenados().find((record) => record.ventaId === cleanVentaId);
    if (existingCobro) openAccordionGroupForRecord('cobros', existingCobro);
    cobrosState.message = null;
    renderRoute();
  }

  function fillCobroFullAmount(form, ventaId) {
    const venta = appData.ventas.map((record) => normalizeVentaRecord(record)).find((record) => record.id === ventaId);
    const amountInput = form.querySelector('input[name="montoCobrado"]');
    if (venta && amountInput) amountInput.value = String(venta.saldoPorCobrar);
  }

  function setupAccordionSearch(searchSelector, module, rowSelector) {
    const search = viewRoot.querySelector(searchSelector);
    if (!search) return;
    search.addEventListener('input', () => {
      const query = normalizeNameForCompare(search.value);
      viewRoot.querySelectorAll(`[data-accordion-item="${module}"]`).forEach((item) => {
        const text = item.getAttribute('data-accordion-search') || '';
        item.hidden = Boolean(query) && !text.includes(query);
      });
      viewRoot.querySelectorAll(rowSelector).forEach((row) => {
        const text = row.getAttribute('data-search-text') || '';
        row.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }

  function setupCobrosSearch() {
    setupAccordionSearch('[data-cobro-search]', 'cobros', '[data-cobro-card]');
  }


  function renderProveedoresCompras() {
    const compras = getComprasProveedoresOrdenadas();
    const proveedoresActivos = getActiveCatalogRecords('proveedores');
    const editingRecord = proveedoresState.editingId ? appData.comprasProveedores.find((record) => record.id === proveedoresState.editingId) : null;
    const totals = getComprasProveedoresTotals();
    const comprasAjustables = compras.filter((compra) => compra.activo && compra.saldoPorPagar > 0);
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
          <article class="metric-card"><span>Original activo</span><strong>${escapeHtml(formatMoney(totals.totalCompra))}</strong></article>
          <article class="metric-card"><span>Ajustes aplicados</span><strong>-${escapeHtml(formatMoney(totals.totalAjustes))}</strong></article>
          <article class="metric-card"><span>Ajustado</span><strong>${escapeHtml(formatMoney(totals.totalAjustado))}</strong></article>
          <article class="metric-card"><span>Pagado</span><strong>${escapeHtml(formatMoney(totals.totalPagado))}</strong></article>
          <article class="metric-card"><span>Saldo por pagar</span><strong>${escapeHtml(formatMoney(totals.saldoPorPagar))}</strong></article>
          <article class="metric-card"><span>Pendientes</span><strong>${totals.pendientes}</strong></article>
          <article class="metric-card"><span>Vencidas</span><strong>${totals.vencidas}</strong></article>
          <article class="metric-card"><span>Anuladas</span><strong>${totals.anuladas}</strong></article>
        </section>

        <div class="compras-layout">
          <div class="compras-form-stack">
            <article class="panel-card compra-form-card">
              <div class="section-title-row">
                <div>
                  <span class="eyebrow mini">Nueva deuda</span>
                  <h2>Crear compra / deuda</h2>
                </div>
              </div>
              <p class="muted-text">Los pagos a proveedor se registran en su propio módulo; aquí queda la deuda/factura base con su saldo actualizado.</p>
              ${renderCompraProveedorForm(null, proveedoresActivos, missingProviders, proveedoresState.quickCapture)}
            </article>

            <article class="panel-card compra-ajuste-card">
              <div class="section-title-row">
                <div>
                  <span class="eyebrow mini">Ajustes / notas</span>
                  <h2>Registrar ajuste</h2>
                </div>
              </div>
              <p class="muted-text">Reduce el saldo de una factura existente sin crear pago, caja ni banco. Aquí se descuenta el faltante; el dinero no se teletransporta.</p>
              ${renderProveedorAjusteForm(comprasAjustables)}
            </article>
          </div>

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
        ${editingRecord ? renderEditModal(getCompraModalId(), 'Editar compra / deuda', 'Actualiza la factura o referencia sin borrar pagos ligados ni historial.', renderCompraProveedorForm(editingRecord, proveedoresActivos, missingProviders)) : ''}
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

  function renderProveedorAjusteForm(comprasAjustables) {
    const compras = Array.isArray(comprasAjustables) ? comprasAjustables.map((record) => normalizeCompraProveedorRecord(record)).filter((record) => record.activo) : [];
    if (!compras.length) {
      return `
        <div class="empty-state compact-empty">
          <strong>No hay compras activas para ajustar.</strong>
          <p>Primero registra una compra/factura de proveedor. El ajuste siempre necesita documento padre; ajuste huérfano, problema con sombrero.</p>
        </div>
      `;
    }

    const selectedCompra = compras.find((compra) => compra.id === proveedoresState.selectedAjusteCompraId) || compras[0];
    const selectedProveedorId = selectedCompra?.proveedorId || '';
    const proveedores = Array.from(new Map(compras.map((compra) => {
      const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
      const label = cleanText(proveedor?.nombre || compra.proveedorNombre) || 'Proveedor no encontrado';
      return [compra.proveedorId || label, { id: compra.proveedorId, nombre: label }];
    })).values()).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

    return `
      <form class="ajuste-form" data-ajuste-proveedor-form novalidate>
        <div class="form-grid ajuste-form-grid">
          <label class="form-field">
            <span>Proveedor <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="proveedorId" required data-ajuste-provider>
              <option value="">Seleccionar proveedor</option>
              ${proveedores.map((proveedor) => `<option value="${escapeHtml(proveedor.id)}" ${proveedor.id === selectedProveedorId ? 'selected' : ''}>${escapeHtml(proveedor.nombre)}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Referencia <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="compraProveedorId" required data-ajuste-compra>
              <option value="">Seleccionar factura</option>
              ${compras.map((compra) => {
                const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
                const label = `${proveedor?.nombre || compra.proveedorNombre || 'Proveedor'} · ${compra.facturaReferencia || 'Sin referencia'} · Saldo ${formatMoney(compra.saldoPorPagar)}`;
                return `<option value="${escapeHtml(compra.id)}" data-provider-id="${escapeHtml(compra.proveedorId)}" ${compra.id === selectedCompra.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
              }).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Fecha ajuste <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fecha" value="${escapeHtml(todayInputValue())}" required />
          </label>
          <label class="form-field">
            <span>Tipo de ajuste <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="tipo" required>
              ${COMPRA_AJUSTE_TYPES.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Monto ajuste C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="monto" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-ajuste-monto />
          </label>
        </div>
        <div class="formula-card ajuste-preview" aria-live="polite" data-ajuste-preview>
          ${renderAjustePreview(selectedCompra)}
        </div>
        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="2" placeholder="Ej. Broches no disponibles"></textarea>
        </label>
        <div class="form-actions">
          <button type="submit" class="card-action">Registrar ajuste</button>
        </div>
      </form>
    `;
  }

  function renderAjustePreview(compraRecord) {
    const compra = normalizeCompraProveedorRecord(compraRecord || {});
    return `
      <strong>${escapeHtml(compra.facturaReferencia || 'Factura sin referencia')}</strong>
      <div class="formula-grid">
        <span>Original</span><b>${escapeHtml(formatMoney(compra.totalCompra))}</b>
        <span>Ajustes actuales</span><b>${compra.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(compra.totalAjustes))}</b>
        <span>Ajustado</span><b>${escapeHtml(formatMoney(compra.totalAjustado))}</b>
        <span>Pagado</span><b>${escapeHtml(formatMoney(compra.totalPagado))}</b>
        <span>Saldo disponible</span><b>${escapeHtml(formatMoney(compra.saldoPorPagar))}</b>
      </div>
    `;
  }

  function renderCompraProveedorForm(record, proveedoresActivos, missingProviders, quickCapture = null) {
    const draft = !record && isPlainObject(quickCapture) ? quickCapture : {};
    const selectedProveedorId = record?.proveedorId || cleanText(draft.proveedorId);
    const selectedTerms = selectedProveedorId ? getCatalogPaymentTerms('proveedores', selectedProveedorId) : { condicionPago: '', diasCredito: 0 };
    const condicionPagoSnapshot = selectedProveedorId
      ? selectedTerms.condicionPago
      : normalizePaymentCondition(record?.condicionPagoSnapshot || draft.condicionPagoSnapshot || '');
    const isContado = Boolean(selectedProveedorId) && condicionPagoSnapshot === 'Contado';
    const fechaCompra = record?.fechaCompra || toDateInputValue(draft.fechaCompra) || todayInputValue();
    const draftDias = draft.diasCredito ?? '';
    const diasCredito = isContado ? 0 : (record ? (record.diasCredito ?? '') : (draftDias !== '' ? draftDias : (selectedTerms.diasCredito || '')));
    const fechaVencimiento = isContado
      ? fechaCompra
      : (record?.fechaVencimiento || toDateInputValue(draft.fechaVencimiento) || addDaysToDate(fechaCompra, Number(diasCredito) || 0) || fechaCompra);
    const previewSource = record || { totalCompra: draft.totalCompra || 0, totalPagado: 0 };
    const calculations = getCompraProveedorCalculations(previewSource);
    const facturaReferencia = record?.facturaReferencia || cleanText(draft.facturaReferencia);
    const totalCompraValue = record ? record.totalCompra : draft.totalCompra;
    const observacion = record?.observacion || cleanText(draft.observacion);

    return `
      <form class="compra-form" data-compra-form data-current-pagado="${escapeHtml(record?.totalPagado || 0)}" data-current-ajustes="${escapeHtml(JSON.stringify(record?.ajustes || []))}" novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record?.id || '')}" />
        <div class="form-grid">
          <label class="form-field">
            <span>Proveedor <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="proveedorId" required ${missingProviders ? 'disabled' : ''} data-compra-provider>
              <option value="">Seleccionar proveedor</option>
              ${proveedoresActivos.map((proveedor) => `<option value="${escapeHtml(proveedor.id)}" ${proveedor.id === selectedProveedorId ? 'selected' : ''}>${escapeHtml(proveedor.nombre || 'Proveedor sin nombre')} · ${escapeHtml(formatPaymentTermsLabel(proveedor))}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Referencia <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="text" name="facturaReferencia" value="${escapeHtml(facturaReferencia)}" placeholder="Ej. FAC-001 / REF-001" required autocomplete="off" />
          </label>
          <label class="form-field">
            <span>Fecha compra <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaCompra" value="${escapeHtml(fechaCompra)}" required data-compra-date />
          </label>
          <label class="form-field">
            <span>Días de crédito</span>
            <input type="number" name="diasCredito" value="${escapeHtml(diasCredito)}" min="0" step="1" inputmode="numeric" data-compra-days ${isContado ? 'readonly' : ''} />
          </label>
          <label class="form-field">
            <span>Fecha vencimiento <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaVencimiento" value="${escapeHtml(fechaVencimiento)}" required data-compra-due ${isContado ? 'readonly' : ''} />
          </label>
          <label class="form-field">
            <span>Total compra/deuda C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="totalCompra" value="${escapeHtml(formatNumberInput(totalCompraValue))}" min="0" step="0.01" inputmode="decimal" placeholder="0.00" required data-compra-calc />
          </label>
        </div>

        <div class="formula-card" aria-live="polite">
          <strong>Saldo por pagar = Ajustado - Pagado</strong>
          <div class="formula-grid">
            <span>Original</span><b data-compra-preview-total>${escapeHtml(formatMoney(calculations.totalCompra))}</b>
            <span>Ajustes / notas</span><b data-compra-preview-ajustes>${calculations.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(calculations.totalAjustes))}</b>
            <span>Ajustado</span><b data-compra-preview-ajustado>${escapeHtml(formatMoney(calculations.totalAjustado))}</b>
            <span>Pagado</span><b data-compra-preview-pagado>${escapeHtml(formatMoney(record?.totalPagado || 0))}</b>
            <span>Saldo por pagar</span><b data-compra-preview-saldo>${escapeHtml(formatMoney(calculations.saldoPorPagar))}</b>
          </div>
        </div>

        ${renderCompraContadoPaymentBlock(record || draft, selectedProveedorId, isContado)}

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas de la compra, factura o deuda">${escapeHtml(observacion)}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${missingProviders ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar compra/deuda'}</button>
          <button type="button" class="secondary-action" data-compra-clear>${record ? 'Cancelar' : 'Limpiar'}</button>
        </div>
      </form>
    `;
  }

  function renderCompraContadoPaymentBlock(source, selectedProveedorId, isContado) {
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const selectedMethodId = cleanText(source?.metodoPagoContadoId || source?.metodoPagoContado);
    const selectedBankId = cleanText(source?.bancoPagoContadoId || source?.bancoPagoContado);
    const selectedObservation = cleanText(source?.observacionPagoContado || source?.notaPagoContado);
    const requiredBankType = getBankTypeForPaymentMethod(selectedMethodId);
    const cuentas = getSelectableBankRecords(selectedBankId);
    const hasMatchingBanks = Boolean(requiredBankType) && cuentas.some((banco) => bankMatchesType(banco, requiredBankType));
    const bankDisabled = !requiredBankType || !hasMatchingBanks;
    const statusText = selectedProveedorId
      ? (isContado ? 'Contado · vencimiento igual a fecha de compra' : 'Crédito · sin pago inmediato')
      : 'Selecciona proveedor para detectar condición de pago';

    return `
      <section class="contado-payment-block${isContado ? '' : ' is-hidden'}" data-contado-payment-block data-cash-status="${isContado ? 'contado' : 'credito'}">
        <div class="section-title-row compact-title-row">
          <div>
            <span class="eyebrow mini">${escapeHtml(statusText)}</span>
            <h3>Pago de contado</h3>
          </div>
          <span class="state-pill is-pending" data-contado-payment-pill>${isContado ? 'Preparación' : 'No aplica'}</span>
        </div>
        <p class="muted-text">Estos datos quedan guardados para la etapa de pago automático. En esta etapa todavía no se crea ningún pago.</p>
        <div class="form-grid contado-payment-grid">
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoContadoId" data-contado-payment-method ${isContado ? 'required' : ''} ${!metodosActivos.length ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${metodo.id === selectedMethodId ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
            ${!metodosActivos.length ? '<small class="compact-note">Configura métodos de pago activos en Catálogos.</small>' : ''}
          </label>
          <label class="form-field contado-bank-field${requiredBankType ? '' : ' is-hidden'}" data-contado-bank-field>
            <span>Banco / cuenta <span class="required-dot${requiredBankType && hasMatchingBanks ? '' : ' is-hidden'}" data-contado-bank-required-dot aria-label="obligatorio">*</span></span>
            <select name="bancoPagoContadoId" data-contado-bank-select ${requiredBankType && hasMatchingBanks && isContado ? 'required' : ''} ${bankDisabled ? 'disabled' : ''}>
              <option value="">Seleccionar banco / cuenta</option>
              ${cuentas.map((banco) => {
                const bankType = normalizeBankType(banco.tipo);
                const matchesType = requiredBankType && bankType === requiredBankType;
                const optionHidden = requiredBankType && !matchesType ? ' hidden disabled' : '';
                return `<option value="${escapeHtml(banco.id)}" data-bank-type="${escapeHtml(bankType)}"${optionHidden} ${banco.id === selectedBankId ? 'selected' : ''}>${escapeHtml(banco.nombre || 'Banco sin nombre')} · ${escapeHtml(getBankTypeDisplay(banco))}${banco.activo ? '' : ' · inactivo'}</option>`;
              }).join('')}
            </select>
            <small class="compact-note bank-empty-message${requiredBankType && !hasMatchingBanks ? '' : ' is-hidden'}" data-contado-bank-empty-message>${escapeHtml(getBankEmptyMessage(requiredBankType))}</small>
          </label>
        </div>
        <label class="form-field">
          <span>Nota de pago de contado</span>
          <textarea name="observacionPagoContado" rows="2" placeholder="Observación opcional para el futuro pago automático">${escapeHtml(selectedObservation)}</textarea>
        </label>
      </section>
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

    const groups = buildAccordionGroups(compras, getCompraProveedorAccordionInfo);
    ensureOpenAccordionGroup(proveedoresState, groups);

    return renderAccordionGroups({
      module: 'compras',
      groups,
      openGroupKey: proveedoresState.openGroupKey,
      renderOpenGroup: (group) => renderComprasProveedoresTable(group.records, group.label)
    });
  }

  function renderComprasProveedoresTable(compras, groupLabel = '') {
    return renderOperationalTableShell({
      shellClass: 'compras-scroll-shell',
      wrapClass: 'compras-list',
      ariaLabel: groupLabel ? `Compras y deudas registradas de ${groupLabel}` : 'Compras y deudas registradas',
      tableClass: 'operational-table-compras',
      headers: `
        <th>Referencia</th>
        <th>Compra</th>
        <th>Vence</th>
        <th class="amount-cell">Original</th>
        <th class="amount-cell">Ajustes</th>
        <th class="amount-cell">Ajustado</th>
        <th class="amount-cell">Pagado</th>
        <th class="amount-cell">Saldo</th>
        <th>Estado</th>
        <th class="actions-cell">Acciones</th>
      `,
      rows: compras.map((compra) => renderCompraProveedorCard(compra)).join(''),
      colgroup: `
        <col style="width: 164px;">
        <col style="width: 90px;">
        <col style="width: 90px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 132px;">
        <col style="width: 118px;">
        <col style="width: 118px;">
        <col style="width: 92px;">
        <col style="width: 260px;">
      `
    });
  }

  function renderCompraProveedorCard(compra) {
    const record = normalizeCompraProveedorRecord(compra);
    const proveedor = getCatalogRecordById('proveedores', record.proveedorId);
    const estadoClass = getEstadoClass(record.estado);
    const proveedorNombre = proveedor?.nombre || record.proveedorNombre || 'Proveedor no encontrado';

    const ajustesRow = renderCompraAjustesCompactRow(record, 10);
    return `
      <tr class="compact-record-row compra-row ${record.activo ? 'is-active' : 'is-inactive'}">
        <td data-label="Referencia"><span class="compact-primary">${escapeHtml(record.facturaReferencia || 'Sin referencia')}</span></td>
        <td data-label="Compra"><span>${escapeHtml(formatDate(record.fechaCompra))}</span></td>
        <td data-label="Vence"><span>${escapeHtml(formatDate(record.fechaVencimiento))}</span></td>
        <td data-label="Original" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.totalCompra))}</span></td>
        <td data-label="Ajustes" class="amount-cell"><span>${record.totalAjustes > 0 ? '-' : ''}${escapeHtml(formatMoney(record.totalAjustes))}</span></td>
        <td data-label="Ajustado" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.totalAjustado))}</span></td>
        <td data-label="Pagado" class="amount-cell"><span>${escapeHtml(formatMoney(record.totalPagado))}</span></td>
        <td data-label="Saldo" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.saldoPorPagar))}</span></td>
        <td data-label="Estado"><span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span></td>
        <td data-label="Acciones" class="actions-cell">
          <div class="record-actions compact-row-actions">
            ${record.activo && record.saldoPorPagar > 0 ? `<button type="button" class="card-action compact" data-pago-start="${escapeHtml(record.id)}">Pagar</button>` : ''}
            ${record.activo && record.saldoPorPagar > 0 ? `<button type="button" class="secondary-action compact" data-ajuste-start="${escapeHtml(record.id)}">Ajustar</button>` : ''}
            <button type="button" class="secondary-action compact" data-compra-edit="${escapeHtml(record.id)}">Editar</button>
            <button type="button" class="secondary-action compact" data-history-compra="${escapeHtml(record.id)}">Historial</button>
            ${canCurrentRole('annulMovements') ? `<button type="button" class="${record.activo ? 'danger-action' : 'card-action'} compact" data-compra-toggle="${escapeHtml(record.id)}">${record.activo ? 'Anular' : 'Reactivar'}</button>` : ''}
          </div>
        </td>
      </tr>
      ${ajustesRow}
    `;
  }

  function renderCompraAjustesCompactRow(compra, colspan = 10) {
    const record = normalizeCompraProveedorRecord(compra);
    const ajustes = normalizeCompraProveedorAjustesList(record.ajustes);
    if (!ajustes.length) return '';
    return `
      <tr class="compact-adjustments-row">
        <td colspan="${colspan}">
          <div class="ajustes-inline-history">
            <strong>Ajustes:</strong>
            ${ajustes.map((ajuste) => `
              <span class="ajuste-chip ${ajuste.activo ? '' : 'is-inactive'}">
                ${escapeHtml(formatDate(ajuste.fecha))} — ${escapeHtml(ajuste.tipo)} — ${ajuste.activo ? '-' : ''}${escapeHtml(formatMoney(ajuste.monto))}${ajuste.observacion ? ` — ${escapeHtml(ajuste.observacion)}` : ''}
                ${ajuste.activo && canCurrentRole('annulMovements') ? `<button type="button" class="mini-inline-action" data-ajuste-delete="${escapeHtml(record.id)}" data-ajuste-id="${escapeHtml(ajuste.id)}">Eliminar</button>` : ''}
              </span>
            `).join('')}
          </div>
        </td>
      </tr>
    `;
  }

  function formatCompraAjustesExport(ajustesSource) {
    const ajustes = normalizeCompraProveedorAjustesList(ajustesSource).filter((ajuste) => ajuste.activo);
    return ajustes.map((ajuste) => `${formatDate(ajuste.fecha)} · ${ajuste.tipo} · ${formatMoney(ajuste.monto)}${ajuste.observacion ? ` · ${ajuste.observacion}` : ''}`).join(' | ');
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
      totals.totalAjustes = roundMoney(totals.totalAjustes + compra.totalAjustes);
      totals.totalAjustado = roundMoney(totals.totalAjustado + compra.totalAjustado);
      totals.totalPagado = roundMoney(totals.totalPagado + compra.totalPagado);
      totals.saldoPorPagar = roundMoney(totals.saldoPorPagar + compra.saldoPorPagar);
      if (compra.estado === 'Pendiente') totals.pendientes += 1;
      if (compra.estado === 'Vencido') totals.vencidas += 1;
      if (compra.estado === 'Pagado') totals.pagadas += 1;
      return totals;
    }, { activas: 0, anuladas: 0, pendientes: 0, vencidas: 0, pagadas: 0, totalCompra: 0, totalAjustes: 0, totalAjustado: 0, totalPagado: 0, saldoPorPagar: 0 });
  }

  function buildCompraProveedorFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const proveedorId = cleanText(formData.get('proveedorId'));
    const proveedor = getCatalogRecordById('proveedores', proveedorId);
    const fechaCompra = toDateInputValue(formData.get('fechaCompra'));
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const isContado = proveedorId && terms.condicionPago === 'Contado';
    const diasCreditoRaw = cleanText(formData.get('diasCredito'));
    let diasCredito = isContado ? 0 : parsePositiveInteger(diasCreditoRaw);
    if (!isContado && !diasCreditoRaw && proveedorId) diasCredito = terms.diasCredito;
    const fechaVencimiento = isContado
      ? fechaCompra
      : (toDateInputValue(formData.get('fechaVencimiento')) || addDaysToDate(fechaCompra, Number.isNaN(diasCredito) ? 0 : diasCredito));
    const metodoPagoContadoId = isContado ? cleanText(formData.get('metodoPagoContadoId')) : '';
    const metodoPagoContado = metodoPagoContadoId ? findPaymentMethodByValue(metodoPagoContadoId) : null;
    const bancoPagoContadoId = isContado ? cleanText(formData.get('bancoPagoContadoId')) : '';
    const bancoPagoContado = bancoPagoContadoId ? getCatalogRecordById('cuentasBancos', bancoPagoContadoId) : null;
    const totalCompra = parseMoney(formData.get('totalCompra'));
    const manualPagado = existingRecord?.id ? calculateManualPagadoForCompra(existingRecord.id, appData.pagosProveedores) : 0;
    const expectedPagado = isContado ? (Number.isNaN(totalCompra) ? 0 : totalCompra) : manualPagado;
    const base = {
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('compraProveedor'),
      proveedorId,
      proveedorNombre: proveedor?.nombre || existingRecord?.proveedorNombre || '',
      facturaReferencia: cleanText(formData.get('facturaReferencia')),
      fechaCompra,
      diasCredito,
      fechaVencimiento,
      totalCompra,
      totalPagado: expectedPagado,
      condicionPagoSnapshot: terms.condicionPago,
      metodoPagoContadoId,
      metodoPagoContadoNombre: metodoPagoContado?.nombre || '',
      bancoPagoContadoId,
      bancoPagoContadoNombre: bancoPagoContado?.nombre || '',
      bancoPagoContadoTipo: bancoPagoContado ? normalizeBankType(bancoPagoContado.tipo) : '',
      observacionPagoContado: isContado ? cleanText(formData.get('observacionPagoContado')) : '',
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
      ajustes: normalizeCompraProveedorAjustesList(base.ajustes),
      totalAjustes: calculations.totalAjustes,
      totalAjustado: calculations.totalAjustado,
      totalPagado: calculations.totalPagado,
      saldoPorPagar: calculations.saldoPorPagar,
      estado: determineCompraProveedorEstado(base)
    };
  }

  function validateCompraContadoPayment(record, existingRecord = null) {
    if (record.condicionPagoSnapshot !== 'Contado') return '';
    const activeMethods = getActiveCatalogRecords('metodosPago');
    if (!activeMethods.length) return 'Configura al menos un método de pago activo para compras de contado.';
    if (!record.metodoPagoContadoId) return 'Selecciona método de pago para la compra de contado.';
    const selectedMethod = activeMethods.find((method) => method.id === record.metodoPagoContadoId);
    if (!selectedMethod) return 'Selecciona un método de pago activo para la compra de contado.';
    const requiredBankType = getBankTypeForPaymentMethod(record.metodoPagoContadoId || record.metodoPagoContadoNombre);
    if (!requiredBankType) return '';
    const banks = getSelectableBankRecordsByType(requiredBankType, existingRecord?.bancoPagoContadoId);
    if (!banks.length) return getBankEmptyMessage(requiredBankType);
    const validBank = banks.some((bank) => bank.id === record.bancoPagoContadoId);
    if (!validBank) return `Selecciona banco / cuenta para ${requiredBankType}.`;
    return '';
  }

  function validateCompraProveedorRecord(record, existingRecord = null) {
    if (!record.proveedorId || !getActiveCatalogRecords('proveedores').some((proveedor) => proveedor.id === record.proveedorId)) return 'Selecciona un proveedor activo desde Catálogos.';
    if (!record.facturaReferencia) return 'La referencia es obligatoria.';
    if (!record.fechaCompra) return 'La fecha de compra es obligatoria.';
    if (!record.fechaVencimiento) return 'La fecha de vencimiento es obligatoria.';
    if (Number.isNaN(parsePositiveInteger(record.diasCredito))) return 'Días de crédito debe ser cero o un número entero positivo.';
    if (record.condicionPagoSnapshot === 'Contado' && Number(record.diasCredito) !== 0) return 'En compras de contado, días de crédito debe ser 0.';
    if (record.condicionPagoSnapshot === 'Contado' && record.fechaVencimiento !== record.fechaCompra) return 'En compras de contado, el vencimiento debe ser igual a la fecha de compra.';
    if (Number.isNaN(parseMoney(record.totalCompra)) || record.totalCompra <= 0) return 'Total compra/deuda debe ser un número mayor que cero.';
    if (Number.isNaN(parseMoney(record.totalPagado)) || record.totalPagado < 0) return 'Pagado no puede ser negativo.';
    if (record.saldoPorPagar < 0) return 'El saldo por pagar no puede ser negativo.';
    const contadoError = validateCompraContadoPayment(record, existingRecord);
    if (contadoError) return contadoError;
    return '';
  }

  function buildCompraDraftFromForm(form) {
    const formData = new FormData(form);
    const proveedorId = cleanText(formData.get('proveedorId'));
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const isContado = proveedorId && terms.condicionPago === 'Contado';
    const fechaCompra = toDateInputValue(formData.get('fechaCompra')) || todayInputValue();
    const diasCredito = isContado ? 0 : parsePositiveInteger(formData.get('diasCredito'));
    return {
      proveedorId,
      facturaReferencia: cleanText(formData.get('facturaReferencia')),
      fechaCompra,
      diasCredito: Number.isNaN(diasCredito) ? 0 : diasCredito,
      fechaVencimiento: isContado ? fechaCompra : (toDateInputValue(formData.get('fechaVencimiento')) || addDaysToDate(fechaCompra, Number.isNaN(diasCredito) ? 0 : diasCredito) || fechaCompra),
      totalCompra: cleanText(formData.get('totalCompra')),
      condicionPagoSnapshot: terms.condicionPago,
      metodoPagoContadoId: isContado ? cleanText(formData.get('metodoPagoContadoId')) : '',
      bancoPagoContadoId: isContado ? cleanText(formData.get('bancoPagoContadoId')) : '',
      observacionPagoContado: isContado ? cleanText(formData.get('observacionPagoContado')) : '',
      observacion: cleanText(formData.get('observacion'))
    };
  }

  function saveCompraProveedorRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;
    const newRecord = buildCompraProveedorFromForm(form, existingRecord);
    const validationError = validateCompraProveedorRecord(newRecord, existingRecord);

    if (validationError) {
      proveedoresState.quickCapture = buildCompraDraftFromForm(form);
      proveedoresState.message = validationError;
      proveedoresState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaCompra, existingRecord ? 'Actualizar esta compra/deuda' : 'Crear esta compra/deuda')) return;

    let syncResult = { action: 'none', pago: null };
    if (existingRecord) {
      appData.comprasProveedores = records.map((record) => record.id === existingId ? newRecord : record);
      syncResult = syncAutoPagoCompraContado(newRecord);
      proveedoresState.quickCapture = null;
      proveedoresState.message = `Compra/deuda ${newRecord.facturaReferencia} actualizada.`;
    } else {
      appData.comprasProveedores = [newRecord, ...records];
      syncResult = syncAutoPagoCompraContado(newRecord);
      proveedoresState.quickCapture = buildCompraQuickCaptureFromSavedRecord(newRecord);
      proveedoresState.message = `Compra/deuda ${newRecord.facturaReferencia} guardada. Lista la siguiente factura del mismo proveedor y fecha.`;
    }

    if (newRecord.condicionPagoSnapshot === 'Contado') {
      if (syncResult.action === 'created') proveedoresState.message = `Compra de contado ${newRecord.facturaReferencia} guardada y pago automático aplicado.`;
      if (syncResult.action === 'updated') proveedoresState.message = `Compra de contado ${newRecord.facturaReferencia} actualizada y pago automático sincronizado.`;
    } else if (syncResult.action === 'annulled') {
      proveedoresState.message = `Compra/deuda ${newRecord.facturaReferencia} actualizada; pago automático anterior quedó anulado.`;
    }

    proveedoresState.editingId = null;
    const savedRecord = appData.comprasProveedores.find((record) => record.id === newRecord.id) || newRecord;
    openAccordionGroupForRecord('compras', savedRecord);
    if (syncResult.pago) openAccordionGroupForRecord('pagos', syncResult.pago);
    proveedoresState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Proveedores / Compras',
      action: existingRecord ? 'Editado' : 'Creado',
      entityType: 'Compra',
      entityRef: newRecord.facturaReferencia,
      amount: newRecord.totalAjustado || newRecord.totalCompra,
      detail: buildActivityDetail([existingRecord ? 'Compra editada' : 'Compra registrada', newRecord.facturaReferencia, formatMoney(newRecord.totalAjustado || newRecord.totalCompra)]),
      source: 'local'
    });
    if (syncResult.pago && (syncResult.action === 'created' || syncResult.action === 'updated')) {
      registerActivity({
        module: 'Pagos',
        action: syncResult.action === 'created' ? 'Creado' : 'Editado',
        entityType: 'Pago automático',
        entityRef: newRecord.facturaReferencia,
        amount: syncResult.pago.montoPagado,
        detail: buildActivityDetail(['Pago automático de contado', newRecord.facturaReferencia, formatMoney(syncResult.pago.montoPagado)]),
        source: 'sistema'
      });
    }
    renderRoute();
  }

  function editCompraProveedorRecord(recordId) {
    const record = appData.comprasProveedores.find((item) => item.id === recordId);
    if (!record) return;
    proveedoresState.editingId = recordId;
    proveedoresState.quickCapture = null;
    openAccordionGroupForRecord('compras', record);
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

    let toggledRecord = null;
    appData.comprasProveedores = records.map((item) => {
      if (item.id !== recordId) return item;
      toggledRecord = normalizeCompraProveedorRecord({ ...item, activo: shouldActivate, updatedAt: nowIso() });
      return toggledRecord;
    });
    const syncResult = toggledRecord ? syncAutoPagoCompraContado(toggledRecord) : { action: 'none', pago: null };

    proveedoresState.editingId = null;
    proveedoresState.quickCapture = null;
    proveedoresState.message = `Compra/deuda ${record.facturaReferencia || ''} quedó ${shouldActivate ? 'reactivada' : 'anulada'}.`;
    if (syncResult.action === 'annulled') proveedoresState.message += ' Pago automático relacionado anulado.';
    if (syncResult.action === 'created' || syncResult.action === 'updated') proveedoresState.message += ' Pago automático relacionado sincronizado.';
    proveedoresState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function buildCompraQuickCaptureFromSavedRecord(record) {
    const saved = normalizeCompraProveedorRecord(record);
    return {
      proveedorId: saved.proveedorId,
      fechaCompra: saved.fechaCompra || todayInputValue(),
      diasCredito: Number.isFinite(Number(saved.diasCredito)) ? Number(saved.diasCredito) : 0,
      fechaVencimiento: saved.fechaVencimiento || addDaysToDate(saved.fechaCompra, Number(saved.diasCredito) || 0) || saved.fechaCompra || todayInputValue(),
      condicionPagoSnapshot: saved.condicionPagoSnapshot,
      metodoPagoContadoId: saved.condicionPagoSnapshot === 'Contado' ? saved.metodoPagoContadoId : '',
      bancoPagoContadoId: saved.condicionPagoSnapshot === 'Contado' ? saved.bancoPagoContadoId : '',
      observacionPagoContado: saved.condicionPagoSnapshot === 'Contado' ? saved.observacionPagoContado : ''
    };
  }

  function resetProveedoresTransientState() {
    proveedoresState.editingId = null;
    proveedoresState.quickCapture = null;
    proveedoresState.selectedAjusteCompraId = '';
  }

  function clearCompraProveedorForm() {
    proveedoresState.editingId = null;
    proveedoresState.quickCapture = null;
    proveedoresState.message = null;
    renderRoute();
  }

  function buildProveedorAjusteFromForm(form) {
    const formData = new FormData(form);
    return normalizeCompraProveedorAjusteRecord({
      id: generateId('ajusteProveedor'),
      fecha: toDateInputValue(formData.get('fecha')),
      tipo: cleanText(formData.get('tipo')),
      monto: parseMoney(formData.get('monto')),
      observacion: cleanText(formData.get('observacion')),
      activo: true,
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
  }

  function validateProveedorAjusteRecord(compra, ajuste, proveedorId) {
    if (!compra || !compra.id || !compra.activo) return 'Selecciona una compra/factura activa para aplicar el ajuste.';
    if (!proveedorId || proveedorId !== compra.proveedorId) return 'Selecciona el proveedor correspondiente a la factura/referencia.';
    if (!ajuste.fecha) return 'La fecha del ajuste es obligatoria.';
    if (!COMPRA_AJUSTE_TYPES.includes(ajuste.tipo)) return 'Selecciona un tipo de ajuste válido.';
    if (Number.isNaN(parseMoney(ajuste.monto)) || ajuste.monto <= 0) return 'El monto del ajuste debe ser mayor que cero.';
    if (ajuste.monto > compra.saldoPorPagar) return `El ajuste no puede superar el saldo lógico disponible de ${formatMoney(compra.saldoPorPagar)}. Si ya se pagó de más, registra la corrección fuera de pagos para no crear caja falsa.`;
    return '';
  }

  function saveProveedorAjusteRecord(form) {
    const formData = new FormData(form);
    const compraProveedorId = cleanText(formData.get('compraProveedorId'));
    const proveedorId = cleanText(formData.get('proveedorId'));
    const compras = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
    const compra = compras.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const ajuste = buildProveedorAjusteFromForm(form);
    const validationError = validateProveedorAjusteRecord(compra, ajuste, proveedorId);

    if (validationError) {
      proveedoresState.selectedAjusteCompraId = compraProveedorId;
      proveedoresState.message = validationError;
      proveedoresState.messageType = 'error';
      renderRoute({ preserveScroll: true });
      return;
    }

    if (!warnIfClosedPeriod(ajuste.fecha, 'Registrar este ajuste/nota de proveedor')) return;

    appData.comprasProveedores = compras.map((record) => {
      if (record.id !== compraProveedorId) return normalizeCompraProveedorRecord(record);
      const normalized = normalizeCompraProveedorRecord(record);
      return normalizeCompraProveedorRecord({
        ...normalized,
        ajustes: [ajuste, ...normalizeCompraProveedorAjustesList(normalized.ajustes)],
        updatedAt: nowIso()
      });
    });

    const savedCompra = appData.comprasProveedores.find((record) => record.id === compraProveedorId);
    const syncResult = savedCompra ? syncAutoPagoCompraContado(savedCompra) : { action: 'none' };
    proveedoresState.selectedAjusteCompraId = compraProveedorId;
    openAccordionGroupForRecord('compras', savedCompra || compra);
    proveedoresState.message = `Ajuste ${ajuste.tipo} por ${formatMoney(ajuste.monto)} aplicado a ${compra.facturaReferencia}. Saldo recalculado sin crear pago.`;
    if (syncResult.action === 'updated') proveedoresState.message += ' Pago automático de contado sincronizado defensivamente.';
    proveedoresState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Proveedores / Compras',
      action: 'Ajuste registrado',
      entityType: 'Ajuste proveedor',
      entityRef: compra.facturaReferencia,
      amount: ajuste.monto,
      detail: buildActivityDetail(['Ajuste proveedor registrado', compra.facturaReferencia, ajuste.tipo, formatMoney(ajuste.monto)]),
      source: 'local'
    });
    renderRoute();
  }

  function startAjusteForCompra(compraProveedorId) {
    const cleanCompraId = cleanText(compraProveedorId);
    proveedoresState.selectedAjusteCompraId = cleanCompraId;
    const compra = appData.comprasProveedores.find((record) => record.id === cleanCompraId);
    if (compra) openAccordionGroupForRecord('compras', compra);
    proveedoresState.message = null;
    renderRoute({ preserveScroll: true });
  }

  function deleteCompraProveedorAjuste(compraProveedorId, ajusteId) {
    if (!canCurrentRole('annulMovements')) {
      proveedoresState.message = 'Solo Administrador puede eliminar ajustes/notas.';
      proveedoresState.messageType = 'error';
      renderRoute();
      return;
    }
    const compras = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
    const compra = compras.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const ajuste = compra ? normalizeCompraProveedorAjustesList(compra.ajustes).find((item) => item.id === ajusteId) : null;
    if (!compra || !ajuste) return;
    if (!warnIfClosedPeriod(ajuste.fecha, 'Eliminar este ajuste/nota de proveedor')) return;
    const ok = window.confirm(`Vas a eliminar el ajuste ${ajuste.tipo} por ${formatMoney(ajuste.monto)} de ${compra.facturaReferencia}. No se tocarán pagos, caja ni bancos. ¿Continuar?`);
    if (!ok) return;

    appData.comprasProveedores = compras.map((record) => {
      if (record.id !== compraProveedorId) return normalizeCompraProveedorRecord(record);
      const normalized = normalizeCompraProveedorRecord(record);
      return normalizeCompraProveedorRecord({
        ...normalized,
        ajustes: normalizeCompraProveedorAjustesList(normalized.ajustes).filter((item) => item.id !== ajusteId),
        updatedAt: nowIso()
      });
    });

    const savedCompra = appData.comprasProveedores.find((record) => record.id === compraProveedorId);
    syncAutoPagoCompraContado(savedCompra || compra);
    proveedoresState.selectedAjusteCompraId = compraProveedorId;
    openAccordionGroupForRecord('compras', savedCompra || compra);
    proveedoresState.message = `Ajuste eliminado de ${compra.facturaReferencia}. Saldo recalculado.`;
    proveedoresState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function setupProveedorAjusteForm(form) {
    const providerSelect = form.querySelector('[data-ajuste-provider]');
    const compraSelect = form.querySelector('[data-ajuste-compra]');
    const preview = form.querySelector('[data-ajuste-preview]');
    if (!providerSelect || !compraSelect) return;

    const updatePreview = () => {
      const compraId = cleanText(compraSelect.value);
      const compras = Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : [];
      const compra = compras.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraId);
      if (preview && compra) preview.innerHTML = renderAjustePreview(compra);
      proveedoresState.selectedAjusteCompraId = compraId;
    };

    const syncCompraOptions = () => {
      const proveedorId = cleanText(providerSelect.value);
      let firstVisible = '';
      Array.from(compraSelect.options).forEach((option) => {
        if (!option.value) return;
        const visible = !proveedorId || option.dataset.providerId === proveedorId;
        option.hidden = !visible;
        option.disabled = !visible;
        if (visible && !firstVisible) firstVisible = option.value;
      });
      const selectedOption = compraSelect.selectedOptions && compraSelect.selectedOptions[0];
      if (!selectedOption || selectedOption.disabled || selectedOption.hidden) compraSelect.value = firstVisible;
      updatePreview();
    };

    providerSelect.addEventListener('change', syncCompraOptions);
    compraSelect.addEventListener('change', () => {
      const selected = compraSelect.selectedOptions && compraSelect.selectedOptions[0];
      const providerId = selected?.dataset?.providerId || '';
      if (providerId) providerSelect.value = providerId;
      syncCompraOptions();
    });
    syncCompraOptions();
  }

  function setupCompraProveedorLiveCalculations(form) {
    updateCompraProveedorPreviewFromForm(form, false);
    setupCompraContadoPaymentBlock(form);

    form.querySelectorAll('[data-compra-calc]').forEach((input) => {
      input.addEventListener('input', () => updateCompraProveedorPreviewFromForm(form, false));
    });

    const dueInput = form.querySelector('[data-compra-due]');
    dueInput?.addEventListener('input', () => { form.dataset.manualDue = '1'; });
    dueInput?.addEventListener('change', () => { form.dataset.manualDue = '1'; });

    form.querySelector('[data-compra-provider]')?.addEventListener('change', () => applyCompraPaymentTermsSuggestion(form));
    form.querySelector('[data-compra-date]')?.addEventListener('change', () => updateCompraProveedorPreviewFromForm(form, true));
    form.querySelector('[data-compra-days]')?.addEventListener('input', () => updateCompraProveedorPreviewFromForm(form, true));
  }

  function applyCompraPaymentTermsSuggestion(form) {
    const proveedorId = cleanText(form.querySelector('[data-compra-provider]')?.value || '');
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const daysInput = form.querySelector('[data-compra-days]');
    const dueInput = form.querySelector('[data-compra-due]');
    const dateInput = form.querySelector('[data-compra-date]');
    const isContado = proveedorId && terms.condicionPago === 'Contado';
    if (daysInput) {
      daysInput.value = String(isContado ? 0 : (terms.diasCredito || 0));
      daysInput.readOnly = Boolean(isContado);
    }
    if (dueInput) {
      dueInput.readOnly = Boolean(isContado);
      if (isContado) {
        form.dataset.manualDue = '0';
        dueInput.value = dateInput?.value || todayInputValue();
      }
    }
    syncCompraContadoPaymentBlock(form);
    updateCompraProveedorPreviewFromForm(form, true);
  }

  function updateCompraProveedorPreviewFromForm(form, recalculateDue) {
    const proveedorId = cleanText(form.querySelector('[data-compra-provider]')?.value || '');
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const isContado = proveedorId && terms.condicionPago === 'Contado';

    if (recalculateDue) {
      const dateInput = form.querySelector('[data-compra-date]');
      const daysInput = form.querySelector('[data-compra-days]');
      const dueInput = form.querySelector('[data-compra-due]');
      if (isContado) {
        if (daysInput) {
          daysInput.value = '0';
          daysInput.readOnly = true;
        }
        if (dueInput) {
          dueInput.value = dateInput?.value || todayInputValue();
          dueInput.readOnly = true;
        }
        form.dataset.manualDue = '0';
      } else {
        if (daysInput) daysInput.readOnly = false;
        if (dueInput) dueInput.readOnly = false;
        const due = addDaysToDate(dateInput?.value, Number.parseInt(daysInput?.value || '0', 10) || 0);
        if (dueInput && due && form.dataset.manualDue !== '1') dueInput.value = due;
      }
    }

    syncCompraContadoPaymentBlock(form);

    const formData = new FormData(form);
    const calculations = getCompraProveedorCalculations({
      totalCompra: formData.get('totalCompra'),
      totalPagado: form.dataset.currentPagado || 0,
      ajustes: form.dataset.currentAjustes ? JSON.parse(form.dataset.currentAjustes) : []
    });

    const totalNode = form.querySelector('[data-compra-preview-total]');
    const ajustesNode = form.querySelector('[data-compra-preview-ajustes]');
    const ajustadoNode = form.querySelector('[data-compra-preview-ajustado]');
    const pagadoNode = form.querySelector('[data-compra-preview-pagado]');
    const saldoNode = form.querySelector('[data-compra-preview-saldo]');
    if (totalNode) totalNode.textContent = formatMoney(calculations.totalCompra);
    if (ajustesNode) ajustesNode.textContent = `${calculations.totalAjustes > 0 ? '-' : ''}${formatMoney(calculations.totalAjustes)}`;
    if (ajustadoNode) ajustadoNode.textContent = formatMoney(calculations.totalAjustado);
    if (pagadoNode) pagadoNode.textContent = formatMoney(calculations.totalPagado);
    if (saldoNode) saldoNode.textContent = formatMoney(calculations.saldoPorPagar);
  }

  function setupCompraContadoPaymentBlock(form) {
    const methodSelect = form.querySelector('[data-contado-payment-method]');
    methodSelect?.addEventListener('change', () => syncCompraContadoPaymentBank(form));
    syncCompraContadoPaymentBlock(form);
    syncCompraContadoPaymentBank(form);
  }

  function syncCompraContadoPaymentBlock(form) {
    const proveedorId = cleanText(form.querySelector('[data-compra-provider]')?.value || '');
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const isContado = proveedorId && terms.condicionPago === 'Contado';
    const block = form.querySelector('[data-contado-payment-block]');
    const methodSelect = form.querySelector('[data-contado-payment-method]');
    const pill = form.querySelector('[data-contado-payment-pill]');
    if (!block) return;
    block.classList.toggle('is-hidden', !isContado);
    block.dataset.cashStatus = isContado ? 'contado' : 'credito';
    if (methodSelect) methodSelect.required = Boolean(isContado);
    if (pill) pill.textContent = isContado ? 'Preparación' : 'No aplica';
    syncCompraContadoPaymentBank(form);
  }

  function syncCompraContadoPaymentBank(form) {
    const proveedorId = cleanText(form.querySelector('[data-compra-provider]')?.value || '');
    const terms = getCatalogPaymentTerms('proveedores', proveedorId);
    const isContado = proveedorId && terms.condicionPago === 'Contado';
    const methodSelect = form.querySelector('[data-contado-payment-method]');
    const bankField = form.querySelector('[data-contado-bank-field]');
    const bankSelect = form.querySelector('[data-contado-bank-select]');
    const requiredDot = form.querySelector('[data-contado-bank-required-dot]');
    const emptyMessage = form.querySelector('[data-contado-bank-empty-message]');
    if (!methodSelect || !bankField || !bankSelect) return;

    const requiredBankType = isContado ? getBankTypeForPaymentMethod(methodSelect.value) : '';
    const requiresBank = Boolean(requiredBankType);
    let matchingBanks = 0;

    Array.from(bankSelect.options).forEach((option) => {
      if (!option.value) return;
      const matchesType = requiresBank && option.dataset.bankType === requiredBankType;
      option.hidden = !matchesType;
      option.disabled = !matchesType;
      if (matchesType) matchingBanks += 1;
    });

    const selectedOption = bankSelect.selectedOptions && bankSelect.selectedOptions[0];
    if (!requiresBank || (selectedOption && selectedOption.value && (selectedOption.hidden || selectedOption.disabled))) {
      bankSelect.value = '';
    }

    bankField.classList.toggle('is-hidden', !requiresBank);
    bankSelect.required = Boolean(isContado && requiresBank && matchingBanks > 0);
    bankSelect.disabled = !isContado || !requiresBank || matchingBanks === 0;
    requiredDot?.classList.toggle('is-hidden', !(isContado && requiresBank && matchingBanks > 0));
    if (emptyMessage) {
      emptyMessage.textContent = getBankEmptyMessage(requiredBankType);
      emptyMessage.classList.toggle('is-hidden', !(isContado && requiresBank && matchingBanks === 0));
    }
  }


  function renderPagosProveedores() {
    const comprasDisponibles = getComprasConSaldoPago();
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveBankRecords();
    const pagos = getPagosProveedoresOrdenados();
    const visiblePagos = pagosState.focusCompraId ? pagos.filter((pago) => pago.compraProveedorId === pagosState.focusCompraId) : pagos;
    const focusCompra = pagosState.focusCompraId ? normalizeCompraProveedorRecord(appData.comprasProveedores.find((compra) => compra.id === pagosState.focusCompraId)) : null;
    const totals = getPagosProveedoresTotals();
    const selectedCompra = comprasDisponibles.find((compra) => compra.id === pagosState.selectedCompraId) || comprasDisponibles[0] || null;
    if (selectedCompra && pagosState.selectedCompraId !== selectedCompra.id) pagosState.selectedCompraId = selectedCompra.id;
    const editingRecord = pagosState.editingId ? getPagosProveedoresOrdenados().find((record) => record.id === pagosState.editingId) : null;
    const modalMetodos = editingRecord ? getSelectableCatalogRecords('metodosPago', editingRecord.metodoPagoId) : metodosActivos;
    const modalCuentas = editingRecord ? getSelectableBankRecords(editingRecord.cuentaBancoId) : cuentasActivas;
    const missingCatalogs = !metodosActivos.length;
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
            <div class="status-item"><strong>Pagado</strong><span>${escapeHtml(formatMoney(totals.totalPagado))}</span></div>
            <div class="status-item"><strong>Anulados</strong><span>${totals.anulados}</span></div>
          </div>
        </aside>
      </section>

      <section class="pagos-shell">
        ${pagosState.message ? `<div class="form-message ${pagosState.messageType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(pagosState.message)}</div>` : ''}

        ${renderPagosWarning(comprasDisponibles, metodosActivos, cuentasActivas)}

        <section class="metric-grid" aria-label="Resumen operativo de pagos a proveedores">
          <article class="metric-card"><span>Pagado activo</span><strong>${escapeHtml(formatMoney(totals.totalPagado))}</strong></article>
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
        ${editingRecord ? renderEditModal(getPagoModalId(), 'Editar pago a proveedor', 'Actualiza el abono sin duplicarlo y recalcula la factura ligada.', renderPagoProveedorEditForm(editingRecord, modalMetodos, modalCuentas)) : ''}
      </section>
    `;
  }

  function renderPagosWarning(comprasDisponibles, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!comprasDisponibles.length) missing.push('facturas/referencias con saldo por pagar');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un pago necesitas una compra/deuda activa con saldo y métodos de pago activos. Banco se solicita cuando el método es Transferencia, Depósito o Tarjeta.</p>
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
            <span>Referencia <span class="required-dot" aria-label="obligatorio">*</span></span>
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
            <select name="metodoPagoId" required data-payment-method-select ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}">${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          ${renderPaymentBankField(cuentasActivas, null, cannotCreate)}
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

  function renderPagoProveedorEditForm(record, metodosActivos, cuentasActivas) {
    const compra = (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : []).map((item) => normalizeCompraProveedorRecord(item)).find((item) => item.id === record.compraProveedorId);
    const proveedor = compra ? getCatalogRecordById('proveedores', compra.proveedorId) : null;
    const saldoDisponible = compra ? roundMoney(compra.saldoPorPagar + (record.activo ? record.montoPagado : 0)) : record.montoPagado;
    return `
      <form class="pago-form" data-pago-form data-pago-edit-form novalidate>
        <input type="hidden" name="id" value="${escapeHtml(record.id)}" />
        <input type="hidden" name="compraProveedorId" value="${escapeHtml(record.compraProveedorId)}" />
        <div class="form-grid">
          <label class="form-field full-span">
            <span>Referencia ligada</span>
            <input type="text" value="${escapeHtml(record.facturaReferencia || compra?.facturaReferencia || 'Sin referencia')}" disabled />
          </label>
          <label class="form-field">
            <span>Fecha real de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="date" name="fechaPago" value="${escapeHtml(record.fechaPago || todayInputValue())}" required />
          </label>
          <label class="form-field">
            <span>Monto pagado C$ <span class="required-dot" aria-label="obligatorio">*</span></span>
            <input type="number" name="montoPagado" value="${escapeHtml(formatNumberInput(record.montoPagado))}" min="0.01" max="${escapeHtml(saldoDisponible)}" step="0.01" inputmode="decimal" placeholder="0.00" required />
          </label>
          <label class="form-field">
            <span>Método de pago <span class="required-dot" aria-label="obligatorio">*</span></span>
            <select name="metodoPagoId" required data-payment-method-select>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${metodo.id === record.metodoPagoId ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}${metodo.activo ? '' : ' · inactivo'}</option>`).join('')}
            </select>
          </label>
          ${renderPaymentBankField(cuentasActivas, record, false)}
        </div>
        ${compra ? renderSelectedCompraPagoSummary(compra, proveedor) : ''}
        <p class="compact-note">Máximo permitido para esta edición: ${escapeHtml(formatMoney(saldoDisponible))}. El vínculo con la factura/referencia no se cambia para proteger trazabilidad.</p>
        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del pago">${escapeHtml(record.observacion || '')}</textarea>
        </label>
        <div class="form-actions">
          <button type="submit" class="card-action">Guardar cambios</button>
          <button type="button" class="secondary-action" data-pago-cancel>Cancelar</button>
        </div>
      </form>
    `;
  }

  function renderSelectedCompraPagoSummary(compra, proveedor) {
    return `
      <div class="formula-card pago-summary" aria-live="polite">
        <strong>Referencia seleccionada</strong>
        <div class="formula-grid">
          <span>Proveedor</span><b>${escapeHtml(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado')}</b>
          <span>Referencia</span><b>${escapeHtml(compra.facturaReferencia || 'Sin referencia')}</b>
          <span>Fecha compra</span><b>${escapeHtml(formatDate(compra.fechaCompra))}</b>
          <span>Vencimiento</span><b>${escapeHtml(formatDate(compra.fechaVencimiento))}</b>
          <span>Total compra/deuda</span><b>${escapeHtml(formatMoney(compra.totalCompra))}</b>
          <span>Pagado actual</span><b>${escapeHtml(formatMoney(compra.totalPagado))}</b>
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

    const groups = buildAccordionGroups(pagos, getPagoProveedorAccordionInfo);
    ensureOpenAccordionGroup(pagosState, groups);

    return renderAccordionGroups({
      module: 'pagos',
      groups,
      openGroupKey: pagosState.openGroupKey,
      renderOpenGroup: (group) => renderPagosProveedoresTable(group.records, group.label)
    });
  }

  function renderPagosProveedoresTable(pagos, groupLabel = '') {
    return renderOperationalTableShell({
      shellClass: 'pagos-scroll-shell',
      wrapClass: 'pagos-list',
      ariaLabel: groupLabel ? `Pagos a ${groupLabel}` : 'Pagos a proveedores registrados',
      tableClass: 'operational-table-pagos',
      headers: `
        <th>Fecha</th>
        <th>Referencia</th>
        <th class="amount-cell">Monto</th>
        <th>Método</th>
        <th>Banco</th>
        <th>Estado</th>
        <th class="actions-cell">Acciones</th>
      `,
      rows: pagos.map((pago) => renderPagoProveedorCard(pago)).join(''),
      colgroup: `
        <col style="width: 92px;">
        <col style="width: 170px;">
        <col style="width: 118px;">
        <col style="width: 116px;">
        <col style="width: 136px;">
        <col style="width: 92px;">
        <col style="width: 190px;">
      `
    });
  }

  function renderPagoProveedorCard(pago) {
    const record = normalizePagoProveedorRecord(pago);
    const estadoClass = record.activo ? 'is-active' : 'is-inactive';
    const searchable = normalizeNameForCompare(`${record.proveedorNombre} ${record.facturaReferencia} ${record.metodoPagoNombre} ${record.cuentaBancoNombre}`);
    return `
      <tr class="compact-record-row pago-row ${record.activo ? 'is-active' : 'is-inactive'}" data-pago-card data-search-text="${escapeHtml(searchable)}">
        <td data-label="Fecha"><span class="compact-primary">${escapeHtml(formatDate(record.fechaPago))}</span></td>
        <td data-label="Referencia"><span class="compact-primary">${escapeHtml(record.facturaReferencia || '—')}</span></td>
        <td data-label="Monto" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.montoPagado))}</span></td>
        <td data-label="Método"><span>${escapeHtml(record.metodoPagoNombre || '—')}</span></td>
        <td data-label="Banco"><span>${escapeHtml(record.cuentaBancoNombre || '—')}</span></td>
        <td data-label="Estado"><span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span></td>
        <td data-label="Acciones" class="actions-cell">
          <div class="record-actions compact-row-actions">
            <button type="button" class="secondary-action compact" data-go="proveedores">Proveedores</button>
            ${record.activo ? `<button type="button" class="secondary-action compact" data-pago-edit="${escapeHtml(record.id)}">Editar</button>` : ''}
            ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-pago-annul="${escapeHtml(record.id)}">Anular</button>` : ''}
          </div>
        </td>
      </tr>
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

  function buildPagoProveedorFromForm(form, existingRecord) {
    const formData = new FormData(form);
    const timestamp = nowIso();
    const compraProveedorId = cleanText(formData.get('compraProveedorId')) || existingRecord?.compraProveedorId || '';
    const compra = appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const proveedor = compra ? getCatalogRecordById('proveedores', compra.proveedorId) : null;
    const metodo = getCatalogRecordById('metodosPago', cleanText(formData.get('metodoPagoId')));
    const methodValue = metodo?.id || metodo?.nombre || formData.get('metodoPagoId');
    const requiredBankType = getBankTypeForPaymentMethod(methodValue);
    const cuenta = requiredBankType ? getValidBankForPaymentMethod(methodValue, formData.get('cuentaBancoId'), existingRecord) : null;

    return normalizePagoProveedorRecord({
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('pagoProveedor'),
      compraProveedorId,
      fechaPago: toDateInputValue(formData.get('fechaPago')),
      proveedorId: compra?.proveedorId || existingRecord?.proveedorId || '',
      proveedorNombre: proveedor?.nombre || compra?.proveedorNombre || existingRecord?.proveedorNombre || '',
      facturaReferencia: compra?.facturaReferencia || existingRecord?.facturaReferencia || '',
      montoPagado: parseMoney(formData.get('montoPagado')),
      metodoPagoId: metodo?.id || existingRecord?.metodoPagoId || '',
      metodoPagoNombre: metodo?.nombre || existingRecord?.metodoPagoNombre || '',
      cuentaBancoId: requiredBankType ? (cuenta?.id || '') : '',
      cuentaBancoNombre: requiredBankType ? (cuenta?.nombre || '') : '',
      cuentaBancoTipo: requiredBankType ? normalizeBankType(cuenta?.tipo) : '',
      observacion: cleanText(formData.get('observacion')),
      activo: typeof existingRecord?.activo === 'boolean' ? existingRecord.activo : true,
      estado: typeof existingRecord?.activo === 'boolean' && !existingRecord.activo ? 'Anulado' : 'Registrado',
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    });
  }

  function validatePagoProveedorRecord(record, existingRecord = null) {
    const compra = (Array.isArray(appData.comprasProveedores) ? appData.comprasProveedores : []).map((item) => normalizeCompraProveedorRecord(item)).find((item) => item.id === record.compraProveedorId);
    if (!compra || !compra.activo) return 'Selecciona una factura/referencia activa con saldo por pagar.';
    const currentAmount = existingRecord && existingRecord.compraProveedorId === record.compraProveedorId && existingRecord.activo !== false ? normalizePagoProveedorRecord(existingRecord).montoPagado : 0;
    const saldoPermitido = roundMoney(compra.saldoPorPagar + currentAmount);
    if (saldoPermitido <= 0) return 'La factura/referencia seleccionada no tiene saldo disponible para este pago.';
    if (!record.fechaPago) return 'La fecha real de pago es obligatoria.';
    if (Number.isNaN(parseMoney(record.montoPagado)) || record.montoPagado <= 0) return 'El monto pagado debe ser mayor que cero.';
    if (record.montoPagado > saldoPermitido) return `El pago no puede superar el saldo permitido de ${formatMoney(saldoPermitido)}.`;
    if (!record.metodoPagoId || !getCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId && (item.activo || existingRecord?.metodoPagoId === item.id))) return 'Selecciona un método de pago válido.';
    const bankError = validateBankForPaymentMethod(record, existingRecord);
    if (bankError) return bankError;
    return '';
  }

  function savePagoProveedorRecord(form) {
    const existingId = cleanText(new FormData(form).get('id'));
    const records = Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : [];
    const existingRecord = existingId ? records.find((record) => record.id === existingId) : null;

    if (existingRecord && normalizePagoProveedorRecord(existingRecord).activo === false) {
      pagosState.message = 'No se puede editar un pago anulado.';
      pagosState.messageType = 'error';
      renderRoute();
      return;
    }

    const newRecord = buildPagoProveedorFromForm(form, existingRecord);
    const validationError = validatePagoProveedorRecord(newRecord, existingRecord);

    if (validationError) {
      pagosState.message = validationError;
      pagosState.messageType = 'error';
      renderRoute();
      return;
    }

    if (!warnIfClosedPeriod(newRecord.fechaPago, existingRecord ? 'Actualizar este pago a proveedor' : 'Registrar este pago a proveedor')) return;

    if (existingRecord) {
      appData.pagosProveedores = records.map((record) => record.id === existingId ? newRecord : record);
      recalculateCompraProveedorById(existingRecord.compraProveedorId);
      recalculateCompraProveedorById(newRecord.compraProveedorId);
      pagosState.message = `Pago actualizado en ${newRecord.facturaReferencia}: ${formatMoney(newRecord.montoPagado)}.`;
    } else {
      appData.pagosProveedores = [newRecord, ...records];
      recalculateCompraProveedorById(newRecord.compraProveedorId);
      pagosState.message = `Pago aplicado a ${newRecord.facturaReferencia}: ${formatMoney(newRecord.montoPagado)}.`;
    }

    const compra = appData.comprasProveedores.find((record) => record.id === newRecord.compraProveedorId);
    pagosState.selectedCompraId = compra?.saldoPorPagar > 0 ? newRecord.compraProveedorId : '';
    pagosState.focusCompraId = newRecord.compraProveedorId;
    openAccordionGroupForRecord('pagos', newRecord);
    pagosState.editingId = null;
    pagosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Pagos',
      action: existingRecord ? 'Editado' : 'Creado',
      entityType: 'Pago',
      entityRef: newRecord.facturaReferencia,
      amount: newRecord.montoPagado,
      detail: buildActivityDetail([existingRecord ? 'Pago editado' : 'Pago registrado', newRecord.facturaReferencia, formatMoney(newRecord.montoPagado)]),
      source: 'local'
    });
    renderRoute();
  }

  function editPagoProveedorRecord(pagoId) {
    const record = (Array.isArray(appData.pagosProveedores) ? appData.pagosProveedores : []).find((item) => item.id === pagoId);
    if (!record) return;
    const normalized = normalizePagoProveedorRecord(record);
    if (!normalized.activo) {
      pagosState.message = 'Los pagos anulados quedan visibles, pero no se editan.';
      pagosState.messageType = 'error';
      renderRoute();
      return;
    }
    pagosState.editingId = pagoId;
    pagosState.focusCompraId = normalized.compraProveedorId;
    openAccordionGroupForRecord('pagos', normalized);
    pagosState.message = null;
    renderRoute();
  }

  function clearPagoProveedorForm() {
    pagosState.editingId = null;
    pagosState.message = null;
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
    const cleanCompraId = cleanText(compraProveedorId);
    pagosState.selectedCompraId = cleanCompraId;
    pagosState.focusCompraId = cleanCompraId;
    const existingPago = getPagosProveedoresOrdenados().find((record) => record.compraProveedorId === cleanCompraId);
    if (existingPago) openAccordionGroupForRecord('pagos', existingPago);
    pagosState.message = null;
    renderRoute();
  }

  function startPagoForCompra(compraProveedorId) {
    const cleanCompraId = cleanText(compraProveedorId);
    pagosState.selectedCompraId = cleanCompraId;
    pagosState.focusCompraId = cleanCompraId;
    const existingPago = getPagosProveedoresOrdenados().find((record) => record.compraProveedorId === cleanCompraId);
    if (existingPago) openAccordionGroupForRecord('pagos', existingPago);
    pagosState.message = null;
    setRoute('pagos');
  }

  function fillPagoFullAmount(form, compraProveedorId) {
    const compra = appData.comprasProveedores.map((record) => normalizeCompraProveedorRecord(record)).find((record) => record.id === compraProveedorId);
    const amountInput = form.querySelector('input[name="montoPagado"]');
    if (compra && amountInput) amountInput.value = String(compra.saldoPorPagar);
  }

  function setupPagosSearch() {
    setupAccordionSearch('[data-pago-search]', 'pagos', '[data-pago-card]');
  }


  function renderGastos() {
    const tiposActivos = getActiveCatalogRecords('tiposGasto');
    const metodosActivos = getActiveCatalogRecords('metodosPago');
    const cuentasActivas = getActiveBankRecords();
    const gastos = getGastosOrdenados();
    const editingRecord = gastosState.editingId ? gastos.find((record) => record.id === gastosState.editingId) : null;
    const totals = getGastosTotals();
    const missingCatalogs = !tiposActivos.length || !metodosActivos.length;

    return `
      <section class="hero gastos-hero">
        <div>
          <span class="eyebrow">Módulo activo</span>
          <h1>Gastos</h1>
          <p class="lead">Registra gastos operativos por tipo, método de pago y banco cuando aplique. Los anulados quedan visibles para trazabilidad, pero no suman en reportes futuros: orden sin maquillaje contable.</p>
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
                <span class="eyebrow mini">Nuevo gasto</span>
                <h2>Registrar gasto</h2>
              </div>
            </div>
            <p class="muted-text">Los tipos, métodos y bancos vienen de Catálogos activos. Banco aparece cuando el método elegido es Transferencia, Depósito o Tarjeta.</p>
            ${renderGastoForm(null, tiposActivos, metodosActivos, cuentasActivas, missingCatalogs)}
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
        ${editingRecord ? renderEditModal(getGastoModalId(), 'Editar gasto', 'Actualiza el gasto en una ventana independiente y mantiene el tablero consistente.', renderGastoForm(editingRecord, tiposActivos, metodosActivos, cuentasActivas, missingCatalogs)) : ''}
      </section>
    `;
  }

  function renderGastosWarning(tiposActivos, metodosActivos, cuentasActivas) {
    const missing = [];
    if (!tiposActivos.length) missing.push('tipos de gasto activos');
    if (!metodosActivos.length) missing.push('métodos de pago activos');
    if (!missing.length) return '';
    return `
      <article class="catalog-warning" role="status">
        <strong>Faltan ${escapeHtml(missing.join(', '))}.</strong>
        <p>Para guardar un gasto necesitas tipos de gasto y métodos de pago activos. Banco se solicita cuando el método es Transferencia, Depósito o Tarjeta.</p>
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
            <select name="metodoPagoId" required data-payment-method-select ${!metodosActivos.length || cannotCreate ? 'disabled' : ''}>
              <option value="">Seleccionar método</option>
              ${metodosActivos.map((metodo) => `<option value="${escapeHtml(metodo.id)}" ${metodo.id === record?.metodoPagoId ? 'selected' : ''}>${escapeHtml(metodo.nombre || 'Método sin nombre')}</option>`).join('')}
            </select>
          </label>
          ${renderPaymentBankField(cuentasActivas, record, cannotCreate)}
        </div>

        <label class="form-field">
          <span>Observación</span>
          <textarea name="observacion" rows="3" placeholder="Notas internas del gasto" ${cannotCreate ? 'disabled' : ''}>${escapeHtml(record?.observacion || '')}</textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="card-action" ${cannotCreate ? 'disabled' : ''}>${record ? 'Guardar cambios' : 'Guardar gasto'}</button>
          <button type="button" class="secondary-action" data-gasto-clear>${record ? 'Cancelar' : 'Limpiar'}</button>
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

    const groups = buildAccordionGroups(gastos, getGastoAccordionInfo);
    ensureOpenAccordionGroup(gastosState, groups);

    return renderAccordionGroups({
      module: 'gastos',
      groups,
      openGroupKey: gastosState.openGroupKey,
      renderOpenGroup: (group) => renderGastosTable(group.records, group.label)
    });
  }

  function renderGastosTable(gastos, groupLabel = '') {
    return renderOperationalTableShell({
      shellClass: 'gastos-scroll-shell',
      wrapClass: 'gastos-list',
      ariaLabel: groupLabel ? `Gastos de ${groupLabel}` : 'Gastos registrados',
      tableClass: 'operational-table-gastos',
      headers: `
        <th>Fecha</th>
        <th class="amount-cell">Monto</th>
        <th>Método</th>
        <th>Banco</th>
        <th>Observación</th>
        <th>Estado</th>
        <th class="actions-cell">Acciones</th>
      `,
      rows: gastos.map((gasto) => renderGastoCard(gasto)).join(''),
      colgroup: `
        <col style="width: 92px;">
        <col style="width: 118px;">
        <col style="width: 116px;">
        <col style="width: 136px;">
        <col style="width: 150px;">
        <col style="width: 92px;">
        <col style="width: 160px;">
      `
    });
  }

  function renderGastoCard(gasto) {
    const record = normalizeGastoRecord(gasto);
    const tipo = getCatalogRecordById('tiposGasto', record.tipoGastoId);
    const metodo = getCatalogRecordById('metodosPago', record.metodoPagoId);
    const cuenta = getCatalogRecordById('cuentasBancos', record.cuentaBancoId);
    const estadoClass = getEstadoClass(record.estado);
    const tipoNombre = tipo?.nombre || record.tipoGastoNombre || 'Tipo no encontrado';
    const searchText = normalizeNameForCompare([record.tipoGastoNombre, tipo?.nombre, record.metodoPagoNombre, metodo?.nombre, record.cuentaBancoNombre, cuenta?.nombre, record.observacion].join(' '));

    return `
      <tr class="compact-record-row gasto-row ${record.activo ? 'is-active' : 'is-inactive'}" data-gasto-card data-search-text="${escapeHtml(searchText)}">
        <td data-label="Fecha"><span class="compact-primary">${escapeHtml(formatDate(record.fecha))}</span></td>
        <td data-label="Monto" class="amount-cell"><span class="compact-primary">${escapeHtml(formatMoney(record.monto))}</span></td>
        <td data-label="Método"><span>${escapeHtml(metodo?.nombre || record.metodoPagoNombre || 'Método no encontrado')}</span></td>
        <td data-label="Banco"><span>${escapeHtml(cuenta?.nombre || record.cuentaBancoNombre || '—')}</span></td>
        <td data-label="Observación"><span>${escapeHtml(record.observacion || '—')}</span></td>
        <td data-label="Estado"><span class="state-pill ${estadoClass}">${escapeHtml(record.estado)}</span></td>
        <td data-label="Acciones" class="actions-cell">
          <div class="record-actions compact-row-actions">
            ${record.activo ? `<button type="button" class="secondary-action compact" data-gasto-edit="${escapeHtml(record.id)}">Editar</button>` : ''}
            ${record.activo && canCurrentRole('annulMovements') ? `<button type="button" class="danger-action compact" data-gasto-annul="${escapeHtml(record.id)}">Anular</button>` : ''}
          </div>
        </td>
      </tr>
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
    const methodValue = metodo?.id || metodo?.nombre || formData.get('metodoPagoId');
    const requiredBankType = getBankTypeForPaymentMethod(methodValue);
    const cuenta = requiredBankType ? getValidBankForPaymentMethod(methodValue, formData.get('cuentaBancoId'), existingRecord) : null;

    return normalizeGastoRecord({
      ...(existingRecord || {}),
      id: existingRecord?.id || generateId('gasto'),
      fecha: toDateInputValue(formData.get('fecha')),
      tipoGastoId: tipo?.id || '',
      tipoGastoNombre: tipo?.nombre || '',
      monto: parseMoney(formData.get('monto')),
      metodoPagoId: metodo?.id || '',
      metodoPagoNombre: metodo?.nombre || '',
      cuentaBancoId: requiredBankType ? (cuenta?.id || '') : '',
      cuentaBancoNombre: requiredBankType ? (cuenta?.nombre || '') : '',
      cuentaBancoTipo: requiredBankType ? normalizeBankType(cuenta?.tipo) : '',
      observacion: cleanText(formData.get('observacion')),
      estado: 'Registrado',
      anulado: false,
      activo: true,
      createdAt: existingRecord?.createdAt || timestamp,
      updatedAt: timestamp
    });
  }

  function validateGastoRecord(record, existingRecord = null) {
    if (!record.fecha) return 'La fecha del gasto es obligatoria.';
    if (!record.tipoGastoId || !getActiveCatalogRecords('tiposGasto').some((item) => item.id === record.tipoGastoId)) return 'Selecciona un tipo de gasto activo.';
    if (Number.isNaN(parseMoney(record.monto)) || record.monto <= 0) return 'El monto debe ser mayor que cero.';
    if (!record.metodoPagoId || !getActiveCatalogRecords('metodosPago').some((item) => item.id === record.metodoPagoId)) return 'Selecciona un método de pago activo.';
    const bankError = validateBankForPaymentMethod(record, existingRecord);
    if (bankError) return bankError;
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
    const validationError = validateGastoRecord(newRecord, existingRecord);

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
    openAccordionGroupForRecord('gastos', newRecord);
    gastosState.messageType = 'success';
    saveData(appData);
    registerActivity({
      module: 'Gastos',
      action: existingRecord ? 'Editado' : 'Creado',
      entityType: 'Gasto',
      entityRef: newRecord.tipoGastoNombre || newRecord.tipoGastoId,
      amount: newRecord.monto,
      detail: buildActivityDetail([existingRecord ? 'Gasto editado' : 'Gasto registrado', newRecord.tipoGastoNombre || 'Gasto', formatMoney(newRecord.monto)]),
      source: 'local'
    });
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
    openAccordionGroupForRecord('gastos', normalized);
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
    setupAccordionSearch('[data-gasto-search]', 'gastos', '[data-gasto-card]');
  }


  function renderConfiguracion() {
    const config = normalizeConfiguracion(appData.configuracion);
    const currentRole = getCurrentRoleDefinition();
    const counts = getJsonRecordCounts(appData);
    const preview = jsonBackupState.preview;
    const hasPreview = Boolean(preview);
    const canExport = canCurrentRole('exportJson');
    const canImport = canCurrentRole('importJson');
    const canConfig = canCurrentRole('changeConfig');
    const modeOptions = getOperationalRecordCount() > 0
      ? `
        <label class="form-field">
          <span>Modo de importación JSON</span>
          <select data-json-import-mode>
            <option value="merge">Fusionar</option>
            <option value="replace">Reemplazar</option>
          </select>
        </label>
        <div class="json-mode-guidance">
          <div class="status-item"><strong>Fusionar</strong><span>Conserva los datos actuales y agrega registros faltantes evitando duplicados. No garantiza actualizar versiones editadas de registros ya existentes.</span></div>
          <div class="status-item is-danger-soft"><strong>Reemplazar</strong><span>Reemplaza la base local por el contenido del JSON. Puede perder datos locales que no estén dentro del respaldo.</span></div>
        </div>
      `
      : `
        <input type="hidden" data-json-import-mode value="replace" />
        <div class="json-mode-guidance">
          <div class="status-item is-danger-soft"><strong>Reemplazar</strong><span>La base operativa está vacía. El JSON validado puede cargarse como base inicial, reemplazando el contenido local vacío.</span></div>
        </div>
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

          ${renderPwaUpdateCard(config)}

          ${renderDeviceIdentityCard(config)}

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

          ${renderJsonImportHistoryList()}

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

  function renderDeviceIdentityCard(config) {
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const lastActivity = normalizeActivitySummary(identity.lastActivity);
    const lastImportAt = cleanText(config?.lastImportAt);
    const lastActivityText = lastActivity
      ? buildActivityDetail([
          `${lastActivity.deviceName || identity.deviceName} · ${lastActivity.tsVisible || formatDateTime(lastActivity.ts)}`,
          lastActivity.detail || buildActivityDetail([lastActivity.module, lastActivity.action, lastActivity.entityRef])
        ])
      : 'Sin actividad registrada todavía.';

    return `
      <article class="panel-card config-card full-span device-identity-card">
        <div class="section-title-row">
          <div>
            <span class="eyebrow mini">Equipo local</span>
            <h2>Identidad del equipo</h2>
          </div>
        </div>
        <p class="notice">Nombra este dispositivo para reconocer desde dónde trabajas. Esta identidad vive solo en este equipo y no cambia ventas, cobros, Excel ni la base de negocio.</p>
        <form class="config-form device-identity-form" data-device-identity-form novalidate>
          <div class="form-grid device-identity-grid">
            <label class="form-field">
              <span>Nombre de este equipo</span>
              <input type="text" name="deviceName" value="${escapeHtml(identity.deviceName)}" placeholder="Laptop, iPad, iMac oficina..." autocomplete="off" />
            </label>
            <div class="device-id-box" aria-label="Referencia interna del equipo">
              <span>ID interno</span>
              <strong>${escapeHtml(getShortDeviceId(identity.deviceId))}</strong>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="card-action">Guardar identidad</button>
          </div>
        </form>
        <div class="import-summary-grid compact-summary device-summary-grid">
          <div class="status-item"><strong>Equipo actual</strong><span>${escapeHtml(identity.deviceName)}</span></div>
          <div class="status-item"><strong>ID interno</strong><span>${escapeHtml(getShortDeviceId(identity.deviceId))}</span></div>
          <div class="status-item device-last-activity"><strong>Última actividad local</strong><span>${escapeHtml(lastActivityText)}</span></div>
          ${renderLastBackupSummaryCard(config?.lastJsonBackupSummary)}
          ${renderLastImportSummaryCard(config?.lastJsonImportSummary, lastImportAt)}
          <div class="status-item"><strong>Creada</strong><span>${escapeHtml(formatDateTime(identity.createdAt))}</span></div>
        </div>
        ${renderActivityLogList()}
      </article>
    `;
  }

  function renderActivityLogList() {
    const entries = getRecentActivityEntries(20);
    const headers = `
      <th>Fecha</th>
      <th>Equipo</th>
      <th>Módulo</th>
      <th>Acción</th>
      <th>Detalle</th>
    `;
    const rows = entries.length
      ? entries.map((entry) => `
        <tr class="compact-record-row">
          <td><span class="compact-primary">${escapeHtml(entry.tsVisible || formatDateTime(entry.ts))}</span><small>${escapeHtml(entry.source)}</small></td>
          <td><span>${escapeHtml(entry.deviceName)}</span><small>${escapeHtml(getShortDeviceId(entry.deviceId))}</small></td>
          <td><span>${escapeHtml(entry.module)}</span></td>
          <td><span>${escapeHtml(entry.action)}</span><small>${escapeHtml(entry.entityType)}</small></td>
          <td><span>${escapeHtml(entry.detail)}</span>${entry.entityRef ? `<small>${escapeHtml(entry.entityRef)}</small>` : ''}</td>
        </tr>
      `).join('')
      : `
        <tr class="compact-record-row">
          <td colspan="5"><span class="compact-primary">La bitácora registrará actividades nuevas desde esta versión.</span><small>No se reconstruye historial pasado.</small></td>
        </tr>
      `;

    return `
      <div class="activity-log-section">
        <div class="compact-title-row">
          <div>
            <span class="eyebrow mini">Bitácora local</span>
            <h3>Últimas actividades</h3>
          </div>
          <span class="compact-note">Últimas ${entries.length || 0} actividades</span>
        </div>
        ${renderOperationalTableShell({
          shellClass: 'activity-log-scroll-shell',
          wrapClass: 'activity-log-table-wrap',
          ariaLabel: 'Últimas actividades locales por equipo',
          tableClass: 'activity-log-table',
          headers,
          rows
        })}
      </div>
    `;
  }

  function renderPwaUpdateCard(config) {
    const swSupported = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
    const isStandalone = Boolean(
      window.matchMedia?.('(display-mode: standalone)').matches || window.navigator?.standalone
    );
    const statusText = pwaState.status || 'Actualizada';
    const statusClass = pwaState.statusType === 'error'
      ? 'is-error'
      : (pwaState.updateAvailable ? 'is-warning' : (pwaState.isChecking || pwaState.isApplying ? 'is-info' : 'is-success'));
    const primaryAction = pwaState.updateAvailable ? 'data-pwa-apply-update' : 'data-pwa-check-update';
    const primaryLabel = pwaState.updateAvailable ? 'Aplicar actualización' : 'Buscar actualizaciones';
    const busy = pwaState.isChecking || pwaState.isApplying;

    return `
      <article class="panel-card config-card pwa-update-card full-span">
        <div class="section-title-row">
          <div>
            <span class="eyebrow mini">PWA</span>
            <h2>PWA / Actualizaciones</h2>
          </div>
          <span class="pwa-status-chip ${statusClass}">${escapeHtml(statusText)}</span>
        </div>
        <p class="notice">Busca y aplica actualizaciones de la app instalada.</p>
        <div class="pwa-update-grid">
          <div class="status-item"><strong>Estado actual</strong><span>${escapeHtml(statusText)}</span></div>
          <div class="status-item"><strong>Última búsqueda</strong><span>${escapeHtml(formatDateTime(config.pwaLastSearchAt))}</span></div>
          <div class="status-item"><strong>Última actualización</strong><span>${escapeHtml(formatDateTime(config.pwaLastUpdateAt))}</span></div>
          <div class="status-item"><strong>Modo</strong><span>${isStandalone ? 'PWA instalada' : 'Navegador'}</span></div>
          <div class="status-item"><strong>Service Worker</strong><span>${swSupported ? 'Disponible' : 'No disponible'}</span></div>
          <div class="status-item"><strong>Cache</strong><span>Versión ${escapeHtml(APP_VERSION)}</span></div>
        </div>
        <div class="config-actions-row pwa-actions-row">
          <button type="button" class="card-action" ${primaryAction} ${busy ? 'disabled' : ''}>${busy ? escapeHtml(statusText) : primaryLabel}</button>
          ${pwaState.updateAvailable ? `<button type="button" class="secondary-action" data-pwa-check-update ${busy ? 'disabled' : ''}>Buscar otra vez</button>` : ''}
          <span class="compact-note">No borra localStorage, JSON, Excel ni datos de negocio.</span>
        </div>
        ${pwaState.message ? `<div class="form-message ${pwaState.statusType === 'error' ? 'is-error' : 'is-success'}" role="status">${escapeHtml(pwaState.message)}</div>` : ''}
      </article>
    `;
  }

  function renderJsonComparisonTable(comparison) {
    const rows = Array.isArray(comparison?.rows) ? comparison.rows : [];
    const headers = `
      <th>Módulo</th>
      <th>Local</th>
      <th>JSON</th>
      <th>Diferencia</th>
    `;
    const bodyRows = rows.length
      ? rows.map((row) => `
        <tr class="compact-record-row">
          <td><span class="compact-primary">${escapeHtml(row.label)}</span></td>
          <td><span>${escapeHtml(row.local)}</span></td>
          <td><span>${escapeHtml(row.json)}</span></td>
          <td><span>${escapeHtml(row.difference)}</span></td>
        </tr>
      `).join('')
      : `
        <tr class="compact-record-row">
          <td colspan="4"><span class="compact-primary">No hay conteos comparables.</span><small>El JSON puede ser antiguo o incompatible.</small></td>
        </tr>
      `;
    return renderOperationalTableShell({
      shellClass: 'json-comparison-scroll-shell',
      wrapClass: 'json-comparison-table-wrap',
      ariaLabel: 'Conteos comparados entre base local y JSON seleccionado',
      tableClass: 'json-comparison-table',
      headers,
      rows: bodyRows
    });
  }

  function renderJsonImportComparison(comparison) {
    if (!comparison) return '';
    const recencyClass = comparison.recency?.status === 'json-newer'
      ? 'is-info'
      : (comparison.recency?.status === 'local-newer' ? 'is-warning' : 'is-neutral');
    const jsonMetadataWarning = comparison.json?.hasMetadata
      ? ''
      : '<p class="notice">Este respaldo no contiene metadata de origen. Puede ser un respaldo anterior.</p>';
    return `
      <section class="json-comparison-section" aria-label="Comparación antes de importar">
        <div class="compact-title-row">
          <div>
            <span class="eyebrow mini">Comparación antes de importar</span>
            <h3>Base local vs JSON seleccionado</h3>
          </div>
          <span class="state-pill ${escapeHtml(recencyClass)}">${escapeHtml(comparison.recency?.title || 'Comparación')}</span>
        </div>
        <div class="json-recency-alert ${escapeHtml(recencyClass)}">
          <strong>${escapeHtml(comparison.recency?.message || 'No hay suficiente metadata para determinar cuál base es más reciente.')}</strong>
          <span>Esta advertencia solo informa. No sincroniza, no decide ganadores y no modifica registros existentes por fecha.</span>
        </div>
        <div class="import-summary-grid compact-summary json-compare-grid">
          <div class="status-item"><strong>Base local</strong><span>${escapeHtml(comparison.local.deviceName)}</span><small>${escapeHtml(getShortDeviceId(comparison.local.deviceId))}</small></div>
          <div class="status-item"><strong>Última actividad local</strong><span>${escapeHtml(comparison.local.lastActivityText)}</span></div>
          <div class="status-item"><strong>Último respaldo exportado</strong><span>${escapeHtml(comparison.local.lastBackupText)}</span></div>
          <div class="status-item"><strong>Última importación</strong><span>${escapeHtml(comparison.local.lastImportText)}</span></div>
        </div>
        <div class="import-summary-grid compact-summary json-compare-grid">
          <div class="status-item"><strong>JSON seleccionado</strong><span>${escapeHtml(comparison.json.deviceName)}</span><small>${escapeHtml(getShortDeviceId(comparison.json.deviceId))}</small></div>
          <div class="status-item"><strong>Fecha de exportación</strong><span>${escapeHtml(comparison.json.exportedAtDisplay || formatDateTime(comparison.json.exportedAt))}</span></div>
          <div class="status-item"><strong>Última actividad incluida</strong><span>${escapeHtml(comparison.json.lastActivityText)}</span></div>
          <div class="status-item"><strong>Versión de respaldo</strong><span>${escapeHtml(comparison.json.backupVersion || (comparison.json.hasMetadata ? '—' : 'Respaldo sin metadata de origen'))}</span></div>
        </div>
        ${jsonMetadataWarning}
        <h3>Conteos comparativos por módulo</h3>
        ${renderJsonComparisonTable(comparison)}
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
    const origin = preview.metadata || {};
    const lastActivity = normalizeActivitySummary(origin.lastActivity);
    const lastActivityText = lastActivity
      ? (lastActivity.detail || buildActivityDetail([lastActivity.module, lastActivity.action, lastActivity.entityRef]))
      : 'No incluida.';
    const metadataBadge = preview.hasMetadata
      ? 'Metadata de origen detectada'
      : 'Respaldo sin metadata de origen';

    return `
      <div class="json-preview-card">
        <div class="import-summary-grid">
          <div class="status-item"><strong>Estado</strong><span>${preview.isValid ? 'Válido' : 'Bloqueado'}</span></div>
          <div class="status-item"><strong>App</strong><span>${escapeHtml(preview.appName || '—')}</span></div>
          <div class="status-item"><strong>Schema</strong><span>${escapeHtml(preview.schemaVersion || '—')}</span></div>
          <div class="status-item"><strong>Backup</strong><span>${escapeHtml(origin.backupVersion || '—')}</span></div>
          <div class="status-item"><strong>Fecha respaldo</strong><span>${escapeHtml(formatDateTime(preview.backupDate))}</span></div>
          <div class="status-item"><strong>Total</strong><span>${preview.counts.total}</span></div>
        </div>

        <h3>Metadata de origen</h3>
        <div class="import-summary-grid compact-summary json-origin-grid">
          <div class="status-item"><strong>Origen</strong><span>${escapeHtml(origin.sourceDeviceName || metadataBadge)}</span></div>
          <div class="status-item"><strong>ID equipo</strong><span>${escapeHtml(getShortDeviceId(origin.sourceDeviceId))}</span></div>
          <div class="status-item"><strong>Exportado</strong><span>${escapeHtml(origin.exportedAtDisplay || formatDateTime(preview.backupDate))}</span></div>
          <div class="status-item json-last-activity"><strong>Última actividad</strong><span>${escapeHtml(lastActivityText)}</span></div>
          <div class="status-item"><strong>Archivo</strong><span>${escapeHtml(jsonBackupState.fileName || '—')}</span></div>
          <div class="status-item"><strong>Formato</strong><span>${escapeHtml(preview.hasMetadata ? `Backup v${origin.backupVersion || '—'}` : 'Antiguo compatible')}</span></div>
        </div>
        ${preview.hasMetadata ? '' : '<p class="notice">Respaldo sin metadata de origen. Se puede importar si la estructura es compatible; simplemente no trae brújula, pero sí mapa.</p>'}

        ${renderJsonImportComparison(preview.comparison)}

        <h3>Conteo detectado</h3>
        <div class="import-summary-grid compact-summary">
          <div class="status-item"><strong>Ventas</strong><span>${preview.counts.ventas}</span></div>
          <div class="status-item"><strong>Cobros</strong><span>${preview.counts.cobros}</span></div>
          <div class="status-item"><strong>Compras</strong><span>${preview.counts.comprasProveedores}</span></div>
          <div class="status-item"><strong>Pagos</strong><span>${preview.counts.pagosProveedores}</span></div>
          <div class="status-item"><strong>Gastos</strong><span>${preview.counts.gastos}</span></div>
          <div class="status-item"><strong>Bdatos</strong><span>${preview.counts.bdatos || 0}</span></div>
          <div class="status-item"><strong>Bitácora</strong><span>${preview.counts.bitacora || 0}</span></div>
          <div class="status-item"><strong>Ajustes CL</strong><span>${preview.counts.ajustesClientes || 0}</span></div>
          <div class="status-item"><strong>Ajustes PR</strong><span>${preview.counts.ajustesProveedores || 0}</span></div>
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

  function getJsonRecordCounts(dataSource, activityEntries = null) {
    const data = isPlainObject(dataSource) ? dataSource : {};
    const catalogos = CATALOGS.reduce((sum, catalog) => sum + (Array.isArray(data[catalog.id]) ? data[catalog.id].length : 0), 0);
    const comprasProveedores = Array.isArray(data.comprasProveedores) ? data.comprasProveedores.length : 0;
    const pagosProveedores = Array.isArray(data.pagosProveedores) ? data.pagosProveedores.length : 0;
    const cierresMensuales = Array.isArray(data.cierresMensuales) ? data.cierresMensuales.length : 0;
    const bitacora = Array.isArray(activityEntries)
      ? activityEntries.length
      : (Array.isArray(data.bitacora) ? data.bitacora.length : 0);
    const counts = normalizeBackupCounts({
      catalogos,
      ventas: Array.isArray(data.ventas) ? data.ventas.length : 0,
      cobros: Array.isArray(data.cobros) ? data.cobros.length : 0,
      comprasProveedores,
      pagosProveedores,
      gastos: Array.isArray(data.gastos) ? data.gastos.length : 0,
      bdatos: Array.isArray(data.bdatos) ? data.bdatos.length : 0,
      cierresMensuales,
      exportacionesExcel: Array.isArray(data.exportacionesExcel) ? data.exportacionesExcel.length : 0,
      ajustesClientes: Array.isArray(data.ventas) ? data.ventas.reduce((sum, venta) => sum + normalizeVentaAjustesList(venta?.ajustes).length, 0) : 0,
      ajustesProveedores: Array.isArray(data.comprasProveedores) ? data.comprasProveedores.reduce((sum, compra) => sum + normalizeCompraProveedorAjustesList(compra?.ajustes).length, 0) : 0,
      bitacora
    });
    counts.total = getBackupCountsTotal(counts);
    return counts;
  }

  function buildJsonBackupPayload(exportOptions = {}) {
    const snapshot = normalizeData(appData);
    const exportedAt = cleanText(exportOptions.exportedAt) || nowIso();
    const identity = normalizeDeviceIdentity(appDeviceIdentity);
    const activityEntries = getRecentActivityEntries(ACTIVITY_LOG_MAX_ENTRIES);
    const lastActivity = normalizeActivitySummary(activityEntries[0] || identity.lastActivity);
    const counts = getJsonRecordCounts(snapshot, activityEntries);
    const catalogos = CATALOGS.reduce((acc, catalog) => {
      acc[catalog.id] = snapshot[catalog.id] || [];
      return acc;
    }, {});

    return {
      metadata: {
        appName: APP_NAME,
        backupVersion: 2,
        appVersion: APP_VERSION,
        schemaVersion: SCHEMA_VERSION,
        exportedAt,
        exportedAtDisplay: formatDateTime(exportedAt),
        fechaExportacion: exportedAt,
        sourceDeviceId: identity.deviceId,
        sourceDeviceName: identity.deviceName,
        fileName: cleanText(exportOptions.fileName),
        lastActivity,
        counts,
        recordCounts: counts,
        source: 'KSA PRÁCTIKA respaldo JSON manual'
      },
      appName: APP_NAME,
      schemaVersion: SCHEMA_VERSION,
      fechaExportacion: exportedAt,
      exportedAt,
      registros: {
        catalogos,
        ventas: snapshot.ventas || [],
        cobros: snapshot.cobros || [],
        comprasProveedores: snapshot.comprasProveedores || [],
        pagosProveedores: snapshot.pagosProveedores || [],
        gastos: snapshot.gastos || [],
        bdatos: snapshot.bdatos || [],
        bdatosUpdatedAt: snapshot.bdatosUpdatedAt || '',
        cierres: snapshot.cierresMensuales || [],
        cierresMensuales: snapshot.cierresMensuales || [],
        exportacionesExcel: snapshot.exportacionesExcel || [],
        configuracion: normalizeConfiguracion(snapshot.configuracion),
        bitacora: activityEntries
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

    const exportedAt = nowIso();
    const { fileName, sequence } = buildJsonExportFileName(exportedAt);
    registerActivity({
      module: 'JSON',
      action: 'Exportado',
      entityType: 'Respaldo JSON',
      entityRef: fileName,
      detail: buildActivityDetail(['JSON exportado', fileName]),
      source: 'local'
    });

    const payload = buildJsonBackupPayload({ exportedAt, fileName });
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    saveJsonExportSequence(sequence + 1);

    appData.configuracion = {
      ...normalizeConfiguracion(appData.configuracion),
      lastBackupAt: payload.fechaExportacion,
      lastJsonBackupSummary: normalizeJsonBackupExportSummary({
        exportedAt: payload.metadata.exportedAt,
        exportedAtDisplay: payload.metadata.exportedAtDisplay,
        sourceDeviceId: payload.metadata.sourceDeviceId,
        sourceDeviceName: payload.metadata.sourceDeviceName,
        fileName,
        counts: payload.metadata.counts,
        lastActivity: payload.metadata.lastActivity
      }),
      updatedAt: nowIso()
    };
    configState.message = 'Respaldo JSON exportado con metadata de origen y fecha de último respaldo actualizada.';
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
      activityLog: [],
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
        activityLog: result.activityLog || [],
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
        activityLog: [],
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
    if (!metadata) warnings.push('Respaldo sin metadata de origen. Se acepta si la estructura es compatible.');

    const appName = cleanText(raw?.appName || metadata?.appName || raw?.registros?.configuracion?.appName || raw?.configuracion?.appName);
    const schemaVersion = cleanText(raw?.schemaVersion || metadata?.schemaVersion || raw?.registros?.configuracion?.schemaVersion || raw?.configuracion?.schemaVersion);
    const backupDate = cleanText(raw?.fechaExportacion || raw?.exportedAt || metadata?.exportedAt || metadata?.fechaExportacion || metadata?.updatedAt || raw?.metadata?.createdAt);
    const activityLog = extractActivityLogFromJsonBackup(raw);
    const lastJsonOperation = detectLastOperationFromJsonBackup(raw);
    const metadataCounts = normalizeBackupCounts(metadata?.counts || metadata?.recordCounts || {});
    const metadataPreview = {
      backupVersion: cleanText(metadata?.backupVersion) || '',
      exportedAt: backupDate,
      exportedAtDisplay: cleanText(metadata?.exportedAtDisplay || metadata?.fechaExportacionVisible) || (backupDate ? formatDateTime(backupDate) : ''),
      sourceDeviceId: cleanText(metadata?.sourceDeviceId || metadata?.deviceId),
      sourceDeviceName: cleanText(metadata?.sourceDeviceName || metadata?.deviceName || metadata?.equipo),
      lastActivity: normalizeActivitySummary(metadata?.lastActivity || metadata?.ultimaActividad),
      counts: metadataCounts
    };

    const extracted = extractDataFromJsonBackup(raw);
    if (!extracted.data) errors.push('No se encontró estructura compatible de registros.');
    if (appName && appName !== APP_NAME) warnings.push(`El appName del archivo es “${appName}”; se acepta solo si la estructura es compatible con KSA PRÁCTIKA.`);
    if (!appName && extracted.data) warnings.push('El respaldo no trae appName explícito; se validó por estructura compatible.');
    if (!schemaVersion) warnings.push('El respaldo no trae schemaVersion explícito; se intentará normalizar con el schema actual.');
    if (!backupDate) warnings.push('El respaldo no trae fecha de exportación; se validará por estructura compatible.');

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
    const counts = getJsonRecordCounts(data, activityLog);
    if (counts.total <= 0) warnings.push('El respaldo no contiene registros operativos; puede ser una base vacía.');
    if (schemaVersion && schemaVersion !== SCHEMA_VERSION) warnings.push(`Schema del archivo: ${schemaVersion}. Schema actual: ${SCHEMA_VERSION}. Se intentará normalizar.`);
    const banksWithoutType = Array.isArray(data.cuentasBancos)
      ? data.cuentasBancos.filter((bank) => cleanText(bank?.nombre) && !normalizeBankType(bank?.tipo)).length
      : 0;
    if (banksWithoutType > 0) warnings.push(`${banksWithoutType} banco${banksWithoutType === 1 ? '' : 's'} sin tipo detectado${banksWithoutType === 1 ? '' : 's'}; se conservarán y podrás completar el tipo desde Catálogos → Bancos.`);
    const totalAjustesImportados = (counts.ajustesClientes || 0) + (counts.ajustesProveedores || 0);
    if (totalAjustesImportados > 0) warnings.push(`Se detectaron ${totalAjustesImportados} ajuste(s)/nota(s); se importarán ligados a su documento original y no como cobros/pagos.`);

    const comparison = buildJsonImportComparison({
      data,
      metadataPreview,
      counts,
      backupDate,
      hasMetadata: Boolean(metadata)
    });

    const preview = {
      isValid: errors.length === 0,
      hasMetadata: Boolean(metadata),
      appName: appName || APP_NAME,
      schemaVersion: schemaVersion || SCHEMA_VERSION,
      backupDate,
      metadata: metadataPreview,
      lastJsonOperation,
      counts,
      comparison,
      errors,
      warnings
    };
    return { preview, data: normalized, activityLog };
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
          bdatos: registros.bdatos || registros.Bdatos || [],
          bdatosUpdatedAt: registros.bdatosUpdatedAt || registros.bdatosLastUpdatedAt || '',
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
        bdatos: raw.bdatos || raw.Bdatos || [],
        bdatosUpdatedAt: raw.bdatosUpdatedAt || raw.bdatosLastUpdatedAt || '',
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

    const fileName = jsonBackupState.fileName;
    const preview = jsonBackupState.preview;
    const importSummary = buildJsonImportSummary(preview, selectedMode, fileName);
    const incomingActivityLog = Array.isArray(jsonBackupState.activityLog) ? jsonBackupState.activityLog : [];
    const result = applyJsonBackupPayload(jsonBackupState.payload, selectedMode);
    const activityImportResult = mergeImportedActivityLog(incomingActivityLog);
    appData.configuracion = {
      ...normalizeConfiguracion(appData.configuracion),
      lastImportAt: importSummary.importedAt || nowIso(),
      lastJsonImportSummary: importSummary,
      updatedAt: nowIso()
    };
    saveData(appData);
    saveJsonAppliedMetadata(fileName, importSummary.importedAt || nowIso());
    appendJsonImportHistoryEntry(buildJsonImportHistoryEntry(
      importSummary,
      preview,
      Array.isArray(preview?.warnings) && preview.warnings.length ? 'Importado con advertencias' : 'Importado correctamente'
    ));
    jsonBackupState.preview = null;
    jsonBackupState.payload = null;
    jsonBackupState.activityLog = [];
    jsonBackupState.message = selectedMode === 'replace'
      ? `Importación JSON completada por reemplazo. Registros cargados: ${result.loaded.total}. Bitácora nueva: ${activityImportResult.added}.`
      : `Importación JSON completada por fusión. Agregados: ${result.added.total}. Duplicados omitidos: ${result.skipped}. Bitácora nueva: ${activityImportResult.added}.`;
    jsonBackupState.messageType = 'success';
    const originName = importSummary.sourceDeviceName || 'Origen no identificado';
    const exportedText = importSummary.exportedAtDisplay || formatDateTime(importSummary.exportedAt);
    registerActivity({
      module: 'JSON',
      action: 'Importado',
      entityType: 'Respaldo JSON',
      entityRef: fileName,
      detail: selectedMode === 'replace'
        ? buildActivityDetail(['JSON importado por reemplazo', fileName, originName, exportedText ? `Exportado ${exportedText}` : '', formatBackupCountsSummary(importSummary.counts), `${result.loaded.total} registros`])
        : buildActivityDetail(['JSON importado por fusión', fileName, originName, exportedText ? `Exportado ${exportedText}` : '', formatBackupCountsSummary(importSummary.counts), `${result.added.total} agregados`, `${result.skipped} duplicados omitidos`]),
      source: 'importado'
    });
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
    const added = { catalogos: 0, bdatos: 0, ventas: 0, cobros: 0, comprasProveedores: 0, pagosProveedores: 0, gastos: 0, cierresMensuales: 0, exportacionesExcel: 0, total: 0 };
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
        const mergedExisting = mergeVentaAjustes(existing, remapped);
        target.ventas = target.ventas.map((item) => item.id === existing.id ? mergedExisting : item);
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
        const mergedExisting = mergeCompraProveedorAjustes(existing, remapped);
        target.comprasProveedores = target.comprasProveedores.map((item) => item.id === existing.id ? mergedExisting : item);
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
        metodoPagoId: idMaps.metodosPago.get(cobro.metodoPagoId) || cobro.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(cobro.cuentaBancoId) || cobro.cuentaBancoId,
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
        compraIdOrigen: compraIdMap.get(pago.compraIdOrigen) || compraProveedorId,
        proveedorId: idMaps.proveedores.get(pago.proveedorId) || pago.proveedorId,
        metodoPagoId: idMaps.metodosPago.get(pago.metodoPagoId) || pago.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(pago.cuentaBancoId) || pago.cuentaBancoId,
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

    incoming.bdatos.forEach((articulo) => {
      const normalized = normalizeBdatosRecord({ ...articulo, updatedAt: articulo.updatedAt || timestamp });
      const existing = target.bdatos.find((item) => item.id === normalized.id || cleanText(item.codigo) === cleanText(normalized.codigo));
      if (existing) {
        skipped += 1;
        return;
      }
      target.bdatos = sortBdatosRecords([normalized, ...target.bdatos]);
      added.bdatos += 1;
    });
    if (added.bdatos > 0) target.bdatosUpdatedAt = timestamp;

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
    added.total = added.catalogos + added.bdatos + added.ventas + added.cobros + added.comprasProveedores + added.pagosProveedores + added.gastos + added.cierresMensuales + added.exportacionesExcel;
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
        const existing = target[catalog.id].find((item) => catalogRecordsMatchForMerge(catalog.id, item, normalized));
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
      activityLog: [],
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

  function updateDeviceIdentityFromForm(form) {
    const formData = new FormData(form);
    const deviceName = cleanText(formData.get('deviceName'));
    if (!deviceName) {
      configState.message = 'El nombre de este equipo no puede quedar vacío.';
      configState.messageType = 'error';
      renderRoute();
      return;
    }

    const timestamp = nowIso();
    saveDeviceIdentity({
      ...appDeviceIdentity,
      deviceName,
      updatedAt: timestamp
    });

    configState.message = `Identidad del equipo guardada: ${deviceName}.`;
    configState.messageType = 'success';
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


  function updatePwaRuntimeState(status, options = {}) {
    pwaState = {
      ...pwaState,
      status: status || pwaState.status || 'Actualizada',
      statusType: options.statusType || pwaState.statusType || 'success',
      updateAvailable: typeof options.updateAvailable === 'boolean' ? options.updateAvailable : pwaState.updateAvailable,
      isChecking: Boolean(options.isChecking),
      isApplying: Boolean(options.isApplying),
      message: typeof options.message === 'string' ? options.message : (pwaState.message || '')
    };
  }

  function persistPwaTimestamp(fieldName, timestamp = nowIso()) {
    if (!['pwaLastSearchAt', 'pwaLastUpdateAt'].includes(fieldName)) return;
    appData.configuracion = normalizeConfiguracion({
      ...appData.configuracion,
      [fieldName]: timestamp,
      updatedAt: timestamp
    });
    saveData(appData);
  }

  function renderConfigIfVisible() {
    const route = getRoute();
    if (isConfigRoute(route)) {
      renderRoute({ preserveScroll: true });
    }
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function waitForServiceWorkerInstalled(worker) {
    if (!worker) return Promise.resolve(false);
    if (worker.state === 'installed') return Promise.resolve(true);
    return new Promise((resolve) => {
      const timeout = window.setTimeout(() => resolve(false), 1800);
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
          window.clearTimeout(timeout);
          resolve(true);
        }
      }, { once: false });
    });
  }

  function wireServiceWorkerRegistration(registration) {
    if (!registration || registration.__ksaPractikaWired) return;
    registration.__ksaPractikaWired = true;

    if (registration.waiting && navigator.serviceWorker.controller) {
      updatePwaRuntimeState('Actualización disponible', {
        statusType: 'success',
        updateAvailable: true,
        message: 'Hay una actualización disponible.'
      });
      renderConfigIfVisible();
    }

    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      if (!worker) return;
      updatePwaRuntimeState('Buscando actualización…', {
        statusType: 'success',
        isChecking: true,
        message: 'Buscando actualización…'
      });
      renderConfigIfVisible();

      worker.addEventListener('statechange', () => {
        if (worker.state !== 'installed') return;
        if (navigator.serviceWorker.controller) {
          updatePwaRuntimeState('Actualización disponible', {
            statusType: 'success',
            updateAvailable: true,
            message: 'Hay una actualización disponible.'
          });
        } else {
          updatePwaRuntimeState('Actualizada', {
            statusType: 'success',
            updateAvailable: false,
            message: 'La app ya está actualizada.'
          });
        }
        renderConfigIfVisible();
      });
    });
  }

  async function getOrRegisterServiceWorker() {
    if (!('serviceWorker' in navigator)) return null;
    const existing = await navigator.serviceWorker.getRegistration();
    serviceWorkerRegistration = existing || serviceWorkerRegistration || await navigator.serviceWorker.register('service-worker.js');
    wireServiceWorkerRegistration(serviceWorkerRegistration);
    return serviceWorkerRegistration;
  }

  async function checkForPwaUpdate() {
    const searchAt = nowIso();
    persistPwaTimestamp('pwaLastSearchAt', searchAt);
    updatePwaRuntimeState('Buscando actualización…', {
      statusType: 'success',
      updateAvailable: false,
      isChecking: true,
      message: 'Buscando actualización…'
    });
    renderConfigIfVisible();

    if (!('serviceWorker' in navigator)) {
      updatePwaRuntimeState('Error al buscar actualización', {
        statusType: 'error',
        updateAvailable: false,
        message: 'No se pudo buscar actualización. Este navegador no tiene Service Worker disponible.'
      });
      renderConfigIfVisible();
      return;
    }

    try {
      const registration = await getOrRegisterServiceWorker();
      if (!registration) throw new Error('Service Worker no disponible.');
      await registration.update();
      await wait(350);
      if (registration.installing) {
        await waitForServiceWorkerInstalled(registration.installing);
      }

      if (registration.waiting && navigator.serviceWorker.controller) {
        updatePwaRuntimeState('Actualización disponible', {
          statusType: 'success',
          updateAvailable: true,
          message: 'Hay una actualización disponible.'
        });
      } else {
        updatePwaRuntimeState('No hay actualización disponible', {
          statusType: 'success',
          updateAvailable: false,
          message: 'La app ya está actualizada.'
        });
      }
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo buscar actualización PWA.', error);
      updatePwaRuntimeState('Error al buscar actualización', {
        statusType: 'error',
        updateAvailable: false,
        message: 'No se pudo buscar actualización. Intenta nuevamente.'
      });
    }
    renderConfigIfVisible();
  }

  function reloadAppAfterPwaUpdate() {
    if (pwaReloadScheduled) return;
    pwaReloadScheduled = true;
    rememberConfigScrollForReload();
    try {
      const previousLock = sessionStorage.getItem(PWA_RELOAD_LOCK_KEY);
      if (previousLock === APP_VERSION) return;
      sessionStorage.setItem(PWA_RELOAD_LOCK_KEY, APP_VERSION);
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo registrar bloqueo de recarga PWA.', error);
    }
    try {
      sessionStorage.removeItem(PWA_APPLY_PENDING_KEY);
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo limpiar estado de actualización PWA.', error);
    }
    window.location.reload();
  }

  async function applyPwaUpdate() {
    const updateAt = nowIso();
    persistPwaTimestamp('pwaLastUpdateAt', updateAt);
    updatePwaRuntimeState('Actualización aplicada, recargando…', {
      statusType: 'success',
      updateAvailable: false,
      isApplying: true,
      message: 'Actualización aplicada. Recargando…'
    });
    renderConfigIfVisible();

    if (!('serviceWorker' in navigator)) {
      rememberConfigScrollForReload();
      window.setTimeout(() => window.location.reload(), 250);
      return;
    }

    try {
      try {
        sessionStorage.setItem(PWA_APPLY_PENDING_KEY, APP_VERSION);
      } catch (error) {
        console.warn('KSA PRÁCTIKA: no se pudo registrar actualización pendiente PWA.', error);
      }
      const registration = await getOrRegisterServiceWorker();
      const waitingWorker = registration?.waiting;
      if (waitingWorker) {
        waitingWorker.postMessage({ type: 'KSA_PRACTIKA_SKIP_WAITING' });
        window.setTimeout(reloadAppAfterPwaUpdate, 1800);
      } else {
        window.setTimeout(reloadAppAfterPwaUpdate, 350);
      }
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo aplicar actualización PWA.', error);
      window.setTimeout(reloadAppAfterPwaUpdate, 350);
    }
  }

  function setupPwaUpdateListeners() {
    if (!('serviceWorker' in navigator)) return;

    try {
      if (sessionStorage.getItem(PWA_RELOAD_LOCK_KEY) === APP_VERSION) {
        sessionStorage.removeItem(PWA_APPLY_PENDING_KEY);
      }
    } catch (error) {
      console.warn('KSA PRÁCTIKA: no se pudo normalizar estado PWA.', error);
    }

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      let shouldReload = pwaState.isApplying;
      try {
        shouldReload = shouldReload || sessionStorage.getItem(PWA_APPLY_PENDING_KEY) === APP_VERSION;
      } catch (error) {
        console.warn('KSA PRÁCTIKA: no se pudo revisar estado PWA pendiente.', error);
      }
      if (shouldReload) reloadAppAfterPwaUpdate();
    });

    window.addEventListener('load', () => {
      getOrRegisterServiceWorker().catch((error) => {
        console.warn('KSA PRÁCTIKA: service worker no registrado.', error);
      });
    });
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
    const cierreStatus = buildPeriodClosingStatus(closeMonth, closeYear);
    const hasClosingBlock = hasPeriodClosingBlock(cierreStatus);
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
          <p class="notice ${cierre ? 'success-note' : ''}">${cierre ? `Período cerrado el ${escapeHtml(formatDateTime(cierre.fechaHoraCierre))}. Las ediciones posteriores quedan con advertencia clara.` : 'Para cerrar, primero se valida que no existan saldos pendientes de Clientes ni Proveedores del período de origen. Luego debe existir una exportación Excel guardada para el mismo mes/año.'}</p>
          ${renderCierrePeriodStatusBox(cierreStatus, lastExport)}
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
              <div class="status-item"><strong>Bloqueo</strong><span>${escapeHtml(getPeriodBlockingOrigin(cierreStatus))}</span></div>
              <div class="status-item"><strong>Estado cierre</strong><span>${escapeHtml(cierreStatus.estado)}</span></div>
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
          ${cierres.length ? renderCierresRecientesCompactTable(cierres) : `<div class="empty-state"><strong>Sin cierres registrados.</strong><p>Cuando cierres un mes, aparecerá aquí con fecha, rol y archivo Excel usado.</p></div>`}
        </article>
      </section>
    `;
  }


  function renderCierresRecientesCompactTable(cierres) {
    const rows = cierres.map((item) => `
      <tr class="compact-record-row closing-compact-row">
        <td class="closing-compact-period"><span>${escapeHtml(getMonthLabel(item.month))} ${escapeHtml(item.year)}</span></td>
        <td class="closing-compact-date"><span>${escapeHtml(formatDateTime(item.fechaHoraCierre))}</span></td>
        <td class="closing-compact-file"><span title="${escapeHtml(item.nombreArchivoExcel || 'Sin nombre de archivo registrado')}">${escapeHtml(item.nombreArchivoExcel || 'Sin nombre de archivo registrado')}</span></td>
      </tr>
    `).join('');

    return renderOperationalTableShell({
      shellClass: 'closing-compact-scroll-shell',
      wrapClass: 'closing-compact-table-wrap',
      ariaLabel: 'Historial de cierres recientes en líneas compactas',
      tableClass: 'closing-compact-table',
      colgroup: `
        <colgroup>
          <col class="closing-col-periodo">
          <col class="closing-col-fecha">
          <col class="closing-col-archivo">
        </colgroup>
      `,
      headers: `
        <th>Período</th>
        <th>Fecha</th>
        <th>Archivo</th>
      `,
      rows
    });
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
      registerActivity({
        module: 'Excel / Cierre',
        action: 'Exportado',
        entityType: 'Excel',
        entityRef: result.fileName,
        detail: buildActivityDetail(['Excel exportado', periodo, result.fileName]),
        source: 'local'
      });
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

    const cierreStatus = buildPeriodClosingStatus(month, year);
    if (hasPeriodClosingBlock(cierreStatus)) {
      const origin = getPeriodBlockingOrigin(cierreStatus);
      const detail = buildPeriodBlockingSummaryText(cierreStatus);
      cierreMensualState.message = `No se puede cerrar ${getMonthLabel(month)} ${year} porque aún existen saldos pendientes vinculados a este período. Bloqueo: ${origin}.${detail ? `\n${detail}` : ''}`;
      cierreMensualState.messageType = 'error';
      renderRoute();
      return;
    }

    const lastExport = getLastExcelExportForPeriod(month, year);
    if (!lastExport) {
      cierreMensualState.message = `${getMonthLabel(month)} ${year} ya está listo para cierre. Primero exporta Excel para ese mismo mes/año.`;
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
    registerActivity({
      module: 'Excel / Cierre',
      action: 'Cierre mensual',
      entityType: 'Cierre',
      entityRef: periodo,
      detail: buildActivityDetail(['Cierre mensual registrado', getMonthLabel(month), year, lastExport.nombreArchivo]),
      source: 'sistema'
    });
    cierreMensualState.message = `Cierre mensual registrado para ${getMonthLabel(month)} ${year}.`;
    cierreMensualState.messageType = 'success';
    renderRoute();
  }

  function buildClosingTotals(summary) {
    return {
      totalSubtotalVentas: roundMoney(summary.totalSubtotalVentas || summary.totalVendidoOriginal || 0),
      totalDescuentosVentas: roundMoney(summary.totalDescuentosVentas || 0),
      totalVendidoOriginal: roundMoney(summary.totalVendidoOriginal || 0),
      totalAjustesClientes: roundMoney(summary.totalAjustesClientes || 0),
      totalVendido: roundMoney(summary.totalVendido),
      ventaNetaAjustada: roundMoney(summary.ventaNetaAjustada || summary.totalVendido),
      totalCobradoClientes: roundMoney(summary.totalCobradoClientes),
      saldoPorCobrar: roundMoney(summary.saldoPorCobrar),
      totalComprasOriginal: roundMoney(summary.totalComprasOriginal || 0),
      totalAjustesProveedores: roundMoney(summary.totalAjustesProveedores || 0),
      totalComprasProveedores: roundMoney(summary.totalComprasProveedores),
      totalComprasAjustadas: roundMoney(summary.totalComprasAjustadas || summary.totalComprasProveedores),
      totalPagadoProveedores: roundMoney(summary.totalPagadoProveedores),
      saldoPorPagar: roundMoney(summary.saldoPorPagar),
      totalGastos: roundMoney(summary.totalGastos),
      flujoPeriodo: roundMoney(summary.flujoPeriodo),
      utilidadPeriodo: roundMoney(summary.utilidadPeriodo || 0),
      utilidadDelPeriodo: roundMoney(summary.utilidadDelPeriodo || summary.utilidadPeriodo || 0),
      utilidadAcumulada: roundMoney(summary.utilidadAcumulada || 0),
      utilidadVentasPeriodo: roundMoney(summary.utilidadVentasPeriodo || 0),
      utilidadComprasPeriodo: roundMoney(summary.utilidadComprasPeriodo || 0),
      utilidadGastosPeriodo: roundMoney(summary.utilidadGastosPeriodo || 0),
      utilidadVentasAcumulada: roundMoney(summary.utilidadVentasAcumulada || 0),
      utilidadComprasAcumulada: roundMoney(summary.utilidadComprasAcumulada || 0),
      utilidadGastosAcumulada: roundMoney(summary.utilidadGastosAcumulada || 0),
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
      [xlsxText('Subtotal ventas'), xlsxMoney(summary.totalSubtotalVentas || summary.totalVendidoOriginal || 0)],
      [xlsxText('Descuento ventas'), xlsxMoney(summary.totalDescuentosVentas || 0)],
      [xlsxText('Total ventas'), xlsxMoney(summary.totalVendidoOriginal || 0)],
      [xlsxText('Ajustes clientes'), xlsxMoney((summary.totalAjustesClientes || 0) > 0 ? -summary.totalAjustesClientes : 0)],
      [xlsxText('Total ventas ajustado'), xlsxMoney(summary.totalVendido)],
      [xlsxText('Total cobrado clientes'), xlsxMoney(summary.totalCobradoClientes)],
      [xlsxText('Saldo por cobrar'), xlsxMoney(summary.saldoPorCobrar)],
      [xlsxText('Compras originales'), xlsxMoney(summary.totalComprasOriginal || 0)],
      [xlsxText('Ajustes proveedores'), xlsxMoney((summary.totalAjustesProveedores || 0) > 0 ? -summary.totalAjustesProveedores : 0)],
      [xlsxText('Compras ajustadas'), xlsxMoney(summary.totalComprasProveedores)],
      [xlsxText('Pagado proveedores'), xlsxMoney(summary.totalPagadoProveedores)],
      [xlsxText('Saldo por pagar'), xlsxMoney(summary.saldoPorPagar)],
      [xlsxText('Total gastos'), xlsxMoney(summary.totalGastos)],
      [xlsxText('Flujo del período'), xlsxMoney(summary.flujoPeriodo)],
      [xlsxText('Clientes en mora'), xlsxNumber(summary.clientesMora.length)],
      [xlsxText('Proveedores en mora'), xlsxNumber(summary.proveedoresMora.length)],
      [],
      xlsxHeaderRow(['Gastos por tipo', 'Total', 'Cantidad'])
    ];
    summary.gastosPorTipo.forEach((item) => rows.push([xlsxText(item.tipo), xlsxMoney(item.total), xlsxNumber(item.cantidad)]));
    rows.push([], xlsxHeaderRow(['Venta ajustada por sucursal', 'Venta ajustada', 'Total cobrado', 'Saldo por cobrar', 'Documentos']));
    summary.ventaPorSucursal.forEach((item) => rows.push([xlsxText(item.sucursal), xlsxMoney(item.totalVendido), xlsxMoney(item.totalCobrado), xlsxMoney(item.saldoPorCobrar), xlsxNumber(item.documentos)]));
    rows.push([], xlsxHeaderRow(['Saldos por proveedor', 'Original', 'Ajustes', 'Ajustado', 'Pagado', 'Saldo por pagar', 'Documentos']));
    summary.saldosPorProveedor.forEach((item) => rows.push([
      xlsxText(item.proveedor),
      xlsxMoney(item.totalCompra),
      xlsxMoney(item.totalAjustes > 0 ? -item.totalAjustes : 0),
      xlsxMoney(item.totalAjustado),
      xlsxMoney(item.totalPagado),
      xlsxMoney(item.saldoPorPagar),
      xlsxNumber(item.documentos)
    ]));
    rows.push([], xlsxHeaderRow(['Clientes', 'Sucursal', 'OC', 'Entrega', 'Vence', 'Días', 'Saldo', 'Estado']));
    summary.clientesMora.forEach((item) => rows.push([xlsxText(item.cliente), xlsxText(item.sucursal), xlsxText(item.documento), xlsxDate(item.fechaEntrega), xlsxDate(item.fechaVencimiento), xlsxNumber(item.diasMora), xlsxMoney(item.saldoPendiente), xlsxText(item.estado)]));
    rows.push([], xlsxHeaderRow(['Proveedores en mora', 'Referencia', 'Fecha vencimiento', 'Días mora', 'Saldo pendiente', 'Estado']));
    summary.proveedoresMora.forEach((item) => rows.push([xlsxText(item.proveedor), xlsxText(item.documento), xlsxDate(item.fechaVencimiento), xlsxNumber(item.diasMora), xlsxMoney(item.saldoPendiente), xlsxText(item.estado)]));

    return { name: 'Resumen', rows, cols: [28, 18, 18, 16, 18, 14, 18, 18] };
  }

  function buildVentasSheet(summary) {
    const rows = [
      [xlsxTitle('Ventas / OC')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha', 'Fecha entrega', 'Cliente', 'Sucursal', 'OC', 'Facturas', 'Envío', 'Transportista', 'Embarque', 'Estimada', 'Real', 'Guía', 'Subtotal', 'Descuento', 'Total', 'Ajustes', 'Cobrado', 'Saldo', 'Vence', 'Mora', 'Estado', 'Detalle', 'Observación'])
    ];
    getVentasForExport(summary.range, summary.filters).forEach((venta) => {
      const cliente = getCatalogRecordById('clientes', venta.clienteId);
      const sucursal = getCatalogRecordById('sucursales', venta.sucursalId);
      const logistica = normalizeLogisticaVentaRecord(venta.logistica);
      rows.push([
        xlsxDate(venta.fechaOc),
        xlsxDate(venta.fechaEntrega),
        xlsxText(cliente?.nombre || venta.clienteNombre || 'Cliente no encontrado'),
        xlsxText(sucursal?.nombre || venta.sucursalNombre || 'Sucursal no encontrada'),
        xlsxText(venta.numeroDocumento),
        xlsxText(formatFacturasVentaResumen(venta.facturas)),
        xlsxText(venta.requiereEnvio ? 'Sí' : 'No'),
        xlsxText(logistica.transportista),
        xlsxDate(logistica.fechaEmbarque),
        xlsxDate(logistica.fechaEstimada),
        xlsxDate(logistica.fechaReal),
        xlsxText(logistica.guia),
        xlsxMoney(venta.subtotal),
        xlsxMoney(venta.descuento),
        xlsxMoney(venta.ventaNetaOriginal),
        xlsxMoney(venta.totalAjustes > 0 ? -venta.totalAjustes : 0),
        xlsxMoney(venta.totalCobrado),
        xlsxMoney(venta.saldoPorCobrar),
        xlsxDate(venta.fechaVencimiento),
        xlsxNumber(getVentaDaysOverdue(venta)),
        xlsxText(venta.estado),
        xlsxText(formatVentaAjustesExport(venta.ajustes)),
        xlsxText(venta.observacion)
      ]);
    });
    return { name: 'Ventas', rows, cols: [14, 16, 24, 24, 18, 30, 14, 20, 16, 16, 16, 18, 14, 14, 14, 14, 16, 16, 16, 12, 14, 38, 32] };
  }

  function buildProveedoresSheet(summary) {
    const rows = [
      [xlsxTitle('Proveedores / Compras')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha compra', 'Proveedor', 'Referencia', 'Fecha vencimiento', 'Original', 'Ajustes', 'Ajustado', 'Pagado', 'Saldo por pagar', 'Días mora', 'Estado', 'Ajustes detalle', 'Observación'])
    ];
    getComprasForExport(summary.range, summary.filters).forEach((compra) => {
      const proveedor = getCatalogRecordById('proveedores', compra.proveedorId);
      rows.push([
        xlsxDate(compra.fechaCompra),
        xlsxText(proveedor?.nombre || compra.proveedorNombre || 'Proveedor no encontrado'),
        xlsxText(compra.facturaReferencia),
        xlsxDate(compra.fechaVencimiento),
        xlsxMoney(compra.totalCompra),
        xlsxMoney(compra.totalAjustes > 0 ? -compra.totalAjustes : 0),
        xlsxMoney(compra.totalAjustado),
        xlsxMoney(compra.totalPagado),
        xlsxMoney(compra.saldoPorPagar),
        xlsxNumber(getDaysOverdue(compra.fechaVencimiento)),
        xlsxText(compra.estado),
        xlsxText(formatCompraAjustesExport(compra.ajustes)),
        xlsxText(compra.observacion)
      ]);
    });
    return { name: 'Proveedores', rows, cols: [16, 28, 22, 16, 18, 14, 18, 16, 16, 12, 14, 38, 34] };
  }

  function buildGastosSheet(summary) {
    const rows = [
      [xlsxTitle('Gastos')],
      [xlsxLabel('Período'), xlsxText(summary.periodLabel)],
      [],
      xlsxHeaderRow(['Fecha', 'Tipo de gasto', 'Monto', 'Método', 'Banco', 'Estado', 'Observación'])
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
        xlsxText(cuenta?.nombre || gasto.cuentaBancoNombre || 'Sin banco'),
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
      if (catalog.id === 'clientes') headers.splice(1, 0, 'Código', 'Condición de pago', 'Días de crédito');
      if (catalog.id === 'sucursales') headers.splice(1, 0, 'Cliente asociado');
      if (catalog.id === 'proveedores') headers.splice(1, 0, 'Contacto', 'Condición de pago', 'Días de crédito');
      if (catalog.id === 'cuentasBancos') headers.splice(1, 0, 'Tipo');
      headers.push('Observación');
      rows.push(xlsxHeaderRow(headers));
      getCatalogRecords(catalog.id).forEach((record) => {
        const base = [xlsxText(record.nombre)];
        if (catalog.id === 'clientes') {
          const terms = normalizePaymentTermsFields(record);
          base.push(xlsxText(record.codigo), xlsxText(terms.condicionPago), xlsxNumber(terms.diasCredito));
        }
        if (catalog.id === 'sucursales') base.push(xlsxText(getCatalogRecordById('clientes', record.clienteId)?.nombre || ''));
        if (catalog.id === 'proveedores') {
          const terms = normalizePaymentTermsFields(record);
          base.push(xlsxText(record.contacto), xlsxText(terms.condicionPago), xlsxNumber(terms.diasCredito));
        }
        if (catalog.id === 'cuentasBancos') base.push(xlsxText(getBankTypeDisplay(record)));
        base.push(xlsxText(record.activo ? 'Activo' : 'Inactivo'), xlsxText(record.observacion));
        rows.push(base);
      });
      rows.push([]);
    });
    return { name: 'Catálogos', rows, cols: [28, 24, 18, 14, 14, 36, 20, 20] };
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
    const rawType = cleanText(pickCell(row, ['Tipo banco', 'Tipo Banco', 'Tipo cuenta', 'Tipo']));
    const bankType = catalogId === 'cuentasBancos' ? normalizeBankType(rawType) : '';
    const existing = payload[catalogId].find((item) => {
      const sameName = normalizeNameForCompare(item.nombre) === normalizeNameForCompare(safeName);
      if (!sameName) return false;
      if (catalogId === 'cuentasBancos') return normalizeBankType(item.tipo) === bankType;
      return true;
    });
    if (existing) return existing.id;
    const record = normalizeCatalogRecord({
      id: generateId(catalogId),
      nombre: safeName,
      codigo: cleanText(pickCell(row, ['Código', 'Codigo'])),
      contacto: cleanText(pickCell(row, ['Contacto', 'Teléfono', 'Telefono', 'Correo'])),
      condicionPago: cleanText(pickCell(row, ['Condición de pago', 'Condicion de pago', 'Condición', 'Condicion', 'Forma de pago', 'Tipo pago'])),
      diasCredito: parsePositiveInteger(pickCell(row, ['Días de crédito', 'Dias de credito', 'Días crédito', 'Dias credito', 'Crédito', 'Credito'])),
      tipo: catalogId === 'cuentasBancos' ? bankType : cleanText(pickCell(row, ['Tipo cuenta', 'Tipo'])),
      observacion: cleanText(pickCell(row, ['Observación', 'Observacion', 'Notas']))
    }, CATALOGS.find((catalog) => catalog.id === catalogId));
    payload[catalogId].push(record);
    return record.id;
  }

  function importVentasRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Ventas', [['OC/documento', 'OC', 'Documento'], ['Cliente'], ['Subtotal', 'Monto OC', 'Monto', 'Total OC']]);
    payload.__headersVentas = parsed.headers;
    parsed.objects.forEach((row, index) => {
      const clienteNombre = cleanText(pickCell(row, ['Cliente', 'Nombre cliente']));
      const sucursalNombre = cleanText(pickCell(row, ['Sucursal', 'Tienda', 'Ubicación', 'Ubicacion']));
      const clienteId = clienteNombre ? addImportCatalog(payload, 'clientes', clienteNombre) : '';
      const sucursalId = sucursalNombre ? addImportCatalog(payload, 'sucursales', sucursalNombre, { Cliente: clienteNombre }) : '';
      const totalCobrado = parseExcelMoney(pickCell(row, ['Total cobrado', 'Cobrado', 'Pagado', 'Abonado']));
      const totalAjustes = Math.abs(parseExcelMoney(pickCell(row, ['Ajustes', 'Ajuste', 'Notas crédito', 'Notas de crédito', 'Nota de crédito'])) || 0);
      const subtotalRaw = pickCell(row, ['Subtotal', 'Monto OC', 'Monto de OC', 'Total OC', 'Total de la OC', 'Monto']);
      const ventaNetaRaw = pickCell(row, ['Total', 'Venta neta original', 'Venta neta', 'Venta neta ajustada', 'Neto']);
      const descuentoImportado = parseExcelMoney(pickCell(row, ['Descuento', 'Desc']));
      const legacyNoVa = parseExcelMoney(pickCell(row, ['NO VA', 'No VA', 'NOVA', 'No va']));
      const legacyDescuentoNoVa = parseExcelMoney(pickCell(row, ['Descuento NO VA', 'Desc NO VA', 'Descuento NOVA']));
      const montoOcLegacy = parseExcelMoney(subtotalRaw || ventaNetaRaw);
      const subtotal = !Number.isNaN(parseExcelMoney(pickCell(row, ['Subtotal'])))
        ? parseExcelMoney(pickCell(row, ['Subtotal']))
        : (!Number.isNaN(parseExcelMoney(ventaNetaRaw))
          ? roundMoney(parseExcelMoney(ventaNetaRaw) + (Number.isNaN(descuentoImportado) ? 0 : descuentoImportado))
          : roundMoney((Number.isNaN(montoOcLegacy) ? 0 : montoOcLegacy) - (Number.isNaN(legacyNoVa) ? 0 : legacyNoVa) - (Number.isNaN(legacyDescuentoNoVa) ? 0 : legacyDescuentoNoVa)));
      const montoOc = subtotal;
      const record = normalizeVentaRecord({
        id: generateId('venta'),
        numeroDocumento: cleanText(pickCell(row, ['OC/documento', 'OC', 'Documento', 'No OC', 'N° OC', 'Número OC', 'Numero OC', 'Orden de compra'])),
        clienteId,
        sucursalId,
        fechaOc: parseExcelDateValue(pickCell(row, ['Fecha OC', 'Fecha', 'Fecha origen', 'Fecha venta'])),
        fechaEntrega: parseExcelDateValue(pickCell(row, ['Fecha entrega', 'Fecha de entrega', 'Entrega', 'Fecha recepción', 'Fecha recepcion'])),
        diasCredito: parsePositiveInteger(pickCell(row, ['Días crédito', 'Dias credito', 'Crédito', 'Credito'])),
        fechaVencimiento: parseExcelDateValue(pickCell(row, ['Fecha vencimiento', 'Vencimiento', 'Fecha de vencimiento'])),
        facturas: normalizeFacturasVentaList(pickCell(row, ['Facturas', 'Facturas emitidas', 'Factura emitida'])),
        requiereEnvio: normalizeBooleanField(pickCell(row, ['Requiere envío', 'Requiere envio', 'Envío', 'Envio']), false),
        logistica: normalizeLogisticaVentaRecord({
          transportista: pickCell(row, ['Transportista']),
          fechaEmbarque: parseExcelDateValue(pickCell(row, ['Fecha de embarque', 'Fecha embarque', 'Embarque'])),
          fechaEstimada: parseExcelDateValue(pickCell(row, ['Fecha estimada', 'Fecha estimada envío', 'Fecha estimada envio', 'Estimada'])),
          fechaReal: parseExcelDateValue(pickCell(row, ['Fecha real', 'Fecha real envío', 'Fecha real envio', 'Real'])),
          guia: pickCell(row, ['Guía', 'Guia', 'Número guía', 'Numero guia'])
        }),
        subtotal,
        montoOc,
        montoOcLegacy: Number.isNaN(montoOcLegacy) ? subtotal : montoOcLegacy,
        noVa: Number.isNaN(legacyNoVa) ? 0 : legacyNoVa,
        descuento: Number.isNaN(descuentoImportado) ? 0 : descuentoImportado,
        descuentoNoVa: Number.isNaN(legacyDescuentoNoVa) ? 0 : legacyDescuentoNoVa,
        ajustes: totalAjustes > 0 ? [{
          id: generateId('ajusteCliente'),
          fecha: parseExcelDateValue(pickCell(row, ['Fecha OC', 'Fecha', 'Fecha origen', 'Fecha venta'])) || todayInputValue(),
          tipo: 'Corrección',
          monto: totalAjustes,
          observacion: cleanText(pickCell(row, ['Ajustes detalle', 'Detalle ajustes', 'Observación', 'Observacion', 'Notas', 'Comentario']))
        }] : [],
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
      if (!record.numeroDocumento) warnings.push(`Ventas fila ${index + 2}: sin OC; se importará como “Sin número”.`);
    });
  }

  function importProveedoresRows(sheet, payload, warnings) {
    const parsed = rowsToObjects(sheet, warnings, 'Proveedores', [['Proveedor'], ['Factura', 'Referencia', 'Documento'], ['Total compra', 'Total deuda', 'Monto', 'Monto original', 'Original']]);
    payload.__headersProveedores = parsed.headers;
    parsed.objects.forEach((row) => {
      const proveedorNombre = cleanText(pickCell(row, ['Proveedor', 'Nombre proveedor']));
      const proveedorId = proveedorNombre ? addImportCatalog(payload, 'proveedores', proveedorNombre) : '';
      const totalPagado = parseExcelMoney(pickCell(row, ['Total pagado', 'Pagado', 'Abonado']));
      const totalCompra = parseExcelMoney(pickCell(row, ['Monto original', 'Original', 'Total compra', 'Total deuda', 'Monto', 'Total', 'Importe']));
      const totalAjustes = Math.abs(parseExcelMoney(pickCell(row, ['Ajustes', 'Ajuste', 'Notas crédito', 'Notas de crédito', 'Nota de crédito'])) || 0);
      const record = normalizeCompraProveedorRecord({
        id: generateId('compraProveedor'),
        proveedorId,
        proveedorNombre,
        facturaReferencia: cleanText(pickCell(row, ['Factura/referencia', 'Factura', 'Referencia', 'Documento', 'No factura', 'Número factura', 'Numero factura'])),
        fechaCompra: parseExcelDateValue(pickCell(row, ['Fecha compra', 'Fecha', 'Fecha origen'])),
        diasCredito: parsePositiveInteger(pickCell(row, ['Días crédito', 'Dias credito', 'Crédito', 'Credito'])),
        fechaVencimiento: parseExcelDateValue(pickCell(row, ['Fecha vencimiento', 'Vencimiento', 'Fecha de vencimiento'])),
        totalCompra,
        ajustes: totalAjustes > 0 ? [{ id: generateId('ajusteProveedor'), fecha: parseExcelDateValue(pickCell(row, ['Fecha compra', 'Fecha', 'Fecha origen'])) || todayInputValue(), tipo: 'Corrección', monto: totalAjustes, observacion: cleanText(pickCell(row, ['Ajustes detalle', 'Detalle ajustes', 'Observación', 'Observacion', 'Notas', 'Comentario'])) }] : [],
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
      const cuentaBancoNombre = cleanText(pickCell(row, ['Banco', 'Cuenta', 'Banco', 'Cuenta banco']));
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
        const existing = (target[catalog.id] || []).find((item) => catalogRecordsMatchForMerge(catalog.id, item, record));
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
        metodoPagoId: idMaps.metodosPago.get(cobro.metodoPagoId) || cobro.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(cobro.cuentaBancoId) || cobro.cuentaBancoId,
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
        compraIdOrigen: compraIdMap.get(pago.compraIdOrigen) || compraProveedorId,
        proveedorId: idMaps.proveedores.get(pago.proveedorId) || pago.proveedorId,
        metodoPagoId: idMaps.metodosPago.get(pago.metodoPagoId) || pago.metodoPagoId,
        cuentaBancoId: idMaps.cuentasBancos.get(pago.cuentaBancoId) || pago.cuentaBancoId,
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

  function getSelectableCatalogRecords(catalogId, currentId = '') {
    const records = getCatalogRecords(catalogId);
    const selected = cleanText(currentId);
    return records.filter((record) => record.activo || record.id === selected);
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
    if (catalog.id === 'clientes') {
      return [record.codigo ? `Código: ${record.codigo}` : '', formatPaymentTermsLabel(record)].filter(Boolean).join(' · ');
    }
    if (catalog.id === 'sucursales') {
      const cliente = appData.clientes.find((item) => item.id === record.clienteId);
      return cliente ? `Cliente asociado: ${cliente.nombre}` : 'Sin cliente asociado';
    }
    if (catalog.id === 'proveedores') {
      return [record.contacto ? `Contacto: ${record.contacto}` : '', formatPaymentTermsLabel(record)].filter(Boolean).join(' · ');
    }
    if (catalog.id === 'metodosPago') return 'Método simple';
    if (catalog.id === 'cuentasBancos') return `Tipo: ${getBankTypeDisplay(record)}`;
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
      bdatos: ['bdatos'],
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
      if (field.type === 'checkbox') {
        record[field.name] = formData.has(field.name);
        return;
      }
      record[field.name] = cleanText(formData.get(field.name));
    });

    if (catalog.id === 'metodosPago') {
      delete record.requiereBanco;
    }

    if (catalog.id === 'cuentasBancos') {
      record.tipo = normalizeBankType(record.tipo);
      if (record.tipo) delete record.tipoAnterior;
    }

    if (isPaymentTermsCatalog(catalog.id)) {
      const terms = normalizePaymentTermsFields(record);
      record.condicionPago = terms.condicionPago;
      record.diasCredito = terms.diasCredito;
    }

    return record;
  }

  function hasCatalogDuplicate(catalog, record, existingId, includeInactive = false) {
    return getCatalogRecords(catalog.id).find((item) => {
      if (item.id === existingId) return false;
      if (!includeInactive && !item.activo) return false;
      const sameName = normalizeNameForCompare(item.nombre) === normalizeNameForCompare(record.nombre);
      if (!sameName) return false;
      if (catalog.id === 'cuentasBancos') {
        return normalizeBankType(item.tipo) === normalizeBankType(record.tipo);
      }
      return true;
    }) || null;
  }

  function validateCatalogRecord(catalog, record, existingId) {
    if (!record.nombre) {
      return `El nombre del ${catalog.singular} es obligatorio.`;
    }

    if (catalog.id === 'cuentasBancos' && !BANK_TYPE_OPTIONS.includes(record.tipo)) {
      return 'Selecciona un tipo válido para el banco: Transferencia, Depósito o Tarjeta.';
    }

    if (isPaymentTermsCatalog(catalog.id)) {
      const terms = normalizePaymentTermsFields(record);
      if (!['Contado', 'Crédito'].includes(terms.condicionPago)) return 'Selecciona una condición de pago válida.';
      if (terms.condicionPago === 'Crédito' && (!Number.isInteger(terms.diasCredito) || terms.diasCredito <= 0)) {
        return 'Si la condición es Crédito, días de crédito debe ser mayor que cero.';
      }
    }

    const duplicate = hasCatalogDuplicate(catalog, record, existingId, catalog.id === 'cuentasBancos');

    if (duplicate) {
      if (catalog.id === 'cuentasBancos') {
        return `Ya existe el banco “${record.nombre}” con tipo “${record.tipo}”.`;
      }
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
      catalogState.message = 'Solo Administrador puede activar, borrar seguro o restaurar Catálogos.';
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
      const duplicate = hasCatalogDuplicate(catalog, record, recordId, false);

      if (duplicate) {
        catalogState.message = catalog.id === 'cuentasBancos'
          ? `No se puede restaurar: ya existe activo el banco “${record.nombre}” con tipo “${getBankTypeDisplay(record)}”.`
          : `No se puede activar: ya existe un registro activo con el nombre “${record.nombre}”.`;
        catalogState.messageType = 'error';
        renderRoute();
        return;
      }
    }

    appData[catalog.id] = records.map((item) => item.id === recordId
      ? { ...item, activo: shouldActivate, updatedAt: nowIso() }
      : item);

    catalogState.editingId = null;
    catalogState.message = isSafeDeleteCatalog(catalog.id)
      ? `${record.nombre} quedó ${shouldActivate ? 'restaurado' : 'borrado de forma segura (inactivo)'}.`
      : `${record.nombre} quedó ${shouldActivate ? 'activo' : 'inactivo'}.`;
    catalogState.messageType = 'success';
    saveData(appData);
    renderRoute();
  }

  function clearCatalogForm() {
    catalogState.editingId = null;
    catalogState.message = null;
    renderRoute();
  }

  function setupCatalogPaymentTermsForm(form) {
    const conditionInput = form.querySelector('[data-catalog-payment-condition]');
    const daysInput = form.querySelector('[data-catalog-credit-days]');
    if (!conditionInput || !daysInput) return;

    const sync = () => {
      const isCredit = normalizePaymentCondition(conditionInput.value) === 'Crédito';
      daysInput.disabled = !isCredit;
      daysInput.required = isCredit;
      if (!isCredit) daysInput.value = '0';
      if (isCredit && daysInput.value === '0') daysInput.value = '';
    };

    conditionInput.addEventListener('change', sync);
    sync();
  }

  function closeEditModal(modalId) {
    const id = cleanText(modalId);
    if (id === getCatalogModalId()) clearCatalogForm();
    else if (id === getBdatosModalId()) clearBdatosEdit();
    else if (id === getVentaModalId()) clearVentaForm();
    else if (id === getCompraModalId()) clearCompraProveedorForm();
    else if (id === getCobroModalId()) clearCobroForm();
    else if (id === getPagoModalId()) clearPagoProveedorForm();
    else if (id === getGastoModalId()) clearGastoForm();
  }

  function bindViewActions() {
    viewRoot.querySelectorAll('[data-go]').forEach((button) => {
      button.addEventListener('click', () => setRoute(button.dataset.go));
    });

    viewRoot.querySelectorAll('[data-modal-close]').forEach((button) => {
      button.addEventListener('click', () => closeEditModal(button.dataset.modalClose));
    });

    viewRoot.querySelectorAll('[data-modal-backdrop]').forEach((backdrop) => {
      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) closeEditModal(backdrop.dataset.modalBackdrop);
      });
    });


    viewRoot.querySelectorAll('[data-accordion-toggle]').forEach((button) => {
      button.addEventListener('click', () => toggleAccordionGroup(button.dataset.accordionModule, button.dataset.accordionKey));
    });

    viewRoot.querySelectorAll('[data-resumen-filters]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateResumenFiltersFromForm(form);
      });
      form.addEventListener('change', (event) => {
        const fieldName = event.target?.name || '';
        updateResumenFiltersFromForm(form, { clearDates: fieldName === 'month' || fieldName === 'year' });
      });
    });

    viewRoot.querySelectorAll('[data-resumen-clear-dates]').forEach((button) => {
      button.addEventListener('click', clearResumenDateFilters);
    });

    viewRoot.querySelectorAll('[data-resumen-clear]').forEach((button) => {
      button.addEventListener('click', clearResumenFilters);
    });

    viewRoot.querySelectorAll('[data-catalog-tab]').forEach((button) => {
      button.addEventListener('click', () => setCatalogTab(button.dataset.catalogTab));
    });

    viewRoot.querySelectorAll('[data-catalog-form]').forEach((form) => {
      setupCatalogPaymentTermsForm(form);
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

    viewRoot.querySelectorAll('[data-bdatos-create-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveBdatosCreate(form);
      });
    });

    viewRoot.querySelectorAll('[data-bdatos-edit-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveBdatosEdit(form);
      });
    });

    viewRoot.querySelectorAll('[data-bdatos-clear]').forEach((button) => {
      button.addEventListener('click', clearBdatosCreateForm);
    });

    viewRoot.querySelectorAll('[data-bdatos-edit-cancel]').forEach((button) => {
      button.addEventListener('click', clearBdatosEdit);
    });

    viewRoot.querySelectorAll('[data-bdatos-copy]').forEach((button) => {
      button.addEventListener('click', () => copyBdatosRecord(button.dataset.bdatosCopy));
    });

    viewRoot.querySelectorAll('[data-bdatos-edit]').forEach((button) => {
      button.addEventListener('click', () => editBdatosRecord(button.dataset.bdatosEdit));
    });

    viewRoot.querySelectorAll('[data-bdatos-delete]').forEach((button) => {
      button.addEventListener('click', () => deleteBdatosRecord(button.dataset.bdatosDelete));
    });

    setupBdatosSearch();

    viewRoot.querySelectorAll('[data-venta-form]').forEach((form) => {
      setupVentaLiveCalculations(form);
      setupVentaFacturasForm(form);
      setupVentaLogisticaForm(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveVentaRecord(form);
      });
    });

    viewRoot.querySelectorAll('[data-ajuste-venta-form]').forEach((form) => {
      setupVentaAjusteForm(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveVentaAjusteRecord(form);
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

    viewRoot.querySelectorAll('[data-ajuste-venta-start]').forEach((button) => {
      button.addEventListener('click', () => startAjusteForVenta(button.dataset.ajusteVentaStart));
    });

    viewRoot.querySelectorAll('[data-ajuste-venta-delete]').forEach((button) => {
      button.addEventListener('click', () => deleteVentaAjuste(button.dataset.ajusteVentaDelete, button.dataset.ajusteId));
    });

    viewRoot.querySelectorAll('[data-cobros-for]').forEach((button) => {
      button.addEventListener('click', () => {
        cobrosState.selectedVentaId = button.dataset.cobrosFor || '';
        setRoute('cobros');
      });
    });

    viewRoot.querySelectorAll('[data-cobro-form]').forEach((form) => {
      setupPaymentBankField(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveCobroRecord(form);
      });
      form.querySelector('[data-cobro-venta]')?.addEventListener('change', (event) => selectCobroVenta(event.target.value));
      form.querySelector('[data-cobro-fill-full]')?.addEventListener('click', (event) => fillCobroFullAmount(form, event.currentTarget.dataset.cobroFillFull));
    });

    viewRoot.querySelectorAll('[data-cobro-edit]').forEach((button) => {
      button.addEventListener('click', () => editCobroRecord(button.dataset.cobroEdit));
    });

    viewRoot.querySelectorAll('[data-cobro-cancel]').forEach((button) => {
      button.addEventListener('click', clearCobroForm);
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

    viewRoot.querySelectorAll('[data-ajuste-proveedor-form]').forEach((form) => {
      setupProveedorAjusteForm(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveProveedorAjusteRecord(form);
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

    viewRoot.querySelectorAll('[data-ajuste-start]').forEach((button) => {
      button.addEventListener('click', () => startAjusteForCompra(button.dataset.ajusteStart));
    });

    viewRoot.querySelectorAll('[data-ajuste-delete]').forEach((button) => {
      button.addEventListener('click', () => deleteCompraProveedorAjuste(button.dataset.ajusteDelete, button.dataset.ajusteId));
    });

    viewRoot.querySelectorAll('[data-pago-start]').forEach((button) => {
      button.addEventListener('click', () => startPagoForCompra(button.dataset.pagoStart));
    });

    viewRoot.querySelectorAll('[data-pago-form]').forEach((form) => {
      setupPaymentBankField(form);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        savePagoProveedorRecord(form);
      });
      form.querySelector('[data-pago-compra]')?.addEventListener('change', (event) => selectPagoCompra(event.target.value));
      form.querySelector('[data-pago-fill-full]')?.addEventListener('click', (event) => fillPagoFullAmount(form, event.currentTarget.dataset.pagoFillFull));
    });

    viewRoot.querySelectorAll('[data-pago-edit]').forEach((button) => {
      button.addEventListener('click', () => editPagoProveedorRecord(button.dataset.pagoEdit));
    });

    viewRoot.querySelectorAll('[data-pago-cancel]').forEach((button) => {
      button.addEventListener('click', clearPagoProveedorForm);
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
      setupPaymentBankField(form);
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
      form.querySelectorAll('select').forEach((select) => {
        select.addEventListener('change', () => {
          const { month, year } = getPeriodFromForm(form);
          cierreMensualState.month = month;
          cierreMensualState.year = year;
          cierreMensualState.message = null;
          renderRoute();
        });
      });
    });

    viewRoot.querySelectorAll('[data-device-identity-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateDeviceIdentityFromForm(form);
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

    viewRoot.querySelectorAll('[data-pwa-check-update]').forEach((button) => {
      button.addEventListener('click', checkForPwaUpdate);
    });

    viewRoot.querySelectorAll('[data-pwa-apply-update]').forEach((button) => {
      button.addEventListener('click', applyPwaUpdate);
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

  setupPwaUpdateListeners();
})();
