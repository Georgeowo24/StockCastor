import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMeasuresViewModel } from '../../ViewModels/measuresViewModel';
import { COLORS, SIZES, GLOBAL_STYLES } from '../../styles/globalStyles';

export default function MeasureList({ idTipoMedida }) {
    const { measures, isLoading, loadMeasuresByType, clearMeasures } = useMeasuresViewModel();

    useEffect(() => {
        if (idTipoMedida) {
            loadMeasuresByType(idTipoMedida); 
        } else {
            clearMeasures(); 
        }

        return () => clearMeasures();
    }, [idTipoMedida]);

    if (isLoading) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    }

    if (!idTipoMedida || measures.length === 0) {
        return null; 
    }

    return (
        <View style={styles.wrapper}>
            <Text style={GLOBAL_STYLES.subtitle2}>Medidas que incluirá:</Text>
            <View style={styles.container}>
                {measures.map((medida) => (
                    <View key={medida.idMedida} style={styles.tag}>
                        <Text style={styles.tagText}>{medida.medida}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '600',
        marginBottom: 12,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8, 
    },
    tag: {
        backgroundColor: COLORS.primary, 
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
});