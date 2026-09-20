import type { ProductType, ProductError } from "@/types/product";
import React from "react";

type ModalType = {
	isOpen: boolean,
	setIsOpen: (isOpen: boolean) => void,
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
	handleProductAdd: () => void,
	dataProduct: ProductType,
	editProduct: ProductType | null,
	handleEditProduct: (idProduct: number) => void,
	handleUpdateProduct: (idProduct: number) => void,
	error: ProductError
}



const ProductAdd = ({isOpen, error, setIsOpen, handleInputChange, handleProductAdd, handleEditProduct, handleUpdateProduct, dataProduct, editProduct} : ModalType) => {
	return (
		<>
			<div className={`fixed inset-0 z-50 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
				<div onClick={() => setIsOpen(false)} id="modalOverlay" className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
				<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
					<div className="flex justify-between items-center mb-5">
						<h2 className="text-2xl font-bold text-gray-800">
							{editProduct ? 'Update' : 'Add'} Product
						</h2>
						<button onClick={() => setIsOpen(false)} id="closeModalBtn"
								className="text-gray-400 hover:text-gray-600 text-3xl leading-none focus:outline-none">
							&times;
						</button>
					</div>
					<form onSubmit={(e) => {
							e.preventDefault();
							editProduct ? handleUpdateProduct(dataProduct.id) : handleProductAdd();
						}}>
						<div className="mb-3">
							<label htmlFor="productName" className="block mb-2">Name</label>
							<input onChange={handleInputChange} type="text" placeholder="Name" id="productName" name="productName" value={dataProduct.productName} className="input-field" />
							{
								error.productName && (<span className="txt-error">{error.productName}</span>)
							}
						</div>
						<div className="mb-3">
							<label htmlFor="productPrice" className="block mb-2">Price</label>
							<input onChange={handleInputChange} type="number" placeholder="Price" id="productPrice" name="productPrice" value={dataProduct.productPrice} className="input-field" />
							{error.productPrice && (<span className="txt-error">{error.productPrice}</span>)}
						</div>
						<div className="mb-3">
							<label htmlFor="category" className="block mb-2">Category</label>
							<select onChange={handleInputChange} className="input-field" name="productCategory" value={dataProduct.productCategory || "Máy tính"} id="category">
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
						<button type="submit" className="block border border-slate-700 w-44 m-auto rounded-full bg-slate-700 px-4 py-2.5 font-medium text-white hover:bg-transparent hover:text-slate-800 transition-all">{editProduct ? 'Update' : 'Add'}</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default ProductAdd;