const caminhoArquivo = 'unidade_imobiliaria.json';
import unidadesImobiliariasSchema from '../models/unidade-imobiliaria.js';
async function getTodosUnidade() {
  // const dados = await fs.promises.readFile(caminhoArquivo, 'utf-8');
  // return JSON.parse(dados);
  const unidades = await unidadesImobiliariasSchema.find({});
  return unidades;
}

async function getUnidadePorId(id) {
  // const unidades = await getTodosUnidade();
  // return unidades.find((unidade) => unidade.id == id);
  const unidade = await unidadesImobiliariasSchema.findById(id);
  return unidade;
}

async function insereUnidade(unidadeNova) {
  // const unidades = await getTodosUnidade();
  // const novaLista = [...unidades, unidadeNova];
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(novaLista));
  const novaUnidade = unidadesImobiliariasSchema.create(unidadeNova);
  return novaUnidade;
}

async function modificaUnidade(modificacoes, id) {
  // let unidades = await getTodosUnidade();
  // const indice = unidades.findIndex((unidade) => unidade.id == id);
  // console.log('Índice encontrado:', indice); // Log do índice encontrado
  // unidades[indice] = { ...unidades[indice], ...modificacoes };
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(unidades));
  const unidadeAtualizada = await unidadesImobiliariasSchema.findByIdAndUpdate(id, modificacoes);
  return unidadeAtualizada;
}

async function deletarUnidadePorId(id) {
  // const unidades = await getTodosUnidade();
  // const listaFiltrada = unidades.filter((unidade) => unidade.id != id);
  // await fs.promises.writeFile(caminhoArquivo, JSON.stringify(listaFiltrada));
  const unidadeDeletada = await unidadesImobiliariasSchema.findByIdAndDelete(id);
  return unidadeDeletada;
}

export { getTodosUnidade, getUnidadePorId, insereUnidade, modificaUnidade, deletarUnidadePorId };
