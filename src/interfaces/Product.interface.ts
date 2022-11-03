import type { Category } from "./type"

export interface productInterface {
    _id: string,
    image: string,
    title: string,
    description: string,
    price: number
    category: Category
    createdAt: string
}


