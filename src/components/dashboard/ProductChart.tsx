import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ChartDataProps {
    category: string,
    total: number
}

import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);
    return isMobile;
};

const ProductChart = ({ chartData }: { chartData: ChartDataProps[] }) => {
    const isMobile = useIsMobile();
    return (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 dark:border-slate-700 sm:px-5">
                <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white"><BarChart3 size={18} className="text-teal-700 dark:text-teal-300" /> Products by category</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Catalog distribution across your product categories.</p>
            </div>
            {chartData.length > 0 ? (
                    <div className="px-2 py-4 sm:px-5 sm:py-5">
                        <ResponsiveContainer width="100%" height={isMobile ? 280 : 340}>
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 8,
                                    right: isMobile ? 4 : 16,
                                    left: isMobile ? -20 : 0,
                                    bottom: isMobile ? 10 : 4
                                }}
                            >
                                <defs>
                                    <linearGradient id="tealBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0f766e" />
                                        <stop offset="100%" stopColor="#5eead4" />
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="category"
                                    stroke="#94a3b8"
                                    interval={isMobile ? "preserveStartEnd" : 0}
                                    angle={isMobile ? -32 : 0}
                                    textAnchor={isMobile ? "end" : "middle"}
                                    height={isMobile ? 75 : 50}
                                    tick={{ fontSize: isMobile ? 10 : 12, fill: "#64748b" }}
                                    tickFormatter={(v) =>
                                        isMobile && v.length > 17 ? v.slice(0, 17) + "..." : v
                                    }
                                />
                                <YAxis allowDecimals={false} width={32} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={false}
                                    contentStyle={{
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        borderRadius: "8px",
                                        color: "#f8fafc",
                                        padding: "8px 12px",
                                    }}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} opacity={0.6} />
                                <Bar dataKey="total" name="Products" fill="url(#tealBar)" radius={[5, 5, 0, 0]} maxBarSize={72} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : <p className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">No category data available yet.</p>}
        </section>
    )
}

export default ProductChart;