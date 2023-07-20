'use client';

import { Button } from '@/components/ui/button';
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
import { TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

interface AlertDialogProps {
  id: string;
}

export default function AlertDialogConfirmation({ id }: AlertDialogProps) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon className="w-4 h-4" />
        </Button>
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
            <AlertDialogAction onClick={() => handleDelete(id)}>
              <CheckIcon className="w-4 h-4 mr-2" />
              Lanjut
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
