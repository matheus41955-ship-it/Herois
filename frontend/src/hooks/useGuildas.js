import { useQuery, useQueryClient, useMutation, QueryClient } from "@tanstack/react-query";
import { getGuilda, postCriarGuilda } from "../services/guildaService";
import { toast } from "react-toastify";
import axios from "axios";

export function useGuildas() {
    const queryClient = useQueryClient();

    //Get guilda
    const query = useQuery({
        queryKey: ['guildas'],
        queryFn: getGuilda
    });

    // criar guilda
    const criarGuilda = useMutation({
        mutationFn: postCriarGuilda,

        onSuccess: () => {
            // Atualiza automaticamente a query
            queryClient.invalidateQueries({ queryKey: ['guildas'] });
        }
    });

    return {
        ...query,
        criarGuilda: criarGuilda.mutate,
        isCreating: criarGuilda.isPending
    }
}