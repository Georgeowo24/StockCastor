// useProductViewModel.js
import { useState, useEffect } from 'react';
import * as ProductRepository from '../repositories/ProductRepository';
import * as ImageService from '../handlers/fileService'; // <-- Importa el servicio
import * as ImagePicker from 'expo-image-picker';


export const useProductViewModel = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    // Cargar productos al iniciar
    useEffect(() => {
        loadAllProductsByCategory();
    }, []);

    // Lógica de negocios: Cargar productos
    const loadAllProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
        const data = await ProductRepository.getAllProducts();
        setProducts(data);
        } catch (e) {
        setError(e.message);
        } finally {
        setIsLoading(false);
        }
    };

    const loadAllProductsByCategory = async () => {
        setIsLoading(true);
        setError(null);
        try {
        const data = await ProductRepository.getProductsGroupedByCategory();
        setProducts(data);
        } catch (e) {
        setError(e.message);
        } finally {
        setIsLoading(false);
        }
    };

    const loadSelectData = async() => {
        setIsLoading(true);
        setError(null);
        try {
        const data = await ProductRepository.getSelectProducts();
        setProducts(data);
        } catch (e) {
        setError(e.message);
        } finally {
        setIsLoading(false);
        }
    }

    const loadProductData = async(idProducto) =>{
        setIsLoading(true);
        setError(null);
        try {
        const data = await ProductRepository.getProductData(idProducto);
        setProducts(data);
        } catch (e) {
        setError(e.message);
        } finally {
        setIsLoading(false);
        }
    }

    //Llamado al selector de imágenes
    const pickImage = async () => {
        // Pedir permiso
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Cuadrado para imágenes de producto
            quality: 0.7,
        });

        if (!result.canceled) {
        setSelectedImageUri(result.assets[0].uri); // Guarda la URI temporal
        }
    };

    // Lógica de negocios: Añadir un nuevo producto
    const handleAddProduct = async (infoProduct) => {
        let permanentUrl = null; 

        if (selectedImageUri) {
            permanentUrl = await ImageService.saveImage(selectedImageUri);
        }

        if (!infoProduct.idCategoria ||infoProduct.idProveedor || !infoProduct.nombreProducto
            || !infoProduct.descripcion || infoProduct.precioCompra < 0 || infoProduct.precioVenta < 0
            || infoProduct.stockActual < 0 || infoProduct.stockMinimo < 0 || !infoProduct.idMedida
        ) {
            setError('Datos inválidos');
            return;
        }
        
        try {

            await ProductRepository.addProduct(
                infoProduct.idCategoria, infoProduct.idProveedor, infoProduct.nombreProducto,
                permanentUrl,infoProduct.descripcion,infoProduct.precioCompra,infoProduct.precioVenta,
                infoProduct.stockActual,infoProduct.stockMinimo,infoProduct.idMedida
            );
            setSelectedImageUri(null);
            await loadAllProducts(); // Recargar la lista (Implementa Observer )
        } catch (e) {
            setError(e.message);
        }
    };
    
    const handleEditProduct = async (infoProduct) => {
        let permanentUrl = null; 


        if (selectedImageUri) {
            permanentUrl = await ImageService.saveImage(selectedImageUri);
        }

        if (!infoProduct.idProducto || !infoProduct.idCategoria ||infoProduct.idProveedor || !infoProduct.nombreProducto
            || !infoProduct.descripcion || infoProduct.precioCompra < 0 || infoProduct.precioVenta < 0
            || infoProduct.stockActual < 0 || infoProduct.stockMinimo < 0 || !infoProduct.idMedida
        ) {
            setError('Datos inválidos');
            return;
        }
        
        try {
            let oldUrl = await ProductRepository.getImage(infoProduct.id)
            if (permanentUrl){
                await ImageService.deleteImage(oldUrl);
            }
            else{
                permanentUrl = oldUrl;
            }

            await ProductRepository.EditProduct(
                infoProduct.idProducto,infoProduct.idCategoria, infoProduct.idProveedor, infoProduct.nombreProducto,
                permanentUrl,infoProduct.descripcion,infoProduct.precioCompra,infoProduct.precioVenta,
                infoProduct.stockActual,infoProduct.stockMinimo,infoProduct.idMedida
            );
            setSelectedImageUri(null);
            await loadAllProducts(); // Recargar la lista (Implementa Observer )
        } catch (e) {
            setError(e.message);
        }
    };

    // Lógica de negocios: Eliminar un producto
    const handleDeleteProduct = async (id) => {
        try {
            await ProductRepository.deleteProduct(id);
            await loadAllProducts(); // Recargar la lista
        } catch (e) {
            setError(e.message);
        }
    };

    // El ViewModel expone el estado y las funciones a la Vista
    return {
        // Estado
        products,
        isLoading,
        error,
        
        // Funciones
        handleAddProduct,
        handleEditProduct,
        handleDeleteProduct,
        reloadProducts:loadAllProductsByCategory,
        loadAllProducts,
        loadSelectData,
        loadProductData,
        pickImage,
        selectedImageUri, // La vista usa esto para mostrar la previsualización
        setSelectedImageUri, // Para limpiar el formulario
    };
};