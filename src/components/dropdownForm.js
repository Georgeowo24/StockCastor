import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, GLOBAL_STYLES } from "../styles/globalStyles";

export default function DropdownForm ({ label, iconName, items, setItems, value, setValue, zIndex, ...props }) {
    const [isOpen, setIsOpen] = useState(false);

    const containerStyles = [
        styles.inputContainer,
        isOpen ? styles.inputContainerFocused : {}
    ];

    const iconColor = isOpen ? COLORS.primary : COLORS.gray;

    return (
        <View style={[ styles.wrapper, { zIndex: zIndex || 10 } ]}>
            <Text style={[ GLOBAL_STYLES.subtitle2, styles.label ]}>{ label }</Text>

            <View style={ containerStyles }>
                { iconName && (
                    <Ionicons name={ iconName } size={22} color={iconColor} style={styles.icon} />
                )}

                <DropDownPicker
                    open={ isOpen }
                    value={ value }
                    items={ items }
                    setOpen={ setIsOpen }
                    setValue={ setValue }
                    setItems={ setItems }
                    
                    style={ styles.dropdown } 
                    placeholderStyle={ styles.placeholderText }
                    textStyle={ styles.selectedText }
                    dropDownContainerStyle={ styles.dropdownListContainer }
                    listItemLabelStyle={ styles.selectedText }

                    {...props}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6
    },
    // Contenedor principal (el que tiene el borde)
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1.5, 
        borderColor: COLORS.gray, 
        borderRadius: 12,
        minHeight: 55, 
    },
    inputContainerFocused: {
        borderColor: COLORS.primary, // Color al estar "enfocado" (abierto)
    },
    icon: {
        marginLeft: 15,
        marginRight: 5,
    },
    // Estilos específicos del DropDownPicker
    dropdown: {
        flex: 1,
        borderWidth: 0, // Quitamos el borde del picker porque ya lo tiene el 'inputContainer'
        backgroundColor: 'transparent',
    },
    placeholderText: {
        color: COLORS.gray,
        fontSize: 16,
    },
    selectedText: {
        color: COLORS.black,
        fontSize: 16,
    },
    dropdownListContainer: {
        // Estilo del contenedor que se despliega
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary, // Le ponemos el color primario al borde de la lista
        borderWidth: 1.5,
        borderRadius: 12,
        marginLeft: -42
    },
});