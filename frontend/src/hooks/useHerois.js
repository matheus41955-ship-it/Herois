import { useQuery } from "@tanstack/react-query";
import { getHerois } from "../services/heroiService";

export function useHerois() {
    return useQuery({
        queryKey: ['herois'],
        queryFn: getHerois
    })
}