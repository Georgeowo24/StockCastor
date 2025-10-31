import * as FileSystem from 'expo-file-system/legacy'; // <--- ESTA ES LA CORRECCIÓN

// Define un directorio permanente para las imágenes de productos
// Usamos tu constante original
const IMAGE_DIR = FileSystem.documentDirectory + 'product_images/';

// Helper para asegurar que el directorio exista (revertido a tu código original)
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
  if (!dirInfo.exists) {
    console.log("Creando directorio de imágenes...");
    await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
};

/**
 * Guarda una imagen desde una URI temporal a una URI permanente.
 * @param {string} tempUri - La URI de la imagen (ej. del ImagePicker).
 * @returns {Promise<string>} - La nueva URI permanente.
 */
export const saveImage = async (tempUri) => {
  if (!tempUri) return null;

  await ensureDirExists();
  
  // Genera un nombre de archivo único (revertido a tu código original)
  const filename = Date.now() + '.jpg';
  const permanentUri = IMAGE_DIR + filename;

  try {
    // Copia el archivo (revertido a tu código original)
    await FileSystem.copyAsync({
      from: tempUri,
      to: permanentUri,
    });
    return permanentUri;
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
    throw error;
  }
};

/**
 * Elimina una imagen del sistema de archivos.
 * @param {string} uri - La URI permanente de la imagen a borrar.
 */
export const deleteImage = async (uri) => {
  if (!uri) return;

  try {
    // Verifica si el archivo existe (revertido a tu código original)
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri);
      console.log('Imagen eliminada:', uri);
    }
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
  }
};

