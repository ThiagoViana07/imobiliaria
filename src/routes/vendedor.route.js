const { Router } = require("express");
const router = Router()
// coloquei a pasta no singular, mas ta no plural, controllers
const { getVendedores, getVendedor, postVendedor, patchVendedor, deleteVendedor } = require("../controllers/vendedor.controller");

router.get('/', getVendedores);
router.get('/:id', getVendedor);
router.post('/', postVendedor);
router.patch('/:id', patchVendedor);
router.delete('/:id', deleteVendedor);

module.exports = router;
