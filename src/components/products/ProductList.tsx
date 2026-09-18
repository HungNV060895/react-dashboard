import type { ProductType } from "@/types/product";
import React from "react";
import { LuPencil, LuTrash } from "react-icons/lu";


type ProductListType = {
	data: ProductType[],
	handleEditProduct: (productID: number) => void;
	handleDelete: (productID: number) => void,
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	loading: boolean,
	isError: string
}

const ProductList = ({ data, handleEditProduct, handleDelete, loading, isError }: ProductListType) => {
	const formatMoney = (amount: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND'
		}).format(amount);
	}
	if (loading) {
        return <div className="p-6">
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>;
    }

	if(isError) return <p className="p-4 bg-red-400 text-slate-900 mt-5">{isError}</p>
	return (
		<>
			{
				data.length === 0 ? (
					<p className="p-4 bg-red-400 text-slate-900 mt-5">No products are displayed.</p>
				) : (
					<div className="user-table border border-default relative overflow-x-auto bg-neutral-primary-soft shadow-slate-200 rounded-md">
						<table className="w-full whitespace-nowrap text-sm text-left rtl:text-right text-body dark:color-black">
							<thead className="bg-slate-700 border-b">
								<tr>
									<th scope="col" className="px-6 py-3 font-medium">ID</th>
									<th scope="col" className="px-6 py-3 font-medium">Name</th>
									<th scope="col" className="px-6 py-3 font-medium">Price</th>
									<th scope="col" className="px-6 py-3 font-medium">Category</th>
									<th scope="col" className="px-6 py-3 font-medium">Action</th>
								</tr>
							</thead>
							<tbody>
								{
									data.map((item) => (
										<tr key={item.id} className="odd:bg-white even:bg-gray-200 border-b dark:border-gray-300 dark:text-slate-950 border-gray-200 hover:bg-gray-50 cursor-pointer">
											<td className="px-6 py-3">{item.id}</td>
											<td className="px-6 py-3">
												<div className="flex items-center gap-2 font-medium">
													<img src="https://placehold.net/4.png" width={30} alt="" />
													{item.productName}
												</div>
											</td>
											<td className="px-6 py-3">
												{formatMoney(Number(item.productPrice))}
											</td>
											<td className="px-6 py-3">
												{item.productCategory}
											</td>
											<td className="px-6 py-3">
												<div className="flex">
													<button className="flex items-center justify-center gap-1 mr-2 btn-primary rounded-full bg-green-500 px-3 py-2 font-semibold text-white shadow-md hover:bg-green-700 transition-all" onClick={() => handleEditProduct(item.id)}><LuPencil />Edit</button>
													<button className="flex items-center justify-center gap-1 btn-danger rounded-full bg-red-500 px-3 py-2 font-semibold text-white shadow-md hover:bg-red-700 transition-all" onClick={() => handleDelete(item.id)}><LuTrash />Delete</button>
												</div>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				)
			}
		</>
	)
}

export default ProductList;