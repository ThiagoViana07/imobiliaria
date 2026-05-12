const {  
    obterPagamento, 
    obterPagamentos, 
    cadastrarPagamento, 
    deletarPagamento, 
    editarPagamento  
} = require("../controllers/pagamento.controller")

const { Router } = require('express');
const router = Router();

router.get('/', obterPagamentos)
router.get('/:id', obterPagamento)
router.post('/', cadastrarPagamento)
router.delete('/:id', deletarPagamento)
router.patch('/:id', editarPagamento)

module.exports = router;