import type { ProductError, ProductType } from "@/types/product";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductAdd from "@/components/products/ProductAdd";
import SortProduct from "@/components/products/SortProduct";
import SearchProduct from "@/components/products/SearchProduct";
import FilterProduct from "@/components/products/FilterProduct";
import ProductPagination from "@/components/products/ProductPagination";
import { initialProduct, PAGE_SIZE } from "@/constants/product";
import { PackagePlus } from "lucide-react";
import { getProduct, getProductCategories, createProduct, updateProduct, deleteProduct } from "@/services/productApi";
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
	const [categories, setCategories] = useState<string[]>([]);


	//Pagination
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalProduct, setTotalProduct] = useState<number>(0);

	//Data Initial
	const [dataProduct, setDataProduct] = useState<ProductType>(initialProduct)

	const lastRequestRef = useRef(0);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setCategories(await getProductCategories());
			} catch {
				setCategories([]);
			}
		};

		void fetchCategories();
	}, []);

	const fetchAllProduct = useCallback(async (page: number) => {

		const requestIDLast = ++lastRequestRef.current;
		setLoading(true);
		setIsError('');

		try {
			const res = await getProduct(page, PAGE_SIZE, debouncedSearch, category);

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
	}, [debouncedSearch, category]);


	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);

		return () => {
			clearTimeout(timer);
		}
	}, [search])

	useEffect(() => {
		fetchAllProduct(currentPage);
	}, [currentPage, fetchAllProduct]);

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

	const listProductSorted = [...listProduct].sort((a: ProductType, b: ProductType) => {
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
			<section className="space-y-5 py-5 sm:py-7">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div className="min-w-0">
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">Catalog</p>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Products</h1>
						<p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Manage your catalog, pricing and product categories.</p>
					</div>
					<button type="button" onClick={handleOpenModal} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20">
						<PackagePlus size={17} /> Add product
					</button>
				</div>
				<div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_150px] xl:items-end">
					<SearchProduct search={search} handleSearch={handleSearch} />
					<FilterProduct categories={categories} handleInputChange={handleInputChange} />
					<SortProduct handleInputChange={handleInputChange} />
				</div>
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
					<ProductList
						loading={loading}
						isError={isError}
						handleOpenDeleteModal={handleOpenDeleteModal}
						handleInputChange={handleInputChange}
						data={listProductSorted}
						handleEditProduct={handleEditProduct}
					/>
				</div>
				<div className="-mx-2 sm:mx-0">
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
				handleUpdateProduct={handleUpdateProduct}
				error={error}
			/>
		</>
	)
}

export default Products;