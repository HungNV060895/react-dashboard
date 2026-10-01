import { ChevronRight, House } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeTitles: Record<string, string> = {
	"/": "Dashboard",
	"/users": "Users",
	"/products": "Products",
	"/orders": "Orders",
	"/settings": "Settings",
};

const Breadcrumb = () => {
	const { pathname } = useLocation();
	const currentTitle = routeTitles[pathname] ?? "Dashboard";
	const isDashboard = pathname === "/";

	return (
		<nav aria-label="Breadcrumb" className="flex min-h-12 items-center border-b border-slate-200/80 dark:border-slate-700/70">
			<ol className="flex min-w-0 items-center gap-2 text-sm">
				<li className={isDashboard ? "flex min-w-0 items-center" : "hidden min-w-0 items-center sm:flex"}>
					<Link
						to="/"
						aria-label="Dashboard"
						className={`inline-flex items-center gap-2 truncate transition-colors hover:text-teal-700 dark:hover:text-teal-300 ${isDashboard ? "font-semibold text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
					>
						<House size={15} aria-hidden="true" />
						<span className={isDashboard ? "" : "hidden md:inline"}>Dashboard</span>
					</Link>
				</li>
				{!isDashboard && (
					<>
						<li aria-hidden="true" className="hidden text-slate-300 sm:block dark:text-slate-600"><ChevronRight size={15} /></li>
						<li aria-current="page" className="min-w-0 truncate font-semibold text-slate-900 dark:text-white">
							<span className="sm:hidden">{currentTitle}</span>
							<span className="hidden sm:inline">{currentTitle}</span>
						</li>
					</>
				)}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
