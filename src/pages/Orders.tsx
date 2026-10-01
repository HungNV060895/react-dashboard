import { useForm, SubmitHandler } from "react-hook-form"

enum RoleEnum {
	admin = 'Admin',
	user = 'User',
	guest = 'guest'
}

enum StatusEnum {
	active = 'Active',
	inactive = 'Inactive'
}

interface IFormInput {
	name: string
	email: string
	role: RoleEnum
	status: StatusEnum
	avatar: string
}

const Orders = () => {
	const userEdited = {
		name: "Nguyễn Văn A",
		email: "a@gmail.com",
		role: RoleEnum.user,
		status: StatusEnum.active,
		avatar: "",
	};



	const handleEdit = (user: IFormInput) => {
		reset({
			name: user.name,
			email: user.email,
			role: user.role,
			status: user.status,
			avatar: user.avatar
		})
	}

	const { register, handleSubmit, formState: { errors }, reset, setValue, watch, getValues } = useForm<IFormInput>({
		defaultValues: {
			name: "",
			email: "",
			role: RoleEnum.admin,
			status: StatusEnum.active,
			avatar: "",
		}
	});

	const role = watch("role");
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Name</label>
				<input {...register("name",
					{
						required: "Name is required",
						maxLength: { value: 100, message: "Name must be at least 100 characters" }
					})
				} aria-invalid={errors.name ? "true" : "false"} />
				{errors.name && <p role="alert">{errors.name.message}</p>}
				<label>Email</label>
				<input {...register("email", {
					required: "Email is required", pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Invalid email",
					}
				})} />
				{errors.email && <p role="alert">{errors.email.message}</p>}
				<label>Role</label>
				<select {...register("role")}>
					<option value="Admin">Admin</option>
					<option value="User">User</option>
					<option value="Guest">Guest</option>
				</select>
				<label>Status</label>
				<select {...register("status")}>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
				<button type="submit">Submit</button>

				<button type="button" onClick={() => reset()}>Reset</button>
				<button type="button" onClick={() => handleEdit(userEdited)}>Edit User</button>
				<button type="button" onClick={() => setValue('name', 'HungNV')}>Set Value</button>

				{role === "Admin" && (
					<p>Admin permissions</p>
				)}

				{role === "User" && (
					<p>User permissions</p>
				)}

				<button></button>
			</form>
		</>
	)
}

export default Orders;