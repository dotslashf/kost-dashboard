'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClockIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Dropdown from './Dropdown';
import { Room, User } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CustomInput from '@/components/custom/Input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface UserWithRoom extends User {
  room: Room;
}

export const columns: ColumnDef<UserWithRoom>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => {
      return (
        <div className="flex w-[180px] space-x-2">
          <span className="capitalize">{row.original.name} </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'No. HP',
    cell: ({ row }) => {
      return row.original.phone ? (
        <div>
          <Badge variant={'outline'}>+62{row.original.phone}</Badge>
        </div>
      ) : (
        <div>
          <Badge variant={'outline'}>-</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Daftar',
    cell: ({ row }) => {
      return (
        <span className="flex w-[180px] items-center">
          <ClockIcon className="w-4 h-4 mr-2" />{' '}
          {formatDate(row.original.createdAt)}
        </span>
      );
    },
  },
  {
    accessorKey: 'room',
    header: 'Kamar',
    cell: ({ row }) => {
      const room = row.original.room;
      return (
        <span className="flex w-[100px]">
          <Badge variant="default" className="cursor-pointer">
            {room?.name ? room.name : 'Empty'}
          </Badge>
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-center">
          <Dropdown id={user.id} roomId={user.room?.id} />
        </div>
      );
    },
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="relative mb-4">
        <Input
          placeholder="Cari nama..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-11"
        />
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
