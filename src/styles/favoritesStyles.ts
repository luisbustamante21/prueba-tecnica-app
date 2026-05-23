// src/styles/favoritesStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA' // Fondo limpio estilo iOS
    },

    // --- ESTILOS DEL HEADER ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 5,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937'
    },

    // --- ESTILOS DE LA LISTA VACÍA ---
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 16
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center'
    },

    // --- ESTILOS DE LA TARJETA HORIZONTAL (LIST ITEM) ---
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        alignItems: 'center',
        // Sombra suave para resaltar la tarjeta
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        resizeMode: 'contain',
        backgroundColor: '#F3F4F6', // Fondo para dar contraste a la imagen
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
        marginLeft: 6,
    },
    heartContainer: {
        padding: 5,
        marginLeft: 10,
    }
});