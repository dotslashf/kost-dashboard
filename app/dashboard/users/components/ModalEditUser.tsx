'use client';

import CustomInput from '@/components/custom/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  CheckIcon,
  EnvelopeClosedIcon,
  LetterCaseCapitalizeIcon,
  MobileIcon,
  Pencil1Icon,
  PlusIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { UserWithRoom } from './DataTable';

interface ModalEditUserProps {
  user: UserWithRoom;
}

export default function ModalEditUser(props: ModalEditUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: props.user.name,
      email: props.user.email,
      phone: props.user.phone,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    fetch(`/api/users/${props.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          setIsOpen(false);
          const { message } = await res.json();
          toast.success(message);
          mutate('/api/users');
        } else {
          const { error } = await res.json();
          throw new Error(error);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <Pencil1Icon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Penghuni</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CustomInput
            label="nama"
            type="text"
            id="name"
            register={register}
            required={true}
            errors={errors}
            icon={<LetterCaseCapitalizeIcon />}
          />
          <CustomInput
            label="email"
            type="email"
            id="email"
            register={register}
            required={true}
            errors={errors}
            icon={<EnvelopeClosedIcon />}
          />
          <CustomInput
            label="No. hp"
            type="number"
            id="phone"
            register={register}
            required={true}
            errors={errors}
            icon={<MobileIcon />}
          />
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button type="submit" disabled>
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              Menyimpan...
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              <CheckIcon className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
