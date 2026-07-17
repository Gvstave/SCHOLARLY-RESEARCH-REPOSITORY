import React from 'react';

const variantClasses = {
  primary: 'bg-primary text-white border border-primary hover:opacity-90 disabled:opacity-60',
  secondary: 'bg-white text-primary-text border border-gray-300 hover:bg-gray-100 disabled:opacity-60',
  subtle: 'bg-white text-primary-text border border-border hover:bg-primary hover:text-white hover:border-primary disabled:opacity-60',
  chip: 'bg-white text-gray-500 border border-border hover:border-gray-400 disabled:opacity-60',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-[10px]',
  md: 'px-4 py-2.5 text-xs',
  lg: 'px-6 py-3 text-sm',
};

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) {
  const isNativeButton = Component === 'button';
  const finalType = isNativeButton ? type || 'button' : undefined;

  return (
    <Component
      type={finalType}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer font-bold uppercase tracking-widest',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </Component>
  );
}