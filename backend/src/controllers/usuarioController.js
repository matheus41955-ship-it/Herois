const { cadastroSchema, loginSchema, editarPerfilSchema } = require('../schemas/usuarioSchema')
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

const jwt = require("jsonwebtoken");
require('dotenv').config()

async function cadastrar(req, res) {
    try {
        // Validação com Zod
        const resultado = cadastroSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({ erro: resultado.error.errors.map(e => e.message) });
        }

        // Dados validados
        const { nome, usuario, email, senha } = resultado.data;
        
        const emailExiste = await usuarioModel.buscarPorEmail(email);
        if (emailExiste) {
            return res.status(400).json({ erro: "Email já cadastrado, faça login!" });
        }

        const usuarioUtilizado = await usuarioModel.buscarUsuario(usuario);
        if (usuarioUtilizado) {
            return res.status(400).json({ erro: "Nome de usuário já existe" });
        }

        // Criptografia da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Salvar no banco
        await usuarioModel.criarUsuario(nome, usuario, email, senhaHash);

        return res.status(201).json({ mensagem: "Usuário criado com sucesso!" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro no servidor ao cadastrar o usuário' });
    }
}

async function login(req, res) {
    try {

        //Validação Zod
        const resultado = loginSchema.safeParse(req.body);

        if(!resultado.success) {
            return res.status(400).json({ erro: resultado.error.errors.map(e => e.message) })
        }

        // Dados já validados
        const { email, senha } = resultado.data;
    
        const usuario = await usuarioModel.buscarPorEmail(email);
        
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Email ou senha inválidos" })
        }
        

        //Gerar token
        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                email: usuario.email
            }, process.env.JWT_SECRET, { expiresIn: "1d" }
        );
    
        return res.json({ mensagem: 'Login realizado com sucesso!', token });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({ erro: 'Erro interno no servidor, tente novamente mais tarde!' })
    }
}

async function mostrarInformacoes(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;

        const usuario = await usuarioModel.buscarPorId(id_usuario);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        return res.json({
            nome: usuario.nome,
            usuario: usuario.usuario,
            email: usuario.email,
            carteira: usuario.carteira,
            foto_perfil: usuario.foto_perfil
        })
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro no servidor' });
    }
}

async function editarPerfil(req, res) {
    try {
        const validacao = editarPerfilSchema.safeParse(req.body);
        if (!validacao.success) {
            return res.status(400).json({ erros: validacao.error.flatten().fieldErrors });
        }

        const id_usuario = req.usuarioLogado.id;
        const { nome, usuario, email, senhaAtual, novaSenha } = validacao.data;
        
        const usuarioBanco = await usuarioModel.buscarSenhaPorId(id_usuario);
        if (!usuarioBanco) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        const senhaCorreta = await bcrypt.compare(senhaAtual, usuarioBanco.senha_hash);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Senha incorreta" });
        }

        let hashSenha = null;
        if (novaSenha) {
            hashSenha = await bcrypt.hash(novaSenha, 10);
        }

        await usuarioModel.editarPerfil(id_usuario, nome, usuario, email, hashSenha);

        return res.status(200).json({ mensagem: "Perfil atualizado com sucesso!" });


    } catch (erro) {
        console.error(erro);

        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
}

async function atualizarFoto(req, res) {
    try {
        const id_usuario = req.usuarioLogado.id;
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada" });
        }

        const porta = process.env.PORT
        
        const urlImagem = `http://localhost:${porta}/uploads/usuarios/${req.file.filename}`;

        await usuarioModel.atualizarFoto(id_usuario, urlImagem);
        res.json({
            mensagem: "Foto atualizada com sucesso!",
            url: urlImagem
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao atualizar a foto" });
    }
}

module.exports = { cadastrar, login, mostrarInformacoes, editarPerfil, atualizarFoto }