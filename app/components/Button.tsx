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
  dataHsOverlay?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
  dataHsOverlay,
  isLoading,
}) => {
  disabled = disabled || isLoading;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        justify-center
        py-3
        px-3
        rounded-md
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        transition
      `,
        disabled && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        secondary
          ? 'text-slate-800 bg-slate-100 hover:bg-slate-200'
          : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:ring-rose-500',
        !secondary &&
          !danger &&
          'bg-sky-300 hover:bg-sky-500 focus-visible:ring-sky-500'
      )}
      data-hs-overlay={dataHsOverlay}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
