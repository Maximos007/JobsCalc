const express = require('express');
const server = express();
const routes = require('./routes');

// usando a template engine
server.set('view engine', 'ejs');

// habilitar arquivos statics
server.use(express.static('public'));

// usar o req.body -> liberação do corpo da requisição
server.use(express.urlencoded({ extended: true }));

// routes
server.use(routes);

server.listen(3333, () => console.log('server is running'));