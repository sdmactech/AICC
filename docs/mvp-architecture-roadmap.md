# AI Empire Command Center — MVP Architecture & Execution Roadmap

## Objective

Build a private AI workforce command center for a holding-company-style AI operating system. The system should let the owner monitor companies, departments, agents, incidents, councils, approvals, tasks, business opportunities, build workstreams, and operational risk at a glance while preserving strict human approval for sensitive actions.

The product goal is not merely a dashboard. The target is an operating system for an AI-run holding company: one place to see the companies, departments, agents, work queues, approvals, monitoring alerts, council recommendations, and business-building pipelines that support the owner and family.

## MVP Product Pillars

### 1. Company Map / Workforce Visualization

The Company Map is the default home view. It shows companies as buildings, departments as rooms, agents as pixel-art workers at desks, and status indicators for work, thinking, approvals, incidents, blocks, debates, and idle capacity. Clicking a company enters the full building view. Clicking a room, desk, or agent opens an inspector panel with current tasks and controls.

### 2. Agent Operations Center

The Agent Operations Center tracks each agent's lifecycle: idle, assigned, thinking, working, waiting approval, completed, blocked, escalated, or failed. Every agent should emit heartbeats, task events, tool calls, cost estimates, output artifacts, and risk metadata.

### 3. Approval and Governance Engine

The system must automatically allow low-risk work while routing sensitive actions to the human owner. Sensitive actions include spending above budget, contacting clients, changing client systems, sending emails, buying domains, deploying code, accessing sensitive data, and changing Microsoft 365 settings.

### 4. Client Monitoring / Incident Operations

The first business-operational workflow is monitoring 4–5 existing client sites for internet outages, network alerts, Microsoft 365 alerts, and service degradation. The MVP should support Microsoft 365 first, then OVRC/Eero via API, webhook, email ingestion, or manual connector fallback.

### 5. War Council and Opportunity Council

The War Council handles hard operational questions with 8–12 specialized agents representing business, ethics, legal, risk, marketing, pro-decision, con-decision, finance, operations, customer impact, and technical architecture. The Opportunity Council researches niche AI-driven businesses, debates feasibility, scores opportunities, and routes viable ideas into the Venture Builder Studio.

## Parallel Workstreams

1. **Frontend Command Center:** convert the prototype into a real Next.js app with data-driven company, department, agent, incident, council, approval, and project ops views.
2. **Backend + Database:** create schema, APIs, event log, seed data, and persistence for companies, agents, tasks, approvals, incidents, councils, opportunities, and audit events.
3. **Agent Runtime:** start with mock agents that generate heartbeats and events, then graduate to real tool-using agents with controlled autonomy.
4. **Monitoring Integrations:** Microsoft 365 first, then OVRC/Eero depending on API, webhook, email, or scraping feasibility.
5. **Governance/Safety:** implement approval rules, budgets, audit trails, tool permissions, risk levels, and escalation policy.
6. **Councils:** implement War Council and Opportunity Council session models, debate phases, votes, consensus scoring, and final recommendation reports.
7. **Project Operations:** track GitHub, Slack, Jira status, build phases, blockers, PRs, and release milestones directly inside the Command Center.

## System Architecture

### Frontend

- Next.js app using React and TypeScript.
- App Router structure with a command-center home route.
- CSS-first implementation preserving the current hybrid corporate/game visual style.
- Data-driven components for companies, departments, agents, approvals, incidents, and councils.
- Future real-time updates through Server-Sent Events or WebSockets.

### Backend API

The backend can begin as Next.js route handlers for speed, then split into a dedicated FastAPI service when agent orchestration grows. Initial APIs should include:

- `GET /api/companies`
- `GET /api/agents`
- `GET /api/events`
- `GET /api/incidents`
- `GET /api/approvals`
- `POST /api/approvals/:id/approve`
- `POST /api/approvals/:id/reject`
- `POST /api/tasks`
- `POST /api/councils/war`
- `POST /api/councils/opportunity`
- `POST /api/connectors/webhook`

### Database

Postgres is the target production database. Prisma is a practical first schema layer for the Next.js MVP. The schema should preserve a complete audit trail and event history rather than only current state.

### Agent Runtime

The runtime should start as a separate mock service that periodically emits events. This service will simulate 50–100 agents across companies and departments. It should generate realistic task progress, approval requests, incidents, council votes, and opportunity research updates. Later it can be replaced or extended with LangGraph-style orchestrated agents.

### Queue and Realtime Layer

Redis is recommended for production job queues and pub/sub. For MVP, a mock event stream can be persisted to local JSON or database rows and polled by the frontend. The target model is event-driven: agents do work, emit events, events update dashboards, and sensitive events create approval requests.

## Core Data Model

### Company

Represents a business, division, or operating unit. Examples: Holding Company HQ, Network Guardian Co, AI Opportunity Lab, Venture Builder Studio, Personal Life Automation.

### Department

Represents a room or functional group inside a company. Examples: NOC / Monitoring, Incident Response, Finance, Legal / Risk, Engineering, Opportunity Council.

### Agent

Represents an AI worker. Stores name, role, company, department, status, autonomy level, current task, model/tool profile, cost budget, quality score, and heartbeat timestamp.

### Task

Represents assigned work. Stores title, goal, priority, risk level, owner agent, status, due date, dependencies, artifacts, and result summary.

### Event

Append-only event stream for agent heartbeats, status changes, tool calls, incident updates, council votes, approval requests, and human decisions.

### ApprovalRequest

Human approval gate for sensitive work. Stores requested action, risk reason, requesting agent, policy rule, affected client/system, proposed execution plan, approve/reject status, and audit trail.

### Incident

Operational alert or outage. Stores client, site, source connector, severity, status, timeline, affected services, evidence, recommended remediation, and approval requirements.

### CouncilSession

A War Council or Opportunity Council session. Stores topic, context, participants, debate phases, votes, consensus, dissenting opinions, final recommendation, and whether human approval is required.

### Opportunity

Business opportunity candidate. Stores market, problem, target customer, monetization path, automation potential, startup cost, risk, competition, confidence, and next action.

### PolicyRule

Governance rule that maps actions to allowed autonomy levels, approval requirements, budgets, and escalation paths.

### AuditLog

Immutable log of human decisions, agent actions, connector events, policy evaluations, approvals, rejections, and system changes.

## Autonomy and Risk Levels

- **L0 Observe:** agents may read public or already-authorized data and summarize.
- **L1 Draft:** agents may draft plans, emails, code, reports, and recommendations without external action.
- **L2 Low-Risk Execute:** agents may execute safe internal tasks within budget and policy.
- **L3 Controlled External:** agents may prepare external actions, but execution may require narrow scoped permissions.
- **L4 Approval Required:** spending above budget, contacting clients, changing systems, sending emails, buying domains, deploying code, accessing sensitive data, or Microsoft 365 changes require owner approval.
- **L5 Emergency Playbooks:** predefined incident actions may be prepared automatically, but external/client-impacting execution should remain approval-gated unless the owner explicitly configures emergency authority.

## Monitoring Integration Strategy

### Microsoft 365

Use Microsoft Graph where possible for service health, security alerts, message center items, users, conditional access/security changes, and tenant-level alerts. Begin with read-only monitoring.

### OVRC and Eero Insight

Investigate official APIs first. If APIs are limited, use webhook/email ingestion where supported. If neither is available, use monitored mailbox parsing or manual export ingestion as a temporary bridge.

### Normalized Incident Model

All monitoring sources should normalize into one incident model with severity, client, site, source, evidence, timeline, recommended action, and approval status.

## Council Workflows

### War Council

1. Intake hard operational question.
2. Classify sensitivity and risk.
3. Assign 8–12 specialist agents.
4. Run opening positions.
5. Run pro/con debate.
6. Request evidence or missing context.
7. Vote and score options.
8. Produce consensus recommendation and dissenting notes.
9. Escalate to human if sensitive.

### Opportunity Council

1. Intake opportunity area or autonomous scouting goal.
2. Research market pain, competitors, monetization, and automation feasibility.
3. Score opportunity on profit potential, automation potential, startup cost, competition, risk, speed to revenue, and owner fit.
4. Debate build/buy/skip.
5. Recommend next experiment.
6. Send approved opportunities to Venture Builder Studio.

## 30-Day Execution Plan

### Days 1–2

- Initialize GitHub repo and branch strategy.
- Preserve static prototype.
- Expand architecture documentation.
- Scaffold Next.js app.
- Create database schema draft.
- Create mock agent runtime service.
- Keep GitHub Issues as source of truth while Jira create issue is blocked.

### Week 1

- Data-driven Company Map in Next.js.
- Seed data for five companies and departments.
- Mock agents with heartbeat/event generation.
- Approval inbox with mock approve/reject actions.
- Project Ops tab showing GitHub, Slack, Jira, PR, and blocker state.

### Week 2

- Persist core entities in Postgres.
- Add incident model and first webhook ingestion endpoint.
- Add client/site model for 4–5 client sites.
- Add governance policy evaluator for approval-gated actions.

### Week 3

- Implement War Council session model.
- Implement Opportunity Council scoring model.
- Generate council recommendation reports.
- Add audit log viewer.

### Week 4

- Command Center v0.1 behind authenticated access.
- First production-grade monitoring flow.
- Owner approval workflow with audit trail.
- Deployment plan for frontend, backend, database, and worker runtime.

## Immediate Next Build Artifacts

1. `apps/web` — Next.js Command Center frontend.
2. `apps/agent-runtime` — mock agent heartbeat and event generator.
3. `packages/database` — Prisma/Postgres schema draft.
4. `docs/jira-remediation.md` — current Jira connector blocker and remediation path.
5. GitHub Issues — active tracker until Jira create issue is repaired.
