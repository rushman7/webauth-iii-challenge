const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/helpers/userModel');
const middleware = require('../api/middleware');

const router = express.Router();

router.get('/users', middleware.restricted, (req, res) => {
  db.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

router.post('/register', middleware.validateCredentialBody, (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  db.add(credentials)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err))
})

router.post('/login', middleware.validateCredentialBody, (req, res) => {
  const { username, password } = req.body;

  db.getUsers({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(201).json({ message: `Logged in, welcome ${user.username}!` })
      } else res.status(401).json({ error: `Invalid credentials.` })
    })
    .catch(err => res.status(500).json(err))
})

router.get('/logout', (req, res) => {
  if (req.session) req.session.destroy(err => {
    if (err) res.json({ message: 'There was an error logging out.' })
    else res.status(200).json({ message: 'Successfully logged out.' })})
  else res.status(200).json({ message: 'No user logged in.' })
})

module.exports = router;