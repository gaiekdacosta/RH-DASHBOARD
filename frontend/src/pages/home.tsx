import CardApplicants from "../components/cardApplicants";
import SideBar from "../components/navbar";
import TopCharts from "../components/topCharts";
import Vacancy from "../components/vacancy";
import ChartVacancy from "../components/chartVacancys/chartVacancys";
import ChartEmployees from "../components/chartEmployess/chartEmployess";
import { useQuery } from '@tanstack/react-query';
import { api } from "../services/api";
import vacanciesTypes from "../types/vacanciesTypes";
import VacancyLoading from "../components/vacancy/vacancyLoading";
import VacancyError from "../components/vacancy/vacancyError";
import ApplicantsTypes from "../types/applicantsTypes";
import { FaSearch } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";

const fetchVacancies = async () => {
    const { data } = await api.get('/vagas');
    return data.data;
};

const fetchApplications = async () => {
    const { data } = await api.get('/candidaturas/3')
    return data.data
}

const Home = () => {
    const [search, setSearch] = useState<string>('');

    const { data: vacancies, isLoading: vacanciesLoading, error: vacanciesError } = useQuery({
        queryKey: ["vacancies"],
        queryFn: fetchVacancies,
    });

    const { data: applications, isLoading: applicationsLoading, error: applicationsError } = useQuery({
        queryKey: ["applications"],
        queryFn: fetchApplications,
    });

    const filteredVacancies = vacancies?.filter((item: vacanciesTypes) =>
        item.titulo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex">
            <SideBar />
            <div className="flex flex-col mt-2 mr-2 ml-2 gap-2 w-[60%]">
                <TopCharts />
                {applicationsLoading && (
                    <div className="flex flex-col gap-1 justify-center items-center w-full ">
                        <ImSpinner8 className="text-4xl animate-spin" />
                        <p>Carregando informações sobre candidaturas...</p>
                    </div>
                )}
                {!applicationsError ?
                    <>
                        <h2 className="font-semibold text-[20px]">Ultimas Candidaturas</h2>
                        <div className="flex justify-between gap-2">
                            {applications?.map((item: ApplicantsTypes) =>
                                <CardApplicants
                                    key={item.id}
                                    urlImage={item.candidatos.foto_url}
                                    name={item.candidatos.nome}
                                    email={item.candidatos.email}
                                    score={item.nota_cv}
                                    vacancy={item.vagas.titulo}
                                />
                            )}
                        </div>
                    </>
                    :
                    <div className="flex w-full justify-center">
                        <p className="font-semibold text-red-400">
                            Desculpe um erro ao exibir as ultimas candidaturas
                        </p>
                    </div>
                }
                <ChartEmployees />
            </div>
            <div className="flex flex-col mt-2 w-[20%] mb-1">
                <div className="flex items-center w-full justify-between mb-2">
                    <h2 className="font-semibold">Vagas</h2>
                    <div className="relative w-[80%]">
                        <input
                            type="text"
                            placeholder="Buscar vagas"
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full rounded-md bg-background text-sm focus:outline-none"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                    </div>
                </div>
                <div className="max-h-[64vh] overflow-y-auto">
                    {filteredVacancies?.map((item: vacanciesTypes) =>
                        <Vacancy
                            key={item.id}
                            vacancyName={item.titulo}
                            status={item.status}
                            priority={item.prioridade}
                        />
                    )}
                    {vacanciesLoading && <VacancyLoading />}
                    {vacanciesError && <VacancyError />}
                </div>
                <ChartVacancy />
            </div>
        </div>
    );
}

export default Home;