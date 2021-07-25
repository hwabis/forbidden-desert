const { Server, Origins } = require('boardgame.io/server');
const { ForbiddenDesert } = require('./Game');

const server = Server({
  games: [ForbiddenDesert],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
