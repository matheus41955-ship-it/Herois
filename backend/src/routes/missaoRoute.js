const express = require('express');
const router = express.Router();

const missaoController = require('../controllers/missaoController');
const authenticar = require('../middlewares/authMiddleware');

router.get('/:id_heroi', authenticar, missaoController.buscarMissoes);
router.post('/:id_heroi/criarMissao', authenticar,  missaoController.criarMissao);
router.put('/:id_missao/completar', authenticar, missaoController.concluirMissao);

module.exports = router