import { z } from "zod";

const cadastroSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    usuario: z.string().min(3, "Usuário deve conter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha mínimo 6 caracteres"),
});

export default cadastroSchema;