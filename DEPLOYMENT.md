# Deployment Guide

## Architecture Overview

The application is split into two independent layers:

| Layer    | Domain                  | Source        |
|----------|-------------------------|---------------|
| Frontend | `app.coderclaw.ai`      | `frontend/`   |
| API      | `api.coderclaw.ai`      | `app/`        |

The **frontend** is a static HTML/CSS/JS application served from the `frontend/` directory.  
The **API** is a Python FastAPI application served from the `app/` directory.

---

## Prerequisites

- Python 3.10+
- pip or poetry for dependency management
- A static file host or web server for the frontend (e.g., nginx, CDN, GitHub Pages)
- (Optional) Telegram Bot Token from @BotFather
- (Optional) GitHub Personal Access Token
- (Optional) API keys for AI agents

---

## API Layer (api.coderclaw.ai)

### 1. Clone and Setup

```bash
git clone https://github.com/SeanHogg/AI-Agent-Orchestrator-.git
cd AI-Agent-Orchestrator-
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database (SQLite by default, can use PostgreSQL in production)
DATABASE_URL=sqlite+aiosqlite:///./portal.db

# Telegram Bot (get from @BotFather)
TELEGRAM_BOT_TOKEN=your_bot_token_here

# GitHub (create personal access token with repo scope)
GITHUB_TOKEN=ghp_your_token_here

# Agent API Keys
ANTHROPIC_API_KEY=sk-ant-your_key_here
OPENAI_API_KEY=sk-your_key_here

# Local Ollama (if running)
OLLAMA_BASE_URL=http://localhost:11434

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS – must include the frontend origin
CORS_ORIGINS_STR=https://app.coderclaw.ai

# Frontend URL
FRONTEND_URL=https://app.coderclaw.ai
```

### 4. Run the API

```bash
python -m app.main
```

The API will start on `http://localhost:8000`.

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`

---

## Frontend Layer (app.coderclaw.ai)

The frontend consists of static files in the `frontend/` directory:

```
frontend/
├── index.html   # Main SPA entry point
├── app.js       # Application logic (calls https://api.coderclaw.ai/api)
└── styles.css   # Styles
```

Deploy these files to any static hosting service (nginx, CDN, GitHub Pages, S3, etc.).

### Local development

```bash
# Serve frontend locally with Python's built-in server
cd frontend
python -m http.server 3000
# Open http://localhost:3000
```

For local development against the production API, update `API_BASE_URL` in `frontend/app.js`:

```js
const API_BASE_URL = 'https://api.coderclaw.ai/api'; // production
// or for local:
// const API_BASE_URL = 'http://localhost:8000/api';
```

Also add `http://localhost:3000` to `CORS_ORIGINS_STR` in the API's `.env`.

---

## Production Deployment

### API – Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "-m", "app.main"]
```

```bash
docker build -t coderclaw-api .
docker run -p 8000:8000 --env-file .env coderclaw-api
```

### API – systemd (Linux)

Create `/etc/systemd/system/coderclaw-api.service`:

```ini
[Unit]
Description=coderClawLink API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/coderclaw
Environment="PATH=/opt/coderclaw/venv/bin"
EnvironmentFile=/opt/coderclaw/.env
ExecStart=/opt/coderclaw/venv/bin/python -m app.main
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable coderclaw-api
sudo systemctl start coderclaw-api
```

### Nginx – API reverse proxy (api.coderclaw.ai)

```nginx
server {
    listen 443 ssl;
    server_name api.coderclaw.ai;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Nginx – Frontend static files (app.coderclaw.ai)

```nginx
server {
    listen 443 ssl;
    server_name app.coderclaw.ai;

    root /var/www/coderclaw/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Database Migration

For production, consider using PostgreSQL:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/ai_orchestrator
```

## Security Considerations

1. **Never commit `.env` file** - It contains secrets
2. **Use HTTPS in production** - Configure SSL/TLS
3. **Restrict API access** - Add authentication middleware
4. **Rotate tokens regularly** - Update API keys periodically
5. **Use strong database passwords** - If using PostgreSQL/MySQL
6. **Limit CORS origins** - Update `allow_origins` in `main.py`

## Monitoring

Add application monitoring:

```python
# In app/main.py
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

## Troubleshooting

### Telegram Bot Not Starting

- Verify `TELEGRAM_BOT_TOKEN` is set
- Check bot is not already running elsewhere
- Ensure bot has proper permissions from @BotFather

### Agent Not Available

- Verify API keys are set in `.env`
- Check agent service is running (for Ollama/OpenDevin/Goose)
- Review logs for connection errors

### Database Errors

- Ensure database file has write permissions
- Check disk space
- Verify DATABASE_URL format

## Logs

View application logs:

```bash
# If running in terminal
python -m app.main

# If using systemd
sudo journalctl -u ai-orchestrator -f

# If using Docker
docker logs -f container_name
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/SeanHogg/AI-Agent-Orchestrator-/issues
- Documentation: See README.md
