import {openDatabase} from '../database/openDB';

export const addProduct = async (idCategoria,idProveedor,nombreProducto,imagen,descripcion,precioCompra,precioVenta,stockActual,stockMinimo,idMedida) => {
    const db = await openDatabase();
    try{
        const result = await db.runAsync(
            "INSERT INTO productos(idCategoria,idProveedor,nombreProducto,imagen,descripcion,precioCompra,precioVenta,stockActual,stockMinimo,idMedida) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [idCategoria,idProveedor,nombreProducto,imagen,descripcion,
                precioCompra,precioVenta,stockActual,stockMinimo,idMedida]
        );
        
        console.log('Producto añadido exitosamente')
        return result.lastInsertRowId;
    }
    catch(error){
        console.error("Error al agregar el producto",error);
        throw error;
    }
}

//! Falta probarlo
export const getAllProducts = async () => {
    const db = await openDatabase();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM productos WHERE activo = 1 ORDER BY nombreProducto');
        return allRows; 
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        throw error;
    }
};

//! Falta Probar
export const EditProduct = async (idProducto,idCategoria,idProveedor,nombreProducto,imagen = null,descripcion,precioCompra,precioVenta,stockActual,stockMinimo,idMedida) => {
    const db = await openDatabase();
    try{
        const result = await db.runAsync(
            "UPDATE productos SET idCategoria = ?, idProveedor = ?, nombreProducto = ?, imagen = ?, descripcion = ?, precioCompra = ?, precioVenta = ?, stockActual = ?, stockMinimo = ?, idMedida = ? WHERE idProducto = ?",
            [idCategoria,idProveedor,nombreProducto,imagen,descripcion,
                precioCompra,precioVenta,stockActual,stockMinimo,idMedida,idProducto]
        );
        // runAsync retorna changes
        return result.changes;
    }
    catch(error){
        console.error("Error al actualizar el producto",error);
        throw error;
    }
}

export const DeleteProduct = async(idProducto) => {
    const db = await openDatabase();
    try{
        const result = await db.runAsync("UPDATE productos SET activo = 0 WHERE idProducto = ?",[idProducto]);
        return result.changes;
    }
    catch (error){
        console.error("Error al eliminar",error);
        throw error;
    }
}

export const getLowStockProducts = async () => {
    const db = await openDatabase();
    try {
        const rows = await db.getAllAsync(
        'SELECT * FROM productos WHERE stockActual < stockMinimo AND activo = 1'); 
        return rows;
    } catch (error) {
        console.error('Error al obtener stock bajo:', error);
        throw error;
    }
};


//? Búsqueda por nombre
export const findProductsByName = async (query) => {
    const db = await openDatabase();
    try {
        const prefixQuery = `${query}%`; 

        const rows = await db.getAllAsync(
        'SELECT * FROM productos WHERE nombreProducto LIKE ? AND activo = 1',
        [prefixQuery]
        );
        return rows;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        throw error;
    }
};

//! Sin probar
export const getProductsGroupedByCategory = async () => {
    const db = await openDatabase();
    try {
        const allProducts = await db.getAllAsync(`
            SELECT 
                p.idProducto,
                p.nombreProducto,
                p.precioVenta,
                p.stockActual,
                p.imagen,
                c.nombreCategoria
            FROM productos p
            LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
            WHERE p.activo = 1
        `);

        if (!allProducts || allProducts.length === 0) {
            console.log("⚠️ No se encontraron productos en la base de datos.");
            return [];
        }

        // Agrupamos productos por categoría
        const grouped = allProducts.reduce((acc, product) => {
            const categoria = product.nombreCategoria || "Sin categoría";
            if (!acc[categoria]) acc[categoria] = [];
            acc[categoria].push(product);
            return acc;
        }, {});

        
        // Convertimos a formato [{ categoria, productos: [...] }]
        const finalGroupedArray = Object.keys(grouped).map((categoria) => ({
            categoria,
            // Ordenamos los productos DENTRO de cada categoría
            productos: grouped[categoria].sort((a, b) => 
                a.nombreProducto.localeCompare(b.nombreProducto)
            ),
        }));

        // Ordenamos el array final por nombre de categoría
        finalGroupedArray.sort((a, b) => a.categoria.localeCompare(b.categoria));

        return finalGroupedArray;

    } catch (error) {
        console.error("Error al obtener productos agrupados por categoría:", error);
        throw error;
    }
};



export const getProductData = async (idProducto)=>{
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync("SELECT * from productos WHERE idProducto = ?",[idProducto]);
        return result;
    } catch (error) {
        console.error("Error al obtener producto", error)
        throw error;
    }
} 

export const getSelectProducts = async() =>{
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idProducto,nombreProducto from productos WHERE activo = 1");
        return result;
    } catch (error) {
        console.error("Error al obtener productos select",error);
        throw error;
    }
}

export const getImage = async(idProducto) =>{
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync("SELECT imagen from productos WHERE idProducto = ?",[idProducto]);
        return result
    } catch (error) {
        console.error("Error al obtener la imagen",error);
        throw error;
    }
}
