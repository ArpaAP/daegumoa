import { eventHolderPostSchema } from './schema';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const body = await request.json();

  const { data, error } = eventHolderPostSchema.safeParse(body);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const { eventId } = data;

  const eventHolder = await prisma.eventHolder.create({
    data: {
      userId: user.id,
      eventId,
    },
  });

  return NextResponse.json({
    message: 'OK',
    data: {
      eventHolder,
    },
  });
}
