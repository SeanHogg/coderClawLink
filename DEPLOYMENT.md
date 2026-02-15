# Deployment Guide

## Prerequisites

- Python 3.10+
- pip or poetry for dependency management
- (Optional) Telegram Bot Token from @BotFather
- (Optional) GitHub Personal Access Token
- (Optional) API keys for AI agents

## Installation Steps

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
```

### 4. Run the Application

```bash
python -m app.main
```

The server will start on `http://localhost:8000`

## Accessing the Portal

### Web Interface

Open your browser to:
- Main Portal: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Telegram Bot

1. Open Telegram and search for your bot
2. Send `/start` to begin
3. Use commands like `/create_project`, `/tasks`, `/execute`

## Production Deployment

### Using Docker (Recommended)

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "-m", "app.main"]
```

Build and run:

```bash
docker build -t ai-agent-orchestrator .
docker run -p 8000:8000 --env-file .env ai-agent-orchestrator
```

### Using systemd (Linux)

Create `/etc/systemd/system/ai-orchestrator.service`:

```ini
[Unit]
Description=AI Agent Orchestrator Portal
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/ai-agent-orchestrator
Environment="PATH=/opt/ai-agent-orchestrator/venv/bin"
EnvironmentFile=/opt/ai-agent-orchestrator/.env
ExecStart=/opt/ai-agent-orchestrator/venv/bin/python -m app.main
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable ai-orchestrator
sudo systemctl start ai-orchestrator
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
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
