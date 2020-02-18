const express = require('express');
const server = require('../server');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/accounts', (req, res) =>{

    db('accounts')
    .then(account => {
        res.status(200).json({account});
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem w/database"});
    });
    
});

router.get('/accounts/:id', (req, res) => {

    db('accounts')
    .where({id: req.params.id})
    .first() //returns the first element in the returned array from db
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem getting that account"});
    });

});

router.post('/accounts', (req, res) => {

    db('accounts')
    .insert(req.body, 'id') //second param returns an array with and id
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem posting to database."});
    });

});

router.put('/accounts/:id', (req, res) => {
    //you have to .where() before you .update()
    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(account => {
        res.status(201).json(account);
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem updating account."});
    })
});

router.delete('/accounts/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(200).json({error: "There was a problem deleteing account."});
    })
});

module.exports = router;
