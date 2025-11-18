import { openDatabase } from "../database/openDB";

export const checkCategoryExists = async (nombreCategoria) => {
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync(
            "SELECT 1 FROM categorias WHERE nombreCategoria = ? COLLATE NOCASE AND activa = 1", 
            [nombreCategoria]
        );
        return !!result;
    } catch (error) {
        console.error("Error al verificar si la categoria ya existe", error);
        throw error;
    }
}

export const checkCategoryExistsForEdit = async (idCategoria, nombreCategoria) => {
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync(
            "SELECT 1 FROM categorias WHERE nombreCategoria = ? COLLATE NOCASE AND activa = 1 AND idCategoria != ?",
            [nombreCategoria, idCategoria]
        );
        return !!result;
    } catch (error) {
        console.error("Error al verificar duplicados al editar", error);
        throw error;
    }
}

export const addCategory = async (nombreCategoria, descripcion = "", idTipoMedida, icono) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "INSERT INTO categorias( nombreCategoria, descripcion, idTipoMedida, icono) VALUES(?, ?, ?, ?)",
            [nombreCategoria, descripcion, idTipoMedida, icono]
        );

        console.log('Nueva categoria añadida');
        return result.lastInsertRowId; 
    } catch (error) {
        console.error("Error al crear la categoría", error);
        throw error;
    }
}

export const getSelectCategories = async ()=>{
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idCategoria, nombreCategoria, icono FROM categorias WHERE activa = 1")
        return result;
    } catch (error) {
        console.error("Error al obtener Categorias",error);
        throw error;
    }
}

export const getSelectInfoCategory = async (idCategoria)=>{
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync(
            "SELECT idCategoria, nombreCategoria, descripcion, idTipoMedida, icono FROM categorias WHERE activa = 1 AND idCategoria = ?",
            [idCategoria]
        )
        return result;
    } catch (error) {
        console.error("Error al obtener información de la categorias",error);
        throw error;
    }
}

export const editCategory = async (idCategoria, nombreCategoria, descripcion, idTipoMedida, icono )=>{
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "UPDATE  categorias SET nombreCategoria = ?, descripcion = ?, idTipoMedida = ?, icono = ? WHERE idCategoria = ?",
            [nombreCategoria, descripcion, idTipoMedida, icono, idCategoria]
        );
        console.log('Categoria actualizada correctamente');
        return result.changes;
    } catch (error) {
        console.error("Error al actualizar la categoría",error);
        throw error;
    }
}

export const deleteCategory = async (idCategoria) =>{
    const db = await openDatabase();
    try {
        const result = await db.runAsync("UPDATE categorias SET activa = 0 WHERE idCategoria = ?",[idCategoria]);
        console.log("Holiwis");
        return result.changes;
    } catch (error) {
        console.error("Error al eliminar la categoria",error)
        throw error;
    }
}

