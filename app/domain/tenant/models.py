"""Tenant domain aggregate for CoderClawLink.

Models multi-tenant workspace membership with role-based access.
Supports Builder.io-style role & permissions controls and team
collaboration features.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional

from app.models.database import TenantRole, TenantStatus


class TenantId:
    """Value object wrapping a positive integer tenant identifier."""

    def __init__(self, value: int) -> None:
        if value <= 0:
            raise ValueError(f"TenantId must be a positive integer, got {value}")
        self._value = value

    @property
    def value(self) -> int:
        return self._value

    def __eq__(self, other: object) -> bool:
        if isinstance(other, TenantId):
            return self._value == other._value
        return NotImplemented

    def __hash__(self) -> int:
        return hash(self._value)

    def __repr__(self) -> str:
        return f"TenantId({self._value})"


class TenantMemberRole:
    """Value object describing a member's role within a tenant."""

    def __init__(self, role: TenantRole) -> None:
        self.role = role

    @classmethod
    def owner(cls) -> TenantMemberRole:
        return cls(TenantRole.OWNER)

    @classmethod
    def manager(cls) -> TenantMemberRole:
        return cls(TenantRole.MANAGER)

    @classmethod
    def developer(cls) -> TenantMemberRole:
        return cls(TenantRole.DEVELOPER)

    @classmethod
    def viewer(cls) -> TenantMemberRole:
        return cls(TenantRole.VIEWER)

    def can_manage_requirements(self) -> bool:
        """Return True if this role can create and manage requirements."""
        return self.role in (TenantRole.OWNER, TenantRole.MANAGER)

    def can_assign_work(self) -> bool:
        """Return True if this role can assign tasks and requirements."""
        return self.role in (TenantRole.OWNER, TenantRole.MANAGER)

    def is_owner(self) -> bool:
        return self.role == TenantRole.OWNER

    def __eq__(self, other: object) -> bool:
        if isinstance(other, TenantMemberRole):
            return self.role == other.role
        return NotImplemented

    def __repr__(self) -> str:
        return f"TenantMemberRole({self.role})"


@dataclass
class TenantMember:
    user_id: str
    role: TenantMemberRole
    is_active: bool = True


class Tenant:
    """Aggregate root representing a workspace (tenant)."""

    def __init__(
        self,
        id: TenantId,
        name: str,
        slug: str,
        description: Optional[str] = None,
        status: TenantStatus = TenantStatus.ACTIVE,
    ) -> None:
        self.id = id
        self.name = name
        self.slug = slug
        self.description = description
        self._status = status
        self._members: List[TenantMember] = []

    @property
    def members(self) -> List[TenantMember]:
        return [m for m in self._members if m.is_active]

    def is_active(self) -> bool:
        return self._status == TenantStatus.ACTIVE

    def add_member(self, user_id: str, role: TenantMemberRole) -> TenantMember:
        """Add a member to the tenant. Raises ValueError if already active."""
        existing = next(
            (m for m in self._members if m.user_id == user_id and m.is_active),
            None,
        )
        if existing is not None:
            raise ValueError(f"'{user_id}' is already an active member of this tenant")
        member = TenantMember(user_id=user_id, role=role)
        self._members.append(member)
        return member

    def remove_member(self, user_id: str) -> None:
        """Remove a member. Raises ValueError if removing the last owner."""
        member = next(
            (m for m in self._members if m.user_id == user_id and m.is_active),
            None,
        )
        if member is None:
            raise ValueError(f"'{user_id}' is not an active member of this tenant")

        # Prevent removing the last owner
        if member.role.is_owner():
            owner_count = sum(
                1 for m in self._members if m.is_active and m.role.is_owner()
            )
            if owner_count <= 1:
                raise ValueError(
                    f"Cannot remove '{user_id}': they are the last owner of this tenant"
                )

        member.is_active = False

    def __repr__(self) -> str:
        return f"Tenant(id={self.id}, name={self.name!r}, slug={self.slug!r})"
