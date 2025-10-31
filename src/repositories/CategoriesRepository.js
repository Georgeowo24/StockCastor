import { openDatabase } from "../database/openDB";

export const addCategory = async (nombreCategoria, descripcion = "") => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "INSERT INTO categorias( nombreCategoria, descripcion) VALUES(?,?)",
            [nombreCategoria, descripcion]
        );
        
        console.log('Creando nueva categoria');
        return result.lastInsertRowId; 
    } catch (error) {
        console.error("Error al crear la categoría", error);
        throw error;
    }
}

export const getSelectCategory = async ()=>{
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idCategoria, nombreCategoria from categorias WHERE activa = 1")
        return result;
    } catch (error) {
        console.error("Error al obtener Categorias Select",error);
        throw error;
    }
} 

export const editCategory = async (idCategoria,nombreCategoria,descripcion)=>{
    const db = await openDatabase();
    try {
        const result = await db.withTransactionAsync(async (tx)=>{
            return await tx.executeSqlAsync("UPDATE  categorias SET nombreCategoria = ?,descripcion = ? WHERE idCategoria = ?",
                [nombreCategoria,descripcion,idCategoria]
            );
        });
        console.log('Edición completa de la categoria');
        return result.changes;
    } catch (error) {
        console.error("Error al actualizar la categoría",error);
        throw error;
    }
}

export const deleteCategory = async (idCategoria) =>{
    const db = await openDatabase();
    try {
        const result = await db.runAsync("UPDATE categorias SET activo = 0 WHERE idCategoria = ?",[idCategoria]);
        return result.changes;
    } catch (error) {
        console.error("Error al eliminar la categoria",error)
        throw error;
    }
}

