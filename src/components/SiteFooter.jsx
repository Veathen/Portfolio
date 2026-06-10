import { socialLinks } from "../content/portfolio";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>Built with Vite, React, and React Three Fiber.</span>
      <div>
        {socialLinks.map(({ label, href, external }) => (
          <a key={label} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
