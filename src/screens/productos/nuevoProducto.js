import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Layout from "../layout";
import GlobalButton from "../../components/buttton";
import { GLOBAL_STYLES, SIZES, COLORS } from "../../styles/globalStyles";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "react-native-image-picker";

export default function NuevoProducto() {
    const [formData, setFormData] = useState({
        categoria: "",
        nombre: "",
        imagen: "",
        descripcion: "",
        precioCompra: "",
        precioVenta: "",
        stockActual: "",
        stockMinimo: "",
        medida: "",
    });

    const medidas = ["XS", "S", "M", "L", "XL", "S/M"];
    const categorias = ["Ropa", "Electrónica", "Hogar", "Juguetes", "Otros"];

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSelectImage = () => {
        ImagePicker.launchImageLibrary(
            { mediaType: "photo", selectionLimit: 1 },
            (response) => {
                if (!response.didCancel && !response.errorCode && response.assets?.length) {
                    handleChange("imagen", response.assets[0].uri);
                }
            }
        );
    };

    return (
        <Layout titulo={"Nuevo Producto"}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* //?  Categoría */}
                <Text style={GLOBAL_STYLES.subtitle}>Categoría</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.categoria}
                        onValueChange={(itemValue) => handleChange("categoria", itemValue)}
                    >
                        <Picker.Item label="Selecciona una categoría" value="" />
                            {categorias.map((cat) => (
                                <Picker.Item key={cat} label={cat} value={cat} />
                            ))}
                    </Picker>
                </View>
                
                {/* //? Nombre del producto */}
                <Text style={GLOBAL_STYLES.subtitle}>Nombre del producto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del producto"
                    value={formData.nombre}
                    onChangeText={(text) => handleChange("nombre", text)}
                />

                {/* //? Imagen */}
                <Text style={GLOBAL_STYLES.subtitle}>Imagen</Text>
                <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                    <Text style={styles.imageButtonText}>
                        {formData.imagen ? "Imagen seleccionada" : "Seleccionar imagen"}
                    </Text>
                </TouchableOpacity>

                {/* //? Descripción */}
                <Text style={GLOBAL_STYLES.subtitle}>Descripción</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    multiline
                    placeholder="Describe el producto..."
                    value={formData.descripcion}
                    onChangeText={(text) => handleChange("descripcion", text)}
                />

                {/* //? Precio de compra */}
                <Text style={GLOBAL_STYLES.subtitle}>Precio de compra</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={formData.precioCompra}
                    onChangeText={(text) => handleChange("precioCompra", text)}
                />

                {/* //? Precio de venta */}
                <Text style={GLOBAL_STYLES.subtitle}>Precio de venta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={formData.precioVenta}
                    onChangeText={(text) => handleChange("precioVenta", text)}
                />

                {/* //? Stock actual */}
                <Text style={GLOBAL_STYLES.subtitle}>Stock actual</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad actual"
                    keyboardType="numeric"
                    value={formData.stockActual}
                    onChangeText={(text) => handleChange("stockActual", text)}
                />

                {/* //? Stock mínimo */}
                <Text style={GLOBAL_STYLES.subtitle}>Stock mínimo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad mínima"
                    keyboardType="numeric"
                    value={formData.stockMinimo}
                    onChangeText={(text) => handleChange("stockMinimo", text)}
                />

                {/* //? Medida */}
                <Text style={GLOBAL_STYLES.subtitle}>Medida</Text>
                <View style={styles.medidasContainer}>
                    {medidas.map((m) => (
                        <TouchableOpacity
                            key={m} style={[ styles.medidaBtn, formData.medida === m && styles.medidaBtnSelected ]}
                            onPress={() => handleChange("medida", m)}
                        >
                            <Text style={[ styles.medidaText, formData.medida === m && styles.medidaTextSelected ]}>
                                {m}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* //* Botón para guardar */}
                <View style={{ marginTop: 20 }}>
                    <GlobalButton
                        text={"Añadir nuevo producto"}
                        screen={"ProductosMain"}
                    />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.medium,
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        padding: SIZES.small,
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
    },
    imageButton: {
        padding: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        alignItems: "center",
        marginBottom: 10,
    },
    imageButtonText: {
        color: COLORS.text,
        fontWeight: "bold",
    },
    medidasContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    medidaBtn: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 4,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        alignItems: "center",
    },
    medidaBtnSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    medidaText: {
        color: COLORS.text,
        fontWeight: "bold",
    },
    medidaTextSelected: {
        color: COLORS.white,
    },
});