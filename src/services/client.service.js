const { readData, saveData } = require("./database");

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
    const cliente = clientes.find((c) => c.id === id);

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
    const clientes = readData("cliente");

    // Verificar se CPF já existe
    const clienteExistente = clientes.find((c) => c.cpf === novoCliente.cpf);
    if (clienteExistente) {
      throw new Error(`Cliente com CPF ${novoCliente.cpf} já existe`);
    }

    // Gerar novo ID (maior ID + 1)
    const novoId =
      clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;
    const novoClienteComId = {
      id: novoId,
      ...novoCliente,
    };

    clientes.push(novoClienteComId);
    saveData("cliente", clientes);

    return novoClienteComId;
  } catch (error) {
    throw new Error(`Erro ao inserir cliente: ${error.message}`);
  }
};

const modificarCliente = (id, dadosAtualizacao) => {
  try {
    const clientes = readData("cliente");
    const indiceCliente = clientes.findIndex((c) => c.id === id);

    if (indiceCliente === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    // Se o CPF está sendo atualizado, verificar duplicação
    if (
      dadosAtualizacao.cpf &&
      dadosAtualizacao.cpf !== clientes[indiceCliente].cpf
    ) {
      const cpfExistente = clientes.find((c) => c.cpf === dadosAtualizacao.cpf);
      if (cpfExistente) {
        throw new Error(`Cliente com CPF ${dadosAtualizacao.cpf} já existe`);
      }
    }

    // Mesclar dados antigos com novos
    const clienteAtualizado = {
      ...clientes[indiceCliente],
      ...dadosAtualizacao,
    };
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
    const indiceCliente = clientes.findIndex((c) => c.id === id);

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
