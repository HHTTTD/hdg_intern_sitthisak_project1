const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  // Assuming you have a user object with username and password
  const user = {
    id: 1,
    username: 'example_user'
  };

  jwt.sign({ user }, 'secretkey', (err, accessToken) => {
    if (err) {
      res.status(500).json({ error: 'Failed to generate token' });
    } else {
      res.json({ accessToken });
    }
  });
};
