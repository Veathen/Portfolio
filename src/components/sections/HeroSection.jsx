import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { assets, highlights } from "../../content/portfolio";
import ContactMenu from "../ContactMenu";
import { ButtonLink } from "../ui";

export default function HeroSection() {
  return (
    <>
      <section className="hero-section section-pad" id="home">
        <div className="hero-copy glass-panel">
          <p className="eyebrow">Open to software engineering roles</p>
          <h1>Vitaliy Sviridyuk</h1>
          <p className="hero-lede">
            Software Engineering graduate from Rochester Institute of Technology building full-stack, cloud, DevOps,
            and embedded systems.
          </p>
          <p className="hero-body">
            I graduated summa cum laude in May 2026 and am currently looking for my next engineering role. I bring
            hands-on experience from Paychex and Odoo, where I worked on internal platforms, CI/CD workflows,
            secret-rotation automation, large-codebase refactoring, and user-focused web applications.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#projects" Icon={FiArrowUpRight}>View work</ButtonLink>
            <ButtonLink href={assets.resumePdf} Icon={FiDownload} variant="secondary" external>Resume</ButtonLink>
            <ContactMenu />
          </div>
        </div>

        <div className="portrait-wrap">
          <div className="portrait-glow" aria-hidden="true" />
          <img src={assets.portrait} alt="Portrait of Vitaliy Sviridyuk" />
          <div className="status-card glass-panel">
            <span>Rochester, NY</span>
            <strong>Software Engineer</strong>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Career highlights">
        {/* Data-driven rendering keeps repeated cards structurally identical. */}
        {highlights.map((item) => (
          <article className="stat-card glass-panel" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>
    </>
  );
}
