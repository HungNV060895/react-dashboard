import { UserTable, UserSearch, UserFilter, UserForm, useDebounce,
		useUsers, useDeleteUser, UserPagination, ModalConfirm } from "@/features/users";
import { useUserStore } from "@features/users/store/useUserStore";
import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const pageSize = 6;

const UserPage = () => {
	const page = useUserStore((state) => state.page);
	const search = useUserStore((state) => state.search);
	const role = useUserStore((state) => state.role);
	const status = useUserStore((state) => state.status);
	const userToDelete = useUserStore((state) => state.userToDelete);
	const setPage = useUserStore((state) => state.setPage);
	const openForm = useUserStore((state) => state.openForm);
	const requestDelete = useUserStore((state) => state.requestDelete);
	const cancelDelete = useUserStore((state) => state.cancelDelete);

	const debounceSearch = useDebounce(search, 500);
	const params = {
		page,
		pageSize,
		search: debounceSearch,
		role,
		status
	}

	const { data: UserResponse, isLoading, error, isPlaceholderData } = useUsers(params);
	const totalUsers = UserResponse?.total ?? 0;
	const totalPages = Math.ceil(totalUsers / pageSize);

	useEffect(() => {
		if (!isPlaceholderData && UserResponse && page > Math.max(totalPages, 1)) {
			setPage(Math.max(totalPages, 1));
		}
	}, [isPlaceholderData, page, setPage, totalPages, UserResponse]);

	const deleteMutation = useDeleteUser();

	const handleConfirmDelete = async () => {
		if (!userToDelete) return;

		try {
			await deleteMutation.mutateAsync(userToDelete.id);
			if (UserResponse?.data.length === 1 && page > 1) {
				setPage(page - 1);
			}
			toast.success("Delete user success!");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Delete user unsuccess!");
		} finally {
			cancelDelete();
		}
	}

	return (
		<>
			<Toaster />
			<ModalConfirm
				onConfirm={handleConfirmDelete}
				isDeleting={deleteMutation.isPending}
			/>
			<section className="space-y-5 py-5 sm:py-7">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div className="min-w-0">
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">Workspace</p>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">User management</h1>
						<p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Manage team access, roles and account status.</p>
					</div>
					<button onClick={() => openForm()} type="button" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20">
						<UserPlus size={17} /> Add user
					</button>
				</div>
				<div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_auto] xl:items-end">
					<UserSearch />
					<UserFilter />
				</div>
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
					<UserTable 
						users={UserResponse?.data ?? []}
						isLoading={isLoading}
						error={error}
						onEdit={openForm}
						onRequestDelete={requestDelete}
					/>
				</div>
				<UserPagination
					pageSize={pageSize}
					totalPages={totalPages}
					totalUsers={totalUsers}
					isLoading={isLoading}
				/>
				<UserForm />
			</section>
		</>
	)
}
export default UserPage;