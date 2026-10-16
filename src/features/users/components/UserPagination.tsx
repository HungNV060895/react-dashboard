const UserPagination = () => {
    return (
        <>
            <div className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-left">
                    Showing <span className="font-medium text-slate-700 dark:text-slate-200">{totalUsers === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, totalUsers)}</span> of {totalUsers}
                </p>
                {totalPages > 0 && <nav aria-label="User pages" className="flex items-center justify-center gap-1">
                    <button type="button" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page" className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"><ChevronLeft size={17} /></button>
                    {pages.map((page, index) => page === "ellipsis"
                        ? <span key={`ellipsis-${index}`} className="flex size-9 items-center justify-center text-sm text-slate-400" aria-hidden="true">…</span>
                        : <button key={page} type="button" onClick={() => onPageChange(page)} aria-current={currentPage === page ? "page" : undefined} aria-label={`Page ${page}`} className={`inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition ${currentPage === page ? "bg-teal-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{page}</button>
                    )}
                    <button type="button" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page" className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"><ChevronRight size={17} /></button>
                </nav>}
            </div>
        </>
    )
}

export default UserPagination;