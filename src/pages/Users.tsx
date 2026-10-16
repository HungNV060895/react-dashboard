import { UserTable, UserSearch, UserFilter } from "@/features/users";
import UserPagination from "@/features/users/components/UserPagination";
import { UserPlus } from "lucide-react";
const UserPage = () => {
	return (
		<>
			<section className="space-y-5 py-5 sm:py-7">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div className="min-w-0">
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">Workspace</p>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">User management</h1>
						<p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Manage team access, roles and account status.</p>
					</div>
					<button type="button" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20">
						<UserPlus size={17} /> Add user
					</button>
				</div>
				<div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_auto] xl:items-end">
					<UserSearch />
					<UserFilter/>
				</div>
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
					<UserTable />
				</div>
				{/* <UserPagination/> */}
			</section>
			
		</>
	)
}
export default UserPage;