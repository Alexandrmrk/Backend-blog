import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import ErrorHandler from './middleware/ErrorHandler';

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', ...routes);

app.use('*', (request, response) => {
  response.status(404).send('Endpoint not found on server!');
});

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Express server run http://${process.env.HOST}:${process.env.PORT}`);
});
