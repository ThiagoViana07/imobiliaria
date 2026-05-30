import {
  deletarEmpreendimentoPorId,
  getEmpreendimentoPorId,
  getTodosEmpreendimentos,
  insereEmpreendimento,
  modificaEmpreendimento,
} from '../services/empreendimento.service.js';

import {
  validateEmpreendimentoInput,
  validateEmpreendimentoUpdateInput,
} from '../validations/empreendimento.validation.js';

async function getEmpreendimentos(req, res) {
  try {
    const empreendimentos = await getTodosEmpreendimentos();
    res.status(200).json(empreendimentos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function getEmpreendimento(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const empreendimento = await getEmpreendimentoPorId(id);
      res.status(200).json(empreendimento);
    } else {
      res.status(422).json({ mensagem: 'Id inválido' });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function postEmpreendimento(req, res) {
  try {
    const empreendimentoNovo = req.body;
    // Validação simples exigindo nome e CPF
    const validationErros = validateEmpreendimentoInput(empreendimentoNovo);

    if (validationErros.length > 0) {
      res.status(400).json({
        message: 'Dados de entrada inválidos',
        success: false,
        errors: validationErros,
      });
    } else {
      await insereEmpreendimento(empreendimentoNovo);
      res.status(201).json({
        message: 'Empreendimento inserido com sucesso!',
        success: true,
        data: empreendimentoNovo,
      });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function patchEmpreendimento(req, res) {
  try {
    const id = req.params.id;

    if (id) {
      const body = req.body;
      const validationErros = validateEmpreendimentoUpdateInput(body);

      if (validationErros.length > 0) {
        res.status(400).json({
          message: 'Dados de entrada inválidos',
          success: false,
          errors: validationErros,
        });
      } else {
        await modificaEmpreendimento(body, id);
        res.status(200).json({ mensagem: 'Empreendimento atualizado com sucesso' });
      }
    } else {
      res.status(422).json({ mensagem: 'Id inválido' });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function deleteEmpreendimento(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      await deletarEmpreendimentoPorId(id);
      res.status(200).json({ mensagem: 'Empreendimento deletado com sucesso' });
    } else {
      res.status(422).json({ mensagem: 'Id inválido' });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export {
  getEmpreendimentos,
  getEmpreendimento,
  postEmpreendimento,
  patchEmpreendimento,
  deleteEmpreendimento,
};
