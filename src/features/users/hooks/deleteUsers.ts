
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@features/users/api/userApi";
import { userKeys } from "@features/users/queryKeys/userKeys";

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};