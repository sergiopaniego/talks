import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// Sized for the article column, so it under-fills a slide: zoom to fill and to
// stay readable from the back of the room.
const CSS = `body { zoom: 1.25; }`;

export function FinalSlide() {
  return (
    <SlideShell kicker="The result" title="Where each run ends up, by harness" titleSize={40}>
      <div style={{ position: "absolute", top: 150, left: 60, right: 60, bottom: 26 }}>
        <Embed name="d3-train-results" config={{ view: "final" }} css={CSS} height={544} />
      </div>
    </SlideShell>
  );
}
