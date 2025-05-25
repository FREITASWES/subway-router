const express = require('express');
const app = express();

// Porta do servidor
const PORT = 3000;

//Rota GET que retorna usuários simulados
app.get('/', (req, res) => {

    //Array de usuarios
    const usuarios = [
        {
            id: 1,
            nome: 'Maria Silva',
            email: 'maria.silva@example.com'
        },
        {
            id: 2,
            nome: 'João Souza',
            email: 'joao.souza@example.com'
        },
        {
            id: 3,
            nome: 'Ana Costa',
            email: 'ana.costa@example.com'
        }
    ];

    //Retorna o JSON
    res.json(usuarios);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});