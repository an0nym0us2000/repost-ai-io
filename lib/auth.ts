/**
 * NextAuth Configuration
 */

import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { nanoid } from 'nanoid';
import prisma from './prisma';
import { Adapter } from 'next-auth/adapters';
import logger from './logger';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Log sign in - don't block auth if logging fails
      try {
        if (!user?.id) {
          logger.warn('Sign in event missing user ID');
          return;
        }

        await prisma.auditLog.create({
          data: {
            id: nanoid(),
            userId: user.id,
            action: 'SIGN_IN',
            resource: 'AUTH',
            metadata: {
              provider: account?.provider || 'unknown',
              isNewUser: isNewUser || false,
            },
          },
        });
      } catch (error) {
        logger.error('Failed to create sign-in audit log', error as Error, {
          userId: user?.id,
          provider: account?.provider,
        });
      }
    },
    async signOut({ token }) {
      // Log sign out - don't block auth if logging fails
      try {
        if (!token?.id) {
          logger.warn('Sign out event missing token ID');
          return;
        }

        await prisma.auditLog.create({
          data: {
            id: nanoid(),
            userId: token.id as string,
            action: 'SIGN_OUT',
            resource: 'AUTH',
          },
        });
      } catch (error) {
        logger.error('Failed to create sign-out audit log', error as Error, {
          userId: token?.id,
        });
      }
    },
  },
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
