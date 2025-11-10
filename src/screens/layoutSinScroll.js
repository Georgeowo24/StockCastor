import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { FONTS } from '../styles/globalStyles';

export default function LayoutSinScroll({ titulo, children }) {
    return (
        <View style={LAYOUT.wrapper}>
            <View style={LAYOUT.container}>
                <Text style={LAYOUT.title}>{titulo}</Text>
                {children}
            </View>
        </View>
    );
}

const LAYOUT = StyleSheet.create({
    wrapper: { 
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        flexGrow: 1, 
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    title: FONTS.title,
 });