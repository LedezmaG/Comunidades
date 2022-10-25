require('dotenv').config()
const Server = require('./src/models/server/Server')

const server = new Server();

server.listen();
