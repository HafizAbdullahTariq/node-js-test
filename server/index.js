require('dotenv').config();
console.log('NODE_ENV', process.env.NODE_ENV);
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception. Server shutting down...');
  console.log(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.error('Unhandled rejection. Server shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

const debug = require('debug')('node:server');
const app = require('../app');
const server = require('http').Server(app);
const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
});
