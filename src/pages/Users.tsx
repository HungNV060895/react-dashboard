
import { LuCirclePlus, LuSearch } from "react-icons/lu";

const Users = () => {
	return (
		<>
			<section className="sec-user">
				<div className="inner">
					<h2 className="user-ttl text-4xl font-bold mb-4">User Management</h2>
					<p className="txt-intro text-md mb-5">Manage all users in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<div className="user-control flex justify-between m-6">
						<div className="user-control__left flex items-center gap-4 max-w-[300px] w-full">
							<div className="search-box w-full">
								<LuSearch />
								<input type="text" placeholder="Search users..." className="search-input p-2 border rounded-3xl w-full" />
							</div>
						</div>
						<div className="user-control__right max-w-[150px] w-full">
							<button className="user-control__btn p-2 border rounded-3xl w-full bg-slate-700 text-white flex items-center justify-center gap-2 hover:bg-slate-400">
								<LuCirclePlus />
								Add User
							</button>
						</div>
					</div>

				</div>
			</section>
		</>
	)
}

export default Users;