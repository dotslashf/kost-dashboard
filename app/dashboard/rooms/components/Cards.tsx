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

const data = [
  {
    id: 1,
    name: 'Kamar 1',
    price: 1000000,
    rentBy: '',
    details: '5x4 meter',
    startRent: new Date(),
    endRent: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  {
    id: 2,
    name: 'Kamar 2',
    price: 1000000,
    rentBy: 'Abdul',
    details: '5x4 meter',
    startRent: new Date(),
    endRent: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
  },
];

export default function Cards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">
      {data.map((room) => (
        <Card
          key={room.id}
          className={cn(
            `hover:bg-accent/50 transition hover:shadow-lg relative`
          )}
        >
          {!room.rentBy && <AlertPulse />}
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="font-medium ">{room.name}</CardTitle>
            <FrameIcon className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {room.rentBy ? room.rentBy : '-'}
            </div>
            <CardDescription>{room.details}</CardDescription>
            <Badge className="mt-2 " variant={'default'}>
              {formatCurrency(room.price)}
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
                {formatDate(room.startRent)}
              </Badge>
              <Badge
                variant={'destructive'}
                className={cn(
                  'text-left font-normal text-sm w-full justify-center'
                )}
              >
                <span className="font-semibold">Keluar</span>
                <CalendarIcon className="w-4 h-4 mx-2" />
                {formatDate(room.endRent)}
              </Badge>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
