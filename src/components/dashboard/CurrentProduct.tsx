import { ProductType } from "@/types/product";
import { PackageOpen } from "lucide-react";

const CurrentProduct = ({ currentProduct }: { currentProduct: ProductType[] }) => {
	return (
		<section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
			<div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700 sm:px-5">
				<h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white"><PackageOpen size={18} className="text-amber-700 dark:text-amber-300" /> Recent products</h2>
				<span className="text-xs text-slate-500 dark:text-slate-400">Last {currentProduct.length}</span>
			</div>
			{currentProduct.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No products to show.</p> : <>
				<div className="divide-y divide-slate-100 md:hidden dark:divide-slate-700">
					{currentProduct.map((item) => <div key={item.id} className="flex min-w-0 items-center justify-between gap-3 px-4 py-3.5">
						<div className="min-w-0"><p className="truncate text-sm font-medium text-slate-900 dark:text-white">{item.productName}</p><p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{item.productCategory}</p></div>
						<p className="shrink-0 text-sm font-medium text-slate-700 dark:text-slate-200">{Number(item.productPrice).toLocaleString("vi-VN")} ₫</p>
					</div>)}
				</div>
				<div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm">
					<thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th className="px-5 py-3 font-medium">Product</th><th className="px-5 py-3 font-medium">Category</th><th className="px-5 py-3 text-right font-medium">Price</th></tr></thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-700">{currentProduct.map((item) => <tr key={item.id}><td className="max-w-48 truncate px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{item.productName}</td><td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{item.productCategory}</td><td className="whitespace-nowrap px-5 py-3.5 text-right text-slate-700 dark:text-slate-200">{Number(item.productPrice).toLocaleString("vi-VN")} ₫</td></tr>)}</tbody>
				</table></div>
			</>}</section>
	)
}

export default CurrentProduct;