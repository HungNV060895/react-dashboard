import { LuUserCog, LuCodesandbox, LuChartColumnStacked, LuBadgeDollarSign } from "react-icons/lu";
import type {ProductType} from "@/types/product";
import type { User } from "@/types/user";

interface DashBoardProps {
    listProduct: ProductType[],
    listUsers: User[],
    num_categories: number,
    totalPrice: number
}

const ListCard = ({listProduct, listUsers, num_categories, totalPrice}: DashBoardProps) => {
    return (
        <>
            <ul className="list-card grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-16 text-white">
                <li className="bg-slate-800 border border-slate-600 p-4 rounded-lg relative">
                    <h3 className="list-card__title font-normal text-sm mb-5 text-[#94A3B8] uppercase">
                        <LuUserCog className="inline-block w-7 h-7 rounded-full p-1 absolute top-4 right-3 text-2xl bg-yellow-500/10 text-yellow-400" />Total Users
                    </h3>
                    <span className="text-3xl font-bold">{listUsers.length}</span>
                </li>
                <li className="bg-slate-800 border border-slate-600 p-4 rounded-lg relative">
                    <h3 className="list-card__title font-normal text-sm mb-5 text-[#94A3B8] uppercase">
                        <LuCodesandbox className="inline-block w-7 h-7 rounded-full absolute top-4 right-3 text-2xl bg-emerald-500/10 text-emerald-400 p-1" />Total Products
                        </h3>
                    <span className="text-3xl font-medium">{listProduct.length}</span>
                </li>
                <li className="bg-slate-800 border border-slate-600 p-4 rounded-lg relative">
                    <h3 className="list-card__title font-normal text-sm mb-5 text-[#94A3B8] uppercase">
                        <LuChartColumnStacked className="inline-block w-7 h-7 rounded-full absolute top-3 right-4 text-2xl bg-indigo-500/10 text-indigo-400 p-1" />Total Categories
                        </h3>
                    <span className="text-3xl font-medium">{num_categories}</span>
                </li>
                <li className="bg-slate-800 border border-slate-600 p-4 rounded-lg relative">
                    <h3 className="list-card__title font-normal text-sm mb-5 text-[#94A3B8] uppercase">
                        <LuBadgeDollarSign className="inline-block w-7 h-7 rounded-full absolute top-4 right-3 text-2xl p-1 uppercase bg-rose-500/10 text-rose-400" />Average Product Price
                        </h3>
                    <span className="text-3xl font-medium">{totalPrice.toLocaleString('vn-VN')} ₫</span>
                </li>
            </ul>
        </>
    )
}

export default ListCard;