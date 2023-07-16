'use client';

import clsx from 'clsx';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  errors,
  disabled,
  register,
  icon,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 ">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            py-3 px-4 pl-11 block w-full rounded-md text-sm focus:z-10 focus:border-sky-500 focus:ring-sky-500 border form-input
          `,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default bg-slate-200'
          )}
        />
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 pointer-events-none">
          {icon ? (
            icon
          ) : (
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
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
