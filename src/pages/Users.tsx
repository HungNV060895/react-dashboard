import UserPagination from "@/components/users/UserPagination";
import  UsersSearch from "@/components/users/UsersSearch";
import UserTable from "@/components/users/UserTable";

const Users = () => {
	return (
		<>
			<section className="sec-user">
				<div className="inner">
					<h2 className="user-ttl text-4xl font-bold mb-4">User Management</h2>
					<p className="txt-intro text-md mb-5">Manage all users in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<UsersSearch />
					<div className="user-table relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
						<UserTable />
					</div>
					<UserPagination />
				</div>
			</section>
		</>
	)
}

export default Users;