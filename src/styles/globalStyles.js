import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#007AFF',
    secondary: '#5FC9B4',
    background: '#F9FAFB',
    green: '#34C759',
    text: '#111827',
    black: '#000000',
    gray: '#6B7280',
    darkGray: '#393b40ff',
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
    xlarge: 25,
    xxlarge: 30,
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
        fontSize: SIZES.xxlarge,
        color: COLORS.text,
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: 'System',
        fontSize: SIZES.xlarge,
        color: COLORS.text,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    subtitle2: {
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
    subtitle2: FONTS.subtitle2,
    textS: FONTS.sMedium,
    text: FONTS.regular,
    textButtonWhite: FONTS.buttonWhite
});
