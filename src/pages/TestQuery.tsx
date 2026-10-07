import { useForm } from "react-hook-form";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useUsers } from "@/hooks/useUser";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useDeleteUser } from "@/hooks/useDeleteUser";

import type { User } from "@/types/user";

enum RoleEnum {
	admin = 'Admin',
	user = 'User',
	guest = 'Guest'
}

enum StatusEnum {
	active = 'Active',
	inactive = 'Inactive'
}

type UserFormValues = {
	name: string;
	email: string;
	role: User["role"];
	status: User["status"];
	avatar: string;
};

const DEFAULT_FORM_VALUES = {
    name:"",
    email:"",
    role:RoleEnum.admin,
    status:StatusEnum.active,
    avatar:""
};

const TestQuery = () => {
	//State Area
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');

	const [userEdited, setUserEdited] = useState<User | null>(null);
	const params = {
		page,
		search,
		role,
		status
	}

	const { data: UserResponse, isLoading, error } = useUsers(params);
	
	const { register, handleSubmit, reset } = useForm<UserFormValues>({
		defaultValues: DEFAULT_FORM_VALUES,
	});

	const createMutation = useCreateUser();
	const updateMutation = useUpdateUser();
	const deleteMutation = useDeleteUser();
	return (
		<div>
			<form onSubmit={handleSubmit((values) => {
					if(userEdited){
						updateMutation.mutate(
							{
								data: {
									...userEdited,
									...values
								},
								id: userEdited.id
							},
							{
								onSuccess: () => {
									setUserEdited(null);
									reset(DEFAULT_FORM_VALUES)
								}
							}
						)
					}else{
						createMutation.mutate(values, {
							onSuccess: () => {
								reset(DEFAULT_FORM_VALUES);
							}
						})
					}
				})
				} className="grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
				<button type="submit">Update</button>
				<div className="space-y-1.5">
					<label htmlFor="user-name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
					<input id="user-name" type="text" placeholder="Enter user's name" {...register("name")} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-900/30" />
				</div>
				<div className="space-y-1.5">
					<label htmlFor="user-email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
					<input id="user-email" type="email" placeholder="name@example.com" {...register("email")} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-900/30" />
				</div>
				<div className="space-y-1.5">
					<label htmlFor="user-role" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Role</label>
					<select id="user-role" {...register("role")} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:ring-teal-900/30">
						<option value="Admin">Admin</option>
						<option value="User">User</option>
						<option value="Guest">Guest</option>
					</select>
				</div>
				<div className="space-y-1.5">
					<label htmlFor="user-status" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
					<select id="user-status" {...register("status")} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:ring-teal-900/30">
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</select>
				</div>
				<div className="space-y-1.5 sm:col-span-2">
					<label htmlFor="user-avatar" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Avatar URL</label>
					<input id="user-avatar" type="url" placeholder="https://example.com/avatar.jpg" {...register("avatar")} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-900/30" />
				</div>
			</form>


			<h1>Test Query</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{UserResponse && (
				<ul>
					{UserResponse.data.map((user) => (
						<li key={user.id}>
							{user.name}

							<button className="border border-red-500 text-red-400 p-2 rounded-lg ml-5" onClick={() => deleteMutation.mutate(user.id)}>
								<Trash2 size={16} />
							</button>
							<button className="border border-yellow-500 text-yellow-400 p-2 rounded-lg ml-5" 
								onClick={() => {
									setUserEdited(user);
									reset({
										name: user.name,
										email:user.email,
										role: user.role,
										status: user.status,
										avatar: user.avatar
									})
								}}>
								<Pencil size={16} />
							</button>
						</li>
					))}
				</ul>
			)}
			<button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Prev Page</button>
			<button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
			<button onClick={() => setSearch(params.search)}>Set Search</button>
		</div>
	);
};

export default TestQuery;