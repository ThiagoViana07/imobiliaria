// src/models/Vendedor.js
import mongoose from "mongoose";

// O Schema define as regras e a estrutura que os documentos de vendedor seguirão no banco
const vendedorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    telefone: { type: String, required: true },
    creci: { type: String, required: true },
}, { versionKey: false }); // Desabilita o campo __v de versionamento interno do MongoDB

// O modelo serve de interface para a API executar as operações de CRUD na coleção "vendedores"
const vendedor = mongoose.model('vendedores', vendedorSchema);

export default vendedor;