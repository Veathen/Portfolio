import { useEffect } from "react";

const routeToSection = {
  about: "about",
  project: "projects",
  projects: "projects",
  resume: "resume",
  experience: "experience",
};

export function useInitialSectionNavigation() {
  useEffect(() => {
    const legacyQueryRoute = window.location.search.startsWith("?/")
      ? window.location.search.slice(2).split("&")[0]
      : "";
    const pathnameRoute = window.location.pathname.split("/").filter(Boolean).pop();
    const route = legacyQueryRoute.replace("/", "") || pathnameRoute;
    const target = window.location.hash.slice(1) || routeToSection[route];

    if (!target) return undefined;

    // Compatibility adapter: old GitHub Pages links still resolve after the Vite migration.
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);
}
