import { PROJECTS, SITE, type Project } from '../config';
import { ArrowIcon, GitHubIcon } from './Icons';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div
        className="relative aspect-[2/1] overflow-hidden"
        style={{ background: project.color ?? '#ece6dc' }}>
        {project.image ? (
          <img
            src={`./projects/${project.image}`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-end p-6 sm:p-8">
            <span
              className="text-[44px] leading-none tracking-tight text-white sm:text-[64px]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {project.name}
            </span>
          </div>
        )}
        <span className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[12px] text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-[28px] leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {project.name}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-black/65">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-black/10 px-3 py-1 text-[13px] text-black/70">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          {project.live ? (
            <a
              href={project.live.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[14px] text-white transition-colors hover:bg-[#d61f26]">
              {project.live.label}
              <ArrowIcon />
            </a>
          ) : null}
          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-[14px] text-black transition-colors hover:bg-black hover:text-white">
              <GitHubIcon className="h-4 w-4" />
              View code
            </a>
          ) : project.note ? (
            <span className="text-[14px] text-black/45">{project.note}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-[2] bg-[#f5f1ea] px-5 py-24 text-black sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="mb-3 text-[14px] tracking-[0.18em] text-[#d61f26] uppercase">Selected work</p>
            <h2
              className="text-[44px] leading-[1.02] tracking-tight sm:text-[64px]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Projects
            </h2>
          </div>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[17px] underline underline-offset-4 transition-opacity hover:opacity-60">
            <GitHubIcon className="h-[18px] w-[18px]" />
            All my code on GitHub
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
