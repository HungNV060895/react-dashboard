import { Moon, Sun } from "lucide-react";
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
        <button
            type="button"
            onClick={handleChangeMode}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}

export default Themes;