import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

// For the part of the room that does not do RL every day.
const STEPS: [string, string][] = [
  ["1", "Give the model a task, and let it try the same one several times"],
  ["2", "Grade each attempt with a number. Did the tests pass?"],
  ["3", "Compare the attempts against their own average"],
  ["4", "Make the better-than-average tokens more likely, the worse ones less"],
];

export function RLPrimerSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The background" title={<>Agentic RL, in four steps</>}>
      <div style={{ position: "absolute", top: 164, left: 96, right: 96 }}>
        {STEPS.map(([n, text], i) => (
          <motion.div key={n}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + i * 0.14, type: "spring", damping: 22 }}
            style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "14px 0" }}
          >
            <span style={{ fontFamily: MONO, fontSize: 34, fontWeight: 800, color: T.emerald, width: 44 }}>
              {n}
            </span>
            <span style={{ fontSize: 26, color: T.text, lineHeight: 1.4 }}>{text}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ marginTop: 30, padding: "24px 26px", borderRadius: 12,
            border: `1px solid ${T.border}`, background: T.bgRaised }}
        >
          <div style={{ fontSize: 21, color: T.textMuted, lineHeight: 1.6 }}>
            That is <span style={{ color: T.white, fontFamily: MONO, fontWeight: 700 }}>GRPO</span>.
            The group is its own baseline, so you never need a second value model.
            {" "}<span style={{ color: T.lavender }}>Agentic</span> just means each attempt is a whole
            session with tools, with a filesystem and a shell behind it.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
