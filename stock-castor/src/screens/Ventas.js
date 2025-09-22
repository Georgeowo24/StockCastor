import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VentasScreen() {
  return (
    <View style={styles.container}>
      <Text>VentasScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});