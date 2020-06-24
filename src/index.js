import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import router from './routes';
// https://www.youtube.com/watch?v=-E_SuY_8Ubs
const app = express();
app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(config.port, () => {
  console.log(`Here I am my friend on port ${config.port}`);
});
