
import { deleteUser } from "@/services/userApi";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onMutate: async(userID) => {
            await queryClient.cancelQueries({queryKey: ['users']});

            const previousUser = queryClient.getQueriesData({
                queryKey: 'users'
            })

            queryClient.setQueriesData({
                queryKey: ['users'],
            },
            
            (oldCaching: any) => {
                if(!oldCaching) return;
                return {
                    ...oldCaching,
                    data: oldCaching.data.filter((item: User) => item.id !== userID)
                }
            });

            return { previousUser };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    })
}