// Dependencies
const { catchAsync, validateAjv } = require('../../utils/helpers');
const {
  createUserAjv,
  findUserAjv,
  replaceUserAjv,
  updateUserAjv,
  deleteUserAjv,
  listUserAjv,
} = require('./validations');
const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  BAD_REQUEST_MESSAGE,
} = require('../../utils/constants');

// In-memory data structure to store users
const users = [];

// Create User endpoint
const createUser = catchAsync(async (req, res) => {
  const userPayload = req.body;

  // Validate user
  const validateRequst = validateAjv(userPayload, createUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }

  if (userPayload.id !== undefined) {
    // Find user in data structure
    const userIndex = users.findIndex((u) => u.id === userPayload.id);
    // return error if duplicate user found
    if (userIndex !== -1) {
      res
        .status(BAD_REQUEST_STATUS_CODE)
        .json({ success: false, message: `User with id: ${userPayload.id} already exists` });
    }
  } else {
    userPayload.id = getNextUserId();
  }

  // Add user to data structure
  users.push(userPayload);
  // Return success response
  res
    .status(SUCCESS_STATUS_CODE)
    .json({ success: true, message: 'User created successfully', user: userPayload });
});

// Read User endpoint
const findUser = catchAsync(async (req, res) => {
  const id = +req.params.id;
  // Validate ID
  const validateRequst = validateAjv({ id }, findUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }
  // Find user in data structure
  const user = users.find((u) => u.id === id);
  // return error if user not found
  if (!user) {
    return res
      .status(NOT_FOUND_STATUS_CODE)
      .json({ success: false, message: `User with id: ${id} not found` });
  }
  // Return user data
  res.status(SUCCESS_STATUS_CODE).json({ success: true, message: 'User found', user });
});

// Replace User endpoint
const replaceUser = catchAsync(async (req, res) => {
  const id = +req.params.id;
  const userPayload = req.body;
  // Validate user
  const validateRequst = validateAjv({ id, ...userPayload }, replaceUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }
  // Find user in data structure
  const userIndex = users.findIndex((u) => u.id === id);
  // return error if user not found
  if (userIndex === -1) {
    return res
      .status(NOT_FOUND_STATUS_CODE)
      .json({ success: false, message: `User with id: ${id} not found` });
  }
  // Update user data
  users[userIndex] = userPayload;
  // Return updated user
  res
    .status(SUCCESS_STATUS_CODE)
    .json({ success: true, message: 'User replaced successfully', user: users[userIndex] });
});

// Update User endpoint
const updateUser = catchAsync(async (req, res) => {
  const id = +req.params.id;
  const userPayload = req.body;
  // Validate user
  const validateRequst = validateAjv({ id, ...userPayload }, updateUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }
  // Find user in data structure
  const userIndex = users.findIndex((u) => u.id === id);
  // return error if user not found
  if (userIndex === -1) {
    return res
      .status(NOT_FOUND_STATUS_CODE)
      .json({ success: false, message: `User with id: ${id} not found` });
  }
  // Update user data
  users[userIndex] = { ...users[userIndex], ...userPayload };
  // Return updated user
  res
    .status(SUCCESS_STATUS_CODE)
    .json({ success: true, message: 'User updated successfully', user: users[userIndex] });
});

// Delete User endpoint
const deleteUser = catchAsync(async (req, res) => {
  const id = +req.params.id;
  // Validate ID
  const validateRequst = validateAjv({ id }, deleteUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }
  // Find user in data structure
  const userIndex = users.findIndex((u) => u.id === id);

  // return error if user not found
  if (userIndex === -1) {
    return res
      .status(NOT_FOUND_STATUS_CODE)
      .json({ success: false, message: `User with id: ${id} not found` });
  }

  const user = { ...users[userIndex] };
  // Remove user
  users.splice(userIndex, 1);
  // Return success response
  return res
    .status(SUCCESS_STATUS_CODE)
    .json({ success: true, message: 'User deleted successfully', user });
});

// List User endpoint
const listUser = catchAsync(async (req, res) => {
  const { page, size } = req.body;
  // Validate request
  const validateRequst = validateAjv({ page, size }, listUserAjv);
  if (!validateRequst.valid) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ success: false, message: BAD_REQUEST_MESSAGE, errors: validateRequst.errors });
  }
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  return res.status(SUCCESS_STATUS_CODE).json({
    success: true,
    users: users.slice(startIndex, endIndex),
  });
});

const getNextUserId = () => {
  let largestId = 0;
  if (!users.length) return largestId;
  for (const user of users) {
    if (user.id > largestId) {
      largestId = user.id;
    }
  }
  return largestId++;
};

module.exports = { createUser, findUser, replaceUser, updateUser, deleteUser, listUser };
