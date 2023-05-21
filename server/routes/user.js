const express = require('express');
const UserRouter = express.Router();

const { UserController } = require('../controllers');
UserRouter.post('/', UserController.createUser);
UserRouter.post('/list', UserController.listUser);

UserRouter.route('/:id')
  .get(UserController.findUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = UserRouter;
