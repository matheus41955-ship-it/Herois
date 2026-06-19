const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const authenticar = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

//Rotas de usuário
router.post('/cadastro', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/home', authenticar, usuarioController.mostrarInformacoes);
router.put('/perfil', authenticar, usuarioController.editarPerfil);

// Rota da foto com o Multer
router.put('/foto', authenticar, upload.single('foto'), usuarioController.atualizarFoto);


module.exports = router;