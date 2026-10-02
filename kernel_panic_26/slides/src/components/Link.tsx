import type { ReactNode } from "react";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";

/**
 * A real, clickable link.
 *
 * The deck is presented from a browser, so anything that looks like a URL
 * should open. Half-links (a styled URL you cannot click) are worse than no
 * link at all: people photograph them instead of following them.
 *
 * Opens in a new tab so a click never loses the slide you are on.
 */
export function Link({
  href,
  children,
  size = 15,
  color,
}: {
  href: string;
  children?: ReactNode;
  size?: number;
  color?: string;
}) {
  const { T } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        fontFamily: MONO,
        fontSize: size,
        color: color ?? T.textMuted,
        textDecoration: "none",
        borderBottom: `1px solid ${T.border}`,
        paddingBottom: 1,
        transition: "color .15s, border-color .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = T.emerald;
        e.currentTarget.style.borderColor = T.emerald;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = color ?? T.textMuted;
        e.currentTarget.style.borderColor = T.border;
      }}
    >
      {children ?? href.replace(/^https?:\/\//, "")}
    </a>
  );
}
