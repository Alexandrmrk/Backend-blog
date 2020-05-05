import express from 'express';

const port = 7777;
const app = express();

app.get('/', (request, response) => {
  response.send('Hello Alexandr!');
});

app.listen(port, () => {
  console.log(`Express server  listening on port ${port}`);
});
