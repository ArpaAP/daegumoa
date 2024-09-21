import ProfileViewContent from './page.client';
import { redirect } from 'next/navigation';

export default function ProfileViewPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let { userId } = searchParams || {};

  if (!userId) {
    return redirect('/');
  }

  if (Array.isArray(userId)) {
    userId = userId[0];
  }

  return <ProfileViewContent userId={userId} />;
}
