import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type TSidebarItem = {
	item: {
		path: string;
		title: string;
		icon: LucideIcon;
	};
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onNavigate: () => void;
};

const SidebarItem = ({ item, isOpen, setIsOpen, onNavigate }: TSidebarItem) => {
	const Icon = item.icon;
	return (
		<NavLink
			onClick={() => {
				setIsOpen(true);
				onNavigate();
			}}
			to={item.path}
			title={item.title}
			aria-label={item.title}
			className={({ isActive }) =>
				`
					group relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150
					focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300
					${isActive ? "bg-teal-400/15 text-teal-200" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}
					${isOpen ? "lg:justify-start" : "lg:justify-center lg:px-0"}
				`
			}
		>
			{({ isActive }) => (
				<>
					<Icon size={18} className="shrink-0" />

					<span
						className={`truncate transition-opacity ${isOpen ? "lg:opacity-100" : "lg:hidden"}`}
					>
						{item.title}
					</span>

					{isActive && (
						<span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-teal-300" />
					)}
				</>
			)}
		</NavLink>
	);
};

export default SidebarItem;