import {
  getAllPagamentos,
  getPagamentoById,
  insertPagamento,
  deletePagamento,
  editPagamento,
} from '../services/pagamento.service.js';
import {
  validatePagamentoInput,
  validatePagamentoUpdateInput,
} from '../validations/pagamento.validation.js';

async function obterPagamento(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: 'Id inválido' });

    const pagamento = await getPagamentoById(id);
    res.status(200).json(pagamento);
  } catch (error) {
    const status = error.message.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

async function obterPagamentos(req, res) {
  try {
    const pagamentos = await getAllPagamentos();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function cadastrarPagamento(req, res) {
  try {
    const novoPagamento = req.body;
    if (!novoPagamento || Object.keys(novoPagamento).length === 0) {
      return res.status(400).json({ erro: 'Corpo da requisição inválido ou vazio' });
    }

    const errors = validatePagamentoInput(novoPagamento);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    await insertPagamento(novoPagamento);
    res.status(201).json({ mensagem: 'Pagamento inserido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function editarPagamento(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: 'Id inválido' });

    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ erro: 'Corpo da requisição inválido ou vazio' });
    }

    const errors = validatePagamentoUpdateInput(body);
    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    await editPagamento(body, id);
    res.status(200).json({ mensagem: 'Pagamento atualizado com sucesso' });
  } catch (error) {
    const status = error.message.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

async function deletarPagamento(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ erro: 'Id inválido' });

    await deletePagamento(id);
    res.status(200).json({ mensagem: 'Pagamento deletado com sucesso' });
  } catch (error) {
    const status = error.message.includes('não encontrado') ? 404 : 500;
    res.status(status).json({ erro: error.message });
  }
}

export { obterPagamento, obterPagamentos, cadastrarPagamento, deletarPagamento, editarPagamento };
