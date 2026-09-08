import { ProductType } from "@/types/product";
import { LuShoppingCart } from "react-icons/lu";

const CurrentProduct = ({ currentProduct }: { currentProduct: ProductType[] }) => {
	console.log(currentProduct);
	return (
		<>
			<h2 className="text-2xl text-slate-950 dark:text-white mb-5"><LuShoppingCart className="inline-block relative bottom-1" /> Current Product</h2>
			<div className="overflow-x-auto mb-12">
				<table className="min-w-full border border-gray-300 divide-y divide-gray-200 dark:text-white">
						<thead className="bg-gray-300 font-medium dark:text-black">
							<tr>
								<th className="font-medium px-4 py-2 text-left">STT</th>
								<th className="font-medium px-4 py-2 text-left">Name</th>
								<th className="font-medium px-4 py-2 text-left">Category</th>
								<th className="font-medium px-4 py-2 text-left">Price</th>
								<th className="font-medium px-4 py-2 text-left">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{
								currentProduct.map((item, index) => (
									<tr key={item.id}>
										<td className="px-4 py-2">No.{index + 1}</td>
										<td className="px-4 py-2">{item.name}</td>
										<td className="px-4 py-2">{item.category}</td>
										<td className="px-4 py-2">{item.price}</td>
										<td className="px-4 py-2"><a href="#" className="inline-block py-1 px-2 text-slate-300 bg-green-600 hover:bg-green-300 hover:text-slate-950 transition">View Detail</a></td>
									</tr>
								))
							}
						</tbody>
					</table>
			</div>
		</>
	)
}

export default CurrentProduct;