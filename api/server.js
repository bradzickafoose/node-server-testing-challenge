const express = require('express');

const Festivals = require('../festivals/festivalsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up', dbenv: process.env.DB_ENV });
});

server.get('/festivals', (req, res) => {
    Festivals.getAll()
        .then(festival => {
            res.status(200).json(festival);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.post('/festivals', (req, res) => {
    Festivals.insert(req.body)
        .then(([id]) => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.delete('/festivals/:id', (req, res) => {
    Festivals.remove(req.params.id)
        .then(festival => {
            res.status(200).json(festival)
        })
        .catch(error => {
            res.status(500).json(error.message)
        });
})

module.exports = server;
