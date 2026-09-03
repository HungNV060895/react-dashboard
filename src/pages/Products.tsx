import type { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";
import SortProduct from "@/components/products/SortProduct";
import SearchProduct from "@/components/products/SearchProduct";
import FilterProduct from "@/components/products/FilterProduct";
import ProductPagination from "@/components/products/ProductPagination";

const Products = () => {
	
	const [listProduct, setListProduct] = useState<ProductType[]>(() => {
		const savedProduct = localStorage.getItem('dataProducts');
		return savedProduct ? JSON.parse(savedProduct) : [];
	});

	const [items, setItems] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	
	const [isOpen, setIsOpen] = useState(false);

	//Note việc cần làm sau khi xong: Tạo initial state chung cho Product
	const [dataProduct, setDataProduct] = useState<ProductType>({
		id: 0,
		name: "",
		price: "",
		category: "Máy tính"
	})

	const [sorter, setSorter] = useState<string>("");

	const [search, setSearch] = useState<string>("");
	const [category, setCategory] = useState<string>("");


	const [currentPage, setCurrentPage] = useState<number>(1);

	const handleChangePage = (page: number) => {
		setCurrentPage(page)
	}


	useEffect(() => {
		localStorage.setItem('dataProducts', JSON.stringify(listProduct));
	}, [listProduct])

	useEffect(() => {
		setLoading(true);
		fetchFakeData().then((data) => {
			setItems(data)
		}).catch(() => {
			setError("Error fetching data");
		}).finally(() => {
			setLoading(false)
		})
	}, [])

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


		if(name === 'sortprice' || name === 'sortname'){
			setSorter(value);
		}

		if(name === 'categoryFilter'){
			setCategory(value);
		}
	}

	const handleSearch = (keyword: string) => {
		setSearch(keyword);
	}


	let listProductSearch = 
	listProduct.filter((item) => {
		const matchSearch = item.name.trim().toLowerCase().includes(search.trim().toLowerCase());
		const matchCategory = category.toLowerCase() === '' || item.category.toLowerCase() === category.toLowerCase();
		return matchSearch && matchCategory;
	}).sort((a: ProductType, b: ProductType) => {
		if(sorter  === 'htol') return (Number(b.price) - Number(a.price));
		if(sorter  === 'ltoh') return (Number(a.price) - Number(b.price));
		if(sorter  === 'atoz') return a.name.localeCompare(b.name);
		if(sorter  === 'ztoa') return b.name.localeCompare(a.name);
		return 0;
	})

	const postPerPage = 4;
	const startIndex = (Number(currentPage) - 1) * postPerPage;
	const endIndex = startIndex + postPerPage;
	const currentProduct = listProductSearch.slice(startIndex, endIndex);
	const totalPages = Math.ceil(listProductSearch.length / postPerPage);

	//console.log(currentProduct, totalPages, listProductSearch.length);
	const fetchFakeData = (delay = 2000) => {
		return new Promise<ProductType[]>((resolve) => {
			setTimeout (() => {
				resolve(currentProduct);
			}, delay)
		})
	}

	if(loading){
		return (
			<p className="text-lg text-blue-800 animate-pulse">Loading...</p>
		)
	}

	if(error){
		return (
			<p className="text-lg text-white bg-red-500 font-medium">Error: {error}</p>
		)
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
				items={items}
				handleEditProduct={handleEditProduct} 
				handleDelete={handleDelete }
			/>
			<ProductPagination currentPage={currentPage} dataProduct={listProductSearch} startIndex={startIndex} postPerPage={postPerPage} totalPages={totalPages} handleChangePage={handleChangePage} />
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