import { Router } from 'express';
import {
  deleteUnidade,
  getUnidade,
  getUnidades,
  patchUnidade,
  postUnidade,
} from '../controllers/unidade_imobiliaria.controller.js';

const router = Router();

router.get('/', getUnidades);
router.get('/:id', getUnidade);
router.post('/', postUnidade);
router.patch('/:id', patchUnidade);
router.delete('/:id', deleteUnidade);

export default router;
