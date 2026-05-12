const { 
    getTodosVendedores, 
    getVendedorPorId, 
    insereVendedor, 
    modificaVendedor, 
    deletarVendedorPorId 
} = require("../services/vendedor.service");

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

        // VALIDAÇÃO: Verifica se todos os campos obrigatórios vieram no body
        if (!novoVendedor.nome || !novoVendedor.cpf || !novoVendedor.telefone || !novoVendedor.creci) {
            return res.status(422).json({ 
                mensagem: "Todos os campos são obrigatórios: nome, cpf, telefone e creci." 
            });
        }

        // VALIDAÇÃO (Opcional, mas recomendada): Verifica tamanho do CPF
        if (novoVendedor.cpf.length !== 11) {
            return res.status(422).json({ mensagem: "O CPF deve ter exatamente 11 números." });
        }

        // Como o ID não vem no body, criamos um ID simples baseado no timestamp
        novoVendedor.id = Date.now().toString();

        await insereVendedor(novoVendedor);
        res.status(201).json({ mensagem: "Vendedor criado com sucesso!", vendedor: novoVendedor });
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

        // VALIDAÇÃO: Impede que atualizem a rota enviando um body vazio
        if (Object.keys(modificacoes).length === 0) {
            return res.status(422).json({ mensagem: "Nenhum dado fornecido para atualização." });
        }

        // VALIDAÇÃO: Verifica se o vendedor existe antes de tentar modificar
        const vendedorExiste = await getVendedorPorId(id);
        if (!vendedorExiste) {
            return res.status(404).json({ mensagem: "Vendedor não encontrado para edição." });
        }

        await modificaVendedor(modificacoes, id);
        res.status(200).json({ mensagem: "Vendedor atualizado com sucesso!" });
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

        // VALIDAÇÃO: Verifica se existe antes de deletar
        const vendedorExiste = await getVendedorPorId(id);
        if (!vendedorExiste) {
            return res.status(404).json({ mensagem: "Vendedor não encontrado para deleção." });
        }

        await deletarVendedorPorId(id);
        res.status(200).json({ mensagem: "Vendedor deletado com sucesso!" });
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

