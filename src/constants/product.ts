import type { ProductFormState } from "@/types/product"


export const initialProduct: ProductFormState = {
    id: 0,
    productName: "",
    productPrice: 0,
    productCategory: "Máy tính"
}

export const PAGE_SIZE = 6;