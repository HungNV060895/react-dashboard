import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),

	email: z
		.string()
		.nonempty("Email is required")
		.email("Please enter a valid email address"),

	role: z.enum(["Admin", "User", "Guest"], {
		message: "Please select a valid role"
	}),

	status: z.enum(["Active", "Inactive"], {
		message: "Please select a valid status"
	}),

	avatar: z.string().refine(
		(value) => value === "" || z.string().url().safeParse(value).success,
		"Avatar URL must be a valid URL"
	),
});

export type UserFormValues = z.infer<typeof userSchema>;