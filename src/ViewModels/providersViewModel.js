import { useEffect, useState } from "react";
import * as ProvidersRepository from '../repositories/ProvidersRepository'

export const useProvidersViewModel = ()=>{
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAllProviders();
    }, []);


    const loadAllProviders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ProvidersRepository.getSelectProvider();
            setProviders(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProvider = async(infoProvider) =>{
        if (!infoProvider.nombreProveedor){
            setError("Datos inválidos");
            return;
        }
        try {
            await ProvidersRepository.addProvider(infoProvider.nombreProveedor,infoProvider.telefono,infoProvider.direccion)
            await loadAllProviders();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleEditProvider= async(infoProvider) =>{
        if (!infoProvider.nombreProveedor || !infoProvider.idProveedor){
            setError("Datos inválidos");
            return;
        }
        try {
            await ProvidersRepository.editProvider(infoProvider.idProveedor,infoProvider.nombreProveedor,infoProvider.telefono,infoProvider.direccion)
            await loadAllProviders();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleDeleteProvider = async (id) => {
        try {
            await ProvidersRepository.deleteProvider(id);
            await loadAllProviders();
        } catch (e) {
            setError(e.message);
        }
    };

    return {
        // Estado
        providers,
        isLoading,
        error,
        
        // Funciones
        handleAddProvider,
        handleEditProvider,
        handleDeleteProvider,
        loadAllProviders
    }

}


