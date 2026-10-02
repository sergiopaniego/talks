import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// The article sizes this table for its text column: 640px wide and 477px tall,
// which on a slide is both small and flush left. Height is the binding
// constraint, so the slide gives it the full stage below the title, drops the
// explanatory note (said out loud instead) and zooms what is left. Keeping the
// 640px cap rather than stretching preserves the column rhythm.
//
// The row rules need the stretch: the grid centres its cells, so each one is
// only as tall as its content (a name is taller than a 12px dot) and every cell
// draws its own border-bottom at a different height, which reads as a broken
// line. Stretching the cells to the row height lines all those borders up, and
// the dots are re-centred inside their own box so nothing moves.
const CSS = `
  .harness-ecosystem-matrix { margin-left: auto !important; margin-right: auto !important; }
  .harness-ecosystem-matrix .nt { display: none; }
  .harness-ecosystem-matrix .hm-grid { align-items: stretch; }
  .harness-ecosystem-matrix .hm-row > div { display: flex; align-items: center; justify-content: center; }
  .harness-ecosystem-matrix .hm-row > .hm-name { display: block; }
  body { zoom: 1.16; }
`;

export function LandscapeSlide() {
  return (
    <SlideShell kicker="The landscape" title="Every harness speaks its own dialect" titleSize={38}>
      <div style={{ position: "absolute", top: 150, left: 70, right: 70, bottom: 28 }}>
        <Embed name="harness-ecosystem-matrix" height={542} css={CSS} />
      </div>
    </SlideShell>
  );
}
