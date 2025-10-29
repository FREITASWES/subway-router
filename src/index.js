const express = require('express');
const connectDatabase = require('./database/connect');

const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');
const manufacturerController = require('./controllers/manufacturer-controller');

const validateManufacturer = require('./middlewares/validateManufacturer');

const app = express();
// Porta do servidor
const PORT = 3000;

app.use(express.json());

//Conecta ao BD
connectDatabase();

//Rota GET que retorna usuários
app.get('/', userController.getAllUsers);
app.post('/', roleController.createRole);

app.post('/manufacturer', validateManufacturer, manufacturerController.createManufacturer);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});