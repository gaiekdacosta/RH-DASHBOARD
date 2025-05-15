import { useState } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../services/firebaseconfig";
import { updateProfile } from "firebase/auth";
import SubmitButton from "../components/submitButton";
import { useToast } from "../components/hooks/use-toast";
import { Input } from "../components/ui/input";
import { validateUserForm } from "../utils/validateInputs";

const Register = () => {    
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { toast } = useToast();
    
    const handleRegister = async () => {
        const validationError = validateUserForm({
            displayName: userName,
            email,
            newPassword: password,
            repeatNewPassword: confirmPassword
        });
    
        if (validationError) {
            setError(validationError);
            return;
        }
        
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: userName });
            navigate('/');
            toast({ 
                title: 'Usuário criado com sucesso!', 
                description: 'Insira seu email e senha.',
                action: <FaCheckCircle className="text-green-500 w-6 h-6" />,
            });
            setError('')
        } catch (error: any) {
            const errorMessages: Record<string, string> = {
                'auth/email-already-in-use': 'Este e-mail já está em uso.',
                'auth/weak-password': 'Senha fraca. Use no mínimo 6 caracteres.',
                'auth/invalid-email': 'E-mail inválido.',
                'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
                'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
                'auth/operation-not-allowed': 'Operação não permitida.'
            };
            setIsLoading(false)
            setError(errorMessages[error.code] || 'Erro ao registrar. Tente novamente mais tarde.');
            console.error('Error to register:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex justify-center w-full mt-[12vh]">
            <div className="flex flex-col items-center gap-3 p-5 w-[30%] h-[50%] rounded-2xl text-center">
                <img src="/group.png" alt="logo" className="w-16 h-auto" />
                <p className="font-bold text-[23px]">Human Resources Dashboard</p>
                <Input
                    type="text"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    placeholder="Usuário"
                    required
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    required
                />
                <div className="flex w-full">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Senha"
                        required
                    />
                    <button
                        className="cursor-pointer relative -ml-5"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <div className="flex w-full">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirmar Senha"
                        required
                    />
                    <button
                        className="cursor-pointer relative -ml-5"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                {/*
                <ReCAPTCHA
                    sitekey="6LcCxfoqAAAAAFdWYVaCFyvLFxkyMgGdf9wlCfMT"
                    onChange={(token) => setCaptchaToken(token)}
                />
                */}
                <SubmitButton content={"Registrar"} handleSubmit={handleRegister} isLoading={isLoading} />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="cursor-pointer underline" onClick={() => navigate('/')}>
                    Já tem uma conta? Entrar.
                </p>
            </div>
        </div>
    );
}

export default Register;
