import type { NextAuthConfig } from 'next-auth';

import Google from 'next-auth/providers/google';

export default {
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/',
  },
} satisfies NextAuthConfig;
