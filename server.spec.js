const server = require('./server');
const request = require('supertest');

describe('GET /', () => {
  it('returns 401 Unauthorized', () => {
    return request(server).get('/api/users')
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '33')
      .then(res => {
        expect(res.body.message).toBe('You shall not pass!')
      })
  });
});