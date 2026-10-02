import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// Sized for the article column, so it under-fills a slide: zoom to fill and to
// stay readable from the back of the room.
const CSS = `
  /* 1.3 squeezed the logical width to 877px and the last month label (Jul)
     needed 984, so it fell off the right edge. */
  /* the longest row label ('names one per row') starts 12px left of the
     plot area, so the figure needs a little gutter of its own. */
  body { zoom: 1.1; padding-left: 18px; }
`;

export function TimelineSlide() {
  return (
    <SlideShell
      kicker="Who already does this"
      title="From naming no harness to training across several"
      titleSize={38}
    >
      <div style={{ position: "absolute", top: 196, left: 70, right: 70, bottom: 26 }}>
        <Embed name="d3-posttraining-timeline" css={CSS} height={498} />
      </div>
    </SlideShell>
  );
}
