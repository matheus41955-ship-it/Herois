import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atualizarUsuario, uploadFoto } from "../services/usuarioService";
import { toast } from "react-toastify";
import axios from "axios";

export function useEditarUsuario() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizarUsuario,

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['usuario'] });
            toast.success(data?.mensagem || 'Dados atualizados com sucesso!');
        },

        onError: (erro) => {
            if (axios.isAxiosError(erro)) {
                const mensagemDoBackend = erro.response?.data?.erro;
                if (mensagemDoBackend) {
                    toast.error(mensagemDoBackend);
                    return;
                }
            }
            toast.error(erro.message || "Erro ao atualizar os dados");
        }
    })
}

export function useUploadFoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadFoto,

        onSuccess: (data) => {
            toast.success(data?.mensagem);

            queryClient.setQueryData(['usuario'], (old) => {
                if (!old) return old;

                return{
                    ...old,
                    foto_perfil: data.url
                }
            });
        },

        onError: (erro) => {
            if (axios.isAxiosError(erro)) {
                const mensagemDoBackend = erro.response?.data?.erro;
                if (mensagemDoBackend) {
                    toast.error(mensagemDoBackend);
                    return;
                }
            }
            toast.error(erro.message || "Erro ao atualizar a foto");
        }
    })
}