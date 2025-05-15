import { MdOutlineEmail } from "react-icons/md";

interface CardApplicantsProps {
    key: string;
    urlImage: string;
    name: string;
    email: string;
    score: number;
    vacancy: string;
}

const CardApplicants:React.FC<CardApplicantsProps> = ({ key, urlImage, name, email, score, vacancy }) => {

    return (
        <div key={key} className="flex flex-col items-center h-80 w-full gap-1 p-2 rounded-md bg-background">
            <img
                className="h-[150px] w-[150px] mb-3 rounded-full"
                src={urlImage}
                alt='profile image'
            />
            <p className="text-[20px] font-medium">{name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-300">
                <p>{email}</p>
                <a href={`mailto:${email}`}>
                    <MdOutlineEmail className="text-[18px] cursor-pointer" />
                </a>
            </div>
            <p className="text-sm text-gray-300">Nota Curriculo: {score}</p>
            <p className="bg-[#2E322E] font-medium rounded-sm p-1.5">
                {vacancy}
            </p>
        </div>
    );
}

export default CardApplicants;