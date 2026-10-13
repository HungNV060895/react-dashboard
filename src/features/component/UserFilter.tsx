interface TSearch {
    setSearch : (value: string) => void
}

const UserFilter = ({setSearch}: TSearch) => {
    return (
        <>
            {/* Search area */}
			<div className="space-y-1.5">
				<label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Search</label>
				<input id="search" type="text" placeholder="Enter key word.." name="search" 
						onChange={(e) => setSearch(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-900/30" />
			</div>
        </>
    )
}

export default UserFilter;