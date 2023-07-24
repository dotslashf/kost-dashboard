'use client';

import {
  DisabledInput,
  DisabledTextAreaWithLabel,
} from '@/components/custom/Input';
import { Separator } from '@/components/ui/separator';
import { cn, formatCurrency } from '@/lib/utils';
import { Room } from '@prisma/client';
import { CardStackIcon, FrameIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import fetcher from '@/app/libs/fetcher';
import Form from './Form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CardLoading from '../../components/CardsLoading';

export interface RoomWithRentLogs extends Room {
  user: {
    name: string | null;
    email: string;
    phone: string | null;
  } | null;
  RoomRentLogs: {
    id: string;
    startRentedAt: Date;
    endRentedAt: Date;
  }[];
}

interface FormProps {
  onSubmit?: (data: any) => void;
  id: string;
}

export default function Content(props: FormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, error } = useSWR<{ room: RoomWithRentLogs }>(
    `/api/rooms/${props.id}`,
    fetcher,
    {}
  );

  if (!data)
    return (
      <div className="max-w-sm">
        <CardLoading />
      </div>
    );
  if (error) return <div>Error...</div>;
  return (
    <Card className={cn('lg:max-w-sm')}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Kamar {data.room.name}</h3>
          <Button variant={'outline'} onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-4">
          {isEditing ? (
            <Form
              data={{
                name: data.room.name,
                details: data.room.details,
                price: data.room.price,
                id: data.room.id,
                setIsEditing: setIsEditing,
              }}
            />
          ) : (
            <div className="grid gap-4 pt-4">
              <DisabledInput
                id="name"
                label="Nomor Kamar"
                value={data.room.name}
                icon={<FrameIcon />}
              />
              <DisabledInput
                id="price"
                label="harga/bulan"
                value={formatCurrency(data.room.price || 0)}
                icon={<CardStackIcon />}
              />
              <DisabledTextAreaWithLabel
                value={data.room.details || ''}
                label="Detail Kamar"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
