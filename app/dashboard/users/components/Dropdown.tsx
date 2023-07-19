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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckIcon, Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons';
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
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            console.log(`user ${id}`);
          }}
        >
          <Pencil2Icon className="w-4 h-4 mr-2" />
          Ubah
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertConfirmation
            onConfirm={() => {
              if (roomId) {
                return toast.error('User have room');
              }
              handleDelete(id);
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface AlertConfirmationProps {
  onConfirm: () => void;
}

export function AlertConfirmation({ onConfirm }: AlertConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="ghost"> */}
        <span className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-destructive hover:text-destructive-foreground">
          <TrashIcon className="w-4 h-4 mr-2" />
          Hapus
        </span>
        {/* </Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Yakin Menghapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat diulang. Anda yakin ingin melanjutkan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Cross2Icon className="w-4 h-4 mr-2" />
            Tidak
          </AlertDialogCancel>
          <Button variant={'destructive'} asChild>
            <AlertDialogAction onClick={onConfirm}>
              <CheckIcon className="w-4 h-4 mr-2" />
              Lanjut
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
