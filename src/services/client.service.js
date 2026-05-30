// import { readData, saveData } from './database.js';
import Clients from '../models/clients.js';

// ========== CRUD FUNCTIONS ==========

const getTodosClientes = async () => {
  try {
    const data = await Clients.find();
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar clientes: ${error.message}`);
  }
};

const getClienteById = async (id) => {
  try {
    const cliente = await Clients.findOne({ _id: id });

    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    return cliente;
  } catch (error) {
    throw new Error(`Erro ao buscar cliente por ID: ${error.message}`);
  }
};

const getClienteByCpf = async (cpf) => {
  try {
    const cliente = await Clients.findOne({ cpf: cpf });

    if (!cliente) {
      throw new Error(`Cliente com CPF ${cpf} não encontrado`);
    }

    return cliente;
  } catch (error) {
    throw new Error(`Erro ao buscar cliente por CPF: ${error.message}`);
  }
};

const inserirCliente = async (novoCliente) => {
  try {
    // Verificar se CPF já existe
    const clienteExistente = await Clients.findOne({
      cpf: novoCliente.cpf,
    });

    if (clienteExistente) {
      throw new Error(`Cliente com CPF ${novoCliente.cpf} já existe`);
    }

    const clienteCriado = await Clients.create(novoCliente);

    return clienteCriado;
  } catch (error) {
    throw new Error(`Erro ao inserir cliente: ${error.message}`);
  }
};

const modificarCliente = async (id, dadosAtualizacao) => {
  try {
    const cliente = await Clients.findOne({ _id: id });

    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    // Se o CPF está sendo atualizado, verificar duplicação
    if (dadosAtualizacao.cpf && dadosAtualizacao.cpf !== cliente.cpf) {
      const cpfExistente = await Clients.findOne({ cpf: dadosAtualizacao.cpf });
      if (cpfExistente) {
        throw new Error(`Cliente com CPF ${dadosAtualizacao.cpf} já existe`);
      }
    }

    // Atualizar o documento diretamente no banco de dados e retornar o documento atualizado
    const clienteAtualizado = await Clients.findByIdAndUpdate(id, dadosAtualizacao, {
      returnDocument: 'after',
      runValidators: true,
    });

    return clienteAtualizado;
  } catch (error) {
    throw new Error(`Erro ao modificar cliente: ${error.message}`);
  }
};

const deletarCliente = async (id) => {
  try {
    const cliente = await Clients.findOne({ _id: id });

    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    await Clients.findByIdAndDelete(id);
    return cliente;
  } catch (error) {
    throw new Error(`Erro ao deletar cliente: ${error.message}`);
  }
};

export {
  getTodosClientes,
  getClienteById,
  getClienteByCpf,
  inserirCliente,
  modificarCliente,
  deletarCliente,
};
