const { getAllPagamentos, getPagamentoById, insertPagamento, deletePagamento } = require('../services/pagamento.service') 


async function obterPagamento(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            const pagamento = await getPagamentoById(id)
            res.send(pagamento)
        }
        else{
            res.status(402)
            res.send("Id inválido")
        }
        
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

async function obterPagamentos(req, res){

    try{
        const pagamentos = await getAllPagamentos()
        res.send(pagamentos)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function cadastrarPagamento(req, res){

    try{
        const novoPagamento = req.body
        if(novoPagamento){
            
            await insertPagamento(novoPagamento)
            res.status(201)
            res.send("Pagamento inserido com sucesso")
        }  

    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

async function deletarPagamento(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            await deletePagamento(id)
            res.status(201)
            res.send("Pagamento deletado com sucesso")
        }
        else{
            res.status(422)
            res.send("Id inválido")
        }

    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

async function editarPagamento(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            const body = req.body;
            await editPagamento(body, id)
            res.status(201)
            res.send("Pagamento atualizado com sucesso")
        }
        else{
            res.status(422)
            res.send("Id inválido")
        }

    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}


module.exports = {
    obterPagamento,
    obterPagamentos,
    cadastrarPagamento,
    deletarPagamento,
    editarPagamento
}