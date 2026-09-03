import type { ProductType } from "@/types/product";

type ProductPaginationProps = {
	totalPages: number;
	postPerPage: number;
	startIndex: number;
	handleChangePage : (page: number) => void;
	dataProduct: ProductType[];
	currentPage: number;
}

const ProductPagination = ({currentPage, totalPages, handleChangePage, postPerPage, startIndex, dataProduct} : ProductPaginationProps) => {
	return (
		<>
			<div className="flex justify-between items-center px-4 py-3">
				<div className="text-sm text-slate-500">
					Showing <b>{startIndex + 1}-{Math.min(startIndex + postPerPage, dataProduct.length)}</b> of {totalPages * postPerPage} results
				</div>
				<div className="flex space-x-1">
					<button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
						Prev
					</button>
					{
						// Array là một đối tượng giống mảng có độ dài cố định. 
						// Nó có thể được sử dụng để tạo một mảng mới với các phần tử được khởi tạo từ một hàm. 
						// Cú pháp của Array.from() là: Array.from(arrayLike, mapFn, thisArg). 
						// Trong đó, arrayLike là đối tượng giống mảng cần chuyển đổi thành mảng, 
						// mapFn là hàm ánh xạ được áp dụng cho từng phần tử của mảng mới, 
						// và thisArg là giá trị được sử dụng làm this khi gọi mapFn.
						Array.from({length: totalPages}, (_, index) => (
							<button onClick={() => handleChangePage(index + 1)} className={`
								px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease hover:bg-slate-50 hover:border-slate-400 border border-slate-200
								${currentPage  === index + 1 ? 'bg-blue-800 text-white pointer-events-none' : 'bg-white text-slate-500'}
							`}>
								{index + 1}
							</button>
						))
					}
					<button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
						Next
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductPagination;