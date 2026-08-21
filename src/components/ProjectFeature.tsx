import EditorialImage from './EditorialImage';
import type { Project } from '@/types';

interface ProjectFeatureProps {
  project: Project;
  reverse?: boolean;
}

/** Large editorial treatment for featured/current projects. */
export default function ProjectFeature({
  project,
  reverse = false,
}: ProjectFeatureProps) {
  const imageOrder = reverse
    ? 'md:order-2 md:col-span-7'
    : 'md:order-1 md:col-span-7';

  const copyOrder = reverse
    ? 'md:order-1 md:col-span-5'
    : 'md:order-2 md:col-span-5';

  return (
    <article className="grid grid-cols-1 items-center gap-8 border-t border-[#cfc6bb] pt-10 md:grid-cols-12 md:gap-10 lg:gap-16 lg:pt-14">
      <div className={imageOrder}>
        <div className="group relative aspect-[16/11] overflow-hidden border border-[#d5cec5] bg-bg-light shadow-[0_18px_52px_rgba(45,36,28,0.08)]">
          {project.image && (
            <EditorialImage
              asset={project.image}
              sizes="(max-width: 768px) 100vw, 58vw"
              imageClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.025]"
              fallbackLabel={
                project.discipline === 'Music'
                  ? 'Artwork pending approval'
                  : 'Production image pending approval'
              }
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border border-white/10"
          />
        </div>
      </div>

      <div className={copyOrder}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.22em]">
          {project.status && (
            <span className="text-accent">
              {project.status}
            </span>
          )}

          {project.discipline && (
            <>
              {project.status && (
                <span
                  aria-hidden="true"
                  className="h-px w-5 bg-border-subtle"
                />
              )}

              <span className="text-text-muted">
                {project.discipline}
              </span>
            </>
          )}
        </div>

        <h3 className="heading-display mt-5 max-w-xl text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.025em] text-text-primary">
          {project.title}
        </h3>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-border-subtle py-4 text-xs uppercase tracking-[0.12em] text-text-secondary">
          {project.role && <span>{project.role}</span>}
          {project.format && <span>{project.format}</span>}
          {project.year && <span>{project.year}</span>}
          {project.director && (
            <span>Dir. {project.director}</span>
          )}
        </div>

        {project.description && (
          <p className="mt-6 max-w-[42rem] text-[0.96rem] leading-7 text-text-secondary sm:text-base sm:leading-8">
            {project.description}
          </p>
        )}

        {project.productionCompany && (
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-text-muted">
            {project.productionCompany}
          </p>
        )}

        {project.accolades &&
          project.accolades.length > 0 && (
            <div className="mt-7 border-l border-accent/45 pl-5">
              {project.accolades.map((accolade) => (
                <p
                  key={accolade}
                  className="text-[11px] font-medium uppercase leading-5 tracking-[0.14em] text-accent"
                >
                  {accolade}
                </p>
              ))}
            </div>
          )}
      </div>
    </article>
  );
}
