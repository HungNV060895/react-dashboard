import { useState } from "react";
import { useUsers } from "@features/hooks/useUser";

import { useDeleteUser } from "@features/hooks/useDeleteUser";
import { useDebounce } from "@features/hooks/useDebounce";

import type { User } from "@features/types/user";
import UserTable from "@features/component/UserTable";
import UserForm from "@features/component/UserForm";

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
			{/* Search area */}
			<div className="space-y-1.5">
				<label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Search</label>
				<input id="search" type="text" placeholder="Enter key word.." name="search" 
						onChange={(e) => setSearch(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-900/30" />
			</div>
			<UserTable 
				data={UserResponse?.data ?? []}
				isLoading={isLoading}
				isFetching={isFetching}
				error={error}
				onDelete={(id: string) => deleteMutation.mutate(id)}
				// onUpdate={(user: User, id: string) => updateMutation.mutate({ data: user, id })}
				onUpdate={(user: User) => setUserEdited(user)}
			/>
			<button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Prev Page</button>
			<button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
			<button onClick={() => setSearch(params.search)}>Set Search</button>
		</div>
	);
};

export default UserPage;