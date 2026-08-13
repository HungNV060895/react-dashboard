import { de } from "zod/locales"
import { users } from  "@/data/users";

const UserTable = () => {
    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="bg-neutral-secondary-soft border-b border-default">
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
                    {
                        users.map((user) => (
                            <tr key={user.id} className="odd:bg-white odd:gray:bg-gray-900 even:bg-gray-50 even:grey:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4">
                                    <img src={user.avatar} alt={user.name} width={40} />
                                </td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">{user.status}</td>
                                <td className="px-6 py-4">
                                    <button className="mr-2 btn-primary rounded-full bg-green-500 px-5 py-2 font-semibold text-white shadow-md hover:bg-green-700">Edit</button>
                                    <button className="btn-danger  rounded-full bg-red-500 px-5 py-2 font-semibold text-white shadow-md hover:bg-red-700">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default UserTable;