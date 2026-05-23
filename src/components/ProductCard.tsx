import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../types/product';
import { FavoritesContext } from '../context/FavoritesContext';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 24;

interface ProductCardProps {
    product: Product;
    onPressDetail: () => void;
}

export default function ProductCard({ product, onPressDetail }: ProductCardProps) {
    const favContext = useContext(FavoritesContext);
    const isFav = favContext?.isFavorite(product.id);

    return (
        <TouchableOpacity style={styles.card} onPress={onPressDetail} activeOpacity={0.9}>
            <TouchableOpacity
                style={styles.favButton}
                onPress={() => favContext?.toggleFavorite(product)}
            >
                <FontAwesome5
                    name={isFav ? 'heart' : 'heart'}
                    solid={isFav}
                    size={16}
                    color={isFav ? '#EF4444' : '#9CA3AF'}
                />
            </TouchableOpacity>

            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.infoContainer}>
                <View style={styles.metaTopRow}>
                    <Text style={styles.categoryText}>{product.category}</Text>
                    <View style={[styles.badge, product.availabilityStatus?.toLowerCase().includes('in stock') ? styles.badgeInStock : styles.badgeLowStock]}>
                        <Text style={styles.badgeText}>{product.availabilityStatus || 'Stock'}</Text>
                    </View>
                </View>

                <Text style={styles.title} numberOfLines={1}>{product.title}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.rating}>⭐ {product.rating}</Text>
                </View>

                <Text style={styles.stockText}>Stock: {product.stock} u.</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    favButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 6,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH - 20,
        backgroundColor: '#F3F4F6',
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 6,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1d4ed8',
    },
    rating: {
        fontSize: 12,
        color: '#6B7280',
    },
    metaTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryText: {
        fontSize: 10,
        color: '#6B7280',
        textTransform: 'uppercase',
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeInStock: {
        backgroundColor: '#DEF7EC',
    },
    badgeLowStock: {
        backgroundColor: '#FDE8E8',
    },
    badgeText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#03543F',
    },
    stockText: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },
});