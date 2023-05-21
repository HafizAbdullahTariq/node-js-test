const express = require('express');
const Router = express.Router();

const UserRouter = require('./user');

Router.use('/user', UserRouter);

module.exports = Router;
