const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/subway");
            console.log("MongoDB conectado com sucesso!");
    } catch(error) {
        console.error("Erro ao conectar no MongoDB", error);
    }
}

module.exports = connectDatabase;