import { useState } from "react";
import { createUser } from "@services/user.services";
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import UserForm from "@/components/UserForm";
import { UserFormValues } from "@/schemas/user.schema";

const Orders = () => {
	const [loading, setLoading] = useState(false);
	
	const handleCreate = async (data: UserFormValues) => {
		try {
			setLoading(true);

			const result = await createUser(data);

			console.log("User created successfully:", result);
		}
		catch(error){
			//Bắt error được đưa vào API và hiển thị thông báo lỗi cho người dùng
			//setError("email", { type: "server", message: "Email đã tồn tại" });
		}
		finally{
			setLoading(false);
		}
	}

	return (
		<>
			
			<div className="mx-auto max-w-6xl space-y-7 py-5 sm:py-7">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div>
						<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Quản lý tài khoản</p>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Thông tin người dùng</h1>
						<p className="mt-2 text-sm text-slate-500">Cập nhật hồ sơ và quyền truy cập của thành viên.</p>
					</div>
					<Link to="/users" className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:self-auto">
						<ArrowLeft size={16} /> Danh sách người dùng
					</Link>
				</div>
				<UserForm onSubmit={handleCreate} loading={loading} />
		</div>
		</>
	)
}

export default Orders;