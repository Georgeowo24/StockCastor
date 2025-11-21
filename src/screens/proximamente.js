import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Componentes y Estilos
import LayoutSinScroll from "./layoutSinScroll";
import GlobalButton from "../components/button";
import { COLORS, GLOBAL_STYLES } from "../styles/globalStyles";

export default function Proximamente() {
    const navigation = useNavigation();
    const route = useRoute();
    
    // Podemos recibir el título por parámetros si queremos reutilizarla
    const { titulo } = route.params || { titulo: "Próximamente" };

    return (
        <LayoutSinScroll titulo={titulo}>
            <View style={styles.container}>
                
                {/* Ícono decorativo con fondo circular */}
                <View style={styles.iconContainer}>
                    <Ionicons name="rocket-outline" size={80} color={COLORS.white} />
                </View>

                <Text style={[GLOBAL_STYLES.title, styles.title]}>
                    ¡En Construcción!
                </Text>

                <Text style={[GLOBAL_STYLES.text, styles.description]}>
                    Estamos trabajando duro para traerte esta funcionalidad en la próxima actualización.
                </Text>

                {/* Botón para regresar */}
                <View style={styles.buttonContainer}>
                    <GlobalButton 
                        text="Volver atrás" 
                        onPress={() => navigation.goBack()} 
                        color="secondary" // Usamos un color secundario o gris para no distraer
                    />
                </View>

            </View>
        </LayoutSinScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -50 // Truco visual para subirlo un poco y que quede más centrado visualmente
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70, // Círculo perfecto
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        // Sombra suave
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24,
    },
    description: {
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 40,
        fontSize: 16,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
    }
});