import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductPaginationProps = {
	handleChangePage : (page: number) => void;
	// dataProduct: ProductType[];
	currentPage: number;
	totalPage: number;
	totalProduct: number;
	page_size: number
}

const ProductPagination = ({currentPage, handleChangePage, totalPage, totalProduct, page_size} : ProductPaginationProps) => {
	const pages: (number | "ellipsis")[] = totalPage <= 5
		? Array.from({ length: totalPage }, (_, index) => index + 1)
		: currentPage <= 3
			? [1, 2, 3, 4, "ellipsis", totalPage]
			: currentPage >= totalPage - 2
				? [1, "ellipsis", totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
				: [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPage];
	const start = totalProduct === 0 ? 0 : page_size * (currentPage - 1) + 1;
	const end = Math.min(page_size * currentPage, totalProduct);

	return (
		<div className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between">
			<p className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-left">Showing <span className="font-medium text-slate-700 dark:text-slate-200">{start}-{end}</span> of {totalProduct}</p>
			{totalPage > 0 && <nav aria-label="Product pages" className="flex items-center justify-center gap-1">
				<button type="button" onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page" className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"><ChevronLeft size={17} /></button>
				{pages.map((page, index) => page === "ellipsis"
					? <span key={`ellipsis-${index}`} className="flex size-9 items-center justify-center text-sm text-slate-400" aria-hidden="true">…</span>
					: <button key={page} type="button" onClick={() => handleChangePage(page)} aria-current={currentPage === page ? "page" : undefined} aria-label={`Page ${page}`} className={`inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition ${currentPage === page ? "bg-teal-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{page}</button>
				)}
				<button type="button" onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage >= totalPage} aria-label="Next page" className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"><ChevronRight size={17} /></button>
			</nav>}
		</div>
	)
}

export default ProductPagination;