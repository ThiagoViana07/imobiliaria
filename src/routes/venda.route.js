import {
  obterVenda,
  obterVendas,
  cadastrarVenda,
  deletarVenda,
  editarVenda,
} from '../controllers/venda.controller.js';

import { Router } from 'express';
const router = Router();

router.get('/', obterVendas);
router.get('/:id', obterVenda);
router.post('/', cadastrarVenda);
router.delete('/:id', deletarVenda);
router.patch('/:id', editarVenda);

export default router;
