import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { assets } from '@/lib/schema';
import { getSession } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

// GET /api/assets/[id] - Get a single asset
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const assetId = Number(params.id);
  const [asset] = await db
    .select()
    .from(assets)
    .where(and(eq(assets.id, assetId), eq(assets.userId, Number(session.user.id))));
  if (!asset) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(asset);
}

// PUT /api/assets/[id] - Update an asset
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const assetId = Number(params.id);
  const [existing] = await db
    .select()
    .from(assets)
    .where(and(eq(assets.id, assetId), eq(assets.userId, Number(session.user.id))));
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const data = await req.json();
    // TODO: Add Zod validation here
    const updateData = {
      name: data.name ?? existing.name,
      type: data.type ?? existing.type,
      amount: data.amount ?? existing.amount,
      avg_pricing: data.avg_pricing ?? existing.avg_pricing,
      current_pricing: data.current_pricing ?? existing.current_pricing,
      unit: data.unit ?? existing.unit,
      updatedAt: new Date(),
    };
    const [updated] = await db
      .update(assets)
      .set(updateData)
      .where(and(eq(assets.id, assetId), eq(assets.userId, Number(session.user.id))))
      .returning();
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/assets/[id] - Delete an asset
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const assetId = Number(params.id);
  const [existing] = await db
    .select()
    .from(assets)
    .where(and(eq(assets.id, assetId), eq(assets.userId, Number(session.user.id))));
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await db
    .delete(assets)
    .where(and(eq(assets.id, assetId), eq(assets.userId, Number(session.user.id))));
  return NextResponse.json({ success: true });
}
