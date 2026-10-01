import { Boxes, CircleDollarSign, Tags, UsersRound } from "lucide-react";
import type {ProductType} from "@/types/product";
import type { User } from "@/types/user";

interface DashBoardProps {
    listProduct: ProductType[],
    listUsers: User[],
    num_categories: number,
    totalPrice: number
}

const ListCard = ({listProduct, listUsers, num_categories, totalPrice}: DashBoardProps) => {
	const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
	const metrics = [
		{ label: "Total users", value: listUsers.length.toLocaleString("en-US"), icon: UsersRound, tone: "bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-300" },
		{ label: "Products", value: listProduct.length.toLocaleString("en-US"), icon: Boxes, tone: "bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300" },
		{ label: "Categories", value: num_categories.toLocaleString("en-US"), icon: Tags, tone: "bg-sky-50 text-sky-800 dark:bg-sky-400/10 dark:text-sky-300" },
		{ label: "Catalog value", value: currency.format(totalPrice), icon: CircleDollarSign, tone: "bg-rose-50 text-rose-800 dark:bg-rose-400/10 dark:text-rose-300" },
	];

    return (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ label, value, icon: Icon, tone }) => (
                <li key={label} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone}`}><Icon size={18} /></span>
                    </div>
                    <p className="mt-4 break-words text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-[28px]">{value}</p>
                </li>
            ))}
        </ul>
    )
}

export default ListCard;