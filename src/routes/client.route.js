import {
  getClientes,
  getCliente,
  getClientePorCpf,
  criarCliente,
  atualizarCliente,
  excluirCliente,
} from '../controllers/client.controller.js';

import { Router } from 'express';
const router = Router();

// ========== ROUTES ==========
router.get('/', getClientes);
router.get('/:id', getCliente);
router.get('/cpf/:cpf', getClientePorCpf);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', excluirCliente);

export default router;
