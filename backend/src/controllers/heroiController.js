const heroiModel = require('../models/heroiModel');

async function listarHerois(req, res) {
    try {
        const herois = await heroiModel.mostrarHerois();
        res.json(herois);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Não foi possível mostrar os heróis, tente novamente!' })
    }
}

module.exports = { listarHerois }