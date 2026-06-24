import { useQuery, useQueryClient, useMutation, QueryClient } from "@tanstack/react-query";
import { getHerois, addHeroi, comprarHeroi, venderHeroi } from "../services/heroiService";
import { toast } from "react-toastify";
import axios from "axios";

export function useHerois() {
    return useQuery({
        queryKey: ['herois'],
        queryFn: getHerois
    });
}

export const useAddHeroi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addHeroi,

        onSuccess: (data) => {
            toast.success(data?.mensagem || "Sucesso!");
            queryClient.invalidateQueries({
                queryKey: ["herois"]
            });
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

export function useComprarHeroi() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: comprarHeroi,

        onSuccess: (data) => {
            toast.success(data?.mensagem || "Herói comprado com sucesso!");
            queryClient.invalidateQueries(["herois"]);
            queryClient.invalidateQueries(["guilda"]);
        },

        onError: (erro) => {
            toast.error(erro?.response?.data?.erro || "Erro ao comprar o herói");
        }
    });
}

export function useVenderHeroi() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: venderHeroi,

        onSuccess: (data) => {
            toast.success(data?.mensagem || "Herói vendido com sucesso!");
            queryClient.invalidateQueries(['herois']);
            queryClient.invalidateQueries(["guilda"]);
        },

        onError: (erro) => {
            toast.error(erro?.response?.data?.erro || "Erro ao realizar a venda");
        }
    })
}