const express = require('express');
const router = express.Router();

const heroiController = require('../controllers/heroiController');
const authenticar = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

//Rotas de usuário
router.get('/', authenticar, heroiController.listarHerois);
router.post("/addHeroi", authenticar, upload.single("foto"), heroiController.adicionarHeroi);
router.post('/:id_heroi/comprar', authenticar, heroiController.comprarHeroi);
router.post('/:id_heroi/vender', authenticar, heroiController.venderHerois);

module.exports = router;