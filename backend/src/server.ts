import express from 'express';
import 'express-async-errors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
