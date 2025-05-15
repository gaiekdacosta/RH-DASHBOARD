import { IoMdHelpCircle, IoMdHome } from "react-icons/io";
import NavButton from "./navButton";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import UserBar from "./userBar";

const SideBar = ({ }) => {
    return (
        <div className="flex justify-between flex-col w-64 h-screen bg-[#161819] p-5">
            <div className="flex flex-col w-full gap-3">
                <div className="flex justify-center mb-2">
                    <img src="/group.png" alt="logo" className="w-16 h-auto" />
                </div>
                <NavButton 
                    title='Dashboard' 
                    icon={<IoMdHome className="text-[24px]" />} 
                    path="/home" 
                    premium={false}
                />
                <NavButton 
                    title='Candidatos' 
                    icon={<FaUser className="text-[20px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Mensagens' 
                    icon={<FaMessage className="text-[20px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Agenda' 
                    icon={<AiFillSchedule className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Relatórios' 
                    icon={<TbReportAnalytics className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
                <NavButton 
                    title='Ajuda' 
                    icon={<IoMdHelpCircle className="text-[24px]" />} 
                    path="/" 
                    premium={true}
                />
            </div>
            <UserBar />
        </div>
    );
};

export default SideBar;