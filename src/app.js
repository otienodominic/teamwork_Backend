import express from 'express';
import bodyParser from 'body-parser';
// import path from 'path';
// import config from './config';
import router from './routes';
// https://www.youtube.com/watch?v=-E_SuY_8Ubs
const app = express();
app.use(bodyParser.json());

app.use('/api/v1', router);

export default app;
