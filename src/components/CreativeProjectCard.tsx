import EditorialButton from './EditorialButton';
import EditorialImage from './EditorialImage';
import MediaStatusBadge from './MediaStatusBadge';
import type { CreativeProject } from '@/types';

export default function CreativeProjectCard({ project }: { project: CreativeProject }) {
  return (
    <article className="overflow-hidden border border-border-subtle bg-bg-secondary">
      {project.image && (
        <div className="relative aspect-[16/10] bg-bg-light">
          <EditorialImage
            asset={project.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            fallbackLabel="Project artwork pending"
          />
        </div>
      )}
      <div className="p-6 sm:p-7">
        <MediaStatusBadge availability={project.availability} />
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-accent">
          {project.projectType ?? project.format ?? project.discipline}
        </p>
        <h2 className="mt-2 font-serif text-2xl text-text-primary">{project.title}</h2>
        {project.logline && (
          <p className="mt-4 leading-relaxed text-text-secondary">{project.logline}</p>
        )}
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Bryan's contributions">
          {project.contribution.map((item) => (
            <span key={item} className="border border-border-light px-3 py-1 text-xs text-text-secondary">
              {item}
            </span>
          ))}
        </div>
        {project.link && project.availability === 'available' && (
          <EditorialButton href={project.link} external variant="text" className="mt-6">
            View Project
          </EditorialButton>
        )}
      </div>
    </article>
  );
}
