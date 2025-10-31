import { openDatabase } from "../database/openDB";

export const addProvider = async (nombreProveedor, telefono = "", direccion = "") => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "INSERT INTO proveedores(nombreProveedor, telefono, direccion) VALUES(?, ?, ?)",
            [nombreProveedor, telefono, direccion]
        );
        
        console.log('Creando nuevo proveedor');
        return result.lastInsertRowId; 
    } catch (error) {
        console.error("Error al crear proveedor", error);
        throw error;
    }
}

export const getSelectProvider = async () => {
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync("SELECT idProveedor, nombreProveedor FROM proveedores WHERE activo = 1")
        return result;
    } catch (error) {
        console.error("Error al obtener Proveedores Select", error);
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
        console.error("Error al actualizar el proveedor", error); // Mensaje corregido
        throw error;
    }
}

export const deleteProvider = async (idProveedor) => {
    const db = await openDatabase();
    try {
        // Esto ya usaba 'runAsync', así que está perfecto
        const result = await db.runAsync("UPDATE proveedores SET activo = 0 WHERE idProveedor = ?", [idProveedor]);
        return result.changes;
    } catch (error) {
        console.error("Error al eliminar el proveedor", error) // Mensaje corregido
        throw error;
    }
}