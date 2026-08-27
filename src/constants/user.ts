import type { FormState } from "@/types/user"

export const initialFormData: FormState = {
    id: 0,
    name: "",
    email: "",
    role: 'Admin',
    status: 'Active',
    avatar: ''
}