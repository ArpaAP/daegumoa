import { v4 } from 'uuid';

import { uploadSchema } from './schema';
import { auth } from '@/auth';
import { storage } from '@/lib/firebase';
import prisma from '@/lib/prisma';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { missionId: string } }) {
  const { missionId } = params;

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

  const formData = await request.formData();

  const { data, error } = uploadSchema.safeParse(formData);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const { image: imageFile } = data;

  const fileExtension = imageFile.name.split('.').pop();
  const fileName = `${v4()}.${fileExtension}`;
  const fileRef = ref(storage, `images/${fileName}`);

  await uploadBytes(fileRef, imageFile);

  const downloadURL = await getDownloadURL(fileRef);

  const image = await prisma.image.create({
    data: {
      src: downloadURL,
      alt: imageFile.name,
    },
  });

  const missionHolder = await prisma.missionHolder.create({
    data: {
      status: 'WAIT',
      userId: user.id,
      missionId: parseInt(missionId),
      imageId: image.id,
    },
  });

  return NextResponse.json({
    message: 'OK',
    data: {
      image,
      missionHolder,
    },
  });
}
