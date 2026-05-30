// src/services/vendedor.service.js
// lembrar de verificar se o nome do arquivo vendedor ta com o 'V' maiúsculo ou minúsculo
import vendedor from "../models/vendedor.js";

async function getTodosVendedores() {
    // find({}) busca todos os documentos salvos na coleção "vendedores" do Atlas
    const listaVendedores = await vendedor.find({});
    return listaVendedores;
}

async function getVendedorPorId(id) {
    // Busca um vendedor específico pelo ID único gerado pelo MongoDB
    const vendedorEncontrado = await vendedor.findById(id);
    return vendedorEncontrado;
}

async function insereVendedor(vendedorNovo) {
    // Cria e insere um novo documento no banco de dados na nuvem
    //await vendedor.create(vendedorNovo);
    // Para guardar o retorno do banco em uma variável e retorna essa variavel
    const vendedorCriado = await vendedor.create(vendedorNovo);
    return vendedorCriado;
}

async function modificaVendedor(modificacoes, id) {
    // Encontra o vendedor pelo ID e aplica as modificações fornecidas
    await vendedor.findByIdAndUpdate(id, modificacoes);
}

async function deletarVendedorPorId(id) {
    // Encontra o vendedor pelo ID e o deleta do banco de dados
    await vendedor.findByIdAndDelete(id);
}

// Exportando as funções no formato ES Modules (ECMAScript)
export {
    getTodosVendedores,
    getVendedorPorId,
    insereVendedor,
    modificaVendedor,
    deletarVendedorPorId
};
