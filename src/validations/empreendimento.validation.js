import { validateCEP } from './common.validation.js';

const validateEmpreendimentoInput = (empreendimento) => {
  const errors = [];
  const requiredFields = ['id', 'nome', 'cidade', 'bairro', 'estado', 'cep'];

  for (const field of requiredFields) {
    if (
      !(field in empreendimento) ||
      empreendimento[field] === null ||
      empreendimento[field] === undefined
    ) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  if (!Number.isInteger(empreendimento.id) || empreendimento.id <= 0) {
    errors.push('Id deve ser um número inteiro positivo');
  }

  if (typeof empreendimento.nome !== 'string' || empreendimento.nome.trim().length === 0) {
    errors.push('Nome deve ser uma string não vazia');
  }

  if (typeof empreendimento.cep !== 'string' || !validateCEP(empreendimento.cep)) {
    errors.push('CEP deve estar no formato XXXXX-XXX');
  }

  return errors;
};

const validateEmpreendimentoUpdateInput = (empreendimento) => {
  const errors = [];
  const allowedFields = ['nome', 'cidade', 'bairro', 'estado', 'cep'];

  for (const field in empreendimento) {
    console.log('Validando campo:', field);
    if (!allowedFields.includes(field)) {
      errors.push(`Campo não permitido para atualização: ${field}`);
    }
  }
  return errors;
};

export { validateEmpreendimentoInput, validateEmpreendimentoUpdateInput };
