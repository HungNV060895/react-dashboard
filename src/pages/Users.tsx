import UserPagination from "@/components/users/UserPagination";
import  UsersSearch from "@/components/users/UsersSearch";
import UserTable from "@/components/users/UserTable";
import { useState,  useEffect } from "react";
import { users } from  "@/data/users";


const Users = () => {
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 2;

	useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	const normalizedSearch = search.trim().toLowerCase();

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(normalizedSearch) ||
		user.email.toLowerCase().includes(normalizedSearch)
	);


	const totalPages = Math.ceil(filteredUsers.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentUsers = filteredUsers.slice(startIndex, endIndex);



	return (
		<>
			<section className="sec-user">
				<div className="inner">
					<h2 className="user-ttl text-4xl font-bold mb-4">User Management</h2>
					<p className="txt-intro text-md mb-5">Manage all users in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<UsersSearch search={search} setSearch={setSearch}/>
					<div className="user-table relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
						<UserTable data={currentUsers} />
					</div>
					<UserPagination startIndex={startIndex} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
				</div>
			</section>
		</>
	)
}

export default Users;