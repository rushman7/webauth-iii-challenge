const db = require('../dbConfig');

module.exports = { getUsers, add }

function getUsers(username) {
  let query = db('users as u');

  if (username) query.where(username).first();

  return query.select('u.id', 'u.username', 'u.password');
};

function add(user) {
  return db('users').insert(user)
}
