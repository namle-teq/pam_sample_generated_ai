import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { assets } from '@/lib/schema';
import { getSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import type { Asset } from '@/lib/types';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userAssets = await db
    .select()
    .from(assets)
    .where(eq(assets.userId, Number(session.user.id)));
  return NextResponse.json(userAssets);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    // TODO: Add Zod validation here
    const now = new Date();
    const insertData = {
      name: data.name,
      type: data.type,
      amount: data.amount,
      avg_pricing: data.avg_pricing,
      current_pricing: data.current_pricing,
      unit: data.unit,
      userId: Number(session.user.id),
      createdAt: now,
      updatedAt: now,
    };
    const [inserted] = await db.insert(assets).values(insertData).returning();
    return NextResponse.json(inserted, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
