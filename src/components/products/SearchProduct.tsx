type ProductListType = {
    search: string,
    handleSearch: (search: string) => void
}

const SearchProduct = ({search, handleSearch} : ProductListType) => {
    return (
        <>
            <div className="box-search">
                <input type="text" onChange={(e) => handleSearch(e.target.value)} name="search" value={search} />
            </div>
            
        </>
    )
}

export default SearchProduct;