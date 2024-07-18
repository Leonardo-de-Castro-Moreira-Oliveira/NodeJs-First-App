import express from 'express';
import router from './routes';

const host = "localhost";
const port = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

function created(): void {
    console.log("Sucess, server on!");
    console.log(`Main Path => http://${host}:${port}/`);
}

app.listen(port, host, created);
