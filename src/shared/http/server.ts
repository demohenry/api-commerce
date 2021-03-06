import 'reflect-metadata'; // reflect-metadata deve parmanecer pelo primeiro
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	return res.status(500).json({
		status: 'error',
		message: `Internal Server error ${error.message}`,
	});
});

app.listen(3333, () => {
	console.log('API Started 🔛');
});
