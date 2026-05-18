#!/usr/bin/env python3
"""Mock AI agent runtime for the AI Empire Command Center.

This service simulates a workforce of AI agents emitting operational events. It is
intentionally lightweight so the dashboard can be wired to realistic event data
before real agent orchestration is introduced.
"""

from __future__ import annotations

import json
import random
import time
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

EventType = Literal["heartbeat", "task_progress", "approval_requested", "incident_update", "council_vote", "opportunity_update"]

ROOT = Path(__file__).resolve().parents[3]
EVENT_LOG = ROOT / "apps" / "agent-runtime" / "events.jsonl"

COMPANIES = {
    "holding-hq": ["Executive", "Finance", "Legal", "War Council"],
    "network-guardian": ["NOC", "Incident Response", "Microsoft 365 Security", "Client Communications"],
    "opportunity-lab": ["Market Research", "Financial Modeling", "Opportunity Council", "Risk Review"],
    "venture-builder": ["Product", "Engineering", "Growth", "QA"],
    "personal-life": ["Family Ops", "Scheduling", "Home Automation", "Chief of Staff"],
}

ACTIONS = [
    "Reviewing monitoring evidence",
    "Drafting remediation plan",
    "Scoring business opportunity",
    "Preparing approval request",
    "Running council debate phase",
    "Updating project status",
    "Generating client-safe summary",
    "Checking policy rules",
]

SENSITIVE_ACTIONS = [
    "Send client maintenance email",
    "Apply Microsoft 365 security setting",
    "Deploy monitoring connector to production",
    "Access sensitive client logs",
    "Change client network configuration",
]

@dataclass
class RuntimeEvent:
    id: str
    type: EventType
    company: str
    department: str
    agent: str
    message: str
    risk_level: str
    requires_approval: bool
    created_at: str
    metadata: dict


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def build_agents() -> list[tuple[str, str, str]]:
    agents: list[tuple[str, str, str]] = []
    for company, departments in COMPANIES.items():
        for department in departments:
            for idx in range(1, 4):
                agents.append((company, department, f"{department} Agent {idx}"))
    return agents


def generate_event(seq: int, agents: list[tuple[str, str, str]]) -> RuntimeEvent:
    company, department, agent = random.choice(agents)
    event_type: EventType = random.choices(
        ["heartbeat", "task_progress", "approval_requested", "incident_update", "council_vote", "opportunity_update"],
        weights=[35, 30, 10, 8, 9, 8],
        k=1,
    )[0]

    risk = "LOW"
    requires_approval = False
    message = random.choice(ACTIONS)
    metadata: dict = {"autonomy_level": 2, "simulated": True}

    if event_type == "approval_requested":
        action = random.choice(SENSITIVE_ACTIONS)
        risk = random.choice(["HIGH", "CRITICAL"])
        requires_approval = True
        message = f"Approval requested: {action}"
        metadata["requested_action"] = action
    elif event_type == "incident_update":
        company = "network-guardian"
        department = random.choice(["NOC", "Incident Response", "Microsoft 365 Security"])
        risk = random.choice(["MEDIUM", "HIGH", "CRITICAL"])
        message = random.choice([
            "Client internet outage detected",
            "Microsoft 365 service health alert normalized",
            "OVRC device offline signal received",
            "Eero Insight connectivity degradation detected",
        ])
        metadata["client_site"] = random.choice(["Client Site A", "Client Site B", "Client Site C", "Client Site D"])
    elif event_type == "council_vote":
        company = random.choice(["holding-hq", "opportunity-lab"])
        department = random.choice(["War Council", "Opportunity Council"])
        message = random.choice([
            "Council agent voted to escalate to owner",
            "Council agent voted to proceed with low-risk research",
            "Council agent objected due to client-impact risk",
            "Council agent recommended a small validation experiment",
        ])
        metadata["vote_score"] = round(random.uniform(0.2, 0.95), 2)
    elif event_type == "opportunity_update":
        company = "opportunity-lab"
        department = random.choice(["Market Research", "Financial Modeling", "Opportunity Council"])
        message = random.choice([
            "New niche AI service candidate scored",
            "Competitor scan completed",
            "Revenue model drafted",
            "Automation feasibility improved after research",
        ])
        metadata["opportunity_score"] = round(random.uniform(0.45, 0.92), 2)

    return RuntimeEvent(
        id=f"evt_{seq:06d}",
        type=event_type,
        company=company,
        department=department,
        agent=agent,
        message=message,
        risk_level=risk,
        requires_approval=requires_approval,
        created_at=now(),
        metadata=metadata,
    )


def run(iterations: int = 25, delay: float = 0.2) -> None:
    EVENT_LOG.parent.mkdir(parents=True, exist_ok=True)
    agents = build_agents()
    with EVENT_LOG.open("a", encoding="utf-8") as fh:
        for seq in range(1, iterations + 1):
            event = generate_event(seq, agents)
            line = json.dumps(asdict(event), sort_keys=True)
            fh.write(line + "\n")
            fh.flush()
            print(line)
            time.sleep(delay)


if __name__ == "__main__":
    run()
