const userRoute = require('./routes/usersRoute');
const chatRoute = require('./routes/chatsRoute');

const routes = [
  ...userRoute,
  ...chatRoute,
];

module.exports = routes;
