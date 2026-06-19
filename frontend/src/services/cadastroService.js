import api from "../api/api";

// Cadastro de usuário
export const postCadastro = async (dados) => {
    const resposta = await api.post('/usuarios/cadastro', dados);
    return resposta.data;
}

// Login de usuário
export const postLogin = async (credenciais) => {
    const data = await api.post('/usuarios/login', credenciais);
    return data.data;
}
