import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers } from "@/services/userApi";



export const useCreateUser = ()  => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : ['users']
            })
        }
    })
}