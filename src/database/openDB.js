import * as SQLite from 'expo-sqlite';

let db = null;

//? Función para abrir o crear la base de datos
export async function openDatabase () {
    if ( db ) {
        console.log("Base de datos reabierta exitosamente");
        return db;
    }
    
    db = await SQLite.openDatabaseAsync('StockCastor.db');
    console.log("Base de datos abierta exitosamente");
    return db;
}

//? Función para cerrar y resetear la instancia singleton de la BD
export async function closeDatabase () {
    if ( db ) {
        try {
            await db.closeAsync();
        } catch ( error ) {
            console.log("Error al cerrar la Base de Datos", e);
        }
        db = null;
        console.log("Base de datos cerrada");
    }
}