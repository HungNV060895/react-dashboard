type UserFilterProps = {
	role: string;
	status: string;
	setRole: (role: string) => void;
	setStatus: (status: string) => void;
}

const UserFilter = ({role, status, setRole, setStatus} : UserFilterProps) => {
	const selectClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
	return (
		<>
			<div className="w-full min-w-0">
				<label htmlFor="role" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Role</label>
				<select onChange={(selectedVal) => setRole(selectedVal.target.value)} value={role} id="role" className={selectClass}>
					<option value="All">All</option>
					<option value="Admin">Admin</option>
					<option value="User">User</option>
					<option value="Guest">Guest</option>
				</select>
			</div>
			<div className="w-full min-w-0">
				<label htmlFor="status" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Status</label>
				<select onChange={(selectedVal) => setStatus(selectedVal.target.value)} value={status} id="status" className={selectClass}>
					<option value="All">All</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>
		</>
	)
}

export default UserFilter;