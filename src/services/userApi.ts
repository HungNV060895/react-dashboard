import type { User } from "@/types/user";
import axiosClient from "@/api/axiosClient";


//get user
const getUsers = async (): Promise<User[]> => {
    const response = await axiosClient.get<User[]>("/users");

    await new Promise(resolve => setTimeout(resolve, 2000));
    return response.data;
}

const createUsers = async (dataUser: User): Promise<User[]> => {
    const response = await axiosClient.post<User[]>("/users", dataUser);
    return response.data;
}

export {getUsers, createUsers};