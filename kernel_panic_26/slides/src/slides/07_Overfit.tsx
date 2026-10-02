import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// This slide used to paraphrase the three modes in three panels. The article's
// own figure shows the actual text instead: the JSON tool call that arrives as
// chat text in Aider, role:"tool" against a compacted role:"user", exit 1
// retried by the harness against exit 1 handed back to the model. Reading the
// real strings lands in a way "the exact shape of a tool call" never did.
//
// The figure carries its own attribution to the KAT-Coder report, so the slide
// adds no caption of its own.
const CSS = `body { zoom: 1.04; }`;

export function OverfitSlide() {
  return (
    <SlideShell
      kicker="The cause"
      title="Three ways a model overfits to its harness"
      titleSize={40}
    >
      <div style={{ position: "absolute", top: 160, left: 60, right: 60, bottom: 24 }}>
        <Embed name="d3-overfit-modes" css={CSS} height={520} />
      </div>
    </SlideShell>
  );
}
