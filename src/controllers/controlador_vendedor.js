const { getTodosVendedores, getVendedorPorId, insereVendedor, modificaVendedor, deletarVendedorPorId } = require("../servicos/servico_vendedor");

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
        if (id && Number(id)) {
            const vendedor = await getVendedorPorId(id);
            res.status(200).json(vendedor);
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function postVendedor(req, res) {
    try {
        const vendedorNovo = req.body;
        // Validação simples exigindo nome e CPF
        if (vendedorNovo.nome && vendedorNovo.cpf) {
            await insereVendedor(vendedorNovo);
            res.status(201).json({ mensagem: "Vendedor inserido com sucesso!" });
        } else {
            res.status(422).json({ mensagem: "Os campos nome e cpf são obrigatórios" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function patchVendedor(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const body = req.body;
            await modificaVendedor(body, id);
            res.status(200).json({ mensagem: "Vendedor atualizado com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function deleteVendedor(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            await deletarVendedorPorId(id);
            res.status(200).json({ mensagem: "Vendedor deletado com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
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
}