import { userSchema, type UserFormValues } from "@features/users/schemas/user.schema";
import { useCreateUser } from "@features/users/hooks/useCreateUser";
import { useUpdateUser } from "@features/users/hooks/updateUsers";
import { useUserStore } from "@features/users/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, UserRound, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const UserForm = () => {
	const isOpen = useUserStore((state) => state.isFormOpen);
	const user = useUserStore((state) => state.userToEdit);
	const closeForm = useUserStore((state) => state.closeForm);
	const inputClass = "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";
	const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
	const createMutation = useCreateUser();
	const updateMutation = useUpdateUser();
	const isSubmitting = createMutation.isPending || updateMutation.isPending;
	const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "Admin",
			status: "Active",
			avatar: "",
		},
	});

	useEffect(() => {
		if (!isOpen) return;
		reset({
			name: user?.name ?? "",
			email: user?.email ?? "",
			role: user?.role ?? "Admin",
			status: user?.status ?? "Active",
			avatar: user?.avatar ?? "",
		});
	}, [isOpen, reset, user]);

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && !isSubmitting) closeForm();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, isSubmitting, closeForm]);

	const onSubmit = async (values: UserFormValues) => {
		const { avatar, ...userData } = values;
		const payload = { ...userData, avatar };

		try {
			if (user) {
				await updateMutation.mutateAsync({ id: user.id, data: payload });
				toast.success("User updated successfully!");
			} else {
				await createMutation.mutateAsync(payload);
				toast.success("User created successfully!");
			}
			closeForm();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Unable to save user.");
		}
	};

	if (!isOpen) return null;

	return (
			<div id="userModal" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
				<button type="button" onClick={closeForm} aria-label="Close user form" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
				<section role="dialog" aria-modal="true" aria-labelledby="user-modal-title" className="relative z-10 max-h-[min(92dvh,760px)] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:mx-4 sm:max-w-lg sm:rounded-xl">
					<div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
						<div className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800"><UserRound size={19} /></span>
							<div>
								<h2 id="user-modal-title" className="text-lg font-semibold text-slate-900">{user ? "Edit user" : "Add user"}</h2>
								<p className="mt-0.5 text-sm text-slate-500">{user ? "Update user details and access." : "Create a new workspace member."}</p>
							</div>
						</div>
						<button type="button" onClick={closeForm} disabled={isSubmitting} aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:opacity-50"><X size={18} /></button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5 py-5 sm:px-7">
						<div>
							<label htmlFor="user-name" className={labelClass}>Name <span className="text-rose-600">*</span></label>
							<input id="user-name" autoComplete="name" {...register("name")} className={inputClass} placeholder="Full name" aria-invalid={Boolean(errors.name)} />
							{errors.name && <p className="mt-1 text-sm text-rose-700">{errors.name.message}</p>}
						</div>
						<div>
							<label htmlFor="user-email" className={labelClass}>Email <span className="text-rose-600">*</span></label>
							<input id="user-email" type="email" autoComplete="email" {...register("email")} className={inputClass} placeholder="name@company.com" aria-invalid={Boolean(errors.email)} />
							{errors.email && <p className="mt-1 text-sm text-rose-700">{errors.email.message}</p>}
						</div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label htmlFor="user-role" className={labelClass}>Role</label>
								<select id="user-role" {...register("role")} className={inputClass}>
									<option value="Admin">Admin</option>
									<option value="User">User</option>
									<option value="Guest">Guest</option>
								</select>
							</div>
							<div>
								<label htmlFor="user-status" className={labelClass}>Status</label>
								<select id="user-status" {...register("status")} className={inputClass}>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<div>
							<label htmlFor="user-avatar" className={labelClass}>Avatar URL</label>
							<input id="user-avatar" type="url" {...register("avatar")} className={inputClass} placeholder="https://example.com/avatar.jpg" aria-invalid={Boolean(errors.avatar)} />
							{errors.avatar && <p className="mt-1 text-sm text-rose-700">{errors.avatar.message}</p>}
						</div>
						<div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
							<button type="button" onClick={closeForm} disabled={isSubmitting} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">Cancel</button>
							<button type="submit" disabled={isSubmitting} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"><Save size={16} />{isSubmitting ? "Saving..." : user ? "Save changes" : "Create user"}</button>
						</div>
					</form>
				</section>
			</div>
	)
}

export default UserForm;