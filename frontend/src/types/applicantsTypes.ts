export default interface ApplicantsTypes {
    id: string;
    candidato_id: string;
    vaga_id: string;
    status: string;
    data_candidatura: string;
    etapa: number;
    nota_cv: number;
    candidatos: {
        id: string;
        nome: string;
        telefone: string;
        email: string;
        foto_url: string;
    }
    vagas: {
        titulo: string;
    }
}