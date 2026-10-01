import { sidebarMenus } from "@constants/menu";
import { PanelsTopLeft } from "lucide-react";
import SidebarItem from "./SidebarItem";

type TSidebar = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	mobileOpen: boolean;
	onNavigate: () => void;
};


const Sidebar = ({ isOpen, setIsOpen, mobileOpen, onNavigate }: TSidebar) => {
	return (
		<aside
			className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col overflow-hidden bg-slate-950 px-4 py-5 text-white shadow-2xl shadow-slate-950/10 transition-[width,transform] duration-300 ease-out lg:fixed lg:z-40 lg:translate-x-0 lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${isOpen ? "lg:w-64 lg:px-4" : "lg:w-20 lg:px-2"}`}
		>
			<div className={`flex h-12 shrink-0 items-center gap-3 px-2 ${isOpen ? "lg:justify-start" : "lg:justify-center"}`}>
				<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-slate-950"><PanelsTopLeft size={19} /></span>
				<span className={`truncate text-base font-semibold tracking-tight transition-opacity ${isOpen ? "lg:opacity-100" : "lg:hidden"}`}>
					Northstar <span className="font-normal text-slate-400">Admin</span>
				</span>
			</div>

			<p className={`mb-2 mt-9 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${isOpen ? "lg:block" : "lg:hidden"}`}>
				Workspace
			</p>
			<nav aria-label="Main navigation" className="flex flex-col gap-1">
				{sidebarMenus.map((item) => (
					<SidebarItem key={item.path} item={item} isOpen={isOpen} setIsOpen={setIsOpen} onNavigate={onNavigate} />
				))}
			</nav>
			<div className="mt-auto rounded-xl border border-white/10 bg-white/[0.04] p-3">
				<p className={`text-xs font-medium text-slate-200 ${isOpen ? "lg:block" : "lg:hidden"}`}>Workspace status</p>
				<div className={`mt-2 flex items-center gap-2 text-xs text-slate-400 ${isOpen ? "lg:flex" : "lg:hidden"}`}>
					<span className="size-2 rounded-full bg-emerald-400" /> All systems operational
				</div>
				<div className={`mx-auto mt-1 hidden size-2 rounded-full bg-emerald-400 ${isOpen ? "lg:hidden" : "lg:block"}`} title="All systems operational" />
			</div>
		</aside>
	);
};

export default Sidebar;