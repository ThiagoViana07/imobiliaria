const { deletarUnidadePorId, getTodosUnidade, getUnidadePorId, insereUnidade, modificaUnidade } = require("../services/unidade_imobiliaria.service.js");

async function getUnidades(req, res) {
    try {
        const unidades = await getTodosUnidade();
        res.status(200).json(unidades);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function getUnidade(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const unidade = await getUnidadePorId(id);
            res.status(200).json(unidade);
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function postUnidade(req, res) {
    try {
        const unidadeNova = req.body;
        if (unidadeNova.numero) {
            await insereUnidade(unidadeNova);
            res.status(201).json({ mensagem: "Unidade inserida com sucesso!" });
        } else {
            res.status(422).json({ mensagem: "O campo número é obrigatório" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function patchUnidade(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const body = req.body;
            await modificaUnidade(body, id);
            res.status(200).json({ mensagem: "Unidade atualizada com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

async function deleteUnidade(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            await deletarUnidadePorId(id);
            res.status(200).json({ mensagem: "Unidade deletada com sucesso" });
        } else {
            res.status(422).json({ mensagem: "Id inválido" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = {
    getUnidades,
    getUnidade,
    postUnidade,
    patchUnidade,
    deleteUnidade
}
