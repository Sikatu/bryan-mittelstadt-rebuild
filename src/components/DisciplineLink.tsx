import Link from 'next/link';
import EditorialImage from './EditorialImage';
import type { DisciplineInfo } from '@/types';

interface DisciplineLinkProps {
  discipline: DisciplineInfo;
}

/** Quiet cinematic discipline tile used on the homepage. */
export default function DisciplineLink({
  discipline,
}: DisciplineLinkProps) {
  return (
    <Link
      href={discipline.slug}
      className="group relative block aspect-[5/4] overflow-hidden border border-black/10 bg-contrast-dark shadow-[0_16px_44px_rgba(40,31,24,0.08)]"
    >
      {discipline.image && (
        <EditorialImage
          asset={discipline.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          decorative
          imageClassName="brightness-[0.74] contrast-[1.04] saturate-[0.9] transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-[1.035] group-hover:brightness-[0.64]"
          fallbackLabel="Discipline photography pending"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.90)_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-serif text-[1.7rem] leading-[0.98] tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#f1c2a5]">
            {discipline.title}
          </h3>

          <span
            aria-hidden="true"
            className="text-lg text-white/58 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
          >
            →
          </span>
        </div>

        <p className="line-clamp-2 max-w-[26rem] text-[0.78rem] leading-5 text-white/68">
          {discipline.description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-0 bg-[#d39d78] transition-all duration-500 group-hover:w-full"
      />
    </Link>
  );
}
