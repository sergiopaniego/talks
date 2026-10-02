import { useMemo } from "react";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";

// The self-contained D3/SVG fragments from the multi-harness RL article.
// They carry their own data and script, so a glob import is enough: nothing
// here fetches, and nothing reaches a CDN.
const FRAGMENTS = import.meta.glob("../embeds/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function fragmentFor(name: string): string | null {
  const needle = name.endsWith(".html") ? name : `${name}.html`;
  for (const [path, html] of Object.entries(FRAGMENTS)) {
    if (path.endsWith(`/${needle}`)) return html;
  }
  return null;
}

/**
 * Render an article figure inside a themed iframe.
 *
 * The fragments read their palette from CSS variables, so we map the deck's
 * theme onto the names the article uses. Several of them take a `config`,
 * which they look for by walking up the DOM for a `data-config` attribute,
 * hence the wrapper div.
 */
export function Embed({
  name,
  config,
  height = 560,
  width = "100%",
  scale = 1,
  css = "",
}: {
  name: string;
  config?: Record<string, unknown>;
  height?: number;
  width?: number | string;
  scale?: number;
  /** Per-figure CSS. Several figures are sized for the article's text column
   *  (some cap themselves at 640px), which leaves them small and flush left on
   *  a 1160px slide. Override them here rather than editing the vendored HTML. */
  css?: string;
}) {
  const { T, mode } = useTheme();
  const fragment = fragmentFor(name);

  const srcDoc = useMemo(() => {
    if (!fragment) return "";
    const cfg = config ? JSON.stringify(config).replace(/"/g, "&quot;") : "";
    return `<!doctype html><html><head><meta charset="utf-8"/>
<script>
  // Each figure reveals itself with a clip-path wipe once an IntersectionObserver
  // says it is on screen. Inside an iframe that never fires, so the chart draws
  // with its clip shut and the slide looks empty. The figures already handle the
  // case where the API is absent: "else { seen = true; reveal('none') }", which
  // draws them in full with no animation. That is what a slide wants anyway.
  delete window.IntersectionObserver;
</script>
<style>
  :root{
    /* NOT color-scheme:dark. With it, Chrome paints the iframe canvas with its
       own dark colour even when html and body are transparent, which covers the
       slide's backdrop and leaves a visible rectangle around every figure.
       'normal' plus explicit transparency lets the slide show through, so the
       figures sit on the same background as everything else in both themes. */
    color-scheme:normal;
    --bg:transparent;
    --surface-bg:transparent;
    --card-bg:${T.bgRaised};
    --border-color:${T.border};
    --border-strong:${T.borderStrong};
    --text-color:${T.text};
    --heading-color:${T.white};
    --muted-color:${T.textDim};
    --primary-color:${T.lavender};
    --accent:${T.emerald};
    --accent-strong:${T.emeraldDim};
    --positive:${T.diffPlus};
    --negative:${T.diffMinus};
  }
  html,body{margin:0;padding:0;background:transparent !important;color:${T.text};
    font-family:${MONO};font-size:15px;overflow:hidden;}
  *{box-sizing:border-box;}
  /* the article wraps figures in its own card chrome; the slide is the card */
  figure,.html-embed__card{margin:0;border:0;background:transparent;}
  ${scale !== 1 ? `body>*{transform:scale(${scale});transform-origin:top left;width:${100 / scale}%;}` : ""}
</style></head><body><div data-config="${cfg}">${fragment}</div>
${css ? `<style>${css}</style>` : ""}
</body></html>`;
  }, [fragment, config, mode, T, scale, css]);

  if (!fragment) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px dashed ${T.border}`,
          borderRadius: 12,
          color: T.textDim,
          fontFamily: MONO,
          fontSize: 14,
        }}
      >
        missing embed: {name}
      </div>
    );
  }

  return (
    <iframe
      title={name}
      srcDoc={srcDoc}
      scrolling="no"
      style={{ width, height, border: 0, background: "transparent", display: "block" }}
    />
  );
}
