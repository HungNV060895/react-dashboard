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
                <li className="bg-orange-800 p-4 rounded-lg">
                    <h3 className="list-card__title font-normal text-sm mb-5 uppercase">
                        <LuUserCog className="inline-block mr-2 text-2xl" />Total Users
                    </h3>
                    <span className="text-xl font-medium">{listUsers.length}</span>
                </li>
                <li className="bg-green-800 p-4 rounded-lg">
                    <h3 className="list-card__title font-normal text-sm mb-5 uppercase">
                        <LuCodesandbox className="inline-block mr-2 text-2xl" />Total Products
                        </h3>
                    <span className="text-xl font-medium">{listProduct.length}</span>
                </li>
                <li className="bg-violet-800 p-4 rounded-lg">
                    <h3 className="list-card__title font-normal text-sm mb-5 uppercase">
                        <LuChartColumnStacked className="inline-block mr-2 text-2xl uppercase" />Total Categories
                        </h3>
                    <span className="text-xl font-medium">{num_categories}</span>
                </li>
                <li className="bg-red-800 p-4 rounded-lg">
                    <h3 className="list-card__title font-normal text-sm mb-5 uppercase">
                        <LuBadgeDollarSign className="inline-block mr-2 text-2xl uppercase" />Average Product Price
                        </h3>
                    <span className="text-xl font-medium">{totalPrice.toLocaleString('vn-VN')} ₫</span>
                </li>
            </ul>
        </>
    )
}

export default ListCard;