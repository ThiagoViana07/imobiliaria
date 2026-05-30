import { validateDate } from './common.validation.js';

// ========== VALIDATION FUNCTIONS ==========

const STATUS_PERMITIDOS = ['Liquidado', 'Transferido', 'Financiado', 'Distratado'];
const FORMAS_PAGAMENTO_PERMITIDAS = ['Boleto', 'Transferencia', 'Dinheiro', 'Cartao'];

const validateVendaInput = (venda) => {
  const errors = [];

  // Required fields validation
  const requiredFields = [
    'vendedor',
    'unidade_imobiliaria',
    'data_venda',
    'quantidade_parcelas',
    'status',
    'valor_entrada',
    'valor_venda',
    'cliente',
  ];

  for (const field of requiredFields) {
    if (!(field in venda) || venda[field] === null || venda[field] === undefined) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  // vendedor validation (objeto)
  if (typeof venda.vendedor !== 'object' || Array.isArray(venda.vendedor)) {
    errors.push('vendedor deve ser um objeto');
  } else {

    if (typeof venda.vendedor.nome !== 'string' || venda.vendedor.nome.trim() === '') {
      errors.push('vendedor.nome deve ser uma string não vazia');
    }
  }

  // unidade_imobiliaria validation (objeto)
  if (typeof venda.unidade_imobiliaria !== 'object' || Array.isArray(venda.unidade_imobiliaria)) {
    errors.push('unidade_imobiliaria deve ser um objeto');
  } else {

    if (
      typeof venda.unidade_imobiliaria.valor_total !== 'number' ||
      venda.unidade_imobiliaria.valor_total <= 0
    ) {
      errors.push('unidade_imobiliaria.valor_total deve ser um número positivo');
    }
  }

  // cliente validation (array)
  if (!Array.isArray(venda.cliente) || venda.cliente.length === 0) {
    errors.push('cliente deve ser um array com ao menos um elemento');
  } else {
    const responsaveis = venda.cliente.filter((c) => c.responsavel_financeiro === true);
    if (responsaveis.length !== 1) {
      errors.push('Exatamente um cliente deve ser marcado como responsavel_financeiro');
    }

    venda.cliente.forEach((cliente, index) => {
      if (typeof cliente.nome !== 'string' || cliente.nome.trim() === '') {
        errors.push(`cliente[${index}].nome deve ser uma string não vazia`);
      }
      if (typeof cliente.responsavel_financeiro !== 'boolean') {
        errors.push(`cliente[${index}].responsavel_financeiro deve ser um booleano`);
      }
    });
  }

  // data_venda validation
  if (typeof venda.data_venda !== 'string' || !validateDate(venda.data_venda)) {
    errors.push('data_venda deve estar no formato DD/MM/YYYY');
  }

  // data_pagamento_entrada validation (opcional)
  if (venda.data_pagamento_entrada !== undefined && venda.data_pagamento_entrada !== null) {
    if (
      typeof venda.data_pagamento_entrada !== 'string' ||
      !validateDate(venda.data_pagamento_entrada)
    ) {
      errors.push('data_pagamento_entrada deve estar no formato DD/MM/YYYY');
    }
  }

  // quantidade_parcelas validation
  if (!Number.isInteger(venda.quantidade_parcelas) || venda.quantidade_parcelas <= 0) {
    errors.push('quantidade_parcelas deve ser um número inteiro positivo');
  }

  // status validation
  if (typeof venda.status !== 'string' || !STATUS_PERMITIDOS.includes(venda.status)) {
    errors.push(`status deve ser um dos seguintes valores: ${STATUS_PERMITIDOS.join(', ')}`);
  }

  // valor_entrada validation
  if (typeof venda.valor_entrada !== 'number' || venda.valor_entrada < 0) {
    errors.push('valor_entrada deve ser um número positivo');
  }

  // valor_venda validation
  if (typeof venda.valor_venda !== 'number' || venda.valor_venda <= 0) {
    errors.push('valor_venda deve ser um número positivo');
  }

  // valor_entrada não pode ser maior que valor_venda
  if (
    typeof venda.valor_entrada === 'number' &&
    typeof venda.valor_venda === 'number' &&
    venda.valor_entrada > venda.valor_venda
  ) {
    errors.push('valor_entrada não pode ser maior que valor_venda');
  }

  // comissao_vendedor validation (opcional)
  if (venda.comissao_vendedor !== undefined && venda.comissao_vendedor !== null) {
    if (typeof venda.comissao_vendedor !== 'number' || venda.comissao_vendedor < 0) {
      errors.push('comissao_vendedor deve ser um número positivo');
    }
  }

  // comissao_data_recebimento validation (opcional)
  if (venda.comissao_data_recebimento !== undefined && venda.comissao_data_recebimento !== null) {
    if (
      typeof venda.comissao_data_recebimento !== 'string' ||
      !validateDate(venda.comissao_data_recebimento)
    ) {
      errors.push('comissao_data_recebimento deve estar no formato DD/MM/YYYY');
    }
  }

  // parcela validation (opcional)
  if (venda.parcela !== undefined && venda.parcela !== null) {
    if (!Array.isArray(venda.parcela)) {
      errors.push('parcela deve ser um array');
    } else {
      venda.parcela.forEach((parcela, index) => {
        if (
          typeof parcela.data_vencimento !== 'string' ||
          !validateDate(parcela.data_vencimento)
        ) {
          errors.push(`parcela[${index}].data_vencimento deve estar no formato DD/MM/YYYY`);
        }
        if (parcela.data_pagamento !== undefined && parcela.data_pagamento !== null) {
          if (
            typeof parcela.data_pagamento !== 'string' ||
            !validateDate(parcela.data_pagamento)
          ) {
            errors.push(`parcela[${index}].data_pagamento deve estar no formato DD/MM/YYYY`);
          }
        }
        if (
          typeof parcela.forma_pagamento !== 'string' ||
          !FORMAS_PAGAMENTO_PERMITIDAS.includes(parcela.forma_pagamento)
        ) {
          errors.push(
            `parcela[${index}].forma_pagamento deve ser um dos seguintes valores: ${FORMAS_PAGAMENTO_PERMITIDAS.join(', ')}`
          );
        }
      });
    }
  }

  return errors;
};

const validateVendaUpdateInput = (updateData) => {
  const errors = [];

  if (Object.keys(updateData).length === 0) {
    errors.push('Pelo menos um campo deve ser fornecido para atualização');
    return errors;
  }

  // vendedor validation
  if (updateData.vendedor !== undefined) {
    if (typeof updateData.vendedor !== 'object' || Array.isArray(updateData.vendedor)) {
      errors.push('vendedor deve ser um objeto');
    } else {
      if (typeof updateData.vendedor.nome !== 'string' || updateData.vendedor.nome.trim() === '') {
        errors.push('vendedor.nome deve ser uma string não vazia');
      }
    }
  }

  // unidade_imobiliaria validation
  if (updateData.unidade_imobiliaria !== undefined) {
    if (
      typeof updateData.unidade_imobiliaria !== 'object' ||
      Array.isArray(updateData.unidade_imobiliaria)
    ) {
      errors.push('unidade_imobiliaria deve ser um objeto');
    } else {
      if (
        typeof updateData.unidade_imobiliaria.valor_total !== 'number' ||
        updateData.unidade_imobiliaria.valor_total <= 0
      ) {
        errors.push('unidade_imobiliaria.valor_total deve ser um número positivo');
      }
    }
  }

  // cliente validation
  if (updateData.cliente !== undefined) {
    if (!Array.isArray(updateData.cliente) || updateData.cliente.length === 0) {
      errors.push('cliente deve ser um array com ao menos um elemento');
    } else {
      const responsaveis = updateData.cliente.filter((c) => c.responsavel_financeiro === true);
      if (responsaveis.length !== 1) {
        errors.push('Exatamente um cliente deve ser marcado como responsavel_financeiro');
      }

      updateData.cliente.forEach((cliente, index) => {
        if (typeof cliente.nome !== 'string' || cliente.nome.trim() === '') {
          errors.push(`cliente[${index}].nome deve ser uma string não vazia`);
        }
        if (typeof cliente.responsavel_financeiro !== 'boolean') {
          errors.push(`cliente[${index}].responsavel_financeiro deve ser um booleano`);
        }
      });
    }
  }

  // data_venda validation
  if (updateData.data_venda !== undefined) {
    if (typeof updateData.data_venda !== 'string' || !validateDate(updateData.data_venda)) {
      errors.push('data_venda deve estar no formato DD/MM/YYYY');
    }
  }

  // data_pagamento_entrada validation
  if (updateData.data_pagamento_entrada !== undefined && updateData.data_pagamento_entrada !== null) {
    if (
      typeof updateData.data_pagamento_entrada !== 'string' ||
      !validateDate(updateData.data_pagamento_entrada)
    ) {
      errors.push('data_pagamento_entrada deve estar no formato DD/MM/YYYY');
    }
  }


  // status validation
  if (updateData.status !== undefined) {
    if (typeof updateData.status !== 'string' || !STATUS_PERMITIDOS.includes(updateData.status)) {
      errors.push(`status deve ser um dos seguintes valores: ${STATUS_PERMITIDOS.join(', ')}`);
    }
  }

  // valor_entrada validation
  if (updateData.valor_entrada !== undefined) {
    if (typeof updateData.valor_entrada !== 'number' || updateData.valor_entrada < 0) {
      errors.push('valor_entrada deve ser um número positivo');
    }
  }

  // valor_venda validation
  if (updateData.valor_venda !== undefined) {
    if (typeof updateData.valor_venda !== 'number' || updateData.valor_venda <= 0) {
      errors.push('valor_venda deve ser um número positivo');
    }
  }

  // valor_entrada não pode ser maior que valor_venda
  if (
    updateData.valor_entrada !== undefined &&
    updateData.valor_venda !== undefined &&
    typeof updateData.valor_entrada === 'number' &&
    typeof updateData.valor_venda === 'number' &&
    updateData.valor_entrada > updateData.valor_venda
  ) {
    errors.push('valor_entrada não pode ser maior que valor_venda');
  }

  // comissao_vendedor validation
  if (updateData.comissao_vendedor !== undefined && updateData.comissao_vendedor !== null) {
    if (typeof updateData.comissao_vendedor !== 'number' || updateData.comissao_vendedor < 0) {
      errors.push('comissao_vendedor deve ser um número positivo');
    }
  }

  // comissao_data_recebimento validation
  if (updateData.comissao_data_recebimento !== undefined && updateData.comissao_data_recebimento !== null) {
    if (
      typeof updateData.comissao_data_recebimento !== 'string' ||
      !validateDate(updateData.comissao_data_recebimento)
    ) {
      errors.push('comissao_data_recebimento deve estar no formato DD/MM/YYYY');
    }
  }

  // parcela validation
  if (updateData.parcela !== undefined && updateData.parcela !== null) {
    if (!Array.isArray(updateData.parcela)) {
      errors.push('parcela deve ser um array');
    } else {
      updateData.parcela.forEach((parcela, index) => {
        if (
          typeof parcela.data_vencimento !== 'string' ||
          !validateDate(parcela.data_vencimento)
        ) {
          errors.push(`parcela[${index}].data_vencimento deve estar no formato DD/MM/YYYY`);
        }
        if (parcela.data_pagamento !== undefined && parcela.data_pagamento !== null) {
          if (
            typeof parcela.data_pagamento !== 'string' ||
            !validateDate(parcela.data_pagamento)
          ) {
            errors.push(`parcela[${index}].data_pagamento deve estar no formato DD/MM/YYYY`);
          }
        }
        if (typeof parcela.valor_parcela !== 'number' || parcela.valor_parcela <= 0) {
          errors.push(`parcela[${index}].valor_parcela deve ser um número positivo`);
        }
        if (typeof parcela.juros !== 'number' || parcela.juros < 0) {
          errors.push(`parcela[${index}].juros deve ser um número positivo`);
        }
        if (
          typeof parcela.forma_pagamento !== 'string' ||
          !FORMAS_PAGAMENTO_PERMITIDAS.includes(parcela.forma_pagamento)
        ) {
          errors.push(
            `parcela[${index}].forma_pagamento deve ser um dos seguintes valores: ${FORMAS_PAGAMENTO_PERMITIDAS.join(', ')}`
          );
        }
      });
    }
  }

  return errors;
};

export { validateVendaInput, validateVendaUpdateInput };
