const express = require('express');
const router = express.Router();

const heroiController = require('../controllers/heroiController');
const authenticar = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

//Rotas de usuário
router.get('/', authenticar, heroiController.listarHerois);

// Rota da foto com o Multer


module.exports = router;