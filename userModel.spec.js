const db = require('./data/dbConfig');
const Users = require('./data/helpers/userModel');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('add user', () => {
    it('inserts a user into the db', async () => {
      let usersNumber;
      usersNumber = await db('users');
      expect(usersNumber).toHaveLength(0);
      await Users.add({ 
        username: "Paul",
        password: "password",
        departments: "Marketing"
       })
      usersNumber = await db('users');
      expect(usersNumber).toHaveLength(1);
    })
  })
});