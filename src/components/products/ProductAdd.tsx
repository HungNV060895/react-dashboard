import type { ProductType } from "@/types/product";
import React from "react";

type ModalType = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    handleProductAdd: () => void,
    dataProduct: ProductType,
    editProduct: ProductType | null,
    handleEditProduct: (idProduct: number) => void,
    handleUpdateProduct: (idProduct: number) => void
}

const ProductAdd = ({isOpen, setIsOpen, handleInputChange, handleProductAdd, handleEditProduct, handleUpdateProduct, dataProduct, editProduct} : ModalType) => {
    return (
        <>
            <div id="userModal" className={`fixed inset-0 z-50 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
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
                        <dl>
                            <dt>Name</dt>
                            <dd><input onChange={handleInputChange} type="text" name="name" value={dataProduct.name} className="input-field" /></dd>
                        </dl>
                        <dl>
                            <dt>Price</dt>
                            <dd><input onChange={handleInputChange}  type="text" name="price" value={dataProduct.price} className="input-field" /></dd>
                        </dl>
                        <dl>
                            <dt>Category</dt>
                            <dd>
                                <select onChange={handleInputChange}  name="category" value={dataProduct.category} id="category">
                                    <option value="Máy tính">Máy tính</option>
                                    <option value="Điện thoại">Điện thoại</option>
                                </select>
                            </dd>
                        </dl>
                        <button type="submit">{editProduct ? 'Update' : 'Add'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductAdd;