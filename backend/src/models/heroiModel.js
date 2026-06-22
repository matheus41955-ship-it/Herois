const db = require('../config/bd');

async function mostrarHerois() {
    const [rows] = await db.execute(`
        SELECT 
            h.id_heroi, h.nome, h.avatar, h.classe, h.poder, h.nivel, h.preco_compra, h.id_time,
            CASE 
                WHEN t.nome IS NULL THEN 'Sem time, recrute agora!'
                ELSE t.nome
            END AS time
        FROM heroi h
        LEFT JOIN time t ON h.id_time = t.id_time`);
    return rows;
}

module.exports = { mostrarHerois }