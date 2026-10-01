import { useEffect, useState } from "react";
import CurrentProduct from "@/components/dashboard/CurrentProduct";
import CurrentUser from "@/components/dashboard/CurrentUser";
import ListCard from "@/components/dashboard/ListCard";
import ProductChart from "@/components/dashboard/ProductChart";
import type { ProductType } from "@/types/product";
import type { User } from "@/types/user";
import { getUsers } from "@/services/userApi";
import { getProduct } from "@/services/productApi";

const Dashboard = () => {
	const [listProduct, setListProduct] = useState<ProductType[]>([]);
	const [listUsers, setListUsers] = useState<User[]>([]);

	useEffect(() => {

		const fetchProducts = async () => {
			try {
				const res = await getProduct(1, 100000, '', '');
				setListProduct(res.data)
			} catch (error) {
				//console.error('Unable to fetch users for dashboard:', error);
				setListProduct([]);
			}
		}

		fetchProducts();

		const fetchUsers = async () => {
			try {
				const res = await getUsers(1, 10000, '', 'All', 'All');
				setListUsers(res.data);
			} catch (error) {
				//console.error('Unable to fetch users for dashboard:', error);
				setListUsers([]);
			}
		};

		fetchUsers();
	}, []);

	const grouped = listProduct.reduce<Record<string, number>>((acc, item: ProductType) => {
		acc[item.productCategory] = (acc[item.productCategory] || 0) + 1;
		return acc;
	}, {});

	const num_categories = Object.keys(grouped).length;

	const totalPrice = listProduct.reduce((acc, item: ProductType) => {
		return acc + Number(item.productPrice)
	}, 0);

	const currentProduct = listProduct.slice(Math.max(listProduct.length - 5, 0), listProduct.length);
	const currentUsers = listUsers.slice(Math.max(listUsers.length - 5, 0), listUsers.length);

	const chartData = Object.entries(grouped)
		.map(([category, total]) => ({ category, total }))
		.sort((first, second) => second.total - first.total)
		.slice(0, 5);
	return (
		<>
			<section className="space-y-6 py-5 sm:py-7">
				<div>
					<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">Workspace</p>
					<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Dashboard overview</h1>
					<p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">A clear view of your users and product catalog.</p>
				</div>
				<ListCard listProduct={listProduct} listUsers={listUsers} num_categories={num_categories} totalPrice={totalPrice} />
				<ProductChart chartData={chartData} />
				<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
					<CurrentProduct currentProduct={currentProduct} />
					<CurrentUser currentUsers={currentUsers} />
				</div>
			</section>

		</>
	)
}

export default Dashboard;