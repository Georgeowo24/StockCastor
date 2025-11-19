import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../styles/globalStyles';


export default function MeasureSelector({ measures, selectedId, onSelect, isLoading }) {

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.primary} />;
    }

    if (!measures || measures.length === 0) {
        return (
            <Text style={styles.emptyText}>
                Seleccione una categoría para ver las medidas disponibles.
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            {measures.map((item) => {
                const isSelected = item.idMedida === selectedId;

                return (
                    <TouchableOpacity
                        key={item.idMedida}
                        onPress={() => onSelect(item.idMedida)}
                        style={[
                            styles.tag,
                            isSelected ? styles.tagSelected : styles.tagUnselected
                        ]}
                    >
                        <Text style={[
                            styles.tagText,
                            isSelected ? styles.textSelected : styles.textUnselected
                        ]}>
                            {item.medida}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginVertical: 5,
    },
    tag: {
        borderRadius: 20, 
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        elevation: 1,
    },
    tagUnselected: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
    },
    tagSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
    },
    textUnselected: {
        color: COLORS.black,
    },
    textSelected: {
        color: COLORS.white,
    },
    emptyText: {
        color: COLORS.gray,
        fontStyle: 'italic',
        fontSize: 12,
        marginTop: 5
    }
});