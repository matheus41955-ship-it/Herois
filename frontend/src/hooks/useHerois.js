import { useQuery, useQueryClient, useMutation, QueryClient } from "@tanstack/react-query";
import { getHerois, addHeroi, fetchGuilda } from "../services/heroiService";
import { toast } from "react-toastify";
import axios from "axios";

export function useHerois() {
    return useQuery({
        queryKey: ['herois'],
        queryFn: getHerois
    })
}

export const useAddHeroi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addHeroi,

        onSuccess: (data) => {
            toast.success(data?.mensagem || "Sucesso!");
            queryClient.invalidateQueries(["herois"]);
        },

        onError: (erro) => {
            if (axios.isAxiosError(erro)) {
                const mensagemDoBackend = erro.response?.data?.erro;
                if(mensagemDoBackend) {
                    toast.error(mensagemDoBackend);
                    return;
                }
            }
            toast.error(erro.message || "Erro ao adicionar herói");
        }
    })
}

export const useGuilda = () => {
    return useQuery({
        queryKey: ["guilda"],
        queryFn: fetchGuilda
    })
}