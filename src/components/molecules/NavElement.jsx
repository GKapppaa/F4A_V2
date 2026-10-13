import Enlaces from "../atoms/Enlaces";

function NavElement({
  href,
  active = false,
  children,
  className = "",
}) {
  const activeClass = active ? "active" : "";

  return (
    <Enlaces
      href={href}
      className={`${className} ${activeClass}`.trim()}
    >
      {children}
    </Enlaces>
  );
}

export default NavElement;