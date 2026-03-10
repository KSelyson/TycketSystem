import mongoose from 'mongoose';
import dotenv from 'dotenv';

// carrega o .env
dotenv.config();

// função para conectar ao MongoDB usando a URI do .env
const connectDB = async () => {
    //puxa a variavel DB_URL do .env para usar na conexão com o MongoDB
    const uri = process.env.DB_URL;

    //caso de b.o e a URI não esteja definida, loga o erro e encerra o processo
    if (!uri) {
        console.error('DB_URL não está definido no .env');
        process.exit(1);
    }

    try {
        //tenta se conectar ao MongoDB usando a URI do .env
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (e) {
        //caso de erro na conexão, loga o erro e encerra o processo
        console.error('Erro ao se conectar ao MongoDB:', e);
        process.exit(1);
    }
};

export default connectDB;