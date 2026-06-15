import {
	LayoutDashboard,
	Users,
	Package,
	ShoppingCart,
	Settings,
} from "lucide-react";

export const sidebarMenus = [
	{
		title: "Dashboard",
		path: "/",
		icon: LayoutDashboard,
	},
	{
		title: "Users",
		path: "/users",
		icon: Users,
	},
	{
		title: "Products",
		path: "/products",
		icon: Package,
	},
	{
		title: "Orders",
		path: "/orders",
		icon: ShoppingCart,
	},
	{
		title: "Settings",
		path: "/settings",
		icon: Settings,
	},
];