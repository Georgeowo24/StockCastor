import { openDatabase } from "../database/openDB";

export const getSelectTypeMeasure = async () => {
    const db = await openDatabase();
    try {
        const result =  await db.getAllAsync( "SELECT * FROM tiposMedidas" );
        return result;
    } catch ( error ) {
        console.error('Error al mostrar los tipos de medidas', error);
        throw error;
    }
}

export const getSelectMeasuresByType = async (idTipoMedida) => {
    const db = await openDatabase();
    try {
        const result =  await db.getAllAsync( "SELECT * FROM medidas WHERE idTipoMedida = ?", [idTipoMedida] );
        return result;
    } catch ( error ) {
        console.error('Error al mostrar los tipos de medidas', error);
        throw error;
    }
}

export const getSelectMeasuresByCategory = async (idCategoria) => {
    const db = await openDatabase();
    try {
        const query = `
            SELECT m.idMedida, m.medida 
            FROM medidas m
            INNER JOIN categorias c ON m.idTipoMedida = c.idTipoMedida
            WHERE c.idCategoria = ?
        `;
        const result = await db.getAllAsync(query, [idCategoria]);
        return result;
    } catch (error) {
        console.error('Error al obtener medidas por categoría', error);
        throw error;
    }
}