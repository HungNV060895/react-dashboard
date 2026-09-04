import { LuUserCog, LuCodesandbox, LuChartColumnStacked, LuBadgeDollarSign } from "react-icons/lu";
import type {ProductType} from "@/types/product";

const ListCard = ({listProduct}: {listProduct: ProductType[]}) => {
    return (
        <>
            <ul className="list-card grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <li className="bg-orange-200 p-4">
                    <h3 className="list-card__title font-normal text-sm mb-5">
                        <LuUserCog className="inline-block mr-2 text-2xl" />Total Users
                    </h3>
                    <span className="text-xl font-medium">120</span>
                </li>
                <li className="bg-green-200 p-4">
                    <h3 className="list-card__title font-normal text-sm mb-5">
                        <LuCodesandbox className="inline-block mr-2 text-2xl" />Total Products
                        </h3>
                    <span className="text-xl font-medium">{listProduct.length}</span>
                </li>
                <li className="bg-violet-200 p-4">
                    <h3 className="list-card__title font-normal text-sm mb-5">
                        <LuChartColumnStacked className="inline-block mr-2 text-2xl" />Total Stock
                        </h3>
                    <span className="text-xl font-medium">230</span>
                </li>
                <li className="bg-red-200 p-4">
                    <h3 className="list-card__title font-normal text-sm mb-5">
                        <LuBadgeDollarSign className="inline-block mr-2 text-2xl" />Inventory Value
                        </h3>
                    <span className="text-xl font-medium">12,500,000₫</span>
                </li>
            </ul>
        </>
    )
}

export default ListCard;