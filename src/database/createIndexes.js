import * as SQLiteDatabase from 'expo-sqlite';

export async function createIndexes(db) {
    const indexes = [
        // Categorías
        'CREATE INDEX IF NOT EXISTS idx_categorias_negocio_nombre ON categorias(idNegocio, nombreCategoria);',

        // Proveedores
        'CREATE INDEX IF NOT EXISTS idx_proveedores_negocio_nombre ON proveedores(idNegocio, nombreProveedor);',

        // Medidas
        'CREATE INDEX IF NOT EXISTS idx_medidas_categoria_medida ON medidas(idCategoria, medida);',

        // Productos (foreign keys y búsquedas)
        'CREATE INDEX IF NOT EXISTS idx_productos_idNegocio ON productos(idNegocio);',
        'CREATE INDEX IF NOT EXISTS idx_productos_idCategoria ON productos(idCategoria);',
        'CREATE INDEX IF NOT EXISTS idx_productos_idProveedor ON productos(idProveedor);',
        'CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombreProducto);',

        // Clientes
        'CREATE INDEX IF NOT EXISTS idx_clientes_negocio_nombre ON clientes(idNegocio, nombreCliente);',

        // Ventas (foreign keys y búsquedas)
        'CREATE INDEX IF NOT EXISTS idx_ventas_idNegocio ON ventas(idNegocio);',
        'CREATE INDEX IF NOT EXISTS idx_ventas_idCliente ON ventas(idCliente);',
        'CREATE INDEX IF NOT EXISTS idx_ventas_fechaVenta ON ventas(fechaVenta);',

        // Detalle de Ventas (foreign keys y búsquedas conjuntas)
        'CREATE INDEX IF NOT EXISTS idx_detalleventas_idVenta ON detalleVentas(idVenta);',
        'CREATE INDEX IF NOT EXISTS idx_detalleventas_idProducto ON detalleVentas(idProducto);',
        'CREATE INDEX IF NOT EXISTS idx_detalleventas_venta_producto ON detalleVentas(idVenta, idProducto);',

        // Pedidos (foreign keys y búsquedas)
        'CREATE INDEX IF NOT EXISTS idx_pedidos_idNegocio ON pedidos(idNegocio);',
        'CREATE INDEX IF NOT EXISTS idx_pedidos_idCliente ON pedidos(idCliente);',
        'CREATE INDEX IF NOT EXISTS idx_pedidos_folioPedido ON pedidos(folioPedido);',
        'CREATE INDEX IF NOT EXISTS idx_pedidos_fechaPedido ON pedidos(fechaPedido);',

        // Detalles de Pedidos (foreign keys y búsquedas conjuntas)
        'CREATE INDEX IF NOT EXISTS idx_detallepedidos_idPedido ON detallePedidos(idPedido);',
        'CREATE INDEX IF NOT EXISTS idx_detallepedidos_idProducto ON detallePedidos(idProducto);',
        'CREATE INDEX IF NOT EXISTS idx_detallepedidos_pedido_producto ON detallePedidos(idPedido, idProducto);'
    ];

    for (const query of indexes) {
        try {
            await db.execAsync(query);
            console.log('✅ Índice creado o ya existente.');
            await new Promise((r) => setTimeout(r, 50))
        } catch (error) {
            console.error('❌ Error creando índice:', error);
        }
    }

    console.log('🏁 Todos los índices fueron creados correctamente');
}
