import {
  validateEmail,
  validateCPF,
  validateDate,
  validatePhone,
  validateCEP,
} from './common.validation.js';

// ========== VALIDATION FUNCTIONS ==========

const validateClientInput = (client) => {
  const errors = [];

  // Required fields validation
  const requiredFields = ['nome', 'cpf', 'telefone', 'email', 'endereco'];
  for (const field of requiredFields) {
    if (!(field in client) || client[field] === null || client[field] === undefined) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (errors.length > 0) return errors;

  // Type and format validation
  if (typeof client.nome !== 'string' || client.nome.trim().length === 0) {
    errors.push('Nome deve ser uma string não vazia');
  }

  if (typeof client.cpf !== 'string' || !validateCPF(client.cpf)) {
    errors.push('CPF deve estar no formato XXX.XXX.XXX-XX');
  }

  if (client.rg && (typeof client.rg !== 'string' || client.rg.trim().length === 0)) {
    errors.push('RG deve ser uma string não vazia');
  }

  if (
    client.data_nascimento &&
    (typeof client.data_nascimento !== 'string' || !validateDate(client.data_nascimento))
  ) {
    errors.push('Data de nascimento deve estar no formato DD/MM/YYYY');
  }

  if (
    client.profissao &&
    (typeof client.profissao !== 'string' || client.profissao.trim().length === 0)
  ) {
    errors.push('Profissão deve ser uma string não vazia');
  }

  if (
    client.estado_civil &&
    (typeof client.estado_civil !== 'string' || client.estado_civil.trim().length === 0)
  ) {
    errors.push('Estado civil deve ser uma string não vazia');
  }

  // Email validation
  if (typeof client.email !== 'string' || !validateEmail(client.email)) {
    errors.push('Email deve ser um endereço válido');
  }

  // Telefone validation
  if (!Array.isArray(client.telefone) || client.telefone.length === 0) {
    errors.push('Telefone deve ser um array não vazio');
  } else {
    client.telefone.forEach((tel, index) => {
      if (typeof tel !== 'object' || tel === null) {
        errors.push(`Telefone[${index}] deve ser um objeto`);
      } else {
        if (
          tel.residencial &&
          (typeof tel.residencial !== 'string' || !validatePhone(tel.residencial))
        ) {
          errors.push(`Telefone[${index}].residencial deve estar no formato (XX) XXXXX-XXXX`);
        }
        if (tel.comercial && (typeof tel.comercial !== 'string' || !validatePhone(tel.comercial))) {
          errors.push(`Telefone[${index}].comercial deve estar no formato (XX) XXXXX-XXXX`);
        }
        if (!tel.residencial && !tel.comercial) {
          errors.push(`Telefone[${index}] deve ter pelo menos residencial ou comercial`);
        }
      }
    });
  }

  // Endereco validation
  if (!Array.isArray(client.endereco) || client.endereco.length === 0) {
    errors.push('Endereço deve ser um array não vazio');
  } else {
    client.endereco.forEach((end, index) => {
      if (typeof end !== 'object' || end === null) {
        errors.push(`Endereço[${index}] deve ser um objeto`);
      } else {
        const enderecoFields = ['logradouro', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
        enderecoFields.forEach((field) => {
          if (!(field in end) || end[field] === null || end[field] === undefined) {
            errors.push(`Endereço[${index}].${field} é obrigatório`);
          } else if (typeof end[field] !== 'string' || end[field].trim().length === 0) {
            errors.push(`Endereço[${index}].${field} deve ser uma string não vazia`);
          }
        });

        if (end.cep && !validateCEP(end.cep)) {
          errors.push(`Endereço[${index}].cep deve estar no formato XXXXX-XXX`);
        }

        if (
          end.complemento !== null &&
          end.complemento !== undefined &&
          typeof end.complemento !== 'string'
        ) {
          errors.push(`Endereço[${index}].complemento deve ser uma string ou null`);
        }
      }
    });
  }

  return errors;
};

const validateClientUpdateInput = (updateData) => {
  const errors = [];

  // Check if there's at least one field to update
  if (Object.keys(updateData).length === 0) {
    errors.push('Pelo menos um campo deve ser fornecido para atualização');
    return errors;
  }

  // Validate each field if present
  if (updateData.nome !== undefined) {
    if (typeof updateData.nome !== 'string' || updateData.nome.trim().length === 0) {
      errors.push('Nome deve ser uma string não vazia');
    }
  }

  if (updateData.cpf !== undefined) {
    if (typeof updateData.cpf !== 'string' || !validateCPF(updateData.cpf)) {
      errors.push('CPF deve estar no formato XXX.XXX.XXX-XX');
    }
  }

  if (updateData.rg !== undefined) {
    if (typeof updateData.rg !== 'string' || updateData.rg.trim().length === 0) {
      errors.push('RG deve ser uma string não vazia');
    }
  }

  if (updateData.data_nascimento !== undefined) {
    if (
      typeof updateData.data_nascimento !== 'string' ||
      !validateDate(updateData.data_nascimento)
    ) {
      errors.push('Data de nascimento deve estar no formato DD/MM/YYYY');
    }
  }

  if (updateData.profissao !== undefined) {
    if (typeof updateData.profissao !== 'string' || updateData.profissao.trim().length === 0) {
      errors.push('Profissão deve ser uma string não vazia');
    }
  }

  if (updateData.estado_civil !== undefined) {
    if (
      typeof updateData.estado_civil !== 'string' ||
      updateData.estado_civil.trim().length === 0
    ) {
      errors.push('Estado civil deve ser uma string não vazia');
    }
  }

  if (updateData.email !== undefined) {
    if (typeof updateData.email !== 'string' || !validateEmail(updateData.email)) {
      errors.push('Email deve ser um endereço válido');
    }
  }

  // Telefone validation for updates
  if (updateData.telefone !== undefined) {
    if (!Array.isArray(updateData.telefone) || updateData.telefone.length === 0) {
      errors.push('Telefone deve ser um array não vazio');
    } else {
      updateData.telefone.forEach((tel, index) => {
        if (typeof tel !== 'object' || tel === null) {
          errors.push(`Telefone[${index}] deve ser um objeto`);
        } else {
          if (
            tel.residencial &&
            (typeof tel.residencial !== 'string' || !validatePhone(tel.residencial))
          ) {
            errors.push(`Telefone[${index}].residencial deve estar no formato (XX) XXXXX-XXXX`);
          }
          if (
            tel.comercial &&
            (typeof tel.comercial !== 'string' || !validatePhone(tel.comercial))
          ) {
            errors.push(`Telefone[${index}].comercial deve estar no formato (XX) XXXXX-XXXX`);
          }
          if (!tel.residencial && !tel.comercial) {
            errors.push(`Telefone[${index}] deve ter pelo menos residencial ou comercial`);
          }
        }
      });
    }
  }

  // Endereco validation for updates
  if (updateData.endereco !== undefined) {
    if (!Array.isArray(updateData.endereco) || updateData.endereco.length === 0) {
      errors.push('Endereço deve ser um array não vazio');
    } else {
      updateData.endereco.forEach((end, index) => {
        if (typeof end !== 'object' || end === null) {
          errors.push(`Endereço[${index}] deve ser um objeto`);
        } else {
          const enderecoFields = ['logradouro', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
          enderecoFields.forEach((field) => {
            if (!(field in end) || end[field] === null || end[field] === undefined) {
              errors.push(`Endereço[${index}].${field} é obrigatório`);
            } else if (typeof end[field] !== 'string' || end[field].trim().length === 0) {
              errors.push(`Endereço[${index}].${field} deve ser uma string não vazia`);
            }
          });

          if (end.cep && !validateCEP(end.cep)) {
            errors.push(`Endereço[${index}].cep deve estar no formato XXXXX-XXX`);
          }

          if (
            end.complemento !== null &&
            end.complemento !== undefined &&
            typeof end.complemento !== 'string'
          ) {
            errors.push(`Endereço[${index}].complemento deve ser uma string ou null`);
          }
        }
      });
    }
  }

  return errors;
};

export { validateClientInput, validateClientUpdateInput };
