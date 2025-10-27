import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#007AFF',
    secondary: '#5FC9B4',
    background: '#F9FAFB',
    text: '#111827',
    gray: '#6B7280',
    white: '#FFFFFF',
};

export const SIZES = {
    base: 8,
    small: 12,
    medium: 16,
    large: 22,
    xlarge: 28,
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
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: 'System',
        fontSize: SIZES.large,
        color: COLORS.gray,
        marginBottom: 15,
    },
};

export const GLOBAL_STYLES = StyleSheet.create({
    title: FONTS.title,
    text: FONTS.regular,
    subtitle: FONTS.subtitle,
});

export const LAYOUT = StyleSheet.create({
    wrapper: { 
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        flexGrow: 1, 
        paddingHorizontal: 20,
        paddingVertical: 50,
        paddingBottom: 120,
    },
    title: FONTS.title,
 });
