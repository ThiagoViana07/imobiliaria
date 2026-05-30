import mongoose from 'mongoose';

async function pool() {
  mongoose.connect(
    'mongodb+srv://thiago123:thiago123@cluster0.gv2ljnd.mongodb.net/imobiliaria?appName=Cluster0',
  );

  return mongoose.connection;
}

const conexao = await pool();

conexao.on('error', (erro) => {
  console.error('erro de conexão', erro);
});

conexao.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

export default pool;
