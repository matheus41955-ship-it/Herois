const heroiModel = require('../models/heroiModel');
const guildaModel = require('../models/guildaModel');
const { adicionarHeroiSchema } = require('../schemas/heroiSchema');
const { number } = require('zod');
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
        const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : `http://localhost:${porta}`;
        const avatar = `${baseUrl}/uploads/herois/${req.file.filename}`;

        await heroiModel.addHeroi(nome, avatar, classe, poder, preco_compra, preco_venda);
        return res.status(200).json({ mensagem: "Herói adicionado com sucesso!" });
        
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao adicionar o herói, tente novamente!" });
    }
}

async function comprarHeroi(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;
        const { id_heroi } = req.params;

        const guilda = await guildaModel.listarGuildas(id_usuario);
        if (!guilda) {
            return res.status(404).json({ erro: "Crie um time para comprar heróis" });
        }

        const heroi = await heroiModel.buscarHeroi(id_heroi);
        if (!heroi) { 
            return res.status(404).json({ erro: "Herói não encontrado" });
        }

        const heroisRecrutados = await guildaModel.mostrarHeroisGuilda(guilda.id_time);
        if (heroisRecrutados && heroisRecrutados.length >= 5) {
            return res.status(400).json({ erro: "O máx de integrantes em um time é 5! Venda algum herói para adquirir um novo" })
        }

        await heroiModel.comprarHeroi({
            id_time: guilda.id_time,
            preco_compra: heroi.preco_compra,
            id_heroi,
            id_usuario
        });

        return res.status(201).json({ mensagem: "Heroi comprado com sucesso!" })
    } catch (erro) {
        console.log(erro);
        return res.status(400).json({ erro: erro.message }); //Erros do model
    }
}

async function venderHerois(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;
        const { id_heroi } = req.params;

        const heroi = await heroiModel.buscarHeroi(id_heroi);

        await heroiModel.venderHeroi({
            id_heroi,
            preco_venda: heroi.preco_venda,
            id_usuario
        });

        return res.status(201).json({ mensagem: "Herói vendido com sucesso!" })

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao vender o herói, tente novamente!" });
    }
}

module.exports = { listarHerois, adicionarHeroi, comprarHeroi, venderHerois }