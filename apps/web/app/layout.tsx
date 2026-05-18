import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Empire Command Center',
  description: 'AI Workforce Command Center for managing companies, agents, approvals, councils, and incidents.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
