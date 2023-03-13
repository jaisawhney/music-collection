import express, {Express} from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});