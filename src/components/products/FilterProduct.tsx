type ProductListType = {
    categories: string[],
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const FilterProduct = ({categories, handleInputChange} : ProductListType) => {
    return (
            <div className="w-full min-w-0">
                <label htmlFor="categoryFilter" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Category</label>
                <select name="categoryFilter" id="categoryFilter" className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" onChange={handleInputChange}>
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
    )
}

export default FilterProduct;