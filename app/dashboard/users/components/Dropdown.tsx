'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

interface DropdownProps {
  id: string;
  roomId?: string;
}

export default function Dropdown({ id, roomId }: DropdownProps) {
  function handleDelete(id: string) {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success('User deleted');
          mutate('/api/users');
        } else {
          const { error } = await res.json();
          throw new Error(error);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            console.log(`user ${id}`);
          }}
        >
          <Pencil2Icon className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (roomId) {
              return toast.error('User have room');
            }
            handleDelete(id);
          }}
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
