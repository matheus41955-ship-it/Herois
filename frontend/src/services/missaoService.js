import api from "../api/api";

export const buscarMissoesPorHeroi = async (id_heroi) => {
    const resposta = await api.get(`/missoes/${id_heroi}`);
    return resposta.data;
}

export const criarMissao = async (id_heroi, novaMissao) => {
    const resposta = await api.post(`/missoes/${id_heroi}/criarMissao`, novaMissao);
    return resposta.data;
}

export const completarMissao = async (id_missao) => {
    const resposta = await api.put(`/missoes/${id_missao}/completar`);
    return resposta.data;
}