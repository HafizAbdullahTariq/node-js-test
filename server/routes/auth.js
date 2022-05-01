const express = require('express');
const AuthRouter = express.Router();

const { AuthController } = require('../controllers');

AuthRouter.post('/', AuthController.authenticate);

module.exports = AuthRouter;
