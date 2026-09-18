import { NavLink } from "react-router-dom";
import { sidebarMenus } from "@constants/menu";


const Sidebar = () => {
	return (
		<aside className='w-64 p-4 shrink-0 bg-sidebar text-sidebar-text h-screen hidden lg:block'>
			<div className="p-6 text-xl font-bold">
				My Dashboard
			</div>
			<nav>
				{sidebarMenus.map((item) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								`
								flex items-center gap-3
								px-6 py-3
								rounded-lg
								hover:bg-slate-700 hover:after:opacity-100
								transition-all
								relative
								after:w-2 after:h-2 after:bg-blue-600 after:rounded-full after:absolute after:right-4 after:opacity-0
								${isActive ? "after:opacity-100 bg-slate-700" : ""}`
							}
						>
							<Icon size={18} />
							<span>{item.title}</span>
						</NavLink>
					);
				})}
			</nav>
		</aside>

	);
};

export default Sidebar;