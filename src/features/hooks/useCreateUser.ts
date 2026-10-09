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
				console.log(oldCaching);
				return {
					...oldCaching,
					data:[
						...oldCaching.data,
						{
							...newUser
						}
					]
				}
			});
			return {previousUsers};
		},
		onError: (error, variable, context) => {
			if(context?.previousUsers){
				context?.previousUsers.forEach(([queryKey, data]) => {
					queryClient.setQueryData(queryKey, data)
				})
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey : ['users']
			})
		}
	})
}