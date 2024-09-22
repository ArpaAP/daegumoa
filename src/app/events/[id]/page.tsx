import EventDetailPage from './page.client';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function MissionDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    return notFound();
  }

  return <EventDetailPage event={event} />;
}
