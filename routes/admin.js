const express = require('express');
const router = express.Router();

function requireAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) {
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

router.get('/debug/env', (req, res) => {
  if (process.env.ENABLE_ENV_DEBUG !== 'true') {
    return res.status(404).json({ error: 'Not found' });
  }

  const variables = Object.keys(process.env)
    .sort()
    .map((name) => `${name}=[REDACTED]`)
    .join('\n');

  res.set('Cache-Control', 'no-store');
  res.type('text/plain').send(`${variables}\n`);
});

module.exports = router;
