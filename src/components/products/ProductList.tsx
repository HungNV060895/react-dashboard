import type { ProductType } from "@/types/product";
import React from "react";
import { PackageOpen, Pencil, Trash2 } from "lucide-react";


type ProductListType = {
	data: ProductType[],
	handleEditProduct: (productID: number) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	handleOpenDeleteModal: (product: ProductType) => void,
	loading: boolean,
	isError: string
}

const ProductList = ({ data, handleEditProduct, handleOpenDeleteModal, loading, isError }: ProductListType) => {
	const formatMoney = (amount: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND'
		}).format(amount);
	}
	if (loading) return <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading products"><div className="size-9 animate-spin rounded-full border-[3px] border-teal-700/20 border-t-teal-700" /></div>;

	if (isError) return <div role="alert" className="m-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{isError}</div>;
	if (data.length === 0) return <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center"><span className="mb-3 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"><PackageOpen size={22} /></span><p className="text-sm font-semibold text-slate-800 dark:text-white">No products found</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try changing your search or category filter.</p></div>;

	const productActions = (product: ProductType) => (
		<div className="flex items-center gap-1.5">
			<button type="button" onClick={() => handleEditProduct(product.id)} aria-label={`Edit ${product.productName}`} title="Edit product" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-slate-400 dark:hover:bg-teal-400/10 dark:hover:text-teal-300"><Pencil size={16} /></button>
			<button type="button" onClick={() => handleOpenDeleteModal(product)} aria-label={`Delete ${product.productName}`} title="Delete product" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-slate-400 dark:hover:bg-rose-400/10 dark:hover:text-rose-300"><Trash2 size={16} /></button>
		</div>
	);

	return (
		<>
			<div className="divide-y divide-slate-100 md:hidden">
				{data.map((product) => (
					<article key={product.id} className="flex items-center gap-3 p-4 sm:p-5">
						<span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300"><PackageOpen size={20} /></span>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{product.productName}</p>
							<p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{product.productCategory}</p>
							<p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{formatMoney(Number(product.productPrice))}</p>
						</div>
						{productActions(product)}
					</article>
				))}
			</div>
			<div className="hidden overflow-x-auto md:block">
				<table className="w-full min-w-[680px] text-left text-sm">
					<thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr>
						<th scope="col" className="px-5 py-3.5 font-semibold">Product</th>
						<th scope="col" className="px-5 py-3.5 font-semibold">Category</th>
						<th scope="col" className="px-5 py-3.5 font-semibold">Price</th>
						<th scope="col" className="px-5 py-3.5 text-right font-semibold">Actions</th>
					</tr></thead>
					<tbody className="divide-y divide-slate-100 dark:divide-slate-700">{data.map((product) => (
						<tr key={product.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/70">
							<td className="px-5 py-4"><div className="flex min-w-0 items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300"><PackageOpen size={18} /></span><span className="max-w-72 truncate font-medium text-slate-900 dark:text-white">{product.productName}</span></div></td>
							<td className="px-5 py-4 text-slate-600 dark:text-slate-300">{product.productCategory}</td>
							<td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{formatMoney(Number(product.productPrice))}</td>
							<td className="px-5 py-4"><div className="flex justify-end">{productActions(product)}</div></td>
						</tr>
					))}</tbody>
				</table>
			</div>
		</>
	)
}

export default ProductList;