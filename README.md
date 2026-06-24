# Projeto Herois - Sala de heróis, criação de times e missões

## Tecnologias usadas:

### Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS
- TanStack Query
- React Toastify


### Backend
- Node.js
- Express
- MySQL
- CORS
- dotenv
- JWT
- BCrypt
- Multer

---

## Como Rodar localmente:

Após clonar o projeto utilizando:
```bash
git clone https://github.com/matheus41955-ship-it/Herois.git
```
- Importe o schema do banco de dados no MySQL

### Criar um arquivo .env
Crie um arquivo .env na pasta raíz do backend com as seguintes informações:
 ```bash
PORT

BD_HOST
DB_USER
DB_PASSWORD
DB_PORT
DB_NAME

JWT_SECRET
```

### Ligar o Backend
 ```bash
cd backend/
npm install
node src/server.js
``` 
### Iniciar o Frontend
```bash
cd frontend/
npm install
npm run dev
```
