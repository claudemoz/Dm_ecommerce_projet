import type { Category } from './Filters.interface';

export interface productInterface {
    id: number,
    image: string,
    title: string,
    description: string,
    price: number
    category: Category
}


