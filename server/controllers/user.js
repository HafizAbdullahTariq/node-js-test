const { catchAsync } = require('../utils/helpers');
const { UserModel, RoleModel } = require('../model');

const list = (req, res) => {
  return UserModel.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: 'Error processing your request' });
    });
};

const create = catchAsync(async (req, res, next) => {
  let { username, password, role } = req.body;
  if (!username) return res.status(400).send({ error: 'username required.' });
  if (!password) return res.status(400).send({ error: 'password required.' });
  const roles = await RoleModel.exists();
  if (!roles) return res.status(500).send({ error: 'Roles do not exist, please seed data.' });
  const existingUser = await UserModel.findOne(username);
  if (existingUser) return res.status(400).send({ error: 'Duplicate username' });

  const createdUser = await UserModel.save({ username, password, role });
  await createdUser.addRole([role === 'ADMIN' ? 2 : 1]);
  return res
    .status(200)
    .send({ message: `${role === 'ADMIN' ? 'Admin' : 'User'} created successfully` });
});
const exists = (req, res) => {
  const id = req.params.id;
  return UserModel.exists(id)
    .then((count) => {
      if (count > 0) return res.status(204).send();
      else throw err;
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send({ error: 'User id not found' });
    });
};

const find = (req, res) => {
  const id = req.params.id;
  return UserModel.findById(id)
    .then((user) => {
      if (user) res.status(200).send(user);
      else throw err;
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send({ error: `User with id ${id} not found` });
    });
};

const replace = (req, res) => {
  const id = req.params.id;
  return res.status(200).send({ message: `Replaced user with id ${id}` });
};

const update = (req, res) => {
  const id = req.params.id;
  return res.status(200).send({ message: `Updated user with id ${id}` });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  return res.status(200).send({ message: `Deleted user with id ${id}` });
};

module.exports = { list, create, exists, find, replace, update, deleteUser };
