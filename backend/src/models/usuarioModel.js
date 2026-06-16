const db = require('../config/bd');

async function criarUsuario(nome, usuario, email, senha) {
    const sql = `INSERT INTO usuario (nome, usuario, email, senha_hash) VALUES (?, ?, ?, ?)`;

    const [resultado] = await db.execute(
        sql,
        [nome, usuario, email, senha]
    );

    return resultado;
}

async function buscarPorEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE email = ?', [email]);

    return rows[0];
}

module.exports = { criarUsuario, buscarPorEmail };