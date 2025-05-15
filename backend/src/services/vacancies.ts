import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

class VacanciesService {
    async vacanciesList(request: FastifyRequest, reply: FastifyReply) {
        try {
            const vacancies = await prisma.vagas.findMany();

            return reply.status(200).send({
                data: vacancies,
                message: 'Vagas buscadas com sucesso!'
            });

        } catch (error) {
            console.error('Ocorreu um erro ao buscar informações sobre vagas', error);
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar vagas'
            });
        }
    }

    async vacanciesPerMonth(request: FastifyRequest, reply: FastifyReply) {
        try {
            const vacancies = await prisma.vagas.groupBy({
                by: ['data_vaga'],
            });

            const monthCount: Record<string, number> = {};

            vacancies.forEach((item) => {
                const month = item.data_vaga.getMonth();
                if (monthCount[month]) {
                    monthCount[month]++;
                } else {
                    monthCount[month] = 1;
                }
            });

            const monthMap: Record<string, string> = {
                0: 'Jan',
                1: 'Fev',
                2: 'Mar',
                3: 'Abr',
                4: 'Mai',
                5: 'Jun',
                6: 'Jul',
                7: 'Ago',
                8: 'Set',
                9: 'Out',
                10: 'Nov',
                11: 'Dez',
            };

            const chartData = Object.keys(monthCount).map((month) => ({
                month: monthMap[month],
                vacancy: monthCount[month],
            }));

            chartData.sort((a, b) => {
                const monthOrder = Object.keys(monthMap);
                return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
            });

            return reply.status(200).send({
                data: chartData,
                message: 'Vagas por mês buscadas com sucesso!'
            });

        } catch (error) {
            console.error('Ocorreu um erro ao buscar informações sobre vagas por mês', error)
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar vagas por mês'
            });
        }
    }

    async statusVacancies(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { periodo, status } = request.params as { periodo: string, status: string }

            const days = parseInt(periodo, 10)
            if (isNaN(days)) {
                return reply.status(400).send({ message: 'Período inválido' })
            }

            const startDate = new Date()
            startDate.setDate(startDate.getDate() - days)
            startDate.setHours(0, 0, 0, 0)

            const totalVacancies = await prisma.vagas.count({
                where: {
                    data_vaga: {
                        gte: startDate
                    }
                }
            })

            const statusVacancies = await prisma.vagas.count({
                where: {
                    status,
                    data_vaga: {
                        gte: startDate
                    }
                }
            })

            const percentage = totalVacancies > 0
                ? (statusVacancies / totalVacancies) * 100
                : 0

            return reply.status(200).send({
                data: {
                    vagasEncontradas: statusVacancies,
                    totalDeVagas: totalVacancies,
                    porcentagem: Number(percentage.toFixed(2))
                },
                message: 'Vagas por mês buscadas com sucesso!'
            })


        } catch (error) {
            console.log('ocorreu um erro ao buscar informações sobre status de vagas')
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar sobre status de vagas'
            });
        }
    }
}

export { VacanciesService }