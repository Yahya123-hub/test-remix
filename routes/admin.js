const express = require('express');
const router = express.Router();

function requireAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

router.use(requireAdminAuth);

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the admin panel',
    users: [
      { id: 1, name: 'Test User', role: 'admin' }
    ]
  });
});

module.exports = router;
