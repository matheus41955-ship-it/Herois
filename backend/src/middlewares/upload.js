const multer = require("multer"); // Multer recebe e trata arquivos enviados pelo front, no caso aq recebe e transforma em URL
const path = require("path");

const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => {
        let pasta = "uploads/"; // A pasta uploads fica na raíz do back, n da uma de mula e fica procurando erro qnd ta dentro de src

        if (req.baseUrl.includes("usuarios")) { // Isso aq vai separar foto de heroi e de usuário
            pasta = "uploads/usuarios";
        } else if (req.baseUrl.includes("herois")) {
            pasta = "uploads/herois";
        }

        cb(null, pasta);
    },

    filename: (req, file, cb) => { // Nome do arquivo q vai lançar no sistema
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: armazenamento });