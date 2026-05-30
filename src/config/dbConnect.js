import mongoose from 'mongoose';

async function pool() {
  mongoose.connect(
    'mongodb+srv://thiago123:thiago123@cluster0.gv2ljnd.mongodb.net/imobiliaria?appName=Cluster0',
  );

  return mongoose.connection;
}

export default pool;
