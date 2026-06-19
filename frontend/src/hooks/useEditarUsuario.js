import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atualizarUsuario } from "../services/usuarioService";

export function useEditarUsuario() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizarUsuario,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario'] });
        }
    })
}

export function useUploadFoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const res = await api.put('/usuarios/foto', formData);
            return res.data;
        },

        onSuccess: (data) => {
            queryClient.setQueryData(['usuario'], (old) => {
                if (!old) return old;

                return{
                    ...old,
                    foto_perfil: data.url
                }
            });
        }
    })
}