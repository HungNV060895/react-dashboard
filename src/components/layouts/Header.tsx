import { LuChevronDown, LuBellDot, LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

const Header = () => {

    const [mode, setMode] = useState<string>(
        localStorage.getItem('themes') || 'dark'
    );
    
    const handleChangeMode = () => {
        mode === 'dark' ? setMode('light') : setMode('dark');
    }
    
    useEffect(() => {
        localStorage.setItem('themes', mode);

        if(mode === 'dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    }, [mode])

    console.log(mode);
    return (
        <>
            <header className="bg-gray-50 text-slate-950 dark:text-white p-4 dark:bg-gray-800">
                <h1 className="text-2xl font-bold">
                    My Dashboard
                </h1>
                <div className="h-16 max-w-64 w-full flex items-center gap-5 header-control">
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
                    <button onClick={() => handleChangeMode()} className="text-slate-950 btn-mode text-2xl mr-4 dark:text-white">
                        {
                            mode === 'dark' ? <LuSun /> : <LuMoon />
                        }
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header