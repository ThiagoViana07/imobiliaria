import { Router } from 'express';
import {
  getVendedores,
  getVendedor,
  postVendedor,
  patchVendedor,
  deleteVendedor,
} from '../controllers/vendedor.controller.js';
// coloquei a pasta no singular, mas ta no plural, controllers

const router = Router();

router.get('/', getVendedores);
router.get('/:id', getVendedor);
router.post('/', postVendedor);
router.patch('/:id', patchVendedor);
router.delete('/:id', deleteVendedor);

export default router;
