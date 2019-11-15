const server = require('./server');
const request = require('supertest');

describe('GET /', () => {
  it('returns 401 Unauthorized', () => {
    return request(server).get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '33')
      .then(res => {
        expect(res.body.message).toBe('You shall not pass!')
      })
  });
});

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", environment: process.env.DB_ENV });
});
