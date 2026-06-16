CREATE DATABASE herois;
USE herois;

CREATE TABLE usuario (
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    carteira INT
);

CREATE TABLE heroi (
	id_heroi INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    avatar VARCHAR(2048) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sem_imagem.jpg',
    classe ENUM('herói','vilão','anti-heroi') NOT NULL,
    poder INT NOT NULL,
    preco_compra INT NOT NULL,
    preco_venda INT NOT NULL,
    id_usuario INT,
    
    FOREIGN KEY (id_usuario)
		REFERENCES usuario(id_usuario)
);