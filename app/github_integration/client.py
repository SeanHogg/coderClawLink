"""GitHub integration for repository management and PR creation."""

from github import Github, GithubException
from typing import Optional, Dict, Any, Tuple
from app.core.config import get_settings
import logging

logger = logging.getLogger(__name__)


class GitHubIntegration:
    """Handle GitHub operations."""
    
    def __init__(self, token: Optional[str] = None):
        """Initialize GitHub client."""
        self.settings = get_settings()
        self.token = token or self.settings.github_token
        self.client = None
        
        if self.token:
            self.client = Github(self.token)
    
    def is_configured(self) -> bool:
        """Check if GitHub is properly configured."""
        return bool(self.token and self.client)
    
    def parse_repo_url(self, repo_url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Parse GitHub repository URL to extract owner and repo name.
        
        Args:
            repo_url: GitHub repository URL
        
        Returns:
            Tuple of (owner, repo_name) or (None, None) if invalid
        """
        try:
            # Handle different URL formats
            # https://github.com/owner/repo
            # git@github.com:owner/repo.git
            if "github.com" in repo_url:
                parts = repo_url.replace(".git", "").split("/")
                if len(parts) >= 2:
                    repo_name = parts[-1]
                    owner = parts[-2].split(":")[-1]  # Handle git@github.com:owner format
                    return owner, repo_name
        except Exception as e:
            logger.error(f"Failed to parse repo URL {repo_url}: {str(e)}")
        
        return None, None
    
    async def get_repository(self, owner: str, repo_name: str):
        """Get repository object."""
        if not self.is_configured():
            raise ValueError("GitHub not configured")
        
        try:
            return self.client.get_repo(f"{owner}/{repo_name}")
        except GithubException as e:
            logger.error(f"Failed to get repository {owner}/{repo_name}: {str(e)}")
            raise
    
    async def create_branch(
        self,
        owner: str,
        repo_name: str,
        branch_name: str,
        from_branch: str = "main"
    ) -> bool:
        """
        Create a new branch in the repository.
        
        Args:
            owner: Repository owner
            repo_name: Repository name
            branch_name: Name for the new branch
            from_branch: Source branch (default: main)
        
        Returns:
            True if successful, False otherwise
        """
        if not self.is_configured():
            logger.error("GitHub not configured")
            return False
        
        try:
            repo = await self.get_repository(owner, repo_name)
            
            # Get the source branch reference
            source = repo.get_branch(from_branch)
            
            # Create new branch
            repo.create_git_ref(
                ref=f"refs/heads/{branch_name}",
                sha=source.commit.sha
            )
            
            logger.info(f"Created branch {branch_name} in {owner}/{repo_name}")
            return True
        
        except GithubException as e:
            logger.error(f"Failed to create branch: {str(e)}")
            return False
    
    async def create_pull_request(
        self,
        owner: str,
        repo_name: str,
        title: str,
        body: str,
        head_branch: str,
        base_branch: str = "main"
    ) -> Optional[Dict[str, Any]]:
        """
        Create a pull request.
        
        Args:
            owner: Repository owner
            repo_name: Repository name
            title: PR title
            body: PR description
            head_branch: Source branch
            base_branch: Target branch (default: main)
        
        Returns:
            Dictionary with PR details or None if failed
        """
        if not self.is_configured():
            logger.error("GitHub not configured")
            return None
        
        try:
            repo = await self.get_repository(owner, repo_name)
            
            # Create pull request
            pr = repo.create_pull(
                title=title,
                body=body,
                head=head_branch,
                base=base_branch
            )
            
            logger.info(f"Created PR #{pr.number} in {owner}/{repo_name}")
            
            return {
                "number": pr.number,
                "url": pr.html_url,
                "title": pr.title,
                "state": pr.state
            }
        
        except GithubException as e:
            logger.error(f"Failed to create PR: {str(e)}")
            return None
    
    async def get_pull_request(
        self,
        owner: str,
        repo_name: str,
        pr_number: int
    ) -> Optional[Dict[str, Any]]:
        """Get pull request details."""
        if not self.is_configured():
            return None
        
        try:
            repo = await self.get_repository(owner, repo_name)
            pr = repo.get_pull(pr_number)
            
            return {
                "number": pr.number,
                "url": pr.html_url,
                "title": pr.title,
                "state": pr.state,
                "merged": pr.merged,
                "body": pr.body
            }
        
        except GithubException as e:
            logger.error(f"Failed to get PR: {str(e)}")
            return None


# Global GitHub integration instance
_github_integration: Optional[GitHubIntegration] = None


def get_github_integration() -> GitHubIntegration:
    """Get global GitHub integration instance."""
    global _github_integration
    if _github_integration is None:
        _github_integration = GitHubIntegration()
    return _github_integration
