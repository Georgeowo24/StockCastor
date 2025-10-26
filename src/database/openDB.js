import * as SQLite from 'expo-sqlite';

//? Función para abrir o crear la base de datos
export async function openDatabase() {
    const db = await SQLite.openDatabaseAsync('StockCastor.db');
    console.log("Base de datos abierta exitosamente");
    return db;
}