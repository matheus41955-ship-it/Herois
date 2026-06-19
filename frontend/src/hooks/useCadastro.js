import { useMutation } from "@tanstack/react-query";
import { postCadastro, postLogin } from "../services/cadastroService";
import { toast } from "react-toastify";
import axios from "axios"; // Certifique-se de importar o axios aqui

export const useCadastro = () => {
    return useMutation({
        mutationFn: postCadastro,

        onSuccess: (data) => {
            toast.success(data?.mensagem || "Cadastro realizado com sucesso!");
        },

        onError: (erro) => {
            // Verifica se é um erro gerado pelo Axios
            if (axios.isAxiosError(erro)) {
                const mensagemDoBackend = erro.response?.data?.erro; // Pega exatamente a chave 'erro' no console.log
                if (mensagemDoBackend) {
                    toast.error(mensagemDoBackend);
                    return;
                }
            }
            toast.error(erro.message || "Erro ao criar o usuário");
        }
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: postLogin,

        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
        },

        onError: (erro) => {
            if (axios.isAxiosError(erro)) {
                const mensagemDoBackend = erro.response?.data?.erro;
                if (mensagemDoBackend) {
                    toast.error(mensagemDoBackend);
                    return;
                }
            }
            toast.error(erro.message || "Erro interno do servidor, tente novamente mais tarde");
        }
    });
}
