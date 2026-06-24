const db = require('../config/bd');

async function listarGuildas(id_usuario) {
    const [rows] = await db.execute("SELECT * FROM time WHERE id_usuario = ?", [id_usuario]);
    return rows[0];
}

async function criarGuilda(nome, descricao, id_usuario) {
    const sql = "INSERT INTO time (nome, descricao, id_usuario) VALUES (?, ?, ?)";
    const [resultado] = await db.execute(sql, [nome, descricao, id_usuario]);
    return resultado;
}

async function mostrarHeroisGuilda(id_time) {
    const [rows] = await db.execute(`
        SELECT h.id_heroi, h.nome, h.avatar, h.classe, h.poder, h.nivel, h.preco_venda, t.id_time
        FROM heroi h
        INNER JOIN time t
            ON h.id_time = t.id_time
        WHERE h.id_time = ?
    `, [id_time]);
    return rows; 
}

module.exports = { listarGuildas, criarGuilda, mostrarHeroisGuilda }