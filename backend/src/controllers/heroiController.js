const heroiModel = require('../models/heroiModel');
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
        const { nome, classe, poder, preco_compra } = req.body;
        
        const poderNum = Number(poder); // Transformar e numero pq o multer usa formData, q transforma em string
        const precoNum = Number(preco_compra);

        if (isNaN(poderNum) || isNaN(precoNum)){
            return res.status(400).json({ erro: "Valores inválidos, poder e preço devem ser números!" })
        }
        const preco_venda = Math.floor(precoNum / 2);
        
        // Enviar avatar
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada!" });
        }
        const porta = process.env.PORT
        const avatar = `http://localhost:${porta}/uploads/herois/${req.file.filename}`; // Tem q mudar isso dps pro link do railway

        if (poderNum > 100) {
            return res.status(400).json({ erro: "Poder inicial do herói pode ser no máx 100!" });
        }
        if (precoNum > 150) {
            return res.status(400).json({ erro: "O preço de compra inicial do personagem pode ser no máx 150 moedas!" });
        }

        await heroiModel.addHeroi(nome, avatar, classe, poderNum, precoNum, preco_venda);
        return res.status(200).json({ mensagem: "Herói adicionado com sucesso!" });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao adicionar o herói, tente novamente!" });
    }
}

module.exports = { listarHerois, adicionarHeroi }