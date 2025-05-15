import { FaUserCircle } from "react-icons/fa";
import Exit from "../exit";
import Config from "../config";
import { useState } from "react";

const UserBar = () => {
    const [userName, setUserName] = useState('Convidado')
    
    return (
        <div className="flex justify-center">
            <div className="flex w-full justify-between items-center rounded-md p-2 shadow-xl bg-[#252728]">
                <div className="flex items-center gap-2">
                    <FaUserCircle className="text-[25px]" />
                    <p className="font-medium">{userName}</p>
                </div>
                <div className="flex gap-2">
                    <Config setUserName={setUserName} />
                    <Exit />
                </div>
            </div>
        </div>
    );
}

export default UserBar;