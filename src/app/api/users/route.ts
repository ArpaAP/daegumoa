import { userPostSchema } from './schema';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const body = await request.json();

  const parse = userPostSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  user = await prisma.user.create({
    data: {
      email: session.user.email!,
      name: data.name,
      nickname: data.nickname,
      profileImg: session.user.image,
    },
  });

  return NextResponse.json(user);
}
