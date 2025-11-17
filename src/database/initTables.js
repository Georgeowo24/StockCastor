import * as SQLiteDatabase from 'expo-sqlite';

async function createTables(db) {
    const tables = [
        //? Tabla de Proveedores
        `CREATE TABLE IF NOT EXISTS proveedores (
            idProveedor INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreProveedor TEXT NOT NULL,
            telefono TEXT,
            direccion TEXT,
            activo INTEGER DEFAULT 1
        );`,

        //? Tabla de Tipos de Medida
        `CREATE TABLE IF NOT EXISTS tiposMedidas (
            idTipoMedida INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreTipoMedida TEXT NOT NULL UNIQUE
        );`,

        //? Tabla de Medidas
        `CREATE TABLE IF NOT EXISTS medidas (
            idMedida INTEGER PRIMARY KEY AUTOINCREMENT,
            idTipoMedida INTEGER NOT NULL,
            medida TEXT NOT NULL,
            FOREIGN KEY (idTipoMedida) REFERENCES tiposMedidas(idTipoMedida) ON DELETE CASCADE,
            UNIQUE (idTipoMedida, medida)
        );`,

        //? Tabla de Categorías
        `CREATE TABLE IF NOT EXISTS categorias (
            idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreCategoria TEXT NOT NULL,
            descripcion TEXT,
            activa INTEGER DEFAULT 1,
            idTipoMedida INTEGER,
            FOREIGN KEY (idTipoMedida) REFERENCES tiposMedidas (idTipoMedida) ON DELETE SET NULL
        );`,

        //? Tabla de Productos
        `CREATE TABLE IF NOT EXISTS productos (
            idProducto INTEGER PRIMARY KEY AUTOINCREMENT,
            idCategoria INTEGER,
            idProveedor INTEGER,
            nombreProducto TEXT NOT NULL,
            imagen TEXT,
            descripcion TEXT,
            precioCompra REAL NOT NULL,
            precioVenta REAL NOT NULL,
            stockActual INTEGER DEFAULT 0,
            stockMinimo INTEGER DEFAULT 0,
            idMedida INTEGER,
            activo INTEGER DEFAULT 1,
            fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            fechaActualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria) ON DELETE SET NULL,
            FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor) ON DELETE SET NULL,
            FOREIGN KEY (idMedida) REFERENCES medidas(idMedida) ON DELETE SET NULL
        );`,

        //? Tabla de Clientes
        `CREATE TABLE IF NOT EXISTS clientes (
            idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreCliente TEXT NOT NULL,
            telefono TEXT,
            direccion TEXT,
            fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
            activo INTEGER DEFAULT 1
        );`,

        //? Tabla de los Metodos de Pago
        `CREATE TABLE IF NOT EXISTS metodosPago (
            idMetodoPago INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreMetodo TEXT NOT NULL UNIQUE
        );`,

        //? Tabla de Estados de Ventas
        `CREATE TABLE IF NOT EXISTS estadosVentas (
            idEstadoVenta INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreEstado TEXT NOT NULL UNIQUE,
            descripcion TEXT
        );`,

        //? Tabla de Ventas
        `CREATE TABLE IF NOT EXISTS ventas (
            idVenta INTEGER PRIMARY KEY AUTOINCREMENT,
            idCliente INTEGER,
            folioVenta TEXT NOT NULL UNIQUE,
            fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
            idMetodoPago INTEGER NOT NULL DEFAULT 1,
            idEstadoVenta INTEGER NOT NULL DEFAULT 1,
            notas TEXT,
            FOREIGN KEY (idCliente) REFERENCES clientes(idCliente) ON DELETE RESTRICT,
            FOREIGN KEY (idMetodoPago) REFERENCES metodosPago(idMetodoPago) ON DELETE RESTRICT,
            FOREIGN KEY (idEstadoVenta) REFERENCES estadosVentas(idEstadoVenta) ON DELETE RESTRICT
        );`,

        //? Tabla de Detalles de Venta
        `CREATE TABLE IF NOT EXISTS detalleVentas (
            idDetalleVenta INTEGER PRIMARY KEY AUTOINCREMENT,
            idVenta INTEGER NOT NULL,
            idProducto INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            precioUnitario REAL NOT NULL,
            FOREIGN KEY (idVenta) REFERENCES ventas(idVenta) ON DELETE CASCADE,
            FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE RESTRICT
        );`,

        //? Tabla Tipo Pedido
        `CREATE TABLE IF NOT EXISTS tipoPedido (
            idTipoPedido INTEGER PRIMARY KEY AUTOINCREMENT,
            tipoPedido TEXT
        );`,

        //? Tabla de Estados de Pedidos
        `CREATE TABLE IF NOT EXISTS estadosPedidos (
            idEstadoPedido INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreEstado TEXT NOT NULL UNIQUE,
            descripcion TEXT
        );`,

        //? Tabla de Pedidos
        `CREATE TABLE IF NOT EXISTS pedidos (
            idPedido INTEGER PRIMARY KEY AUTOINCREMENT,
            idCliente INTEGER NOT NULL,
            folioPedido TEXT NOT NULL UNIQUE,
            fechaPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
            fechaEntrega DATE,
            idTipoPedido INTEGER NOT NULL,
            anticipo REAL DEFAULT 0,
            idEstadoPedido INTEGER DEFAULT 1,
            notas TEXT,
            FOREIGN KEY (idCliente) REFERENCES clientes(idCliente) ON DELETE RESTRICT,
            FOREIGN KEY (idTipoPedido) REFERENCES tipoPedido(idTipoPedido) ON DELETE RESTRICT,
            FOREIGN KEY (idEstadoPedido) REFERENCES estadosPedidos(idEstadoPedido) ON DELETE RESTRICT
        );`,

        //? Detalles de Pedidos
        `CREATE TABLE IF NOT EXISTS detallePedidos (
            idDetallePedido INTEGER PRIMARY KEY AUTOINCREMENT,
            idPedido INTEGER NOT NULL,
            idProducto INTEGER,
            descripcionPersonalizada TEXT,
            cantidad INTEGER NOT NULL,
            precioUnitario REAL NOT NULL,
            FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido) ON DELETE CASCADE,
            FOREIGN KEY (idProducto) REFERENCES productos(idProducto) ON DELETE SET NULL
        );`,
    ];

    for (const tableQuery of tables) {
        try {
            await db.execAsync(tableQuery);
            console.log("Table created or already exists.");
            await new Promise((r) => setTimeout(r, 50));
        } catch (error) {
            console.error("Error creating tables:", error);
        }
    }
}

export async function initDatabase(db) {
    try {
        await db.execAsync(`PRAGMA journal_mode = 'WAL'; PRAGMA foreign_keys = ON;`);

        await createTables(db);
        console.log("Database initialized successfully");
    } catch ( error ) {
        console.error("Error initializing database:", error);
    }
}
