// src/styles/detailStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },

    // Header Custom
    navHeader: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 100,
    },
    backCircleBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightActions: { flexDirection: 'row', gap: 12 },
    actionCircleBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Contenedores del Slide / Galería de imágenes
    galleryWrapper: {
        width: width,
        height: 360,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    imageSlideContainer: {
        width: width,
        height: 340,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    image: { width: '85%', height: '85%', resizeMode: 'contain' },

    // Paginación de círculos inferior
    dotContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB' },
    dotActive: { backgroundColor: '#2563EB', width: 16, borderRadius: 3 },

    // Cuerpo de contenido
    detailsContainer: { paddingHorizontal: 24, paddingVertical: 10, backgroundColor: '#FFFFFF' },

    // Badges de Información
    tagBadgeRow: { flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'center' },
    categoryBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2563EB',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        textTransform: 'uppercase'
    },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    statusInStock: { backgroundColor: '#D1FAE5' },
    statusLowStock: { backgroundColor: '#FEF3C7' },
    statusBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#065F46' },

    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827', flex: 1, marginRight: 15 },
    price: { fontSize: 22, fontWeight: 'bold', color: '#2563EB' },

    // Fila Meta (Reviews y Stock)
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    ratingText: { fontSize: 14, fontWeight: '600', color: '#111827' },
    reviewsCount: { color: '#9CA3AF', fontWeight: '400' },
    stockText: { fontSize: 13, fontWeight: '600', color: '#10B981' },

    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 12 },

    // Fila de selectores de color
    colorRow: { flexDirection: 'row', gap: 12, marginBottom: 24, alignItems: 'center' },
    colorRing: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorRingActive: { borderColor: '#2563EB' },
    colorDot: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: '#E5E7EB' },

    description: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 30 },

    // Botón Premium (Azul Sipy)
    addToCartBtn: {
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    addToCartBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },

    errorText: { fontSize: 16, color: '#EF4444', marginBottom: 16 },
    retryBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F3F4F6', borderRadius: 8 },
    btnText: { fontWeight: 'bold', color: '#374151' }
});