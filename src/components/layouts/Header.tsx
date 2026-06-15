import { LuChevronDown, LuBellDot } from "react-icons/lu";


const Header = () => {
    return (
        <>
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">
                    My Dashboard
                </h1>
                <div className="h-16 max-w-60 w-full flex items-center gap-5 header-control">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center header-control__notification">
                        <LuBellDot />
                    </div>
                    <div className="flex items-center gap-2 header-control__info">
                        <div>
                            <p className="text-sm">Hung NV</p>
                            <p className="text-xs text-gray-400">Admin</p>
                        </div>
                        <div>
                            <img src="https://i.pravatar.cc/150?img=3" alt="Avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        <ul className="absolute right-0 top-[52px] w-48 bg-gray-800 text-white p-4 header-control__info-dropdown">
                            <li>
                                <a href="#">Profile</a>
                            </li>
                            <li>
                                <a href="#">Settings</a>
                            </li>
                            <li>
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                        <LuChevronDown  />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header