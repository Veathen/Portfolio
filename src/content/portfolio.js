import {
  FiBriefcase,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiServer,
} from "react-icons/fi";
import portrait from "../Assets/Portrait.jpg";
import resumePdf from "../Assets/Vitaliy_Sviridyuk_Resume_Summer_2026.pdf";
import aiConverterLogo from "../Assets/ai code converter logo.png";
import comboJumper from "../Assets/Projects/Combojumper logo.png";
import envirogram from "../Assets/Projects/Envirogram.png";
import eStore from "../Assets/Projects/Estore.png";
import librarySchema from "../Assets/Projects/Schema.png";
import midiPlayer from "../Assets/Projects/Midi.jpg";
import mud from "../Assets/Projects/MUD.png";
import seniorProjectPoster from "../Assets/Projects/Senior Project Poster.pdf";

export const assets = { portrait, resumePdf };

// Single source of truth: shared contact URLs cannot drift between sections.
export const links = {
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=vitaliksviridyuk@gmail.com&su=Portfolio%20Contact",
  phone: "tel:+15854783430",
  linkedin: "https://www.linkedin.com/in/vitaliy-sviridyuk/",
  github: "https://github.com/Veathen",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
];

export const contactMethods = [
  { label: "Email me", value: "vitaliksviridyuk@gmail.com", href: links.email, Icon: FiMail, external: true },
  { label: "Phone", value: "(585) 478-3430", href: links.phone, Icon: FiPhone },
  { label: "LinkedIn", value: "vitaliy-sviridyuk", href: links.linkedin, Icon: FiLinkedin, external: true },
];

export const socialLinks = [
  { label: "Email", href: links.email, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "GitHub", href: links.github, external: true },
];

export const highlights = [
  { value: "May 2026", label: "RIT Software Engineering graduate" },
  { value: "3.83", label: "GPA, summa cum laude" },
  { value: "2", label: "Software engineering roles completed" },
  { value: "Full-stack", label: "Cloud, DevOps, web, and embedded work" },
];

export const focusAreas = [
  {
    Icon: FiServer,
    title: "Cloud and DevOps",
    copy: "CI/CD pipelines, deployment workflows, secret-management automation, AWS infrastructure, Docker, Jenkins, Terraform, and production-facing tooling.",
  },
  {
    Icon: FiLayers,
    title: "Full-stack systems",
    copy: "React, Next.js, FastAPI, Flask, REST APIs, PostgreSQL, DynamoDB, accessibility-minded UI design, and maintainable application architecture.",
  },
  {
    Icon: FiCpu,
    title: "Embedded software",
    copy: "STM32 C firmware, BLE proximity workflows, USB HID behavior, memory management, hardware controls, and microcontroller programming.",
  },
];

export const experience = [
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

export const projects = [
  {
    title: "AI Legacy Code Converter",
    eyebrow: "Lockheed Martin-sponsored senior project",
    image: aiConverterLogo,
    tags: ["AWS Bedrock", "FastAPI", "React", "Next.js", "Terraform"],
    link: seniorProjectPoster,
    linkLabel: "View poster",
    copy: "Full-stack AI code-conversion platform with generation, self-testing, Docker sandboxing, reusable templates, S3, DynamoDB, EKS, and Terraform infrastructure.",
    featured: true,
  },
  {
    title: "BLE Proximity Unlock",
    eyebrow: "Software engineering design seminar",
    image: midiPlayer,
    tags: ["STM32", "C", "BLE", "USB HID"],
    copy: "STM32 firmware that locks and unlocks connected devices over USB using normalized BLE RSSI proximity detection, calibration logic, and HID device behavior.",
  },
  {
    title: "Envirogram",
    eyebrow: "Human-centered requirements and design",
    image: envirogram,
    tags: ["Figma", "Proto.io", "Accessibility", "UX research"],
    copy: "Environmental social media prototype built with a five-person team, including requirements documentation, user feedback, accessibility considerations, and design iterations.",
  },
  {
    title: "MIDI Song Player",
    eyebrow: "Embedded systems",
    image: midiPlayer,
    tags: ["STM32", "C", "Firmware"],
    copy: "Embedded C firmware for an STM32 microcontroller that plays stored MIDI songs through hardware controls while reinforcing memory management fundamentals.",
  },
  {
    title: "Library Management System",
    eyebrow: "Web engineering",
    image: librarySchema,
    tags: ["PostgreSQL", "Python", "psycopg2", "REST APIs"],
    copy: "A library management API backed by a normalized PostgreSQL schema designed to serve many libraries through organized REST workflows.",
  },
  {
    title: "E-Store Application",
    eyebrow: "Full-stack web application",
    image: eStore,
    tags: ["Java", "Angular", "Tomcat", "REST APIs"],
    copy: "Team-built online storefront using Java, Angular, and a Tomcat REST API server, with hands-on practice in collaboration and conflict resolution.",
  },
  {
    title: "Multiplayer Dungeon Crawler",
    eyebrow: "Game systems",
    image: mud,
    tags: ["Java", "Multiplayer", "Procedural levels"],
    copy: "A 2D Java dungeon crawler with multiplayer exploration, random dungeons, player-made maps, and a modular structure for modded content.",
  },
  {
    title: "Combo Jumper",
    eyebrow: "Indie game development",
    image: comboJumper,
    tags: ["C++", "3D platformer", "Steam"],
    copy: "Solo-developed 3D platformer published on Steam, built through disciplined project planning, documentation, and iterative gameplay design.",
  },
];

export const skillGroups = [
  {
    Icon: FiCode,
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", "SQL", "Kotlin", "Go"],
  },
  {
    Icon: FiDatabase,
    title: "Backend and data",
    items: ["FastAPI", "Flask", "REST APIs", "Maven", "Tomcat", ".NET", "PostgreSQL", "DynamoDB"],
  },
  {
    Icon: FiBriefcase,
    title: "Frontend and product",
    items: ["React", "Angular", "Next.js", "HTML/CSS", "Figma", "Accessibility-focused UI"],
  },
  {
    Icon: FiServer,
    title: "Cloud and tooling",
    items: ["AWS", "Bedrock", "S3", "EKS", "Docker", "Terraform", "Jenkins", "Digital.ai Deploy"],
  },
];
