const STATUS_PERMITIDOS = ['Vendido', 'Em aberto'];

const validateUnidadeInput = (unidade) => {
  const errors = [];
  const requiredFields = [
    'empreendimento_id',
    'numero',
    'quadra',
    'valor',
    'area',
    'tipo',
    'status',
  ];

  for (const field of requiredFields) {
    if (!(field in unidade) || unidade[field] === null || unidade[field] === undefined) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  return errors;
};

const validateUnidadeUpdateInput = (unidade) => {
  const errors = [];
  const allowedFields = ['numero', 'quadra', 'valor', 'area', 'tipo', 'status'];

  for (const field in unidade) {
    console.log('Validando campo 2:', field);
    if (!allowedFields.includes(field)) {
      errors.push(`Campo não permitido para atualização: ${field}`);
    }
  }
  return errors;
};

export { validateUnidadeInput, validateUnidadeUpdateInput };
