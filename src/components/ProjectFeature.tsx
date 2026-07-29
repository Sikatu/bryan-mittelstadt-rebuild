import Image from 'next/image';
import type { Project } from '@/types';

interface ProjectFeatureProps {
  project: Project;
  /** Alternate layout direction for visual rhythm. */
  reverse?: boolean;
}

/** Large editorial card for featured/current projects. */
export default function ProjectFeature({
  project,
  reverse = false,
}: ProjectFeatureProps) {
  return (
    <article
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
        reverse ? 'md:[direction:rtl]' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-bg-light border border-border-subtle shadow-sm hover:shadow-md transition-shadow duration-500 rounded-sm ${reverse ? 'md:[direction:ltr]' : ''}`}>
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.role ?? project.discipline}`}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {/* Details */}
      <div className={`${reverse ? 'md:[direction:ltr]' : ''}`}>
        {project.status && (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">
            {project.status}
          </p>
        )}
        <h3 className="heading-section text-2xl lg:text-3xl text-text-primary mb-3">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary mb-4">
          {project.role && <span>{project.role}</span>}
          {project.discipline && <span>{project.discipline}</span>}
          {project.year && <span>{project.year}</span>}
        </div>
        {project.description && (
          <p className="body-text text-text-muted text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        )}
        {project.accolades && project.accolades.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.accolades.map((accolade) => (
              <span
                key={accolade}
                className="text-[11px] uppercase tracking-wider text-accent border border-accent/20 px-2.5 py-1 rounded-sm"
              >
                {accolade}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
