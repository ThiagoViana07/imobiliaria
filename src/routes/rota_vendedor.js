const { Router } = require("express");
const { getVendedores, getVendedor, postVendedor, patchVendedor, deleteVendedor } = require("../controladores/controlador_vendedor");

const router = Router();

router.get('/', getVendedores);
router.get('/:id', getVendedor);
router.post('/', postVendedor);
router.patch('/:id', patchVendedor);
router.delete('/:id', deleteVendedor);

module.exports = router;