interface SectionHeadingProps {
  /** Small caps label above the heading. */
  eyebrow?: string;
  /** The main heading text. */
  children: string;
  /** Heading level. */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Use serif (editorial) or sans (functional). */
  serif?: boolean;
  /** Text alignment. */
  align?: 'left' | 'center';
  /** Light text (for dark backgrounds) or dark text (for light backgrounds). */
  theme?: 'dark' | 'light';
  className?: string;
}

/** Reusable section heading with optional eyebrow label. */
export default function SectionHeading({
  eyebrow,
  children,
  as: Tag = 'h2',
  serif = true,
  align = 'left',
  theme = 'dark',
  className = '',
}: SectionHeadingProps) {
  const isLightText = theme === 'light';

  return (
    <div
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={`${
          serif ? 'heading-section' : 'font-sans font-semibold'
        } ${
          Tag === 'h1'
            ? 'text-3xl sm:text-4xl lg:text-5xl'
            : Tag === 'h2'
            ? 'text-2xl sm:text-3xl lg:text-4xl'
            : Tag === 'h3'
              ? 'text-xl sm:text-2xl lg:text-3xl'
              : 'text-lg sm:text-xl'
        } ${isLightText ? 'text-contrast-light' : 'text-text-primary'}`}
      >
        {children}
      </Tag>
    </div>
  );
}
