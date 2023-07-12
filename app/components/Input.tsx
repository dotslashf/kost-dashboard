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
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  errors,
  disabled,
  register,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 ">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            shadow-sm
            ring-1
            ring-inset
            ring-slate-300
            placeholder:text-slate-400
            focus:ring-2
            focus:ring-inset
            focus:ring-orange-300
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default bg-slate-200'
          )}
        />
      </div>
    </div>
  );
};

export default Input;
