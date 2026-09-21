import { ProductType } from "@/types/product";
import { LuShoppingCart } from "react-icons/lu";

const CurrentProduct = ({ currentProduct }: { currentProduct: ProductType[] }) => {
	return (
		<>
		<div>
			<h2 className="text-2xl text-slate-950 dark:text-white mb-5"><LuShoppingCart className="inline-block relative bottom-1" /> Recent Products</h2>
				<div className="overflow-x-auto mb-12 rounded-xl border border-[#1F2937]">
					<table className="min-w-full dark:text-white">
							<tbody className="divide-y divide-[#1F2937]">
								{
									currentProduct.map((item) => (
										<tr key={item.id}>
											<td className="px-4 py-2">
												{item.productName}
												<span className="block text-sm text-[#94A3B8] font-thin">{item.productCategory}</span>
											</td>
											<td className="px-4 py-2 whitespace-nowrap">{item.productPrice.toLocaleString('vn-VN')} đ</td>
											<td className="px-4 py-2">
												<span className="bg-[#10b9814d] px-3 py-1 rounded-md text-sm">Active</span>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
				</div>
		</div>
			
		</>
	)
}

export default CurrentProduct;