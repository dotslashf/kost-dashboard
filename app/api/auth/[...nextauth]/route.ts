import { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prisma';
import NextAuth from 'next-auth/next';

const adapter = PrismaAdapter(prisma);

export const authOptions: AuthOptions = {
    adapter,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email..." },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('credentials', credentials)
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                console.log('user', user)

                if (!user) throw new Error('Invalid Credentials')
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) throw new Error('Invalid Credentials')

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }