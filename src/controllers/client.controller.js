import {
  getTodosClientes,
  getClienteById,
  getClienteByCpf,
  inserirCliente,
  modificarCliente,
  deletarCliente,
} from '../services/client.service.js';

// ========== VALIDATION FUNCTIONS ==========

import {
  validateClientInput,
  validateClientUpdateInput,
} from '../validations/vendedor.validation.js';

import { validateCPF } from '../validations/common.validation.js';

// ========== CONTROLLER FUNCTIONS ==========

const getClientes = async (req, res) => {
  try {
    const clientes = getTodosClientes();
    res.status(200).json({
      success: true,
      data: clientes,
      count: clientes.length,
    });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

const getCliente = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID do cliente deve ser um número válido',
      });
    }

    const cliente = getClienteById(parseInt(id));
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);

    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

const getClientePorCpf = async (req, res) => {
  try {
    const { cpf } = req.params;

    if (!cpf || typeof cpf !== 'string' || !validateCPF(cpf)) {
      return res.status(400).json({
        success: false,
        message: 'CPF fornecido é inválido. Ele deve ser uma string no formato XXX.XXX.XXX-XX',
      });
    }

    const cliente = getClienteByCpf(cpf);
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error);

    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

const criarCliente = async (req, res) => {
  try {
    const clienteData = req.body;

    // Validate input
    const validationErrors = validateClientInput(clienteData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Dados de entrada inválidos',
        errors: validationErrors,
      });
    }
    const novoCliente = inserirCliente(clienteData);
    res.status(201).json({
      success: true,
      message: 'Cliente criado com sucesso',
      data: novoCliente,
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);

    if (error.message.includes('já existe')) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID do cliente deve ser um número válido',
      });
    }

    // Validate input
    const validationErrors = validateClientUpdateInput(updateData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Dados de atualização inválidos',
        errors: validationErrors,
      });
    }

    const clienteAtualizado = modificarCliente(parseInt(id), updateData);
    res.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso',
      data: clienteAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);

    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('já existe')) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID do cliente deve ser um número válido',
      });
    }

    const clienteDeletado = deletarCliente(parseInt(id));
    res.status(200).json({
      success: true,
      message: 'Cliente excluído com sucesso',
      data: clienteDeletado,
    });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);

    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
};

// ========== EXPORTS ==========
export {
  getClientes,
  getCliente,
  getClientePorCpf,
  criarCliente,
  atualizarCliente,
  excluirCliente,
};
