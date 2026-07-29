import Link from 'next/link';
import Image from 'next/image';
import type { DisciplineInfo } from '@/types';

interface DisciplineLinkProps {
  discipline: DisciplineInfo;
  /** Visual size variant — alternate between large and small for rhythm. */
  size?: 'large' | 'small';
}

/** Editorial discipline introduction card with image and link. */
export default function DisciplineLink({
  discipline,
  size = 'large',
}: DisciplineLinkProps) {
  return (
    <Link
      href={discipline.slug}
      className={`group relative block overflow-hidden bg-bg-light border border-border-subtle shadow-sm hover:shadow-md transition-shadow duration-500 rounded-sm ${
        size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'
      }`}
    >
      {/* Background Image */}
      {discipline.image && (
        <Image
          src={discipline.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-bg-secondary/40 to-bg-secondary/0 group-hover:from-bg-secondary/95 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <h3 className="font-serif text-xl sm:text-2xl text-text-primary group-hover:text-accent transition-colors duration-300 mb-2">
          {discipline.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {discipline.description}
        </p>
        <span className="mt-3 text-xs uppercase tracking-widest text-accent/70 group-hover:text-accent transition-colors duration-300">
          Explore →
        </span>
      </div>
    </Link>
  );
}
