import mongoose from 'mongoose';

const empreendimentosSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    cep: { type: String },
  },
  { versionKey: false },
);

const empreendimentos = mongoose.model('empreendimentos', empreendimentosSchema);
export default empreendimentos;
