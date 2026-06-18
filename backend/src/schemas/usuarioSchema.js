const { z } = require("zod");

const cadastroSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    usuario: z.string().min(3, "Usuário deve conter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha mínimo 6 caracteres")
})

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha precisa conter ao menos 6 caracteres")
});

const editarPerfilSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    usuario: z.string().min(3, "Usuário deve conter no mínimo 3 caracteres"),
    email: z.email("Email inválido"),
    senhaAtual: z.string().min(6, "Digite sua senha atual"),
    novaSenha: z.string().optional()
})

module.exports = { cadastroSchema, loginSchema, editarPerfilSchema }