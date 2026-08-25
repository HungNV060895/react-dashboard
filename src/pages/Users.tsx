import UserPagination from "@/components/users/UserPagination";
import  UsersSearch from "@/components/users/UsersSearch";
import { LuCirclePlus } from "react-icons/lu";
import UserTable from "@/components/users/UserTable";
import { useState,  useEffect } from "react";
import { users } from  "@/data/users";
import UserFilter from "@/components/users/UserFilter";


const Users = () => {
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');

	const pageSize = 2;

	useEffect(() => {
		setCurrentPage(1);
	}, [search, role, status]);

	const normalizedSearch = search.trim().toLowerCase();

	const filteredUsers = users.filter((user) =>{
		const matchSearch = user.name.toLowerCase().includes(normalizedSearch) ||
							user.email.toLowerCase().includes(normalizedSearch);
		const matchRole = role === 'All' || user.role === role;
		const matchStatus = status === 'All' || user.status === status;
		return matchSearch && matchRole && matchStatus;
	});

	


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
					<div className="user-control flex justify-between mb-6">
						<div className="w-full max-w-xl min-w-[200px] relative flex gap-2">
							<UsersSearch search={search} setSearch={setSearch}/>
							<UserFilter role={role} setRole={setRole} status={status} setStatus={setStatus} />
						</div>
						<div className="user-control__right max-w-[150px] w-full">
							<button className="user-control__btn p-2 border rounded-3xl w-full bg-slate-700 text-white flex items-center justify-center gap-2 hover:bg-slate-400">
								<LuCirclePlus />
								Add User
							</button>
						</div>
					</div>
					
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