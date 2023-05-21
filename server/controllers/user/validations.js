const str = { type: 'string' };
const num = { type: 'number' };

const userAjv = {
  id: num,
  name: str,
  email: {
    ...str,
    format: 'email',
  },
  address: str,
  phone: str,
};
const userAjvKeysWithoutId = Object.keys(userAjv).filter((key) => key !== 'id');
const getAnyOf = (array) => {
  const retArr = [];
  for (const item of array) {
    retArr.push({ required: [item] });
  }
  return { anyOf: retArr };
};
const createUserAjv = {
  type: 'object',
  required: ['name', 'email'],
  properties: userAjv,
  additionalProperties: false,
};
const updateUserAjv = {
  type: 'object',
  required: ['id'],
  properties: userAjv,
  ...getAnyOf(userAjvKeysWithoutId),
  additionalProperties: false,
};
const replaceUserAjv = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: userAjv,
  additionalProperties: false,
};
const findUserAjv = {
  type: 'object',
  required: ['id'],
  properties: { id: num },
  additionalProperties: false,
};
const deleteUserAjv = {
  type: 'object',
  required: ['id'],
  properties: { id: num },
  additionalProperties: false,
};
const listUserAjv = {
  type: 'object',
  required: ['page', 'size'],
  properties: {
    page: num,
    size: num,
  },
  additionalProperties: false,
};
module.exports = {
  listUserAjv,
  createUserAjv,
  updateUserAjv,
  replaceUserAjv,
  findUserAjv,
  deleteUserAjv,
};
