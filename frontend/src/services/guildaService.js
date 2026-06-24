import api from "../api/api";

export const getGuilda = async () => {
    const resposta = await api.get("/guildas/");
    return resposta.data;
}

export const postCriarGuilda = async (dados) => {
    const resposta = await api.post("/guildas/novoTime", dados);
    return resposta.data;
}