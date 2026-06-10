import { FiFileText } from "react-icons/fi";
import { projects } from "../../content/portfolio";
import { cx, SectionHeading, TagList } from "../ui";

function ProjectCard({ project }) {
  return (
    <article className={cx("project-card glass-panel", project.featured && "featured")}>
      <div className="project-media">
        <img src={project.image} alt={`${project.title} visual`} />
      </div>
      <div className="project-content">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.copy}</p>
        {project.link && (
          <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
            {project.linkLabel ?? "View project"} <FiFileText aria-hidden="true" />
          </a>
        )}
        <TagList items={project.tags} />
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="section-pad" id="projects">
      <SectionHeading eyebrow="Projects" centered>
        Selected work across AI, web, infrastructure, and embedded systems.
      </SectionHeading>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
      </div>
    </section>
  );
}
