import type { User } from "@/types/user";
import { Pencil, Trash2, UserRound } from "lucide-react";

type UserTableProps = {
    data: User[];
    handleEditUser: (id: string) => void;
    handleOpenDeleteModal: (user: User) => void;
    loading: boolean,
    iserror:  string
};

const UserTable = ({ data, handleEditUser, handleOpenDeleteModal , loading, iserror }: UserTableProps) => {
    if (iserror) {
        return <div role="alert" className="m-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{iserror}</div>;
    }

    if (loading) {
        return <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading users">
            <div className="size-9 animate-spin rounded-full border-[3px] border-teal-700/20 border-t-teal-700" />
        </div>;
    }

    if (data.length === 0) {
        return <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500"><UserRound size={22} /></span>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">No users found</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try changing your search or filters.</p>
        </div>;
    }

    const userActions = (user: User) => (
        <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => handleEditUser(user.id)} aria-label={`Edit ${user.name}`} title="Edit user" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
                <Pencil size={16} />
            </button>
            <button type="button" onClick={() => handleOpenDeleteModal(user)} aria-label={`Delete ${user.name}`} title="Delete user" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                <Trash2 size={16} />
            </button>
        </div>
    );

    const avatar = (user: User) => user.avatar ? (
        <img src={user.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-slate-200" />
    ) : (
        <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-800 ring-1 ring-teal-100 dark:bg-teal-900/50 dark:text-teal-200 dark:ring-teal-800">
            {user.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "U"}
        </span>
    );

    const statusBadge = (status: string) => (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
            <span className={`size-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />{status}
        </span>
    );

    return (
        <>
            <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-700">
                {data.map((user) => (
                    <article key={user.id} className="p-4 sm:p-5">
                        <div className="flex min-w-0 items-center gap-3">
                            {avatar(user)}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="break-all text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                            </div>
                            {userActions(user)}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2 pl-[52px]">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">{user.role}</span>
                            {statusBadge(user.status)}
                        </div>
                    </article>
                ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <tr>
                            <th scope="col" className="px-5 py-3.5 font-semibold">User</th>
                            <th scope="col" className="px-5 py-3.5 font-semibold">Email</th>
                            <th scope="col" className="px-5 py-3.5 font-semibold">Role</th>
                            <th scope="col" className="px-5 py-3.5 font-semibold">Status</th>
                            <th scope="col" className="px-5 py-3.5 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {data.map((user) => (
                            <tr key={user.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/70">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        {avatar(user)}
                                        <span className="max-w-48 truncate font-medium text-slate-900 dark:text-white">{user.name}</span>
                                    </div>
                                </td>
                                <td className="max-w-64 truncate px-5 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{user.role}</td>
                                <td className="px-5 py-4">{statusBadge(user.status)}</td>
                                <td className="px-5 py-4"><div className="flex justify-end">{userActions(user)}</div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
    );
};

export default UserTable;