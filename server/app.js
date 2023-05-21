const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// const path = require('path');
const { AppError, globalErrorHandler } = require('./utils/helpers');
const cors = require('cors');
const router = require('./routes');
const { IS_DEV_ENV } = require('./utils/constants');

const app = express();

// Development Logging or Set security HTTP headers
if (IS_DEV_ENV) app.use(morgan('dev'));
else app.use(helmet());

// Limit a connection to 1000 requests per hour
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP.\n Please try again in an hour.',
});
app.use('/api', limiter);

// enable cors
app.use(cors());

// Body parser, reads data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(compression());

// ROUTER
app.use('/api', router);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'), (err) => {
//     if (err) res.status(500).send(err);
//   });
// });

// Handle undefined routes
//! Order dependent! Must be placed before globalErrorHandler.
app.all('*', (req, _, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on the server.`, 404));
});

// Error Middleware
app.use(globalErrorHandler);

module.exports = app;
