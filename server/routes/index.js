const express = require('express');
const Router = express.Router();

const PrivateRouter = require('./private');
const AuthRouter = require('./auth');
const UserRouter = require('./user');

const { JwtMiddleware } = require('../middleware');

Router.use('/private', JwtMiddleware.verify, PrivateRouter);
Router.use('/signin', AuthRouter);
// Router.use('/signup', JwtMiddleware.verify, UserRouter);
Router.use('/user', UserRouter);

module.exports = Router;
