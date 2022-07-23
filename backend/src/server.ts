import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
