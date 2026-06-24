const { z } = require('zod');

const guildasSchema = z.object({
    nome: z.string().min(2, "Nome inválido: Mín 2 caracteres."),
    descricao: z.string().max(500, "Máx 500 caracteres").optional()
})

module.exports = { guildasSchema }