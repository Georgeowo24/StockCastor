import { openDatabase } from "../database/openDB";

export const addProvider = async (nombreProveedor, telefono = "", direccion = "") => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "INSERT INTO proveedores(nombreProveedor, telefono, direccion) VALUES(?, ?, ?)",
            [nombreProveedor, telefono, direccion]
        );
        
        console.log('Nuevo proveedor añadido');
        return result.lastInsertRowId; 
    } catch (error) {
        console.error("Error al crear proveedor", error);
        throw error;
    }
}

export const getSelectProvider = async () => {
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idProveedor, nombreProveedor, telefono, direccion FROM proveedores WHERE activo = 1 ORDER BY nombreProveedor ASC")
        return result;
    } catch (error) {
        console.error("Error al obtener los proveedores", error);
        throw error;
    }
}

export const editProvider = async (idProveedor, nombreProveedor, telefono = "", direccion = "") => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "UPDATE proveedores SET nombreProveedor = ?, telefono = ?, direccion = ? WHERE idProveedor = ?",
            [nombreProveedor, telefono, direccion, idProveedor]
        );
        console.log('Edición completa del proveedor');
        return result.changes; 
    } catch (error) {
        console.error("Error al actualizar el proveedor", error);
        throw error;
    }
}

export const deleteProvider = async (idProveedor) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync("UPDATE proveedores SET activo = 0 WHERE idProveedor = ?", [idProveedor]);
        console.log('Proveedor eliminado correctamente');
        return result.changes;
    } catch (error) {
        console.error("Error al eliminar el proveedor", error) 
        throw error;
    }
}