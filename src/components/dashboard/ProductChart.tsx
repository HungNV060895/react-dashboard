import { LuChartPie } from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ChartDataProps {
    category: string,
    total: number
}

const ProductChart = ({ chartData }: { chartData: ChartDataProps[] }) => {
    return (
        <>
            <h2 className="text-2xl text-slate-950 dark:text-white mb-5"><LuChartPie className="inline-block relative bottom-1" /> Chart Product</h2>
            {
                chartData ? (
                    <div className="chart-area mb-14">
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
                                <defs>
                                    <linearGradient id="purpleBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#C4B5FD" />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="category" stroke="#ccc" />
                                <Tooltip 
                                    cursor={false}
                                    contentStyle={{
                                        background: 'rgba(30, 41, 59, 0.95)',
                                        border: '1px solid rgba(30, 41, 59, 0.6)',
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        color: '#fff',
                                        padding: '10px 14px',
                                        boxShadow: '0 8px 24px rgba(139,92,246,0.35)',
                                    }}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                                <Bar dataKey="total" name="Total" fill="url(#purpleBar)" fillOpacity={0.85} radius={[6, 6, 0, 0]} barSize={100} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : <p>Biểu đồ đang được cập nhật...</p>
            }
        </>
    )
}

export default ProductChart;