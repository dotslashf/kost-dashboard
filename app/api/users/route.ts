import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

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

export async function GET(req: NextApiRequest) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            room: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        where: {
            role: 'USER'
        }
    });

    return NextResponse.json({
        users
    })
}