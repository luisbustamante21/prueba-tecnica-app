// src/styles/exploreStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#FAFAFA',
    },
    iconButton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15, // Espaciado simétrico entre la lupa y el filtro
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        textTransform: 'capitalize',
    },
    headerSearchInput: {
        flex: 1,
        height: 38,
        backgroundColor: '#F3F4F6',
        borderRadius: 18,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        fontSize: 15,
        color: '#1F2937',
    },
    tabsWrapper: {
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFAFA',
    },
    tabsContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 30,
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 3,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabActive: {
        borderColor: '#3B82F6',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    tabTextActive: {
        color: '#3B82F6',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 50,
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyText: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
    },

    // --- ESTILOS DEL MODAL DE ORDENAMIENTO ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 15,
    },
    sortOptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    sortOptionText: {
        fontSize: 16,
        color: '#4B5563',
    },
    sortOptionTextActive: {
        color: '#3B82F6',
        fontWeight: 'bold',
    }
});