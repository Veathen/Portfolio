import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { contactMethods } from "../content/portfolio";

export default function ContactMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-menu">
      <button
        className="button ghost"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="hero-contact-menu"
      >
        Contact <FiMail aria-hidden="true" />
      </button>
      {open && (
        <div className="contact-popover glass-panel" id="hero-contact-menu">
          {contactMethods.map(({ label, value, href, Icon, external }) => (
            <a key={label} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
              <Icon aria-hidden="true" />
              <span>
                <small>{label}</small>
                {value}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
