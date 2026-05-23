import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Verificamos qué valor tiene realmente la variable en tiempo de ejecución
console.log('🔥 API_URL cargada en Axios:', process.env.EXPO_PUBLIC_API_URL);

const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar el token e imprimir los BODYS de las solicitudes (REQUEST)
apiClient.interceptors.request.use(
    async (config) => {
        console.log(`\n➡️ [REQUEST] Saliendo hacia: ${config.baseURL}${config.url}`);
        console.log(`✉️ [REQUEST HEADERS]:`, JSON.stringify(config.headers, null, 2));

        if (config.data) {
            console.log(`📦 [REQUEST BODY]:`, JSON.stringify(config.data, null, 2));
        } else {
            console.log(`📦 [REQUEST BODY]: (Vacío / GET)`);
        }

        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error al obtener el token:', error);
        }
        return config;
    },
    (error) => {
        console.error('❌ Error al armar la petición:', error);
        return Promise.reject(error);
    }
);

// Interceptor para capturar, desglosar e imprimir los BODYS de las respuestas (RESPONSE)
apiClient.interceptors.response.use(
    (response) => {
        console.log(`\n✅ [RESPONSE] Exitosa [${response.status}] de: ${response.config.url}`);

        if (response.data) {
            console.log(`📥 [RESPONSE BODY]:`, JSON.stringify(response.data, null, 2));
        }
        return response;
    },
    (error) => {
        console.log(`\n❌ [RESPONSE ERROR] Ocurrió un fallo en: ${error.config?.url}`);

        if (error.response) {
            console.error('📊 Status de Error:', error.response.status);
            console.error('📥 [RESPONSE ERROR BODY]:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('🔌 Error de Red / No hay respuesta de la API:', error.message);
        } else {
            console.error('⚙️ Error interno de Axios:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;