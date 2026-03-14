import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRouter from './routes/userRoute';
import eventRouter from './routes/eventRoute';

// carrega o .env
dotenv.config();

// Conexão com o MongoDB
connectDB();

// cria a aplicação express e guarda a porta definida no .env ou usa a 8080 como padrão
const app = express();
const PORT = process.env.PORT || 8080;

// middleware para parsear JSON e lidar com CORS
app.use(express.json());
app.use(cors());

// rotas
app.use('/api', userRouter);
app.use('/api', eventRouter);

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});