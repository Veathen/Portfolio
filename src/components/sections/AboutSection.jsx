import { focusAreas } from "../../content/portfolio";
import { IconBadge, SectionHeading } from "../ui";

export default function AboutSection() {
  return (
    <>
      <section className="section-pad split-section" id="about">
        <SectionHeading eyebrow="Let me introduce myself">Graduate engineer with a builder's range.</SectionHeading>
        <div className="glass-panel text-panel">
          <p>
            I am a Rochester-based software engineer who likes working close to the real shape of a problem, whether
            that means cleaning up a full-stack workflow, making deployment automation less fragile, or writing C for
            a microcontroller with physical behavior attached.
          </p>
          <p>
            My strongest work sits at the intersection of practical systems and user empathy: cloud infrastructure,
            backend APIs, React interfaces, DevOps tooling, embedded systems, and enough product sense to keep the
            result understandable for real people.
          </p>
        </div>
      </section>

      <section className="focus-grid section-pad" aria-label="Focus areas">
        {focusAreas.map(({ Icon, title, copy }) => (
          <article className="focus-card glass-panel" key={title}>
            <IconBadge Icon={Icon} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}
