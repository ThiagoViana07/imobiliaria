import { Router } from 'express';
import {
  getEmpreendimentos,
  getEmpreendimento,
  postEmpreendimento,
  patchEmpreendimento,
  deleteEmpreendimento,
} from '../controllers/empreendimento.controller.js';

const router = Router();

router.get('/', getEmpreendimentos);
router.get('/:id', getEmpreendimento);
router.post('/', postEmpreendimento);
router.patch('/:id', patchEmpreendimento);
router.delete('/:id', deleteEmpreendimento);

export default router;
