const fs = require("fs").promises;
const path = require("path");

// Aponta para a pasta 'data' na raiz do projeto
// onde le o arquivo json
// O "..", ".." faz ele sair de 'services', sair de 'src' e chegar na raiz, para então entrar em 'data'
const caminhoArquivo = path.join(__dirname, "..", "..", "data", "vendedor-Adrian.json");

async function getTodosVendedores() {
    try {
        const dados = await fs.readFile(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        // Se o arquivo não existir, retorna um array vazio para não quebrar
        return []; 
    }
}

async function getVendedorPorId(id) {
    const vendedores = await getTodosVendedores();
    return vendedores.find(vendedor => vendedor.id === String(id));
}

async function insereVendedor(vendedorNovo) {
    const vendedores = await getTodosVendedores();
    const novaLista = [...vendedores, vendedorNovo];
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaLista, null, 2));
}

async function modificaVendedor(modificacoes, id) {
    let vendedores = await getTodosVendedores();
    const indice = vendedores.findIndex(vendedor => vendedor.id === String(id));
    
    if(indice !== -1) {
        vendedores[indice] = { ...vendedores[indice], ...modificacoes };
        await fs.writeFile(caminhoArquivo, JSON.stringify(vendedores, null, 2));
    }
}

async function deletarVendedorPorId(id) {
    const vendedores = await getTodosVendedores();
    const listaFiltrada = vendedores.filter(vendedor => vendedor.id !== String(id));
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada, null, 2));
}

module.exports = {
    getTodosVendedores,
    getVendedorPorId,
    insereVendedor,
    modificaVendedor,
    deletarVendedorPorId
}

