import HomePage from './page.client';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Home() {
  // server fetching logic example
  // const user = fetchUser();

  const session = await auth();

  if (!session?.user?.email) {
    return redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return redirect('/register');
  }

  return <HomePage />;
}
