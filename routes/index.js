const express = require('express');
const router = express.Router();
const {Post,User} = require('../models')

/* GET home page. */
router.get('/', async(req, res, next)=> {
  res.render('index', {
    title: 'SNS',
    user: req.user,
    // lists:

    });
});

module.exports = router;
