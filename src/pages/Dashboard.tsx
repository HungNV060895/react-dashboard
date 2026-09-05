import CurrentProduct from "@/components/dashboard/CurrentProduct";
import ListCard from "@/components/dashboard/ListCard";
import type {ProductType} from "@/types/product";
import type { User } from "@/types/user";

const Dashboard = () => {
    const listProduct: ProductType[] = JSON.parse(localStorage.getItem('dataProducts') || '[]');
    const listUsers: User[] = JSON.parse(localStorage.getItem('dataUsers') || '[]');
    const grouped = listProduct.reduce<Record<string, number>>((acc, item: ProductType) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const num_categories = Object.keys(grouped).length;

    const totalPrice = listProduct.reduce((acc, item: ProductType) => {
        return acc + Number(item.price)
    }, 0);

    return (
        <>
            <h1 className="text-2xl text-slate-950 dark:text-white mb-5">Welcome back! Here's what's happening with your business.</h1>
            <ListCard listProduct={listProduct} listUsers={listUsers} num_categories={num_categories} totalPrice={totalPrice}/>
            <CurrentProduct />
        </>
    )
}

export default Dashboard;