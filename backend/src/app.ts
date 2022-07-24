import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import errorHandler from './middleware/http.error';

import router from './router';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;
