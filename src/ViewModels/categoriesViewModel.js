import { useEffect, useState } from "react";
import * as CategoriesRepository from '../repositories/CategoriesRepository';

export const useCategoriesViewModel = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await CategoriesRepository.getSelectCategories();
            setCategories(data);
        } catch (e) {
            setError(e.message);
            console.error("Error en ViewModel al cargar categorías:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCategoryDetails = async (idCategoria) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await CategoriesRepository.getSelectInfoCategory(idCategoria);
            setCurrentCategory(data);
            if (!data) {
                setError("No se encontró la categoría seleccionada.");
            }
        } catch (e) {
            setError(e.message);
            console.error("Error en ViewModel al cargar detalles de categoría:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (categoryInfo) => {
        if ( !categoryInfo.nombreCategoria ) {
            setError("El nombre de la categoría es obligatorio");
            return false;
        }

        if ( !categoryInfo.idTipoMedida ) {
            setError("El tipo de medida es obligatorio");
            return false;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const exists = await CategoriesRepository.checkCategoryExists(categoryInfo.nombreCategoria);

            if ( exists ) {
                setError ("Ya existe una categoria con ese nombre")
                setIsLoading(false);
                return false;
            }

            await CategoriesRepository.addCategory(
                categoryInfo.nombreCategoria,
                categoryInfo.descripcion,
                categoryInfo.idTipoMedida
            );

            await loadCategories();
            return true;
        } catch (e) {
            setError(e.message);
            console.error("Error en ViewModel al añadir categoría:", e);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditCategory = async (categoryInfo) => {
        if (!categoryInfo.idCategoria || !categoryInfo.nombreCategoria) {
            setError("Datos de categoría inválidos");
            return false;
        }

        setIsLoading(true);
        setError(null);
        try {
            const exists = await CategoriesRepository.checkCategoryExistsForEdit(
                categoryInfo.idCategoria,
                categoryInfo.nombreCategoria
            );

            if (exists) {
                setError("Ya existe otra categoría con ese nombre.");
                setIsLoading(false);
                return false; 
            }

            await CategoriesRepository.editCategory(
                categoryInfo.idCategoria,
                categoryInfo.nombreCategoria,
                categoryInfo.descripcion,
                categoryInfo.idTipoMedida
            );
            await loadCategories();
            return true;
        } catch (e) {
            setError(e.message);
            console.error("Error en ViewModel al editar categoría:", e);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCategory = async (idCategoria) => {
        setIsLoading(true);
        setError(null);
        try {
            await CategoriesRepository.deleteCategory(idCategoria);
            await loadCategories();
        } catch (e) {
            setError(e.message);
            console.error("Error en ViewModel al eliminar categoría:", e);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // Estado
        categories,
        currentCategory,
        isLoading,
        error,

        // Funciones
        loadCategories,
        loadCategoryDetails,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory
    };
}