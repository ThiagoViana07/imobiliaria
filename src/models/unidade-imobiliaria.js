import mongoose from 'mongoose';

const unidadeImobiliariaSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    empreendimento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'empreendimentos' },
    numero: { type: String, required: true },
    quadra: { type: String },
    valor: { type: Number },
    area: { type: Number },
    tipo: { type: String },
    status: { type: String },
  },
  { versionKey: false },
);

const unidadeImobiliaria = mongoose.model('unidadeImobiliaria', unidadeImobiliariaSchema);
export default unidadeImobiliaria;
