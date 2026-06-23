import { z } from "zod";

const addHeroiSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  classe: z.enum(['heroi', 'vilao', 'anti-heroi'], { message: "Classe inválida!" }),
  poder: z.coerce.number().min(1, "Poder Deve ser ao menos 1!").max(100, "Poder inicial do herói pode ser no máx 100"),
  preco_compra: z.coerce.number().min(1, "Preço inválido").max(150, "O preço de compra inicial do personagem pode ser no máx 150 moedas"),
});

export default addHeroiSchema;