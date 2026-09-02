import { User, FormState, FormError } from "@/types/user";

type ModalTypes = {
	isOpen: boolean;
	setIsOpen : (isOpen: boolean) => void;
	handleAddUser: () => void;
	handleUpdateUser: (userId: number) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	error: FormError 
}


type AddUser = {
	editUser: User | null,
	formData: FormState
}

type UserAddProps = ModalTypes & AddUser;

const UserAdd = (
	{	isOpen,
		setIsOpen,
		handleAddUser,
		handleChange,
		handleUpdateUser,
		formData,
		editUser,
		error
	} : UserAddProps
) => {
	//console.log(formData.id);
	return (
		<>
			<div id="userModal" className={`fixed inset-0 z-50 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
				<div onClick={() => setIsOpen(false)} id="modalOverlay" className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
				<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
					<div className="flex justify-between items-center mb-5">
						<h2 className="text-2xl font-bold text-gray-800">
							{editUser ? 'Edit User' : 'Add User'}
						</h2>
						<button onClick={() => setIsOpen(false)} id="closeModalBtn"
								className="text-gray-400 hover:text-gray-600 text-3xl leading-none focus:outline-none">
							&times;
						</button>
					</div>
					<form onSubmit={(e) => {
							e.preventDefault();
							editUser ? handleUpdateUser(formData.id) : handleAddUser();
						}
					} className="userAdd-form w-full">
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Name</dt>
							<dd className="w-[70%]">
								<input type="text" name="name" onChange={handleChange} value={formData.name} className="input-field" placeholder="Nhập name" />
								{
									error.name && (<span className="txt-error">{error.name}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Email</dt>
							<dd className="w-[70%]">
								<input type="text" name="email" onChange={handleChange} value={formData.email} className="input-field" placeholder="Nhập email" />
								{
									error.email && (<span className="txt-error">{error.email}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Role</dt>
							<dd className="w-[70%]">
								<select name="role" onChange={handleChange} value={formData.role} id="role" className="input-field">
									<option value="Admin">Admin</option>
									<option value="User">User</option>
									<option value="Guest">Guest</option>
								</select>
								{
									error.role && (<span className="txt-error">{error.role}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Status</dt>
							<dd className="w-[70%]">
								<select onChange={handleChange} value={formData.status} name="status" id="status" className="input-field">
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
								{
									error.status && (<span className="txt-error">{error.status}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Avatar</dt>
							<dd className="w-[70%]">
								<input type="file" />
							</dd>
						</dl>
						<button type="submit" className="btn-submit block w-[70%] ml-[30%]">
							{editUser ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default UserAdd;