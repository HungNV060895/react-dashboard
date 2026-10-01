import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_CHANGE_EVENT = "dashboard-theme-change";

const getSavedMode = () => localStorage.getItem("themes") === "light" ? "light" : "dark";

const Themes = () => {
    const [mode, setMode] = useState(getSavedMode);

    const handleChangeMode = () => {
        const nextMode = mode === "dark" ? "light" : "dark";
        localStorage.setItem("themes", nextMode);
        setMode(nextMode);
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }

    useEffect(() => {
        const syncMode = () => setMode(getSavedMode());
        window.addEventListener(THEME_CHANGE_EVENT, syncMode);
        window.addEventListener("storage", syncMode);
        return () => {
            window.removeEventListener(THEME_CHANGE_EVENT, syncMode);
            window.removeEventListener("storage", syncMode);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("themes", mode);
        document.documentElement.classList.toggle("dark", mode === "dark");
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