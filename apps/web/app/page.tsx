'use client';

import { useState } from 'react';
import { approvals, companies, lifecycle, statusText, type DepartmentKind, type AgentStatus } from './lib/seed-data';

function deptClass(dept: DepartmentKind | string) {
  return `avatar-${dept}`;
}

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] = useState<(typeof companies)[number] | null>(null);
  const [inspector, setInspector] = useState({ title: 'Select a company, room, or agent', body: 'Click any building to enter the company floor. Then inspect rooms, desks, and AI agents.' });

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">AI Workforce Command Center</div>
          <h1>AI Empire Command Center</h1>
          <p className="muted">Private operating system for AI-run companies, councils, monitoring, approvals, and venture building.</p>
        </div>
        <div className="pill">Owner Mode • Human approval required for sensitive actions</div>
      </header>

      <nav className="nav">
        <button>Company Map</button><button>Project Ops</button><button>Dashboard</button><button>Governance</button><button>Build Plan</button><button>Approval Inbox</button><button>Agent Registry</button>
      </nav>

      <section className="grid stats">
        <div className="stat"><span className="muted">Total Agents</span><br/><b>64</b><p className="positive">50–100+ target architecture</p></div>
        <div className="stat"><span className="muted">Approvals</span><br/><b>{approvals.length}</b><p className="warning">Sensitive work gated</p></div>
        <div className="stat"><span className="muted">Incidents</span><br/><b>1</b><p className="negative">Network Guardian critical alert</p></div>
        <div className="stat"><span className="muted">Jira</span><br/><b>Read OK</b><p className="negative">create tool timeout isolated</p></div>
      </section>

      {!selectedCompany && (
        <section className="card">
          <div className="card-title">Living AI Company Map</div>
          <div className="card-subtitle">Enter each company building to see departments, desks, agents, incidents, councils, and approval queues.</div>
          <div className="empire">
            {companies.map((company) => (
              <article className="tower-card" key={company.id} onClick={() => { setSelectedCompany(company); setInspector({ title: company.name, body: `${company.description} ${company.agents} agents active across ${company.rooms.length} departments.` }); }}>
                <div className="tower-icon">{company.icon}</div>
                <div className="tower">{Array.from({ length: 9 }).map((_, i) => <i key={i} className={company.status.includes('Critical') && i === 2 ? 'hot' : ''} />)}</div>
                <h3>{company.name}</h3>
                <p className="muted">{company.agents} agents • {company.status}</p>
                <span className={`badge badge-${company.badge}`}>{company.status}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {selectedCompany && (
        <section className="card">
          <div className="topbar">
            <div>
              <button className="btn" onClick={() => setSelectedCompany(null)}>← Back to Company Map</button>
              <h2>{selectedCompany.name} — Live Operations Floor</h2>
              <p className="muted">{selectedCompany.description}</p>
            </div>
            <span className={`badge badge-${selectedCompany.badge}`}>{selectedCompany.status}</span>
          </div>
          <div className="actions"><button className="btn btn-primary">Assign Goal</button><button className="btn">Create Agent</button><button className="btn">Summon Council</button><button className="btn">Review Incidents</button><button className="btn btn-danger">Pause Company</button></div>
          <div className="floor">
            <div className="rooms">
              {selectedCompany.rooms.map(([name, dept, count], roomIndex) => (
                <div className="room" key={name} onClick={() => setInspector({ title: name, body: `${count} agents assigned. Department type: ${dept}. Room status is active and reporting to the event stream.` })}>
                  <div className="room-label">{name}</div>
                  <div className="desk-grid">
                    {Array.from({ length: count as number }).map((_, agentIndex) => {
                      let status = lifecycle[(roomIndex + agentIndex) % lifecycle.length];
                      if (selectedCompany.status.includes('Critical') && roomIndex === 0 && agentIndex === 0) status = 'alerting';
                      return <AgentDesk key={agentIndex} dept={dept as DepartmentKind} status={status} onClick={(e) => { e.stopPropagation(); setInspector({ title: `${name} Agent ${agentIndex + 1}`, body: `${statusText[status]} in ${name}. Current task: ${status === 'alerting' ? 'Investigating incident and preparing escalation.' : status === 'waiting' ? 'Waiting for owner approval before continuing.' : status === 'blocked' ? 'Blocked by dependency or policy gate.' : 'Executing assigned work package.'}` }); }} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
            <aside className="card inspector">
              <h3>Inspector</h3>
              <h4>{inspector.title}</h4>
              <p className="muted">{inspector.body}</p>
              <div className="actions"><button className="btn btn-primary">Open</button><button className="btn">Assign Task</button><button className="btn">View Logs</button><button className="btn btn-danger">Pause</button></div>
            </aside>
          </div>
        </section>
      )}

      <section className="grid two" style={{ marginTop: 14 }}>
        <div className="card">
          <div className="card-title">Project Ops: Build Status</div>
          <div className="list" style={{ marginTop: 12 }}>
            <div>✅ GitHub repo initialized: <b>sdmactech/AICC</b></div>
            <div>✅ GitHub Issues active for workstreams</div>
            <div>✅ Slack <b>new-channel</b> updated</div>
            <div>⚠️ Jira read access verified; <code>jira_create_issue</code> times out on all create tests</div>
            <div>✅ Next.js scaffold in progress</div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Approval Inbox</div>
          <div className="list" style={{ marginTop: 12 }}>{approvals.slice(0, 5).map((approval, i) => <div key={approval}>⚠️ {approval} <span className={i < 3 ? 'negative' : 'warning'}>Approval Required</span></div>)}</div>
        </div>
      </section>
    </main>
  );
}

function AgentDesk({ dept, status, onClick }: { dept: DepartmentKind; status: AgentStatus; onClick: React.MouseEventHandler<HTMLDivElement> }) {
  return <div className="desk" onClick={onClick}><div className="desk-top"/><div className={`agent ${deptClass(dept)} ${status}`} title={statusText[status]}><span className="face"/></div></div>;
}
