const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

//Rotas de usuário
router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.login);


module.exports = router;