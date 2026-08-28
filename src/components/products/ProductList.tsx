import type { ProductType } from "@/types/product";
import React from "react";

type ProductListType = {
	items: ProductType[],
	handleEditProduct: (productID: number) => void;
	handleDelete: (productID: number) => void,
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const ProductList = ({items, handleEditProduct, handleDelete, handleInputChange} : ProductListType) => {
    return (
        <>
			<div className="flex gap-5">
				<dl>
					<dt>Sort Product</dt>
					<dd>
						<select onChange={handleInputChange} name="sortprice" id="sortprice">
							<option value="">default</option>
							<option value="htol">Price: High to Low</option>
							<option value="ltoh">Price: Low to High</option>
						</select>
					</dd>
				</dl>
				<dl>
					<dt>Sort Product</dt>
					<dd>
						<select onChange={handleInputChange} name="sortname" id="sortname">
							<option value="">default</option>
							<option value="atoz">Name: A to Z</option>
							<option value="ztoa">Name: Z to A</option>
						</select>
					</dd>
				</dl>
			</div>
			
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