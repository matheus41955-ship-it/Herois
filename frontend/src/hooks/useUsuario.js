import { useQuery } from "@tanstack/react-query";
import { getUsuario } from "../services/usuarioService";

export function useUsuario() {
    return useQuery({
        queryKey: ['usuario'],
        queryFn: getUsuario
    });
}