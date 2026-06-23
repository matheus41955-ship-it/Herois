import api from "../api/api";

export const getHerois = async (dados) => {
    const resposta = await api.get('/herois/', dados);
    return resposta.data;
}

export const addHeroi = async (dados) => {
    const resposta = await api.post("/herois/addHeroi", dados);
    return resposta.data;
}

export const fetchGuilda = async () => {
    const resposta = await api.get("/herois/guilda");
    return resposta.data;
}