import { useEffect, useState } from "react";
import * as MeasuresRepository from '../repositories/MeasuresRepository';

export const useMeasuresViewModel = ()=>{
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadMeasures = async (idCategoria) => {
        if (!idCategoria) {
            setMeasures([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await MeasuresRepository.getSelectMeasures(idCategoria);
            setMeasures(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMeasure = async(infoMeasure) =>{
        if (!infoMeasure.medida || !infoMeasure.idCategoria){
            const invalidError = new Error("El nombre de la medida y la categoría son obligatorios.");
            setError(invalidError.message);
            throw invalidError;
        }
        
        try {
            await MeasuresRepository.addMeasure(infoMeasure.idCategoria, infoMeasure.medida);
            setError(null);
        } catch (error) {
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                const duplicateError = new Error("Esa medida ya existe para esta categoría.");
                setError(duplicateError.message); 
                throw duplicateError; 
            }
            setError(error.message);
            throw error; 
        }
    }


    const handleDeleteMeasure = async (id) => {
            try {
                await MeasuresRepository.deleteMeasure(id);
            } catch (e) {
                setError(e.message);
            }
        };

    return {
        // Estado
        measures,
        isLoading,
        error,
        
        // Funciones
        loadMeasures, // Para cargar las medidas de una categoría
        handleAddMeasure,
        handleDeleteMeasure
    };
}
