
import { Search } from "lucide-react";
import { useUserStore } from "@features/users/store/useUserStore";

const UserSearch = () => {
	const search = useUserStore((state) => state.search);
	const setSearch = useUserStore((state) => state.setSearch);

	return (
			<div className="w-full min-w-0">
				<label htmlFor="search-user" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Search users</label>
				<div className="relative">
					<Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						id="search-user"
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						placeholder="Name or email"
					/>
				</div>
			</div>
	)
}

export default UserSearch;
