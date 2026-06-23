const { z } = require("zod");

const adicionarHeroiSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  classe: z.enum(['heroi', 'vilao', 'anti-heroi']),
  poder: z.coerce.number().min(1, "Poder Deve ser ao menos 1!").max(100, "Poder inicial do herói pode ser no máx 100"),
  preco_compra: z.coerce.number().min(0, "Preço não pode ser negativo").max(150, "O preço de compra inicial do personagem pode ser no máx 150 moedas"),
});

module.exports = { adicionarHeroiSchema }