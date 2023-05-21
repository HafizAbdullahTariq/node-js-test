const request = require('supertest');
const express = require('express');
const { faker } = require('@faker-js/faker');
const { UserController } = require('../index');
const {
  SUCCESS_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_STATUS_CODE,
} = require('../../utils/constants');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const app = express();
app.use(express.json());
app.post('/', UserController.createUser);
app.post('/list', UserController.listUser);

app
  .route('/:id')
  .get(UserController.findUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

let idIndex = 1;

//Create user
describe('User Controller', () => {
  it('Create user', () => {
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });
  });

  it('Create user should pass with out sending id in the request payload', () => {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.exist;
        expect(res.body.user.id).to.exist;
        newUser.id = res.body.user.id;
        expect(res.body.user).to.eql(newUser);
        idIndex++;
      });
  });

  it('Create user should fail if duplicate id is provided', async () => {
    let newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });
    return request(app)
      .post('/')
      .send(newUser)
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
      });
  });

  it('Create user should fail if request payload is invalid', () => {
    const newUser = { name: faker.person.fullName() };
    return request(app)
      .post('/')
      .send(newUser)
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.eq(BAD_REQUEST_MESSAGE);
      });
  });

  //Get user
  it('Get user', async () => {
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });
    return request(app)
      .get('/' + newUser.id)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });
  });

  it('Get user should fail if invalid id is provided', () => {
    return request(app)
      .get('/' + 1122)
      .expect(NOT_FOUND_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  it('Get user should fail if invalid id is provided', () => {
    return request(app)
      .get('/' + 'ssd')
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.eq(BAD_REQUEST_MESSAGE);
      });
  });

  //Replace user
  it('Replace user', async () => {
    // address will get replaced
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.country(),
    };

    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });

    const updatedUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    request(app)
      .put('/' + newUser.id)
      .send(updatedUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.user).to.exist;
        expect(res.body.user.id).to.exist;
        updatedUser.id = res.body.user.id;
        expect(res.body.user).to.eql(updatedUser);
      });
  });

  it('Replace user should fail if invalid id is provided', () => {
    const updatedUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .put('/' + 1122)
      .send(updatedUser)
      .expect(NOT_FOUND_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  it('Replace user should fail if invalid id is provided', () => {
    const updatedUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .put('/' + 'ssd')
      .send(updatedUser)
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  //Update user
  it('Update user', async () => {
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.country(),
    };

    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });

    let updatedUser = { name: faker.person.fullName() };

    return request(app)
      .patch('/' + newUser.id)
      .send(updatedUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eql(true);
        updatedUser = { ...newUser, ...updatedUser };
        expect(res.body.user).to.eql(updatedUser);
      });
  });

  it('Update user should fail if invalid id is provided', () => {
    const updatedUser = { name: faker.person.fullName() };
    return request(app)
      .patch('/' + 1122)
      .send(updatedUser)
      .expect(NOT_FOUND_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  it('Update user should fail if invalid id is provided', () => {
    const updatedUser = { name: faker.person.fullName() };
    return request(app)
      .patch('/' + 'ssd')
      .send(updatedUser)
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  //Delete user
  it('Delete user', async () => {
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.country(),
    };

    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });
    return request(app)
      .delete('/' + newUser.id)
      .expect(SUCCESS_STATUS_CODE);
  });

  it('Update user should fail if invalid id is provided', () => {
    return request(app)
      .delete('/' + 1122)
      .expect(NOT_FOUND_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  it('Update user should fail if invalid id is provided', () => {
    return request(app)
      .delete('/' + 'ssd')
      .expect(BAD_REQUEST_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.success).to.eq(false);
        expect(res.body.message).to.exist;
      });
  });

  //List users
  it('List users', async () => {
    const newUser = {
      id: idIndex++,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.country(),
    };

    await request(app)
      .post('/')
      .send(newUser)
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.user).to.eql(newUser);
      });

    return request(app)
      .post('/list')
      .send({ page: 1, size: 1 })
      .expect(SUCCESS_STATUS_CODE)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.users).to.exist;
        expect(res.body.users.length).to.eq(1);
      });
  });
});
