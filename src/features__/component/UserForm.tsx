import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { User } from "@features/types/user";
import { useUpdateUser } from "@features/hooks/useUpdateUser";
import { useCreateUser } from "@features/hooks/useCreateUser";

interface IUserForm {
	userEdited: User | null,
	setUserEdited: (userEdited: User | null) => void;
}

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

const UserForm = ({userEdited, setUserEdited} : IUserForm) => {
	const { register, handleSubmit, reset } = useForm<UserFormValues>({
		defaultValues: DEFAULT_FORM_VALUES
	});

	useEffect(() => {
		if (userEdited) {
			reset({
				name: userEdited.name,
				email: userEdited.email,
				role: userEdited.role,
				status: userEdited.status,
				avatar: userEdited.avatar
			});
		} else {
			reset(DEFAULT_FORM_VALUES);
		}
	}, [userEdited, reset]);

	const updateMutation = useUpdateUser();
	const createMutation = useCreateUser();
	return (
		<>
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
				<button type="submit">{ userEdited ? 'Update' : 'Create'}</button>
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
		</>
	)
}

export default UserForm;