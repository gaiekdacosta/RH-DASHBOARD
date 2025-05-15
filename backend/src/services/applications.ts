import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

class ApplicationsService {
    async ApplicationsList(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { quantidade } = request.params as { quantidade: string };

            const limit = parseInt(quantidade);

            if (isNaN(limit) || limit <= 0) {
                return reply.status(400).send({
                    message: 'Quantidade inválida. Envie um número positivo.'
                });
            }

            const applications = await prisma.candidaturas.findMany({
                orderBy: {
                    data_candidatura: 'desc',
                },
                include: {
                    candidatos: true,
                    vagas: {
                        select: {
                            titulo: true
                        }
                    }
                },
                take: limit,
            });
    
            return reply.status(200).send({
                data: applications,
                message: 'Candidaturas buscadas com sucesso!'
            });
    
        } catch (error) {
            console.error('Ocorreu um erro ao buscar informações sobre candidaturas', error);
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar candidaturas'
            });
        }
    }
    
    async statusApplications(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { periodo, status } = request.params as { periodo: string, status: string }

            const days = parseInt(periodo, 10)
            if (isNaN(days)) {
                return reply.status(400).send({ message: 'Período inválido' })
            }

            const startDate = new Date()
            startDate.setDate(startDate.getDate() - days)
            startDate.setHours(0, 0, 0, 0)

            const totalVacancies = await prisma.candidaturas.count({
                where: {
                    data_candidatura: {
                        gte: startDate
                    }
                }
            })

            const statusVacancies = await prisma.candidaturas.count({
                where: {
                    status,
                    data_candidatura: {
                        gte: startDate
                    }
                }
            })

            const percentage = totalVacancies > 0 ? (statusVacancies / totalVacancies) * 100 : 0

            return reply.status(200).send({
                data: {
                    candidaturasEncontradas: statusVacancies,
                    totalDeCandidaturas: totalVacancies,
                    porcentagem: Number(percentage.toFixed(2))
                },
                message: 'Candidaturas por mês buscadas com sucesso!'
            })


        } catch (error) {
            console.log('ocorreu um erro ao buscar informações sobre status de candidaturas')
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar sobre status de candidaturas'
            });
        }
    }
}

export { ApplicationsService }