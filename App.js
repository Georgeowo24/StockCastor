import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { use, useEffect, useState } from 'react';

import { openDatabase } from './src/database/openDB'; 
import { initDatabase } from './src/database/initTables';
import { createIndexes } from './src/database/createIndexes';
import { createViews } from './src/database/CreateViews';

export default function App() {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

  useEffect(() => {
    async function setupDatabase() {
      try {
        console.log('📂 Abriendo base de datos...');
        const db = await openDatabase();

        console.log('⚙️ Inicializando tablas...');
        await initDatabase(db);
        
        console.log('Creando indices...'); 
        await createIndexes(db);

        console.log('Creando vistas...');
        await createViews(db);

        console.log('✅ Todas las tablas fueron creadas correctamente');
        setStatus('success');
      } catch (error) {
        console.error('❌ Error al crear tablas:', error);
        setStatus('error');
      }
    }

    setupDatabase();
  }, []);

  return (
    <View style={styles.container}>
      {status === 'loading' && (
        <>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.text}>Creando tablas en la base de datos...</Text>
        </>
      )}

      {status === 'success' && (
        <Text style={[styles.text, styles.success]}>
          ✅ Base de datos inicializada correctamente
        </Text>
      )}

      {status === 'error' && (
        <Text style={[styles.text, styles.error]}>
          ❌ Error al inicializar la base de datos. Revisa la consola.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});