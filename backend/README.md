# CuraSense Backend

This is a minimal Node.js/Express backend for the CuraSense frontend included in the workspace. It provides:

- File upload endpoint: POST /api/upload (multipart/form-data, field name: file)
- Reports endpoints: GET /api/reports and GET /api/reports/:id
- Assistant endpoint (mocked): POST /api/assistant
- Static serving for uploaded files at /uploads

Quick start

1. Open a terminal and change into the backend folder:

```powershell
cd backend
```

2. Install dependencies:

```powershell
npm install
```

3. Start the server (development):

```powershell
npm run dev
```

Or run in production mode:

```powershell
npm start
```

The server listens on port 4000 by default. Point the frontend to this backend (e.g. set a proxy during development or change fetch URLs to http://localhost:4000/api/...).

Notes and next steps

- Currently the assistant is a mocked, rule-based responder. Replace `src/routes/assistant.js` with a real AI provider integration.
- Data is stored in a JSON file using lowdb at `backend/data/db.json`. For production, switch to a proper database.
- Add authentication, validation, rate-limiting, and input sanitization before deploying to production.
