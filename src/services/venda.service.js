const fs = require("fs").promises;
const caminhoArquivo = 'vendas.json';

async function getAllVendas(){
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

async function getVendaById(id){
    const vendas = await getAllVendas();
    return vendas.find(venda => venda.id === id);
}


async function insertVenda(venda){
    const vendas = await getAllVendas();
    const novaListaVendas = [...vendas, venda]
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaListaVendas));
}

async function deleteVenda(id) {
    const vendas = await getAllVendas();
    const listaFiltrada = vendas.filter(venda => venda.id !== id);
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
}


async function editVenda(modificacoes, id) {
    let vendas = await getAllVendas();
    const indice = vendas.findIndex(venda => venda.id === id);

    vendas[indice] = { ...vendas[indice], ...modificacoes };
    await fs.writeFile(caminhoArquivo, JSON.stringify(vendas));
}

module.exports = {
    getAllVendas,
    getVendaById,
    insertVenda,
    deleteVenda,
    editVenda
}