import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-5 py-2.5 text-base font-medium',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-3.5 py-2 text-sm font-medium',
    lg: 'px-4.5 py-2.5 text-base font-medium',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 shadow-2xs hover:bg-neutral-50 hover:text-neutral-900 active:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 text-neutral-500">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};

export const GhostButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none disabled:opacity-40 cursor-pointer ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }> = ({
  children,
  className = '',
  label,
  ...props
}) => {
  return (
    <button
      title={label}
      aria-label={label}
      className={`p-2 rounded-lg text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
