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

async function buscarHeroi(id_heroi) {
    const [rows] = await db.execute("SELECT * FROM heroi WHERE id_heroi = ?", [id_heroi]);
    return rows.length > 0 ? rows[0] : null;
}

async function addHeroi(nome, avatar, classe, poder, preco_compra, preco_venda) {
    const sql = "INSERT INTO heroi (nome, avatar, classe, poder, preco_compra, preco_venda) VALUES (?, ?, ?, ?, ?, ?)";
    const [resultado] = await db.execute(sql, [nome, avatar, classe, poder, preco_compra, preco_venda]);
    return resultado;
}

async function comprarHeroi({ id_time, preco_compra, id_heroi, id_usuario }) {
    const conexao = await db.getConnection();

    try {
        await conexao.beginTransaction();

        const [usuario] = await conexao.execute("SELECT carteira FROM usuario WHERE id_usuario = ?", [id_usuario]);
        if(usuario[0].carteira < preco_compra) {
            throw new Error("Saldo insufuciente");
        }
        
        const [heroi] = await conexao.execute("SELECT id_time FROM heroi WHERE id_heroi = ?", [id_heroi]);
        if (heroi[0].id_time) {
            throw new Error("Herói já possui um time!");
        }

        await conexao.execute("UPDATE heroi SET id_time = ? WHERE id_heroi = ?", [id_time, id_heroi]);
        await conexao.execute("UPDATE usuario SET carteira = carteira - ? WHERE id_usuario = ?", [preco_compra, id_usuario]);

        await conexao.commit();
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
}

async function venderHeroi({ id_heroi, preco_venda, id_usuario }) {
    const conexao = await db.getConnection();
    
    try {
        await conexao.beginTransaction();

        await conexao.execute("UPDATE heroi SET id_time = NULL WHERE id_heroi = ?", [id_heroi]);
        await conexao.execute("UPDATE usuario SET carteira = carteira + ? WHERE id_usuario = ?", [preco_venda, id_usuario]);

        await conexao.commit();
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
}

module.exports = { mostrarHerois, buscarHeroi, addHeroi, comprarHeroi, venderHeroi }