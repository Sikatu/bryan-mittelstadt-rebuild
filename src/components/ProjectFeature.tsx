import EditorialImage from './EditorialImage';
import type { Project } from '@/types';

interface ProjectFeatureProps {
  project: Project;
  reverse?: boolean;
}

/** Large editorial card for featured/current projects. */
export default function ProjectFeature({ project, reverse = false }: ProjectFeatureProps) {
  return (
    <article
      className={`grid grid-cols-1 items-center gap-8 lg:gap-12 md:grid-cols-2 ${
        reverse ? 'md:[direction:rtl]' : ''
      }`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-sm border border-border-subtle bg-bg-light shadow-sm transition-shadow duration-500 hover:shadow-md ${reverse ? 'md:[direction:ltr]' : ''}`}>
        {project.image && (
          <EditorialImage
            asset={project.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            imageClassName="transition-transform duration-700 hover:scale-105"
            fallbackLabel={project.discipline === 'Music' ? 'Album artwork pending' : 'Production image pending'}
          />
        )}
      </div>

      <div className={reverse ? 'md:[direction:ltr]' : ''}>
        {project.status && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.status}
          </p>
        )}
        <h3 className="heading-section mb-3 text-2xl text-text-primary lg:text-3xl">
          {project.title}
        </h3>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
          {project.role && <span>{project.role}</span>}
          {project.discipline && <span>{project.discipline}</span>}
          {project.year && <span>{project.year}</span>}
        </div>
        {project.description && (
          <p className="body-text mb-4 text-sm leading-relaxed text-text-muted">
            {project.description}
          </p>
        )}
        {project.accolades && project.accolades.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.accolades.map((accolade) => (
              <span
                key={accolade}
                className="rounded-sm border border-accent/20 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent"
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
