import {
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { AlertDialog, AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { FaGear, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useToast } from "@/src/components/hooks/use-toast";
import { FaCheckCircle } from "react-icons/fa";
import { auth } from "@/src/services/firebaseconfig";
import { useUser } from "@/src/contexts/UserContext";
import { validateUserForm } from "@/src/utils/validateInputs";

interface ConfigProps {
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

const Config:React.FC<ConfigProps> = ({ setUserName }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        repeatNewPassword: false
    });
    const [error, setError] = useState<string>('');
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    type PasswordField = keyof typeof showPasswords;

    const { userName } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const ShowPasswordIcon: React.FC<{ fieldPassword: PasswordField }> = ({ fieldPassword }) => {
        return (
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => toggleShowPassword(fieldPassword)}
            >
                {showPasswords[fieldPassword] ? <FaEye /> : <FaEyeSlash />}
            </button>
        );
    };

    const handleSubmit = async () => {
        if (!currentUser) return;

        const validationError = validateUserForm(formData, true);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            if (formData.displayName !== currentUser.displayName) {
                await updateProfile(currentUser, {
                    displayName: formData.displayName
                });
            }

            if (formData.email !== currentUser.email) {
                await updateEmail(currentUser, formData.email);
            }

            if (formData.oldPassword && formData.newPassword) {
                const credential = EmailAuthProvider.credential(
                    currentUser.email || '',
                    formData.oldPassword
                );

                await reauthenticateWithCredential(currentUser, credential);
                await updatePassword(currentUser, formData.newPassword);
            }

            const updatedUserData = {
                uid: currentUser.uid,
                displayName: formData.displayName,
                email: formData.email,
                photoURL: currentUser.photoURL
            };

            setUserName(updatedUserData.displayName)
            localStorage.setItem('userData', JSON.stringify(updatedUserData));

            toast({
                title: 'Dados atualizados com sucesso!',
                action: <FaCheckCircle className="text-green-500 w-6 h-6" />,
            });
            setError('');
        } catch (error: any) {
            console.error('Erro ao atualizar:', error);
            toast({
                title: 'Erro ao atualizar dados',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user) {
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                setUserName(userData.displayName)

                setFormData((prev) => ({
                    ...prev,
                    displayName: user.displayName || '',
                    email: user.email || '',
                }));
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!showChangePassword) {
            setFormData(prev => ({
                ...prev,
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            }));
        }
    }, [showChangePassword]);

    return (
        <AlertDialog>
            <AlertDialogTrigger
                disabled={userName === 'Convidado'}
                className="cursor-pointer disabled:opacity-45 disabled:cursor-auto"
            >
                <FaGear className="text-[17px]" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Configurações de usuário</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="flex flex-col gap-2">
                    {!showChangePassword ?
                        <>
                            <Input
                                name="displayName"
                                type="text"
                                placeholder="Nome"
                                value={formData.displayName}
                                onChange={handleChange}
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </>
                        :
                        <>
                            <div className="relative">
                                <Input
                                    name="oldPassword"
                                    placeholder="Senha antiga"
                                    type={showPasswords.oldPassword ? "text" : "password"}
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                />
                                <ShowPasswordIcon fieldPassword="oldPassword" />
                            </div>
                            <div className="relative">
                                <Input
                                    name="newPassword"
                                    placeholder="Nova senha"
                                    type={showPasswords.newPassword ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <ShowPasswordIcon fieldPassword="newPassword" />
                            </div>
                            <div className="relative">
                                <Input
                                    name="repeatNewPassword"
                                    placeholder="Repetir nova senha"
                                    type={showPasswords.repeatNewPassword ? "text" : "password"}
                                    value={formData.repeatNewPassword}
                                    onChange={handleChange}
                                />
                                <ShowPasswordIcon fieldPassword="repeatNewPassword" />
                            </div>
                        </>
                    }
                    {error && <p className="text-center text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="underline cursor-pointer"
                    >
                        {showChangePassword ? 'voltar' : 'alterar senha'}
                    </button>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <div className="flex w-full gap-2 justify-center items-center">
                        <AlertDialogCancel className="cursor-pointer bg-white w-full">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="cursor-pointer w-full"
                            onClick={(e) => {
                                e.preventDefault(); 
                                handleSubmit();
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : 'Confirmar'}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Config;