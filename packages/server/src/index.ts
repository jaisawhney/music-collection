import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import routes from './routes/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */
app.use(routes);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});