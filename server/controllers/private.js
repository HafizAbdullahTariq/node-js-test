const userOnly = (req, res) => {
  return res.status(200).send({ message: 'User: hello world' });
};

const adminOnly = (req, res) => {
  return res.status(200).send({ message: 'Admin: hello world' });
};

module.exports = { userOnly, adminOnly };
