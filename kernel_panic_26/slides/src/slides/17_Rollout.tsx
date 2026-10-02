import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// The tallest figure in the deck, and the one that must not be cropped: the
// bottom row is the sandbox, where the task actually happens. It gets the whole
// stage below a compact title.
//
// It is also the only interactive one. There is a 21-step walk-through and a
// harness switcher, so this slide can be driven live instead of narrated.
export function RolloutSlide() {
  return (
    <SlideShell kicker="How it works" title="One rollout, end to end" titleSize={36}>
      <div style={{ position: "absolute", top: 140, left: 56, right: 56, bottom: 16 }}>
        <Embed name="d3-openenv-system" height={564} />
      </div>
    </SlideShell>
  );
}
