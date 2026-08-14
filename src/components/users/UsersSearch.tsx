import { LuCirclePlus, LuSearch } from "react-icons/lu";

interface UsersSearchProps {
    search: string;
    setSearch: (search: string) => void;
}

const UsersSearch = ({search, setSearch} : UsersSearchProps) => {
    return (
        <>
            <div className="user-control flex justify-between mb-6">
                <div className="w-full max-w-sm min-w-[200px] relative">
                    <div className="relative">
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Search for users..." value={search} onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="user-control__right max-w-[150px] w-full">
                    <button className="user-control__btn p-2 border rounded-3xl w-full bg-slate-700 text-white flex items-center justify-center gap-2 hover:bg-slate-400">
                        <LuCirclePlus />
                        Add User
                    </button>
                </div>
            </div>
        </>
    )
}

export default UsersSearch;