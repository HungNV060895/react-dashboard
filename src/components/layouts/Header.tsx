import { Menu } from "lucide-react";
import Themes from "./Themes";

type TSidebar = {
    onToggle: () => void
}

const Header = ({onToggle} : TSidebar) => {
    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/90 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={onToggle}
                aria-label="Toggle navigation menu"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
                <Menu size={20} />
            </button>
            <div className="flex min-w-0 items-center gap-3">
                <Themes />
                <span aria-hidden="true" className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900 ring-2 ring-white dark:ring-slate-900">HN</div>
                    <div className="hidden min-w-0 sm:block">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">Hung NV</p>
                        <p className="max-w-36 truncate text-xs text-slate-500 dark:text-slate-400">hungnv@admin.com</p>
                    </div>
                </div>
            </div>
            </header>
    )
}

export default Header