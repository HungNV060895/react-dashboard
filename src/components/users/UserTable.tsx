import type { User } from "@/types/user";
import { LuPencil, LuTrash } from "react-icons/lu";

type UserTableProps = {
    data: User[];
    handleEditUser: (id: number) => void;
    handleDeleteUser: (id: number) => void;
    editUser: User | null,
    loading: boolean,
    iserror:  string
};

const UserTable = ({ data, handleEditUser, editUser, handleDeleteUser , loading, iserror }: UserTableProps) => {
    if (iserror) {
        return <p className="p-6 text-red-500 font-medium">{iserror}</p>;
    }

    if (loading) {
        return <div className="p-6">
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>;
    }

    return (
        <>
        {
            data.length === 0 ? (
                <p className="p-6 text-red-500 font-medium">Not found user.</p>
            ) : (
                <table className="w-full whitespace-nowrap text-sm text-left rtl:text-right text-body dark:color-black">
                    <thead className="bg-slate-700 border-b">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">Avatar</th>
                            <th scope="col" className="px-6 py-3 font-medium">Name</th>
                            <th scope="col" className="px-6 py-3 font-medium">Email</th>
                            <th scope="col" className="px-6 py-3 font-medium">Role</th>
                            <th scope="col" className="px-6 py-3 font-medium">Status</th>
                            <th scope="col" className="px-6 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id} className="odd:bg-white even:bg-[#F8FAFC] border-b dark:border-gray-300 dark:text-slate-950 border-gray-200 hover:bg-zinc-100 transition ease-in-out cursor-pointer">
                                <td className="px-6 py-4">
                                    {
                                        user.avatar ? 
                                        <img src={user.avatar} alt={user.name} width={40} /> : 
                                        <img src="https://placehold.net/avatar.svg" alt={user.name} width={40} />
                                    }
                                </td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">{user.status}</td>
                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <button onClick={() => handleEditUser(user.id)} className="flex items-center justify-center gap-1 mr-2 btn-primary rounded-full bg-green-500 px-3 py-2font-semibold text-white shadow-md hover:bg-green-700 transition-all"><LuPencil />Edit</button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="flex items-center justify-center gap-1 btn-danger rounded-full bg-red-500 px-3 py-2 font-semibold text-white shadow-md hover:bg-red-700 transition-all"><LuTrash />Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </>
    );
};

export default UserTable;