const express = require('express');
const router = express.Router();

const guildaController = require("../controllers/guildaController");
const authenticar = require('../middlewares/authMiddleware');

router.get("/", authenticar, guildaController.mostrarGuilda);
router.post('/novoTime', authenticar, guildaController.criarGuilda);

module.exports = router