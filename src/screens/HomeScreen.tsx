import React, { useContext, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCategories } from '../hooks/useCategories';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import { styles } from '../styles/homeStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const CATEGORY_IMAGES: { [key: string]: any } = {
    'beauty': require('../../assets/categorias/beauty.png'),
    'fragrances': require('../../assets/categorias/fragances.jpg'),
    'furniture': require('../../assets/categorias/furniture.png'),
    'groceries': require('../../assets/categorias/groceries.png'),
    'home-decoration': require('../../assets/categorias/home-decor.png'),
    'kitchen-accessories': require('../../assets/categorias/kitchen.png'),
    'laptops': require('../../assets/categorias/laptops.jpg'),
    'mens-shirts': require('../../assets/categorias/mens-shirts.png'),
    'mens-shoes': require('../../assets/categorias/mens-shoes.png'),
    'mens-watches': require('../../assets/categorias/mens-watches.png'),
    'mobile-accessories': require('../../assets/categorias/mobile-acc.png'),
    'motorcycle': require('../../assets/categorias/motorcycle.png'),
    'skin-care': require('../../assets/categorias/skincare.jpg'),
    'smartphones': require('../../assets/categorias/celulares.webp'),
    'sports-accessories': require('../../assets/categorias/sports.png'),
    'sunglasses': require('../../assets/categorias/sunglasses.png'),
    'tablets': require('../../assets/categorias/tablets.jpg'),
    'tops': require('../../assets/categorias/tops.jpg'),
    'vehicle': require('../../assets/categorias/vehicle.png'),
    'womens-bags': require('../../assets/categorias/womens-bags.png'),
    'womens-dresses': require('../../assets/categorias/womens-dresses.png'),
    'womens-jewellery': require('../../assets/categorias/womens-jewellery.png'),
    'womens-shoes': require('../../assets/categorias/womens-shoes.png'),
    'womens-watches': require('../../assets/categorias/womens-watches.png'),
    'default': require('../../assets/categorias/default.png'),
};

export default function HomeScreen() {
    const authContext = useContext(AuthContext);
    const favContext = useContext(FavoritesContext);
    const favoriteProducts = favContext?.favorites || [];
    const navigation = useNavigation<any>();
    const { data: categories } = useCategories();

    // Estado local para conectar la barra de búsqueda directamente con el FlatList inferior
    const [homeSearchQuery, setHomeSearchQuery] = useState('');

    const handleCategoryPress = (slug: string) => {
        navigation.navigate('ExploreTab', { selectedCategory: slug });
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <ProductCard product={item} onPressDetail={() => navigation.navigate('Detail', { productId: item.id })} />
    );

    // Filtramos los productos destacados en tiempo real según lo que se escriba en el recuadro superior
    const filteredFeaturedProducts = useMemo(() => {
        if (!homeSearchQuery.trim()) return favoriteProducts;
        return favoriteProducts.filter(p =>
            p.title.toLowerCase().includes(homeSearchQuery.toLowerCase())
        );
    }, [favoriteProducts, homeSearchQuery]);

    const PromoBanner = () => (
        <View style={styles.promoCard}>
            <View style={styles.promoContentRow}>
                <View style={styles.promoTextContainer}>
                    <Text style={styles.promoSubtitle}>Hoy tenemos</Text>
                    <Text style={styles.promoTitle}>Envío gratis</Text>
                    <Text style={styles.promoPriceInfo}>en compras desde</Text>
                    <Text style={styles.promoPriceBold}>$50.000</Text>
                </View>
                <Image
                    source={require('../../assets/categorias/download.png')}
                    style={styles.promoImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );

    const CategoriesSection = () => (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categorías</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ExploreTab', { selectedCategory: '' })}>
                    <Text style={styles.seeAllText}>Ver todas</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
                {categories?.map((cat: any, index: number) => {
                    const slug = cat.slug || cat;
                    const name = cat.name || cat;
                    const imageSource = CATEGORY_IMAGES[slug] || CATEGORY_IMAGES['default'];

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryCard}
                            onPress={() => handleCategoryPress(slug)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.categoryIconBox}>
                                <Image source={imageSource} style={styles.categoryImage} resizeMode="contain" />
                            </View>
                            <Text style={styles.categoryName}>{name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header con el buscador (Sin cambios aquí adentro) */}
            <View style={styles.blueHeader}>
                <View style={styles.topRow}>
                    <TouchableOpacity>
                        <FontAwesome5 name="bars" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Renderizado condicional del Avatar */}
                        {authContext?.user?.image && (
                            <Image
                                source={{ uri: authContext.user.image }}
                                style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8, backgroundColor: '#ccc' }}
                            />
                        )}
                        <Text style={styles.greeting}>¡Hola, {authContext?.user?.firstName || 'Usuario'}! 👋</Text>
                    </View>

                    <TouchableOpacity>
                        <FontAwesome5 name="bell" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <FontAwesome5 name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar en tus productos destacados..."
                        placeholderTextColor="#9CA3AF"
                        value={homeSearchQuery}
                        onChangeText={setHomeSearchQuery}
                    />
                    {homeSearchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setHomeSearchQuery('')}>
                            <FontAwesome5 name="times-circle" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* --- NUEVO CONTENEDOR CON EL EFECTO CURVO --- */}
            <View style={styles.contentWrapper}>
                <FlatList
                    data={filteredFeaturedProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProductItem}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <PromoBanner />
                            <CategoriesSection />
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>
                                    {homeSearchQuery ? 'Resultados de la búsqueda' : 'Productos destacados'}
                                </Text>
                            </View>
                        </>
                    }
                    ListEmptyComponent={
                        <View style={{ padding: 20, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#6B7280', fontSize: 16, textAlign: 'center' }}>
                                {homeSearchQuery
                                    ? 'No se encontraron productos destacados con ese nombre.'
                                    : 'Aún no tienes productos destacados. ¡Agrega algunos a tus favoritos! 🤍'}
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}