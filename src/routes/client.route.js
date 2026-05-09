const {
  getClientes,
  getCliente,
  getClientePorCpf,
  criarCliente,
  atualizarCliente,
  excluirCliente,
} = require("../controllers/client.controller");

const { Router } = require("express");
const router = Router();

// ========== ROUTES ==========
router.get("/", getClientes);
router.get("/:id", getCliente);
router.get("/cpf/:cpf", getClientePorCpf);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.delete("/:id", excluirCliente);

module.exports = router;
