import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

interface NavButtonProps {
    title: string;
    icon: ReactNode;
    path: string; 
    premium: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ title, icon, path, premium }) => {
    const location = useLocation();

    const { toast } = useToast();

    const isActive = location.pathname === path; 

    const alertPremiumFeature = () => {
        if(premium) 
            return toast({ 
                title: 'Recurso exclusivo para assinantes Premium 👑',
                description: 'Atualize seu plano agora para desbloquear todos os recursos.',
                className: 'border-yellow-400 bg-[#BA8E23]',
            });

        return null
    }

    return ( 
        <button 
            onClick={alertPremiumFeature}
            className={`
                flex 
                p-2
                cursor-pointer 
                items-center 
                gap-1 
                font-semibold 
                rounded-lg 
                transition-all 
                ${isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800"}
            `}
        >
            {icon} <p className="text-[18px]">{title}</p>
            {premium && <FaCrown style={{ color:'yellow' }} />}
        </button>
    );
}

export default NavButton;
