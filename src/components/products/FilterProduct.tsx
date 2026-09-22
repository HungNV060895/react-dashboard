import type { ProductType } from "@/types/product";

type ProductListType = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const FilterProduct = ({handleInputChange} : ProductListType) => {
    return (
        <>
            <div className="box-filter-cate w-full sm:w-1/2 md:flex-1">
                <label htmlFor="categoryFilter" className="search-label">Filter Category</label>
                <select name="categoryFilter" id="categoryFilter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleInputChange}>
                    <option value="">All</option>
                    <option value="Máy tính">Máy Tính</option>
                    <option value="Điện thoại">Điện thoại</option>
                </select>
            </div>
        </>
    )
}

export default FilterProduct;