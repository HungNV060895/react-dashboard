
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
    avatar: string
}

export type FormError = Partial<Record<keyof FormState, string>>;

export interface FormState {
    id: number,
    name: string;
    email: string;
    role: 'Admin',
    status: 'Active',
    avatar: ''
}


