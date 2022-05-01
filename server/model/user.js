const { User, Role } = require('../schema');

const findAll = () => {
  return User.findAll({
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['role'],
        through: { attributes: [] },
      },
    ],
    attributes: {
      exclude: ['id', 'password'],
    },
  });
};

const findById = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['role'],
        through: { attributes: [] },
      },
    ],
    attributes: {
      exclude: ['id', 'password'],
    },
  });
};

const findOne = (username) => {
  return User.findOne({
    where: { username: username },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['role'],
        through: { attributes: [] },
      },
    ],
  });
};

const save = (user) => {
  return User.create(user);
};

const exists = (id) => {
  return User.count({
    where: { id: id },
  });
};

module.exports = { findAll, findById, findOne, save, exists };
