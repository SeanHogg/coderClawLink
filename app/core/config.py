from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    """Application settings."""
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./portal.db"
    
    # Telegram Bot
    telegram_bot_token: str = ""
    
    # GitHub
    github_token: str = ""
    
    # Agent API Keys
    anthropic_api_key: str = ""
    openai_api_key: str = ""
    
    # Ollama
    ollama_base_url: str = "http://localhost:11434"
    
    # OpenDevin
    opendevin_api_url: str = "http://localhost:3000"
    
    # Goose
    goose_api_url: str = "http://localhost:8000"
    
    # Server
    api_host: str = "0.0.0.0"
    api_port: int = 8000

    # CORS – allowed origins for the frontend.
    # Accepts a comma-separated string, e.g.:
    #   CORS_ORIGINS=https://app.coderclaw.ai,http://localhost:3000
    cors_origins_str: str = "https://app.coderclaw.ai"

    @property
    def cors_origins(self) -> List[str]:
        """Return CORS origins as a list (parsed from the comma-separated string)."""
        return [origin.strip() for origin in self.cors_origins_str.split(",") if origin.strip()]

    # Frontend URL (used in documentation / redirect hints)
    frontend_url: str = "https://app.coderclaw.ai"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
