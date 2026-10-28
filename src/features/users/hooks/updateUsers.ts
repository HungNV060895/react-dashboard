import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@features/users/api/userApi";
import { userKeys } from "@features/users/queryKeys/userKeys";

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
	});
};