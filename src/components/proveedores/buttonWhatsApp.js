import React from "react";
import { StyleSheet, Linking, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const openWhatsApp = (phoneNumber) => {
  const url = `https://wa.me/${phoneNumber}`;
  
  Linking.openURL(url).catch((err) => {
    console.error("Error al abrir el navegador:", err);
    Alert.alert("Error", "No se pudo abrir el enlace.");
  });
};

export default function ButtonWhatsApp({ telefono }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => openWhatsApp(telefono)}
    >
      <Ionicons name="logo-whatsapp" size={25} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#25D366",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  }
});
