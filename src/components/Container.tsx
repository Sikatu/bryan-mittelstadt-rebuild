import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Use a narrower max-width for text-heavy content. */
  narrow?: boolean;
  as?: 'div' | 'section' | 'article';
}

/** Responsive centered container with consistent horizontal padding. */
export default function Container({
  children,
  className = '',
  narrow = false,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${
        narrow ? 'max-w-3xl' : 'max-w-7xl'
      } ${className}`}
    >
      {children}
    </Component>
  );
}
