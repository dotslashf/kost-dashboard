'use client';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        py-2
        px-3
        rounded-md
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        transition
      `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-slate-800' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:ring-rose-500',
        !secondary &&
          !danger &&
          'bg-sky-300 hover:bg-sky-500 focus-visible:ring-sky-500'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
