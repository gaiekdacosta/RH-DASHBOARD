import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/services/api";
import SelectPeriod from "../selectPeriod/selectPeriod";
import { CircularProgress } from "../ui/progress";

const fetchApplicationsApprove = async (period: number) => {
    const { data } = await api.get(`/statusCandidaturas/${period}/APROVADA`);
    return data.data;
};

const fetchVacanciesByStatus = async (period: number, status: string) => {
    const { data } = await api.get(`/statusVagas/${period}/${status}`);
    return data.data;
};

const TopCharts = () => {
    const [periodApprove, setPeriodApprove] = useState(60);
    const [periodOpen, setPeriodOpen] = useState(60);
    const [periodCompleted, setPeriodCompleted] = useState(60);

    const { data: applicationsApprove } = useQuery({
        queryKey: ["applicationsApprove", periodApprove],
        queryFn: () => fetchApplicationsApprove(periodApprove),
    });

    const { data: openVacancies } = useQuery({
        queryKey: ["openVacancies", periodOpen],
        queryFn: () => fetchVacanciesByStatus(periodOpen, "PENDENTE"),
    });

    const { data: vacanciesCompleted } = useQuery({
        queryKey: ["vacanciesCompleted", periodCompleted],
        queryFn: () => fetchVacanciesByStatus(periodCompleted, "CONCLUIDA"),
    });

    return (
        <div className="flex justify-around rounded-md h-32 w-full bg-[#252728]">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold -mb-2 text-gray-100">
                        Candidaturas Aprovadas
                    </h3>
                    <p className="font-bold -mb-2 text-[28px]">
                        {applicationsApprove?.candidaturasEncontradas || 0}
                    </p>
                    <SelectPeriod value={periodApprove} onChange={setPeriodApprove} />
                </div>
                <CircularProgress color='#5342D6' value={applicationsApprove?.porcentagem || 0} />
            </div>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold -mb-2 text-gray-100">
                        Vagas em Aberto
                    </h3>
                    <p className="font-bold -mb-2 text-[28px]">
                        {openVacancies?.vagasEncontradas || 0}
                    </p>
                    <SelectPeriod value={periodOpen} onChange={setPeriodOpen} />
                </div>
                <CircularProgress color='#8D2FEA' value={openVacancies?.porcentagem || 0} />
            </div>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold -mb-2 text-gray-100">
                        Vagas Concluidas
                    </h3>
                    <p className="font-bold -mb-2 text-[28px]">
                        {vacanciesCompleted?.vagasEncontradas || 0}
                    </p>
                    <SelectPeriod value={periodCompleted} onChange={setPeriodCompleted} />
                </div>
                <CircularProgress color='#C02BCD' value={vacanciesCompleted?.porcentagem || 0} />
            </div>
        </div>
    );
};

export default TopCharts;
