const { nanoid } = require('nanoid');
const chats = require('../data/chats');

const getAllChatsHandler = (request) => {
  const { userId } = request.query;
  if (userId) {
    return ({
      status: 'success',
      data: {
        chats: chats.filter((chat) => chat.user_id === userId)
          .map((chat) => ({
            id: chat.id,
            chat_id: chat.chat_id,
            sender_id: chat.sender_id,
            messages: chat.message,
          })),
      },
    });
  }

  return ({
    status: 'success',
    data: {
      chats,
    },
  });
};

const getChatByIdHandler = (request, h) => {
  const { chatId } = request.params;
  const index = chats.findIndex((chat) => chat.chat_id === chatId);

  if (index !== -1) {
    return {
      status: 'success',
      data: chats[index],
    };
  }

  const response = h.response({
    status: 'success',
    message: 'pesan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addChatHandler = (request, h) => {
  const { senderId, text, userId } = request.payload;
  const chatId = nanoid(16);
  const date = new Date().toISOString();

  const isDateAvailable = chats.filter(
    (chat) => chat.date.substring(0, 10) === date.substring(0, 10),
  ).length > 0;
  const isTheSameSender = chats.filter((chat) => chat.sender_id === senderId).length > 0;

  if (!isDateAvailable || !isTheSameSender) {
    const newChat = {
      chat_id: chatId, sender_id: senderId, date, user_id: userId, message: [],
    };

    chats.push(newChat);

    const isSuccess = chats.filter((chat) => chat.chat_id === chatId).length > 0;
    const index = chats.findIndex(
      (chat) => chat.date.substring(0, 10) === date.substring(0, 10) && chat.sender_id === senderId,
    );

    if (isSuccess) {
      const messageId = nanoid(16);
      const createdAt = new Date().toISOString();
      const newMessage = {
        message_id: messageId, text, created_at: createdAt,
      };

      chats[index].message.push(newMessage);

      const response = h.response({
        status: 'success',
        message: 'pesan berhasil dikirimkan',
      });

      response.code(201);
      return response;
    }
  }

  if (isDateAvailable && isTheSameSender) {
    const index = chats.findIndex(
      (chat) => chat.date.substring(0, 10) === date.substring(0, 10) && chat.sender_id === senderId,
    );

    if (index !== -1) {
      const messageId = nanoid(16);
      const createdAt = new Date().toISOString();
      const newMessage = {
        message_id: messageId, text, created_at: createdAt,
      };

      chats[index].message.push(newMessage);

      const response = h.response({
        status: 'success',
        message: 'pesan berhasil dikirimkan',
      });

      response.code(201);
      return response;
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'pesan gagal dikirimkan',
  });

  response.code(500);
  return response;
};

const deleteChatByIdHandler = (request, h) => {
  const { chatId } = request.params;
  const index = chats.findIndex((chat) => chat.chat_id === chatId);

  if (index !== -1) {
    chats.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'chat berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'chat gagal dihapus',
  });

  response.code(404);
  return response;
};

const getAllMessagesByIdHandler = (request, h) => {
  const { senderId } = request.params;
  const index = chats.findIndex((chat) => chat.sender_id === senderId);

  if (index !== -1) {
    return {
      status: 'success',
      data: {
        date: chats[index].date,
        messages: chats[index].message,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'pesan tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllChatsHandler,
  getChatByIdHandler,
  addChatHandler,
  deleteChatByIdHandler,
  getAllMessagesByIdHandler,
};
