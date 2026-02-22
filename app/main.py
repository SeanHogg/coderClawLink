"""Main FastAPI application – API layer (api.coderclaw.ai)."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.database import init_db
from app.core.config import get_settings
from app.api import projects, tasks, agents, runtime, audit, tenants, requirements, integrations
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
    
    logger.info("✓ Phase 3 features active:")
    logger.info("  - Multi-tenant structure (organisations, memberships)")
    logger.info("  - Enhanced RBAC with Manager role")
    logger.info("  - Human-in-the-loop requirements & lifecycle control")
    logger.info("  - Integration management (GitHub, Jira, …)")
    logger.info("  - DDD domain layer (tenant, requirement, integration)")
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

# Add CORS middleware – allow only configured frontend origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_origins,
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

# Phase 3: Multi-tenant, RBAC, requirements, integrations
app.include_router(tenants.router, prefix="/api")
app.include_router(requirements.router, prefix="/api")
app.include_router(integrations.router, prefix="/api")


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
