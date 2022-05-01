const express = require('express');
const UserRouter = express.Router();

const { UserController } = require('../controllers');
const { JwtMiddleware } = require('../middleware');
UserRouter.get('/', JwtMiddleware.hasRole('ADMIN'), UserController.list);
UserRouter.post('/signup', UserController.create);

// UserRouter.route('/:id')
//   .head(JwtMiddleware.hasRole('ADMIN'), UserController.exists)
//   .get(JwtMiddleware.hasRole('ADMIN'), UserController.find)
//   .put(JwtMiddleware.hasRole('ADMIN'), UserController.replace)
//   .patch(JwtMiddleware.hasRole('ADMIN'), UserController.update)
//   .delete(JwtMiddleware.hasRole('ADMIN'), UserController.deleteUser);

module.exports = UserRouter;
