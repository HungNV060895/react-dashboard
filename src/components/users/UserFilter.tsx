type UserFilterProps = {
	role: string;
	status: string;
	setRole: (role: string) => void;
	setStatus: (status: string) => void;
}

const UserFilter = ({role, status, setRole, setStatus} : UserFilterProps) => {
	return (
		<>
			<div className="role max-w-50">
				<select onChange={(selectedVal) => setRole(selectedVal.target.value)} value={role} id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="All">All</option>
					<option value="Admin">Admin</option>
					<option value="User">User</option>
					<option value="Guest">Guest</option>
				</select>
			</div>
			<div className="status min-w-[150px]">
				<select onChange={(selectedVal) => setStatus(selectedVal.target.value)} value={status} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="All">All</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>
		</>
	)
}

export default UserFilter;