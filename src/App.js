import React, { useEffect, useState } from "react";
import "./App.css";
import GalaxyBackground from "./components/GalaxyBackground";
import portrait from "./Assets/Portrait.jpg";
import resumePdf from "./Assets/Vitaliy_Sviridyuk_Resume_Summer_2026.pdf";
import envirogram from "./Assets/Projects/Envirogram.png";
import midiPlayer from "./Assets/Projects/Midi.jpg";
import librarySchema from "./Assets/Projects/Schema.png";
import eStore from "./Assets/Projects/Estore.png";
import mud from "./Assets/Projects/MUD.png";
import comboJumper from "./Assets/Projects/Combojumper logo.png";
import aiConverterLogo from "./Assets/ai code converter logo.png";
import seniorProjectPoster from "./Assets/Projects/Senior Project Poster.pdf";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiFileText,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiPhone,
  FiServer,
  FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
];

const highlights = [
  { value: "May 2026", label: "RIT Software Engineering graduate" },
  { value: "3.83", label: "GPA, summa cum laude" },
  { value: "2", label: "Software engineering roles completed" },
  { value: "Full-stack", label: "Cloud, DevOps, web, and embedded work" },
];

const focusAreas = [
  {
    icon: <FiServer />,
    title: "Cloud and DevOps",
    copy:
      "CI/CD pipelines, deployment workflows, secret-management automation, AWS infrastructure, Docker, Jenkins, Terraform, and production-facing tooling.",
  },
  {
    icon: <FiLayers />,
    title: "Full-stack systems",
    copy:
      "React, Next.js, FastAPI, Flask, REST APIs, PostgreSQL, DynamoDB, accessibility-minded UI design, and maintainable application architecture.",
  },
  {
    icon: <FiCpu />,
    title: "Embedded software",
    copy:
      "STM32 C firmware, BLE proximity workflows, USB HID behavior, memory management, hardware controls, and microcontroller programming.",
  },
];

const experience = [
  {
    company: "Paychex",
    role: "Software Engineer Co-op",
    dates: "Aug 2024 - Aug 2025",
    location: "Rochester, NY / Remote",
    points: [
      "Built and maintained software delivery tooling for a high-velocity DevOps team supporting production pipelines and internal platforms.",
      "Developed components for an automated secret-rotation platform and CI/CD pipeline intended for company-wide use.",
      "Improved release, deployment, and secret-management workflows across Python, Java, Kotlin, React, Go, Jenkins, Grafana, Artifactory, and Digital.ai Deploy.",
    ],
  },
  {
    company: "Odoo",
    role: "Full Stack Engineer Intern",
    dates: "Jun 2023 - Aug 2023",
    location: "Buffalo, NY",
    points: [
      "Modernized an internal ERP recreation app used by company employees.",
      "Refactored legacy functionality on a two-person team while aligning with current codebase standards.",
      "Built and debugged full-stack features with PostgreSQL, psycopg2, REST APIs, and OWL, Odoo's JavaScript framework.",
    ],
  },
];

const projects = [
  {
    title: "AI Legacy Code Converter",
    eyebrow: "Lockheed Martin-sponsored senior project",
    image: aiConverterLogo,
    tags: ["AWS Bedrock", "FastAPI", "React", "Next.js", "Terraform"],
    link: seniorProjectPoster,
    linkLabel: "View poster",
    copy:
      "Full-stack AI code-conversion platform with generation, self-testing, Docker sandboxing, reusable templates, S3, DynamoDB, EKS, and Terraform infrastructure.",
  },
  {
    title: "BLE Proximity Unlock",
    eyebrow: "Software engineering design seminar",
    image: midiPlayer,
    tags: ["STM32", "C", "BLE", "USB HID"],
    copy:
      "STM32 firmware that locks and unlocks connected devices over USB using normalized BLE RSSI proximity detection, calibration logic, and HID device behavior.",
  },
  {
    title: "Envirogram",
    eyebrow: "Human-centered requirements and design",
    image: envirogram,
    tags: ["Figma", "Proto.io", "Accessibility", "UX research"],
    copy:
      "Environmental social media prototype built with a five-person team, including requirements documentation, user feedback, accessibility considerations, and design iterations.",
  },
  {
    title: "MIDI Song Player",
    eyebrow: "Embedded systems",
    image: midiPlayer,
    tags: ["STM32", "C", "Firmware"],
    copy:
      "Embedded C firmware for an STM32 microcontroller that plays stored MIDI songs through hardware controls while reinforcing memory management fundamentals.",
  },
  {
    title: "Library Management System",
    eyebrow: "Web engineering",
    image: librarySchema,
    tags: ["PostgreSQL", "Python", "psycopg2", "REST APIs"],
    copy:
      "A library management API backed by a normalized PostgreSQL schema designed to serve many libraries through organized REST workflows.",
  },
  {
    title: "E-Store Application",
    eyebrow: "Full-stack web application",
    image: eStore,
    tags: ["Java", "Angular", "Tomcat", "REST APIs"],
    copy:
      "Team-built online storefront using Java, Angular, and a Tomcat REST API server, with hands-on practice in collaboration and conflict resolution.",
  },
  {
    title: "Multiplayer Dungeon Crawler",
    eyebrow: "Game systems",
    image: mud,
    tags: ["Java", "Multiplayer", "Procedural levels"],
    copy:
      "A 2D Java dungeon crawler with multiplayer exploration, random dungeons, player-made maps, and a modular structure for modded content.",
  },
  {
    title: "Combo Jumper",
    eyebrow: "Indie game development",
    image: comboJumper,
    tags: ["C++", "3D platformer", "Steam"],
    copy:
      "Solo-developed 3D platformer published on Steam, built through disciplined project planning, documentation, and iterative gameplay design.",
  },
];

const skillGroups = [
  {
    icon: <FiCode />,
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "SQL", "Kotlin", "Go"],
  },
  {
    icon: <FiDatabase />,
    title: "Backend and data",
    items: ["FastAPI", "Flask", "REST APIs", "Maven", "Tomcat", ".NET", "PostgreSQL", "DynamoDB"],
  },
  {
    icon: <FiBriefcase />,
    title: "Frontend and product",
    items: ["React", "Angular", "Next.js", "HTML/CSS", "Figma", "Accessibility-focused UI"],
  },
  {
    icon: <FiServer />,
    title: "Cloud and tooling",
    items: ["AWS", "Bedrock", "S3", "EKS", "Docker", "Terraform", "Jenkins", "Digital.ai Deploy"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const queryRoute = window.location.search.startsWith("?/") ? window.location.search.slice(2).split("&")[0] : "";
    const routeTarget = queryRoute.replace("/", "") || window.location.pathname.split("/").filter(Boolean).pop();
    const routeMap = {
      about: "about",
      project: "projects",
      projects: "projects",
      resume: "resume",
      experience: "experience",
    };
    const target = window.location.hash.replace("#", "") || routeMap[routeTarget];

    if (target) {
      window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const composeEmailHref =
    "https://mail.google.com/mail/?view=cm&fs=1&to=vitaliksviridyuk@gmail.com&su=Portfolio%20Contact";
  const phoneHref = "tel:+15854783430";

  return (
    <div className="site-shell">
      <GalaxyBackground />
      <div className="cosmos" aria-hidden="true">
        <span className="nebula nebula-one" />
        <span className="nebula nebula-two" />
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
      </div>

      <header className="site-nav">
        <a className="brand-mark" href="#home" onClick={closeMenu} aria-label="Vitaliy Sviridyuk home">
          VS
        </a>
        <button
          className="nav-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
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
              <a className="button primary" href="#projects">
                View work <FiArrowUpRight />
              </a>
              <a className="button secondary" href={resumePdf} target="_blank" rel="noreferrer">
                Resume <FiDownload />
              </a>
              <div className="contact-menu">
                <button
                  className="button ghost"
                  type="button"
                  onClick={() => setContactOpen((open) => !open)}
                  aria-expanded={contactOpen}
                  aria-controls="hero-contact-menu"
                >
                  Contact <FiMail />
                </button>
                {contactOpen && (
                  <div className="contact-popover glass-panel" id="hero-contact-menu">
                    <a href={composeEmailHref} target="_blank" rel="noreferrer">
                      <FiMail />
                      <span>
                        <small>Email me</small>
                        vitaliksviridyuk@gmail.com
                      </span>
                    </a>
                    <a href={phoneHref}>
                      <FiPhone />
                      <span>
                        <small>Phone</small>
                        (585) 478-3430
                      </span>
                    </a>
                    <a href="https://www.linkedin.com/in/vitaliy-sviridyuk/" target="_blank" rel="noreferrer">
                      <FiLinkedin />
                      <span>
                        <small>LinkedIn</small>
                        vitaliy-sviridyuk
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait-glow" aria-hidden="true" />
            <img src={portrait} alt="Portrait of Vitaliy Sviridyuk" />
            <div className="status-card glass-panel">
              <span>Rochester, NY</span>
              <strong>Software Engineer</strong>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Career highlights">
          {highlights.map((item) => (
            <article className="stat-card glass-panel" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="section-pad split-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">Let me introduce myself</p>
            <h2>Graduate engineer with a builder's range.</h2>
          </div>
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
          {focusAreas.map((area) => (
            <article className="focus-card glass-panel" key={area.title}>
              <span className="card-icon">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </section>

        <section className="section-pad" id="experience">
          <div className="section-heading centered">
            <p className="eyebrow">Experience</p>
            <h2>Professional work in production-minded teams.</h2>
          </div>
          <div className="timeline">
            {experience.map((job) => (
              <article className="timeline-card glass-panel" key={job.company}>
                <div>
                  <p className="eyebrow">{job.dates}</p>
                  <h3>{job.role}</h3>
                  <span>{job.company} - {job.location}</span>
                </div>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad" id="projects">
          <div className="section-heading centered">
            <p className="eyebrow">Projects</p>
            <h2>Selected work across AI, web, infrastructure, and embedded systems.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={index === 0 ? "project-card featured glass-panel" : "project-card glass-panel"} key={project.title}>
                <div className="project-media">
                  <img src={project.image} alt={`${project.title} visual`} />
                </div>
                <div className="project-content">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  {project.link && (
                    <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                      {project.linkLabel || "View project"} <FiFileText />
                    </a>
                  )}
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad skills-section">
          <div className="section-heading">
            <p className="eyebrow">Stack</p>
            <h2>Tools I can move with.</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card glass-panel" key={group.title}>
                <span className="card-icon">{group.icon}</span>
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad resume-section" id="resume">
          <div className="resume-card glass-panel">
            <div>
              <p className="eyebrow">Resume and contact</p>
              <h2>Currently looking for software engineering opportunities.</h2>
              <p>
                I am especially interested in roles where I can build reliable systems, improve developer workflows,
                and keep learning across full-stack, platform, cloud, and embedded work.
              </p>
            </div>
            <div className="resume-actions">
              <a className="button primary" href={resumePdf} target="_blank" rel="noreferrer">
                Download resume <FiDownload />
              </a>
              <a className="button secondary" href="https://www.linkedin.com/in/vitaliy-sviridyuk/" target="_blank" rel="noreferrer">
                LinkedIn <FiLinkedin />
              </a>
              <a className="button ghost" href="https://github.com/Veathen" target="_blank" rel="noreferrer">
                GitHub <FiGithub />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Built with React for GitHub Pages.</span>
        <div>
          <a href={composeEmailHref} target="_blank" rel="noreferrer">Email</a>
          <a href="https://www.linkedin.com/in/vitaliy-sviridyuk/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/Veathen" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
