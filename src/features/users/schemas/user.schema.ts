import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(3, "Name tối thiểu 3 ký tự"),

	email: z
		.string()
		.nonempty("Email không được để trống")
		.email("Email không hợp lệ"),

	role: z.enum(["Admin", "User", "Guest"], {
		message: "Vai trò không hợp lệ"
	}),

	status: z.enum(["Active", "Inactive"], {
		message: "Trạng thái không hợp lệ"
	}),

	birthday: z.date().nullable().optional(),

	avatar: z
			.string()
			.nonempty("URL ảnh không được để trống")
			.url("URL ảnh không hợp lệ"),
})

//Tự động tạo ra type từ schema
//z.inter chính là cầu nối giữa schema và type, giúp chúng ta không cần phải viết type thủ công
export type UserFormValues = z.infer<typeof userSchema>;