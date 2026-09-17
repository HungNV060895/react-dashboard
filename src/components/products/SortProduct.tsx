type ProductListType = {
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}


const SortProduct = ({ handleInputChange }: ProductListType) => {
	return (
		<>
			<div className="w-full md:w-auto flex gap-4">
				<div className="flex-1 md:w-44">
					<label htmlFor="sortprice" className="block mb-2">Sort Price</label>
					<select onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="sortprice" id="sortprice">
						<option value="">All</option>
						<option value="htol">Price: High to Low</option>
						<option value="ltoh">Price: Low to High</option>
					</select>
				</div>
				<dl className="flex-1">
					<label htmlFor="sortname" className="block mb-2">Sort Name</label>
					<select onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="sortname" id="sortname">
						<option value="">All</option>
						<option value="atoz">Name: A to Z</option>
						<option value="ztoa">Name: Z to A</option>
					</select>
				</dl>
			</div>
		</>
	)
}

export default SortProduct;