import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "@features/api/userApi";
import { userKeys } from "@features/queryKeys/userKeys";

interface UserParams {
    page:number;
    search:string;
    role:string;
    status:string;
}

export const useUsers = (params:UserParams) => {
    return  useQuery({
        queryKey: [userKeys.list, params],
		queryFn: () => getUsers(params.page, 10, params.search, params.role, params.status),
		staleTime: 50000, // 50s
        placeholderData: keepPreviousData
    })
}