import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';
import { sendSuccess } from './utils/response.utils';
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
    return sendSuccess(
        res,
        { message: 'Sistema de Gestion Administrativa de Personal Academico' },
        'API is running'
    );
});

app.get('/health', (_req: Request, res: Response) => {
    return sendSuccess(
        res,
        { status: 'OK', timestamp: new Date().toISOString() },
        'Health check passed'
    );
});

app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});

export default app;
