'use client';

import Input from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

const ModalAddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(data);
  };

  return (
    <Modal
      id="modal-new-user"
      title="Add New User"
      onSubmitted={handleSubmit(onSubmit)}
    >
      <form className="space-y-4">
        <Input
          label="Name"
          id="name"
          errors={errors}
          type="text"
          disabled={isLoading}
          register={register}
          icon={<UserCircleIcon />}
        />
        <Input
          label="Email"
          id="email"
          errors={errors}
          type="email"
          disabled={isLoading}
          register={register}
          icon={<AtSymbolIcon />}
        />
        <Input
          label="Password"
          id="password"
          errors={errors}
          type="password"
          disabled={isLoading}
          register={register}
          icon={<LockClosedIcon />}
        />
      </form>
    </Modal>
  );
};

function UserCircleIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function AtSymbolIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </svg>
  );
}

function LockClosedIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

export default ModalAddUser;
