const { validateDate } = require("./common.validation");

// ========== VALIDATION FUNCTIONS ==========

const STATUS_PERMITIDOS = ["Liquidado", "Pendente", "Cancelado"];

const validateVendaInput = (venda) => {
  const errors = [];

  // Required fields validation
  const requiredFields = [
    "vendedor_id",
    "unidade_imobiliaria_id",
    "data_venda",
    "quantidade_parcelas",
    "status",
    "valor_entrada",
    "valor_venda",
  ];

  for (const field of requiredFields) {
    if (
      !(field in venda) ||
      venda[field] === null ||
      venda[field] === undefined
    ) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  // vendedor_id validation
  if (!Number.isInteger(venda.vendedor_id) || venda.vendedor_id <= 0) {
    errors.push("vendedor_id deve ser um número inteiro positivo");
  }

  // unidade_imobiliaria_id validation
  if (
    !Number.isInteger(venda.unidade_imobiliaria_id) ||
    venda.unidade_imobiliaria_id <= 0
  ) {
    errors.push("unidade_imobiliaria_id deve ser um número inteiro positivo");
  }

  // data_venda validation
  if (
    typeof venda.data_venda !== "string" ||
    !validateDate(venda.data_venda)
  ) {
    errors.push("data_venda deve estar no formato DD/MM/YYYY");
  }

  // data_pagamento_entrada validation (opcional)
  if (venda.data_pagamento_entrada !== undefined && venda.data_pagamento_entrada !== null) {
    if (
      typeof venda.data_pagamento_entrada !== "string" ||
      !validateDate(venda.data_pagamento_entrada)
    ) {
      errors.push("data_pagamento_entrada deve estar no formato DD/MM/YYYY");
    }
  }

  // quantidade_parcelas validation
  if (
    !Number.isInteger(venda.quantidade_parcelas) ||
    venda.quantidade_parcelas <= 0
  ) {
    errors.push("quantidade_parcelas deve ser um número inteiro positivo");
  }

  // status validation
  if (
    typeof venda.status !== "string" ||
    !STATUS_PERMITIDOS.includes(venda.status)
  ) {
    errors.push(
      `status deve ser um dos seguintes valores: ${STATUS_PERMITIDOS.join(", ")}`,
    );
  }

  // valor_entrada validation
  if (typeof venda.valor_entrada !== "number" || venda.valor_entrada < 0) {
    errors.push("valor_entrada deve ser um número positivo");
  }

  // valor_venda validation
  if (typeof venda.valor_venda !== "number" || venda.valor_venda <= 0) {
    errors.push("valor_venda deve ser um número positivo");
  }

  // valor_entrada não pode ser maior que valor_venda
  if (
    typeof venda.valor_entrada === "number" &&
    typeof venda.valor_venda === "number" &&
    venda.valor_entrada > venda.valor_venda
  ) {
    errors.push("valor_entrada não pode ser maior que valor_venda");
  }

  // comissao validation (opcional)
  if (venda.comissao !== undefined && venda.comissao !== null) {
    if (typeof venda.comissao !== "number" || venda.comissao < 0) {
      errors.push("comissao deve ser um número positivo");
    }
  }

  // data_comissao validation (opcional)
  if (venda.data_comissao !== undefined && venda.data_comissao !== null) {
    if (
      typeof venda.data_comissao !== "string" ||
      !validateDate(venda.data_comissao)
    ) {
      errors.push("data_comissao deve estar no formato DD/MM/YYYY");
    }
  }

  return errors;
};

const validateVendaUpdateInput = (updateData) => {
  const errors = [];

  // Check if there's at least one field to update
  if (Object.keys(updateData).length === 0) {
    errors.push("Pelo menos um campo deve ser fornecido para atualização");
    return errors;
  }

  // vendedor_id validation
  if (updateData.vendedor_id !== undefined) {
    if (
      !Number.isInteger(updateData.vendedor_id) ||
      updateData.vendedor_id <= 0
    ) {
      errors.push("vendedor_id deve ser um número inteiro positivo");
    }
  }

  // unidade_imobiliaria_id validation
  if (updateData.unidade_imobiliaria_id !== undefined) {
    if (
      !Number.isInteger(updateData.unidade_imobiliaria_id) ||
      updateData.unidade_imobiliaria_id <= 0
    ) {
      errors.push(
        "unidade_imobiliaria_id deve ser um número inteiro positivo",
      );
    }
  }

  // data_venda validation
  if (updateData.data_venda !== undefined) {
    if (
      typeof updateData.data_venda !== "string" ||
      !validateDate(updateData.data_venda)
    ) {
      errors.push("data_venda deve estar no formato DD/MM/YYYY");
    }
  }

  // data_pagamento_entrada validation
  if (updateData.data_pagamento_entrada !== undefined && updateData.data_pagamento_entrada !== null) {
    if (
      typeof updateData.data_pagamento_entrada !== "string" ||
      !validateDate(updateData.data_pagamento_entrada)
    ) {
      errors.push("data_pagamento_entrada deve estar no formato DD/MM/YYYY");
    }
  }

  // quantidade_parcelas validation
  if (updateData.quantidade_parcelas !== undefined) {
    if (
      !Number.isInteger(updateData.quantidade_parcelas) ||
      updateData.quantidade_parcelas <= 0
    ) {
      errors.push("quantidade_parcelas deve ser um número inteiro positivo");
    }
  }

  // status validation
  if (updateData.status !== undefined) {
    if (
      typeof updateData.status !== "string" ||
      !STATUS_PERMITIDOS.includes(updateData.status)
    ) {
      errors.push(
        `status deve ser um dos seguintes valores: ${STATUS_PERMITIDOS.join(", ")}`,
      );
    }
  }

  // valor_entrada validation
  if (updateData.valor_entrada !== undefined) {
    if (
      typeof updateData.valor_entrada !== "number" ||
      updateData.valor_entrada < 0
    ) {
      errors.push("valor_entrada deve ser um número positivo");
    }
  }

  // valor_venda validation
  if (updateData.valor_venda !== undefined) {
    if (
      typeof updateData.valor_venda !== "number" ||
      updateData.valor_venda <= 0
    ) {
      errors.push("valor_venda deve ser um número positivo");
    }
  }

  // valor_entrada não pode ser maior que valor_venda (apenas se ambos forem atualizados juntos)
  if (
    updateData.valor_entrada !== undefined &&
    updateData.valor_venda !== undefined &&
    typeof updateData.valor_entrada === "number" &&
    typeof updateData.valor_venda === "number" &&
    updateData.valor_entrada > updateData.valor_venda
  ) {
    errors.push("valor_entrada não pode ser maior que valor_venda");
  }

  // comissao validation
  if (updateData.comissao !== undefined && updateData.comissao !== null) {
    if (typeof updateData.comissao !== "number" || updateData.comissao < 0) {
      errors.push("comissao deve ser um número positivo");
    }
  }

  // data_comissao validation
  if (updateData.data_comissao !== undefined && updateData.data_comissao !== null) {
    if (
      typeof updateData.data_comissao !== "string" ||
      !validateDate(updateData.data_comissao)
    ) {
      errors.push("data_comissao deve estar no formato DD/MM/YYYY");
    }
  }

  return errors;
};

module.exports = {
  validateVendaInput,
  validateVendaUpdateInput,
};