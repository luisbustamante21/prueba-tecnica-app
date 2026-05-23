import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { FavoritesContext } from '../context/FavoritesContext';
import { RootStackParamList } from '../types/navigation';
import { Product } from '../types/product';
import { styles } from '../styles/favoritesStyles';

export default function FavoritesScreen() {
    const favContext = useContext(FavoritesContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Componente si no hay favoritos
    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
            <Text style={styles.emptyText}>Explora los productos y marca tus favoritos para verlos aquí.</Text>
        </View>
    );

    // Diseño de tarjeta horizontal específico para favoritos
    const renderProductItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('Detail', { productId: item.id })}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: item.thumbnail || item.images?.[0] }}
                style={styles.productImage}
            />

            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <View style={styles.ratingContainer}>
                    <FontAwesome5 name="star" solid size={12} color="#FBBF24" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>

            <View style={styles.heartContainer}>
                <FontAwesome5 name="heart" solid size={20} color="#EF4444" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {/* Header como en la imagen */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={20} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.title}>Mis favoritos</Text>
            </View>

            <FlatList
                data={favContext?.favorites || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductItem}
                contentContainerStyle={favContext?.favorites.length === 0 ? styles.emptyList : styles.listContainer}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}