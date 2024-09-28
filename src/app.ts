import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use('/api', router);
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running now');
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API not Found',
    error: '',
  });
});

export default app;
