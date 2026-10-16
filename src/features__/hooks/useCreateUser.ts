import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers } from "@/services/userApi";
import { userKeys } from "@features/queryKeys/userKeys";


export const useCreateUser = ()  => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUsers,
		onMutate: async(newUser) => {
			await queryClient.cancelQueries({
				queryKey: userKeys.lists()
			});

			const previousUsers = queryClient.getQueriesData({
				queryKey: userKeys.lists()
			})

			queryClient.setQueriesData({
				queryKey: userKeys.lists()
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