import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';

type FavoritesContextType = {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Cargar favoritos guardados al iniciar
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('@favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error cargando favoritos', error);
            }
        };
        loadFavorites();
    }, []);

    // Función para agregar/quitar y guardar en AsyncStorage
    const toggleFavorite = async (product: Product) => {
        try {
            let updatedFavorites;
            const exists = favorites.some((fav) => fav.id === product.id);

            if (exists) {
                updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
            } else {
                updatedFavorites = [...favorites, product];
            }

            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error guardando favorito', error);
        }
    };

    const isFavorite = (productId: number) => {
        return favorites.some((fav) => fav.id === productId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};