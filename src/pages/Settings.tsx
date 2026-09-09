

const Settings = () => {
	return (
		<>
			<div className="space-y-6">
				{/* User Settings */}
				<section className="bg-white dark:bg-slate-800 p-4 rounded shadow text-white">
					<h2 className="text-lg font-semibold">Profile Settings</h2>
					{/* Form: name, email, password */}
				</section>

				{/* Admin Settings */}
				<section className="bg-white dark:bg-slate-800 p-4 rounded shadow text-white">
					<h2 className="text-lg font-semibold">User Management</h2>
					{/* Table: list of users */}
				</section>

				<section className="bg-white dark:bg-slate-800 p-4 rounded shadow text-white">
					<h2 className="text-lg font-semibold">Roles & Permissions</h2>
					{/* Table: roles with checkboxes */}
				</section>
			</div>

		</>
	)
}

export default Settings;