import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: productService.getCategories,
        staleTime: 1000 * 60 * 60,
    });
};