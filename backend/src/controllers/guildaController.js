const guildaModel = require("../models/guildaModel");
const { guildasSchema } = require('../schemas/guildasSchema');

async function mostrarGuilda(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;
        
        const guilda = await guildaModel.listarGuildas(id_usuario);
        if (!guilda) return res.json(null);

        const herois = await guildaModel.mostrarHeroisGuilda(guilda.id_time);
        return res.json({ guilda, herois });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro no servidor!" });
    }
}

async function criarGuilda(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;
        const usuarioTemGuilda = await guildaModel.listarGuildas(id_usuario);

        if (usuarioTemGuilda) return res.status(400).json({ erro: "Usuário já tem um time" });

        const resultado = guildasSchema.safeParse(req.body);
        if (!resultado.success) { 
            return res.status(400).json({ erro: resultado.error.flatten().fieldErrors });
        }

        const { nome, descricao } = resultado.data;
        await guildaModel.criarGuilda(nome, descricao, id_usuario);
        return res.status(201).json({ mensagem: "Time criado com sucesso!" });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao criar o time" });
    }
}

module.exports = { mostrarGuilda, criarGuilda }