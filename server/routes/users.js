var express = require('express');
var router = express.Router();
var models = require('../models');
var passport=  require('passport');
var passwordHash = require('password-hash');

router
  .get('/', (req, res) => {
    models.User.findAll({
      include: [],
    }).then(function(users) {
      res.json(users)
    });
  })
  .post('/', (req, res) => {
    const { username, email, password, github } = req.body;
    const hashedPassword = passwordHash.generate(password);
    models.User.create({
      username,
      email,
      password: hashedPassword,
      github,
    });
  })
  .get('/:userId', (req, res) => {
    const { userId } = req.params;
    models.User.findById(userId)
      .then( user => {
        res.json(user)
    });
  })
  .post('/login', (req, res) => {
    next();
  })
  .get('/logout', (req, res) => {
    next();
  })
  .post('/signup', (req, res) => {
    next();
  });

module.exports = router;
