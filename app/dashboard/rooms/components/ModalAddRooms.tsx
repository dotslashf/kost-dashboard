'use client';

import { CustomInput, TextAreaWithLabel } from '@/components/custom/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import {
  CardStackIcon,
  CheckIcon,
  FrameIcon,
  PlusIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

export default function ModalAddRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState(formatCurrency(0));

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      price: '',
      details: '',
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        price: '',
        details: '',
      });
    }
  }, [formState.isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const { message } = await res.json();
          setIsOpen(false);
          toast.success(message);
          mutate('/api/rooms');
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
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" /> Tambah Kamar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Kamar Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CustomInput
            label="Nomor Kamar"
            type="number"
            id="name"
            register={register}
            required={true}
            errors={errors}
            icon={<FrameIcon />}
          />
          <CustomInput
            label="harga/bulan"
            type="number"
            id="price"
            register={register}
            required={true}
            errors={errors}
            icon={<CardStackIcon />}
            onChange={(e) => {
              setFormattedPrice(formatCurrency(Number(e.target.value)));
            }}
          />
          <Input value={formattedPrice} disabled />
          <TextAreaWithLabel
            label="Detail Kamar"
            register={register}
            id="details"
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
