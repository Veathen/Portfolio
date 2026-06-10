import { experience } from "../../content/portfolio";
import { SectionHeading } from "../ui";

export default function ExperienceSection() {
  return (
    <section className="section-pad" id="experience">
      <SectionHeading eyebrow="Experience" centered>Professional work in production-minded teams.</SectionHeading>
      <div className="timeline">
        {experience.map((job) => (
          <article className="timeline-card glass-panel" key={job.company}>
            <div>
              <p className="eyebrow">{job.dates}</p>
              <h3>{job.role}</h3>
              <span>{job.company} - {job.location}</span>
            </div>
            <ul>
              {job.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
