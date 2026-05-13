const fs = require("fs").promises;
const caminhoArquivo = 'unidade_imobiliaria.json';

async function getTodosUnidade() {
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

async function getUnidadePorId(id) {
    const unidades = await getTodosUnidade();
    return unidades.find(unidade => unidade.id == id);
}

async function insereUnidade(unidadeNova) {
    const unidades = await getTodosUnidade();
    const novaLista = [...unidades, unidadeNova];
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaLista));
}

async function modificaUnidade(modificacoes, id) {
    let unidades = await getTodosUnidade();
    const indice = unidades.findIndex(unidade => unidade.id == id);
    console.log("Índice encontrado:", indice); // Log do índice encontrado
    unidades[indice] = { ...unidades[indice], ...modificacoes };
    await fs.writeFile(caminhoArquivo, JSON.stringify(unidades));
}

async function deletarUnidadePorId(id) {
    const unidades = await getTodosUnidade();
    const listaFiltrada = unidades.filter(unidade => unidade.id != id);
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
}

module.exports = {
    getTodosUnidade,
    getUnidadePorId,
    insereUnidade,
    modificaUnidade,
    deletarUnidadePorId
}


