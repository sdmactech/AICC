import { NextResponse } from 'next/server';
import { companies, approvals } from '../../lib/seed-data';

export async function GET() {
  const data = {
    route: 'events',
    companies,
    approvals,
    generatedAt: new Date().toISOString()
  };
  return NextResponse.json(data);
}
