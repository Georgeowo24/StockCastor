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
        if (!infoCategory.nombrCategoria){
            setError("Datos inválidos");
            return;
        }
        try {
            await CategoriesRepository.addCategory(infoCategory.nombrCategoria,infoCategory.descripcion)
        } catch (error) {
            setError(error.message);
        }
    }

    const handleEditCategory = async(infoCategory) =>{
        if (!infoCategory.nombrCategoria || !infoCategory.idCategoria){
            setError("Datos inválidos");
            return;
        }
        try {
            await CategoriesRepository.editCategory(infoCategory.idCategoria,infoCategory.nombrCategoria,infoCategory.descripcion)
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


