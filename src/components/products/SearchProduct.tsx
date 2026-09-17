type ProductListType = {
    search: string,
    handleSearch: (search: string) => void
}

const SearchProduct = ({search, handleSearch} : ProductListType) => {
    return (
        <>
            <div className="box-search w-full md:flex-1 min-w-[240px]">
                <label htmlFor="search-input" className="block mb-2">Search</label>
                <div className="relative">
                    <input type="text" className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md" placeholder="Search for product..." onChange={(e) => handleSearch(e.target.value)} name="search" id="search-input" value={search} />
                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-1 h-8 w-8 my-auto px-2 flex items-center bg-white rounded "
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SearchProduct;