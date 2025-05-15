import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

class EmployeesService {
    async EmployeesQuantity(request: FastifyRequest, reply: FastifyReply) {
        try {
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
    
            const employees = await prisma.colaboradores.findMany({
                select: {
                    data_admissao: true,
                    ativo: true,
                    tipo_funcao: true
                },
                orderBy: {
                    data_admissao: 'asc'
                }
            });
    
            let totalAdm = 0;
            let totalTec = 0;
    
            const result: any = {
                colaboradores_adm: {},
                colaboradores_tec: {},
                totais: {
                    administrativo: 0,
                    tecnologia: 0
                },
                message: 'Colaboradores buscados com sucesso!'
            };
    
            for (let i = 0; i < 12; i++) {
                const month = monthMap[i];
                result.colaboradores_adm[month] = { admitidos: 0, demitidos: 0 };
                result.colaboradores_tec[month] = { admitidos: 0, demitidos: 0 };
            }
    
            employees.forEach((employee) => {
                const month = new Date(employee.data_admissao).getMonth();
                const monthName = monthMap[month];
                
                if (employee.tipo_funcao === 'administrativo') {
                    result.colaboradores_adm[monthName][employee.ativo ? 'admitidos' : 'demitidos']++;
                    if (employee.ativo) totalAdm++;
                } else if (employee.tipo_funcao === 'tecnologia') {
                    result.colaboradores_tec[monthName][employee.ativo ? 'admitidos' : 'demitidos']++;
                    if (employee.ativo) totalTec++;
                }
            });
    
            result.totais.administrativo = totalAdm;
            result.totais.tecnologia = totalTec;
    
            return reply.status(200).send(result);
    
        } catch (error) {
            console.error('Ocorreu um erro ao buscar informações sobre colaboradores', error);
            return reply.status(500).send({
                error,
                message: 'Ocorreu um erro ao buscar colaboradores'
            });
        }
    }
}

export { EmployeesService }