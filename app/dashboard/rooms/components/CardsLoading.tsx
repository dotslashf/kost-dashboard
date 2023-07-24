import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CardLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="w-5 h-5" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-16 h-4 mt-2" />
      </CardContent>
    </Card>
  );
}
