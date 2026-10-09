import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "@/services/userApi";

interface UserParams {
    page:number;
    search:string;
    role:string;
    status:string;
}

export const useUsers = (params:UserParams) => {
    return useQuery({
        queryKey: ['users', params],
		queryFn: () => getUsers(params.page, 10, params.search, params.role, params.status),
		staleTime: 50000, // 50s
        placeholderData: keepPreviousData
    })
}