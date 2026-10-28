import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers } from "@features/users/api/userApi";
import { userKeys } from "@features/users/queryKeys/userKeys";

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUsers,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
	});
};