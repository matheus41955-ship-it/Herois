const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const authenticar = require('../middlewares/authMiddleware');

//Rotas de usuário
router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/home', authenticar, usuarioController.mostrarInformacoes)


module.exports = router;