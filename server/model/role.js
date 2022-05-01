const { Role } = require('../schema');

const exists = (id) => {
  return Role.count({});
};

module.exports = { exists };
