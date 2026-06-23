const heroiModel = require('../models/heroiModel');
const { adicionarHeroiSchema } = require('../schemas/heroiSchema');
require('dotenv').config()

async function listarHerois(req, res) {
    try {
        const herois = await heroiModel.mostrarHerois();
        res.json(herois);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Não foi possível mostrar os heróis, tente novamente!' })
    }
}

async function adicionarHeroi(req, res) {
    try {
        const resultado = adicionarHeroiSchema.safeParse(req.body);

        if(!resultado.success) {
            return res.status(400).json({ erro: resultado.error.flatten().fieldErrors });
        }

        const { nome, classe, poder, preco_compra } = resultado.data;

        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada!" });
        }

        const preco_venda = Math.floor(preco_compra / 2);

        const porta = process.env.PORT;
        const avatar = `http://localhost:${porta}/uploads/herois/${req.file.filename}`;

        await heroiModel.addHeroi(nome, avatar, classe, poder, preco_compra, preco_venda);
        return res.status(200).json({ mensagem: "Herói adicionado com sucesso!" });
        
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao adicionar o herói, tente novamente!" });
    }
}

module.exports = { listarHerois, adicionarHeroi }