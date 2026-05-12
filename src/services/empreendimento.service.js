const fs = require("fs").promises;
const caminhoArquivo = 'empreendimentos.json';

async function getTodosEmpreendimentos() {
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

async function getEmpreendimentoPorId(id) {
    const empreendimentos = await getTodosEmpreendimentos();
    return empreendimentos.find(empreendimento => empreendimento.id === id);
}

async function insereEmpreendimento(empreendimentoNovo) {
    const empreendimentos = await getTodosEmpreendimentos();
    const novaLista = [...empreendimentos, empreendimentoNovo];
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaLista));
}

async function modificaEmpreendimento(modificacoes, id) {
    let empreendimentos = await getTodosEmpreendimentos();
    const indice = empreendimentos.findIndex(empreendimento => empreendimento.id === id);

    empreendimentos[indice] = { ...empreendimentos[indice], ...modificacoes };
    await fs.writeFile(caminhoArquivo, JSON.stringify(empreendimentos));
}

async function deletarEmpreendimentoPorId(id) {
    const empreendimentos = await getTodosEmpreendimentos();
    const listaFiltrada = empreendimentos.filter(empreendimento => empreendimento.id !== id);
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
}

module.exports = {
    getTodosEmpreendimentos,
    getEmpreendimentoPorId,
    insereEmpreendimento,
    modificaEmpreendimento,
    deletarEmpreendimentoPorId
}


