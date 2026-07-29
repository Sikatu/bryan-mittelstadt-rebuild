interface ContentPendingProps {
  eyebrow?: string;
  title: string;
  description: string;
  items?: string[];
  className?: string;
}

/**
 * Honest empty state for content that requires client-supplied media or verified details.
 * It avoids presenting placeholder controls as if they are already functional.
 */
export default function ContentPending({
  eyebrow = 'In Preparation',
  title,
  description,
  items = [],
  className = '',
}: ContentPendingProps) {
  return (
    <section
      className={`border border-border-subtle bg-bg-secondary p-7 sm:p-10 ${className}`}
      aria-labelledby={`pending-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={`pending-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        className="mt-3 font-serif text-2xl text-text-primary"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">
        {description}
      </p>
      {items.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Items still required">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-border-subtle pt-3 text-sm text-text-secondary"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
