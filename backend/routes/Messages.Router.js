module.exports = function(io) {
    const express = require('express');
    const Router = express.Router();
    const Controller = require('../controllers/Messages.Controller');




    Router.get('/', Controller.getAllMessages(io));
    Router.post('/', Controller.createMessage(io));

    return Router;
}
