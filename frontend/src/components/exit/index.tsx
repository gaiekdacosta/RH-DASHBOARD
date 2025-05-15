import {
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Exit = () => {

    const navigate = useNavigate();

    const exit = () => {
        navigate('/')
        localStorage.clear();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer">
                <IoIosExit className="text-[23px]" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="flex w-full gap-2 justify-center items-center">
                        <AlertDialogCancel className="cursor-pointer bg-white w-full">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer w-full" onClick={exit}>
                            Sair
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Exit;