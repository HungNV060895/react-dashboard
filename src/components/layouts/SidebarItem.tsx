import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

type TSidebarItem = {
	item: {
		path: string;
		title: string;
		icon: IconType;
	};
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void,
};

const SidebarItem = ({ item, isOpen, setIsOpen }: TSidebarItem) => {
	const Icon = item.icon;
	return (
		<NavLink
			onClick={() => setIsOpen(true)}
			to={item.path}
			title={!isOpen ? item.title : undefined}
			className={({ isActive }) =>
				`
					flex items-center gap-3 py-3 rounded-lg relative
					transition-all duration-200
					hover:bg-slate-700
					${isOpen ? "px-6 justify-start" : "px-3 md:px-0 md:gap-0 md:justify-center"}
					${isActive ? "bg-slate-700 text-blue-500" : ""}
				`
			}
		>
			{({ isActive }) => (
				<>
					<Icon size={20} className="shrink-0" />

					<span
						className={`
						whitespace-nowrap text-sm font-medium
						transition-all duration-300
					${isOpen ? "lg:opacity-100 max-w-[200px]" : "lg:opacity-0 max-w-0"}
			`}
					>
						{item.title}
					</span>

					{isOpen && isActive && (
						<span className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full" />
					)}
				</>
			)}
		</NavLink>
	);
};

export default SidebarItem;