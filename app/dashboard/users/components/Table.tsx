'use client';

import fetcher from '@/app/libs/fetcher';
import DataTable, { UserWithRoom, columns } from './DataTable';
import useSWR from 'swr';

export default function Table() {
  const { data, error } = useSWR<{ users: UserWithRoom[] }>(
    '/api/users',
    fetcher,
    {}
  );
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return <DataTable columns={columns} data={data.users} />;
}
