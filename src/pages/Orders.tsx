import { useForm, SubmitHandler } from "react-hook-form"
import {
	ArrowLeft,
	Check,
	CircleAlert,
	Eye,
	FlaskConical,
	Link2,
	Mail,
	RotateCcw,
	Save,
	ShieldCheck,
	UserRound,
} from "lucide-react"
import { Link } from "react-router-dom"

enum RoleEnum {
	admin = 'Admin',
	user = 'User',
	guest = 'Guest'
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

	const { register, handleSubmit, reset, setValue, watch, getValues, setError, clearErrors, formState: { errors } } = useForm<IFormInput>({
		defaultValues: {
			name: "",
			email: "",
			role: RoleEnum.admin,
			status: StatusEnum.active,
			avatar: "",
		}
	});

	const role = watch("role");
	const avatar = watch("avatar");
	const handlePrev = () => {
		const currentValues = getValues();
		console.log("Current Values:", currentValues);
	}

	const handleClearErrors = () => {
		clearErrors();
	}

	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
	return (
		<div className="mx-auto max-w-6xl space-y-7 py-5 sm:py-7">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Quản lý tài khoản</p>
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Thông tin người dùng</h1>
					<p className="mt-2 text-sm text-slate-500">Cập nhật hồ sơ và quyền truy cập của thành viên.</p>
				</div>
				<Link to="/users" className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:self-auto">
					<ArrowLeft size={16} /> Danh sách người dùng
				</Link>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
				<section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<div className="border-b border-slate-100 px-6 py-5 sm:px-8">
						<h2 className="text-base font-semibold text-slate-900">Thông tin cơ bản</h2>
						<p className="mt-1 text-sm text-slate-500">Các trường có dấu * là bắt buộc.</p>
					</div>
					<div className="space-y-6 px-6 py-6 sm:px-8">
						<div>
							<label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Họ và tên <span className="text-rose-600">*</span></label>
							<div className="relative">
								<UserRound size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input id="name" autoComplete="name" placeholder="Ví dụ: Nguyễn Văn An" aria-invalid={errors.name ? "true" : "false"} {...register("name", {
									required: "Vui lòng nhập họ và tên",
									maxLength: { value: 100, message: "Họ và tên không được vượt quá 100 ký tự" }
								})} className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${errors.name ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-teal-500 focus:ring-teal-50"}`} />
							</div>
							{errors.name && <p role="alert" className="mt-2 text-sm text-rose-600">{errors.name.message}</p>}
						</div>

						<div>
							<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Địa chỉ email <span className="text-rose-600">*</span></label>
							<div className="relative">
								<Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input id="email" type="email" autoComplete="email" placeholder="ten@congty.com" aria-invalid={errors.email ? "true" : "false"} {...register("email", {
									required: "Vui lòng nhập địa chỉ email", pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Địa chỉ email chưa hợp lệ",
									}
								})} className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${errors.email ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-teal-500 focus:ring-teal-50"}`} />
							</div>
							{errors.email && <p role="alert" className="mt-2 text-sm text-rose-600">{errors.email.message}</p>}
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700">Vai trò</label>
								<select id="role" {...register("role")} className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50">
									<option value="Admin">Quản trị viên</option>
									<option value="User">Người dùng</option>
									<option value="Guest">Khách</option>
								</select>
							</div>
							<div>
								<label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-700">Trạng thái</label>
								<select id="status" {...register("status")} className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50">
									<option value="Active">Đang hoạt động</option>
									<option value="Inactive">Ngừng hoạt động</option>
								</select>
							</div>
						</div>

						<div>
							<label htmlFor="avatar" className="mb-2 block text-sm font-medium text-slate-700">Đường dẫn ảnh đại diện</label>
							<div className="relative">
								<Link2 size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
								<input id="avatar" type="url" placeholder="https://example.com/avatar.jpg" {...register("avatar")} className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50" />
							</div>
							<p className="mt-2 text-xs text-slate-500">Dùng URL ảnh công khai để hiển thị ảnh đại diện.</p>
						</div>
					</div>
					<div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
						<button type="button" onClick={() => reset()} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
							<RotateCcw size={16} /> Đặt lại
						</button>
						<button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100">
							<Save size={16} /> Lưu thay đổi
						</button>
					</div>
				</section>

				<aside className="space-y-5">
					<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
						<div className="mb-5 flex items-center justify-between">
							<h2 className="text-sm font-semibold text-slate-900">Xem trước hồ sơ</h2>
							<Eye size={17} className="text-slate-400" />
						</div>
						<div className="flex flex-col items-center border-b border-slate-100 pb-5 text-center">
							{avatar ? (
								<img src={avatar} alt="Ảnh đại diện xem trước" className="mb-3 size-20 rounded-full border-4 border-slate-100 object-cover" />
							) : (
								<div className="mb-3 flex size-20 items-center justify-center rounded-full bg-teal-50 text-teal-700"><UserRound size={32} /></div>
							)}
							<p className="max-w-full break-words text-sm font-semibold text-slate-900">{watch("name") || "Tên người dùng"}</p>
							<p className="mt-1 max-w-full break-all text-xs text-slate-500">{watch("email") || "email@congty.com"}</p>
						</div>
						<div className="space-y-3 pt-4 text-sm">
							<div className="flex items-center justify-between gap-3"><span className="text-slate-500">Vai trò</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{role === "Admin" ? "Quản trị viên" : role === "User" ? "Người dùng" : "Khách"}</span></div>
							<div className="flex items-center justify-between gap-3"><span className="text-slate-500">Trạng thái</span><span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700"><span className={`size-1.5 rounded-full ${watch("status") === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />{watch("status") === "Active" ? "Đang hoạt động" : "Ngừng hoạt động"}</span></div>
						</div>
					</section>

					<section className={`rounded-xl border p-4 ${role === "Admin" ? "border-amber-200 bg-amber-50" : "border-teal-100 bg-teal-50"}`}>
						<div className="flex gap-3">
							<ShieldCheck size={19} className={role === "Admin" ? "shrink-0 text-amber-700" : "shrink-0 text-teal-700"} />
							<div>
								<p className={`text-sm font-semibold ${role === "Admin" ? "text-amber-900" : "text-teal-900"}`}>Quyền truy cập</p>
								<p className={`mt-1 text-xs leading-5 ${role === "Admin" ? "text-amber-800" : "text-teal-800"}`}>
									{role === "Admin" ? "Có toàn quyền quản lý người dùng và cài đặt hệ thống." : role === "User" ? "Có thể sử dụng các tính năng dành cho thành viên." : "Chỉ có quyền xem nội dung được chia sẻ."}
								</p>
							</div>
						</div>
					</section>

					<details className="rounded-xl border border-slate-200 bg-white shadow-sm">
						<summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
							<FlaskConical size={16} /> Công cụ kiểm tra biểu mẫu
						</summary>
						<div className="space-y-2 border-t border-slate-100 p-4">
							<button type="button" onClick={() => handleEdit(userEdited)} className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">Nạp hồ sơ mẫu</button>
							<button type="button" onClick={() => setValue('name', 'HungNV')} className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">Điền nhanh tên mẫu</button>
							<button type="button" onClick={handlePrev} className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">In dữ liệu hiện tại ra console</button>
							<button type="button" onClick={() => setError("email", { type: "server", message: "Email đã tồn tại" })} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"><CircleAlert size={14} /> Mô phỏng lỗi email từ API</button>
							<button type="button" onClick={handleClearErrors} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"><Check size={14} /> Xóa thông báo lỗi</button>
						</div>
					</details>
				</aside>
			</form>
		</div>
	)
}

export default Orders;