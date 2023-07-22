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