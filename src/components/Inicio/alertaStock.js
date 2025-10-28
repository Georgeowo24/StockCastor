import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, GLOBAL_STYLES } from "../../styles/globalStyles";

export const AlertaStock = ({ type = 'warning', title, description }) => {
    //! Type: success | warning | danger

    // Obtener la configuración específica para el tipo de alerta
    const config = ALERT_CONFIG[type] || ALERT_CONFIG.warning;
    const accentColor = config.color;
    const backgroundColor = config.background;
    const iconName = config.icon;
    

    return (
        <View style={[ALERT_STYLES.alertWrapper, { backgroundColor: backgroundColor }]}>
            <View style={[ALERT_STYLES.alertAccent, { backgroundColor: accentColor }]} />
            <View style={ALERT_STYLES.alertContent}>
                
                <Ionicons 
                    name={iconName} 
                    size={32} 
                    color={accentColor} 
                    style={ALERT_STYLES.alertIcon} 
                />
                
                
                <View style={ALERT_STYLES.alertTextBox}>
                    <Text style={ALERT_STYLES.alertTitle}> 
                        {title}
                    </Text>

                    <Text style={ALERT_STYLES.alertDescription}>
                        {description}
                    </Text>
                </View>

            </View>
        </View>
    );
}



const ALERT_CONFIG = {
    warning: {
        icon: 'warning-outline',
        color: COLORS.warning1,
        background: COLORS.warning2,
    },
    danger: {
        icon: 'close-circle-outline',
        color: COLORS.danger1,
        background: COLORS.danger2,
    },
    success: {
        icon: 'checkmark-circle-outline',
        color: COLORS.success1,
        background: COLORS.success2,
    },
};

const ALERT_STYLES = StyleSheet.create ({
    alertWrapper: {
        flexDirection: 'row', 
        backgroundColor: COLORS.warning2,
        borderRadius: 8,
        marginVertical: 20,
        overflow: 'hidden',
        elevation: 3, 
        shadowColor: COLORS.warning1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    alertAccent: {
        width: 8,
        backgroundColor: COLORS.warning1,
    },
    alertContent: {
        flex: 1, 
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 20, 
        alignItems: 'center',
    },
    alertIcon: {
        marginRight: 10,
        alignSelf: 'center',
    },
    alertTextBox: {
        flex: 1,
    },
    alertTitle: GLOBAL_STYLES.subtitle,
    alertDescription: GLOBAL_STYLES.textS
});