import { useState } from "react";
import { useUsers } from "@features/hooks/useUser";

import { useDeleteUser } from "@features/hooks/useDeleteUser";
import { useDebounce } from "@features/hooks/useDebounce";

import type { User } from "@features/types/user";
import UserTable from "@features/component/UserTable";
import UserForm from "@features/component/UserForm";
import UserFilter from "@features/component/UserFilter";


const UserPage = () => {
	//State Area
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');

	const [userEdited, setUserEdited] = useState<User | null>(null);
	const debounceSearch = useDebounce(search, 500);
	const params = {
		page,
		search: debounceSearch,
		role,
		status
	}

	const { data: UserResponse, isLoading, isFetching ,error } = useUsers(params);

	const deleteMutation = useDeleteUser();
	return (
		<div>
			<UserForm
				userEdited={userEdited}
				setUserEdited={setUserEdited}
			/>
			<UserFilter
				setSearch={(value) => {
					setSearch(value);
					setPage(1);
				}}
			/>
			<UserTable 
				data={UserResponse?.data ?? []}
				isLoading={isLoading}
				isFetching={isFetching}
				error={error}
				onDelete={(id: string) => deleteMutation.mutate(id)}
				onUpdate={(user: User) => setUserEdited(user)}
			/>
			<button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Prev Page</button>
			<button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
			<button onClick={() => setSearch(params.search)}>Set Search</button>
		</div>
	);
};

export default UserPage;