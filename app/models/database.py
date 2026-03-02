"""Database model enumerations shared across the Python application layer."""

from enum import Enum


class TenantStatus(Enum):
    ACTIVE = 'active'
    SUSPENDED = 'suspended'
    ARCHIVED = 'archived'


class TenantRole(Enum):
    OWNER = 'owner'
    MANAGER = 'manager'
    DEVELOPER = 'developer'
    VIEWER = 'viewer'


class RequirementStatus(Enum):
    DRAFT = 'draft'
    OPEN = 'open'
    ASSIGNED = 'assigned'
    IN_PROGRESS = 'in_progress'
    IN_REVIEW = 'in_review'
    DONE = 'done'
    REJECTED = 'rejected'


class LifecycleStage(Enum):
    PLANNING = 'planning'
    EXECUTION = 'execution'
    REVIEW = 'review'


class IntegrationType(Enum):
    GITHUB = 'github'
    JIRA = 'jira'
    SLACK = 'slack'
    GITLAB = 'gitlab'
    LINEAR = 'linear'
    NOTION = 'notion'
    WEBHOOK = 'webhook'
