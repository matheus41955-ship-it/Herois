CREATE DATABASE herois;
USE herois;

CREATE TABLE usuario (
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(2048) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg',
    carteira INT DEFAULT 500
);

CREATE TABLE time (
    id_time INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL DEFAULT 'Nenhuma descrição.',
    id_usuario INT NOT NULL,

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);

CREATE TABLE heroi (
	id_heroi INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    avatar VARCHAR(2048) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg',
    classe ENUM('herói','vilão','anti-heroi') NOT NULL,
    poder INT NOT NULL,
    nivel INT NOT NULL DEFAULT 1,
    preco_compra INT NOT NULL,
    preco_venda INT NOT NULL,
    id_time INT,

    FOREIGN KEY (id_time)
        REFERENCES time(id_time)
);

CREATE TABLE missao (
    id_missao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL DEFAULT 'Nenhuma descrição.',
    id_heroi INT NOT NULL,

    FOREIGN KEY (id_heroi)
        REFERENCES heroi(id_heroi)
);