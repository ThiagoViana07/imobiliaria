const { getAllVendas, getVendaById, insertVenda, deleteVenda, editVenda } = require('../services/venda.service') 


async function obterVenda(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            const venda = await getVendaById(id)
            res.send(venda)
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

async function obterVendas(req, res){

    try{
        const vendas = await getAllVendas()
        res.send(vendas)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
    
}

async function cadastrarVenda(req, res){

    try{
        const novaVenda = req.body
        if(novaVenda){
            
            await insertVenda(novaVenda)
            res.status(201)
            res.send("Venda cadastrada com sucesso")
        }  

    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

async function deletarVenda(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            await deleteVenda(id)
            res.status(201)
            res.send("Livro deletado com sucesso")
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

async function editarVenda(req, res){

    try{
        const id = req.params.id
        if(id && Number(id)){
            const body = req.body;
            await editVenda(body, id)
            res.status(201)
            res.send("Venda atualizada com sucesso")
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
    obterVenda,
    obterVendas,
    cadastrarVenda,
    deletarVenda,
    editarVenda
}