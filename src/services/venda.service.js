import fs from 'fs';
const caminhoArquivo = 'vendas.json';

async function getAllVendas() {
  try {
    const dados = await fs.promises.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error('Arquivo de vendas não encontrado');
    if (err instanceof SyntaxError) throw new Error('Arquivo de vendas corrompido ou inválido');
    throw new Error(`Erro ao ler vendas: ${err.message}`);
  }
}

async function getVendaById(id) {
  try {
    const vendas = await getAllVendas();
    const venda = vendas.find((venda) => venda.id === Number(id));
    if (!venda) throw new Error(`Venda com id ${id} não encontrada`);
    return venda;
  } catch (err) {
    throw new Error(`Erro ao buscar venda: ${err.message}`);
  }
}

async function insertVenda(venda) {
  try {
    const vendas = await getAllVendas();
    const novaListaVendas = [...vendas, venda];
    await fs.promises.writeFile(caminhoArquivo, JSON.stringify(novaListaVendas));
  } catch (err) {
    throw new Error(`Erro ao inserir venda: ${err.message}`);
  }
}

async function deleteVenda(id) {
  try {
    const vendas = await getAllVendas();
    const listaFiltrada = vendas.filter((venda) => venda.id !== Number(id));
    if (listaFiltrada.length === vendas.length)
      throw new Error(`Venda com id ${id} não encontrada`);
    await fs.promises.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
  } catch (err) {
    throw new Error(`Erro ao deletar venda: ${err.message}`);
  }
}

async function editVenda(modificacoes, id) {
  try {
    let vendas = await getAllVendas();
    const indice = vendas.findIndex((venda) => venda.id === Number(id));
    if (indice === -1) throw new Error(`Venda com id ${id} não encontrada`);

    vendas[indice] = { ...vendas[indice], ...modificacoes };
    await fs.promises.writeFile(caminhoArquivo, JSON.stringify(vendas));
  } catch (err) {
    throw new Error(`Erro ao editar venda: ${err.message}`);
  }
}

export { getAllVendas, getVendaById, insertVenda, deleteVenda, editVenda };
