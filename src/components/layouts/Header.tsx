import { LuMenu } from "react-icons/lu";
import Themes from "./Themes";

type TSidebar = {
    onToggle: () => void
}

const Header = ({onToggle} : TSidebar) => {
    return (
        <>
            <header className="flex justify-end bg-gray-50 text-slate-950 dark:text-white px-4 dark:bg-gray-800 sticky top-0 z-10 w-full">
                <button onClick={()=> onToggle()} className="w-11 h-11 flex rounded-md items-center justify-center border border-gray-200 absolute left-2 top-1/2 -translate-y-1/2 hover:bg-slate-500 transition-all"><LuMenu /></button>
                <div className="h-16 max-w-52 w-full flex items-center gap-5 header-control">
                    <div className="flex items-center gap-2 header-control__info">
                        <div>
                            <img src="https://i.pravatar.cc/150?img=3" alt="Avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Hung NV</p>
                            <p className="text-xs text-gray-400">hungnv@admin.com</p>
                        </div>
                    </div>
                    <Themes/>
                </div>
            </header>
        </>
    )
}

export default Header