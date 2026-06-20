import api from "../api/api";

// Buscar usuário
export const getUsuario = async () => {
    const { data } = await api.get('/usuarios/home');
    return data;
};

// Atualizar dados
export const atualizarUsuario = async (dados) => {
    const { data } = await api.put('/usuarios/perfil', dados);
    return data;
}

// Atualizar Foto
export const uploadFoto = async (formData) => {
    const { data } = await api.put('/usuarios/foto', formData);
    return data;
}