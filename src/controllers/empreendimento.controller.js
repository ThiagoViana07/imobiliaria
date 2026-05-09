const { deletarEmpreendimentoPorId, getEmpreendimentoPorId, getTodosEmpreendimentos, insereEmpreendimento, modificaEmpreendimento } = require("../services/empreendimento.service.js");

async function getEmpreendimentos(req, res) {
    try {
        const empreendimentos = await getTodosEmpreendimentos();
        res.status(200).json(empreendimentos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function getEmpreendimento(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const empreendimento = await getEmpreendimentoPorId(id);
            res.status(200).json(empreendimento);
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function postEmpreendimento(req, res) {
    try {
        const empreendimentoNovo = req.body;
        // Validação simples exigindo nome e CPF
        if (empreendimentoNovo.nome) {
            await insereEmpreendimento(empreendimentoNovo);
            res.status(201).json({ mensagem: "Empreendimento inserido com sucesso!" });
        } else {
            res.status(422).json({ mensagem: "Os campos nome e cpf são obrigatórios" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function patchEmpreendimento(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const body = req.body;
            await modificaEmpreendimento(body, id);
            res.status(200).json({ mensagem: "Empreendimento atualizado com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function deleteEmpreendimento(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            await deletarEmpreendimentoPorId(id);
            res.status(200).json({ mensagem: "Empreendimento deletado com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = {
    getEmpreendimentos,
    getEmpreendimento,
    postEmpreendimento,
    patchEmpreendimento,
    deleteEmpreendimento
}
