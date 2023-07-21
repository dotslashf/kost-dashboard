import { getToken } from 'next-auth/jwt';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    const body = await req.json()

    await prisma.room.create({
        data: {
            name: body.name,
            details: body.details,
            price: Number(body.price),
        }
    });

    return NextResponse.json({
        message: 'Kamar berhasil ditambahkan',
    })
}