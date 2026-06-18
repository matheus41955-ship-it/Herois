import { z } from 'zod';

const editarInfoSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    usuario: z.string().min(3, "Usuário deve conter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senhaAtual: z.string().min(6, "Digite sua senha atual"),
    novaSenha: z.string().optional(),
    confSenha: z.string().optional()
})

export default editarInfoSchema;