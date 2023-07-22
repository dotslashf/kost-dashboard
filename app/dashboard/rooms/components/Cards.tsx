'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { CalendarIcon, FrameIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import AlertPulse from '@/components/custom/AlertPulse';
import { Room } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/app/libs/fetcher';
import Link from 'next/link';

interface RoomWithRent extends Room {
  rentBy: string;
  startRentedAt: Date;
  endRentedAt: Date;
}

export default function Cards() {
  const { data, error } = useSWR<{ rooms: RoomWithRent[] }>(
    '/api/rooms',
    fetcher,
    {}
  );
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">
      {data.rooms.map((room) => (
        <Link href={`/dashboard/rooms/${room.id}`} key={room.id}>
          <Card
            key={room.id}
            className={cn(
              `hover:bg-accent/50 transition hover:shadow-lg relative`
            )}
          >
            {!room.rentBy && <AlertPulse />}
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="font-medium ">Kamar {room.name}</CardTitle>
              <FrameIcon className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {room.rentBy ? room.rentBy : 'Kosong'}
              </div>
              <CardDescription>{room.details}</CardDescription>
              <Badge className="mt-2 " variant={'default'}>
                {formatCurrency(room.price || 0)} / Bulan
              </Badge>
            </CardContent>
            {room.rentBy && (
              <CardFooter className="grid grid-cols-1 gap-2">
                <Badge
                  variant={'confirm'}
                  className={cn(
                    'text-left font-normal text-sm w-full justify-center'
                  )}
                >
                  <span className="font-semibold">Masuk</span>
                  <CalendarIcon className="w-4 h-4 mx-2" />
                  {formatDate(room.startRentedAt)}
                </Badge>
                <Badge
                  variant={'destructive'}
                  className={cn(
                    'text-left font-normal text-sm w-full justify-center'
                  )}
                >
                  <span className="font-semibold">Keluar</span>
                  <CalendarIcon className="w-4 h-4 mx-2" />
                  {formatDate(room.endRentedAt)}
                </Badge>
              </CardFooter>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
