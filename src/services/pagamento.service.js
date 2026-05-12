const fs = require("fs").promises;
const caminhoArquivo = 'pagamentos.json';

async function getAllPagamentos(){
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

async function getPagamentoById(id){
    const pagamentos = await getAllPagamentos();
    return pagamentos.find(pagamento => pagamento.id === id);
}

async function insertPagamento(pagamento){
    const pagamentos = await getAllPagamentos();
    const novaListaPagamentos = [...pagamentos, pagamento]
    await fs.writeFile(caminhoArquivo, JSON.stringify(novaListaPagamentos));

}

async function editPagamento(modificacoes, id) {
    let pagamentos = await getAllPagamentos();
    const indice = pagamentos.findIndex(pagamento => pagamento.id === id);

    pagamentos[indice] = { ...pagamentos[indice], ...modificacoes };
    await fs.writeFile(caminhoArquivo, JSON.stringify(pagamentos));
}

async function deletePagamento(id) {
    const pagamentos = await getAllPagamentos();
    const listaFiltrada = pagamentos.filter(pagamento => pagamento.id !== id);
    await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
}



module.exports = {
    getAllPagamentos,
    getPagamentoById,
    insertPagamento,
    editPagamento,
    deletePagamento
}