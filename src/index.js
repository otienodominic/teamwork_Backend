import config from './config';
import app from './app';

app.listen(config.port, () => {
  console.log(`Here I am my friend on port ${config.port}`);
});
