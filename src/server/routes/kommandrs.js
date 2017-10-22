var express = require('express');
var router = express.Router();
var models = require('../models');

router
  .get('/', (req, res) => {
    models.Kommandr.findAll({
      include: [],
    }).then( kommandrs => {
      res.json(kommandrs)
    });
  })
  .post('/', (req, res) => {
    const { title, description, cli } = req.body;
    models.Kommandr.create({
      title,
      description,
      cli
    });
  })
  .get('/:kommandrId', (req, res) => {
    const { kommandrId } = req.params;
    models.Kommandr.findById(kommandrId)
      .then( kommandr => {
        res.json(kommandr)
    });
});

module.exports = router;
