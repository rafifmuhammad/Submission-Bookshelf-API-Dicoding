const {
  getAllUsersHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} = require('../handler/userHandler');

const userRoute = [
  {
    method: 'GET',
    path: '/users',
    handler: getAllUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserByIdHandler,
  },
  {
    method: 'POST',
    path: '/users',
    handler: addUserHandler,
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: updateUserByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUserByIdHandler,
  },
];

module.exports = userRoute;
