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

async function buscarUsuario(usuario) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

    return rows[0];
}

async function buscarPorId(id_usuario) { //Mostrar as informações dentro da pagina inicial
    const [rows] = await db.execute('SELECT nome, foto_perfil, usuario, email, carteira FROM usuario WHERE id_usuario = ?', [id_usuario]);

    return rows[0];
}

async function buscarSenhaPorId(id_usuario) { // Pra validar a senha
    const [rows] = await db.execute('SELECT senha_hash FROM usuario WHERE id_usuario = ?', [id_usuario]);

    return rows[0];
}

async function editarPerfil(id_usuario, nome, usuario, email, hashSenha) {
    if (hashSenha) {
        const sql = `
        UPDATE usuario
        SET
            nome = ?,
            usuario = ?,
            email = ?,
            senha_hash = ?
        WHERE id_usuario = ?
        `;

        await db.execute(sql, [nome, usuario, email, hashSenha, id_usuario]);
    } else {
        const sql = `
        UPDATE usuario
        SET
            nome = ?,
            usuario = ?,
            email = ?
        WHERE id_usuario = ?
        `;

        await db.execute(sql, [nome, usuario, email, id_usuario]);
    }
}

async function atualizarFoto(id_usuario, urlImagem) {
    const sql = `
    UPDATE usuario
    SET foto_perfil = ?
    WHERE id_usuario = ?
    `;

    await db.execute(sql, [urlImagem, id_usuario]);
}

module.exports = { criarUsuario, buscarPorEmail, buscarUsuario, buscarPorId, buscarSenhaPorId, editarPerfil, atualizarFoto };