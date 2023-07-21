'use client';

import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/custom/Input';
import {
  EnterIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AuthFrom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [router, session?.status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        } else {
          router.push('/dashboard');
        }
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white rounded-md shadow sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            id="email"
            errors={errors}
            type="email"
            disabled={isLoading}
            register={register}
            icon={<EnvelopeClosedIcon className="w-4 h-4" />}
          />
          <CustomInput
            label="Password"
            id="password"
            errors={errors}
            type="password"
            disabled={isLoading}
            register={register}
            icon={<LockClosedIcon className="w-4 h-4" />}
          />
          <div>
            {isLoading ? (
              <Button type="submit" disabled className="w-full">
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                <EnterIcon className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthFrom;
