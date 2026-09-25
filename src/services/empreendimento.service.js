const caminhoArquivo = 'empreendimentos.json';
import empreendimentosSchema from '../models/empreendimentos.js';

// src/services/empreendimento.service.js
async function getTodosEmpreendimentos() {
  const empreendimentos = await empreendimentosSchema.find({}).populate('unidade_imobiliaria');
  return empreendimentos;
}

async function getEmpreendimentoPorId(id) {
  const empreendimento = await empreendimentosSchema.findById(id).populate('unidade_imobiliaria');
  return empreendimento;
}

async function insereEmpreendimento(empreendimentoNovo) {
  // const empreendimentos = await getTodosEmpreendimentos();
  // const novaLista = [...empreendimentos, empreendimentoNovo];
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(novaLista));
  await empreendimentosSchema.create(empreendimentoNovo);
}

async function modificaEmpreendimento(modificacoes, id) {
  // let empreendimentos = await getTodosEmpreendimentos();
  // const indice = empreendimentos.findIndex((empreendimento) => empreendimento.id == id);
  // empreendimentos[indice] = { ...empreendimentos[indice], ...modificacoes };
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(empreendimentos));
  await empreendimentosSchema.findByIdAndUpdate(id, modificacoes);
}

async function deletarEmpreendimentoPorId(id) {
  // const empreendimentos = await getTodosEmpreendimentos();
  // const listaFiltrada = empreendimentos.filter((empreendimento) => empreendimento.id != id);
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
  await empreendimentosSchema.findByIdAndDelete(id);
}

export {
  getTodosEmpreendimentos,
  getEmpreendimentoPorId,
  insereEmpreendimento,
  modificaEmpreendimento,
  deletarEmpreendimentoPorId,
};
