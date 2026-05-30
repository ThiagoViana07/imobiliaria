const { 
    getTodosVendedores, 
    getVendedorPorId, 
    insereVendedor, 
    modificaVendedor, 
    deletarVendedorPorId 
} = require("../services/vendedor.service");

// Importando o arquivo de validação vendedor-adrian.validation
const { 
    validateVendedorInput, 
    validateVendedorUpdateInput 
} = require("../validations/vendedor-adrian.validation");

async function getVendedores(req, res) {
    try {
        const vendedores = await getTodosVendedores();
        res.status(200).json(vendedores);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function getVendedor(req, res) {
    try {
        const id = req.params.id;
        // VALIDAÇÃO: Verifica se o ID foi passado
        if (!id) {
            return res.status(422).json({ mensagem: "ID é obrigatório." });
        }

        const vendedor = await getVendedorPorId(id);
        // VALIDAÇÃO: Verifica se o vendedor existe
        if (!vendedor) {
            return res.status(404).json({ mensagem: "Vendedor não encontrado." });
        }

        res.status(200).json(vendedor);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function postVendedor(req, res) {
    try {
        const novoVendedor = req.body;
        
        const validationErros = validateVendedorInput(novoVendedor);
        if (validationErros.length > 0) {
            return res.status(400).json({ 
                mensagem: "Dados de entrada inválidos", 
                sucesso: false, 
                erros: validationErros 
            });
        }

        // Criando ID simples em string, mantendo compatibilidade com seu JSON
        novoVendedor.id = Date.now().toString();

        await insereVendedor(novoVendedor);
        res.status(201).json({ 
            mensagem: "Solicitação deferida. Vendedor criado com sucesso!", 
            vendedor: novoVendedor 
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function patchVendedor(req, res) {
    try {
        const id = req.params.id;
        const modificacoes = req.body;

        if (!id) {
            return res.status(422).json({ mensagem: "ID é obrigatório." });
        }

        const validationErros = validateVendedorUpdateInput(modificacoes);
        if (validationErros.length > 0) {
            return res.status(400).json({ 
                mensagem: "Dados de atualização inválidos", 
                sucesso: false, 
                erros: validationErros 
            });
        }

        const vendedorExiste = await getVendedorPorId(id);
        if (!vendedorExiste) {
            return res.status(404).json({ mensagem: "Vendedor não encontrado para edição." });
        }

        await modificaVendedor(modificacoes, id);
        res.status(200).json({ mensagem: "Solicitação deferida. Vendedor atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function deleteVendedor(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(422).json({ mensagem: "ID é obrigatório." });
        }

        const vendedorExiste = await getVendedorPorId(id);
        if (!vendedorExiste) {
            return res.status(404).json({ mensagem: "Vendedor não encontrado para deleção." });
        }

        await deletarVendedorPorId(id);
        res.status(200).json({ mensagem: "Ação deferida. Vendedor deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}
module.exports = {
    getVendedores,
    getVendedor,
    postVendedor,
    patchVendedor,
    deleteVendedor
};

