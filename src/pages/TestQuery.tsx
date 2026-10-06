import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/userApi";
import { useState } from "react";

const TestQuery = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');

	const params = {
		page: 1,
		search: '',
		role: 'All',
		status: 'All'
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['testQuery', params],
		queryFn: () => getUsers(params.page, 10, params.search, params.role, params.status),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return (
		<div>
			<h1>Test Query</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul>
					{data.data.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}

			<button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
			<button onClick={() => setSearch(params.search)}>Set Search</button>
		</div>
	);
};

export default TestQuery;