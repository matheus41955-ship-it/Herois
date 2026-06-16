const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// Arquivos de routes aqui
const usuarioRoutes = require('./routes/usuarioRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // Serve pra ler os formulários HTML
app.use(cors());

// Rotas
app.use('/usuarios', usuarioRoutes);

// Porta do servidor
const porta = process.env.PORT
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});