import UserPagination from "@/components/users/UserPagination";
import UsersSearch from "@/components/users/UsersSearch";
import { LuPlus } from "react-icons/lu";
import UserTable from "@/components/users/UserTable";
import React, { useState, useEffect, useRef } from "react";
import UserFilter from "@/components/users/UserFilter";
import UserAdd from "@/components/users/UserAdd";
import type { FormError, User, FormState } from "@/types/user";
import { initialFormData } from "@/constants/user";
import { getUsers, createUsers, updateUser, deleteUser } from "@/services/userApi";
import {Toaster, toast} from "react-hot-toast";
import ModalConfirm from "@/components/users/ModalConfirm";


const Users = () => {

	// const [usersList, setUsersList] = useState<User[]>(() => {
	// 	const saved = localStorage.getItem('dataUsers');
	// 	return saved ? JSON.parse(saved) : []
	// });
	const [loading, setLoading] = useState<boolean>(false);
	const [iserror, setIsError] = useState<string>("");
	const [usersList, setUsersList] = useState<User[]>([]);

	const [editUser, setEditUser] = useState<User | null>(null);

	const [search, setSearch] = useState('');
	const [debounecedSearch, setDebounecedSearch] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');
	const [isOpen, setIsOpen] = useState(false);
	const latestRequestRef = useRef(0);

	//state add users
	const [formData, setFromData] = useState<FormState>(initialFormData)
	const [error, setError] = useState<FormError>({});

	const pageSize = 6;

	const fetchUsers = async (page: number) => {
		
		const requestId = ++latestRequestRef.current;
		setLoading(true);
		setIsError('');

		try {
			
			const res = await getUsers(page, pageSize, search, role, status);


			if (requestId === latestRequestRef.current) {
				setUsersList(res.data);
				setTotalUsers(res.total);
			}
			
			return res;
		} catch (error) {
			if (requestId === latestRequestRef.current) {
				setIsError('Unable to load user list. Please try again later.');
			}
			throw error;
		} finally {
			if (requestId === latestRequestRef.current) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounecedSearch(search);
		}, 300)

		//Clearup
		return () => {
			clearTimeout(timer);
		}
	}, [search]);


	useEffect(() => {
		fetchUsers(currentPage);
	}, [currentPage, debounecedSearch, role, status]);

	useEffect(() => {
		setCurrentPage(1);
	}, [debounecedSearch, role, status]);


	//const normalizedSearch = search.trim().toLowerCase();

	// const filteredUsers = usersList.filter((user) =>{
	// 	const matchSearch = user.name.toLowerCase().includes(normalizedSearch) ||
	// 						user.email.toLowerCase().includes(normalizedSearch);
	// 	const matchRole = role === 'All' || user.role === role;
	// 	const matchStatus = status === 'All' || user.status === status;
	// 	return matchSearch && matchRole && matchStatus;
	// });




	const totalPages = Math.ceil(totalUsers / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const currentUsers = usersList;


	//console.log(startIndex, endIndex);

	const handleOpenModal = () => {
		setIsOpen(true);
		setEditUser(null);
		setFromData(initialFormData);
	}
	//Add User
	//check validate
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFromData((prev) => ({ ...prev, [name]: value }));


		if (error[name as keyof FormError]) {
			setError((prev) => ({ ...prev, [name]: '' }))
		}
	}

	const handleAddUser = async () => {
		const newError: FormError = {};

		if (!formData.name.trim()) {
			newError.name = 'Please enter your name.';
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newError.email = 'Please enter your email address.';
		} else if (!emailRegex.test(formData.email)) {
			newError.email = 'Enter your email address in the correct format.';
		}

		if (Object.keys(newError).length > 0) {
			setError(newError);
			return;
		}

		const newUser: Omit<User, 'id'> = {
			name: formData.name,
			email: formData.email,
			role: formData.role,
			status: formData.status,
			avatar: ''
		}

		try {
			await createUsers(newUser);
			const nextTotalUsers = totalUsers + 1;
			const nextTotalPages = Math.ceil(nextTotalUsers / pageSize) || 1;

			setTotalUsers(nextTotalUsers);

			if (nextTotalPages !== currentPage) {
				setCurrentPage(nextTotalPages);
			} else {
				await fetchUsers(currentPage);
			}

			setIsOpen(false);
			setFromData(initialFormData);
			setError({});
			toast.success('Add user success!');
		} catch (dataError) {
			console.log(dataError);
			toast.error('Add user unsuccess!');
		}
	}



	const handleEditUser = (idUser: number) => {
		const currentUser = usersList.find((item) => item.id === idUser);
		if (currentUser) {
			setEditUser(currentUser);
			setFromData({
				id: currentUser.id,
				name: currentUser.name,
				email: currentUser.email,
				role: currentUser.role as FormState["role"],
				status: currentUser.status as FormState['status'],
				avatar: currentUser.avatar as FormState['avatar']
			})
		}
		setIsOpen(true);
	}

	const handleUpdateUser = async (idUser: number) => {
		const dataUpdate: User = {
			id: idUser,
			name: formData.name,
			email: formData.email,
			role: formData.role,
			status: formData.status,
			avatar: formData.avatar
		}


		try {
			const updatedUser = await updateUser(dataUpdate, idUser);

			setUsersList((prev) => prev.map(item => item.id === idUser ? updatedUser : item))
			setIsOpen(false);
			setFromData(initialFormData);
			setError({});
			toast.success('Update user success!');
		} catch (error) {
			console.log(error);
			toast.error('Update user unsuccess!');
		}
	}


	const handleDeleteUser = async (userID: number) => {
		const isConfirm = confirm('Are you sure you want to delete it?');
		if (isConfirm) {
			try {
				await deleteUser(userID);
				setTotalUsers((prev) => Math.max(prev - 1, 0));

				const newTotal = Math.max(totalUsers - 1, 0);
				const newTotalPage = Math.ceil(newTotal / pageSize) || 1;

				if (currentPage > newTotalPage) {
					setCurrentPage(newTotalPage);
				} else {
					setUsersList((prev) => prev.filter((item) => item.id !== userID));
				}

				toast.success('Update user success!');
			} catch (error) {
				console.log(error);
				toast.error('Update user unsuccess!');
			}
		}
	}
	return (
		<>
			<Toaster />
			<ModalConfirm />
			<section className="sec-user dark:text-white">
				<div className="heading-page p-6 md:p-12">
					<h2 className="user-ttl text-2xl md:text-4xl font-bold mb-4">User Management</h2>
					<p className="txt-intro text-md mb-5">Manage all users in one place. Control access, assign roles, and monitor activity across your platform.</p>
					<div className="user-control flex flex-col md:flex-wrap md:flex-row items-end justify-between gap-4 w-full">
						<UsersSearch search={search} setSearch={setSearch} />
						<UserFilter role={role} setRole={setRole} status={status} setStatus={setStatus} />
						<button onClick={() => handleOpenModal()} className="min-w-32 p-2 bg-[#2563EB] rounded-lg  text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-400 transition-all">
							<LuPlus />
							Add User
						</button>
					</div>
				</div>
				<div className="main-content p-12 bg-[#E2E8F0]">
					<div className="user-table relative rounded-lg overflow-x-auto bg-white">
						<UserTable
							data={currentUsers}
							handleEditUser={handleEditUser}
							handleDeleteUser={handleDeleteUser}
							editUser={editUser}
							loading={loading}
							iserror={iserror}
						/>
					</div>
					<UserPagination
						startIndex={startIndex}
						pageSize={pageSize}
						currentPage={currentPage}
						totalPages={totalPages}
						totalUsers={totalUsers}
						loading={loading}
						onPageChange={setCurrentPage} />
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