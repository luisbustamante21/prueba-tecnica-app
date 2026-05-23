import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextValue, AuthUser } from '../types/auth';
import { authService } from '../services/auth.service';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const restoreSession = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('@auth_token');
            if (storedToken) {
                const userData = await authService.me();

                setUser(userData);
                setAccessToken(storedToken);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log('Token expirado o inválido. Cerrando sesión.');
            await logout();
        }
    };

    const login = async (username: string, password: string, remember: boolean) => {
        setAuthError(null);
        try {
            // 1. Llamada al servicio
            const userData = await authService.login(username, password);

            // 2. Actualización de estado
            setUser(userData);
            setAccessToken(userData.accessToken);
            setIsAuthenticated(true);

            // 3. Persistencia si el usuario lo pidió
            if (remember) {
                await AsyncStorage.setItem('@auth_token', userData.accessToken);
            }
        } catch (error: any) {
            setAuthError('Credenciales inválidas o error de servidor');
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('@auth_token');
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, isAuthenticated, authError, login, logout, restoreSession }}>
            {children}
        </AuthContext.Provider>
    );
};