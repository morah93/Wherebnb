const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { route } = require('./users');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password })
  // const user = await User.findAll({
  //   where: {
  //     username: credential
  //   }
  // })
// console.log(user)
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({ user })
});




module.exports = router;
