# internal-tools-app

Small internal tools app: an admin panel, a contact form, and a couple of
basic pages. Used as a starting point for internal experiments.

## Setup

```
npm install
cp .env.example .env
npm start
```

Runs on http://localhost:3000

## Structure

- `server.js` — app entry point
- `routes/admin.js` — admin panel routes
- `public/index.html` — landing page with a contact form
