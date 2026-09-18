type ProductListType = {
    search: string,
    handleSearch: (search: string) => void
}

const SearchProduct = ({ search, handleSearch }: ProductListType) => {
    return (
        <>
            <div className="box-search w-full md:flex-1">
                <label htmlFor="search-input" className="search-label">Search</label>
                <div className="relative">
                    <input type="text"
                        className="bg-gray-700 w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-white text-white text-sm border border-gray-500 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Search for product..." 
                        onChange={(e) => handleSearch(e.target.value)} 
                        name="search" 
                        id="search-input" 
                        value={search} />
                    <button
						className="absolute top-1/2 -translate-y-1/2 right-2 h-6 w-6 bg-transparent text-gray-100 rounded"
						type="button"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="text-slate-300">
							<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
					</button>
                </div>
            </div>
        </>
    )
}

export default SearchProduct;