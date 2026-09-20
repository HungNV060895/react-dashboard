import type { ProductType } from "@/types/product";

type ProductPaginationProps = {
	// totalPages: number;
	// postPerPage: number;
	// startIndex: number;
	handleChangePage : (page: number) => void;
	// dataProduct: ProductType[];
	currentPage: number
	postPerPage: number
}

const ProductPagination = ({currentPage, handleChangePage, postPerPage} : ProductPaginationProps) => {
	return (
		<>
			<div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-3 mt-5 gap-4 md:mt-12">
				<div className="text-sm text-slate-500">
					Showing <b>{1}-{6}</b> of 16 results
				</div>
				<div className="flex space-x-1">
					<button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50">
						Prev
					</button>
					{
						// Array là một đối tượng giống mảng có độ dài cố định. 
						// Nó có thể được sử dụng để tạo một mảng mới với các phần tử được khởi tạo từ một hàm. 
						// Cú pháp của Array.from() là: Array.from(arrayLike, mapFn, thisArg). 
						// Trong đó, arrayLike là đối tượng giống mảng cần chuyển đổi thành mảng, 
						// mapFn là hàm ánh xạ được áp dụng cho từng phần tử của mảng mới, 
						// và thisArg là giá trị được sử dụng làm this khi gọi mapFn.
						Array.from({length: postPerPage}, (_, index) => (
							<button key={index} onClick={() => handleChangePage(index + 1)} className={`
								px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease hover:bg-slate-50 hover:border-slate-400 border border-slate-200
								${currentPage  === index + 1 ? 'bg-blue-800 text-white pointer-events-none' : 'bg-white text-slate-500'}
							`}>
								{index + 1}
							</button>
						))
					}
					<button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === postPerPage} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease disabled:opacity-50">
						Next
					</button>
				</div>
			</div>
		</>
	)
}

export default ProductPagination;