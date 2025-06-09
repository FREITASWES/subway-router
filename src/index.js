const express = require('express');
const connectDatabase = require('./database/connect');
const userController = require('./controllers/userController');

const app = express();
// Porta do servidor
const PORT = 3000;

app.use(express.json());

//Conecta ao BD
connectDatabase();

//Rota GET que retorna usuários
app.get('/', userController.getAllUsers);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});