import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Modal, RefreshControl } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { styles } from '../styles/exploreStyles';

export default function ExploreScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const passedCategory = route.params?.selectedCategory || '';
    const [activeTab, setActiveTab] = useState('Todos');
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const tabs = ['Todos', 'En Oferta', 'Más Vendidos'];

    // --- NUEVOS ESTADOS PARA EL ORDENAMIENTO ---
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState<string>('none');

    const {
        data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage
    } = useProducts('', passedCategory);

    const displayProducts = useMemo(() => {
        if (!data?.pages) return [];
        let allProducts = data.pages.flatMap(page => page.products);

        // 1. Filtrar por término de búsqueda
        if (searchQuery.trim() !== '') {
            allProducts = allProducts.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filtrar según la pestaña activa
        if (activeTab === 'En Oferta') {
            allProducts = allProducts.filter(p => p.discountPercentage > 10);
        } else if (activeTab === 'Más Vendidos') {
            allProducts = [...allProducts].sort((a, b) => b.rating - a.rating);
        }

        // 3. APLICAR ORDENAMIENTO EXPLICITO (Sobrescribe el orden de la pestaña si se selecciona uno)
        if (sortOption === 'price_asc') {
            allProducts = [...allProducts].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            allProducts = [...allProducts].sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating') {
            allProducts = [...allProducts].sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'name') {
            allProducts = [...allProducts].sort((a, b) => a.title.localeCompare(b.title));
        }

        return allProducts;
    }, [data?.pages, activeTab, searchQuery, sortOption]);

    // Función auxiliar para seleccionar el orden y cerrar el modal
    const handleSelectSort = (option: string) => {
        setSortOption(option);
        setIsSortModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
            {/* Header Dinámico y Minimalista */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                    <FontAwesome5 name="chevron-left" size={20} color="#1F2937" />
                </TouchableOpacity>

                {isSearching ? (
                    <TextInput
                        style={styles.headerSearchInput}
                        placeholder="Buscar productos..."
                        placeholderTextColor="#9CA3AF"
                        autoFocus
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onBlur={() => {
                            if (searchQuery.trim() === '') setIsSearching(false);
                        }}
                    />
                ) : (
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {passedCategory ? passedCategory : 'Todos'}
                    </Text>
                )}

                {/* Bloque derecho con iconos de Lupa y Filtro */}
                <View style={styles.rightActionsRow}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setIsSearching(!isSearching)}
                        activeOpacity={0.7}
                    >
                        <FontAwesome5 name="search" size={18} color="#1F2937" />
                    </TouchableOpacity>

                    {/* Botón que abre el modal de ordenamiento */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        activeOpacity={0.7}
                        onPress={() => setIsSortModalVisible(true)}
                    >
                        <FontAwesome5 name="sliders-h" size={18} color={sortOption !== 'none' ? '#3B82F6' : '#1F2937'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Pestañas de Navegación Centradas */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && styles.tabActive]}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Listado Grid e Interacciones de Estado */}
            {isLoading && displayProducts.length === 0 ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            ) : isError ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>No se pudieron cargar los productos.</Text>
                    <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={displayProducts}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onPressDetail={() => navigation.navigate('Detail', { productId: item.id })} />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refetch}
                            colors={['#3B82F6']} // Android
                            tintColor="#3B82F6"  // iOS
                        />
                    }
                    onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <ActivityIndicator size="small" color="#3B82F6" style={{ marginVertical: 20 }} />
                        ) : <View style={{ height: 20 }} />
                    }
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>No se encontraron productos coincidentes.</Text>
                        </View>
                    }
                />
            )}

            {/* MODAL DE ORDENAMIENTO */}
            <Modal
                visible={isSortModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsSortModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsSortModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ordenar por</Text>

                        <TouchableOpacity style={styles.sortOptionRow} onPress={() => handleSelectSort('none')}>
                            <Text style={[styles.sortOptionText, sortOption === 'none' && styles.sortOptionTextActive]}>Por Defecto</Text>
                            {sortOption === 'none' && <FontAwesome5 name="check" size={16} color="#3B82F6" />}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortOptionRow} onPress={() => handleSelectSort('price_asc')}>
                            <Text style={[styles.sortOptionText, sortOption === 'price_asc' && styles.sortOptionTextActive]}>Precio: Menor a Mayor</Text>
                            {sortOption === 'price_asc' && <FontAwesome5 name="check" size={16} color="#3B82F6" />}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortOptionRow} onPress={() => handleSelectSort('price_desc')}>
                            <Text style={[styles.sortOptionText, sortOption === 'price_desc' && styles.sortOptionTextActive]}>Precio: Mayor a Menor</Text>
                            {sortOption === 'price_desc' && <FontAwesome5 name="check" size={16} color="#3B82F6" />}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortOptionRow} onPress={() => handleSelectSort('rating')}>
                            <Text style={[styles.sortOptionText, sortOption === 'rating' && styles.sortOptionTextActive]}>Mejor Valorados</Text>
                            {sortOption === 'rating' && <FontAwesome5 name="check" size={16} color="#3B82F6" />}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortOptionRow} onPress={() => handleSelectSort('name')}>
                            <Text style={[styles.sortOptionText, sortOption === 'name' && styles.sortOptionTextActive]}>Nombre (A-Z)</Text>
                            {sortOption === 'name' && <FontAwesome5 name="check" size={16} color="#3B82F6" />}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}