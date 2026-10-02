import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

const LIMITS: string[] = [
  "Every run is a single seed. One model at 2.6B, 1,000 steps.",
  "The two runs did not see the same data: 162M tokens against 451M, because Claude Code rewrites its own history and each rollout became about eight training rows.",
  "The 1.9-point gap in overall accuracy is inside the noise. Read the per-harness split, because the average hides it.",
  "SFT and RL differ in objective, data source, task pool and compute, so that comparison is an observation, not a ranking.",
  "We still do not know why SFT hurt Mini-SWE-Agent.",
];

export function HonestSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The result" title="What this does not prove" titleSize={42}>
      <div style={{ position: "absolute", top: 186, left: 96, right: 96 }}>
        {LIMITS.map((l, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: "spring", damping: 22 }}
            style={{ display: "flex", gap: 18, padding: "15px 0", alignItems: "baseline" }}
          >
            <span style={{ fontFamily: MONO, fontSize: 19, color: T.lavender }}>!</span>
            <span style={{ fontSize: 20, color: T.textMuted, lineHeight: 1.5 }}>{l}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ fontSize: 23, color: T.text, marginTop: 32, lineHeight: 1.55 }}
        >
          Bigger runs on the same stack are going now.
        </motion.div>
      </div>
    </SlideShell>
  );
}
