// src/validations/vendedor-adrian.validation.js

const validateVendedorInput = (vendedor) => {
  const errors = [];
  const requiredFields = ['nome', 'cpf', 'telefone', 'creci'];

  // Verifica se os campos obrigatórios existem
  for (const field of requiredFields) {
    if (!(field in vendedor) || vendedor[field] === null || vendedor[field] === undefined) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  // Validação de Nome
  if (typeof vendedor.nome !== 'string' || vendedor.nome.trim().length === 0) {
    errors.push('Nome deve ser uma string não vazia.');
  }

  // Validação de CPF (Exigindo 11 números, conforme seu JSON)
  if (
    typeof vendedor.cpf !== 'string' ||
    vendedor.cpf.length !== 11 ||
    !/^\d+$/.test(vendedor.cpf)
  ) {
    errors.push('CPF deve ser uma string contendo exatamente 11 números.');
  }

  // Validação de Telefone (Exigindo 11 números, ex: 11991112233)
  if (
    typeof vendedor.telefone !== 'string' ||
    vendedor.telefone.length < 10 ||
    !/^\d+$/.test(vendedor.telefone)
  ) {
    errors.push('Telefone deve ser uma string contendo apenas números (ex: 11991112233).');
  }

  // Validação de CRECI
  if (typeof vendedor.creci !== 'string' || vendedor.creci.trim().length === 0) {
    errors.push('CRECI deve ser uma string não vazia.');
  }

  return errors;
};

const validateVendedorUpdateInput = (updateData) => {
  const errors = [];

  // Verifica se enviou um body vazio
  if (Object.keys(updateData).length === 0) {
    errors.push('Pelo menos um campo deve ser fornecido para atualização.');
    return errors;
  }

  if (updateData.nome !== undefined) {
    if (typeof updateData.nome !== 'string' || updateData.nome.trim().length === 0) {
      errors.push('Nome deve ser uma string não vazia.');
    }
  }

  if (updateData.cpf !== undefined) {
    if (
      typeof updateData.cpf !== 'string' ||
      updateData.cpf.length !== 11 ||
      !/^\d+$/.test(updateData.cpf)
    ) {
      errors.push('CPF deve ser uma string contendo exatamente 11 números.');
    }
  }

  if (updateData.telefone !== undefined) {
    if (
      typeof updateData.telefone !== 'string' ||
      updateData.telefone.length < 10 ||
      !/^\d+$/.test(updateData.telefone)
    ) {
      errors.push('Telefone deve ser uma string contendo apenas números.');
    }
  }

  if (updateData.creci !== undefined) {
    if (typeof updateData.creci !== 'string' || updateData.creci.trim().length === 0) {
      errors.push('CRECI deve ser uma string não vazia.');
    }
  }

  return errors;
};

export { validateVendedorInput, validateVendedorUpdateInput };

