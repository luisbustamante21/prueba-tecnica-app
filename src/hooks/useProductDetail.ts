import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import { Product } from '../types/product';

export const useProductDetail = (id: number) => {
    return useQuery<Product, Error>({
        queryKey: ['productDetail', id],
        queryFn: () => productService.getProductById(id),
    });
};