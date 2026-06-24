import api from "../api/api";

export const getHerois = async (dados) => {
    const resposta = await api.get('/herois/', dados);
    return resposta.data;
}

export const addHeroi = async (dados) => {
    const resposta = await api.post("/herois/addHeroi", dados);
    return resposta.data;
}

export const comprarHeroi = async (id_heroi) => {
    const resposta = await api.post(`/herois/${id_heroi}/comprar`);
    return resposta.data;
}

export const venderHeroi = async (id_heroi) => {
    const resposta = await api.post(`/herois/${id_heroi}/vender`);
    return resposta.data;
}