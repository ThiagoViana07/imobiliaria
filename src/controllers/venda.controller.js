import {
  getAllVendas,
  getVendaById,
  insertVenda,
  deleteVenda,
  editVenda,
} from '../services/venda.service.js';
import { validateVendaInput, validateVendaUpdateInput } from '../validations/venda.validation.js';

async function obterVenda(req, res) {
  try {

    const venda = await getVendaById(id);
    res.status(200).json(venda);
  } catch (error) {
    const status = error.message.includes('não encontrada') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

async function obterVendas(req, res) {
  try {
    const vendas = await getAllVendas();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

// Validations Inicio

async function cadastrarVenda(req, res) {
  try {
    const novaVenda = req.body;
    if (!novaVenda || Object.keys(novaVenda).length === 0) {
      return res.status(400).json({ erro: 'Corpo da requisição inválido ou vazio' });
    }

    const errors = validateVendaInput(novaVenda);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    await insertVenda(novaVenda);
    res.status(201).json({ mensagem: 'Venda cadastrada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function editarVenda(req, res) {
  try {
    const id = req.params.id;

    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ erro: 'Corpo da requisição inválido ou vazio' });
    }

    const errors = validateVendaUpdateInput(body);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    await editVenda(body, id);
    res.status(200).json({ mensagem: 'Venda atualizada com sucesso' });
  } catch (error) {
    const status = error.message.includes('não encontrada') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

// Validations FIM

async function deletarVenda(req, res) {
  try {
    const id = req.params.id;

    await deleteVenda(id);
    res.status(200).json({ mensagem: 'Venda deletada com sucesso' });
  } catch (error) {
    const status = error.message.includes('não encontrada') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

export { obterVenda, obterVendas, cadastrarVenda, deletarVenda, editarVenda };
