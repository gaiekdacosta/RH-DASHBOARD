import { FastifyInstance } from "fastify";
import { ApplicationsService } from "../services/applications";
import { VacanciesService } from "../services/vacancies";
import { EmployeesService } from "../services/employees";

const vacanciesService = new VacanciesService();
const applicationsService = new ApplicationsService();
const employeesService = new EmployeesService();

export const useRoutes = (app: FastifyInstance) => {
    app.get('/', async () => { return { message: 'Bem-vindo 😄' } });

    app.get('/colaboradores', employeesService.EmployeesQuantity)

    app.get('/candidaturas/:quantidade', applicationsService.ApplicationsList);
    app.get('/statusCandidaturas/:periodo/:status', applicationsService.statusApplications);

    app.get('/vagas', vacanciesService.vacanciesList);
    app.get('/vagasPorMes', vacanciesService.vacanciesPerMonth);
    app.get('/statusVagas/:period/:status', vacanciesService.statusVacancies);
};