import { useEffect, useState } from "react";
import CurrentProduct from "@/components/dashboard/CurrentProduct";
import CurrentUser from "@/components/dashboard/CurrentUser";
import ListCard from "@/components/dashboard/ListCard";
import ProductChart from "@/components/dashboard/ProductChart";
import type {ProductType} from "@/types/product";
import type { User } from "@/types/user";
import { getUsers } from "@/services/userApi";

const Dashboard = () => {
    const listProduct: ProductType[] = JSON.parse(localStorage.getItem('dataProducts') || '[]');
    const [listUsers, setListUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers(1, 1000, '', 'All', 'All');
                setListUsers(res.data);
            } catch (error) {
                console.error('Unable to fetch users for dashboard:', error);
                setListUsers([]);
            }
        };

        fetchUsers();
    }, []);

    const grouped = listProduct.reduce<Record<string, number>>((acc, item: ProductType) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const num_categories = Object.keys(grouped).length;

    const totalPrice = listProduct.reduce((acc, item: ProductType) => {
        return acc + Number(item.price)
    }, 0);

    const currentProduct = listProduct.slice(Math.max(listProduct.length - 5, 0), listProduct.length);
    const currentUsers = listUsers.slice(Math.max(listUsers.length - 5, 0), listUsers.length);

    const chartData = Object.entries(grouped).map(([category, total]) => ({
        category, total
    }))

    return (
        <>
            <h1 className="text-2xl text-slate-950 dark:text-white mb-5">Welcome back! Here's what's happening with your business.</h1>
            <ListCard listProduct={listProduct} listUsers={listUsers} num_categories={num_categories} totalPrice={totalPrice}/>
            <ProductChart chartData={chartData}/>
            <CurrentProduct currentProduct={currentProduct} />
            <CurrentUser currentUsers={currentUsers} />
        </>
    )
}

export default Dashboard;