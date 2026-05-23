import apiClient from '../api/apiClient';
import { AuthUser } from '../types/auth';

export const authService = {
    login: async (username: string, password: string): Promise<AuthUser> => {

        // VALIDACIÓN PREVIA (Punto 6.2 del PDF)
        if (username !== 'user001' || password !== 'user001pass') {
            throw new Error('Credenciales inválidas');
        }

        const response = await apiClient.post('/auth/login', {
            username: 'emilys',
            password: 'emilyspass',
            expiresInMins: 30,
        });

        return response.data;
    },

    me: async (): Promise<AuthUser> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};