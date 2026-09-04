import ListCard from "@/components/dashboard/ListCard";
import type {ProductType} from "@/types/product";

const Dashboard = () => {
    const listProduct: ProductType[] = JSON.parse(localStorage.getItem('dataProducts') || '[]');
    return (
        <>
            <h1 className="text-2xl text-slate-950 mb-5">Welcome back! Here's what's happening with your business.</h1>
            <ListCard listProduct={listProduct} />
        </>
    )
}

export default Dashboard;