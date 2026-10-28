import type { User } from "@features/users/types/user";
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
		const response = await axiosClient.get<User[]>('/users', { params });
		const filteredUsers = response.data.filter((user) =>
			(role === 'All' || user.role === role) &&
			(status === 'All' || user.status === status)
		);
		const startIndex = (page - 1) * limit;

		return {
			data: filteredUsers.slice(startIndex, startIndex + limit),
			total: filteredUsers.length
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

const updateUser = async ({ id, data }: { id: string; data: Omit<User, "id"> }): Promise<User> => {
	const response = await axiosClient.put<User>(`/users/${id}`, data);
	return response.data;
}

const deleteUser = async (userID: string) : Promise<User> => {
	const response = await axiosClient.delete(`/users/${userID}`);
	return response.data;
}

export {getUsers, createUsers, updateUser, deleteUser};