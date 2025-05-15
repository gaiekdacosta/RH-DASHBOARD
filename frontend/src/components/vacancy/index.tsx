import { IoIosMore } from "react-icons/io";

interface VacancyProps {
    key: string
    vacancyName: string
    status: string
    priority: string
}

const Vacancy:React.FC<VacancyProps> = ({ key, vacancyName, status, priority }) => {

    console.log('key', key)

    const colorStatus = (status: string) => {
        if(status === 'PENDENTE') return 'text-yellow-400'

        if(status === 'CONCLUIDA') return 'text-green-400'

        if(status === 'CANCELADA') return 'text-red-400'

        return ''
    }

    const colorPriority = (priority: string) => {
        if(priority === 'ALTA') return 'text-purple-400'

        if(priority === 'MEDIA') return 'text-blue-400'

        if(priority === 'BAIXA') return 'text-gray-400'

        return ''
    }


    return ( 
        <div key={key} className="flex flex-col bg-background rounded-md p-5 mt-3">
            <div className="flex justify-between">
                <h3 className="font-semibold">{vacancyName}</h3>
                <button className="cursor-pointer"><IoIosMore /></button>
            </div>
            <div className="flex gap-2 text-[12px] font-medium">
                <div className={`bg-[#2E322E] rounded-sm p-1.5 ${colorStatus(status)}`}>
                    <p>{status}</p>
                </div>
                <div className={`bg-[#2E322E] rounded-sm p-1.5 ${colorPriority(priority)}`}>
                    <p>{priority}</p>
                </div>
            </div>
        </div>
    );
}

export default Vacancy;