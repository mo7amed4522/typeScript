import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config/config';
import routes from './routes/index';
import database from './database/index';

console.log(config);

const PORT = config.port || 3000;

// create instant server
const app: Application = express();

// Middleware to parse Server

app.use(express.json());

// HTTP request logged Middleware
app.use(morgan('common'));

// HTTP security middleware
app.use(helmet());

// apply the rate limiting middleware to all request
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // one Hour
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP , please try again after one hour',
  })
);

// use routes
app.use('/api', routes);

//test database
database.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((error) => {
      client.release();
      console.log(error.stack);
    });
});

app.use(errorMiddleware);

app.use((_req, res) => {
  res.status(404).json({
    message: 'The link is not correct',
  });
});
// start express server
app.listen(PORT, () => {
  console.log(`server is starting at port :${PORT}`);
});

export default app;
