// models/clients.js

import mongoose from 'mongoose';

const telefoneSchema = new mongoose.Schema(
  {
    residencial: {
      type: String,
      default: null,
    },
    comercial: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

const enderecoSchema = new mongoose.Schema(
  {
    logradouro: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
      default: null,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const clientSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    rg: {
      type: String,
      required: true,
    },
    data_nascimento: {
      type: String,
      required: true,
    },
    profissao: {
      type: String,
      required: true,
    },
    estado_civil: {
      type: String,
      required: true,
      enum: ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'União Estável'],
    },
    telefone: {
      type: [telefoneSchema],
      default: [],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    endereco: {
      type: [enderecoSchema],
      default: [],
    },
  },
  {
    collection: 'clientes',
    versionKey: false, // removes __v
  },
);

export { clientSchema };
export default mongoose.model('Clients', clientSchema);
