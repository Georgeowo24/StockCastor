import { openDatabase } from "../database/openDB";

export const addMeasure = async (idCategoria, medida) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "INSERT INTO medidas(idCategoria, medida) VALUES(?, ?)",
            [idCategoria, medida]
        );
        
        console.log('Creando nueva medida');
        return result.lastInsertRowId; 
    } catch (error) {
        console.error("Error al crear la medida", error);
        throw error;
    }
}


export const getSelectMeasures = async (idCategoria) => {
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync(
            "SELECT idMedida, medida FROM medidas WHERE idCategoria = ?",
            [idCategoria]
        );
        return result;
    } catch (error) {
        console.error("Error al obtener Medidas Select", error);
        throw error;
    }
}


export const editMeasure = async (idMedida, medida) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            "UPDATE medidas SET medida = ? WHERE idMedida = ?",
            [medida, idMedida]
        );
        console.log('Edición completa de la medida');
        return result.changes;
    } catch (error) {
        console.error("Error al actualizar la medida", error);
        throw error;
    }
}
