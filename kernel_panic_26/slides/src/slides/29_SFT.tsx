import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// The figure's legend says "SFT" four times, so the slide has to say what that
// is before the audience meets the acronym. The lead line below the title does
// the bridging: plain-language title, then the term, then what was copied.
const CSS = `body { zoom: 1.0; }`;

export function SFTSlide() {
  const { T } = useTheme();
  return (
    <SlideShell
      kicker="The result"
      title="We also tried just copying a bigger model"
      titleSize={36}
    >
      <div style={{ position: "absolute", top: 142, left: 60, right: 60, bottom: 24 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ fontSize: 20, color: T.textMuted, lineHeight: 1.5, marginBottom: 14 }}
        >
          <span style={{ color: T.white, fontWeight: 700 }}>Supervised fine-tuning</span>{" "}
          <span style={{ color: T.lavender, fontWeight: 700 }}>(SFT)</span> on 3,189 successful
          rollouts from a 27B teacher, collected through the same four harnesses. Imitation only, with no
          reward in the loop.
        </motion.div>
        <Embed name="d3-sft-vs-rl" config={{ view: "harness" }} css={CSS} height={462} />
      </div>
    </SlideShell>
  );
}
