import { CustomInput, TextAreaWithLabel } from '@/components/custom/Input';
import { formatCurrency } from '@/lib/utils';
import {
  CardStackIcon,
  CheckIcon,
  FrameIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FormProps {
  data: {
    name: string;
    price: number | null;
    details: string | null;
  };
}

export default function Form(props: FormProps) {
  const [formattedPrice, setFormattedPrice] = useState(
    formatCurrency(props.data.price || 0)
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: props.data.name,
      price: props.data.price,
      details: props.data.details,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid gap-4 pt-4">
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
    </div>
  );
}
