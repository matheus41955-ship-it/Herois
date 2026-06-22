import api from "../api/api";

export const getHerois = async (dados) => {
    const resposta = await api.get('/herois/', dados);
    return resposta.data;
}