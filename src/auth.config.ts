import type { NextAuthConfig } from 'next-auth';

import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';

export default {
  providers: [Google, Kakao],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/',
  },
} satisfies NextAuthConfig;
