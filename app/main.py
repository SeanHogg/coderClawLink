"""Main FastAPI application."""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os

from app.core.database import init_db
from app.core.config import get_settings
from app.api import projects, tasks, agents, runtime, audit
from app.telegram_bot.bot import get_bot

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle management for the application."""
    # Startup
    logger.info("Starting AI Agent Orchestrator Portal...")
    logger.info("Phase 2: Distributed AI Node with Transport Abstraction")
    
    # Initialize database
    await init_db()
    logger.info("Database initialized")
    
    # Phase 2: Initialize security and session management
    from app.security.session import get_session_manager
    from app.security.rbac import get_rbac_manager
    from app.security.audit import get_audit_logger
    from app.transport.local_runtime import get_local_runtime
    
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    audit_logger = get_audit_logger()
    runtime = get_local_runtime()
    
    logger.info("Security systems initialized")
    logger.info("Transport abstraction layer ready")
    
    # Start Telegram bot if configured
    settings = get_settings()
    if settings.telegram_bot_token:
        try:
            bot = get_bot()
            # Start bot in background (don't await)
            import asyncio
            asyncio.create_task(bot.start())
            logger.info("Telegram bot started")
        except Exception as e:
            logger.error(f"Failed to start Telegram bot: {str(e)}")
    else:
        logger.warning("Telegram bot token not configured, bot not started")
    
    logger.info("✓ Phase 2 features active:")
    logger.info("  - Transport abstraction layer")
    logger.info("  - Multi-session isolation")
    logger.info("  - Role-based access control")
    logger.info("  - Audit logging")
    logger.info("  - Distributed task lifecycle")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    if settings.telegram_bot_token:
        try:
            bot = get_bot()
            await bot.stop()
        except Exception as e:
            logger.error(f"Error stopping Telegram bot: {str(e)}")


# Create FastAPI app
app = FastAPI(
    title="coderClawLink - Distributed AI Node",
    description="Phase 2: Secure, distributed AI-native development runtime with transport abstraction and remote orchestration",
    version="2.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(projects.router, prefix="/api")
app.include_router(tasks.router, prefix="/api")
app.include_router(agents.router, prefix="/api")

# Phase 2: New runtime and audit APIs
app.include_router(runtime.router, prefix="/api")
app.include_router(audit.router, prefix="/api")

# Mount static files for frontend
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/")
async def root():
    """Serve the main frontend page."""
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    index_path = os.path.join(static_dir, "index.html")
    
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {
        "message": "AI Agent Orchestrator Portal API",
        "docs": "/docs",
        "version": "0.1.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    
    settings = get_settings()
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=True
    )
