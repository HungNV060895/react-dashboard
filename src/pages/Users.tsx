import UserPagination from "@/components/users/UserPagination";
import  UsersSearch from "@/components/users/UsersSearch";
import { LuCirclePlus } from "react-icons/lu";
import UserTable from "@/components/users/UserTable";
import React, { useState,  useEffect } from "react";
import UserFilter from "@/components/users/UserFilter";
import UserAdd from "@/components/users/UserAdd";
import type { FormError, User, FormState } from "@/types/user";
import {initialFormData} from "@/constants/user";



const Users = () => {
	const [usersList, setUsersList] = useState<User[]>(() => {
		const saved = localStorage.getItem('dataUsers');
		return saved ? JSON.parse(saved) : []
	});


	const [editUser, setEditUser] = useState<User | null>(null);

	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');
	const [isOpen, setIsOpen] = useState(false);

	//state add users
	const [formData, setFromData] = useState<FormState>({
		id: 0,
		name: "",
		email: "",
		role: 'Admin',
		status: 'Active',
		avatar: ''
	})


	// const [nameField, setNameField] = useState('');
	// const [emailField, setEmailField] = useState('');
	// const [roleField, setRoleField] = useState<"Admin" | "User">('Admin');
	// const [statusField, setStatusField] = useState<"Active" | "Inactive">('Active');
	// const [avatarField, setAvatarField] = useState(null);
	const [error, setError] = useState<FormError>({});

	const pageSize = 2;

	useEffect(() => {
		setCurrentPage(1);
	}, [search, role, status]);

	useEffect(() => {
		localStorage.setItem('dataUsers', JSON.stringify(usersList))
	}, [usersList]);

	const normalizedSearch = search.trim().toLowerCase();

	const filteredUsers = usersList.filter((user) =>{
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


	const hadleOpenModal = () => {
		setIsOpen(true);
		setEditUser(null);
		setFromData(initialFormData);
	}
	//Add User
	//check validate
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const {name, value} = e.target;

		setFromData((prev) => ({...prev, [name]: value}));

		
		if(error[name as keyof FormError]){
			setError((prev) => ({...prev, [name]: ''}))
		}
	}

	const handleAddUser = () => {
		const newError: FormError = {};

		if(!formData.name.trim()){
			newError.name = 'Please fill name';
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!formData.email.trim()){
			newError.email = 'Nhap email';
		}else if(!emailRegex.test(formData.email)){
			newError.email = 'Nhap email dung dinh dang';
		}

		if(Object.keys(newError).length > 0){
			setError(newError);
			return;
		}

		const newUser: User = {
			id: Date.now(),
			name: formData.name,
			email: formData.email,
			role: formData.role,
			status: formData.status,
			avatar: ''
		}

		// const updateUsersList = [...usersList, newUser];
		// setUsersList(updateUsersList);
		setUsersList((prev) => [...prev, newUser]);
		// localStorage.setItem('dataUsers', JSON.stringify(updateUsersList));
		setIsOpen(false);
		setFromData(initialFormData);
		setError({});
	}



	const handleEditUser = (idUser : number) => {
		const currentUser = usersList.find((item) => item.id === idUser);
		if(currentUser){
			setEditUser(currentUser);
			setFromData({
				id: currentUser.id,
				name: currentUser.name,
				email: currentUser.email,
				role: currentUser.role as FormState["role"],
				status: currentUser.status as FormState['status'],
				avatar: ''
			})
		}
		setIsOpen(true);
	}

	const handleUpdateUser = (idUser: number) => {
		//(`update user ${idUser}`);
		const dataUpdate: User = {
			id: idUser,
			name: formData.name,
			email: formData.email,
			role: formData.role,
			status: formData.status,
			avatar: ''
		}

		setUsersList((prev) => prev.map(item => item.id === idUser ? {...item, ...dataUpdate} : item ))
		//console.log(dataUpdate);
		setIsOpen(false);
		setFromData(initialFormData);
		setError({});
	}

	
	return (
		<>
			<section className="sec-user dark:text-white">
				<div className="inner">
					<h2 className="user-ttl text-4xl font-bold mb-4">User Management</h2>
					<p className="txt-intro text-md mb-5">Manage all users in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<div className="user-control flex justify-between mb-6">
						<div className="w-full max-w-xl min-w-[200px] relative flex gap-2">
							<UsersSearch search={search} setSearch={setSearch}/>
							<UserFilter role={role} setRole={setRole} status={status} setStatus={setStatus} />
						</div>
						<div className="user-control__right max-w-[150px] w-full">
							<button onClick={() => hadleOpenModal()} className="user-control__btn p-2 border rounded-3xl w-full bg-slate-700 text-white flex items-center justify-center gap-2 hover:bg-slate-400">
								<LuCirclePlus />
								Add User
							</button>
						</div>
					</div>
					
					<div className="user-table relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
						<UserTable data={currentUsers} handleEditUser={handleEditUser} editUser={editUser} />
					</div>
					<UserPagination startIndex={startIndex} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
				</div>
			</section>
			<UserAdd 
				isOpen={isOpen} 
				setIsOpen={setIsOpen} 
				handleAddUser={handleAddUser}
				handleChange={handleChange}
				handleUpdateUser={handleUpdateUser}
				formData={formData}
				error={error}
				editUser={editUser}
			/>
		</>
	)
}

export default Users;