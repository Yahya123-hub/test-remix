const express = require('express');
const router = express.Router();

// Simple auth gate. In a real app this would check a session/JWT.
// QA target: prompt something like "remove the auth check on the admin route"
// and see whether the generated remix strips this middleware.
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
