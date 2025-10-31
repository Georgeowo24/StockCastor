import { useEffect, useState } from "react";
import * as CategoriesRepository from '../repositories/CategoriesRepository';

export const useCategoriesViewModel = ()=>{
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAllCategories();
    }, []);


    const loadAllCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await CategoriesRepository.getSelectCategory();
            setCategories(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async(infoCategory) =>{
        if (!infoCategory.nombreCategoria){
            const invalidError = new Error("El nombre de la categoría es obligatorio.");
            setError(invalidError.message);
            throw invalidError;
        }
        
        try {
            await CategoriesRepository.addCategory(infoCategory.nombreCategoria, infoCategory.descripcion);
            setError(null);

        } catch (error) {
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                const duplicateError = new Error("Esa categoría ya existe. Use un nombre diferente.");
                setError(duplicateError.message); 
                throw duplicateError; 
            }
            setError(error.message);
            throw error; 
        }
    }

    const handleEditCategory = async(infoCategory) =>{
        if (!infoCategory.nombreCategoria || !infoCategory.idCategoria){
            setError("Datos inválidos");
            return;
        }
        try {
            await CategoriesRepository.editCategory(infoCategory.idCategoria,infoCategory.nombreCategoria,infoCategory.descripcion)
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDeleteCategory = async (id) => {
            try {
                await CategoriesRepository.deleteCategory(id);
            } catch (e) {
                setError(e.message);
            }
        };

    return {
        // Estado
        categories,
        isLoading,
        error,
        
        // Funciones
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        loadAllCategories
    };
}


