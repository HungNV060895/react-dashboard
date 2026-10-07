import { updateUser } from "@/services/userApi";
import { User } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UpdateUserPayload {
    data: User,
    id: number
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({data, id}:UpdateUserPayload) => updateUser(data,id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    })
}