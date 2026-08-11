import Link from 'next/link';
import EditorialImage from './EditorialImage';
import type { DisciplineInfo } from '@/types';

interface DisciplineLinkProps {
  discipline: DisciplineInfo;
}

/** Consistent editorial discipline card with accessible image contrast. */
export default function DisciplineLink({
  discipline,
}: DisciplineLinkProps) {
  return (
    <Link
      href={discipline.slug}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-border-subtle bg-contrast-dark shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
    >
      {discipline.image && (
        <EditorialImage
          asset={discipline.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          decorative
          imageClassName="brightness-[0.78] contrast-[1.04] saturate-[0.92] transition-all duration-700 ease-out group-hover:scale-[1.035] group-hover:brightness-[0.70]"
          fallbackLabel="Discipline photography pending"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/42 to-black/10 transition-colors duration-500 group-hover:from-black/94"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-sm border border-white/15 bg-black/45 p-4 shadow-lg backdrop-blur-[3px] sm:p-5">
          <h3 className="font-serif text-[1.35rem] leading-[1.08] text-white text-shadow-sm transition-colors duration-300 group-hover:text-[#F6D3C0] sm:text-2xl">
            {discipline.title}
          </h3>

          <p className="mt-3 line-clamp-4 text-sm leading-[1.55] text-white/90">
            {discipline.description}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3BE9D] transition-colors duration-300 group-hover:text-white">
            Explore
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}