import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// The legend and the source note live below the fold on a slide, and both are
// redundant here: each line is labelled at its right end, and each column
// carries its own subtitle. Dropping them lets the chart itself use the height.
const CSS = `
  /* the fragment styles these as '.scaffold-reversal .lg', which outranks a
     bare '.lg', so the override has to say so. */
  .scaffold-reversal .lg, .scaffold-reversal .nt { display: none !important; }
  /* The value labels are drawn straight over the series and their markers, with
     no offset and no backing, so where the lines run close they fight the chart.
     A halo in the page colour lifts them clear without moving anything. */
  svg text {
    paint-order: stroke fill;
    stroke: #07090f;
    stroke-width: 3.5px;
    stroke-linejoin: round;
  }
  /* The three labels in the first column start right where their marker sits.
     Only those use text-anchor:start, so this clears them without touching the
     axis or the column headers. */
  svg text[text-anchor="start"] { transform: translateX(7px); }
`;

export function ReversalSlide() {
  return (
    <SlideShell
      kicker="The problem"
      title="Change the harness, change which model wins"
      titleSize={38}
    >
      <div style={{ position: "absolute", top: 150, left: 70, right: 70, bottom: 26 }}>
        <Embed name="d3-scaffold-reversal" height={544} css={CSS} />
      </div>
    </SlideShell>
  );
}
