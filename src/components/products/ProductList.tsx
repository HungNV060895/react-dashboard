import type { ProductType } from "@/types/product";
import React from "react";


type ProductListType = {
	items: ProductType[],
	handleEditProduct: (productID: number) => void;
	handleDelete: (productID: number) => void,
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const ProductList = ({items, handleEditProduct, handleDelete} : ProductListType) => {
    return (
        <>
            <table className="border-1 border-collapse border-black">
				<thead>
					<tr>
						<th className="px-6 py-3 font-medium">ID</th>
						<th className="px-6 py-3 font-medium">Name</th>
						<th className="px-6 py-3 font-medium">Price</th>
						<th className="px-6 py-3 font-medium">Category</th>
						<th className="px-6 py-3 font-medium">Action</th>
					</tr>
				</thead>
				<tbody>
					{
						items.map((item) => (
							<tr key={item.id}>
								<td className="border-1 border-black px-6 py-3">{item.id}</td>
								<td className="border-1 border-black px-6 py-3">
									{item.name}
								</td>
								<td className="border-1 border-black px-6 py-3">
									{item.price} đ
								</td>
								<td className="border-1 border-black px-6 py-3">
									{item.category}
								</td>
								<td className="border-1 border-black px-6 py-3">
									<button className="bg-blue-500 text-white px-4 py-2 roundbutton2 mr-5" onClick={() => handleEditProduct(item.id)}>Edit</button>
									<button className="bg-red-500 text-white px-4 py-2 roundbutton2" onClick={() => handleDelete(item.id)}>Delete</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
        </>
    )
}

export default ProductList;