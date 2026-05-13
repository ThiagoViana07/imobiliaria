const { Router } = require("express");
const router = Router()
const { deleteUnidade, getUnidade, getUnidades, patchUnidade, postUnidade } = require("../controllers/unidade_imobiliaria.controller.js");

router.get('/', getUnidades);
router.get('/:id', getUnidade);
router.post('/', postUnidade);
router.patch('/:id', patchUnidade);
router.delete('/:id', deleteUnidade);

module.exports = router;
