import { updateUser } from "@features/api/userApi";
import { User } from "@features/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UpdateUserPayload {
	data: User,
	id: number
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({data, id}:UpdateUserPayload) => updateUser(data,id),
		onMutate: async({data, id}) => {
			// 1. Dừng các request đang chạy
			await queryClient.cancelQueries({ queryKey: ['users'] })
			
			//2. Lưu cache cũ để rollback khi server bị lỗi
			const previousQuery = queryClient.getQueriesData({ queryKey: ['users'] });

			//3. Update cache ngay lập tức
			queryClient.setQueriesData({
				queryKey: ['users'],
			},
			(dataOld: any) => {
				if(!dataOld) return dataOld;
				return{
					...dataOld,
					data:
						dataOld.data.map((item: User) => item.id === id ? data : item),
					total: dataOld.total - 1
				}
			});

			return { previousQuery };
		},
		onError: (error, variables, context) => {
			context?.previousQuery.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data);
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
		}
	})
}