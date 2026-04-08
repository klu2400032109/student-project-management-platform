# Student Project & Portfolio Management Platform (Full Stack)

This is a simple, college-friendly full‑stack project similar to a "Student Project Management Platform":
- Student login/register
- Add / view / update / delete projects
- Portfolio page (public-style view)
- Admin view (basic) to review projects and change status
- File upload support (project report/ppt/images) stored locally

## Tech Stack
- Frontend: React (Vite) + React Router + Axios
- Backend: Node.js + Express + JWT Auth + Local JSON DB (no external DB required)

> Why JSON DB? So the project runs anywhere without MongoDB/MySQL. You can later replace it with MongoDB/MySQL.

---

## 1) Run Backend

### Requirements
- Node.js 18+ recommended

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5000

### Environment
Copy `.env.example` to `.env` and update values if needed.

---

## 2) Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

## Default Admin
Register normally, then in `backend/data/db.json` set that user's `"role": "admin"`.
(or create a user and edit role)

---

## API Summary
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/projects
- POST /api/projects
- GET  /api/projects/:id
- PUT  /api/projects/:id
- DELETE /api/projects/:id
- GET  /api/admin/projects
- PUT  /api/admin/projects/:id/status
- POST /api/admin/projects/:id/feedback

---

## Notes
- Uploaded files are stored under `backend/uploads/`
- Database is `backend/data/db.json`
