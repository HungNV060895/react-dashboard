import type { User } from "@/types/user";
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
    const response = await axiosClient.get<User[]>('/users', {
        params: {
            page, limit, search: search || undefined,
            role: role !== 'All' ? role : undefined,
            status: status !== 'All' ? status : undefined,
        }
    });
    const responseTotal = await axiosClient.get<User[]>('/users', {
        params: {
            search: search || undefined,
            role: role !== 'All' ? role : undefined,
            status: status !== 'All' ? status : undefined,
        }
    });
    //await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        data: response.data,
        total: responseTotal.data.length
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

const deleteUser = async (userID: Number) : Promise<User> => {
    const response = await axiosClient.delete(`/users/${userID}`);
    return response.data;
}

export {getUsers, createUsers, updateUser, deleteUser};