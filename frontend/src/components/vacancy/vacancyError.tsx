const VacancyError = () => {
    return ( 
        <div className="flex flex-col text-center bg-background rounded-md p-5 mt-3">
            <p className="text-[14px] text-red-400 font-semibold">
                Desculpe, ocorreu um erro ao exibir vagas
            </p>
        </div>
    );
};

export default VacancyError;
