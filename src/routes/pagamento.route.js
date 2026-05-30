import {
  obterPagamento,
  obterPagamentos,
  cadastrarPagamento,
  deletarPagamento,
  editarPagamento,
} from '../controllers/pagamento.controller.js';

import { Router } from 'express';
const router = Router();

router.get('/', obterPagamentos);
router.get('/:id', obterPagamento);
router.post('/', cadastrarPagamento);
router.delete('/:id', deletarPagamento);
router.patch('/:id', editarPagamento);

export default router;
