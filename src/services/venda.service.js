import vendas from "../models/venda.js"

async function getAllVendas() {
  try {
    const listaVendas = await vendas.find({})
    return listaVendas;
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error('Arquivo de vendas não encontrado');
    if (err instanceof SyntaxError) throw new Error('Arquivo de vendas corrompido ou inválido');
    throw new Error(`Erro ao ler vendas: ${err.message}`);
  }
}

async function getVendaByStatus(status) {
  try {
    const venda = await vendas.findOne({ status });
    if (!venda) throw new Error(`Nenhuma venda com status "${status}" encontrada`);
    return venda;
  } catch (err) {
    throw new Error(`Erro ao buscar venda: ${err.message}`);
  }
}

async function getVendaById(id) {
  try {
    const venda = await vendas.findById(id);
    if (!venda) throw new Error(`Venda com id ${id} não encontrada`);
    return venda;
  } catch (err) {
    throw new Error(`Erro ao buscar venda: ${err.message}`);
  }
}

async function insertVenda(venda) {
  try {
    await vendas.create(venda)
  } catch (err) {
    throw new Error(`Erro ao inserir venda: ${err.message}`);
  }
}

async function deleteVenda(id) {
  try {
    await vendas.findByIdAndDelete(id)
  } catch (err) {
    throw new Error(`Erro ao deletar venda: ${err.message}`);
  }
}

async function editVenda(modificacoes, id) {
  try {
    await vendas.findByIdAndUpdate(id, modificacoes)
  } catch (err) {
    throw new Error(`Erro ao editar venda: ${err.message}`);
  }
}

export { getAllVendas, getVendaById, insertVenda, deleteVenda, editVenda };
