import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { navigation } from "../content/portfolio";
import { cx } from "./ui";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
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
      <nav className={cx("nav-links", menuOpen && "is-open")} aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
