import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// Sized for the article column; zoom to fill the width it gets here.
const CSS = `body { zoom: 1.2; }`;

export function RecordedSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="How it works" title="Not every capture can be trained on" titleSize={40}>
      <div style={{ position: "absolute", top: 202, left: 70, right: 70 }}>
        <Embed name="d3-capture-levels" height={360} css={CSS} />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.55, marginTop: 8 }}
        >
          The proxy does not take the engine on trust. The first time it meets one it sends a probe
          and grades it. Below the <span style={{ fontFamily: MONO, color: T.lavender }}>tokens</span> level
          the rollouts still run, but they are marked evaluation only, and asking for training data
          raises an error. Hosted APIs land there: you can evaluate a harness through them, and the trainer will refuse the trace.
        </motion.div>
      </div>
    </SlideShell>
  );
}
