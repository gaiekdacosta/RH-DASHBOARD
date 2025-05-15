import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../services/firebaseconfig";
import SubmitButton from "../components/submitButton";
import { useToast } from "../components/hooks/use-toast";
import { Input } from "../components/ui/input";

const Login = () => {    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            localStorage.setItem('userData', JSON.stringify(user));

            navigate('/home');
            toast({ title: 'Bem-vindo ao HR Dashboard 👋' });
            setIsLoading(false);
            setError('');
        } catch (error: any) {
            const errorMessages: Record<string, string> = {
                'auth/invalid-credential': 'Email ou senha incorretos. Verifique suas credenciais.',
                'auth/user-not-found': 'Usuário não encontrado. Verifique o email.',
                'auth/wrong-password': 'Senha fraca. Use no mínimo 6 caracteres.',
                'auth/too-many-requests': 'E-mail inválido.',
                'auth/invalid-email': 'Erro de conexão. Verifique sua internet.',
                'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
            };
            setIsLoading(false)
            setError(errorMessages[error.code] || 'Erro ao registrar. Tente novamente mais tarde.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex justify-center w-full mt-[13vh]">
            <div className="flex flex-col items-center gap-3 p-5 w-[30%] h-[50%] rounded-2xl text-center">
                <img src="/group.png" alt="logo" className="w-16 h-auto" />
                <p className="font-bold text-[23px]">Human Resources Dashboard</p>
                <Input
                    type="text"
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <SubmitButton content={"Entrar"} handleSubmit={handleLogin} isLoading={isLoading} />
                <button 
                    onClick={() => navigate('/register')}
                    className="
                    w-full
                    cursor-pointer 
                    p-2 
                    rounded-md 
                    font-bold
                    bg-secundary 
                    hover:bg-[#22acff] 
                    transition 
                    duration-150 
                    ease-in-out"
                >
                    Criar nova conta
                </button>
                <p className="cursor-pointer underline" onClick={() => navigate('/home')}>
                    Entrar como visitante
                </p>
                <p className="flex gap-2 items-center text-center">
                    Developed by Gaiek da costa
                    <a
                        href="https://github.com/gaiekdacosta/rh-dashboard"
                        target="_blank"
                        rel="github repositore" 
                    >
                        <FaGithub className="text-[21px] cursor-pointer" />
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;