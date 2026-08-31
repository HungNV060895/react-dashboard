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
            <table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						items.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>
									{item.name}
								</td>
								<td>
									{item.price} đ
								</td>
								<td>
									{item.category}
								</td>
								<td>
									<button onClick={() => handleEditProduct(item.id)}>Edit</button>
									<button onClick={() => handleDelete(item.id)}>Delete</button>
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