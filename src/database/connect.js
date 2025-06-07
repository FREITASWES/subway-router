const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb+srv://freitasswesley:1670091Wl@cluster0.i2mmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("MongoDB conectado com sucesso!");
    } catch(error) {
        console.error("Erro ao conectar no MongoDB", error);
    }
}

module.exports = connectDatabase;