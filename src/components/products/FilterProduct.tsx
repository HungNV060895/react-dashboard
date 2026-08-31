import type { ProductType } from "@/types/product";

type ProductListType = {
    items: ProductType[],
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const FilterProduct = ({items, handleInputChange} : ProductListType) => {
    const uniqueByCategory = items.filter(
        (item, index, self) =>
            index === self.findIndex(p => p.category  === item.category)
    )
    return (
        <>
            <div className="box-filter-cate">
                <p>Fillter Category</p>
                <select name="category" id="category" onChange={handleInputChange}>
                    <option value="">All</option>
                    {
                        uniqueByCategory.map((item) => (
                            <option key={item.id} value={item.category}>{item.category}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default FilterProduct;