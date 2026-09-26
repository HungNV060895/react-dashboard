import { sidebarMenus } from "@constants/menu";
import { LuLayoutDashboard } from "react-icons/lu";
import SidebarItem from "./SidebarItem";

type TSidebar = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void,
};

const Sidebar = ({ isOpen, setIsOpen}: TSidebar) => {
	return (
		<aside
			className={`
				${isOpen ? "w-64 p-4" : "w-60 p-2 translate-x-0 lg:w-20 lg:p-2 opacity-100"}
				shrink-0 bg-sidebar text-sidebar-text h-screen 
				opacity-0 lg:opacity-100 -translate-x-full lg:translate-x-0 fixed top-[64px] lg:top-0 lg:relative left-0 bottom-0 
				lg:block
				transition-[width,padding] duration-300 ease-in-out
				overflow-hidden z-10
		`}
		>
			{/* Logo / Brand */}
			<div
				className={`
				flex items-center gap-3 px-2 py-4 h-16
				${isOpen ? "justify-center" : "justify-center gap-0"}
				transition-all duration-300
			`}
			>
				<LuLayoutDashboard className={`${isOpen ? "hidden" : "text-3xl shrink-0"}`} />
				<span
					className={`
						text-2xl font-bold whitespace-nowrap
						transition-all duration-300
						${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}
					`}
				>
					My Dashboard
				</span>
			</div>

			{/* Menu */}
			<nav className="mt-4 flex flex-col gap-1">
				{sidebarMenus.map((item) => (
					<SidebarItem key={item.path} item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;