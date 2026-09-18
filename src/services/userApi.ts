import type { User } from "@/types/user";
import axios from "axios";
import axiosClient from "@/api/axiosClient";

interface UsersResponse {
    data: User[],
    total: number
}



//get user
const getUsers = async (
    page: number, 
    limit: number,
    search: string,
    role: string,
    status: string
): Promise<UsersResponse> => {
    const params = {
        search: search || undefined,
        role: role !== 'All' ? role : undefined,
        status: status !== 'All' ? status : undefined,
    };

    try {
        const response = await axiosClient.get<User[]>('/users', {
            params: { page, limit, ...params }
        });
        
        const responseTotal = await axiosClient.get<User[]>('/users', { params });
        const filteredData = status === 'All'
            ? response.data
            : response.data.filter((user) => user.status === status);
        const filteredTotal = status === 'All'
            ? responseTotal.data
            : responseTotal.data.filter((user) => user.status === status);

        return {
            data: filteredData,
            total: filteredTotal.length
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { data: [], total: 0 };
        }

        throw error;
    }
}

const createUsers = async (dataUser: Omit<User, 'id'>): Promise<User> => {
    const response = await axiosClient.post<User>("/users", dataUser);
    return response.data;
}

const updateUser = async(updateUser: User, userID: number): Promise<User> => {
    const response = await axiosClient.put(`/users/${userID}`, updateUser);
    return response.data;
}

const deleteUser = async (userID: number) : Promise<User> => {
    const response = await axiosClient.delete(`/users/${userID}`);
    return response.data;
}

export {getUsers, createUsers, updateUser, deleteUser};