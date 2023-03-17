import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import path from 'path';

import routes from './routes/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});