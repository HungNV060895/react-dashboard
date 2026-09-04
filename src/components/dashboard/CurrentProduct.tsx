
const CurrentProduct = () => {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="min-w-full border border-gray-300 divide-y divide-gray-200">
						<thead className="bg-gray-300 font-medium">
							<tr>
								<th className="font-medium px-4 py-2 text-left">STT</th>
								<th className="font-medium px-4 py-2 text-left">Name</th>
								<th className="font-medium px-4 py-2 text-left">Category</th>
								<th className="font-medium px-4 py-2 text-left">Price</th>
								<th className="font-medium px-4 py-2 text-left">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							<tr>
								<td className="px-4 py-2">No.1</td>
								<td className="px-4 py-2">Laptop Dell Vostro 2421</td>
								<td className="px-4 py-2">Electrics</td>
								<td className="px-4 py-2">10 M</td>
								<td className="px-4 py-2"><a href="#" className="inline-block py-1 px-2 text-slate-300 bg-green-600 hover:bg-green-300 hover:text-slate-950 transition">View Detail</a></td>
							</tr>
							<tr>
								<td className="px-4 py-2">No.1</td>
								<td className="px-4 py-2">Laptop Dell Vostro 2421</td>
								<td className="px-4 py-2">Electrics</td>
								<td className="px-4 py-2">10 M</td>
								<td className="px-4 py-2"><a href="#" className="inline-block py-1 px-2 text-slate-300 bg-green-600 hover:bg-green-300 hover:text-slate-950 transition">View Detail</a></td>
							</tr>
							<tr>
								<td className="px-4 py-2">No.1</td>
								<td className="px-4 py-2">Laptop Dell Vostro 2421</td>
								<td className="px-4 py-2">Electrics</td>
								<td className="px-4 py-2">10 M</td>
								<td className="px-4 py-2"><a href="#" className="inline-block py-1 px-2 text-slate-300 bg-green-600 hover:bg-green-300 hover:text-slate-950 transition">View Detail</a></td>
							</tr>
							<tr>
								<td className="px-4 py-2">No.1</td>
								<td className="px-4 py-2">Laptop Dell Vostro 2421</td>
								<td className="px-4 py-2">Electrics</td>
								<td className="px-4 py-2">10 M</td>
								<td className="px-4 py-2"><a href="#" className="inline-block py-1 px-2 text-slate-300 bg-green-600 hover:bg-green-300 hover:text-slate-950 transition">View Detail</a></td>
							</tr>
						</tbody>
					</table>
			</div>
		</>
	)
}

export default CurrentProduct;