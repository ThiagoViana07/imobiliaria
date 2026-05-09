const fs = require("fs").promises;
const caminhoArquivo = 'vendedores.json';

async function getTodosVendedores() {
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

async function getVendedorPorId(id) {
    const vendedores = await getTodosVendedores();
    return vendedores.find(vendedor => vendedor.id === id);
}

async function insereVendedor(vendedorNovo) {
    const vendedores = await getTodosVendedores();
    const novaLista = [...vendedores, vendedorNovo];
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaLista));
}

async function modificaVendedor(modificacoes, id) {
    let vendedores = await getTodosVendedores();
    const indice = vendedores.findIndex(vendedor => vendedor.id === id);
    
    // Atualiza o objeto mantendo o que não foi modificado (spread operator)
    vendedores[indice] = { ...vendedores[indice], ...modificacoes };
    await fs.writeFile(caminhoArquivo, JSON.stringify(vendedores));
}

async function deletarVendedorPorId(id) {
    const vendedores = await getTodosVendedores();
    const listaFiltrada = vendedores.filter(vendedor => vendedor.id !== id);
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
}

module.exports = {
    getTodosVendedores,
    getVendedorPorId,
    insereVendedor,
    modificaVendedor,
    deletarVendedorPorId
}