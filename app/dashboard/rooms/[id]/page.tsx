import prisma from '@/app/libs/prisma';
import MainLayout from '@/components/custom/Layouts/Main';
import Content, { RoomWithRentLogs } from './components/Content';

async function getRoomById(id: string) {
  const room = await prisma.room.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
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
  return (
    <MainLayout>
      <Content id={room.id} />
    </MainLayout>
  );
}
