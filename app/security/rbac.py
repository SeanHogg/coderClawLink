"""Role-based access control (RBAC) system."""

from enum import Enum
from typing import Set, Dict, Any, Optional, List
from dataclasses import dataclass, field
import logging

logger = logging.getLogger(__name__)


class Permission(str, Enum):
    """System permissions."""
    # Task permissions
    TASK_SUBMIT = "task:submit"
    TASK_CANCEL = "task:cancel"
    TASK_VIEW = "task:view"
    
    # Agent permissions
    AGENT_LIST = "agent:list"
    AGENT_EXECUTE = "agent:execute"
    AGENT_CONFIGURE = "agent:configure"
    
    # Skill permissions
    SKILL_LIST = "skill:list"
    SKILL_EXECUTE = "skill:execute"
    SKILL_INSTALL = "skill:install"
    
    # Project permissions
    PROJECT_READ = "project:read"
    PROJECT_WRITE = "project:write"
    PROJECT_DELETE = "project:delete"
    
    # Admin permissions
    ADMIN_USERS = "admin:users"
    ADMIN_SYSTEM = "admin:system"


class Role(str, Enum):
    """System roles."""
    ADMIN = "admin"
    DEVELOPER = "developer"
    VIEWER = "viewer"
    GUEST = "guest"


# Role permission mappings
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.ADMIN: {
        # All permissions
        Permission.TASK_SUBMIT,
        Permission.TASK_CANCEL,
        Permission.TASK_VIEW,
        Permission.AGENT_LIST,
        Permission.AGENT_EXECUTE,
        Permission.AGENT_CONFIGURE,
        Permission.SKILL_LIST,
        Permission.SKILL_EXECUTE,
        Permission.SKILL_INSTALL,
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
        Permission.PROJECT_DELETE,
        Permission.ADMIN_USERS,
        Permission.ADMIN_SYSTEM,
    },
    Role.DEVELOPER: {
        Permission.TASK_SUBMIT,
        Permission.TASK_CANCEL,
        Permission.TASK_VIEW,
        Permission.AGENT_LIST,
        Permission.AGENT_EXECUTE,
        Permission.SKILL_LIST,
        Permission.SKILL_EXECUTE,
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
    },
    Role.VIEWER: {
        Permission.TASK_VIEW,
        Permission.AGENT_LIST,
        Permission.SKILL_LIST,
        Permission.PROJECT_READ,
    },
    Role.GUEST: {
        Permission.AGENT_LIST,
        Permission.SKILL_LIST,
    },
}


@dataclass
class AccessPolicy:
    """Access policy for resources."""
    resource_type: str  # "project", "task", "agent", etc.
    resource_id: Optional[str] = None
    allowed_roles: Set[Role] = field(default_factory=set)
    allowed_users: Set[str] = field(default_factory=set)
    denied_users: Set[str] = field(default_factory=set)
    required_permissions: Set[Permission] = field(default_factory=set)


class RBACManager:
    """
    Role-Based Access Control Manager.
    
    Manages:
    - User roles and permissions
    - Resource-level access policies
    - Agent-level authorization
    - Skill-level execution controls
    """
    
    def __init__(self):
        """Initialize RBAC manager."""
        self._user_roles: Dict[str, Set[Role]] = {}
        self._user_permissions: Dict[str, Set[Permission]] = {}
        self._resource_policies: Dict[str, AccessPolicy] = {}
        logger.info("RBAC manager initialized")
    
    def assign_role(self, user_id: str, role: Role):
        """Assign a role to a user."""
        if user_id not in self._user_roles:
            self._user_roles[user_id] = set()
        
        self._user_roles[user_id].add(role)
        logger.info(f"Assigned role {role} to user {user_id}")
    
    def revoke_role(self, user_id: str, role: Role):
        """Revoke a role from a user."""
        if user_id in self._user_roles:
            self._user_roles[user_id].discard(role)
            logger.info(f"Revoked role {role} from user {user_id}")
    
    def grant_permission(self, user_id: str, permission: Permission):
        """Grant a specific permission to a user."""
        if user_id not in self._user_permissions:
            self._user_permissions[user_id] = set()
        
        self._user_permissions[user_id].add(permission)
        logger.info(f"Granted permission {permission} to user {user_id}")
    
    def revoke_permission(self, user_id: str, permission: Permission):
        """Revoke a specific permission from a user."""
        if user_id in self._user_permissions:
            self._user_permissions[user_id].discard(permission)
            logger.info(f"Revoked permission {permission} from user {user_id}")
    
    def get_user_permissions(self, user_id: str) -> Set[Permission]:
        """Get all permissions for a user."""
        permissions = set()
        
        # Add role-based permissions
        user_roles = self._user_roles.get(user_id, set())
        for role in user_roles:
            permissions.update(ROLE_PERMISSIONS.get(role, set()))
        
        # Add user-specific permissions
        permissions.update(self._user_permissions.get(user_id, set()))
        
        return permissions
    
    def has_permission(self, user_id: str, permission: Permission) -> bool:
        """Check if user has a specific permission."""
        return permission in self.get_user_permissions(user_id)
    
    def has_any_permission(self, user_id: str, permissions: Set[Permission]) -> bool:
        """Check if user has any of the specified permissions."""
        user_perms = self.get_user_permissions(user_id)
        return bool(user_perms & permissions)
    
    def has_all_permissions(self, user_id: str, permissions: Set[Permission]) -> bool:
        """Check if user has all of the specified permissions."""
        user_perms = self.get_user_permissions(user_id)
        return permissions.issubset(user_perms)
    
    def set_resource_policy(self, policy: AccessPolicy):
        """Set access policy for a resource."""
        policy_key = f"{policy.resource_type}:{policy.resource_id or '*'}"
        self._resource_policies[policy_key] = policy
        logger.info(f"Set policy for {policy_key}")
    
    def check_resource_access(
        self,
        user_id: str,
        resource_type: str,
        resource_id: Optional[str] = None,
        required_permission: Optional[Permission] = None
    ) -> bool:
        """
        Check if user has access to a resource.
        
        Args:
            user_id: User identifier
            resource_type: Type of resource (project, task, etc.)
            resource_id: Specific resource ID (None for general access)
            required_permission: Required permission for access
            
        Returns:
            True if user has access
        """
        # Check explicit denial
        policy_key = f"{resource_type}:{resource_id or '*'}"
        policy = self._resource_policies.get(policy_key)
        
        if policy and user_id in policy.denied_users:
            return False
        
        # Check if user has required permission
        if required_permission and not self.has_permission(user_id, required_permission):
            return False
        
        # Check policy requirements
        if policy:
            # Check user allowlist
            if policy.allowed_users and user_id not in policy.allowed_users:
                return False
            
            # Check role requirements
            if policy.allowed_roles:
                user_roles = self._user_roles.get(user_id, set())
                if not (user_roles & policy.allowed_roles):
                    return False
            
            # Check permission requirements
            if policy.required_permissions:
                if not self.has_all_permissions(user_id, policy.required_permissions):
                    return False
        
        return True
    
    def can_execute_agent(self, user_id: str, agent_type: str) -> bool:
        """Check if user can execute a specific agent."""
        return self.check_resource_access(
            user_id=user_id,
            resource_type="agent",
            resource_id=agent_type,
            required_permission=Permission.AGENT_EXECUTE
        )
    
    def can_execute_skill(self, user_id: str, skill_id: str) -> bool:
        """Check if user can execute a specific skill."""
        return self.check_resource_access(
            user_id=user_id,
            resource_type="skill",
            resource_id=skill_id,
            required_permission=Permission.SKILL_EXECUTE
        )


# Global RBAC manager instance
_rbac_manager: Optional[RBACManager] = None


def get_rbac_manager() -> RBACManager:
    """Get global RBAC manager instance."""
    global _rbac_manager
    if _rbac_manager is None:
        _rbac_manager = RBACManager()
    return _rbac_manager
