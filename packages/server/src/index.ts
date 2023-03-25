import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import routes from './routes/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* Routes */
app.use('/api', routes);

/* Static */
app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});