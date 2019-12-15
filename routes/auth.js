const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { alertLoc } = require("../modules/util.js");
const passport = require('passport');
require('../passport/index')(passport);

router.post("/join", async (req, res, next) => {
  let { email, userpw, username } = req.body;
  try {
    let result = await User.findOne({ where: { email } }); //가입중 이미 있나 찾아보자!!
    if (result) {
      res.send(alertLoc("이미 존재하는 이메일입니다", "/")); //플레시는 req에 묻어나온다 !
    } else {
      let hash = await bcrypt.hash(userpw, 9);
      let resultUser = await User.create({
        email,
        userpw: hash,
        username
      });
      res.json(resultUser);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
})

module.exports = router;
