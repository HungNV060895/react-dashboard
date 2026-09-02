import type { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";
import SortProduct from "@/components/products/SortProduct";
import SearchProduct from "@/components/products/SearchProduct";
import FilterProduct from "@/components/products/FilterProduct";

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
		category: "Máy tính"
	})

	const [sorter, setSorter] = useState<string>("");

	const [search, setSearch] = useState<string>("");
	const [category, setCategory] = useState<string>("");


	useEffect(() => {
		localStorage.setItem('dataProducts', JSON.stringify(listProduct));
	}, [listProduct])

	const handleOpenModal = () => {
		setIsOpen(true);
		setEditProduct(null);
		setDataProduct({
			id: 0,
			name: "",
			price: "",
			category: "Máy tính"
		})
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
		const editedProduct = listProduct.find((item) => item.id === id);
		if(editedProduct){
			setDataProduct(editedProduct);
			setEditProduct({
				id: editedProduct.id,
				name: editedProduct.name,
				price: editedProduct.price,
				category: editedProduct.category as "Máy tính" | "Điện thoại"
			});
		}
		setIsOpen(true);
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
			category: "Máy tính"
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


		if(name === 'sortprice'){
			setSorter(value);
			handleSortPrice(value);
			setListProduct(handleSortPrice(value))
		}
		if(name === 'sortname'){
			setSorter(value);
			handleSortName(value);
			setListProduct(handleSortName(value))
		}

		if(name === 'categoryFilter'){
			setCategory(value);
		}
	}

	const handleSearch = (keyword: string) => {
		setSearch(keyword);
	}




	const listProductSearch = 
	listProduct.filter((item) => {
		const matchSearch = item.name.trim().toLowerCase().includes(search.trim().toLowerCase());
		const matchCategory = category.toLowerCase() === '' || item.category.toLowerCase() === category.toLowerCase();
		return matchSearch && matchCategory;
	});


	const handleSortPrice = (orderBy: string) => {
		return orderBy === 'htol' ?
			[...listProduct].sort((a : ProductType, b: ProductType) => (Number(b.price) - Number(a.price)))
			:
			[...listProduct].sort((a : ProductType, b: ProductType) => (Number(a.price) - Number(b.price)))
	}

	const handleSortName = (orderBy: string) => {
		return orderBy === 'atoz' ?
				[...listProduct].sort((a: ProductType, b: ProductType) => a.name.localeCompare(b.name))
				:
				[...listProduct].sort((a: ProductType, b: ProductType) => b.name.localeCompare(a.name))
	}


	return (
		<>
			<h1>Products</h1>
			<button onClick={() => handleOpenModal()}>Add Product</button>
			<SearchProduct search={search} handleSearch={handleSearch}/>
			<FilterProduct handleInputChange={handleInputChange} />
			<SortProduct handleInputChange={handleInputChange}/>
			<ProductList 
				handleInputChange={handleInputChange} 
				items={listProductSearch} 
				handleEditProduct={handleEditProduct} 
				handleDelete={handleDelete }
			/>
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