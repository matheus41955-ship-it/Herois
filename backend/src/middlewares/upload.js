const multer = require("multer"); // Multer recebe e trata arquivos enviados pelo front, no caso aq recebe e transforma em URL
const path = require("path");

const armazenamento = multer.diskStorage({
    destination: (req, arquivo, callback) => {
        callback(null, "uploads/");
    },

    filename: (req, arquivo, callback) => {
        const nomeUnico = Date.now() + "-" + arquivo.originalname;
        callback(null, nomeUnico);
    }
});

const upload = multer({ armazenamento });
module.exports = upload;