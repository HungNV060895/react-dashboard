import axiosClient from "@/api/axiosClient";
import { ProductType } from "@/types/product";

interface ProductRespon {
    data: ProductType
}

const getProduct = async ():Promise<ProductType[]> => {
    const response = await axiosClient.get('/products');
    return response.data;
}

const createProduct = async (dataProduct: Omit<ProductType, 'id'>): Promise<ProductType> => {
    const response = await axiosClient.post<ProductType>('/products', dataProduct);
    return response.data;
}


const updateProduct = async (updateProduct: ProductType, idProduct: number): Promise<ProductType> => {
    const response = await axiosClient.put(`/products/${idProduct}`, updateProduct);
    return response.data;
}

const deleteProduct = async (idProduct: number): Promise<ProductType> => {
    const response = await axiosClient.delete(`/products/${idProduct}`);
    return response.data;
}

export {getProduct, createProduct, updateProduct, deleteProduct};