const VacancyLoading = () => {
    return ( 
        <div className="flex flex-col bg-background rounded-md p-5 mt-3 animate-pulse">
            <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-6"></div>
            </div>
            <div className="flex gap-2 text-[12px] font-medium">
                <div className="bg-gray-700 rounded-sm h-4 w-20"></div>
                <div className="bg-gray-700 rounded-sm h-4 w-16"></div>
            </div>
        </div>
    );
};

export default VacancyLoading;
