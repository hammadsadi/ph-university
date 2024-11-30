import express, { Application, Request, Response } from "express";
import cors from 'cors'
import router from './app/routes/intex';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running Now');
});

// Application Route
app.use('/api/v1', router);

// API Middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app