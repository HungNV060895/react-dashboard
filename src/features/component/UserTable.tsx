import { Pencil, Trash2 } from "lucide-react";
import { useUsers } from "@features/hooks/useUser";
import type { User } from "@features/types/user";

interface IUser {
    data: User[],
    isLoading: boolean,
    isFetching: boolean,
    error: Error | null,
    onDelete: (id: string) => void;
    onUpdate: (userEdited: User, id: string) => void
}


const UserTable = ({data, isLoading, isFetching, onDelete, onUpdate}: IUser) => {
    return (
        <>
            <h1>Test Query</h1>
			{isLoading && <p>Loading...</p>}
			{isFetching && <p>Updateing...</p>}
			{/* {error && <p>Error: {error.message}</p>} */}
			{data && (
				<ul>
					{data.map((user: User) => (
						<li key={user.id}>
							{user.name}
							<button className="border border-red-500 text-red-400 p-2 rounded-lg ml-5" onClick={() => onDelete(user.id)}>
								<Trash2 size={16} />
							</button>
							<button className="border border-yellow-500 text-yellow-400 p-2 rounded-lg ml-5" 
								onClick={() => onUpdate(user, user.id)}>
								<Pencil size={16} />
							</button>
						</li>
					))}
				</ul>
			)}
        </>
    )
}

export default UserTable;