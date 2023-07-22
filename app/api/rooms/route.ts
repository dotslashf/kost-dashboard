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

export async function GET(req: any) {
    const token = await getToken({ req })
    if (token?.role !== 'ADMIN') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const now = new Date(new Date().setHours(new Date().getHours() + 8));
    let rooms = await prisma.room.findMany({
        select: {
            id: true,
            name: true,
            details: true,
            price: true,
            user: {
                select: {
                    name: true,
                }
            },
            RoomRentLogs: {
                where: {
                    startRentedAt: {
                        lte: now
                    },
                    endRentedAt: {
                        gte: now
                    }
                },
                select: {
                    startRentedAt: true,
                    endRentedAt: true,
                }
            }
        }
    });

    const data = rooms.map((room) => ({
        id: room.id,
        name: room.name,
        price: room.price,
        rentBy: room.user ? room.user.name : null,
        details: room.details,
        startRentedAt: room.RoomRentLogs.length > 0 ? room.RoomRentLogs[0].startRentedAt : '-',
        endRentedAt: room.RoomRentLogs.length > 0 ? room.RoomRentLogs[0].endRentedAt : '-',
    })).sort((a, b) => a.rentBy ? 1 : -1)

    return NextResponse.json({
        rooms: data,
    })
}