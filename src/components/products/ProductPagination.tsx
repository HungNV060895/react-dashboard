import type { ProductType } from "@/types/product";

type ProductPaginationProps = {
	handleChangePage : (page: number) => void;
	// dataProduct: ProductType[];
	currentPage: number;
	totalPage: number;
	totalProduct: number;
	page_size: number
}

const ProductPagination = ({currentPage, handleChangePage, totalPage, totalProduct, page_size} : ProductPaginationProps) => {
	return (
		<>
			<div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-3 mt-5 gap-4 md:mt-12">
				<div className="text-sm text-slate-400">
					Showing <b>{page_size * (currentPage - 1)}-{Math.min((page_size * currentPage), totalProduct)}</b> of {totalProduct} results
				</div>
				<div className="flex space-x-1">
					<button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50">
						Prev
					</button>
					{
						Array.from({length: totalPage}, (_, index) => (
							<button 
                                key={index} 
                                onClick={() => handleChangePage(index + 1)}
                                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease ${
                                    currentPage === index + 1 
                                        ? 'bg-blue-500 text-white border border-blue-500' 
                                        : 'text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400'
                                }`}
                            >
                                {index + 1}
                            </button>
						))
					}
					<button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPage} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50">
						Next
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductPagination;