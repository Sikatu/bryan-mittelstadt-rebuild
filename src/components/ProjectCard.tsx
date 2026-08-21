import EditorialButton from './EditorialButton';
import EditorialImage from './EditorialImage';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

/** Compact editorial tile for the Selected Work section. */
export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group border-t border-[#cfc6bb] pt-5">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-border-subtle bg-bg-light shadow-[0_14px_38px_rgba(45,36,28,0.055)]">
        {project.image && (
          <EditorialImage
            asset={project.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
            fallbackLabel="Production image pending approval"
          />
        )}

        {project.accolades &&
          project.accolades.length > 0 && (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-contrast-dark/78 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
              <span className="max-w-[90%] text-[10px] font-medium uppercase leading-5 tracking-[0.16em] text-[#f0c6aa]">
                {project.accolades[0]}
              </span>
            </div>
          )}
      </div>

      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
            {project.discipline ?? project.format}
          </p>

          <h3 className="font-serif text-[1.55rem] leading-[1.08] text-text-primary transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="mt-1 text-lg text-text-muted/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
        >
          ↗
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-text-secondary">
        {project.role && <span>{project.role}</span>}

        {project.format && (
          <>
            {project.role && (
              <span
                className="text-border-subtle"
                aria-hidden="true"
              >
                ·
              </span>
            )}
            <span>{project.format}</span>
          </>
        )}

        {project.director && (
          <>
            <span
              className="text-border-subtle"
              aria-hidden="true"
            >
              ·
            </span>
            <span>Dir. {project.director}</span>
          </>
        )}
      </div>

      {project.link && (
        <EditorialButton
          href={project.link}
          external
          variant="text"
          className="mt-5"
        >
          View Project
        </EditorialButton>
      )}
    </article>
  );
}
