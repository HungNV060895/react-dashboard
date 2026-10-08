import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers } from "@/services/userApi";



export const useCreateUser = ()  => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUsers,
		onMutate: async(newUser) => {
			await queryClient.cancelQueries({
				queryKey: ['users']
			});

			const previousUsers = queryClient.getQueriesData({
				queryKey: ['users']
			})

			queryClient.setQueriesData({
				queryKey: ['users']
			},
			(oldCaching:any) => {
				return {
					...oldCaching,
					data:[
						
					]
				}
			}
		)
		},
		onError: (error, variable, data) => {
			
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey : ['users']
			})
		}
	})
}