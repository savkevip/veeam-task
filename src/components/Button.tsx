import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}: Props) => {
  const baseClasses =
    'px-4 py-2 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400';

  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(baseClasses, variantClasses, className)}
    >
      {children}
    </button>
  );
};
