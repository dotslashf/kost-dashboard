import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prisma';
import { formatPhone } from '@/lib/utils';

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

    if (!user) return new Response(JSON.stringify({ error: 'Penghuni tidak ditemukan' }), { status: 404 });
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

export async function PUT(req: any, { params }: { params: { id: string } }) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    try {
        const body = await req.json();
        const phone = formatPhone(body.phone);
        await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                ...body,
                phone,
            }
        });

        return NextResponse.json({
            message: 'Data berhasil diubah',
        })
    } catch {
        return new Response(JSON.stringify({ error: 'Penghuni tidak ditemukan' }), { status: 404 });
    }
}