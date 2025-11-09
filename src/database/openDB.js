import * as SQLite from 'expo-sqlite';

let db = null;

//? Función para abrir o crear la base de datos
export async function openDatabase() {
    if ( db ) {
        console.log("Base de datos reabierta exitosamente");
        return db;
    }
    
    db = await SQLite.openDatabaseAsync('StockCastor.db');
    console.log("Base de datos abierta exitosamente");
    return db;
}