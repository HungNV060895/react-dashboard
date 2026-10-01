type ProductListType = {
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}


const SortProduct = ({ handleInputChange }: ProductListType) => {
	const selectClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
	return (
			<>
			<div className="w-full min-w-0">
				<label htmlFor="sortprice" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Sort by price</label>
				<select onChange={handleInputChange} className={selectClass} name="sortprice" id="sortprice">
					<option value="">All</option>
					<option value="htol">Price: High to Low</option>
					<option value="ltoh">Price: Low to High</option>
				</select>
			</div>
			<div className="w-full min-w-0">
				<label htmlFor="sortname" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Sort by name</label>
				<select onChange={handleInputChange} className={selectClass} name="sortname" id="sortname">
					<option value="">All</option>
					<option value="atoz">Name: A to Z</option>
					<option value="ztoa">Name: Z to A</option>
				</select>
			</div>
			</>
	)
}

export default SortProduct;