# Employee Management App

Full-stack app with React + FastAPI + MongoDB.

## Local Dev

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit as needed
uvicorn app.main:app --reload
# Seed sample data:
python seed.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 — Vite proxies `/api` → `http://localhost:8000`.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Version info |
| GET | `/health` | Health check |
| GET | `/employees` | List all (supports `?name=&department=`) |
| POST | `/employees` | Create employee |
| GET | `/employees/{id}` | Get by ID |
| PUT | `/employees/{id}` | Partial update |
| DELETE | `/employees/{id}` | Delete |

## GitHub Secrets (for CI/CD)

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | EC2 public IP or hostname |
| `EC2_USER` | SSH username (e.g. `ubuntu`) |
| `EC2_SSH_KEY` | Private SSH key for EC2 access |
