const fs = require("fs").promises;
const caminhoArquivo = 'pagamentos.json';

async function getAllPagamentos() {
    try {
        const dados = await fs.readFile(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    } catch (err) {
        if (err.code === 'ENOENT') throw new Error('Arquivo de pagamentos não encontrado');
        if (err instanceof SyntaxError) throw new Error('Arquivo de pagamentos corrompido ou inválido');
        throw new Error(`Erro ao ler pagamentos: ${err.message}`);
    }
}

async function getPagamentoById(id) {
    try {
        const pagamentos = await getAllPagamentos();
        const pagamento = pagamentos.find(p => p.id === Number(id)); // 👈
        if (!pagamento) throw new Error(`Pagamento com id ${id} não encontrado`);
        return pagamento;
    } catch (err) {
        throw new Error(`Erro ao buscar pagamento: ${err.message}`);
    }
}

async function insertPagamento(pagamento) {
    try {
        const pagamentos = await getAllPagamentos();
        const novaListaPagamentos = [...pagamentos, pagamento];
        await fs.writeFile(caminhoArquivo, JSON.stringify(novaListaPagamentos));
    } catch (err) {
        throw new Error(`Erro ao inserir pagamento: ${err.message}`);
    }
}

async function editPagamento(modificacoes, id) {
    try {
        let pagamentos = await getAllPagamentos();
        const indice = pagamentos.findIndex(p => p.id === Number(id)); // 👈
        if (indice === -1) throw new Error(`Pagamento com id ${id} não encontrado`);

        pagamentos[indice] = { ...pagamentos[indice], ...modificacoes };
        await fs.writeFile(caminhoArquivo, JSON.stringify(pagamentos));
    } catch (err) {
        throw new Error(`Erro ao editar pagamento: ${err.message}`);
    }
}

async function deletePagamento(id) {
    try {
        const pagamentos = await getAllPagamentos();
        const listaFiltrada = pagamentos.filter(p => p.id !== Number(id)); // 👈
        if (listaFiltrada.length === pagamentos.length) throw new Error(`Pagamento com id ${id} não encontrado`);

        await fs.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
    } catch (err) {
        throw new Error(`Erro ao deletar pagamento: ${err.message}`);
    }
}

module.exports = {
    getAllPagamentos,
    getPagamentoById,
    insertPagamento,
    editPagamento,
    deletePagamento
}