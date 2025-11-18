import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../styles/globalStyles';

const PREDEFINED_ICONS = [
    "shirt-outline", "restaurant-outline", "construct-outline", 
    "home-outline", "car-sport-outline", "paw-outline", 
    "cafe-outline", "game-controller-outline", "glasses-outline", 
    "flower-outline", "basket-outline", "beer-outline",
    "desktop-outline", "phone-portrait-outline", "hammer-outline"
];

export default function IconSelector({ selectedIcon, onSelect }) {
    
    const renderItem = ({ item }) => {
        const isSelected = selectedIcon === item;
        
        return (
            <TouchableOpacity 
                style={[
                    styles.iconItem, 
                    isSelected && styles.selectedItem
                ]}
                onPress={() => onSelect(item)}
            >
                <Ionicons 
                    name={item} 
                    size={28} 
                    color={isSelected ? COLORS.white : COLORS.primary} 
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona un Icono:</Text>
            <FlatList
                data={PREDEFINED_ICONS}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.black,
    },
    iconItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    selectedItem: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    }
});