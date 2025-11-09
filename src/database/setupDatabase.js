import * as SQLite from 'expo-sqlite';
import { openDatabase, closeDatabase } from './openDB';
import { initDatabase } from './initTables';
import { createIndexes } from './createIndexes';
import { initialData } from './initialData';

//? Función para inicializar toda la BD
export async function SetupDatabase () {
    try {
        console.log('📂 Abriendo base de datos...');
        const db = await openDatabase(); 

        console.log('⚙️ Inicializando tablas...');
        await initDatabase(db); 

        console.log('🆔 Creando índices...');
        await createIndexes(db);
        
        console.log('⤵️ Insertando datos iniciales...')
        await initialData(db);

        console.log('✅ Base de datos configurada e inicializada correctamente.');
        return true; 
    } catch ( error ) {
        console.error('❌ Error al inicializar la base de datos:', error);
        throw error;
    }
}

//? Función para borrar toda la BD
export async function DropDatabase () {
    const dbName = "StockCastor.db"
    
    try {
        await closeDatabase(); 

        console.log(`🧨 Borrando base de datos antigua: ${dbName}...`);
        await SQLite.deleteDatabaseAsync(dbName);
        console.log('🗑️ Base de datos eliminada.');
    } catch ( error ) {
        console.error('Error borrando la base de datos:', error);
    }
}