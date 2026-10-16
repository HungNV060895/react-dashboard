
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Guest';
    status: 'Active' | 'Inactive';
    avatar: string
}

export type FormError = Partial<Record<keyof FormState, string>>;

export interface FormState {
    id: string,
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Guest',
    status: 'Active' | 'Inactive',
    avatar: string
}


export interface UpdateUserPayload {
    data: User,
    id: string
}