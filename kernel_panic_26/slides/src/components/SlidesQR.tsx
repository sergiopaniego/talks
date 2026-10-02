import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";

// The deck is shared after the talk, so the room should be able to leave with
// it. Encoded ahead of time (`npx qrcode`) rather than at runtime: a QR for a
// URL that never changes is a constant, and this keeps the bundle free of an
// encoder it would run once.
//
// To re-encode after a URL change:
//   node -e "require('qrcode').toString('<url>',{type:'svg',margin:1}).then(console.log)"
// and paste the path's d attribute below.
export const SLIDES_URL = "https://huggingface.co/spaces/FineEnvs/multi-harness-rl-slides";

const VIEWBOX = "0 0 35 35";
const PATH =
  "M1 1.5h7m2 0h2m6 0h4m2 0h1m2 0h7M1 2.5h1m5 0h1m2 0h1m2 0h1m1 0h3m3 0h3m3 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h1m4 0h1m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m1 0h2m3 0h3m1 0h1m4 0h3m1 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m1 0h2m1 0h4m1 0h2m1 0h1m3 0h2m1 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m1 0h2m1 0h3m1 0h1m2 0h1m1 0h1m3 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M9 8.5h1m1 0h1m1 0h1m1 0h3m2 0h1m1 0h1m2 0h1M1 9.5h1m1 0h5m3 0h1m1 0h1m1 0h5m3 0h3m1 0h5M1 10.5h2m1 0h1m3 0h1m2 0h1m1 0h1m3 0h1m1 0h3m2 0h1m2 0h2m1 0h2m1 0h1M2 11.5h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h4m2 0h1m3 0h2m1 0h1m1 0h2M1 12.5h2m2 0h1m2 0h2m1 0h3m1 0h3m1 0h4m1 0h1m1 0h2m1 0h3m1 0h1M4 13.5h1m1 0h6m1 0h1m2 0h1m1 0h1m1 0h2m1 0h1m1 0h2m1 0h3m1 0h2M4 14.5h1m1 0h1m1 0h1m1 0h3m4 0h6m1 0h1m2 0h2m1 0h4M3 15.5h3m1 0h2m6 0h4m2 0h1m1 0h1m1 0h3m1 0h4M2 16.5h1m1 0h1m1 0h1m1 0h3m1 0h5m3 0h1m1 0h2m2 0h3m1 0h2M4 17.5h1m2 0h1m2 0h1m1 0h1m5 0h1m4 0h1m1 0h2m1 0h2m1 0h1m1 0h1M1 18.5h1m2 0h3m1 0h1m1 0h3m1 0h2m1 0h2m1 0h1m1 0h1m1 0h1m2 0h2m1 0h2m1 0h1M1 19.5h2m1 0h1m2 0h2m2 0h3m1 0h3m3 0h2m3 0h4m1 0h2M1 20.5h1m1 0h3m4 0h6m3 0h1m1 0h4m1 0h1m1 0h5M2 21.5h3m1 0h3m1 0h3m1 0h3m1 0h2m1 0h1m1 0h1m2 0h1m2 0h2m2 0h1M1 22.5h4m1 0h1m1 0h1m1 0h3m1 0h1m2 0h1m1 0h6m1 0h2m2 0h2m1 0h1M1 23.5h1m1 0h1m1 0h1m1 0h1m2 0h1m2 0h2m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h6M1 24.5h1m2 0h3m3 0h1m5 0h2m3 0h2m7 0h2m1 0h1M1 25.5h1m3 0h1m1 0h1m1 0h1m3 0h2m3 0h1m4 0h7m2 0h2M9 26.5h1m1 0h2m1 0h1m2 0h2m1 0h3m2 0h1m3 0h1m1 0h1m1 0h1M1 27.5h7m2 0h1m3 0h1m1 0h2m3 0h1m2 0h2m1 0h1m1 0h1m1 0h2M1 28.5h1m5 0h1m1 0h2m2 0h1m1 0h2m3 0h1m1 0h1m1 0h2m3 0h3m1 0h1M1 29.5h1m1 0h3m1 0h1m1 0h3m1 0h4m1 0h1m4 0h1m1 0h6m1 0h1M1 30.5h1m1 0h3m1 0h1m1 0h3m3 0h1m1 0h1m2 0h3m1 0h3m2 0h2m1 0h2M1 31.5h1m1 0h3m1 0h1m1 0h1m1 0h1m3 0h3m1 0h1m2 0h1m1 0h5M1 32.5h1m5 0h1m6 0h2m3 0h5m2 0h1m2 0h3M1 33.5h7m1 0h5m2 0h1m1 0h1m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1";

/**
 * A QR for {@link SLIDES_URL}.
 *
 * Always drawn as dark modules on a white plate, in both themes: a scanner
 * wants the contrast it expects, and an inverted code fails on a surprising
 * number of phones.
 */
export function SlidesQR({ size = 112, label }: { size?: number; label?: string }) {
  const { T } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ background: "#ffffff", padding: 7, borderRadius: 10, lineHeight: 0 }}>
        <svg width={size} height={size} viewBox={VIEWBOX} shapeRendering="crispEdges">
          <path d={PATH} stroke="#000000" />
        </svg>
      </div>
      {label && (
        <div style={{ fontFamily: MONO, fontSize: 12, color: T.textDim, letterSpacing: 1.5 }}>
          {label}
        </div>
      )}
    </div>
  );
}
