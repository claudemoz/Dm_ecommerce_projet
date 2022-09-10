import type { productInterface } from './Product.interface';

export interface productCartInterface extends productInterface {
    quantity: number
}