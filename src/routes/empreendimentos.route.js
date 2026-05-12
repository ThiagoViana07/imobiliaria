const { Router } = require("express");
const { getEmpreendimentos, getEmpreendimento, postEmpreendimento, patchEmpreendimento, deleteEmpreendimento } = require("../controllers/empreendimento.controller.js");

const router = Router();

router.get('/', getEmpreendimentos);
router.get('/:id', getEmpreendimento);
router.post('/', postEmpreendimento);
router.patch('/:id', patchEmpreendimento);
router.delete('/:id', deleteEmpreendimento);

module.exports = router;
