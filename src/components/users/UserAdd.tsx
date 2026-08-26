
type ModalTypes = {
	isOpen: boolean;
	setIsOpen : (isOpen: boolean) => void;
	handleAddUser: () => void;
	handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: FormErrors 
}

type FormErrors = {
	name?: string;
	email?: string;
	role?: string;
	status?: string;
}

type AddUser = {
	nameField: string;
	emailField: string;
	roleField: string;
	statusField: string;
	setNameField : (nameField: string) => void,
	setEmailField: (emailField: string) => void;
	setRoleField: (roleField: string) => void;
	setStatusField: (statusField: string) => void;
}

type UserAddProps = ModalTypes & AddUser & FormErrors;

const UserAdd = (
	{	isOpen,
		setIsOpen,
		handleAddUser,
		handleNameChange,
		handleEmailChange,
		nameField,
		emailField,
		roleField,
		statusField,
		setNameField, setEmailField, setRoleField, setStatusField, error} : UserAddProps
) => {
	return (
		<>
			<div id="userModal" className={`fixed inset-0 z-50 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
				<div onClick={() => setIsOpen(false)}  id="modalOverlay" className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
				<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
					<div className="flex justify-between items-center mb-5">
						<h2 className="text-2xl font-bold text-gray-800">Add User</h2>
						<button id="closeModalBtn"
								className="text-gray-400 hover:text-gray-600 text-3xl leading-none focus:outline-none">
							&times;
						</button>
					</div>
					<div className="userAdd-form w-full">
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Name</dt>
							<dd className="w-[70%]">
								<input type="text" onChange={handleNameChange} value={nameField} className="input-field" placeholder="Nhập name" />
								{
									error.name && (<span className="txt-error">{error.name}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Email</dt>
							<dd className="w-[70%]">
								<input type="text" onChange={handleEmailChange} value={emailField} className="input-field" placeholder="Nhập email" />
								{
									error.email && (<span className="txt-error">{error.email}</span>)
								}
							</dd>
						</dl>
						<dl className="userAdd-form__item flex justify-between items-center">
							<dt className="w-[20%]">Role</dt>
							<dd className="w-[70%]">
								<select onChange={(e) => setRoleField(e.target.value)} value={roleField} name="role" id="role" className="input-field">
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
								<select onChange={(e) => setStatusField(e.target.value)} value={statusField} name="status" id="status" className="input-field">
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
						<button 
								type="button" 
								className="btn-submit block w-[70%] ml-[30%]"
								onClick={() => handleAddUser()}
						>Add</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserAdd;