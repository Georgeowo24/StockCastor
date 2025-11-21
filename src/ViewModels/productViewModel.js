import { useState, useEffect } from 'react';
import * as ProductRepository from '../repositories/ProductRepository';
import * as ImageService from '../handlers/fileService'; 
import * as ImagePicker from 'expo-image-picker';
import * as MeasuresRepository from '../repositories/MeasuresRepository'


export const useProductViewModel = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    const [measures, setMeasures] = useState([]);
    const [isLoadingMeasures, setIsLoadingMeasures] = useState(false);

    useEffect(() => {
        loadAllProductsByCategory();
    }, []);

    const loadMeasuresForCategory = async (idCategoria) => {
        if (!idCategoria) {
            setMeasures([]);
            return;
        }
        setIsLoadingMeasures(true);
        setError(null);
        try {
            const data = await MeasuresRepository.getSelectMeasuresByCategory(idCategoria)
            setMeasures(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoadingMeasures(false);
        }
    };

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

    const handleAddProduct = async (infoProduct) => {
        let permanentUrl = null; 

        if (selectedImageUri) {
            permanentUrl = await ImageService.saveImage(selectedImageUri);
            console.log('HoliwisImg');
        }

        if (
            !infoProduct.idCategoria || !infoProduct.nombreProducto || infoProduct.precioCompra < 0 
            || infoProduct.precioVenta < 0 || infoProduct.stockActual < 0 || infoProduct.stockMinimo < 0 
            || !infoProduct.idMedida
        ) {
            setError('Datos inválidos');
            console.log('HoliwisError');
            return;
        }
        
        try {
            await ProductRepository.addProduct(
                infoProduct.idCategoria, infoProduct.idProveedor, infoProduct.nombreProducto,
                permanentUrl,infoProduct.descripcion,infoProduct.precioCompra,infoProduct.precioVenta,
                infoProduct.stockActual,infoProduct.stockMinimo,infoProduct.idMedida
            );
            setSelectedImageUri(null);
            await loadAllProducts();
            console.log('HoliwisAñadido');
        } catch (e) {
            setError(e.message);
        }
    };
    
    const handleEditProduct = async (infoProduct) => {
        let permanentUrl = null; 


        if (selectedImageUri) {
            permanentUrl = await ImageService.saveImage(selectedImageUri);
        }

        if (!infoProduct.idProducto || !infoProduct.idCategoria || !infoProduct.idProveedor || !infoProduct.nombreProducto
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
            await loadAllProducts();
        } catch (e) {
            setError(e.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await ProductRepository.DeleteProduct(id);
            await loadAllProducts(); 
        } catch (e) {
            setError(e.message);
        }
    };

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

        measures,
        isLoadingMeasures,
        loadMeasuresForCategory,
    };
};