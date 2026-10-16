import UserPagination from "@/components/users/UserPagination";
import UsersSearch from "@/components/users/UsersSearch";
import { UserPlus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import React, { useCallback, useState, useEffect, useRef } from "react";
import UserFilter from "@/components/users/UserFilter";
import UserAdd from "@/components/users/UserAdd";
import type { FormError, User, FormState } from "@/types/user";
import { initialFormData } from "@/constants/user";
import { getUsers, createUsers, updateUser, deleteUser } from "@/services/userApi";
import { Toaster, toast } from "react-hot-toast";
import ModalConfirm from "@/components/ModalConfirm";

const pageSize = 6;

const Users = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [iserror, setIsError] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isConfirm, setIsConfirm] = useState<boolean>(false);

	const [usersList, setUsersList] = useState<User[]>([]);
	const [editUser, setEditUser] = useState<User | null>(null);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const [search, setSearch] = useState('');
	const [debounecedSearch, setDebounecedSearch] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const [role, setRole] = useState('All');
	const [status, setStatus] = useState('All');
	const latestRequestRef = useRef(0);

	//state add users
	const [formData, setFromData] = useState<FormState>(initialFormData)
	const [error, setError] = useState<FormError>({});

	const fetchUsers = useCallback(async (page: number) => {

		const requestId = ++latestRequestRef.current;
		setLoading(true);
		setIsError('');

		try {

			const res = await getUsers(page, pageSize, debounecedSearch, role, status);


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
	}, [debounecedSearch, role, status]);

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
	}, [currentPage, fetchUsers]);

	useEffect(() => {
		setCurrentPage(1);
	}, [debounecedSearch, role, status]);

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
			avatar: formData.avatar
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


	const handleCancelDelete = () => {
		setIsConfirm(false);
		setUserToDelete(null);
	}


	const handleOpenDeleteModal = (user: User) => {
		setIsConfirm(true);
		setUserToDelete(user);
	}

	const handleConfirmDelete = async () => {
		if (!userToDelete) return;
		const userID = userToDelete.id;
		setIsDeleting(true);
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
			setIsConfirm(false);
			toast.success('Delete user success!');
		} catch (error) {
			setIsConfirm(false);
			toast.error('Delete user unsuccess!');
		} finally {
			setIsDeleting(false);
		}
	}
	return (
		<>
			<Toaster />
			<ModalConfirm
				message={`Are you sure you want to delete ${userToDelete?.name}?`}
				isConfirm={isConfirm}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={handleConfirmDelete}
				isDeleting={isDeleting}
			/>
			<section className="space-y-5 py-5 sm:py-7">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div className="min-w-0">
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">Workspace</p>
						<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">User management</h1>
						<p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Manage team access, roles and account status.</p>
					</div>
					<button type="button" onClick={handleOpenModal} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20">
						<UserPlus size={17} /> Add user
					</button>
				</div>
				<div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_auto] xl:items-end">
					<UsersSearch search={search} setSearch={setSearch} />
					<UserFilter role={role} setRole={setRole} status={status} setStatus={setStatus} />
				</div>
				<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
					<UserTable
						data={currentUsers}
						handleEditUser={handleEditUser}
						handleOpenDeleteModal={handleOpenDeleteModal}
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