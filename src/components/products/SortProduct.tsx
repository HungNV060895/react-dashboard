type ProductListType = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}


const SortProduct = ({handleInputChange} : ProductListType) => {
    return (
        <>
            <div className="flex gap-5">
				<dl>
					<dt>Sort Product</dt>
					<dd>
						<select onChange={handleInputChange} name="sortprice" id="sortprice">
							<option value="">default</option>
							<option value="htol">Price: High to Low</option>
							<option value="ltoh">Price: Low to High</option>
						</select>
					</dd>
				</dl>
				<dl>
					<dt>Sort Product</dt>
					<dd>
						<select onChange={handleInputChange} name="sortname" id="sortname">
							<option value="">default</option>
							<option value="atoz">Name: A to Z</option>
							<option value="ztoa">Name: Z to A</option>
						</select>
					</dd>
				</dl>
			</div>
        </>
    )
}

export default SortProduct;