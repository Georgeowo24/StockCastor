import { openDatabase } from "../database/openDB";

export const addProvider = async (nombreProveedor,telefono = "", direccion = "")=>{
    const db = await openDatabase();
    try {
        const result = await db.withTransactionAsync(async (tx)=>{
            return await tx.executeSqlAsync("INSERT INTO proveedores(nombreProveedor,telefono,direccion) VALUES(?,?,?)",
                [nombreProveedor,telefono,direccion]
            );
        });
        return result.insertId;
    } catch (error) {
        console.error("Error al crear proveedor",error);
        throw error;
    }
}

export const getSelectProvider = async ()=>{
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idProveedor,nombreProveedor from categorias")
        return result;
    } catch (error) {
        console.error("Error al obtener Proveedores Select",error);
        throw error;
    }
} 

export const editProvider = async (idProveedor,nombreProveedor,telefono="",direccion="")=>{
    const db = await openDatabase();
    try {
        const result = await db.withTransactionAsync(async (tx)=>{
            return await tx.executeSqlAsync("UPDATE  proveedores SET nombreProveedor = ?,telefono = ?, direccion = ? WHERE idProveedor = ?",
                [nombreProveedor,telefono,direccion,idProveedor]
            );
        });
        return result.changes;
    } catch (error) {
        console.error("Error al actualizar la categoría",error);
        throw error;
    }
}

export const deleteProvider = async (idProveedor) =>{
    const db = await openDatabase();
    try {
        const result = await db.runAsync("UPDATE proveedores SET activo = 0 WHERE idProveedor = ?",[idProveedor]);
        return result.changes;
    } catch (error) {
        console.error("Error al eliminar la categoria",error)
        throw error;
    }
}

