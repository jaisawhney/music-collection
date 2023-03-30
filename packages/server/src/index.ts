import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

import routes from './routes/index.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Static */
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/api', routes);
app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});