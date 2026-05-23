import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    // --- Header Azul Ajustado ---
    blueHeader: {
        backgroundColor: '#1D4ED8',
        paddingTop: 50,
        paddingHorizontal: 20,
        // AUMENTAMOS el padding bottom para dejar espacio al solapamiento sin tapar el buscador
        paddingBottom: 45,
    },

    // --- NUEVO: Envoltorio para el efecto curvo ---
    contentWrapper: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderTopLeftRadius: 30,  // Curva superior izquierda
        borderTopRightRadius: 30, // Curva superior derecha
        marginTop: -25,           // Margen negativo para "subir" el contenedor blanco sobre el azul
        overflow: 'hidden',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    menuIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    bellIcon: {
        fontSize: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12, // Bordes sutiles corporativos en lugar de píldora gigante
        paddingHorizontal: 16,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
        color: '#9CA3AF',
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1F2937',
    },
    // --- Promoción ---
    promoCard: {
        backgroundColor: '#1E3A8A',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginTop: 20, // Ajustado para dar aire limpio después del header recto
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    promoContentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    promoSubtitle: {
        color: '#93C5FD',
        fontSize: 14,
        marginBottom: 2,
    },
    promoTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    promoPriceInfo: {
        color: '#93C5FD',
        fontSize: 13,
    },
    promoPriceBold: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 2,
        display: 'flex',
    },
    promoImage: {
        width: 100,
        height: 100,
    },
    // --- Categorías ---
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    seeAllText: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
    },
    categoriesScroll: {
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 24,
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: 16,
        width: 85,
    },
    categoryIconBox: {
        width: 70,
        height: 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
    categoryName: {
        fontSize: 11,
        color: '#4B5563',
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 2,
        lineHeight: 14,
    },
    // --- Productos ---
    productList: {
        paddingHorizontal: 12,
        paddingBottom: 30,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    errorContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    errorText: {
        color: '#EF4444',
        marginBottom: 10,
    },
    retryBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});