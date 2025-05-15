interface SubmitButtonProps {
    content: string;
    handleSubmit: () => Promise<void>;
    isLoading: boolean;
}

const SubmitButton:React.FC<SubmitButtonProps> = ({ content, handleSubmit, isLoading }) => {
    return (
        <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="
                w-full
                cursor-pointer 
                p-2 
                rounded-md 
                font-bold
                bg-primary 
                hover:bg-[#ff4536] 
                transition 
                duration-150 
                ease-in-out
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Carregando...' : content}
        </button>
    );
}

export default SubmitButton;