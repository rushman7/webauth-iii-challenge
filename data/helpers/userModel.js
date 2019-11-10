const db = require('../dbConfig');

module.exports = { getUsers, add, getUser }

function getUsers(user) {
  let query = db('users as u');

  if (user) query
    .select('u.id', 'u.username', 'u.password', 'u.departments')
    .where('u.departments', user.departments)

  return query.select('u.id', 'u.username', 'u.password', 'u.departments')
};

function getUser(username) {
  return db('users').where(username).first();
};

function add(user) {
  return db('users').insert(user)
};
