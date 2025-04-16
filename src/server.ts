import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;


app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('🚀 Servidor TypeScript rodando!');
});

app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});