import { useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { ProductsResponse } from '../types/product';

export const useProducts = (search: string = '', category: string = '') => {
    return useInfiniteQuery<ProductsResponse, Error>({
        queryKey: ['products', search, category],
        queryFn: ({ pageParam = 0 }) =>
            productService.getProducts({ pageParam: pageParam as number, search, category }),
        initialPageParam: 0,
        // Lógica para calcular si hay más páginas que cargar
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },
    });
};