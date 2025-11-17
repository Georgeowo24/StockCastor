import { useEffect, useState } from "react";
import * as MeasuresRepository from '../repositories/MeasuresRepository';

export const useMeasuresViewModel = () => {
    const [measureTypes, setMeasureTypes] = useState([]);
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carga los tipos de medida al iniciar el hook
    useEffect(() => {
        loadMeasuresTypes();
    }, [])

    //? Obtiene todos los tipos de medida
    const loadMeasuresTypes = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await MeasuresRepository.getSelectTypeMeasure();
            setMeasureTypes(data);
        } catch ( e ) {
            setError(e.message);
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    }

    const loadMeasuresByType = async (idTipoMedida) => {
        if (!idTipoMedida) {
            setMeasures([]); // Limpia la lista si no hay ID
            return;
        }
        
        setIsLoading(true);
        setError(null);
        try {
            const data = await MeasuresRepository.getSelectMeasuresByType(idTipoMedida);
            setMeasures(data);
        } catch (e) {
            setError(e.message);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // Limpia la lista de medidas
    const clearMeasures = () => {
        setMeasures([]);
    };

    return {
        // Estado
        measureTypes,
        measures,
        isLoading,
        error,
        
        // Funciones
        loadMeasuresTypes,
        loadMeasuresByType,
        clearMeasures
    };
}
