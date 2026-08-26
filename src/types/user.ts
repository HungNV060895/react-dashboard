
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
    avatar: string
}

export interface Error {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
}