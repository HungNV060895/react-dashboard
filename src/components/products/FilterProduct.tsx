import type { ProductType } from "@/types/product";

type ProductListType = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const FilterProduct = ({handleInputChange} : ProductListType) => {
    return (
        <>
            <div className="box-filter-cate">
                <p>Fillter Category</p>
                <select name="categoryFilter" id="categoryFilter" onChange={handleInputChange}>
                    <option value="">All</option>
                    <option value="Máy tính">Máy Tính</option>
                    <option value="Điện thoại">Điện thoại</option>
                </select>
            </div>
        </>
    )
}

export default FilterProduct;