import * as SQLite from 'expo-sqlite';

export async function CreateViews(db) {
    const views = [
        //? Vista: Inventario Actual
        `CREATE VIEW IF NOT EXISTS vistaInventarioActual AS
        SELECT
        p.idProducto,
        p.nombreProducto,
        p.stockActual,
        p.stockMinimo,
        p.precioVenta,
        c.nombreCategoria,
        pv.nombreProveedor,
        m.medida
        FROM productos p
        JOIN categorias c ON p.idCategoria = c.idCategoria
        JOIN proveedores pv ON p.idProveedor = pv.idProveedor
        JOIN medidas m ON p.idMedida = m.idMedida
        WHERE p.activo = 1;`,

        //? Vista: Productos con Stock Bajo
        `CREATE VIEW IF NOT EXISTS vistaProductosBajoStock AS
        SELECT
        p.idProducto,
        p.nombreProducto,
        p.stockActual,
        p.stockMinimo,
        c.nombreCategoria,
        pv.nombreProveedor
        FROM productos p
        JOIN categorias c ON p.idCategoria = c.idCategoria
        JOIN proveedores pv ON p.idProveedor = pv.idProveedor
        WHERE p.stockActual <= p.stockMinimo AND p.activo = 1;`,

        //? Vista: Ventas Detalladas
        `CREATE VIEW IF NOT EXISTS vistaVentasDetalladas AS
        SELECT
        v.idVenta,
        v.folioVenta,
        v.fechaVenta,
        c.nombreCliente,
        mp.nombreMetodo AS metodoPago,
        ev.nombreEstado AS estadoVenta,
        p.nombreProducto,
        dv.cantidad,
        dv.precioUnitario,
        (dv.cantidad * dv.precioUnitario) AS subtotal
        FROM ventas v
        JOIN clientes c ON v.idCliente = c.idCliente
        JOIN metodosPago mp ON v.idMetodoPago = mp.idMetodoPago
        JOIN estadosVentas ev ON v.idEstadoVenta = ev.idEstadoVenta
        JOIN detalleVentas dv ON v.idVenta = dv.idVenta
        JOIN productos p ON dv.idProducto = p.idProducto;`,

        //? Vista: Resumen de Ventas por Día
        `CREATE VIEW IF NOT EXISTS vistaResumenVentasDia AS
        SELECT
        DATE(fechaVenta) AS fecha,
        COUNT(idVenta) AS totalVentas,
        SUM(dv.cantidad * dv.precioUnitario) AS ingresosTotales
        FROM ventas v
        JOIN detalleVentas dv ON v.idVenta = dv.idVenta
        GROUP BY DATE(fechaVenta)
        ORDER BY fecha DESC;`,

        //? Vista: Pedidos Detallados
        `CREATE VIEW IF NOT EXISTS vistaPedidosDetallados AS
        SELECT
        pe.idPedido,
        pe.folioPedido,
        pe.fechaPedido,
        pe.fechaEntrega,
        cli.nombreCliente,
        tp.tipoPedido,
        ep.nombreEstado AS estadoPedido,
        dp.descripcionPersonalizada,
        pr.nombreProducto,
        dp.cantidad,
        dp.precioUnitario,
        pe.anticipo
        FROM pedidos pe
        JOIN clientes cli ON pe.idCliente = cli.idCliente
        JOIN tipoPedido tp ON pe.idTipoPedido = tp.idTipoPedido
        JOIN estadosPedidos ep ON pe.idEstadoPedido = ep.idEstadoPedido
        JOIN detallePedidos dp ON pe.idPedido = dp.idPedido
        LEFT JOIN productos pr ON dp.idProducto = pr.idProducto;`
    ];

    for (const query of views) {
        try {
            await db.execAsync(query);
            console.log('✅ Vista creada o ya existente.');
            await new Promise((r) => setTimeout(r, 50))
        } catch (error) {
            console.error('❌ Error creando vista:', error);
        }
    }

    console.log('🏁 Todas las vistas fueron creadas correctamente');
}
