import { LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

const Themes = () => {
    const [mode, setMode] = useState<string>(
        localStorage.getItem('themes') || 'dark'
    );

    const handleChangeMode = () => {
        mode === 'dark' ? setMode('light') : setMode('dark');
    }

    useEffect(() => {
        localStorage.setItem('themes', mode);

        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode])
    return (
        <>
            <button onClick={() => handleChangeMode()} className="text-slate-950 btn-mode text-2xl dark:text-white absolute top-1/2 -translate-y-1/2 right-5">
                {
                    mode === 'dark' ? <LuSun /> : <LuMoon />
                }
            </button>
        </>
    )
}

export default Themes;