import axiosClient from "@/api/axiosClient";
import { ProductType } from "@/types/product";

interface ProductRespon {
    data: ProductType[],
    total: number
}

const getProduct = async (page: number, limit: number, productName: string, productCategory: string):Promise<ProductRespon> => {
    const response = await axiosClient.get<ProductType[]>('/products', {
        params: {page, limit, productName, productCategory}
    });

    const responseAll = await axiosClient.get<ProductType[]>('/products', {
        params: {productName, productCategory}
    });
    return {
        data: response.data,
        total: responseAll.data.length
    };
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