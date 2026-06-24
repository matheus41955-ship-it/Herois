import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";
import { buscarMissoesPorHeroi, criarMissao, completarMissao } from "../services/missaoService";

export function useBuscarMissoes(id_heroi) {
    return useQuery({
        queryKey: ['missoes', id_heroi],
        queryFn: () => buscarMissoesPorHeroi(id_heroi),
        enabled: !!id_heroi // Só vai executar se id_heroi existir
    });
}

export function useCriarMissao(id_heroi, onSuccessCallback) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (novaMissao) => criarMissao(id_heroi, novaMissao),
        onSuccess: () => {
            toast.success("Missão publicada com sucesso!");

            queryClient.invalidateQueries({ queryKey: ["missoes", id_heroi] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: () => {
            toast.error("Erro ao criar missão, tente novamente");
        }
    });
}

export function useCompletarMissao(id_heroi) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id_missao) => completarMissao(id_missao),
        onSuccess: (resposta) => {
            const { ouro_ganho, xp_ganho } = resposta.dados;

            toast.success(
                React.createElement("div", null,
                    React.createElement("p", { className: "font-bold" }, "Missão concluida!"),
                    React.createElement("p", { className: "text-xs" }, `Ouro ganho: ${ouro_ganho} | XP ganho: ${xp_ganho}`)
                ),
                { autoClose: 5000 }
            );

            queryClient.invalidateQueries({ queryKey: ["Missoes", id_heroi] });
            queryClient.invalidateQueries({ queryKey: ["guildas"] });
        },
        onError: () => {
            toast.error("Erro ao completar a missão");
        }
    })
}