const mongoose = require('mongoose');
const express = require('express');
const Message = require('../models/Message.Model');

const getAllMessages = (io) => async (req, res) => {
    try {
        const allMessage = await Message.find();
        if (!allMessage) {
            return res.status(404).send({message: "Contact not found"});
        }
        res.send(allMessage)
    }
    catch (err) {
        res.status(500).send({message: err.message});
    }
}

const createMessage = (io) => async (req, res) => {
    try {
        const message = new Message({
            username: req.body.username,
            content: req.body.content
        });
        await message.save();

        io.emit('new-message', message); // Émettre l'événement 'new-message' avec le nouveau message

        res.send(message);
    }
    catch (err) {
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    getAllMessages,
    createMessage
}
