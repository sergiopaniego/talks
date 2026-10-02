import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

export function SavingsSlide() {
  return (
    <SlideShell kicker="The result" title="Fewer calls, and fewer tokens with them" titleSize={38}>
      <div style={{ position: "absolute", top: 152, left: 60, right: 60, bottom: 24 }}>
        <Embed name="d3-savings-heat" height={544} />
      </div>
    </SlideShell>
  );
}
