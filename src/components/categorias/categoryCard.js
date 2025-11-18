import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS, SIZES } from '../../styles/globalStyles';

const CategoryCard = ({ item, onPress }) => {
    const iconName = item.icono || "pricetag-outline";

    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            
            <View style={styles.leftContent}>
                <Ionicons 
                    name={iconName}
                    size={22} 
                    color={COLORS.primary} 
                />
                <Text style={styles.cardText}>{item.nombreCategoria}</Text>
            </View>
            

            <Ionicons 
                name="chevron-forward-outline" 
                size={24} 
                color={COLORS.gray}
            />
        </TouchableOpacity>
    );
};

// --- Estilos ---
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.medium, 
        paddingHorizontal: SIZES.small,
        borderRadius: 10,
        marginBottom: 12,
        marginHorizontal: 2,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1, 
        shadowRadius: 2.62,
        elevation: 4,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkGray,
    }
});

export default CategoryCard;