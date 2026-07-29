import Link from 'next/link';
import { type ReactNode } from 'react';

interface EditorialButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  download?: boolean | string;
  title?: string;
}

const baseStyles =
  'inline-flex items-center justify-center font-sans text-sm font-medium tracking-wide uppercase transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variantStyles = {
  primary:
    'bg-contrast-dark text-contrast-light px-7 py-3.5 hover:bg-accent hover:text-contrast-light active:bg-accent-hover border border-transparent',
  secondary:
    'bg-bg-secondary border border-border-subtle text-text-primary px-7 py-3.5 hover:border-accent hover:text-accent active:border-accent',
  text: 'text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/40 hover:decoration-accent px-0 py-1',
};

const disabledStyles =
  'cursor-not-allowed opacity-50 hover:border-border-subtle hover:bg-inherit hover:text-inherit';

/** Editorial-styled button or link with an explicit noninteractive state. */
export default function EditorialButton({
  children,
  href,
  onClick,
  variant = 'primary',
  external = false,
  className = '',
  type = 'button',
  disabled = false,
  download,
  title,
}: EditorialButtonProps) {
  const combinedClass = `${baseStyles} ${variantStyles[variant]} ${
    disabled ? disabledStyles : ''
  } ${className}`;

  if (disabled || !href) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={combinedClass}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        title={title}
      >
        {children}
      </button>
    );
  }

  if (external || download) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        className={combinedClass}
        title={title}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClass} title={title}>
      {children}
    </Link>
  );
}
