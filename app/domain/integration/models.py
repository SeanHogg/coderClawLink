"""Integration domain aggregate for CoderClawLink.

Models external service integrations (GitHub, Jira, Slack, etc.) with
configuration management and activation controls. Supports Replit-style
GitHub integration and Builder.io-style third-party tool connections.
"""

from __future__ import annotations

import json
from typing import Any, Dict, Optional

from app.models.database import IntegrationType


class IntegrationId:
    """Value object wrapping a positive integer integration identifier."""

    def __init__(self, value: int) -> None:
        if value <= 0:
            raise ValueError(f"IntegrationId must be a positive integer, got {value}")
        self._value = value

    @property
    def value(self) -> int:
        return self._value

    def __eq__(self, other: object) -> bool:
        if isinstance(other, IntegrationId):
            return self._value == other._value
        return NotImplemented

    def __hash__(self) -> int:
        return hash(self._value)

    def __repr__(self) -> str:
        return f"IntegrationId({self._value})"


class IntegrationConfig:
    """Value object holding the opaque configuration for an integration."""

    def __init__(self, data: Optional[Dict[str, Any]] = None) -> None:
        self._data: Dict[str, Any] = data or {}

    def get(self, key: str, default: Any = None) -> Any:
        """Retrieve a configuration value by key."""
        return self._data.get(key, default)

    def to_json(self) -> str:
        """Serialise the config to a JSON string."""
        return json.dumps(self._data)

    @classmethod
    def from_json(cls, value: str) -> IntegrationConfig:
        """Deserialise config from a JSON string."""
        return cls(data=json.loads(value))

    def __eq__(self, other: object) -> bool:
        if isinstance(other, IntegrationConfig):
            return self._data == other._data
        return NotImplemented

    def __repr__(self) -> str:
        return f"IntegrationConfig(keys={list(self._data.keys())})"


class Integration:
    """Aggregate root representing a third-party service integration."""

    def __init__(
        self,
        id: IntegrationId,
        tenant_id: int,
        name: str,
        integration_type: IntegrationType,
        config: Optional[IntegrationConfig] = None,
        is_active: bool = True,
    ) -> None:
        self.id = id
        self.tenant_id = tenant_id
        self.name = name
        self.integration_type = integration_type
        self.config = config or IntegrationConfig()
        self.is_active = is_active

    def activate(self) -> None:
        """Enable this integration."""
        self.is_active = True

    def deactivate(self) -> None:
        """Disable this integration."""
        self.is_active = False

    def update_config(self, data: Dict[str, Any]) -> None:
        """Replace the integration configuration."""
        self.config = IntegrationConfig(data=data)

    def __repr__(self) -> str:
        return (
            f"Integration(id={self.id}, name={self.name!r}, "
            f"type={self.integration_type}, active={self.is_active})"
        )
