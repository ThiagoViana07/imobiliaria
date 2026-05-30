import mongoose from "mongoose"

const parcelaSchema = new mongoose.Schema({
    data_vencimento: { type: String, required: true },
    data_pagamento: { type: String, default: null },
    valor_parcela: { type: Number, required: true },
    juros: { type: Number, default: 0 },
    forma_pagamento: { type: String, required: true, enum: ['Boleto', 'Transferencia', 'Dinheiro', 'Cartao'] }
}, {  versionKey: false });

const clienteSchema = new mongoose.Schema({
    cliente_id: { type: String, required: true },
    nome: { type: String, required: true },
    responsavel_financeiro: { type: Boolean, default: false }
}, { _id: false, versionKey: false });

const vendaSchema = new mongoose.Schema({
    vendedor: {
        vendedor_id: { type: mongoose.SchemaTypes.ObjectId , required: true },
        nome: { type: String, required: true }
    },
    data_venda: { type: String, required: true },
    data_pagamento_entrada: { type: String, default: null },
    quantidade_parcelas: { type: Number, required: true },
    valor_entrada: { type: Number, required: true },
    valor_venda: { type: Number, required: true },
    comissao_vendedor: { type: Number, default: null },
    comissao_data_recebimento: { type: String, default: null },
    status: {
        type: String,
        required: true,
        enum: ['Liquidado', 'Transferido', 'Financiado', 'Distratado']
    },
    unidade_imobiliaria: {
        empreendimento_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
        unidade_imobiliaria_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
        valor_total: { type: Number, required: true }
    },
    cliente: { type: [clienteSchema], required: true },
    parcela: { type: [parcelaSchema], default: [] }
}, { versionKey: false });

export default mongoose.model("venda", vendaSchema);
