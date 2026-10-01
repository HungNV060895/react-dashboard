import type { ProductType, ProductError } from "@/types/product";
import React from "react";
import { PackagePlus, Save, X } from "lucide-react";
import { useEffect } from "react";

type ModalType = {
	isOpen: boolean,
	setIsOpen: (isOpen: boolean) => void,
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	handleProductAdd: () => void,
	dataProduct: ProductType,
	editProduct: ProductType | null,
	handleUpdateProduct: (idProduct: number) => void,
	error: ProductError
}



const ProductAdd = ({isOpen, error, setIsOpen, handleInputChange, handleProductAdd, handleUpdateProduct, dataProduct, editProduct} : ModalType) => {
	const inputClass = "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";
	const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, setIsOpen]);

	if (!isOpen) return null;

	return (
			<div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
				<button type="button" onClick={() => setIsOpen(false)} aria-label="Close product form" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
				<section role="dialog" aria-modal="true" aria-labelledby="product-modal-title" className="relative z-10 max-h-[min(92dvh,760px)] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:mx-4 sm:max-w-lg sm:rounded-xl">
					<div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
						<div className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-800"><PackagePlus size={19} /></span>
							<div>
								<h2 id="product-modal-title" className="text-lg font-semibold text-slate-900">{editProduct ? 'Edit product' : 'Add product'}</h2>
								<p className="mt-0.5 text-sm text-slate-500">{editProduct ? 'Update product details.' : 'Add an item to your catalog.'}</p>
							</div>
						</div>
						<button type="button" onClick={() => setIsOpen(false)} aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"><X size={18} /></button>
					</div>
					<form onSubmit={(e) => {
							e.preventDefault();
							editProduct ? handleUpdateProduct(dataProduct.id) : handleProductAdd();
						}} className="space-y-4 px-5 py-5 sm:px-7">
						<div>
							<label htmlFor="productName" className={labelClass}>Product name <span className="text-rose-600">*</span></label>
							<input onChange={handleInputChange} type="text" placeholder="Product name" id="productName" name="productName" value={dataProduct.productName} className={inputClass} aria-invalid={Boolean(error.productName)} />
							{
								error.productName && (<p role="alert" className="mt-1.5 text-xs text-rose-600">{error.productName}</p>)
							}
						</div>
						<div>
							<label htmlFor="productPrice" className={labelClass}>Price (VND) <span className="text-rose-600">*</span></label>
							<input onChange={handleInputChange} type="number" min="0" step="1000" placeholder="0" id="productPrice" name="productPrice" value={dataProduct.productPrice} className={inputClass} aria-invalid={Boolean(error.productPrice)} />
							{error.productPrice && (<p role="alert" className="mt-1.5 text-xs text-rose-600">{error.productPrice}</p>)}
						</div>
						<div>
							<label htmlFor="category" className={labelClass}>Category</label>
							<select onChange={handleInputChange} className={inputClass} name="productCategory" value={dataProduct.productCategory || "Máy tính"} id="category">
									<option value="Máy tính">Máy tính</option>
									<option value="Điện thoại">Điện thoại</option>
									<option value="Đồ gia dụng">Đồ gia dụng</option>
									<option value="Thiết bị thông minh">Thiết bị thông minh</option>
									<option value="Thời trang nam">Thời trang nam</option>
									<option value="Đồng hồ">Đồng hồ</option>
									<option value="Thời trang nữ">Thời trang nữ</option>
									<option value="Sắc đẹp">Sắc đẹp</option>
									<option value="Giày dép nữ">Giày dép nữ</option>
									<option value="Sách vở">Sách vở</option>
								</select>
						</div>
						<div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
							<button type="button" onClick={() => setIsOpen(false)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">Cancel</button>
							<button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"><Save size={16} />{editProduct ? 'Save changes' : 'Create product'}</button>
						</div>
					</form>
				</section>
			</div>
	)
}

export default ProductAdd;