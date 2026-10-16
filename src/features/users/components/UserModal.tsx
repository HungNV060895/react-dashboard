import { User, FormState, FormError } from "@/types/user";
import { Save, UserRound, X } from "lucide-react";
import { useEffect } from "react";

type ModalTypes = {
	isOpen: boolean;
	setIsOpen : (isOpen: boolean) => void;
	handleAddUser: () => void;
	handleUpdateUser: (userId: string) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	error: FormError 
}


type AddUser = {
	editUser: User | null,
	formData: FormState
}

type UserAddProps = ModalTypes & AddUser;

const UserAdd = (
	{	isOpen,
		setIsOpen,
		handleAddUser,
		handleChange,
		handleUpdateUser,
		formData,
		editUser,
		error
	} : UserAddProps
) => {
	const closeModal = () => setIsOpen(false);
	const inputClass = "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";
	const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, setIsOpen]);

	if (!isOpen) return null;

	return (
			<div id="userModal" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
				<button type="button" onClick={closeModal} aria-label="Close user form" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
				<section role="dialog" aria-modal="true" aria-labelledby="user-modal-title" className="relative z-10 max-h-[min(92dvh,760px)] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:mx-4 sm:max-w-lg sm:rounded-xl">
					<div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
						<div className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-800"><UserRound size={19} /></span>
							<div>
								<h2 id="user-modal-title" className="text-lg font-semibold text-slate-900">{editUser ? 'Edit user' : 'Add user'}</h2>
								<p className="mt-0.5 text-sm text-slate-500">{editUser ? 'Update user details and access.' : 'Create a new workspace member.'}</p>
							</div>
						</div>
						<button type="button" onClick={closeModal} aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"><X size={18} /></button>
					</div>
					<form onSubmit={(e) => {
							e.preventDefault();
							editUser ? handleUpdateUser(formData.id) : handleAddUser();
						}
					} className="space-y-4 px-5 py-5 sm:px-7">
						<div>
							<label htmlFor="user-name" className={labelClass}>Name <span className="text-rose-600">*</span></label>
							<input id="user-name" type="text" name="name" autoComplete="name" onChange={handleChange} value={formData.name} className={inputClass} placeholder="Full name" aria-invalid={Boolean(error.name)} />
							{error.name && <p role="alert" className="mt-1.5 text-xs text-rose-600">{error.name}</p>}
						</div>
						<div>
							<label htmlFor="user-email" className={labelClass}>Email <span className="text-rose-600">*</span></label>
							<input id="user-email" type="email" name="email" autoComplete="email" onChange={handleChange} value={formData.email} className={inputClass} placeholder="name@company.com" aria-invalid={Boolean(error.email)} />
							{error.email && <p role="alert" className="mt-1.5 text-xs text-rose-600">{error.email}</p>}
						</div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label htmlFor="user-role" className={labelClass}>Role</label>
								<select name="role" onChange={handleChange} value={formData.role} id="user-role" className={inputClass}>
									<option value="Admin">Admin</option>
									<option value="User">User</option>
									<option value="Guest">Guest</option>
								</select>
							</div>
							<div>
								<label htmlFor="user-status" className={labelClass}>Status</label>
								<select onChange={handleChange} value={formData.status} name="status" id="user-status" className={inputClass}>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
						<div>
							<label htmlFor="user-avatar" className={labelClass}>Avatar URL</label>
							<input id="user-avatar" type="url" name="avatar" onChange={handleChange} value={formData.avatar} className={inputClass} placeholder="https://example.com/avatar.jpg" />
						</div>
						<div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
							<button type="button" onClick={closeModal} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cancel</button>
							<button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"><Save size={16} />{editUser ? 'Save changes' : 'Create user'}</button>
						</div>
					</form>
				</section>
			</div>
	)
}

export default UserAdd;