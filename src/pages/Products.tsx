import type { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";
import SortProduct from "@/components/products/SortProduct";
import SearchProduct from "@/components/products/SearchProduct";
import FilterProduct from "@/components/products/FilterProduct";
import ProductPagination from "@/components/products/ProductPagination";
import { initialProduct } from "@/constants/product";
import { LuPlus } from "react-icons/lu";
import { getProduct, createProduct, updateProduct, deleteProduct } from "@/services/productApi";

const Products = () => {

	//State Product
	const [listProduct, setListProduct] = useState<ProductType[]>([]);
	const [items, setItems] = useState<ProductType[]>([]);
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	//Loading, Error
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isError, setIsError] = useState<string>('');

	//Modal
	const [isOpen, setIsOpen] = useState(false);

	//Search - Filter - Sort
	const [sorter, setSorter] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [category, setCategory] = useState<string>("");


	//Pagination
	const [currentPage, setCurrentPage] = useState<number>(1);


	//Data Initial
	const [dataProduct, setDataProduct] = useState<ProductType>(initialProduct)

	const fetchAllProduct = async () => {
		setLoading(true);
		setError("");
		try{
			const res = await getProduct();
			setListProduct(res);
		}catch (error){
			setIsError("Unable to load products.")
		}finally{
			setLoading(false);
		}
	}

	

	useEffect(() => {
		fetchAllProduct();
	}, [])


	const handleChangePage = (page: number) => {
		setCurrentPage(page)
	}

	const handleOpenModal = () => {
		setIsOpen(true);
		setEditProduct(null);
		setDataProduct(initialProduct);
	}
	const handleProductAdd = async() => {
		const newProduct: Omit<ProductType, 'id'> = {
			productName: dataProduct.productName,
			productPrice: dataProduct.productPrice,
			productCategory: dataProduct.productCategory
		};
		await createProduct(newProduct);
		await fetchAllProduct();
		setIsOpen(false);
	}

	const handleEditProduct = (id: number) => {
		const editedProduct = listProduct.find((item) => item.id === id);
		if(editedProduct){
			setDataProduct(editedProduct);
			setEditProduct({
				id: editedProduct.id,
				productName: editedProduct.productName,
				productPrice: editedProduct.productPrice,
				productCategory: editedProduct.productCategory as "Máy tính" | "Điện thoại"
			});
		}
		setIsOpen(true);
	}

	const handleUpdateProduct = (idProduct: number) => {
		const dataUpdate = {
			id: idProduct,
			productName: dataProduct.productName,
			productPrice: dataProduct.productPrice,
			productCategory: dataProduct.productCategory
		}
		setListProduct((prev) => prev.map((item) => item.id === idProduct ? {...item, ...dataUpdate} : item))
		setIsOpen(false);
		setDataProduct(initialProduct)
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


	// let listProductSearch = 
	// listProduct.filter((item) => {
	// 	const matchSearch = item.name.trim().toLowerCase().includes(search.trim().toLowerCase());
	// 	const matchCategory = category.toLowerCase() === '' || item.category.toLowerCase() === category.toLowerCase();
	// 	return matchSearch && matchCategory;
	// }).sort((a: ProductType, b: ProductType) => {
	// 	if(sorter  === 'htol') return (Number(b.price) - Number(a.price));
	// 	if(sorter  === 'ltoh') return (Number(a.price) - Number(b.price));
	// 	if(sorter  === 'atoz') return a.name.localeCompare(b.name);
	// 	if(sorter  === 'ztoa') return b.name.localeCompare(a.name);
	// 	return 0;
	// })

	// const postPerPage = 4;
	// const startIndex = (Number(currentPage) - 1) * postPerPage;
	// const endIndex = startIndex + postPerPage;
	// const currentProduct = listProductSearch.slice(startIndex, endIndex);
	// const totalPages = Math.ceil(listProductSearch.length / postPerPage);

	//console.log(currentProduct, totalPages, listProductSearch.length);
	// const fetchFakeData = (delay = 2000) => {
	// 	return new Promise<ProductType[]>((resolve) => {
	// 		setTimeout (() => {
	// 			resolve(currentProduct);
	// 		}, delay)
	// 	})
	// }
	//console.log(currentProduct);

	// if(loading){
	// 	return (
	// 		<p className="text-lg text-blue-800 animate-pulse">Loading...</p>
	// 	)
	// }

	// if(error){
	// 	return (
	// 		<p className="text-lg text-white bg-red-500 font-medium">Error: {error}</p>
	// 	)
	// }
	
	return (
		<>
		<section className="sec-product dark:text-white">
			<div className="heading-page p-6 md:p-12">
				<h1 className="user-ttl text-3xl md:text-4xl font-bold mb-4">Products Management</h1>
				<p className="txt-intro text-sm md:text-md mb-5">Manage all product in one place. Control access, assign roles, and monitor activity across your platform.</p>
				<div className="product-control flex flex-col md:flex-wrap md:flex-row items-end justify-between gap-4 w-full mb-12">
					<SearchProduct search={search} handleSearch={handleSearch}/>
					<FilterProduct handleInputChange={handleInputChange} />
					<SortProduct handleInputChange={handleInputChange}/>
					<button onClick={() => handleOpenModal()} className="min-w-32 p-2 bg-[#2563EB] rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-400 transition-all">
						<LuPlus />
						Add Product
					</button>
				</div>
			</div>
			<div className="main-content p-6 md:p-12 bg-[#E2E8F0]">
				<ProductList 
					loading={loading}
					isError={isError}
					handleInputChange={handleInputChange} 
					data={listProduct}
					handleEditProduct={handleEditProduct} 
					handleDelete={handleDelete }
				/>
				{/* <ProductPagination currentPage={currentPage} dataProduct={listProductSearch} startIndex={startIndex} postPerPage={postPerPage} totalPages={totalPages} handleChangePage={handleChangePage} /> */}
			</div>
		</section>
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