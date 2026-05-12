const { validateDate } = require("./common.validation");

// ========== VALIDATION FUNCTIONS ==========

const FORMAS_PAGAMENTO_PERMITIDAS = ["Boleto", "Pix", "Cartão", "Transferência", "Dinheiro"];

const validatePagamentoInput = (pagamento) => {
  const errors = [];

  // Required fields validation
  const requiredFields = ["venda_id", "valor", "data", "forma_pagamento"];

  for (const field of requiredFields) {
    if (
      !(field in pagamento) ||
      pagamento[field] === null ||
      pagamento[field] === undefined
    ) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  // venda_id validation
  if (!Number.isInteger(pagamento.venda_id) || pagamento.venda_id <= 0) {
    errors.push("venda_id deve ser um número inteiro positivo");
  }

  // valor validation
  if (typeof pagamento.valor !== "number" || pagamento.valor <= 0) {
    errors.push("valor deve ser um número positivo");
  }

  // data validation
  if (typeof pagamento.data !== "string" || !validateDate(pagamento.data)) {
    errors.push("data deve estar no formato DD/MM/YYYY");
  }

  // forma_pagamento validation
  if (
    typeof pagamento.forma_pagamento !== "string" ||
    !FORMAS_PAGAMENTO_PERMITIDAS.includes(pagamento.forma_pagamento)
  ) {
    errors.push(
      `forma_pagamento deve ser um dos seguintes valores: ${FORMAS_PAGAMENTO_PERMITIDAS.join(", ")}`,
    );
  }

  // juros validation (opcional)
  if (pagamento.juros !== undefined && pagamento.juros !== null) {
    if (typeof pagamento.juros !== "number" || pagamento.juros < 0) {
      errors.push("juros deve ser um número não negativo");
    }
  }

  return errors;
};

const validatePagamentoUpdateInput = (updateData) => {
  const errors = [];

  // Check if there's at least one field to update
  if (Object.keys(updateData).length === 0) {
    errors.push("Pelo menos um campo deve ser fornecido para atualização");
    return errors;
  }

  // venda_id validation
  if (updateData.venda_id !== undefined) {
    if (!Number.isInteger(updateData.venda_id) || updateData.venda_id <= 0) {
      errors.push("venda_id deve ser um número inteiro positivo");
    }
  }

  // valor validation
  if (updateData.valor !== undefined) {
    if (typeof updateData.valor !== "number" || updateData.valor <= 0) {
      errors.push("valor deve ser um número positivo");
    }
  }

  // data validation
  if (updateData.data !== undefined) {
    if (
      typeof updateData.data !== "string" ||
      !validateDate(updateData.data)
    ) {
      errors.push("data deve estar no formato DD/MM/YYYY");
    }
  }

  // forma_pagamento validation
  if (updateData.forma_pagamento !== undefined) {
    if (
      typeof updateData.forma_pagamento !== "string" ||
      !FORMAS_PAGAMENTO_PERMITIDAS.includes(updateData.forma_pagamento)
    ) {
      errors.push(
        `forma_pagamento deve ser um dos seguintes valores: ${FORMAS_PAGAMENTO_PERMITIDAS.join(", ")}`,
      );
    }
  }

  // juros validation
  if (updateData.juros !== undefined && updateData.juros !== null) {
    if (typeof updateData.juros !== "number" || updateData.juros < 0) {
      errors.push("juros deve ser um número não negativo");
    }
  }

  return errors;
};

module.exports = {
  validatePagamentoInput,
  validatePagamentoUpdateInput,
};