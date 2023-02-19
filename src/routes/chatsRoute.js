const {
  getAllChatsHandler,
  getChatByIdHandler,
  addChatHandler,
  deleteChatByIdHandler,
  getAllMessagesByIdHandler,
} = require('../handler/chatsHandler');

const chatRoute = [
  {
    method: 'GET',
    path: '/chats',
    handler: getAllChatsHandler,
  },
  {
    method: 'GET',
    path: '/chats/{chatId}',
    handler: getChatByIdHandler,
  },
  {
    method: 'GET',
    path: '/chats/messages/{senderId}',
    handler: getAllMessagesByIdHandler,
  },
  {
    method: 'POST',
    path: '/chats',
    handler: addChatHandler,
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}',
    handler: deleteChatByIdHandler,
  },
];

module.exports = chatRoute;
