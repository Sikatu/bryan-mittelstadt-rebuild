import Link from 'next/link';
import EditorialImage from './EditorialImage';
import type { DisciplineInfo } from '@/types';

interface DisciplineLinkProps {
  discipline: DisciplineInfo;
  size?: 'large' | 'small';
}

/** Editorial discipline introduction card with approved imagery or honest art direction. */
export default function DisciplineLink({ discipline, size = 'large' }: DisciplineLinkProps) {
  return (
    <Link
      href={discipline.slug}
      className={`group relative block overflow-hidden rounded-sm border border-border-subtle bg-bg-light shadow-sm transition-shadow duration-500 hover:shadow-md ${
        size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'
      }`}
    >
      {discipline.image && (
        <EditorialImage
          asset={discipline.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          decorative
          imageClassName="transition-transform duration-700 group-hover:scale-105"
          fallbackLabel="Discipline photography pending"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/95 via-bg-secondary/45 to-transparent transition-all duration-500 group-hover:from-bg-secondary" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <h3 className="mb-2 font-serif text-xl text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl">
          {discipline.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {discipline.description}
        </p>
        <span className="mt-3 text-xs uppercase tracking-widest text-accent/70 transition-colors duration-300 group-hover:text-accent">
          Explore →
        </span>
      </div>
    </Link>
  );
}
