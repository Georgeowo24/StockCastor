import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Componentes y Estilos
import Layout from "../../layout";
import GlobalButton from "../../../components/button";
import { COLORS, GLOBAL_STYLES, SIZES, FONTS } from "../../../styles/globalStyles";

// ViewModel
import { useProductViewModel } from "../../../ViewModels/productViewModel";

export default function InfoProducto() {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;

    const { handleDeleteProduct } = useProductViewModel();

    const onDelete = () => {
        Alert.alert(
            "Eliminar Producto",
            `¿Estás seguro de eliminar "${product.nombreProducto}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: async () => {
                        await handleDeleteProduct(product.idProducto);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const onEdit = () => {
        navigation.navigate('EditarProducto', { product: product });
    };

    // Cálculo de estado de stock
    const isLowStock = product.stockActual < product.stockMinimo;
    const hasStock = product.stockActual > 0;

    return (
        <Layout titulo="Detalles">
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* 1. Imagen Principal */}
                <View style={styles.imageContainer}>
                    {product.imagen ? (
                        <Image source={{ uri: product.imagen }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Ionicons name="image-outline" size={60} color={COLORS.gray} />
                            <Text style={{ color: COLORS.gray }}>Sin imagen</Text>
                        </View>
                    )}
                </View>

                {/* 2. Encabezado: Nombre y Precio */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>{product.nombreProducto}</Text>
                    <Text style={styles.price}>${product.precioVenta?.toFixed(2)}</Text>
                </View>

                {/* 3. Indicadores de Stock */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Stock Actual</Text>
                        <Text style={[
                            styles.statValue, 
                            { color: hasStock ? COLORS.success1 : COLORS.danger1 }
                        ]}>
                            {product.stockActual} u.
                        </Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Stock Mínimo</Text>
                        <Text style={styles.statValue}>{product.stockMinimo} u.</Text>
                    </View>

                    {isLowStock && hasStock && (
                        <View style={[styles.alertBadge]}>
                            <Ionicons name="warning" size={16} color={COLORS.warning1} />
                            <Text style={styles.alertText}>Stock Bajo</Text>
                        </View>
                    )}
                </View>

                <View style={styles.divider} />

                {/* 4. Detalles e Información */}
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.description}>
                    {product.descripcion || "Sin descripción disponible para este producto."}
                </Text>

                <View style={styles.rowDetail}>
                    <Text style={styles.detailLabel}>Precio de Compra:</Text>
                    <Text style={styles.detailValue}>${product.precioCompra?.toFixed(2)}</Text>
                </View>
                
                {/* Aquí podrías agregar más detalles como Proveedor si haces el JOIN en la BD */}

                <View style={{ height: 30 }} />

                {/* 5. Botones de Acción */}
                <View style={styles.buttonsRow}>
                    <GlobalButton
                        onPress={onEdit}
                        color="warning1"
                        style={styles.smallButton}
                        icon={<Ionicons name="create-outline" size={25} color="#fff" />}
                    />
    
                    <GlobalButton
                        onPress={onDelete}
                        color="danger1"
                        style={styles.smallButton}
                        icon={<Ionicons name="trash-outline" size={25} color="#fff" />}
                    />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 }
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 5,
        height: 45,
        borderRadius: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    headerSection: {
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 5,
    },
    price: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.primary,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap'
    },
    statBox: {
        marginRight: 20,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.gray,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    alertBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.warning2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginLeft: 'auto' // Empuja a la derecha
    },
    alertText: {
        color: COLORS.warning1,
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 12
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.gray,
        opacity: 0.2,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: COLORS.gray,
        lineHeight: 24,
        marginBottom: 20,
    },
    rowDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    detailLabel: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: '500'
    },
    detailValue: {
        fontSize: 16,
        color: COLORS.gray,
    }
});