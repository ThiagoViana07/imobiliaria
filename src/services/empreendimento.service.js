const caminhoArquivo = 'empreendimentos.json';
import empreendimentosSchema from '../models/empreendimentos.js';

async function getTodosEmpreendimentos() {
  const empreendimentos = await empreendimentosSchema.find({});
  return empreendimentos;
}

async function getEmpreendimentoPorId(id) {
  // const empreendimentos = await getTodosEmpreendimentos();
  // return empreendimentos.find((empreendimento) => empreendimento.id == id);
  const empreendimento = await empreendimentosSchema.findById(id);
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
