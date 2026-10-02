import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// Sized for the article column, so it under-fills a slide: zoom to fill and to
// stay readable from the back of the room.
const CSS = `body { zoom: 1.22; }`;

export function ProxySlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="How it works" title="The capture proxy" titleSize={40}>
      <div style={{ position: "absolute", top: 146, left: 60, right: 60, bottom: 26 }}>
        <Embed name="d3-capture-proxy" css={CSS} height={456} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.5, marginTop: 16 }}
        >
          The proxy probes the engine before it trusts it. An engine that will not return token ids
          and logprobs still serves the rollout, and the trace comes back marked evaluation only.
          Every hosted API lands there.
        </motion.div>
      </div>
    </SlideShell>
  );
}
