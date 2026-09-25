import type { ProductError, ProductType } from "@/types/product";
import { useEffect, useRef, useState } from "react";
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
import ModalConfirm from "@/components/ModalConfirm";

const Products = () => {

	//State Product
	const [listProduct, setListProduct] = useState<ProductType[]>([]);
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	//Loading, Error
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<ProductError>({});
	const [isError, setIsError] = useState<string>('');

	//Modal
	const [isOpen, setIsOpen] = useState(false);
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const [productToDelete, setProductToDelete] = useState<ProductType | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	//Search - Filter - Sort
	const [sorter, setSorter] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [debouncedSearch, setDebouncedSearch] = useState<string>("");
	const [category, setCategory] = useState<string>("");


	//Pagination
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalProduct, setTotalProduct] = useState<number>(0);

	//Data Initial
	const [dataProduct, setDataProduct] = useState<ProductType>(initialProduct)

	const lastRequestRef = useRef(0);

	const fetchAllProduct = async (page: number) => {

		const requestIDLast = ++lastRequestRef.current;
		setLoading(true);
		setIsError('');

		try {
			const res = await getProduct(page, PAGE_SIZE, search, category);

			if (requestIDLast === lastRequestRef.current) {
				setListProduct(res.data);
				setTotalProduct(res.total);
			}
		} catch (error) {
			if (requestIDLast === lastRequestRef.current) {
				setIsError("Unable to load products.")
			}
		} finally {
			if (requestIDLast === lastRequestRef.current) {
				setLoading(false);
			}
		}
	}


	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);

		return () => {
			clearTimeout(timer);
		}
	})

	useEffect(() => {
		fetchAllProduct(currentPage);
		console.log(totalProduct);
	}, [currentPage, debouncedSearch, category, sorter]);

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch, category, sorter])


	const totalPage = Math.ceil(totalProduct / PAGE_SIZE);

	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;


		setDataProduct((prev) => ({
			...prev, [name]: value
		}));


		if (error[name as keyof ProductError]) {
			setError((prev) => ({ ...prev, [name]: '' }));
		}

		if (name === 'sortprice' || name === 'sortname') {
			setSorter(value);
		}

		if (name === 'categoryFilter') {
			setCategory(value);
		}
	}

	const handleOpenModal = () => {
		setIsOpen(true);
		setEditProduct(null);
		setDataProduct(initialProduct);
	}
	const handleProductAdd = async () => {

		const newError: ProductError = {};

		if (!dataProduct.productName.trim()) {
			newError.productName = "Please enter product name!";
		}

		if (dataProduct.productPrice == 0) {
			newError.productPrice = "Please enter a price for a product other than 0!!";
		}

		if (Object.keys(newError).length > 0) {
			setError(newError);
			return;
		}


		try {
			const newProduct: Omit<ProductType, 'id'> = {
				productName: dataProduct.productName,
				productPrice: dataProduct.productPrice,
				productCategory: dataProduct.productCategory
			};
			await createProduct(newProduct);
			await fetchAllProduct(currentPage);

			//Hiển thị page có sản phầm vừa thêm
			const nextTotalProduct = totalProduct + 1;
			const newPostPerPage = Math.ceil(nextTotalProduct / PAGE_SIZE);

			setCurrentPage(newPostPerPage);

			if (newPostPerPage !== currentPage) {
				setCurrentPage(newPostPerPage);
			} else {
				await fetchAllProduct(currentPage);
			}

			setIsOpen(false);

			toast.success('Add product success!');
		} catch (error) {
			toast.error('Add product unsuccess!');
		}

	}

	const handleEditProduct = (id: number) => {
		const editedProduct = listProduct.find((item) => item.id === id);
		if (editedProduct) {
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

	const handleUpdateProduct = async (idProduct: number) => {
		const dataUpdate = {
			id: idProduct,
			productName: dataProduct.productName,
			productPrice: dataProduct.productPrice,
			productCategory: dataProduct.productCategory
		}

		try {
			const dateUpdated = await updateProduct(dataUpdate, idProduct);
			setIsOpen(false);
			setDataProduct(initialProduct);

			setListProduct(product => product.map((item) => item.id === idProduct ? dateUpdated : item));

			toast.success('Update Product Success')
		} catch (error) {
			toast.error('Delete Product Unsuccess')
		}

	}


	const handleCancelDelete = () => {
		setIsConfirm(false);
		setProductToDelete(null);
	}


	const handleOpenDeleteModal = (product: ProductType) => {
		setIsConfirm(true);
		setProductToDelete(product);
	}

	const handleConfirmDelete = async () => {
		if (!productToDelete) return;
		const productID = productToDelete.id;
		setIsDeleting(true);

		try {
			await deleteProduct(productID);

			const nextTotalProduct = totalProduct - 1;

			setTotalProduct((prev) => Math.max(prev - 1, 0));

			console.log(nextTotalProduct, totalProduct);

			const newPostPerPage = Math.ceil(nextTotalProduct / PAGE_SIZE);

			if (currentPage > newPostPerPage) {
				setCurrentPage(newPostPerPage);
			} else {
				await fetchAllProduct(currentPage);
			}

			setIsConfirm(false);
			toast.success('Delete Product Success')
		} catch (error) {
			toast.error('Delete Product Unsuccess')
		} finally {
			setIsDeleting(false);
		}
	}


	const handleSearch = (keyword: string) => {
		setSearch(keyword);
	}

	let listProductSorted = listProduct.sort((a: ProductType, b: ProductType) => {
		if (sorter === 'htol') return (Number(b.productPrice) - Number(a.productPrice));
		if (sorter === 'ltoh') return (Number(a.productPrice) - Number(b.productPrice));
		if (sorter === 'atoz') return a.productName.localeCompare(b.productName);
		if (sorter === 'ztoa') return b.productName.localeCompare(a.productName);
		return 0;
	});

	return (
		<>
			<Toaster position="top-right" />
			<ModalConfirm
				message={`Are you sure you want to delete ${productToDelete?.productName}?`}
				isConfirm={isConfirm}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={handleConfirmDelete}
				isDeleting={isDeleting}
			/>
			<section className="sec-product dark:text-white">
				<div className="heading-page p-6 md:p-12">
					<h1 className="user-ttl text-3xl md:text-4xl font-bold mb-4">Products Management</h1>
					<p className="txt-intro text-sm md:text-md mb-5">Manage all product in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<div className="product-control flex flex-col md:flex-wrap md:flex-row items-end justify-between gap-4 w-full mb-12">
						<SearchProduct search={search} handleSearch={handleSearch} />
						<FilterProduct handleInputChange={handleInputChange} />
						<SortProduct handleInputChange={handleInputChange} />
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
						handleOpenDeleteModal={handleOpenDeleteModal}
						handleInputChange={handleInputChange}
						data={listProductSorted}
						handleEditProduct={handleEditProduct}
					/>
					<ProductPagination
						currentPage={currentPage}
						totalPage={totalPage}
						totalProduct={totalProduct}
						page_size={PAGE_SIZE}
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