import { User } from "@/types/user";
import { UsersRound } from "lucide-react";

const CurrentUser = ({ currentUsers }: { currentUsers: User[] }) => {
	return (
		<section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
			<div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700 sm:px-5">
				<h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white"><UsersRound size={18} className="text-teal-700 dark:text-teal-300" /> Recent users</h2>
				<span className="text-xs text-slate-500 dark:text-slate-400">Last {currentUsers.length}</span>
			</div>
			{currentUsers.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No users to show.</p> : <>
				<div className="divide-y divide-slate-100 md:hidden dark:divide-slate-700">
					{currentUsers.map((user) => <div key={user.id} className="flex min-w-0 items-center gap-3 px-4 py-3.5">
						{user.avatar ? <img src={user.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" /> : <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800 dark:bg-teal-900/50 dark:text-teal-200">{user.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>}
						<div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-900 dark:text-white">{user.name}</p><p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p></div>
						<span className="hidden rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:inline-flex">{user.role}</span>
					</div>)}
				</div>
				<div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[480px] text-left text-sm">
					<thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-5 py-3 font-medium">User</th><th className="px-5 py-3 font-medium">Role</th><th className="px-5 py-3 font-medium">Status</th></tr></thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-700">{currentUsers.map((user) => <tr key={user.id}>
						<td className="px-5 py-3"><div className="flex min-w-0 items-center gap-3">{user.avatar ? <img src={user.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" /> : <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800 dark:bg-teal-900/50 dark:text-teal-200">{user.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>}<div className="min-w-0"><p className="truncate font-medium text-slate-800 dark:text-slate-200">{user.name}</p><p className="max-w-52 truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p></div></div></td>
						<td className="px-5 py-3 text-slate-600 dark:text-slate-300">{user.role}</td>
						<td className="px-5 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${user.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{user.status}</span></td>
					</tr>)}</tbody>
				</table></div>
			</>
			}</section>
	)
}

export default CurrentUser;