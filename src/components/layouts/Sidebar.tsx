import { NavLink } from "react-router-dom";
import { sidebarMenus } from "@constants/menu";


const Sidebar = () => {
	return (
		<aside className='w-64 p-4 shrink-0 bg-blue-200 h-screen'>
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
								hover:bg-slate-700
								transition
								${isActive ? "bg-slate-700" : ""}`
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