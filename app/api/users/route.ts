import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prisma';

export async function POST(req: any) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    const body = await req.json()
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (user) return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });

    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            role: 'USER',
            password: bcrypt.hashSync('password', 10)
        }
    });

    return NextResponse.json({
        message: 'User created successfully',
        data: newUser
    })
}