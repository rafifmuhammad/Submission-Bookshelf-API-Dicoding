const { nanoid } = require('nanoid');
const users = require('../data/users');

const getAllUsersHandler = () => ({
  status: 'success',
  data: {
    users,
  },
});

const getUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const index = users.findIndex((user) => user.user_id === userId);

  if (index !== -1) {
    return {
      status: 'success',
      data: users[index],
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'user tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addUserHandler = (request, h) => {
  const {
    username, email, name, password, dateOfBirth, phoneNumber,
  } = request.payload;
  const userId = nanoid(16);
  const createdAt = new Date().toISOString();

  if (!name && !email && !dateOfBirth && !username) {
    const response = h.response({
      status: 'fail',
      message: 'field tidak boleh kosong',
      data: {
        user_id: userId,
        username,
        email,
        name,
        password,
        date_of_birth: dateOfBirth,
        phone_number: phoneNumber,
      },
    });

    response.code(500);
    return response;
  }

  if (password.length < 6) {
    const response = h.response({
      status: 'fail',
      message: 'password tidak boleh kurang dari 6 karakter',
    });

    response.code(500);
    return response;
  }

  const newUser = {
    user_id: userId,
    username,
    email,
    name,
    password,
    date_of_birth: dateOfBirth,
    phone_number: phoneNumber,
    created_at: createdAt,
  };

  users.push(newUser);

  const isSuccess = users.filter((user) => user.user_id === userId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'user berhasil ditambahkan',
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const updateUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const {
    name, password, dateOfBirth, phoneNumber,
  } = request.payload;
  const index = users.findIndex((user) => user.user_id === userId);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      name,
      password,
      date_of_birth: dateOfBirth,
      phone_number: phoneNumber,
    };

    const response = h.response({
      status: 'success',
      message: 'user berhasil diubah',
      data: users[index],
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal diubah',
  });

  response.code(404);
  return response;
};

const deleteUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const index = users.findIndex((user) => user.user_id === userId);

  if (index !== -1) {
    users.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'user berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
