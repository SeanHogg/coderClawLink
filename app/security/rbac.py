"""Role-Based Access Control (RBAC) for CoderClawLink.

Provides role and permission management supporting both global and
tenant-scoped assignments.
"""

from __future__ import annotations

from enum import Enum
from typing import Dict, Set


class Role(Enum):
    VIEWER = 'viewer'
    DEVELOPER = 'developer'
    MANAGER = 'manager'
    OWNER = 'owner'
    ADMIN = 'admin'


class Permission(Enum):
    # Task permissions
    TASK_SUBMIT = 'task_submit'
    TASK_READ = 'task_read'
    TASK_CANCEL = 'task_cancel'

    # Agent permissions
    AGENT_EXECUTE = 'agent_execute'
    AGENT_REGISTER = 'agent_register'

    # Admin permissions
    ADMIN_SYSTEM = 'admin_system'
    ADMIN_USERS = 'admin_users'

    # Project permissions
    PROJECT_READ = 'project_read'
    PROJECT_CREATE = 'project_create'

    # Requirement permissions
    REQUIREMENT_READ = 'requirement_read'
    REQUIREMENT_CREATE = 'requirement_create'
    REQUIREMENT_ASSIGN = 'requirement_assign'

    # Work assignment
    WORK_ASSIGN = 'work_assign'

    # Lifecycle control
    LIFECYCLE_CONTROL = 'lifecycle_control'

    # Integration permissions
    INTEGRATION_MANAGE = 'integration_manage'
    INTEGRATION_READ = 'integration_read'

    # Tenant permissions
    TENANT_READ = 'tenant_read'
    TENANT_MANAGE = 'tenant_manage'


# Default permission sets for each role
_ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.VIEWER: {
        Permission.TASK_READ,
        Permission.PROJECT_READ,
        Permission.REQUIREMENT_READ,
        Permission.INTEGRATION_READ,
        Permission.TENANT_READ,
    },
    Role.DEVELOPER: {
        Permission.TASK_SUBMIT,
        Permission.TASK_READ,
        Permission.TASK_CANCEL,
        Permission.AGENT_EXECUTE,
        Permission.PROJECT_READ,
        Permission.REQUIREMENT_READ,
        Permission.INTEGRATION_READ,
        Permission.TENANT_READ,
    },
    Role.MANAGER: {
        Permission.PROJECT_READ,
        Permission.PROJECT_CREATE,
        Permission.REQUIREMENT_READ,
        Permission.REQUIREMENT_CREATE,
        Permission.REQUIREMENT_ASSIGN,
        Permission.WORK_ASSIGN,
        Permission.LIFECYCLE_CONTROL,
        Permission.INTEGRATION_MANAGE,
        Permission.INTEGRATION_READ,
        Permission.TENANT_READ,
    },
    Role.OWNER: {
        Permission.TASK_SUBMIT,
        Permission.TASK_READ,
        Permission.TASK_CANCEL,
        Permission.AGENT_EXECUTE,
        Permission.AGENT_REGISTER,
        Permission.PROJECT_READ,
        Permission.PROJECT_CREATE,
        Permission.REQUIREMENT_READ,
        Permission.REQUIREMENT_CREATE,
        Permission.REQUIREMENT_ASSIGN,
        Permission.WORK_ASSIGN,
        Permission.LIFECYCLE_CONTROL,
        Permission.INTEGRATION_MANAGE,
        Permission.INTEGRATION_READ,
        Permission.TENANT_READ,
        Permission.TENANT_MANAGE,
        Permission.ADMIN_USERS,
    },
    Role.ADMIN: {p for p in Permission},
}


class RBACManager:
    """Manages global and tenant-scoped role assignments and permission checks."""

    def __init__(self) -> None:
        # global: user_id -> set of roles
        self._user_roles: Dict[str, Set[Role]] = {}
        # extra per-user permissions granted explicitly
        self._user_extra_permissions: Dict[str, Set[Permission]] = {}
        # revoked per-user permissions
        self._user_revoked_permissions: Dict[str, Set[Permission]] = {}
        # tenant-scoped: (tenant_id, user_id) -> set of roles
        self._tenant_roles: Dict[tuple, Set[Role]] = {}

    # ------------------------------------------------------------------
    # Global role management
    # ------------------------------------------------------------------

    def assign_role(self, user_id: str, role: Role) -> None:
        """Assign a global role to a user."""
        self._user_roles.setdefault(user_id, set()).add(role)

    def revoke_role(self, user_id: str, role: Role) -> None:
        """Revoke a global role from a user."""
        self._user_roles.get(user_id, set()).discard(role)

    def get_roles(self, user_id: str) -> Set[Role]:
        """Return all global roles for a user."""
        return set(self._user_roles.get(user_id, set()))

    # ------------------------------------------------------------------
    # Global permission checks
    # ------------------------------------------------------------------

    def has_permission(self, user_id: str, permission: Permission) -> bool:
        """Return True if the user holds the given permission globally."""
        revoked = self._user_revoked_permissions.get(user_id, set())
        if permission in revoked:
            return False

        extra = self._user_extra_permissions.get(user_id, set())
        if permission in extra:
            return True

        for role in self._user_roles.get(user_id, set()):
            if permission in _ROLE_PERMISSIONS.get(role, set()):
                return True

        return False

    def grant_permission(self, user_id: str, permission: Permission) -> None:
        """Explicitly grant a permission to a user (overrides role defaults)."""
        self._user_extra_permissions.setdefault(user_id, set()).add(permission)
        # Remove from revoked if previously revoked
        self._user_revoked_permissions.get(user_id, set()).discard(permission)

    def revoke_permission(self, user_id: str, permission: Permission) -> None:
        """Explicitly revoke a permission from a user."""
        self._user_revoked_permissions.setdefault(user_id, set()).add(permission)
        # Remove from extra grants
        self._user_extra_permissions.get(user_id, set()).discard(permission)

    # ------------------------------------------------------------------
    # Tenant-scoped role management
    # ------------------------------------------------------------------

    def assign_tenant_role(self, tenant_id: str, user_id: str, role: Role) -> None:
        """Assign a role to a user within a specific tenant."""
        key = (tenant_id, user_id)
        self._tenant_roles.setdefault(key, set()).add(role)

    def revoke_tenant_role(self, tenant_id: str, user_id: str, role: Role) -> None:
        """Revoke a role from a user within a specific tenant."""
        key = (tenant_id, user_id)
        self._tenant_roles.get(key, set()).discard(role)

    def get_tenant_roles(self, tenant_id: str, user_id: str) -> Set[Role]:
        """Return all roles a user holds within a specific tenant."""
        key = (tenant_id, user_id)
        return set(self._tenant_roles.get(key, set()))

    def has_tenant_permission(
        self, tenant_id: str, user_id: str, permission: Permission
    ) -> bool:
        """Return True if the user holds the permission within the tenant."""
        key = (tenant_id, user_id)
        for role in self._tenant_roles.get(key, set()):
            if permission in _ROLE_PERMISSIONS.get(role, set()):
                return True
        return False


_rbac_manager: RBACManager | None = None


def get_rbac_manager() -> RBACManager:
    """Return a shared RBACManager instance."""
    global _rbac_manager
    if _rbac_manager is None:
        _rbac_manager = RBACManager()
    return _rbac_manager
