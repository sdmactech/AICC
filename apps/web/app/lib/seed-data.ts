export type AgentStatus = 'working' | 'thinking' | 'waiting' | 'alerting' | 'blocked' | 'debating' | 'idle';
export type DepartmentKind = 'exec' | 'finance' | 'ops' | 'engineering' | 'monitoring' | 'council' | 'legal' | 'risk' | 'research';

export const statusText: Record<AgentStatus, string> = {
  working: 'Working',
  thinking: 'Thinking',
  waiting: 'Waiting Approval',
  alerting: 'Incident',
  blocked: 'Blocked',
  debating: 'Debating',
  idle: 'Idle'
};

export const companies = [
  {
    id: 'holding-hq',
    name: 'Holding Company HQ',
    icon: '🏛️',
    status: 'Operational',
    badge: 'success',
    agents: 18,
    description: 'Executive command, governance, finance, strategy, legal, and approval routing.',
    rooms: [
      ['Executive Office', 'exec', 3],
      ['Finance', 'finance', 2],
      ['Legal / Risk', 'legal', 3],
      ['War Council Chamber', 'council', 6],
      ['Approval Queue', 'ops', 4],
      ['Strategy Room', 'research', 3]
    ]
  },
  {
    id: 'network-guardian',
    name: 'Network Guardian Co',
    icon: '📡',
    status: '1 Critical Alert',
    badge: 'danger',
    agents: 16,
    description: 'Client network monitoring for Eero Insight, OVRC, and Microsoft 365 outages.',
    rooms: [
      ['NOC / Monitoring', 'monitoring', 5],
      ['Incident Response', 'ops', 4],
      ['Microsoft 365 Security', 'engineering', 3],
      ['Client Communications', 'ops', 2],
      ['Engineering', 'engineering', 3],
      ['Approval Queue', 'legal', 2]
    ]
  },
  {
    id: 'opportunity-lab',
    name: 'AI Opportunity Lab',
    icon: '💡',
    status: 'Researching',
    badge: 'info',
    agents: 14,
    description: 'Finds, debates, validates, and scores AI-driven business opportunities.',
    rooms: [
      ['Market Research', 'research', 4],
      ['Financial Modeling', 'finance', 3],
      ['Competition Analysis', 'research', 3],
      ['Opportunity Council', 'council', 8],
      ['Risk Review', 'risk', 2],
      ['Idea Pipeline', 'ops', 4]
    ]
  },
  {
    id: 'venture-builder',
    name: 'Venture Builder Studio',
    icon: '🏗️',
    status: 'Building',
    badge: 'success',
    agents: 10,
    description: 'Turns approved opportunities into real products, services, and companies.',
    rooms: [
      ['Product', 'exec', 2],
      ['Engineering', 'engineering', 5],
      ['Growth', 'ops', 3],
      ['QA Lab', 'engineering', 2],
      ['Launch Room', 'research', 3],
      ['Finance', 'finance', 2]
    ]
  },
  {
    id: 'personal-life',
    name: 'Personal Life Automation',
    icon: '🏡',
    status: 'Operational',
    badge: 'success',
    agents: 6,
    description: 'Family support, scheduling, home automation, reminders, and personal productivity.',
    rooms: [
      ['Family Ops', 'ops', 3],
      ['Scheduling', 'ops', 2],
      ['Home Automation', 'engineering', 2],
      ['Research Desk', 'research', 1],
      ['Finance Helper', 'finance', 1],
      ['Personal Chief of Staff', 'exec', 1]
    ]
  }
] as const;

export const approvals = [
  'Spend $299/mo on accounting automation',
  'Send client maintenance email',
  'Apply Microsoft 365 security setting',
  'Buy secure-ai-guardian.com domain',
  'Deploy monitoring connector to production',
  'Access sensitive client logs',
  'Change client network configuration'
];

export const lifecycle: AgentStatus[] = ['working', 'thinking', 'waiting', 'alerting', 'blocked', 'debating', 'idle'];
