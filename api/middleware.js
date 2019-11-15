const jwt = require('jsonwebtoken');

module.exports = { 
  validateCredentialBody, 
  restricted,
  generateToken
};

function validateCredentialBody(req, res, next) {
  const { username, password } = req.body;

  if (!req.body) res.status(400).json({ message: "Missing multiple BODY inputs." })
  else if (!username || !password) res.status(400).json({ message: "Missing username or password." })
  else next();
}

function restricted(req, res, next) {
    const token = req.headers.authorization
    if(token){
        const secret = 'qwdqwldq9u129dj1l2du1o2d12';

        jwt.verify(token, secret, (error, decodedToken) => {
            if(error){
                res.status(401).json({message: `tampered token. invalid creds.`})
            }
            else{
                res.decodeJwt = decodedToken;
                next();
            }
        })
    }
    else{
        res.status(400).json({ message: 'No credentials provided' });
  }
}

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const secret = 'qwdqwldq9u129dj1l2du1o2d12';
  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, secret, options)
}