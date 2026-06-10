export function cx(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export function SectionHeading({ eyebrow, children, centered = false }) {
  return (
    <div className={cx("section-heading", centered && "centered")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

export function IconBadge({ Icon }) {
  return (
    <span className="card-icon" aria-hidden="true">
      <Icon />
    </span>
  );
}

export function TagList({ items }) {
  return (
    <div className="tag-row">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function ButtonLink({ href, Icon, children, variant = "primary", external = false }) {
  const externalProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  // Composition pattern: one accessible action primitive owns repeated link behavior and styling.
  return (
    <a className={cx("button", variant)} href={href} {...externalProps}>
      {children}
      {Icon && <Icon aria-hidden="true" />}
    </a>
  );
}
