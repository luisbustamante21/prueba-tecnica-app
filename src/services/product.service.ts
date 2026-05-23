import apiClient from '../api/apiClient';

interface GetProductsParams {
    pageParam?: number;
    search?: string;
    category?: string;
}

export const productService = {
    // Maneja listado normal, búsqueda, filtrado por categoría y paginación
    getProducts: async ({ pageParam = 0, search = '', category = '' }: GetProductsParams) => {
        const limit = 10;
        let url = `/products?limit=${limit}&skip=${pageParam}`;

        if (search) {
            url = `/products/search?q=${search}&limit=${limit}&skip=${pageParam}`;
        } else if (category) {
            url = `/products/category/${category}?limit=${limit}&skip=${pageParam}`;
        }

        const response = await apiClient.get(url);
        return response.data;
    },

    getProductById: async (id: number) => {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await apiClient.get('/products/categories');
        return response.data;
    }
};