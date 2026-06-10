import { skillGroups } from "../../content/portfolio";
import { IconBadge, SectionHeading, TagList } from "../ui";

export default function SkillsSection() {
  return (
    <section className="section-pad skills-section">
      <SectionHeading eyebrow="Stack">Tools I can move with.</SectionHeading>
      <div className="skills-grid">
        {skillGroups.map(({ Icon, title, items }) => (
          <article className="skill-card glass-panel" key={title}>
            <IconBadge Icon={Icon} />
            <h3>{title}</h3>
            <TagList items={items} />
          </article>
        ))}
      </div>
    </section>
  );
}
