import Image from 'next/image';
import EditorialButton from './EditorialButton';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

/** Grid item card for the Selected Work section. */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-light border border-border-subtle shadow-xs group-hover:shadow-md transition-shadow duration-500 rounded-sm mb-4">
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.role ?? project.discipline}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Hover overlay with accolade */}
        {project.accolades && project.accolades.length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-t from-contrast-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <span className="text-[10px] uppercase tracking-wider text-accent">
              {project.accolades[0]}
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <h3 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-300 mb-1">
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
        <EditorialButton
          href={project.link}
          external
          variant="text"
          className="mt-4"
        >
          View Project
        </EditorialButton>
      )}
    </article>
  );
}
