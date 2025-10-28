import {openDatabase} from '../database/openDB';

//! Falta probar
export const addProduct = async (idCategoria,idProveedor,nombreProducto,imagen,descripcion,precioCompra,precioVenta,stockActual,stockMinimo,idMedida) => {
    const db = await openDatabase();

    try{
        const result = await db.withTransactionAsync(async (tx) =>{
            return await tx.executeSqlAsync(
                "INSERT INTO productos(idCategoria,idProveedor,nombreProducto,imagen,descripcion,precioCompra,precioVenta,stockActual,stockMinimo,idMedida) values (?,?,?,?,?,?,?,?,?,?)",
            [idCategoria,idProveedor,nombreProducto,imagen,descripcion,
                precioCompra,precioVenta,stockActual,stockMinimo,idMedida]
            );
        });
        return result.insertId;
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
        const allRows = await db.getAllAsync('SELECT * FROM productos ORDER BY nombreProducto');
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
        const result = await db.withTransactionAsync(async (tx) =>{
            return await tx.executeSqlAsync(
                "UPDATE  productos SET idCategoria = ?,idProveedor = ?,nombreProducto = ?,imagen= ?,descripcion = ?,precioCompra = ?,precioVenta = ?,stockActual = ?,stockMinimo = ?,idMedida = ? WHERE idProducto = ?",
            [idCategoria,idProveedor,nombreProducto,imagen,descripcion,
                precioCompra,precioVenta,stockActual,stockMinimo,idMedida,idProducto]
            );
        });
        return result.changes;
    }
    catch(error){
        console.error("Error al actualizar el producto",error);
        throw error;
    }
}

export const DeleteProduct = async(idProducto) => {
    const db = openDatabase();
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
    const db = await getDbAsync();
    try {
        const rows = await db.getAllAsync(
        'SELECT * FROM productos WHERE stockActual < stockMinimo');
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
        'SELECT * FROM productos WHERE nombreProducto LIKE ?',
        [prefixQuery] // El comodín % va AL FINAL
        );
        return rows;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        throw error;
    }
};

//! Sin probar
export const getProductsGroupedByCategory = async () => {
    const db = await getDbAsync();
    
    try {
        // 1. Obtenemos todos los productos, ORDENADOS por categoría.
        // Esto es clave para que el 'reduce' funcione eficientemente.
        const allProducts = await db.getAllAsync(
        'SELECT idProducto,precioVenta,stockActual,imagen,nombreCategoria FROM productos join categorias ORDER BY productos.idCategoria'
        );

        // 2. Agrupamos los productos usando JavaScript (reduce)
        
        // Primero, creamos un mapa (objeto) donde cada clave es una categoría
        const productsMap = allProducts.reduce((acc, product) => {
        // Usamos 'Sin Categoría' si el campo es null o vacío
        const category = product.nombreCategoria || 'Sin Categoría'; 
        
        // Si la categoría aún no existe en el acumulador, créala
        if (!acc[category]) {
            acc[category] = [];
        }
        
        // Añade el producto actual al array de su categoría
        acc[category].push(product);
        
        return acc;
        }, {}); // El valor inicial es un objeto vacío {}

        // 3. Convertimos el mapa al formato de SectionList
        // Object.keys(productsMap) -> ['Categoría 1', 'Categoría 2']
        const groupedProducts = Object.keys(productsMap).map(categoryTitle => ({
        title: categoryTitle,       // El título de la sección
        data: productsMap[categoryTitle] // El array de productos para esa sección
        }));

        return groupedProducts;
        
    } catch (error) {
        console.error('Error al obtener productos agrupados por categoría:', error);
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
        const result = await db.getAllAsync("SELECT idProducto,nombreProducto from productos");
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
