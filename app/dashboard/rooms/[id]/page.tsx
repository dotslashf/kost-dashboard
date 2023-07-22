import prisma from '@/app/libs/prisma';

async function getRoomById(id: string) {
  const room = await prisma.room.findFirstOrThrow({
    where: {
      id,
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

  return room;
}

interface RoomByIdProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: RoomByIdProps) => {
  const { name } = await getRoomById(params.id);
  return {
    title: `Kamar ${name}`,
  };
};

export default async function RoomById({ params }: RoomByIdProps) {
  const room = await getRoomById(params.id);
  return <div>RoomById {JSON.stringify(room, null, 2)}</div>;
}
