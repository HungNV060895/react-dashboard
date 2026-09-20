export interface ProductType {
    id: number,
    productName: string,
    productPrice: number,
    productCategory: string
}

export interface ProductFormState{
    id:  0,
    productName: '',
    productPrice: 0,
    productCategory: "Máy tính"
}

// export interface ProductError {
//     productName?: string,
//     productPrice?: string,
//     productCategory?: string
// }

export type ProductError = Partial<Record<keyof ProductFormState, string>>;