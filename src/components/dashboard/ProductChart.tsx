import { LuChartPie } from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartDataProps {
    category: string,
    total: number
}



const ProductChart = ({chartData} : {chartData: ChartDataProps[]}) => {

    console.log(chartData);
    return (
        <>
            <h2 className="text-2xl text-slate-950 dark:text-white mb-5"><LuChartPie className="inline-block relative bottom-1" /> Chart Product</h2>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    responsive
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5
                    }}
                >
                    <XAxis dataKey="category" stroke="#ccc" />
                    <YAxis width="auto" stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" fillOpacity={0.85} radius={[6, 6, 0, 0]} barSize={70}/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default ProductChart;