import { Router } from 'express';
const router = Router();
// coloquei a pasta no singular, mas ta no plural, controllers
import {
  getVendedores,
  getVendedor,
  postVendedor,
  patchVendedor,
  deleteVendedor,
} from '../controllers/vendedor.controller.js';

router.get('/', getVendedores);
router.get('/:id', getVendedor);
router.post('/', postVendedor);
router.patch('/:id', patchVendedor);
router.delete('/:id', deleteVendedor);

export default router;
