const missaoModel = require("../models/missaoModel");
const { missaoSchema } = require('../schemas/missaoSchema');


async function buscarMissoes(req, res) {
    try {
        const { id_heroi } = req.params;

        const [missoes] = await missaoModel.listarMissoesPorHeroi(id_heroi);
        return res.status(200).json(missoes);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao buscar as missões do herói" });
    }
}

async function criarMissao(req, res) {
    try {
        const { id_heroi } = req.params;

        const resultado = missaoSchema.safeParse(req.body);
        if (!resultado.success) {
            return res.status(400).json({ erro: resultado.error.flatten().fieldErrors });
        }

        const { nome, descricao } = resultado.data;
        await missaoModel.criarMissao(id_heroi, nome, descricao);
        return res.status(201).json({ mensagem: "Missão criada com sucesso!" });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao criar a missão" });
    }
}

async function concluirMissao(req, res) {
    try {
        const { id_missao } = req.params;
        const id_usuario = req.usuarioLogado.id;

        if (!id_missao) {
            return res.status(400).json({ erro: "ID da missão é obrigatório!" });
        }

        const resultado = await missaoModel.completarMissaoTransacao(id_missao, id_usuario);
        return res.status(200).json({
            mensagem: "Missão concluída com sucesso!",
            dados: resultado
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: erro.message || "Erro ao concluir a missão." })
    }
}

module.exports = { buscarMissoes, criarMissao, concluirMissao }