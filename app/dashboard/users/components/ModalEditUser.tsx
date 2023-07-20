import CustomInput from '@/components/custom/Input';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog';
import {
  LetterCaseCapitalizeIcon,
  EnvelopeClosedIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { PlusIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export default function ModalEditUser() {
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
      name: '',
      email: '',
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" /> Tambah Penghuni
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Penghuni Baru</DialogTitle>
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
        </div>
        <DialogFooter>
          {isLoading ? (
            <Button type="submit" disabled>
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                console.log('');
              }}
            >
              <CheckIcon className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
