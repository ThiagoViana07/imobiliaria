// src/models/empreendimentos.js
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
  { versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }, // <- necessário pro virtual aparecer no JSON
);

empreendimentosSchema.virtual('unidade_imobiliaria', {
  ref: 'unidades-imobiliarias',
  localField: '_id',
  foreignField: 'empreendimento_id',
});

const empreendimentos = mongoose.model('empreendimentos', empreendimentosSchema);
export default empreendimentos;
