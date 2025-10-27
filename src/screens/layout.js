import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { LAYOUT } from '../styles/globalStyles';


export default function Layout({ title, children }) {
    return (
        <View style={LAYOUT.wrapper}>
            <ScrollView
                contentContainerStyle={LAYOUT.container}
                // showsVerticalScrollIndicator={false}
            >
                <Text style={LAYOUT.title}>{title}</Text>
                {children}
            </ScrollView>
        </View>
    );
}