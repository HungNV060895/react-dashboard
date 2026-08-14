import type { User } from "@/types/user";

export const users: User[] = [
    {
        id: 1,
        name: 'HunggNV',
        email: 'hung@gmail.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: 2,
        name: 'HunggNV',
        email: 'hung@gmail.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 3,
        name: 'Hung NV',
        email: 'hung.nv@gmail.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
        id: 4,
        name: 'Nguyen Van A',
        email: 'nguyenvana@gmail.com',
        role: 'User',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
        id: 5,
        name: 'Nguyen Van B',
        email: 'nguyenb@gmail.com',
        role: 'User',
        status: 'Inactive',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
]