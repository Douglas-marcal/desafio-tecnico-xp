import express from 'express';
import 'express-async-errors';

import dotenv from 'dotenv';

import errorHandler from './middleware/http.error';

import router from './router';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
