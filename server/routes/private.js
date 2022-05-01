const express = require('express');
const PrivateRouter = express.Router();

const { PrivateController } = require('../controllers');
const { JwtMiddleware } = require('../middleware');

PrivateRouter.get('/admin', JwtMiddleware.hasRole('ADMIN'), PrivateController.adminOnly);
PrivateRouter.get('/user', JwtMiddleware.hasRole('USER'), PrivateController.userOnly);

module.exports = PrivateRouter;
