import React, { useContext, useState } from 'react';
import {
    View, Text, Image, ScrollView, Dimensions,
    TouchableOpacity, ActivityIndicator, Share, NativeSyntheticEvent, NativeScrollEvent, Linking
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useProductDetail } from '../hooks/useProductDetail';
import { FavoritesContext } from '../context/FavoritesContext';
import { styles } from '../styles/detailStyles';
import { FontAwesome5 } from '@expo/vector-icons';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
const { width } = Dimensions.get('window');

export default function DetailScreen() {
    const route = useRoute<DetailScreenRouteProp>();
    const navigation = useNavigation();
    const { productId } = route.params;

    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // Consumimos el endpoint con React Query
    const { data: product, isLoading, isError, refetch } = useProductDetail(productId);

    // Contexto de Favoritos
    const favContext = useContext(FavoritesContext);
    const isFav = product ? favContext?.isFavorite(product.id) : false;

    // Compartir producto
    const handleShare = async () => {
        if (!product) return;
        const message = `¡Mira este increíble producto en Sipy! ${product.title} por solo $${product.price}. Descúbrelo aquí: ${product.thumbnail}`;

        try {
            const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
            const canOpen = await Linking.canOpenURL(whatsappUrl);

            if (canOpen) {
                await Linking.openURL(whatsappUrl);
            } else {
                await Share.share({ message });
            }
        } catch (error) {
            console.error('Error al compartir', error);
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveImageIndex(index);
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (isError || !product) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No se pudo cargar el producto.</Text>
                <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
                    <Text style={styles.btnText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const categoriesWithColors = [
        'smartphones', 'laptops', 'tops', 'womens-dresses',
        'womens-shoes', 'mens-shirts', 'mens-shoes', 'motorcycle'
    ];
    const showColorSelector = categoriesWithColors.includes(product.category);

    const mockColors = product.category.includes('women')
        ? ['#E0A899', '#4A494E', '#B8B7BC']
        : ['#1C1B1F', '#4A494E', '#B8B7BC'];

    const productImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            {/* Header de navegación */}
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircleBtn}>
                    <FontAwesome5 name="chevron-left" size={20} color="#1F2937" />
                </TouchableOpacity>

                <View style={styles.rightActions}>
                    <TouchableOpacity onPress={handleShare} style={styles.actionCircleBtn}>
                        <FontAwesome5 name="share-alt" size={18} color="#1F2937" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => favContext?.toggleFavorite(product)}
                        style={styles.actionCircleBtn}
                    >
                        <FontAwesome5
                            name="heart"
                            solid={isFav}
                            size={20}
                            color={isFav ? "#EF4444" : "#1F2937"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Galería con Desplazamiento Horizontal */}
            <View style={styles.galleryWrapper}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    bounces={false}
                >
                    {productImages.map((imgUri, index) => (
                        <View key={index} style={styles.imageSlideContainer}>
                            <Image source={{ uri: imgUri }} style={styles.image} />
                        </View>
                    ))}
                </ScrollView>

                {/* Dots Sincronizados Dinámicos */}
                {productImages.length > 1 && (
                    <View style={styles.dotContainer}>
                        {productImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    activeImageIndex === index && styles.dotActive
                                ]}
                            />
                        ))}
                    </View>
                )}
            </View>

            {/* Contenedor de Detalles */}
            <View style={styles.detailsContainer}>
                <View style={styles.tagBadgeRow}>
                    <Text style={styles.categoryBadgeText}>{product.category}</Text>
                    <View style={[
                        styles.statusBadge,
                        product.availabilityStatus?.toLowerCase().includes('in stock') ? styles.statusInStock : styles.statusLowStock
                    ]}>
                        <Text style={styles.statusBadgeText}>{product.availabilityStatus || 'Disponible'}</Text>
                    </View>
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.ratingText}>
                        ⭐ {product.rating}{' '}
                        <Text style={styles.reviewsCount}>
                            ({product.reviews ? product.reviews.length : 0} reseñas reales)
                        </Text>
                    </Text>
                    <Text style={styles.stockText}>Stock: {product.stock} u.</Text>
                </View>

                {showColorSelector && (
                    <>
                        <Text style={styles.sectionTitle}>Variantes disponibles</Text>
                        <View style={styles.colorRow}>
                            {mockColors.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedColor(index)}
                                    style={[
                                        styles.colorRing,
                                        selectedColor === index && styles.colorRingActive
                                    ]}
                                >
                                    <View style={[styles.colorDot, { backgroundColor: color }]} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                {/* Descripción */}
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.description}>
                    {product.description}
                </Text>

                {/* Botón Principal de Compra */}
                <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
                    <Text style={styles.addToCartBtnText}>Agregar al carrito</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}