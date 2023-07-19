import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';

export async function DELETE(req: NextApiRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        },
        select: {
            room: true
        }
    });

    if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    if (user.room) return new Response(JSON.stringify({ error: 'User have room' }), { status: 400 });

    await prisma.user.delete({
        where: {
            id: params.id
        }
    });

    return NextResponse.json({
        message: 'User deleted successfully',
    })
}