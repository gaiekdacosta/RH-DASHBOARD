type FormData = {
    displayName: string;
    email: string;
    newPassword: string;
    repeatNewPassword: string;
};

export const validateUserForm = (form: FormData, register: boolean): string | undefined => {
    if (form.displayName.length < 1)
        return "O nome de usuário precisa ser preenchido";
    if (form.displayName.length < 4)
        return "O nome de usuário deve ter pelo menos 5 caracteres.";
    if (form.displayName.length > 15)
        return "O nome de usuário não pode ter mais de 15 caracteres.";

    if (form.email.length < 1)
        return "O campo e-mail precisa ser preenchido";
    if (!/\S+@\S+\.\S+/.test(form.email))
        return "E-mail inválido.";

    if(register && form.newPassword.length > 0) {
        if(form.newPassword.length < 1) 
            return 'Você precisa preencher o campo senha' 
        if(form.newPassword.length < 4)
            return 'A senha deve ter pelo menos 5 caracteres.';
        if(form.newPassword.length > 3)
            return 'A senha deve ter mais de 5 caracteres.';
        if (form.newPassword && form.newPassword !== form.repeatNewPassword)
            return "As novas senhas não coincidem.";
    }
};
