import express from 'express';
import cors from 'cors';
import adminRoute from './routes/admin';

const port = 8000 || process.env.PORT;
const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', adminRoute);

app.use('/', (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.listen(port).on('listening', () => {
  console.log(`🚀 are live on ${port}`);
});

export default app;
