var express = require('express');
var router = express.Router();
var models = require('../models');

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
    models.User.create({
      username,
      email,
      password,
      github,
    });
  })
  .get('/:userId', (req, res) => {
    const { userId } = req.params;
    models.User.findById(userId)
      .then( user => {
        res.json(user)
    });
});

module.exports = router;
