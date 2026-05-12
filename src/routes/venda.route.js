const { Router } = require('express');
const {  obterVenda, obterVendas, cadastrarVenda, deletarVenda, editarVenda  } = require("../controllers/venda.controller")


const router = Router();

router.get('/', obterVendas)
router.get('/:id', obterVenda)
router.post('/', cadastrarVenda)
router.delete('/:id', deletarVenda)
router.patch('/:id', editarVenda)

module.exports = router;