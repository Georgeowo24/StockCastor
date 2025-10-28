import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#007AFF',
    secondary: '#5FC9B4',
    background: '#F9FAFB',
    green: '#34C759',
    text: '#111827',
    gray: '#6B7280',
    white: '#FFFFFF',
    warning1: '#FF9500',
    warning2: '#FFF9E6',
    danger1: '#DC2626',
    danger2: '#FEF2F2',
    success1: '#10B981',
    success2: '#ECFDF5'
};

export const SIZES = {
    base: 8,
    small: 12,
    medium: 16,
    large: 18,
    xlarge: 30,
};

export const FONTS = {
    regular: {
        fontFamily: 'System',
        fontSize: SIZES.medium,
        color: COLORS.text,
        paddingBottom: 10,
        textAlign: 'justify',
    },
    title: {
        fontFamily: 'System',
        fontWeight: '700',
        fontSize: SIZES.xlarge,
        color: COLORS.text,
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: 'System',
        fontSize: SIZES.large,
        color: COLORS.text,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    buttonWhite: {
        fontSize: SIZES.large, 
        fontWeight: 'bold', 
        color: '#FFFFFF'
    }
};

export const GLOBAL_STYLES = StyleSheet.create({
    title: FONTS.title,
    subtitle: FONTS.subtitle,
    textS: FONTS.sMedium,
    text: FONTS.regular,
    textButtonWhite: FONTS.buttonWhite
});
