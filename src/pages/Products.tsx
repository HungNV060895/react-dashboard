import type { ProductError, ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";
import SortProduct from "@/components/products/SortProduct";
import SearchProduct from "@/components/products/SearchProduct";
import FilterProduct from "@/components/products/FilterProduct";
import ProductPagination from "@/components/products/ProductPagination";
import { initialProduct, PAGE_SIZE } from "@/constants/product";
import { LuPlus } from "react-icons/lu";
import { getProduct, createProduct, updateProduct, deleteProduct } from "@/services/productApi";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {

	//State Product
	const [listProduct, setListProduct] = useState<ProductType[]>([]);
	const [items, setItems] = useState<ProductType[]>([]);
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	//Loading, Error
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<ProductError>({});
	const [isError, setIsError] = useState<string>('');

	//Modal
	const [isOpen, setIsOpen] = useState(false);

	//Search - Filter - Sort
	const [sorter, setSorter] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [category, setCategory] = useState<string>("");


	//Pagination
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [postPerPage, setPostPerPage] = useState<number>(1);
	const [totalProduct, setTotalProduct] = useState<number>(0);

	//Data Initial
	const [dataProduct, setDataProduct] = useState<ProductType>(initialProduct)

	const fetchAllProduct = async () => {
		setLoading(true);
		setIsError('');
		try{
			const res = await getProduct(currentPage, PAGE_SIZE, search, category);
			setListProduct(res.data);

			//Tính số trang
			const num_page = Math.ceil(res.total / PAGE_SIZE);

			setTotalProduct(res.total);
			setPostPerPage(num_page);

		}catch (error){
			setIsError("Unable to load products.")
		}finally{
			setLoading(false);
		}
	}

	

	useEffect(() => {
		fetchAllProduct();
	}, [])

	useEffect(() => {
		fetchAllProduct();
	}, [currentPage, search, category])


	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const {name, value} = e.target;
		

		setDataProduct((prev) => ({
			...prev, [name] : value
		}));


		if(error[name as keyof ProductError]){
			setError((prev) => ({...prev, [name]: ''}));
		}

		if(name === 'sortprice' || name === 'sortname'){
			setSorter(value);
		}

		if(name === 'categoryFilter'){
			setCategory(value);
		}
	}

	const handleOpenModal = () => {
		setIsOpen(true);
		setEditProduct(null);
		setDataProduct(initialProduct);
	}
	const handleProductAdd = async() => {

		const newError: ProductError = {};

		if(!dataProduct.productName.trim()){
			newError.productName = "Please enter product name!";
		}

		if(dataProduct.productPrice == 0){
			newError.productPrice = "Please enter a price for a product other than 0!!";
		}

		if(Object.keys(newError).length > 0){
			setError(newError);
			return;
		}


		try{
			const newProduct: Omit<ProductType, 'id'> = {
				productName: dataProduct.productName,
				productPrice: dataProduct.productPrice,
				productCategory: dataProduct.productCategory
			};
			await createProduct(newProduct);
			await fetchAllProduct();

			//Hiển thị page có sản phầm vừa thêm
			const nextTotalProduct = totalProduct + 1;
			const newPostPerPage = Math.ceil(nextTotalProduct/PAGE_SIZE);

			setCurrentPage(newPostPerPage);

			if(newPostPerPage !== currentPage){
				setCurrentPage(newPostPerPage);
			}else{
				await fetchAllProduct();
			}

			setIsOpen(false);
			
			toast.success('Add product success!');
		}catch(error){
			toast.error('Add product unsuccess!');
		}
		
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

	const handleUpdateProduct = async(idProduct: number) => {
		const dataUpdate = {
			id: idProduct,
			productName: dataProduct.productName,
			productPrice: dataProduct.productPrice,
			productCategory: dataProduct.productCategory
		}

		try{
			const dateUpdated = await updateProduct(dataUpdate, idProduct);
			setIsOpen(false);
			setDataProduct(initialProduct);

			setListProduct(product => product.map((item) => item.id === idProduct ? dateUpdated : item));

			toast.success('Update Product Success')
		}catch(error){
			toast.error('Delete Product Unsuccess')
		}
		
	}

	const handleDelete = async(idProduct: number) => {
		let isConfirm = confirm('Are you sure you want to delete it?');
		if(isConfirm){
			try{
				await deleteProduct(idProduct);

				const nextTotalProduct = totalProduct - 1;
				
				setTotalProduct((prev) => Math.max(prev - 1, 0));

				console.log(nextTotalProduct, totalProduct);

				const newPostPerPage = Math.ceil(nextTotalProduct / PAGE_SIZE);

				if(currentPage > newPostPerPage){
					setCurrentPage(newPostPerPage);
				}else{
					await fetchAllProduct();
				}

				//await fetchAllProduct();
				toast.success('Delete Product Success')
			}catch(error){
				toast.error('Delete Product Unsuccess')
			}
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
		<Toaster position="top-right"/>
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
				<ProductPagination 
					currentPage={currentPage} 
					postPerPage={postPerPage}
					totalProduct={totalProduct}
					page_size={PAGE_SIZE}
					// dataProduct={listProductSearch}
					handleChangePage={handleChangePage} />
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
			error={error}
		/>
		</>
	)
}

export default Products;