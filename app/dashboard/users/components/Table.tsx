'use client';

import fetcher from '@/app/libs/fetcher';
import DataTable, { UserWithRoom, columns } from './DataTable';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

export default function Table() {
  const { data, error } = useSWR<{ users: UserWithRoom[] }>(
    '/api/users',
    fetcher,
    {}
  );
  if (!data)
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 max-w-sm" />
        <Skeleton className="w-full h-36" />
      </div>
    );
  if (error) return <div>Error...</div>;
  return <DataTable columns={columns} data={data.users} />;
}
