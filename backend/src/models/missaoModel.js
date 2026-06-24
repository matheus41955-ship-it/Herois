const db = require('../config/bd');

async function criarMissao(id_heroi, nome, descricao) {
    try {
        const [result] = await db.execute(
            "INSERT INTO missao (id_heroi, nome, descricao) VALUES (?, ?, ?)",
            [id_heroi, nome, descricao]
        );
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = { criarMissao };

async function listarMissoesPorHeroi(id_heroi) {
    const [rows] = await db.execute("SELECT * FROM missao WHERE id_heroi = ? AND concluido = 'Não'", [id_heroi]);
    return [rows];
}

async function completarMissaoTransacao(id_missao, id_usuario) {
    const conexao = await db.getConnection();
    try {
        await conexao.beginTransaction();

        const [missoes] = await conexao.execute("SELECT * FROM missao WHERE id_missao = ?", [id_missao]);
        if (missoes.length === 0) throw new Error("Missão não encontrada");
        const missao = missoes[0];

        const [herois] = await conexao.execute("SELECT * FROM heroi WHERE id_heroi = ?", [missao.id_heroi]);
        const heroi = herois[0];

        const recompensa_xp = Math.floor(Math.random() * (30 - 25 + 1)) + 25;
        const recompensa_ouro = Math.floor(Math.random() * (60 - 50 + 1)) + 50;

        await conexao.execute("UPDATE usuario SET carteira = carteira + ? WHERE id_usuario = ?", [recompensa_ouro, id_usuario]);

        // Progresso de nivel e atributos
        let novo_xp = heroi.xp + recompensa_xp;
        let novo_nivel = heroi.nivel;
        let novo_poder = heroi.poder;
        let novo_preco_venda = heroi.preco_venda;

        while (true) {
            let xp_necessario = Math.ceil(100 * Math.pow(1.1, novo_nivel - 1));
            if (novo_xp >= xp_necessario) {
                novo_xp -= xp_necessario;
                novo_nivel += 1;
                novo_poder = Math.ceil(novo_poder * 1.08); // +8% de poder
                novo_preco_venda += 30; // Aumenta venda em 30 ao subir de nivel
            } else {
                break;
            }
        }

        await conexao.execute("UPDATE heroi SET nivel = ?, xp = ?, poder = ?, preco_venda = ? WHERE id_heroi = ?", [novo_nivel, novo_xp, novo_poder, novo_preco_venda, heroi.id_heroi]);

        await conexao.execute("UPDATE missao SET concluido = 'Sim' WHERE id_missao = ?", [id_missao]);

        await conexao.commit();
        return { novo_nivel, novo_xp, novo_poder, ouro_ganho: recompensa_ouro, xp_ganho: recompensa_xp };
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
}

module.exports = { criarMissao, listarMissoesPorHeroi, completarMissaoTransacao }