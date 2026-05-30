import {
  getTodosVendedores,
  getVendedorPorId,
  insereVendedor,
  modificaVendedor,
  deletarVendedorPorId,
} from '../services/vendedor.service.js';

// Importando o arquivo de validação vendedor-adrian.validation
import {
  validateVendedorInput,
  validateVendedorUpdateInput,
} from '../validations/vendedor-adrian.validation.js';

async function getVendedores(req, res) {
  try {
    const vendedores = await getTodosVendedores();
    res.status(200).json(vendedores);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function getVendedor(req, res) {
  try {
    const id = req.params.id;
    // VALIDAÇÃO: Verifica se o ID foi passado
    if (!id) {
      return res.status(422).json({ mensagem: 'ID é obrigatório.' });
    }

    const vendedor = await getVendedorPorId(id);
    // VALIDAÇÃO: Verifica se o vendedor existe
    if (!vendedor) {
      return res.status(404).json({ mensagem: 'Vendedor não encontrado.' });
    }

    res.status(200).json(vendedor);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function postVendedor(req, res) {
  try {
    const novoVendedor = req.body;
    // Valida os dados antes de prosseguir
    const validationErros = validateVendedorInput(novoVendedor);
    if (validationErros.length > 0) {
      return res.status(400).json({
        mensagem: 'Dados de entrada inválidos',
        sucesso: false,
        erros: validationErros,
      });
    }

    // Criando ID simples em string, mantendo compatibilidade com seu JSON
    //novoVendedor.id = Date.now().toString();
    // A linha que criava o ID (Date.now()) foi removida daqui! O MongoDB Atlas fará isso sozinho.

    // O Mongoose salva o vendedor e nós guardamos a resposta dele (que já inclui o _id gerado) na variável vendedorSalvo
    const vendedorSalvo = await insereVendedor(novoVendedor);
    //como estava antes
    //await insereVendedor(novoVendedor);
    res.status(201).json({
      mensagem: 'Solicitação deferida. Vendedor criado com sucesso!',
      //vendedor: novoVendedor,
      vendedor: vendedorSalvo,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function patchVendedor(req, res) {
  try {
    const id = req.params.id;
    const modificacoes = req.body;

    if (!id) {
      return res.status(422).json({ mensagem: 'ID é obrigatório.' });
    }

    const validationErros = validateVendedorUpdateInput(modificacoes);
    if (validationErros.length > 0) {
      return res.status(400).json({
        mensagem: 'Dados de atualização inválidos',
        sucesso: false,
        erros: validationErros,
      });
    }

    const vendedorExiste = await getVendedorPorId(id);
    if (!vendedorExiste) {
      return res.status(404).json({ mensagem: 'Vendedor não encontrado para edição.' });
    }

    await modificaVendedor(modificacoes, id);
    res.status(200).json({ mensagem: 'Solicitação deferida. Vendedor atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function deleteVendedor(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(422).json({ mensagem: 'ID é obrigatório.' });
    }

    const vendedorExiste = await getVendedorPorId(id);
    if (!vendedorExiste) {
      return res.status(404).json({ mensagem: 'Vendedor não encontrado para deleção.' });
    }

    await deletarVendedorPorId(id);
    res.status(200).json({ mensagem: 'Ação deferida. Vendedor deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
export { getVendedores, getVendedor, postVendedor, patchVendedor, deleteVendedor };
