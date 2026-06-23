const express = require('express');
const router = express.Router();

const heroiController = require('../controllers/heroiController');
const authenticar = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

//Rotas de usuário
router.get('/', authenticar, heroiController.listarHerois);
router.post("/addHeroi", authenticar, upload.single("foto"), heroiController.adicionarHeroi);

module.exports = router;