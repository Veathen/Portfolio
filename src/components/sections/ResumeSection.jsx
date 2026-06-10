import { FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { assets, links } from "../../content/portfolio";
import { ButtonLink } from "../ui";

const resumeActions = [
  { label: "Download resume", href: assets.resumePdf, Icon: FiDownload, variant: "primary" },
  { label: "LinkedIn", href: links.linkedin, Icon: FiLinkedin, variant: "secondary" },
  { label: "GitHub", href: links.github, Icon: FiGithub, variant: "ghost" },
];

export default function ResumeSection() {
  return (
    <section className="section-pad resume-section" id="resume">
      <div className="resume-card glass-panel">
        <div>
          <p className="eyebrow">Resume and contact</p>
          <h2>Currently looking for software engineering opportunities.</h2>
          <p>
            I am especially interested in roles where I can build reliable systems, improve developer workflows, and
            keep learning across full-stack, platform, cloud, and embedded work.
          </p>
        </div>
        <div className="resume-actions">
          {resumeActions.map(({ label, ...action }) => (
            <ButtonLink key={label} external {...action}>{label}</ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
