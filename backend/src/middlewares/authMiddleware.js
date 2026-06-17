const jwt = require("jsonwebtoken");
require("dotenv").config();

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    try {

        //Validação do token
        const dadosUsuario = jwt.verify(token, process.env.JWT_SECRET);

        //Salva user dentro da requisição
        req.usuarioLogado = dadosUsuario;
        next();
    } catch (erro) {
        return res.status(403).json({ erro: "Token Inválido" });
    }
}

module.exports = autenticar;