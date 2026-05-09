const { readData, saveData } = require("./database_json");

// ========== VALIDATION FUNCTIONS ==========
// Service layer: validates only structure, not types (controller handles types)

const validateClientStructure = (client) => {
  const requiredFields = ["nome", "cpf", "telefone", "email", "endereco"];
  
  for (const field of requiredFields) {
    if (!(field in client)) {
      throw new Error(`Campo obrigatório ausente: ${field}`);
    }
  }

  // Validate telefone structure (must be an array of objects)
  if (!Array.isArray(client.telefone) || client.telefone.length === 0) {
    throw new Error("Telefone deve ser um array não vazio");
  }
  if (typeof client.telefone[0] !== "object") {
    throw new Error("Telefone deve ser um array de objetos");
  }

  // Validate endereco structure (must be an array of objects)
  if (!Array.isArray(client.endereco) || client.endereco.length === 0) {
    throw new Error("Endereço deve ser um array não vazio");
  }
  if (typeof client.endereco[0] !== "object") {
    throw new Error("Endereço deve ser um array de objetos");
  }
};

const validateClientUpdate = (updateData) => {
  // Validate that telefone has correct structure if present
  if ("telefone" in updateData) {
    if (!Array.isArray(updateData.telefone) || updateData.telefone.length === 0) {
      throw new Error("Telefone deve ser um array não vazio");
    }
    if (typeof updateData.telefone[0] !== "object") {
      throw new Error("Telefone deve ser um array de objetos");
    }
  }

  // Validate that endereco has correct structure if present
  if ("endereco" in updateData) {
    if (!Array.isArray(updateData.endereco) || updateData.endereco.length === 0) {
      throw new Error("Endereço deve ser um array não vazio");
    }
    if (typeof updateData.endereco[0] !== "object") {
      throw new Error("Endereço deve ser um array de objetos");
    }
  }
};

// ========== CRUD FUNCTIONS ==========

const getTodosClientes = () => {
  try {
    const data = readData("cliente");
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar clientes: ${error.message}`);
  }
};

const getClienteById = (id) => {
  try {
    const clientes = readData("cliente");
    const cliente = clientes.find((c) => c._id === id);
    
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }
    
    return cliente;
  } catch (error) {
    throw new Error(`Erro ao buscar cliente por ID: ${error.message}`);
  }
};

const getClienteByCpf = (cpf) => {
  try {
    const clientes = readData("cliente");
    const cliente = clientes.find((c) => c.cpf === cpf);
    
    if (!cliente) {
      throw new Error(`Cliente com CPF ${cpf} não encontrado`);
    }
    
    return cliente;
  } catch (error) {
    throw new Error(`Erro ao buscar cliente por CPF: ${error.message}`);
  }
};

const inserirCliente = (novoCliente) => {
  try {
    // Validar estrutura do cliente
    validateClientStructure(novoCliente);

    const clientes = readData("cliente");

    // Verificar se CPF já existe
    const clienteExistente = clientes.find((c) => c.cpf === novoCliente.cpf);
    if (clienteExistente) {
      throw new Error(`Cliente com CPF ${novoCliente.cpf} já existe`);
    }

    // Gerar novo ID (maior ID + 1)
    const novoId = clientes.length > 0 ? Math.max(...clientes.map((c) => c._id)) + 1 : 1;
    novoCliente._id = novoId;

    clientes.push(novoCliente);
    saveData("cliente", clientes);

    return novoCliente;
  } catch (error) {
    throw new Error(`Erro ao inserir cliente: ${error.message}`);
  }
};

const modificarCliente = (id, dadosAtualizacao) => {
  try {
    // Validar estrutura dos dados de atualização
    validateClientUpdate(dadosAtualizacao);

    const clientes = readData("cliente");
    const indiceCliente = clientes.findIndex((c) => c._id === id);

    if (indiceCliente === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    // Se o CPF está sendo atualizado, verificar duplicação
    if (dadosAtualizacao.cpf && dadosAtualizacao.cpf !== clientes[indiceCliente].cpf) {
      const cpfExistente = clientes.find((c) => c.cpf === dadosAtualizacao.cpf);
      if (cpfExistente) {
        throw new Error(`Cliente com CPF ${dadosAtualizacao.cpf} já existe`);
      }
    }

    // Mesclar dados antigos com novos
    const clienteAtualizado = { ...clientes[indiceCliente], ...dadosAtualizacao };
    clientes[indiceCliente] = clienteAtualizado;

    saveData("cliente", clientes);

    return clienteAtualizado;
  } catch (error) {
    throw new Error(`Erro ao modificar cliente: ${error.message}`);
  }
};

const deletarCliente = (id) => {
  try {
    const clientes = readData("cliente");
    const indiceCliente = clientes.findIndex((c) => c._id === id);

    if (indiceCliente === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    const clienteDeletado = clientes[indiceCliente];
    clientes.splice(indiceCliente, 1);

    saveData("cliente", clientes);

    return clienteDeletado;
  } catch (error) {
    throw new Error(`Erro ao deletar cliente: ${error.message}`);
  }
};

// ========== EXPORTS ==========
module.exports = {
  getTodosClientes,
  getClienteById,
  getClienteByCpf,
  inserirCliente,
  modificarCliente,
  deletarCliente,
};
