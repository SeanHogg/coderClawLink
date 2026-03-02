"""Requirement domain aggregate for CoderClawLink.

Models a software requirement (user story / feature request) with a full
lifecycle state machine and optional human-approval gates at configurable
stages. Inspired by Replit's project management and Builder.io's content
lifecycle controls.
"""

from __future__ import annotations

import json
from typing import List, Optional

from app.models.database import LifecycleStage, RequirementStatus


class RequirementId:
    """Value object wrapping a positive integer requirement identifier."""

    def __init__(self, value: int) -> None:
        if value <= 0:
            raise ValueError(f"RequirementId must be a positive integer, got {value}")
        self._value = value

    @property
    def value(self) -> int:
        return self._value

    def __eq__(self, other: object) -> bool:
        if isinstance(other, RequirementId):
            return self._value == other._value
        return NotImplemented

    def __hash__(self) -> int:
        return hash(self._value)

    def __repr__(self) -> str:
        return f"RequirementId({self._value})"


class LifecycleGate:
    """Value object representing a mandatory human-approval checkpoint."""

    def __init__(self, stage: LifecycleStage) -> None:
        self.stage = stage

    @classmethod
    def planning_gate(cls) -> LifecycleGate:
        return cls(LifecycleStage.PLANNING)

    @classmethod
    def execution_gate(cls) -> LifecycleGate:
        return cls(LifecycleStage.EXECUTION)

    @classmethod
    def review_gate(cls) -> LifecycleGate:
        return cls(LifecycleStage.REVIEW)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, LifecycleGate):
            return self.stage == other.stage
        return NotImplemented

    def __hash__(self) -> int:
        return hash(self.stage)

    def __repr__(self) -> str:
        return f"LifecycleGate({self.stage})"


# Valid status transitions: status -> set of allowed next statuses
_TRANSITIONS = {
    RequirementStatus.DRAFT:       {RequirementStatus.OPEN, RequirementStatus.REJECTED},
    RequirementStatus.OPEN:        {RequirementStatus.ASSIGNED, RequirementStatus.REJECTED},
    RequirementStatus.ASSIGNED:    {RequirementStatus.IN_PROGRESS, RequirementStatus.OPEN, RequirementStatus.REJECTED},
    RequirementStatus.IN_PROGRESS: {RequirementStatus.IN_REVIEW, RequirementStatus.REJECTED},
    RequirementStatus.IN_REVIEW:   {RequirementStatus.DONE, RequirementStatus.IN_PROGRESS, RequirementStatus.REJECTED},
    RequirementStatus.DONE:        set(),
    RequirementStatus.REJECTED:    set(),
}


class Requirement:
    """Aggregate root representing a software requirement."""

    def __init__(
        self,
        id: RequirementId,
        tenant_id: int,
        title: str,
        description: Optional[str] = None,
        status: RequirementStatus = RequirementStatus.DRAFT,
        assigned_to: Optional[str] = None,
    ) -> None:
        self.id = id
        self.tenant_id = tenant_id
        self.title = title
        self.description = description or ""
        self.status = status
        self.assigned_to = assigned_to
        self._lifecycle_gates: List[LifecycleGate] = []

    # ------------------------------------------------------------------
    # Lifecycle transitions
    # ------------------------------------------------------------------

    def _transition(self, target: RequirementStatus) -> None:
        allowed = _TRANSITIONS.get(self.status, set())
        if target not in allowed:
            raise ValueError(
                f"Cannot transition requirement from {self.status} to {target}"
            )
        self.status = target

    def open(self) -> None:
        """Move from DRAFT to OPEN."""
        self._transition(RequirementStatus.OPEN)

    def assign(self, assignee: str) -> None:
        """Assign to an agent or user and move to ASSIGNED."""
        self._transition(RequirementStatus.ASSIGNED)
        self.assigned_to = assignee

    def start(self) -> None:
        """Move to IN_PROGRESS (must be ASSIGNED first)."""
        self._transition(RequirementStatus.IN_PROGRESS)

    def request_review(self) -> None:
        """Move to IN_REVIEW."""
        self._transition(RequirementStatus.IN_REVIEW)

    def complete(self) -> None:
        """Move to DONE."""
        self._transition(RequirementStatus.DONE)

    def reject(self, reason: str = "") -> None:
        """Reject the requirement from any active state."""
        allowed = _TRANSITIONS.get(self.status, set())
        if RequirementStatus.REJECTED not in allowed:
            raise ValueError(
                f"Cannot reject requirement in status {self.status}"
            )
        self.status = RequirementStatus.REJECTED
        if reason:
            self.description = (self.description + f"\nRejection reason: {reason}").strip()

    # ------------------------------------------------------------------
    # Lifecycle gates
    # ------------------------------------------------------------------

    def add_lifecycle_gate(self, gate: LifecycleGate) -> None:
        """Add a human-approval gate at the given stage."""
        if gate not in self._lifecycle_gates:
            self._lifecycle_gates.append(gate)

    def remove_lifecycle_gate(self, gate: LifecycleGate) -> None:
        """Remove a lifecycle gate."""
        self._lifecycle_gates = [g for g in self._lifecycle_gates if g != gate]

    def requires_human_approval_at(self, stage: LifecycleStage) -> bool:
        """Return True if a gate is set for the given stage."""
        return any(g.stage == stage for g in self._lifecycle_gates)

    def lifecycle_gates_as_str(self) -> str:
        """Serialise lifecycle gates to a JSON string."""
        return json.dumps([g.stage.value for g in self._lifecycle_gates])

    @staticmethod
    def lifecycle_gates_from_str(value: Optional[str]) -> List[LifecycleGate]:
        """Deserialise lifecycle gates from a JSON string."""
        if not value:
            return []
        try:
            stages = json.loads(value)
            return [LifecycleGate(LifecycleStage(s)) for s in stages]
        except (json.JSONDecodeError, ValueError):
            return []

    def __repr__(self) -> str:
        return f"Requirement(id={self.id}, title={self.title!r}, status={self.status})"
