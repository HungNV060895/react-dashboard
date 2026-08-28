import type { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";

const Products = () => {
	
	const [listProduct, setListProduct] = useState<ProductType[]>(() => {
		const savedProduct = localStorage.getItem('dataProducts');
		return savedProduct ? JSON.parse(savedProduct) : [];
	});

	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	
	const [isOpen, setIsOpen] = useState(false);
	const [dataProduct, setDataProduct] = useState<ProductType>({
		id: 0,
		name: "",
		price: "",
		category: ""
	})

	useEffect(() => {
		localStorage.setItem('dataProducts', JSON.stringify(listProduct));
	}, [listProduct])

	const handleOpenModal = () => {
		setIsOpen(true);
	}
	const handleProductAdd = () => {
		//1. Khởi tại product mới = giá trị ở ô input
		const newProduct = {
			id: Date.now(),
			name: dataProduct.name,
			price: dataProduct.price,
			category: dataProduct.category
		};

		//2. Gán data product mới và data có sẵn của listProduct
		setListProduct((prev) => [...prev, newProduct]);
		setIsOpen(false);
	}

	const handleEditProduct = (id: number) => {
		setIsOpen(true);
		const editedProduct = listProduct.find((item) => item.id === id);
		if(editedProduct){
			setDataProduct(editedProduct);
			setEditProduct(editedProduct);
			
		}
	}

	const handleUpdateProduct = (idProduct: number) => {
		const dataUpdate = {
			id: idProduct,
			name: dataProduct.name,
			price: dataProduct.price,
			category: dataProduct.category
		}
		setListProduct((prev) => prev.map((item) => item.id === idProduct ? {...item, ...dataUpdate} : item))
		setIsOpen(false);
		setDataProduct({
			id: 0,
			name: "",
			price: "",
			category: ""
		})
	}

	const handleDelete = (idProduct: number) => {
		let result = confirm('có xoá không?');
		result ? 
			setListProduct((prev) => prev.filter((item) => item.id !== idProduct))
		: listProduct;
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const {name, value} = e.target;

		setDataProduct((prev) => ({
			...prev, [name] : value
		}));
	}
	return (
		<>
			<h1>Products</h1>
			<button onClick={() => handleOpenModal()}>Add Product</button>
			<ProductList items={listProduct} handleEditProduct={handleEditProduct} handleDelete={handleDelete} />
			<ProductAdd 
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				editProduct={editProduct}
				dataProduct={dataProduct}
				handleProductAdd={handleProductAdd}
				handleInputChange={handleInputChange}
				handleEditProduct={handleEditProduct}
				handleUpdateProduct={handleUpdateProduct}
			/>
		</>
	)
}

export default Products;