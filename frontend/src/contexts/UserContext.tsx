import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
    userName: string;
    setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState("Convidado");

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsed = JSON.parse(userData);
            setUserName(parsed.displayName || "Convidado");
        }
    }, []);

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser deve estar dentro do UserProvider");
    return context;
};
