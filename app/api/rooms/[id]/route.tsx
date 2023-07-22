import { getToken } from 'next-auth/jwt';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: any, { params }: { params: { id: string } }) {
  const token = await getToken({ req });
  if (token?.role !== 'ADMIN')
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });

  const room = await prisma.room.findFirstOrThrow({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      RoomRentLogs: {
        select: {
          id: true,
          startRentedAt: true,
          endRentedAt: true,
        },
      },
    },
  });

  return NextResponse.json({
    room,
  });
}

export async function PUT(req: any, { params }: { params: { id: string } }) {
  const token = await getToken({ req });
  if (token?.role !== 'ADMIN')
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });

  const room = await prisma.room.findFirst({ where: { id: params.id } });
  if (!room) return NextResponse.json({ error: 'Kamar tidak ditemukan' });

  const body = (await req.json()) as {
    name: string;
    price: number;
    details: string;
  };

  await prisma.room.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      price: body.price,
      details: body.details,
    },
  });

  return NextResponse.json({
    message: 'Kamar berhasil diupdate',
  });
}
