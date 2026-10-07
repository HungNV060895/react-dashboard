
import { deleteUser } from "@/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    })
}