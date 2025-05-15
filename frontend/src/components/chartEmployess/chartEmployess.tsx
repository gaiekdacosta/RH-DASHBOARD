import { useMemo, useState } from "react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { api } from "@/src/services/api"
import { useQuery } from "@tanstack/react-query"

const fetchEmployees = async () => {
    const { data } = await api.get('/colaboradores')
    return data
}

type ExtendedChartConfig = ChartConfig & {
    [key: string]: {
        label: string;
        color: string;
        demitidosColor: string;
    };
};

const ChartEmployees = () => {
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("tecnologia")

    const { data: employeesData } = useQuery({
        queryKey: ["employees"],
        queryFn: fetchEmployees,
    });

    const chartData = useMemo(() => {
        if (!employeesData) return [];

        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        let techTotal = 0;
        let adminTotal = 0;
        let techDemitidosTotal = 0;
        let adminDemitidosTotal = 0;

        return months.map(month => {
            techTotal += (employeesData.colaboradores_tec[month]?.admitidos || 0) -
                (employeesData.colaboradores_tec[month]?.demitidos || 0);
            adminTotal += (employeesData.colaboradores_adm[month]?.admitidos || 0) -
                (employeesData.colaboradores_adm[month]?.demitidos || 0);

            techDemitidosTotal += employeesData.colaboradores_tec[month]?.demitidos || 0;
            adminDemitidosTotal += employeesData.colaboradores_adm[month]?.demitidos || 0;

            return {
                month,
                [`${activeChart}_ativos`]: activeChart === 'tecnologia' ? techTotal : adminTotal,
                [`${activeChart}_demitidos`]: activeChart === 'tecnologia' ? techDemitidosTotal : adminDemitidosTotal,
                tecnologia: techTotal,
                administrativo: adminTotal
            };
        });
    }, [employeesData, activeChart]);

    const chartConfig = {
        tecnologia: {
            label: "Tecnologia",
            color: "#6FE7DD",
            demitidosColor: "#FF6B6B"
        },
        administrativo: {
            label: "Administrativo",
            color: "#F0B86E",
            demitidosColor: "#FFA07A"
        },
    } as ExtendedChartConfig;

    const total = useMemo(() => {
        if (!employeesData) return { tecnologia: 0, administrativo: 0 };

        return {
            tecnologia: employeesData.totais.tecnologia,
            administrativo: employeesData.totais.administrativo
        };
    }, [employeesData]);

    if (!employeesData) {
        return <div>Carregando...</div>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center p-2">
                    <CardTitle className="text-[18px]">Colaboradores</CardTitle>
                    <CardDescription className="-mt-1 text-[13px]">
                        Todos os colaboradores ativos e inativos dos ultimos meses
                    </CardDescription>
                </div>
                <div className="flex">
                    {["tecnologia", "administrativo"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="
                                    cursor-pointer 
                                    relative 
                                    flex 
                                    flex-1 
                                    flex-col 
                                    justify-center 
                                    px-6 
                                    text-left 
                                    data-[active=true]:text-primary
                                    "
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-[12px] font-semibold">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-sm font-bold leading-none">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <ChartContainer config={chartConfig} className="aspect-auto h-[160px] w-full">
                <LineChart data={chartData} margin={{ left: 5, right: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={true}
                        axisLine={false}
                        tickMargin={5}
                        minTickGap={12}
                        tickFormatter={(value) => value}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                nameKey="views"
                                labelFormatter={(value: string) => value}
                                formatter={(value: any, name: any) => {
                                    return [name,' ', value];
                                }}
                            />
                        }
                    />
                    <Line
                        dataKey={`${activeChart}_ativos`}
                        name="Ativos" 
                        type="monotone"
                        stroke={chartConfig[activeChart].color}
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        dataKey={`${activeChart}_demitidos`}
                        name="Demitidos" 
                        type="monotone"
                        stroke={chartConfig[activeChart].demitidosColor}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>
        </Card>
    )
}

export default ChartEmployees;