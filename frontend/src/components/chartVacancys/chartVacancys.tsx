import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/src/components/ui/chart';
import { api } from '@/src/services/api';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const fetchVacanciesPerMonth = async () => {
    const { data } = await api.get('/vagasPorMes'); 
    return data.data;
};

const ChartVacancy = () => {
    const { data: vacanciesPerMonth, error } = useQuery({
        queryKey: ['vacanciesPerMonth'],
        queryFn: fetchVacanciesPerMonth,
    });

    const chartConfig = {
        vacancy: {
            label: "Vagas publicadas",
            color: "var(--color-primary)",
        },
    } satisfies ChartConfig

    return (
        <div className="bg-background rounded-md p-2 h-[27vh] mt-auto">
            <h2 className="mb-1 text-[15px] font-medium">Vagas publicadas por mês</h2>
            <ChartContainer config={chartConfig}>
                {!error ?
                    <BarChart accessibilityLayer data={vacanciesPerMonth} layout="vertical" margin={{ left: -25 }}>
                        <XAxis type="number" dataKey="vacancy" hide />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="vacancy" fill="var(--color-primary)" radius={5} />
                    </BarChart>
                    : 
                    <p className='text-center text-[14px] text-red-400 font-semibold'>
                        Desculpe, ocorreu um erro ao exibir informações
                    </p>
                }
            </ChartContainer>
        </div>
    );
}

export default ChartVacancy;