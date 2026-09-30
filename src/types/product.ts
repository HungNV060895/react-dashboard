export interface ProductType {
    id: number,
    productName: string,
    productPrice: number,
    productCategory: string
}

export interface ProductFormState {
    id: number,
    productName: string,
    productPrice: number,
    productCategory: string
}

export type ProductError = Partial<Record<keyof ProductFormState, string>>;