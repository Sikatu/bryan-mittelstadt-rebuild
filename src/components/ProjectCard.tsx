import EditorialButton from './EditorialButton';
import EditorialImage from './EditorialImage';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

/** Grid item card for the Selected Work section. */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-sm border border-border-subtle bg-bg-light shadow-xs transition-shadow duration-500 group-hover:shadow-md">
        {project.image && (
          <EditorialImage
            asset={project.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imageClassName="transition-transform duration-700 group-hover:scale-105"
            fallbackLabel="Production still pending"
          />
        )}
        {project.accolades && project.accolades.length > 0 && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-contrast-dark/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
            <span className="text-[10px] uppercase tracking-wider text-[#f0c6aa]">
              {project.accolades[0]}
            </span>
          </div>
        )}
      </div>

      <h3 className="mb-1 font-serif text-lg text-text-primary transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-x-3 text-xs text-text-secondary">
        {project.role && <span>{project.role}</span>}
        {project.format && (
          <>
            <span className="text-border-subtle" aria-hidden="true">·</span>
            <span>{project.format}</span>
          </>
        )}
        {project.director && (
          <>
            <span className="text-border-subtle" aria-hidden="true">·</span>
            <span>Dir. {project.director}</span>
          </>
        )}
      </div>
      {project.link && (
        <EditorialButton href={project.link} external variant="text" className="mt-4">
          View Project
        </EditorialButton>
      )}
    </article>
  );
}
